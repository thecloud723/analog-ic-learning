"""Compare matched LOOP-01 and PLL-03 runs using an identical frequency dwell test."""
import argparse
import csv
import json
from pathlib import Path
import subprocess


def entry_us(points, tolerance_hz, hold_us):
    since = None
    for time_us, error_hz in points:
        if abs(error_hz) > tolerance_hz:
            since = None
            continue
        if since is None:
            since = time_us
        if time_us - since >= hold_us - 1e-9:
            return since
    raise ValueError('Frequency dwell test did not pass')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('spice_dir', type=Path)
    parser.add_argument('output_dir', type=Path)
    args = parser.parse_args()
    labs = Path(__file__).resolve().parent
    source = args.spice_dir
    output = args.output_dir
    output.mkdir(parents=True, exist_ok=False)
    reference = json.loads((source / 'pll-03-loop-config.json').read_text())
    common = reference['settings']
    model = json.loads((labs / 'loop01-settings.json').read_text())
    model.update(initialVoltage=reference['calibrated_initial_v'], durationUs=common['run_us'])
    common_path = output / 'common.json'
    model_path = output / 'model.json'
    calibrated = output / 'calibrated.json'
    common_path.write_text(json.dumps(common, indent=2) + '\n')
    model_path.write_text(json.dumps(model, indent=2) + '\n')
    subprocess.run(['node', labs / 'calibrate_loop01.mjs',
                    source / 'pll-01-vco-metrics.json', calibrated, model_path], check=True)
    event = json.loads(subprocess.check_output(
        ['node', labs / 'run_loop01.mjs', output / 'run', common_path, calibrated], text=True))
    target = reference['target_hz']
    with (source / 'pll-03-loop-calibrated-cp.csv').open() as f:
        averaged = list(csv.DictReader(f))
    with (Path(event['directory']) / 'samples.csv').open() as f:
        sampled = list(csv.DictReader(f))
    limits = model['lock']
    interval = (limits['frequencyToleranceHz'], limits['holdUs'])
    average_entry = entry_us(
        ((float(p['time_s']) * 1e6, float(p['v(freq)']) * 1e9 - target) for p in averaged),
        *interval,
    )
    event_entry = entry_us(
        ((float(p['time_ns']) / 1e3, float(p['frequency_error_hz'])) for p in sampled[1:]),
        *interval,
    )
    evidence = {
        'pll03EntryUs': average_entry,
        'loop01EntryUs': event_entry,
        'entryDifferenceUs': event_entry - average_entry,
        'finalCapacitorDifferenceV': event['finalCapacitorVoltageV'] - float(averaged[-1]['v(state)']),
        'finalPhaseDifferenceCycles': (event['finalPhaseErrorCycles'] -
                                       float(averaged[-1]['v(phase)'])),
        'finalFrequencyDifferenceHz': (event['finalFrequencyErrorHz'] -
                                       (float(averaged[-1]['v(freq)']) * 1e9 - target)),
        'eventRunId': event['runId'],
    }
    checks = {
        'entryDifferenceUs': 1,
        'finalCapacitorDifferenceV': 0.002,
        'finalPhaseDifferenceCycles': 0.002,
        'finalFrequencyDifferenceHz': 1000,
    }
    evidence['limits'] = checks
    (output / 'comparison.json').write_text(json.dumps(evidence, indent=2) + '\n')
    print(json.dumps(evidence, indent=2))
    if any(abs(evidence[field]) > limit for field, limit in checks.items()):
        raise SystemExit('Model agreement outside declared tolerances')


if __name__ == '__main__':
    main()
