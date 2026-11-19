"""Export model curves and a separate TI marker-validation case for offline playback."""
import argparse
import json
import math
from pathlib import Path

from compare_evm import compare
from noise01 import SOURCES, input_psd, transfers

PRESETS = [
    ('base', {}),
    ('cp50', {'pump_a': 50e-6}),
    ('cp200', {'pump_a': 200e-6}),
    ('n100', {'divide': 100}),
    ('r3900', {'resistance_ohm': 3900}),
    ('shunt10', {'shunt_f': 10e-12}),
]
LOWER = [1000, 12000, 100000]
UPPER = [500000, 5000000, 20000000]


def centidb(linear):
    return round(1000 * math.log10(max(1e-300, linear)))


def export(cfg, measurement):
    low, high = min(LOWER), max(UPPER)
    frequencies = sorted({*(low * (high/low)**(i/320) for i in range(320)), *LOWER, *UPPER})
    keys = [name for name in SOURCES if name in cfg['sources']]
    cases = {}
    for name, changes in PRESETS:
        case = cfg | changes
        path_at_100k = transfers(100_000, case)
        psd = {key: [] for key in keys}
        gain = {key: [] for key in keys}
        for f in frequencies:
            paths = transfers(f, case)
            for key in keys:
                transfer_power = abs(paths[key])**2
                ssb = transfer_power * input_psd(key, f, case['sources'][key], case) / 2
                psd[key].append(centidb(ssb))
                reference = abs(path_at_100k[key])**2
                gain[key].append(centidb(transfer_power / reference) if reference else None)
        cases[name] = {
            'carrierHz': case['reference_hz'] * case['divide'],
            'ssbCentidb': psd, 'normalizedGainCentidb': gain,
        }
    return {'schemaVersion': 1, 'sources': keys, 'offsetHz': frequencies, 'cases': cases,
            'pmSpurs': cfg['pm_spurs'], 'measurement': measurement, 'evm': compare(measurement)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('settings', type=Path)
    parser.add_argument('markers', type=Path)
    parser.add_argument('output_js', type=Path)
    args = parser.parse_args()
    payload = export(json.loads(args.settings.read_text()), json.loads(args.markers.read_text()))
    args.output_js.write_text('globalThis.pllNoise01 = ' +
                              json.dumps(payload, separators=(',', ':')) + ';\n', encoding='utf-8')


if __name__ == '__main__':
    main()
