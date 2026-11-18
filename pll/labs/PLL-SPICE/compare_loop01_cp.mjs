import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { Simulation } from 'eecircuit-engine';

const [out, configFile] = process.argv.slice(2);
if (!out || !configFile) throw new Error('Usage: node compare_loop01_cp.mjs OUTPUT_DIR COMMON_SETTINGS_JSON');
const config = JSON.parse(readFileSync(configFile, 'utf8'));
const resistance = config.loop_r_ohm, capacitance = config.loop_c_pF * 1e-12;
const pump = config.cp_uA * 1e-6;
if (![resistance, capacitance, pump].every(x => Number.isFinite(x) && x > 0)) {
  throw new Error('Positive loop resistance, capacitance and pump current are required');
}
mkdirSync(out, { recursive: true });
const sim = new Simulation();
await sim.start();
const cases = [
  ['up', pump], ['down', -pump],
  ['matched-overlap', 0], ['mismatched-overlap', pump * config.cp_mismatch],
];
const start = 1e-9, rise = 1e-12, width = 0.5e-9, initial = 0.9, stop = 3e-9;
const rampEnd = start + rise, fallStart = rampEnd + width, end = fallStart + rise;
// Integral of the unit-height trapezoid, in seconds.
function areaAt(time) {
  if (time <= start) return 0;
  if (time < rampEnd) return (time - start) ** 2 / (2 * rise);
  if (time <= fallStart) return rise / 2 + time - rampEnd;
  if (time < end) return rise + width - (end - time) ** 2 / (2 * rise);
  return width + rise;
}
function heightAt(time) {
  return Math.max(0, Math.min(1, (time - start) / rise, (end - time) / rise));
}
const results = [];
for (const [name, peak] of cases) {
  const deck = [
    'LOOP-01 independent CP pulse into series RC',
    `Icp 0 vctrl PWL(0 0 ${start} 0 ${rampEnd} ${peak} ${fallStart} ${peak} ${end} 0)`,
    `Rlf vctrl cap ${resistance}`,
    `Clf cap 0 ${capacitance} IC=${initial}`,
    `.tran 0.2p ${stop} 0 0.2p uic`,
    '.save v(vctrl) v(cap)', '.end', '',
  ].join('\n');
  writeFileSync(join(out, name + '.cir'), deck);
  sim.setNetList(deck);
  const result = await sim.runSim();
  const field = name => result?.data?.find(item => item.name.toLowerCase() === name)?.values;
  const time = field('time'), node = field('v(vctrl)'), cap = field('v(cap)');
  if (!time?.length || time.at(-1) < stop * 0.9999 ||
      ![node, cap].every(column => column?.length === time.length &&
        Array.from(column).every(Number.isFinite))) {
    throw new Error(name + ': incomplete or non-finite transient');
  }
  let maxCapError = 0, maxNodeError = 0;
  const lines = ['time_s,spice_node_v,spice_cap_v,reference_node_v,reference_cap_v'];
  for (let i = 0; i < time.length; i++) {
    const expectedCap = initial + peak * areaAt(time[i]) / capacitance;
    const expectedNode = expectedCap + resistance * peak * heightAt(time[i]);
    maxCapError = Math.max(maxCapError, Math.abs(cap[i] - expectedCap));
    maxNodeError = Math.max(maxNodeError, Math.abs(node[i] - expectedNode));
    lines.push([time[i], node[i], cap[i], expectedNode, expectedCap].join(','));
  }
  writeFileSync(join(out, name + '.csv'), lines.join('\n') + '\n');
  results.push({name, peakA: peak, samples: time.length, expectedChargeC: peak * (width + rise),
    observedChargeC: capacitance * (cap.at(-1) - initial), maxCapError, maxNodeError});
}
writeFileSync(join(out, 'comparison.json'), JSON.stringify(results, null, 2) + '\n');
console.log(JSON.stringify(results, null, 2));
if (results.some(row => row.maxCapError > 2e-6 || row.maxNodeError > 2e-6)) process.exitCode = 1;
