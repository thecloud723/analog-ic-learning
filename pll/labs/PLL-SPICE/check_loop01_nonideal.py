"""Run a calibrated two-capacitor LOOP-01 matrix and verify pump timing."""
import argparse
import csv
import itertools
import json
import math
from pathlib import Path
import subprocess


def transitions(events, field):
    previous = 0
    for row in events:
        value = int(row[field])
        if value != previous:
            yield float(row['time_ns']), value
        previous = value


def verify(events, up_delay, down_delay, horizon):
    counts = []
    for arm, delay in [('up', up_delay), ('down', down_delay)]:
        logical = transitions(events, arm + '_after')
        expected = [(t + delay, value) for t, value in logical if t + delay <= horizon]
        actual = list(transitions(events, 'pump_' + arm + '_after'))
        if len(actual) != len(expected) or any(
            a[1] != e[1] or not math.isclose(a[0], e[0], rel_tol=0, abs_tol=1e-7)
            for a, e in zip(actual, expected)
        ):
            raise ValueError(f'{arm} path transport delay disagrees with logic transitions')
        counts.append(len(actual))
    return counts


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('common', type=Path)
    parser.add_argument('calibrated_model', type=Path)
    parser.add_argument('new_output_dir', type=Path)
    args = parser.parse_args()
    common = json.loads(args.common.read_text())
    model = json.loads(args.calibrated_model.read_text())
    output = args.new_output_dir
    output.mkdir(parents=True, exist_ok=False)
    runner = Path(__file__).with_name('run_loop01.mjs').resolve()
    results = []
    cases = itertools.product([0, 0.05, 0.1], [(0, 0), (0.12, 0.25)], [0, 100_000])
    for index, (mismatch, delays, rout) in enumerate(cases):
        case = output / f'case-{index:02}'
        case.mkdir()
        common_file = case / 'common.json'
        model_file = case / 'model.json'
        common_file.write_text(json.dumps(common | {'cp_mismatch': mismatch}))
        model_file.write_text(json.dumps(model | {
            'useShuntCap': True, 'upDelayNs': delays[0], 'downDelayNs': delays[1],
            'pumpOutputResistanceOhm': rout,
        }))
        result = json.loads(subprocess.check_output(
            ['node', runner, case, common_file, model_file], text=True))
        with (Path(result['directory']) / 'filter_events.csv').open() as f:
            events = list(csv.DictReader(f))
        horizon = (result['samples'] - 1) * 1e9 / common['reference_hz']
        timing = verify(events, *delays, horizon)
        voltages = [float(row['vctrl_v']) for row in events
                    if horizon - 4000 <= float(row['time_ns']) <= horizon]
        if not result['lock'] or not voltages or not all(map(math.isfinite, voltages)):
            raise ValueError(f'Case {index} did not settle in the observation window')
        results.append({
            'case': index, 'mismatch': mismatch, 'upDelayNs': delays[0], 'downDelayNs': delays[1],
            'pumpOutputResistanceOhm': rout or None, 'pumpTransitionsChecked': timing,
            'eventSampleRippleMvpp': (max(voltages) - min(voltages)) * 1000,
            'run': result,
        })
    (output / 'comparison.json').write_text(json.dumps(results, indent=2) + '\n')
    for row in results:
        print(row['case'], row['pumpTransitionsChecked'], row['run']['lock'],
              f"{row['eventSampleRippleMvpp']:.6f} mVpp at event times")


if __name__ == '__main__':
    main()
