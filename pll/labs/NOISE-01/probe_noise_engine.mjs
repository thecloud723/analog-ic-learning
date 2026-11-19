import assert from 'node:assert/strict';
import { Simulation } from 'eecircuit-engine';

const sim = new Simulation();
await sim.start();
async function analyze(directive) {
  sim.setNetList([
    'NOISE-01 1k/1k divider capability probe at 300 K', '.temp 26.85',
    'V1 in 0 DC 0 AC 1', 'R1 in out 1k', 'R2 out 0 1k', directive, '.end', '',
  ].join('\n'));
  const result = await sim.runSim();
  return {data: result?.data ?? [], errors: sim.getError()};
}
const small = await analyze('.noise v(out) V1 dec 10 1k 1meg');
const out = small.data.find(column => column.name === 'onoise_spectrum');
assert(out?.values.length && !small.errors.length);
const expected = Math.sqrt(4 * 1.380649e-23 * 300 * 500);
const relativeError = Math.max(...Array.from(out.values, point => Math.abs(point / expected - 1)));
assert(relativeError < 5e-4);
const capabilities = {
  smallSignal: {expectedVPerRootHz: expected, maxRelativeError: relativeError, samples: out.values.length},
};
for (const directive of ['.pss 1meg 1u 10 100 0', '.pnoise v(out) V1 dec 10 1k 1meg']) {
  const name = directive.split(' ')[0];
  const result = await analyze(directive);
  assert(result.data.length === 0);
  assert(result.errors.some(line => line.includes("unimplemented dot command '" + name + "'")));
  capabilities[name] = 'unimplemented dot command in this locked WASM build';
}
console.log(JSON.stringify(capabilities, null, 2));
