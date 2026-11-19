"""Evaluate fixed holdout markers against an empirical log-offset baseline."""
import argparse
import json
import math
from pathlib import Path


def compare(measurement):
    markers = measurement['markers']
    if any(row['split'] not in ('fit', 'holdout') for row in markers):
        raise ValueError('Unknown marker split')
    offsets = [row['offset_hz'] for row in markers]
    if not offsets or offsets[0] <= 0 or any(a >= b for a, b in zip(offsets, offsets[1:])):
        raise ValueError('Marker offsets must be strictly increasing and positive')
    fitted = [row for row in markers if row['split'] == 'fit']
    if len(fitted) < 2 or any(not math.isfinite(row['ssb_dbc_per_hz']) for row in markers):
        raise ValueError('Expected at least two fit points and finite powers')
    holdouts = []
    for row in markers:
        if row['split'] != 'holdout':
            continue
        f = row['offset_hz']
        interval = next(((a, b) for a, b in zip(fitted, fitted[1:])
                         if a['offset_hz'] < f < b['offset_hz']), None)
        if not interval:
            raise ValueError('Every holdout must lie between fit markers')
        left, right = interval
        weight = math.log(f / left['offset_hz']) / math.log(right['offset_hz'] / left['offset_hz'])
        prediction = (1-weight) * left['ssb_dbc_per_hz'] + weight * right['ssb_dbc_per_hz']
        holdouts.append({
            **row, 'fit_bounds_hz': [left['offset_hz'], right['offset_hz']],
            'prediction_dbc_per_hz': prediction, 'residual_db': prediction - row['ssb_dbc_per_hz'],
        })
    if not holdouts:
        raise ValueError('Expected at least one holdout')
    return {
        'method': 'piecewise linear in log10(offset) and dBc/Hz; no extrapolation',
        'fit_count': len(fitted),
        'holdouts': holdouts,
        'rms_residual_db': math.sqrt(sum(row['residual_db']**2 for row in holdouts) / len(holdouts)),
        'max_abs_residual_db': max(abs(row['residual_db']) for row in holdouts),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('markers', type=Path)
    parser.add_argument('new_output_file', type=Path)
    args = parser.parse_args()
    measurement = json.loads(args.markers.read_text())
    evidence = compare(measurement)
    result = json.dumps({'measurement': measurement, 'validation': evidence}, indent=2) + '\n'
    with args.new_output_file.open('x') as f:
        f.write(result)
    print(json.dumps(evidence, indent=2))


if __name__ == '__main__':
    main()
