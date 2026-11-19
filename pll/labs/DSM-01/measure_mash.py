"""Compare one-, two-, and three-stage command spectra with optional dither."""
import argparse
import csv
import json
from pathlib import Path

import numpy as np

from mash_model import Mash, plan_word


def measure(width, numerator, denominator, samples, seed, amplitude, output):
    modulus = 1 << width
    word = plan_word(numerator, denominator, width)
    offsets = np.fft.rfftfreq(samples)
    summary = []
    output.mkdir(parents=True, exist_ok=False)
    for enabled in (False, True):
        model = Mash(width)
        model.reset(seed)
        sequence = np.asarray([model.step(word, enabled, amplitude) for _ in range(samples)])
        using = np.mean(sequence[:, 1]) / modulus
        output_name = 'dither' if enabled else 'no-dither'
        with (output / f'{output_name}-commands.csv').open('w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['cycle', 'effective_word', 'carry1', 'mash11', 'mash111'])
            writer.writerows((i, *row[1:5]) for i, row in enumerate(sequence))
        with (output / f'{output_name}-spectrum.csv').open('w', newline='') as f:
            writer = csv.writer(f)
            measures = []
            for index, label in enumerate(['order1', 'mash11', 'mash111'], start=2):
                counts = sequence[:, index]
                error = counts - np.mean(counts)
                power = np.abs(np.fft.rfft(error) / samples)**2
                power[1:-1] *= 2  # Real sequence, even number of samples.
                np.testing.assert_allclose(power.sum(), np.var(counts), rtol=1e-12, atol=1e-18)
                peak = 1 + np.argmax(power[1:])
                assert abs(float(np.mean(counts)) - using) < 3 / samples
                measures.append(power)
                summary.append({
                    'dither': enabled, 'order': label, 'mean_command': float(np.mean(counts)),
                    'mean_effective_word_over_modulus': float(using),
                    'strongest_bin_cycles_per_sample': float(offsets[peak]),
                    'strongest_bin_command_squared': float(power[peak]),
                    'inband_0_to_0p05_command_squared': float(np.sum(power[(offsets > 0) & (offsets <= 0.05)])),
                })
            writer.writerow(['cycles_per_sample', 'order1_cmd2_per_bin', 'mash11_cmd2_per_bin',
                             'mash111_cmd2_per_bin'])
            writer.writerows(zip(offsets, *measures))
    result = {'width': width, 'target_numerator': numerator, 'target_denominator': denominator,
              'rounded_word': word, 'modulus': modulus, 'samples': samples, 'seed': seed,
              'dither_amplitude_lsb': amplitude, 'results': summary}
    (output / 'summary.json').write_text(json.dumps(result, indent=2) + '\n')
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('new_output_dir', type=Path)
    parser.add_argument('--width', type=int, default=12)
    parser.add_argument('--num', type=int, default=1)
    parser.add_argument('--den', type=int, default=8)
    parser.add_argument('--samples', type=int, default=16384)
    parser.add_argument('--seed', type=lambda x: int(x, 0), default=0xace1)
    parser.add_argument('--amplitude', type=int, default=1)
    args = parser.parse_args()
    if args.samples < 32 or args.samples % 2:
        parser.error('--samples must be even and at least 32')
    result = measure(args.width, args.num, args.den, args.samples, args.seed, args.amplitude,
                     args.new_output_dir)
    print(json.dumps(result, indent=2))
