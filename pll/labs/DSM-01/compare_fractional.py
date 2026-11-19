"""Compare average and integer-count feedback on the same CP-PLL plant."""
import argparse
import csv
import json
from pathlib import Path
import subprocess

import numpy as np

from mash_model import Mash, plan_word

REFERENCE_HZ = 40e6
BASE_DIVIDER = 125


def simulate(divider, counts, samples, trace_edges=False):
    runner = Path(__file__).with_name('run_fractional.mjs')
    request = dict(divider=divider, counts=counts, samples=samples, traceEdges=trace_edges)
    return json.loads(subprocess.run(
        ['node', str(runner)], input=json.dumps(request), text=True,
        capture_output=True, check=True,
    ).stdout)


def compare(output, width=12, numerator=1, denominator=8, seed=0xace1):
    word = plan_word(numerator, denominator, width)
    divider = BASE_DIVIDER + word / (1 << width)
    output.mkdir(parents=True)
    records = []
    cases = [('average', None)]
    for name, column, dither in [('order1', 2, False), ('mash111', 4, False),
                                  ('mash111-dither', 4, True)]:
        model = Mash(width)
        model.reset(seed)
        counts = [BASE_DIVIDER + model.step(word, dither, 1)[column] for _ in range(12288)]
        simulate(divider, counts, 128, trace_edges=True)
        cases.append((name, counts))

    for name, counts in cases:
        result = simulate(divider, counts, 12288)
        data = result['data']
        time = np.array([point['ns'] for point in data]) * 1e-9
        phase = 2 * np.pi * divider * (np.array([point['phase'] for point in data])
                                        - time * REFERENCE_HZ)
        assert np.isfinite(phase).all()
        # Frequency entry uses a 128-reference-period trailing estimate and 4 us hold.
        window = 128
        average_error = (phase[window:] - phase[:-window]) * REFERENCE_HZ / (2 * np.pi * window)
        hold = round(4e-6 * REFERENCE_HZ)
        settled = np.flatnonzero(np.convolve(
            (np.abs(average_error) <= 100e3).astype(int), np.ones(hold + 1, dtype=int), mode='valid',
        ) == hold + 1)
        assert settled.size > 0
        assert np.max(np.abs(average_error[-8192:])) <= 100e3
        tail = phase[-8192:]
        residual = tail - np.mean(tail)
        # Reference-rate complex envelope. FFT bins may contain aliased content.
        envelope = np.fft.fft(np.exp(1j * residual)) / len(tail)
        power = np.abs(envelope)**2
        np.testing.assert_allclose(power.sum(), 1, atol=1e-12)
        offsets = np.fft.fftfreq(len(tail), 1 / REFERENCE_HZ)
        peak = 1 + np.argmax(power[1:])
        records.append(dict(case=name, mean_applied_divider=(
            result['feedbackCycles'] / result['intervals'] if counts else divider),
            frequency_entry_us=float(time[window + settled[0]] * 1e6),
            phase_rms_rad=float(np.std(tail)), peak_offset_hz=float(offsets[peak]),
            peak_dbc_per_bin=float(10 * np.log10(power[peak] / power[0])),
            tail_mean_frequency_error_hz=float((tail[-1] - tail[0]) /
                (2 * np.pi * (len(tail) - 1) / REFERENCE_HZ))))
        assert abs(records[-1]['mean_applied_divider'] - divider) < 0.01
        assert abs(records[-1]['tail_mean_frequency_error_hz']) < 1e4
        with (output / f'{name}-phase.csv').open('w') as file:
            writer = csv.writer(file)
            writer.writerow(['time_s', 'phase_error_rad', 'frequency_error_mhz'])
            writer.writerows(zip(time, phase, (point['mhz'] for point in data)))
    assert records[0]['phase_rms_rad'] < records[1]['phase_rms_rad']
    summary = dict(width=width, word=word, seed=seed, nominal_divider=divider, cases=records)
    (output / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
    return summary


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('new_output_dir', type=Path)
    parser.add_argument('--width', type=int, default=12)
    parser.add_argument('--num', type=int, default=1)
    parser.add_argument('--den', type=int, default=8)
    parser.add_argument('--seed', type=lambda value: int(value, 0), default=0xace1)
    args = parser.parse_args()
    print(json.dumps(compare(args.new_output_dir, args.width, args.num, args.den, args.seed), indent=2))
