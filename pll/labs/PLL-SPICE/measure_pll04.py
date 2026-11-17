"""Read locked-period SPICE waveforms and estimate a separate noise budget."""
import json
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from scipy.integrate import cumulative_trapezoid, trapezoid


def analyze_pll04(output, noise):
    output = Path(output)
    cfg = json.loads((output / 'pll-04-config.json').read_text())
    period, target = cfg['period_s'], cfg['target_hz']
    n_cycles, samples_per_cycle = 8, 2048
    t = np.arange(n_cycles * samples_per_cycle + 1) * period / samples_per_cycle
    h = np.arange(1, 6)
    rows = []
    fig, (wave, spec) = plt.subplots(1, 2, figsize=(12, 4), layout='constrained')
    for case in cfg['cases']:
        trace = pd.read_csv(output / case['file'])
        start = (cfg['cycles'] - n_cycles) * period
        vctrl = np.interp(t + start, trace.time_s, trace['v(ctrl)'])
        freq = np.interp(t + start, trace.time_s, trace['v(freq)']) * 1e9
        net = np.interp(t + start, trace.time_s, trace['i(vup)'] - trace['i(vdn)'])
        avg = trapezoid(freq, t) / t[-1]
        phase = 2 * np.pi * cumulative_trapezoid(freq - avg, t, initial=0)
        # Use an integer number of reference periods after the transient.
        bins = np.fft.fft(np.exp(1j * phase[:-1]))
        for harmonic in h:
            for sign in [-1, 1]:
                level = abs(bins[sign * harmonic * n_cycles] / bins[0])
                rows.append(dict(case=case['case'], offset_hz=sign * harmonic / period,
                                 spur_dbc=20 * np.log10(max(level, 1e-15)),
                                 vctrl_pp_v=np.ptp(vctrl), mean_frequency_hz=avg,
                                 net_charge_fc=1e15 * trapezoid(net, t) / n_cycles,
                                 edge_skew_ps=case['edge_skew_s'] * 1e12))
        if case['case'] != 'mismatch-fine':
            wave.plot(t[:samples_per_cycle] * 1e9,
                      (vctrl[:samples_per_cycle]-vctrl[0])*1e3, label=case['case'])
    spurs = pd.DataFrame(rows)
    mismatch = spurs[spurs.case == 'mismatch']
    fine = spurs[spurs.case == 'mismatch-fine']
    fundamental = mismatch.iloc[:2].spur_dbc.to_numpy()
    fine_fundamental = fine.iloc[:2].spur_dbc.to_numpy()
    if cfg['settings']['cp_mismatch'] > 0:
        delta_db = float(np.max(np.abs(fundamental - fine_fundamental)))
        if delta_db > 0.5:
            raise ValueError(f'Reference spur changes by {delta_db:.2f} dB on timestep refinement')
        if abs(fine.net_charge_fc.iloc[0]) > 0.1:
            raise ValueError('Locked-period UP/DN pulses are not charge-balanced')
    else:
        delta_db = None
    spec.vlines(fine.offset_hz / 1e6, -145, fine.spur_dbc, color='tab:orange')
    spec.scatter([0], [0], color='tab:blue', label='Carrier')
    spec.set(xlabel='Offset (MHz)', ylabel='Level (dBc)', title='CP mismatch: coherent sidebands',
             ylim=(-145, 5))
    wave.set(xlabel='Time within reference cycle (ns)', ylabel='VCTRL ripple (mV)',
             title='Locked-period CP pulses')
    wave.legend()
    fig.savefig(output / 'pll-04-reference-spur.png', dpi=150)

    # Continuous-time small-signal phase model using the same R/C/Cshunt.
    f = np.geomspace(noise['low_hz'], noise['high_hz'], 8193)
    s = 2j * np.pi * f
    settings = cfg['settings']
    n = settings['divide']
    resistance = settings['loop_r_ohm']
    cap = settings['loop_c_pF'] * 1e-12
    shunt = settings['loop_cp_pF'] * 1e-12
    z = 1 / (s * shunt + 1 / (resistance + 1 / (s * cap)))
    k_pfd = settings['cp_uA'] * 1e-6 / (2 * np.pi)
    loop = k_pfd * z * (2 * np.pi * cfg['gain_hz_v']) / (s * n)
    ref_input = 10**(noise['ref_at_100k_dbc_hz']/10) * (1e5/f)**2 + 10**(noise['ref_floor_dbc_hz']/10)
    vco_input = 10**(noise['vco_at_100k_dbc_hz']/10) * (1e5/f)**2 + 10**(noise['vco_floor_dbc_hz']/10)
    ref_output = abs(n * loop / (1 + loop))**2 * ref_input
    vco_output = abs(1 / (1 + loop))**2 * vco_input
    total = ref_output + vco_output
    fig2, (ax, jc) = plt.subplots(1, 2, figsize=(12, 4), layout='constrained')
    for label, psd in [('REF → output', ref_output), ('VCO → output', vco_output), ('Total', total)]:
        ax.semilogx(f, 10*np.log10(psd), label=label)
    ax.legend()
    ax.set(xlabel='Offset (Hz)', ylabel='SSB phase noise (dBc/Hz)', title='Illustrative noise budget')
    cumulative = np.sqrt(2*cumulative_trapezoid(total, f, initial=0))/(2*np.pi*target)
    jc.semilogx(f, cumulative*1e12)
    jc.set(xlabel='Integration upper limit (Hz)', ylabel='RMS jitter (ps)',
           title=f"Integrated from {noise['low_hz']/1e3:g} kHz")
    fig2.savefig(output / 'pll-04-phase-noise-jitter.png', dpi=150)
    psd = pd.DataFrame(dict(offset_hz=f, ref_ssb_out=ref_output, vco_ssb_out=vco_output,
                            total_ssb_out=total, cumulative_jitter_s=cumulative))
    psd.to_csv(output / 'pll-04-phase-noise.csv', index=False)
    spurs.to_csv(output / 'pll-04-spurs.csv', index=False)
    metrics = dict(
        reference_spur_dbc={'lower': float(fine_fundamental[0]), 'upper': float(fine_fundamental[1])}
            if settings['cp_mismatch'] > 0 else None,
        fundamental_timestep_change_db=delta_db,
        frequency_hz=target, noise_assumptions=noise,
        rms_jitter_ps={key: float(np.sqrt(2*trapezoid(p,f))/(2*np.pi*target)*1e12)
                       for key, p in [('ref', ref_output), ('vco', vco_output), ('total', total)]},
    )
    (output / 'pll-04-summary.json').write_text(json.dumps(metrics, indent=2) + '\n')
    return spurs, metrics
