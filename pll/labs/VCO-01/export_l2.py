#!/usr/bin/env python3
"""Export the actual ngspice-WASM VCO-01 sweep to the offline HTML L2 format.

Input must be run.mjs --web output. Formula-only JS curves do not qualify as L2.
The output remains a 27-row array compatible with the existing chapter 08 samples.
"""
import argparse
import csv
import datetime as dt
import hashlib
import json
import math
from pathlib import Path

PARAMS = ("l", "c", "rs", "w", "length", "bias", "kick")
FIELDS = (*PARAMS, "state", "f", "vpp", "power", "env", "p", "n")
STATES = {"steady", "transient", "decay"}
TRACE_LENGTHS = {"env": 241, "p": 201, "n": 201}
TOLERANCE = {"f": (0.005, 0.015), "vpp": (0.05, 0.0001),
             "power": (0.05, 0.005)}


def finite_number(value):
    return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value)


def key(row):
    return tuple(float(row[name]) for name in PARAMS)


def inspect_samples(samples, expected_count):
    if not isinstance(samples, list) or len(samples) != expected_count:
        raise ValueError(f"expected {expected_count} sample rows, got {len(samples) if isinstance(samples, list) else type(samples).__name__}")
    seen = set()
    for i, row in enumerate(samples, 1):
        missing = set(FIELDS) - set(row)
        if missing:
            raise ValueError(f"row {i}: missing fields {sorted(missing)}")
        if any(not finite_number(row[name]) for name in PARAMS):
            raise ValueError(f"row {i}: invalid parameter")
        if row["state"] not in STATES:
            raise ValueError(f"row {i}: invalid state {row['state']!r}")
        if row["state"] == "steady" and not finite_number(row["f"]):
            raise ValueError(f"row {i}: steady frequency missing")
        if row["state"] != "steady" and row["f"] is not None:
            raise ValueError(f"row {i}: non-steady frequency should be null")
        if not finite_number(row["vpp"]) or not finite_number(row["power"]):
            raise ValueError(f"row {i}: invalid summary value")
        if row["vpp"] < 0 or row["power"] < 0:
            raise ValueError(f"row {i}: negative voltage or power")
        for field, length in TRACE_LENGTHS.items():
            values = row[field]
            if not isinstance(values, list) or len(values) != length or any(not finite_number(v) for v in values):
                raise ValueError(f"row {i}: expected {length} finite {field} samples")
        identity = key(row)
        if identity in seen:
            raise ValueError(f"duplicate sweep coordinates at row {i}")
        seen.add(identity)


def compare_baseline(samples, csv_path):
    with csv_path.open(newline="", encoding="utf-8") as f:
        baseline = {key(row): row for row in csv.DictReader(f)}
    if len(baseline) != len(samples):
        raise ValueError(f"baseline has {len(baseline)} rows; generated grid has {len(samples)}")
    worst = {name: 0.0 for name in TOLERANCE}
    for row in samples:
        ident = key(row)
        if ident not in baseline:
            raise ValueError(f"baseline lacks sweep point {ident}")
        old = baseline[ident]
        if row["state"] != old["state"]:
            raise ValueError(f"state changed at {ident}: {old['state']} -> {row['state']}")
        for name, (rtol, atol) in TOLERANCE.items():
            old_value = None if old[name] == "" else float(old[name])
            new_value = row[name]
            if (old_value is None) != (new_value is None):
                raise ValueError(f"{name} availability differs at {ident}")
            if old_value is None:
                continue
            delta = abs(float(new_value) - old_value)
            worst[name] = max(worst[name], delta)
            if delta > max(atol, rtol * abs(old_value)):
                raise ValueError(f"{name} drift at {ident}: baseline={old_value}, new={new_value}")
    return worst


def export(web_json, baseline_csv, output_dir, source_commit, package_zip):
    samples = json.loads(web_json.read_text(encoding="utf-8"))
    inspect_samples(samples, expected_count=27)
    drift = compare_baseline(samples, baseline_csv)
    # Exact field selection; preserve original source precision and sample points.
    l2 = [{field: row[field] for field in FIELDS} for row in samples]
    output_dir.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(l2, ensure_ascii=False, separators=(",", ":"), allow_nan=False)
    (output_dir / "web-data.json").write_text(payload + "\n", encoding="utf-8")
    (output_dir / "web-data.js").write_text(
        "globalThis.pllVco01Samples = " + payload + ";\n", encoding="utf-8")
    metadata = {
        "experiment_id": "VCO-01",
        "level": "L2",
        "source_level": "L3",
        "data_kind": "SPICE transient simulation, not a measured waveform",
        "engine": "EEcircuit-engine 1.9.0 (ngspice 45.2 WASM)",
        "corner": "SKY130 NMOS TT, 27 degC",
        "source_repo": "thecloud723/analog-ic-learning",
        "source_commit": source_commit,
        "source_zip_sha256": hashlib.sha256(package_zip.read_bytes()).hexdigest(),
        "source_web_data_sha256": hashlib.sha256(web_json.read_bytes()).hexdigest(),
        "generated_utc": dt.datetime.now(dt.timezone.utc).isoformat(),
        "cases": len(l2),
        "axes": {"l_nH": [0.8, 1.0, 1.2], "c_fF": [680, 810, 970],
                 "rs_ohm": [2.2, 3.3, 18]},
        "traces": {"env": {"points": 241, "quantity": "peak abs differential voltage per 0.5 ns bin", "unit": "V"},
                   "p": {"points": 201, "quantity": "outp 100..101.6 ns", "unit": "V"},
                   "n": {"points": 201, "quantity": "outn 100..101.6 ns", "unit": "V"}},
        "metrics_units": {"f": "GHz", "vpp": "V", "power": "mW"},
        "compression": "selected plotting fields only; no additional rounding/interpolation",
        "baseline_comparison_max_abs_diff": drift,
        "verified_against": "baseline.csv from same pinned source ZIP",
        "not_phase_noise": "Transient FFT (if produced separately) is not PSS/PNoise or dBc/Hz."
    }
    (output_dir / "l2_manifest.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    # Offline correctness check: exported field values must equal the full run.
    reread = json.loads((output_dir / "web-data.json").read_text(encoding="utf-8"))
    if reread != l2:
        raise AssertionError("L2 export roundtrip mismatch")
    return metadata


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--web-json", type=Path, required=True)
    parser.add_argument("--baseline", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--package-zip", type=Path, required=True)
    parser.add_argument("--source-commit", required=True)
    args = parser.parse_args()
    meta = export(args.web_json, args.baseline, args.output_dir,
                  args.source_commit, args.package_zip)
    print(f"L2 exported: {meta['cases']} verified SPICE cases to {args.output_dir}")
    print(f"Worst absolute baseline deviations: {meta['baseline_comparison_max_abs_diff']}")


if __name__ == "__main__":
    main()
