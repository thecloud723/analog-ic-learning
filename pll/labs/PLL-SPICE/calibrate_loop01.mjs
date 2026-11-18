import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const [metricsFile, outputFile, settings = new URL('loop01-settings.json', import.meta.url)] = process.argv.slice(2);
if (!metricsFile || !outputFile || process.argv.length > 5) {
  throw new Error('Usage: node calibrate_loop01.mjs PLL01_METRICS_JSON OUTPUT_JSON [LOOP_SETTINGS_JSON]');
}
const raw = readFileSync(metricsFile);
const model = JSON.parse(readFileSync(settings, 'utf8'));
const points = JSON.parse(raw);
if (!Array.isArray(points) || points.length < 3 || points.some((p, i) =>
  !Number.isFinite(p.voltage) || !Number.isFinite(p.hz) || p.hz <= 0 ||
  (i > 0 && (p.voltage <= points[i - 1].voltage || p.hz <= points[i - 1].hz)))) {
  throw new Error('Expected an ordered, monotone PLL-01 tuning sweep');
}
const upperIndex = points.findIndex(p => p.voltage > model.initialVoltage);
if (upperIndex < 1 || model.initialVoltage <= points[0].voltage) {
  throw new Error('Initial voltage must be strictly inside the measured tuning range');
}
const left = points[upperIndex - 1], right = points[upperIndex];
const gainHzPerV = (right.hz - left.hz) / (right.voltage - left.voltage);
const centerHz = left.hz + gainHzPerV * (model.initialVoltage - left.voltage);
const voltageMin = points[0].voltage, voltageMax = points.at(-1).voltage;
const linearAt = voltage => (voltage - model.initialVoltage) * gainHzPerV / 1e6;
const calibrated = {
  ...model, model: 'curved', voltageMin, voltageMax,
  linear: [voltageMin, model.initialVoltage, voltageMax].map(v => [v, linearAt(v)]),
  curved: points.map(({voltage, hz}) => [voltage, (hz - centerHz) / 1e6]),
  calibration: {
    source: 'PLL-01 SPICE tuning sweep',
    metricsSha256: createHash('sha256').update(raw).digest('hex'),
    centerHz, localGainHzPerV: gainHzPerV,
    alignment: 'Subtract interpolated frequency at initialVoltage. The common config sets the initial frequency offset.',
  },
};
writeFileSync(outputFile, JSON.stringify(calibrated, null, 2) + '\n', {flag: 'wx'});
