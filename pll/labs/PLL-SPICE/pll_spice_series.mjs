import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {join, resolve, dirname} from 'node:path';

const [inputArg, outArg, settingsArg] = process.argv.slice(2);
const input = resolve(inputArg);
const out = resolve(outArg);
const settings = JSON.parse(readFileSync(settingsArg, 'utf8'));
import {Simulation} from "eecircuit-engine";
const sim = new Simulation();
await sim.start();
mkdirSync(out, {recursive: true});

function readDeck(path) {
  return readFileSync(path, 'utf8').replace(/^\s*\.include ["']?([^\s"']+)["']?\s*$/gm,
    (_, name) => readDeck(join(dirname(path), name)));
}

async function run(id, deck, names, stop) {
  writeFileSync(join(out, id + '.cir'), deck);
  sim.setNetList(deck);
  const result = await sim.runSim();
  const columns = ['time', ...names].map(name =>
    result?.data?.find(item => item.name.toLowerCase() === name)?.values);
  const time = columns[0];
  if (!time || time.at(-1) < stop * (1 - 1e-6) ||
      columns.some(c => c?.length !== time.length || c.some(x => !Number.isFinite(x)))) {
    throw new Error(id + ': incomplete ngspice transient');
  }
  let csv = ['time_s', ...names].join(',') + '\n';
  for (let i = 0; i < time.length; i++) csv += columns.map(c => c[i]).join(',') + '\n';
  writeFileSync(join(out, id + '.csv'), csv);
  return columns;
}

const {reference_hz, divide, tune_v, cap_fF, junction_fF, cp_uA, loop_r_ohm,
  loop_c_pF, initial_offset_hz, run_us, cp_mismatch, reset_ns} = settings;
const target = reference_hz * divide;
if (!Number.isSafeInteger(divide) || divide < 1 || reference_hz <= 0 || cp_uA <= 0 ||
    loop_r_ohm <= 0 || loop_c_pF <= 0 || run_us <= 0 || initial_offset_hz === 0 ||
    cp_mismatch < 0 || cp_mismatch >= .25 || reset_ns <= .1 ||
    tune_v.length < 5 || tune_v.some((v,i) => v < 0 || v > 1.8 || (i && v <= tune_v[i-1]))) {
  throw new Error('Check PLL settings and ordered 0–1.8 V tuning grid');
}
const original = readDeck(join(input, 'vco.cir'));
const points = [];
for (const [i, voltage] of tune_v.entries()) {
  const label = 'pll-01-vco-' + String(i + 1).padStart(2, '0');
  const deck = original.replace('tankC=810f', 'tankC=' + cap_fF + 'f')
    .replace('tstop=120n', 'tstop=140n')
    .replace('CN outn 0 {tankC}', [
      'CN outn 0 {tankC}',
      '* AC coupling gives both junctions the same independently biased DC operating point.',
      'VC vctrl 0 ' + voltage,
      'CBP outp tune_p 5p',
      'CBN outn tune_n 5p',
      'RBP tune_p vctrl 100k',
      'RBN tune_n vctrl 100k',
      'DVP 0 tune_p DVAR',
      'DVN 0 tune_n DVAR',
      '.model DVAR D(Is=1e-16 Cjo=' + junction_fF + 'f Vj=.65 M=.5)',
    ].join('\n'));
  const [time, p, n] = await run(label, deck, ['v(outp)', 'v(outn)', 'i(vdd)'], 140e-9);
  const peaks = [0, 0];
  const edges = [];
  for (let j = 1; j < time.length; j++) {
    if (time[j] < 90e-9) continue;
    const signal = p[j] - n[j];
    const previous = p[j - 1] - n[j - 1];
    const window = Number(time[j] >= 115e-9);
    peaks[window] = Math.max(peaks[window], Math.abs(signal));
    if (previous < 0 && signal >= 0)
      edges.push(time[j - 1] - previous * (time[j] - time[j - 1]) / (signal - previous));
  }
  const steady = peaks[1] > .025 && Math.abs(peaks[0] - peaks[1]) / peaks[1] < .05 && edges.length > 3;
  const hz = steady ? (edges.length - 1) / (edges.at(-1) - edges[0]) : null;
  points.push({voltage, hz, peak_v: peaks[1], trace: label + '.csv'});
  console.log(label, voltage, hz, peaks[1]);
}
writeFileSync(join(out, 'pll-01-vco-metrics.json'), JSON.stringify(points, null, 2));

