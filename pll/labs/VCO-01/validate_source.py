#!/usr/bin/env python3
"""Offline, fast source-contract checks for VCO-01.

Does NOT execute ngspice or certify cloud L3/L4. Checks that the existing
27-case website data, ZIP baseline and export pipeline agree.
"""
import ast
import csv
import json
import re
import tempfile
import zipfile
from pathlib import Path

from export_l2 import export, inspect_samples

REPO = Path(__file__).resolve().parents[3]
LABS = Path(__file__).resolve().parent
ZIP = REPO / "pll/assets/lc-vco-lab.zip"
HTML = REPO / "pll/chapters/08_VCO与DCO可控振荡器.html"
NB = LABS / "VCO-01_Kaggle_L3_L4.ipynb"


def main():
    assert ZIP.exists(), ZIP
    assert HTML.exists(), HTML
    with zipfile.ZipFile(ZIP) as archive:
        names = set(archive.namelist())
        for name in ["README.md", "package-lock.json", "run.mjs", "vco.cir",
                     "baseline.csv", "models/sky130_fd_pr__nfet_01v8__tt.pm3.spice"]:
            assert "lc-vco-lab/" + name in names, name
        baseline = archive.read("lc-vco-lab/baseline.csv").decode("utf-8")
        rows = list(csv.DictReader(baseline.splitlines()))
        assert len(rows) == 27, len(rows)
        assert b"eecircuit-engine" in archive.read("lc-vco-lab/package-lock.json")
        print("ZIP source: 27 baseline cases and locked engine/model verified")

    html = HTML.read_text(encoding="utf-8")
    match = re.search(r"const\s+samples\s*=\s*", html)
    assert match, "chapter 08 has no embedded samples array"
    samples, _ = json.JSONDecoder().raw_decode(html[match.end():])
    inspect_samples(samples, expected_count=27)
    print("Chapter 08: 27 embedded L2 SPICE records found")

    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        sample_file = root / "web-data.json"
        baseline_file = root / "baseline.csv"
        sample_file.write_text(json.dumps(samples), encoding="utf-8")
        baseline_file.write_text(baseline, encoding="utf-8")
        meta = export(sample_file, baseline_file, root / "out", "offline-test", ZIP)
        assert meta["cases"] == 27
        reread = json.loads((root / "out/web-data.json").read_text(encoding="utf-8"))
        assert reread == samples, "export should preserve the currently displayed samples"
        assert (root / "out/l2_manifest.json").exists()
        print("L2 export smoke test: same 27 rows and baseline metrics")

    ast.parse((LABS / "export_l2.py").read_text(encoding="utf-8"))
    notebook = json.loads(NB.read_text(encoding="utf-8"))
    assert notebook["nbformat"] == 4
    for index, cell in enumerate(notebook["cells"]):
        if cell["cell_type"] == "code":
            ast.parse("".join(cell["source"]), filename=f"cell-{index}")
    print(f"Notebook syntax: {len(notebook['cells'])} cells parsed")
    print("PASS: offline source and notebook checks; REAL NGSPICE/KAGGLE STILL TO TEST")


if __name__ == "__main__":
    main()
