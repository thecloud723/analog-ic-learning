"""Continuous-time, locked-point CP-PLL source budget with one-sided PSDs."""
import argparse
import csv
import json
import math
from pathlib import Path

BOLTZMANN = 1.380649e-23
SOURCES = ('reference', 'vco', 'divider_pfd', 'charge_pump', 'loop_resistor', 'supply', 'buffer')


def transfers(frequency, cfg):
    """Return amplitude transfers to output phase (rad), with source units in the docs."""
    s = 2j * math.pi * frequency
    r = cfg['resistance_ohm']
    c = cfg['capacitance_f']
    cp = cfg['shunt_f']
    series_impedance = r + 1 / (s * c)
    z = 1 / (s * cp + 1 / series_impedance)
    phase_per_volt = 2 * math.pi * cfg['kvco_hz_per_v'] / s
    n = cfg['divide']
    loop = cfg['pump_a'] / (2 * math.pi) * z * phase_per_volt / n
    sensitivity = 1 / (1 + loop)
    reference = n * loop * sensitivity
    return {
        'reference': reference,
        'vco': sensitivity,
        'divider_pfd': -reference,
        'charge_pump': z * phase_per_volt * sensitivity,
        'loop_resistor': z / series_impedance * phase_per_volt * sensitivity,
        'supply': 2 * math.pi * cfg['supply_pushing_hz_per_v'] / s * sensitivity,
        'buffer': 1,
    }


def input_psd(name, frequency, spec, cfg):
    if name == 'charge_pump':
        return spec['one_sided_a2_per_hz']
    if name == 'supply':
        return spec['one_sided_v2_per_hz']
    if name == 'loop_resistor':
        return 4 * BOLTZMANN * cfg['temperature_k'] * cfg['resistance_ohm']
    floor = 10 ** (spec['ssb_floor_dbc_per_hz'] / 10)
    at_100k = spec.get('ssb_dbc_per_hz_at_100khz')
    phase_psd = floor if at_100k is None else floor + 10 ** (at_100k / 10) * (1e5 / frequency) ** 2
    return 2 * phase_psd


def integrate(freqs, psd):
    """Trapezoidal integration of a linear PSD against linear frequency."""
    return math.fsum((b-a) * (x+y) / 2 for a, b, x, y in zip(freqs, freqs[1:], psd, psd[1:]))


def budget(cfg):
    low, high = cfg['integration_hz']
    points = cfg['points']
    source_cfg = cfg['sources']
    positive = ('reference_hz', 'pump_a', 'kvco_hz_per_v', 'resistance_ohm',
                'capacitance_f', 'temperature_k')
    if (not all(math.isfinite(cfg[key]) and cfg[key] > 0 for key in positive)
            or not isinstance(cfg['divide'], int) or cfg['divide'] < 1
            or not math.isfinite(cfg['shunt_f']) or cfg['shunt_f'] < 0
            or not math.isfinite(cfg['supply_pushing_hz_per_v'])
            or not 0 < low < high < math.inf or not isinstance(points, int) or points < 3
            or not set(source_cfg) <= set(SOURCES)):
        raise ValueError('Invalid PLL values, source names, or integration grid')
    freqs = [low * (high / low) ** (i / (points-1)) for i in range(points)]
    freqs[-1] = high
    psds = {name: [] for name in source_cfg}
    gain2 = {name: [] for name in source_cfg}
    for f in freqs:
        paths = transfers(f, cfg)
        for name, spec in source_cfg.items():
            density = input_psd(name, f, spec, cfg)
            power_gain = abs(paths[name]) ** 2
            power = density * power_gain
            if not math.isfinite(power) or power < 0:
                raise ValueError(f'Invalid input PSD or transfer for {name}')
            psds[name].append(power)
            gain2[name].append(power_gain)
    variances = {name: integrate(freqs, values) for name, values in psds.items()}
    total = [math.fsum(psds[name][i] for name in psds) for i in range(points)]
    variance = math.fsum(variances.values())
    carrier = cfg['reference_hz'] * cfg['divide']
    radians_to_seconds = 1 / (2 * math.pi * carrier)
    spurs = cfg.get('pm_spurs', [])
    offsets = set()
    pm_variances = []
    for spur in spurs:
        offset, level = spur['offset_hz'], spur['single_sideband_dbc']
        if not 0 < offset < math.inf or offset in offsets or not math.isfinite(level) or level > -20:
            raise ValueError('PM spurs require unique positive offsets and SSB levels <= -20 dBc')
        offsets.add(offset)
        if low <= offset <= high:
            # First-order PM: each sideband amplitude ratio is beta/2.
            pm_variances.append(2 * 10 ** (level / 10))
    spur_variance = math.fsum(pm_variances)
    to_seconds = lambda var: math.sqrt(var) * radians_to_seconds
    summary = {
        'source_kind': 'illustrative analytical PSDs; no device measurement or PNoise',
        'carrier_hz': carrier, 'integration_hz': [low, high],
        'phase_variance_rad2_by_source': variances,
        'random_rms_phase_rad': math.sqrt(variance),
        'random_rms_time_s': to_seconds(variance),
        'pm_spur_rms_time_s': to_seconds(spur_variance),
        'combined_rms_time_s_if_independent': to_seconds(variance + spur_variance),
        'pm_spurs': spurs,
    }
    return freqs, psds, gain2, total, summary


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('settings', type=Path)
    parser.add_argument('new_output_dir', type=Path)
    args = parser.parse_args()
    cfg = json.loads(args.settings.read_text())
    freqs, psds, gains, total, summary = budget(cfg)
    output = args.new_output_dir
    output.mkdir(parents=True, exist_ok=False)
    (output / 'settings.json').write_text(json.dumps(cfg, indent=2) + '\n')
    (output / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
    with (output / 'spectrum.csv').open('w', newline='') as stream:
        writer = csv.writer(stream)
        writer.writerow(['offset_hz', *[f'{name}_rad2_per_hz_one_sided' for name in psds],
                         'total_rad2_per_hz_one_sided', 'total_ssb_dbc_per_hz',
                         *[f'{name}_power_gain' for name in gains]])
        for i, frequency in enumerate(freqs):
            ssb = 10 * math.log10(total[i] / 2) if total[i] else ''
            writer.writerow([frequency, *[density[i] for density in psds.values()],
                             total[i], ssb, *[gain[i] for gain in gains.values()]])
    print(json.dumps(summary, indent=2))


if __name__ == '__main__':
    main()