const j = points.findIndex((p, i) => i > 0 && p.hz >= target && points[i - 1].hz && points[i - 1].hz < target);
if (j < 1 || points.some((p, i) => !p.hz || (i && p.hz <= points[i - 1].hz)))
  throw new Error('Provide a steady monotonic tuning grid crossing the target');
const a = points[j - 1], b = points[j];
const gain = (b.hz - a.hz) / (b.voltage - a.voltage);
const lockVoltage = a.voltage + (target - a.hz) / gain;
const initialFrequency = target + initial_offset_hz;
const k = points.findIndex((p, i) => i > 0 && p.hz >= initialFrequency);
if (k < 1 || initialFrequency <= points[0].hz) throw new Error('Initial frequency outside sweep');
const c = points[k - 1], d = points[k];
const piecewiseInitial = c.voltage + (initialFrequency - c.hz) * (d.voltage - c.voltage) / (d.hz - c.hz);
const minVoltage = points[0].voltage, maxVoltage = points.at(-1).voltage;
const linearInitial = lockVoltage + initial_offset_hz / gain;
if (linearInitial <= minVoltage || linearInitial >= maxVoltage) throw new Error('Linear initial voltage outside sweep');
const limited = 'min(max(v(ctrl),' + minVoltage + '),' + maxVoltage + ')';
const interpolate = points.slice(1,-1).reduce((expr, p, i) => {
  const slope0 = (p.hz - points[i].hz) / (p.voltage - points[i].voltage);
  const slope1 = (points[i+2].hz - p.hz) / (points[i+2].voltage - p.voltage);
  return expr + '+(' + (slope1-slope0) + ')*max(' + limited + '-' + p.voltage + ',0)';
}, points[0].hz + '+(' + (points[1].hz-points[0].hz)/(points[1].voltage-points[0].voltage) + ')*(' + limited + '-' + minVoltage + ')');

const period = 1 / reference_hz;
const rise = 50e-12;
const overlap = reset_ns * 1e-9;
const pump = cp_uA * 1e-6;
const chargePoints = [];
for (const [i, skew] of [-1, -.5, 0, .5, 1].entries()) {
  const dt = skew * 1e-9;
  const start = period / 4;
  const upStart = start + Math.max(0,-dt);
  const dnStart = start + Math.max(0,dt);
  const upWidth = overlap + Math.max(0,dt);
  const dnWidth = overlap + Math.max(0,-dt);
  const label = 'pll-02-cp-' + String(i + 1).padStart(2,'0');
  const deck = [
    'PLL-02 pulse-driven charge pump at the PLL reference rate',
    'Iup 0 up PULSE(0 ' + pump + ' ' + upStart + ' ' + rise + ' ' + rise + ' ' + upWidth + ' ' + period + ')',
    'Idn dn 0 PULSE(0 ' + pump*(1-cp_mismatch) + ' ' + dnStart + ' ' + rise + ' ' + rise + ' ' + dnWidth + ' ' + period + ')',
    'Vup up ctrl 0',
    'Vdn ctrl dn 0',
    'Rfilter ctrl state ' + loop_r_ohm,
    'Cfilter state 0 ' + loop_c_pF + 'p IC=' + lockVoltage,
    '.save v(ctrl) v(state) i(vup) i(vdn)',
    '.tran 25p ' + period + ' 0 25p uic',
    '.end',
  ].join('\n');
  const [t, ctrl,, up, dn] = await run(label, deck, ['v(ctrl)','v(state)','i(vup)','i(vdn)'], period);
  let charge = 0;
  for (let m = 1; m < t.length; m++) {
    charge += (t[m]-t[m-1]) * (up[m]+up[m-1]-dn[m]-dn[m-1])/2;
  }
  chargePoints.push({skew_ns: skew, charge_fC: charge*1e15, vctrl_pp_v: Math.max(...ctrl)-Math.min(...ctrl)});
}
writeFileSync(join(out, 'pll-02-cp-metrics.json'), JSON.stringify(chargePoints,null,2));
const offsetA = chargePoints[2].charge_fC * 1e-15 / period;
const downGainA = (chargePoints[2].charge_fC-chargePoints[0].charge_fC) * 1e-6;
const upGainA = (chargePoints[4].charge_fC-chargePoints[2].charge_fC) * 1e-6;

