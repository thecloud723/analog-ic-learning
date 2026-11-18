import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Simulation } from 'eecircuit-engine';

const [out, configFile, modelFile] = process.argv.slice(2);
if (!out || !configFile) throw new Error('Usage: node compare_loop01_cp.mjs OUTPUT_DIR COMMON_SETTINGS_JSON [LOOP_MODEL_JS]');
const config = JSON.parse(readFileSync(configFile, 'utf8'));
const shunt = (config.loop_cp_pF ?? 0) * 1e-12;
const loop = modelFile ? (await import(pathToFileURL(resolve(modelFile)).href)).default : null;
if (loop && !(shunt > 0)) throw new Error('A positive parallel capacitance is required for the two-capacitor comparison');
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
const topologies = loop ? [[0, 0], [shunt, 0], [shunt, 100e3]] : [[0, 0]];
for (const [parallel, rout] of topologies) for (const [kind, peak] of cases) {
  const name = (rout ? 'finite-rout-' : parallel ? 'parallel-' : '') + kind;
  const deck = [
    'LOOP-01 independent CP pulse into series RC',
    `Icp 0 vctrl PWL(0 0 ${start} 0 ${rampEnd} ${peak} ${fallStart} ${peak} ${end} 0)`,
    `Rlf vctrl cap ${resistance}`,
    `Clf cap 0 ${capacitance} IC=${initial}`,
    ...(parallel ? [`Cp vctrl 0 ${parallel} IC=${initial}`] : []),
    ...(rout ? [`Vbias bias 0 ${initial}`, `Rout vctrl bias ${rout}`] : []),
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
  const step = rout
    ? loop.resistiveShuntInterval(0, 0, 1, resistance, capacitance, parallel, rout, 0)
    : parallel ? loop.shuntInterval(0, 0, 1, resistance, capacitance, parallel) : null;
  // In a linear circuit a finite-rise PWL pulse is the sum of four time-shifted ramps.
  const rampIntegral = (time, edge, node) => {
    const ns = (time - edge) * 1e9;
    return ns > 0 ? ns * (node ? step.meanControl(0, ns) : step.meanInternal(0, ns)) : 0;
  };
  let maxCapError = 0, maxNodeError = 0;
  const lines = ['time_s,spice_node_v,spice_cap_v,reference_node_v,reference_cap_v'];
  for (let i = 0; i < time.length; i++) {
    const charge = peak * areaAt(time[i]);
    let expectedCap, expectedNode;
    if (step) {
      const t = time[i];
      const delta = node => peak / (rise * 1e9) *
        (rampIntegral(t, start, node) - rampIntegral(t, rampEnd, node)
          - rampIntegral(t, fallStart, node) + rampIntegral(t, end, node));
      const nodeDelta = delta(true);
      expectedNode = initial + nodeDelta;
      expectedCap = initial + (rout ? delta(false) : (charge - parallel * nodeDelta) / capacitance);
    } else {
      expectedCap = initial + charge / capacitance;
      expectedNode = expectedCap + resistance * peak * heightAt(time[i]);
    }
    maxCapError = Math.max(maxCapError, Math.abs(cap[i] - expectedCap));
    maxNodeError = Math.max(maxNodeError, Math.abs(node[i] - expectedNode));
    lines.push([time[i], node[i], cap[i], expectedNode, expectedCap].join(','));
  }
  writeFileSync(join(out, name + '.csv'), lines.join('\n') + '\n');
  let resistorCharge = 0;
  if (rout) for (let i = 1; i < time.length; i++) {
    resistorCharge += (time[i] - time[i - 1]) * (node[i] + node[i - 1] - 2 * initial) / (2 * rout);
  }
  results.push({name, peakA: peak, samples: time.length, expectedChargeC: peak * (width + rise),
    observedChargeC: capacitance * (cap.at(-1) - initial) + parallel * (node.at(-1) - initial) + resistorCharge,
    maxCapError, maxNodeError});
}
writeFileSync(join(out, 'comparison.json'), JSON.stringify(results, null, 2) + '\n');
console.log(JSON.stringify(results, null, 2));
if (results.some(row => row.maxCapError > 2e-6 || row.maxNodeError > 2e-6)) process.exitCode = 1;
