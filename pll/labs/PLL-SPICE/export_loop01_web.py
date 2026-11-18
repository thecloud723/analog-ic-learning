"""Reduce calibrated LOOP-01 CSV outputs to an offline course replay asset."""
import argparse
import csv
import hashlib
import json
import math
from pathlib import Path


def hash_file(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def export_run(path, stride):
    manifest = json.loads((path / 'manifest.json').read_text())
    settings_path = path / 'settings.json'
    settings = json.loads(settings_path.read_text())
    samples_path = path / 'samples.csv'
    filter_path = path / 'filter_samples.csv'
    with samples_path.open() as f:
        samples = list(csv.DictReader(f))
    with filter_path.open() as f:
        control = list(csv.DictReader(f))
    if len(samples) != manifest['samples'] or len(samples) != len(control) or len(samples) < 2:
        raise ValueError('Filter and closed-loop sample times must have matching coverage')
    control_times = [float(row['time_ns']) for row in control]
    sample_times = [float(row['time_ns']) for row in samples]
    if control_times != sample_times or any(a >= b for a, b in zip(sample_times, sample_times[1:])):
        raise ValueError('Sample times must be identical and strictly increasing')
    keep = {0, len(samples) - 1, *range(0, len(samples), stride)}
    lock = manifest['lock']
    if lock:
        for field in ['entryUs', 'confirmationUs']:
            keep.add(min(range(len(samples)), key=lambda i: abs(sample_times[i] - 1000 * lock[field])))
    data = [[sample_times[i] / 1000, float(samples[i]['frequency_error_hz']) / 1e6,
             float(control[i]['vctrl_v']), float(control[i]['capacitor_v']),
             float(samples[i]['wrapped_phase_error_cycles'])] for i in sorted(keep)]
    if not all(math.isfinite(value) for row in data for value in row):
        raise ValueError('Replay traces must contain only finite values')
    return {
        'runId': manifest['runId'], 'sourceCommit': manifest['sourceCommit'],
        'sourceModified': manifest['sourceModified'], 'sourceModelSha256': manifest['modelSha256'],
        'settingsSha256': hash_file(settings_path), 'samplesSha256': hash_file(samples_path),
        'filterSamplesSha256': hash_file(filter_path),
        'calibration': settings['model']['calibration'],
        'parameters': settings['effectiveConfig'] | {'linear': None, 'curved': None},
        'cpMismatch': settings['common']['cp_mismatch'], 'resetNs': settings['common']['reset_ns'],
        'initialOffsetHz': settings['common']['initial_offset_hz'], 'targetHz': manifest['targetHz'],
        'lock': lock, 'data': [[round(value, 7) for value in row] for row in data],
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('output', type=Path)
    parser.add_argument('runs', type=Path, nargs='+')
    parser.add_argument('--stride', type=int, default=10)
    args = parser.parse_args()
    if args.stride < 1:
        parser.error('--stride must be positive')
    payload = {
        'schemaVersion': 1, 'dataKind': 'SPICE-calibrated event-model replay',
        'columns': ['time_us', 'frequency_error_mhz', 'vctrl_v', 'capacitor_v', 'phase_error_cycles'],
        'stride': args.stride, 'runs': [export_run(run, args.stride) for run in args.runs],
    }
    with args.output.open('x') as f:
        f.write('globalThis.pllLoopReplay = ' + json.dumps(payload, separators=(',', ':')) + ';\n')


if __name__ == '__main__':
    main()
