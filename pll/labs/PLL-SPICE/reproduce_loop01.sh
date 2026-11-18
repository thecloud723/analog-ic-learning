#!/usr/bin/env bash
# Run the standard LOOP-01 author experiment without a notebook.
set -euo pipefail

if [[ $# != 1 ]]; then
  echo "Usage: bash reproduce_loop01.sh NEW_OUTPUT_DIR" >&2
  exit 2
fi
lab=$(cd "$(dirname "$0")" && pwd)
pll=$(cd "$lab/../.." && pwd)
mkdir "$1"
out=$(cd "$1" && pwd)
temp=$(mktemp -d)
trap 'rm -rf "$temp"' EXIT

unzip -q "$pll/assets/lc-vco-lab.zip" -d "$temp"
engine="$temp/lc-vco-lab"
cp "$lab/pll_spice_series.mjs" "$lab/compare_loop01_cp.mjs" "$engine/"
npm ci --prefix "$engine" --no-audit --no-fund 2>&1 | tee "$out/install.log"

node "$lab/check_loop01_pfd.mjs" | tee "$out/pfd.jsonl"
node "$engine/compare_loop01_cp.mjs" "$out/pulse" "$lab/settings.json" "$pll/course/coupled-loop.js" |
  tee "$out/pulse.log"
node "$engine/pll_spice_series.mjs" "$engine" "$out/spice" "$lab/settings.json" |
  tee "$out/spice.log"
node "$lab/calibrate_loop01.mjs" "$out/spice/pll-01-vco-metrics.json" "$out/calibrated.json"
python3 "$lab/check_loop01_nonideal.py" "$lab/settings.json" "$out/calibrated.json" "$out/nonideal" |
  tee "$out/nonideal.log"
python3 "$lab/compare_loop01_average.py" "$out/spice" "$out/average" | tee "$out/average.log"
python3 - "$lab" "$out" <<'PY'
import json
from pathlib import Path
import subprocess
import sys

lab, out = map(Path, sys.argv[1:])
cases = json.loads((out / 'nonideal' / 'comparison.json').read_text())
runs = [row['run']['directory'] for row in cases if row['case'] in (0, 4, 7)]
subprocess.run([sys.executable, lab / 'export_loop01_web.py', out / 'loop01-replay-data.js', *runs],
               check=True)
PY
echo "LOOP-01 evidence saved to $out"
