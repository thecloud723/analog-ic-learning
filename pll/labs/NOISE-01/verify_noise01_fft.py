"""Compare a seeded phase-noise realization with the analytical budget."""
import argparse
import json
from pathlib import Path

import numpy as np

from noise01 import budget, input_psd, transfers


def verify(cfg):
    _, _, _, _, summary = budget(cfg)
    fs = 64_000_000
    low, high = cfg['integration_hz']
    if fs / 2 <= high:
        raise ValueError('Verification uses a 64 MHz sample clock, so high must be below 32 MHz')
    fc = summary['carrier_hz']
    analytic = summary['random_rms_phase_rad'] ** 2
    rows = []
    for length in [32768, 131072]:
        offsets = np.fft.rfftfreq(length, 1/fs)
        band = (offsets >= low) & (offsets <= high)
        psd = np.zeros_like(offsets)
        for i in np.flatnonzero(band):
            f = float(offsets[i])
            paths = transfers(f, cfg)
            psd[i] = sum(input_psd(name, f, spec, cfg) * abs(paths[name])**2
                         for name, spec in cfg['sources'].items())
        df = fs / length
        discrete_expectation = float(np.sum(psd) * df)
        if abs(discrete_expectation / analytic - 1) > .025:
            raise ValueError('FFT grid and quadrature differ by more than 2.5%')
        rng = np.random.default_rng(12001)
        scale = np.sqrt(psd * fs * length / 4)
        window = np.hanning(length)
        window_energy = np.sum(window**2)
        time_var, rect_var, hann_var = [], [], []
        for _ in range(12):
            bins = scale * (rng.standard_normal(offsets.size) + 1j*rng.standard_normal(offsets.size))
            phase = np.fft.irfft(bins, n=length)
            time_var.append(float(np.var(phase)))
            xf = np.fft.rfft(phase)
            rect_var.append(float(np.sum(2 * np.abs(xf[band])**2 / (fs*length)) * df))
            xf_hann = np.fft.rfft(phase * window)
            hann_var.append(float(np.sum(2 * np.abs(xf_hann[band])**2 / (fs*window_energy)) * df))
        np.testing.assert_allclose(time_var, rect_var, rtol=1e-12, atol=0)
        means = [float(np.mean(method)) for method in [time_var, rect_var, hann_var]]
        if any(abs(measured / discrete_expectation - 1) > .08 for measured in means):
            raise ValueError('Sampled variance differs from FFT-grid expectation by more than 8%')
        beta = 2 * np.sqrt(10**(-70 / 10))
        tone = beta * np.sin(2*np.pi * 1_000_000 / fs * np.arange(length))
        np.testing.assert_allclose(np.var(tone), beta**2/2, rtol=1e-12)
        rows.append({
            'samples': length, 'sample_hz': fs, 'bin_hz': df, 'realizations': 12,
            'analytic_random_rms_ps': np.sqrt(analytic) / (2*np.pi*fc) * 1e12,
            'grid_variance_error_percent': (discrete_expectation/analytic-1)*100,
            'time_rect_hann_variance_error_percent': [(mean/analytic-1)*100 for mean in means],
            'coherent_1mhz_pm_tone_rms_ps': float(np.std(tone) / (2*np.pi*fc) * 1e12),
        })
    return rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('settings', type=Path)
    parser.add_argument('output', type=Path)
    args = parser.parse_args()
    result = json.dumps(verify(json.loads(args.settings.read_text())), indent=2) + '\n'
    with args.output.open('x') as f:
        f.write(result)
    print(result, end='')


if __name__ == '__main__':
    main()
