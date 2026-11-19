import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import loop from '../../course/coupled-loop.js';

const {divider, counts, samples, traceEdges = false} = JSON.parse(readFileSync(0, 'utf8'));
const referenceHz = 40e6;
let feedbackCycles = 0;
let intervals = 0;
let lastVcoEdge;
const data = loop.simulate({
  offset: -80, mismatch: 0, resetDelay: 0.15, curve: 'curved',
  duration: (samples - 1) / (referenceHz / 1e6),
  config: {referenceHz, divider},
  nextDivider: counts ? index => counts[index % counts.length] : undefined,
  onVcoEdge: traceEdges ? edge => { lastVcoEdge = edge; } : undefined,
  onEvent({feedbackEdge, phase, ns}) {
    if (!counts || !feedbackEdge) return;
    feedbackCycles += counts[intervals++ % counts.length];
    assert.ok(Math.abs(phase * divider - feedbackCycles) < 1e-7);
    if (traceEdges) {
      assert.equal(lastVcoEdge.edge, feedbackCycles);
      assert.equal(lastVcoEdge.ns, ns);
    }
  },
});
assert.equal(data.length, samples);
assert.ok(!counts || intervals > samples * 0.95);
process.stdout.write(JSON.stringify({intervals, feedbackCycles, data}));
