import { execFileSync } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import loop from '../../course/coupled-loop.js';

const here = new URL('./', import.meta.url);
const readJson = (filename) => JSON.parse(readFileSync(filename, 'utf8'));
const [outputRoot, commonPath, modelPath] = process.argv.slice(2);
if (!outputRoot || process.argv.length > 5) {
  throw new Error('Usage: node run_loop01.mjs OUTPUT_ROOT [COMMON_SETTINGS_JSON] [LOOP_SETTINGS_JSON]');
}
const common = readJson(commonPath || new URL('settings.json', here));
const model = readJson(modelPath || new URL('loop01-settings.json', here));
const config = {
  referenceHz: common.reference_hz,
  divider: common.divide,
  pumpA: common.cp_uA * 1e-6,
  resistanceOhm: common.loop_r_ohm,
  capacitanceF: common.loop_c_pF * 1e-12,
  voltageMin: model.voltageMin,
  voltageMax: model.voltageMax,
  initialVoltage: model.initialVoltage,
  linear: model.linear,
  curved: model.curved,
};
const offset = common.initial_offset_hz / 1e6;
const mismatch = common.cp_mismatch * 100;
const lock = model.lock;
const positive = value => Number.isFinite(value) && value > 0;
const requireSetting = (condition, label) => {
  if (!condition) throw new Error('Invalid LOOP-01 configuration: ' + label);
};
requireSetting(
  [config.referenceHz, config.pumpA, config.resistanceOhm, config.capacitanceF].every(positive) &&
    Number.isSafeInteger(config.divider) && config.divider > 0,
  'reference, divider, charge-pump current, and loop RC',
);
requireSetting(
  [config.voltageMin, config.initialVoltage, config.voltageMax].every(Number.isFinite) &&
    config.voltageMin < config.initialVoltage && config.initialVoltage < config.voltageMax,
  'control voltage range',
);
requireSetting(['linear', 'curved'].includes(model.model) && positive(model.durationUs), 'model and duration');
const targetMHz = config.referenceHz * config.divider / 1e6;
for (const name of ['linear', 'curved']) {
  const knots = config[name];
  requireSetting(Array.isArray(knots) && knots.length >= 2 &&
    knots.every((point, index) => Array.isArray(point) && point.length === 2 &&
      point.every(Number.isFinite) && targetMHz + offset + point[1] > 0 &&
      (index === 0 || point[0] > knots[index - 1][0])) &&
    knots[0][0] === config.voltageMin && knots.at(-1)[0] === config.voltageMax, name + ' tuning knots');
}
const periodNs = 1e9 / config.referenceHz;
requireSetting(Number.isFinite(mismatch) && mismatch >= 0 && mismatch < 100 &&
  Number.isFinite(common.reset_ns) && common.reset_ns >= 0 && common.reset_ns < periodNs,
  'charge-pump mismatch and reset delay');
requireSetting(positive(lock.frequencyToleranceHz) && positive(lock.maxPhaseErrorCycles) &&
  lock.maxPhaseErrorCycles < 0.5 && positive(lock.holdUs) && lock.holdUs < model.durationUs,
  'lock criteria');

const events = [];
const samples = loop.simulate({
  offset, mismatch, resetDelay: common.reset_ns, curve: model.model, duration: model.durationUs,
  config, onEvent: event => events.push(event),
});

const phaseErrorUnwrapped = sample => sample.ns / periodNs - sample.phase;
const phaseError = sample => {
  const error = phaseErrorUnwrapped(sample);
  return error - Math.round(error);
};
let start = null;
let confirmed = null;
for (const sample of samples.slice(1)) {
  const inBand = Math.abs(sample.mhz * 1e6) <= lock.frequencyToleranceHz &&
    Math.abs(phaseError(sample)) <= lock.maxPhaseErrorCycles &&
    sample.cap > config.voltageMin && sample.cap < config.voltageMax;
  if (!inBand) {
    start = null;
    continue;
  }
  start ??= sample.ns;
  if (sample.ns - start >= lock.holdUs * 1000 - 1e-6) {
    confirmed = { entryUs: start / 1000, confirmationUs: sample.ns / 1000 };
    break;
  }
}
let sourceCommit = null;
let sourceModified = null;
try {
  const options = { cwd: fileURLToPath(here), encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] };
  sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], options).trim();
  sourceModified = execFileSync('git', ['status', '--porcelain', '--', '.', '../../course/coupled-loop.js'], options).trim() !== '';
} catch {
  // The runner also works from a source archive without Git metadata.
}
const modelSha256 = createHash('sha256').update(readFileSync(new URL('../../course/coupled-loop.js', here))).digest('hex');
let phaseAnchor = phaseErrorUnwrapped(samples[0]);
let cycleSlips = 0;
let saturatedSamples = 0;
for (const sample of samples) {
  const wholeCycles = Math.trunc(phaseErrorUnwrapped(sample) - phaseAnchor);
  phaseAnchor += wholeCycles;
  cycleSlips += Math.abs(wholeCycles);
  if (sample.cap <= config.voltageMin || sample.cap >= config.voltageMax) saturatedSamples++;
}
const runId = randomUUID();
const directory = join(resolve(outputRoot), runId);
const summary = {
  runId, sourceCommit, sourceModified, modelSha256, engine: 'piecewise-linear event model',
  node: process.version, createdAt: new Date().toISOString(), targetHz: targetMHz * 1e6,
  samples: samples.length, events: events.length, cycleSlips, saturatedSamples, lock: confirmed,
  finalFrequencyErrorHz: samples.at(-1).mhz * 1e6,
  finalPhaseErrorCycles: phaseError(samples.at(-1)), finalCapacitorVoltageV: samples.at(-1).cap,
};
mkdirSync(directory, { recursive: true });
const json = (filename, value) => writeFileSync(join(directory, filename), JSON.stringify(value, null, 2) + '\n');
const csv = (filename, columns, rows) => writeFileSync(
  join(directory, filename), [columns.join(','), ...rows.map(row => row.join(','))].join('\n') + '\n',
);
json('settings.json', { common, model, effectiveConfig: config });
csv('samples.csv', ['time_ns', 'capacitor_v', 'feedback_cycles', 'frequency_error_hz', 'unwrapped_phase_error_cycles', 'wrapped_phase_error_cycles'],
  samples.map(s => [s.ns, s.cap, s.phase, s.mhz * 1e6, phaseErrorUnwrapped(s), phaseError(s)]));
csv('events.csv', ['time_ns', 'reference_edge', 'feedback_edge', 'reset_edge', 'up_after', 'down_after', 'capacitor_v', 'feedback_cycles'],
  events.map(e => [e.ns, +e.referenceEdge, +e.feedbackEdge, +e.resetEdge, +e.up, +e.down, e.cap, e.phase]));
json('manifest.json', summary);
console.log(JSON.stringify({ directory, ...summary }, null, 2));