for (const [mode, voltage, expression, nonideal] of [
  ['linear', linearInitial, target + '+' + gain + '*(' + limited + '-' + lockVoltage + ')'],
  ['calibrated', piecewiseInitial, interpolate],
  // At phase error zero the CP offset causes an instantaneous I*R step.
  ['calibrated-cp', piecewiseInitial - offsetA*loop_r_ohm, interpolate, true],
]) {
  const stop = run_us * 1e-6;
  const deck = [
    'PLL-03 SKY130-calibrated averaged integer-N CP-PLL: ' + mode,
    '* Frequency output node is scaled to GHz. Phase-error node is in reference cycles.',
    'Bfreq freq 0 V={(' + expression + ')/1e9}',
    'Bphase 0 phase I={' + reference_hz + '-v(freq)*1e9/' + divide + '}',
    'Cphase phase 0 1 IC=0',
    'Bpump 0 ctrl I={' + (nonideal
      ? offsetA + '+(' + upGainA + ')*min(max(v(phase),0),1)+(' + downGainA + ')*max(min(v(phase),0),-1)'
      : cp_uA + 'u*min(max(v(phase),-1),1)') + '}',
    'Rfilter ctrl state ' + loop_r_ohm,
    'Cfilter state 0 ' + loop_c_pF + 'p IC=' + voltage,
    '.save v(freq) v(phase) v(ctrl) v(state)',
    '.tran 1n ' + stop + ' 0 1n uic',
    '.end',
  ].join('\n');
  await run('pll-03-loop-' + mode, deck, ['v(freq)', 'v(phase)', 'v(ctrl)', 'v(state)'], stop);
}
writeFileSync(join(out, 'pll-03-loop-config.json'), JSON.stringify({
  target_hz: target, lock_voltage_v: lockVoltage, gain_hz_v: gain,
  cp_offset_a: offsetA, cp_up_gain_a: upGainA, cp_down_gain_a: downGainA,
  linear_initial_v: linearInitial, calibrated_initial_v: piecewiseInitial, settings,
}, null, 2));

/* Locked-period bench: explicit UP/DN pulses with zero net charge per period. */
const shunt = settings.loop_cp_pF * 1e-12;
if (!Number.isFinite(shunt) || shunt <= 0) throw new Error('Set loop_cp_pF > 0');
const spurCycles = 16;
const spurStop = spurCycles * period;
const start = period / 4;
const spurCases = [];
for (const [caseName, mismatch, stepPs] of [
  ['matched', 0, 12.5],
  ['mismatch', cp_mismatch, 12.5],
  ['mismatch-fine', cp_mismatch, 6.25],
]) {
  // PULSE area includes one rise-time equivalent from the two ramps.
  // Lower DN current needs a longer DN pulse; its rising edge arrives first.
  const delta = (overlap + rise) * mismatch / (1 - mismatch);
  const step = stepPs * 1e-12;
  if (start + delta + overlap + 2 * rise >= period)
    throw new Error('PLL-04 pump pulse does not fit inside one PFD cycle');
  const label = 'pll-04-' + caseName;
  const deck = [
    'PLL-04 locked periodic CP ripple with post-resistor and shunt capacitances',
    'Iup 0 up PULSE(0 ' + pump + ' ' + (start + delta) + ' ' + rise + ' ' + rise + ' ' + overlap + ' ' + period + ')',
    'Idn dn 0 PULSE(0 ' + pump*(1-mismatch) + ' ' + start + ' ' + rise + ' ' + rise + ' ' + (overlap+delta) + ' ' + period + ')',
    'Vup up ctrl 0',
    'Vdn ctrl dn 0',
    'Rfilter ctrl state ' + loop_r_ohm,
    'Cfilter state 0 ' + loop_c_pF + 'p IC=' + lockVoltage,
    'Cshunt ctrl 0 ' + shunt + ' IC=' + lockVoltage,
    'Bfreq freq 0 V={(' + interpolate + ')/1e9}',
    '.save v(ctrl) v(state) v(freq) i(vup) i(vdn)',
    '.tran ' + step + ' ' + spurStop + ' 0 ' + step + ' uic',
    '.end',
  ].join('\n');
  await run(label, deck, ['v(ctrl)', 'v(state)', 'v(freq)', 'i(vup)', 'i(vdn)'], spurStop);
  spurCases.push({case: caseName, file: label + '.csv', mismatch, edge_skew_s: -delta, step_ps: stepPs});
}
writeFileSync(join(out, 'pll-04-config.json'), JSON.stringify({
  period_s: period, cycles: spurCycles, cases: spurCases, settings, gain_hz_v: gain,
  target_hz: target,
}, null, 2));
