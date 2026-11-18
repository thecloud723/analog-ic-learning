import assert from 'node:assert/strict';
import loop from '../../course/coupled-loop.js';

const cases = [
  { name: 'aligned', phase: 0, offset: 0, first: 'both' },
  { name: 'FB phase lead', phase: 0.08, offset: 0, first: 'feedback' },
  { name: 'REF phase lead', phase: -0.08, offset: 0, first: 'reference' },
  { name: 'FB frequency lead', phase: 0, offset: 80, first: 'feedback' },
  { name: 'REF frequency lead', phase: 0, offset: -80, first: 'reference' },
];
for (const divider of [125, 100]) {
  for (const resetDelay of [0, 0.5]) {
    for (const test of cases) {
      const events = [];
      const vco = [];
      loop.simulate({
        offset: test.offset, mismatch: 0, resetDelay, curve: 'linear', duration: 0.15,
        config: { divider, firstReferenceNs: 25, initialFeedbackCycles: test.phase, pumpA: 0 },
        onEvent: event => events.push(event),
        onVcoEdge: event => vco.push(event),
      });
      const first = events[0];
      assert.equal(first.referenceEdge, test.first !== 'feedback', test.name);
      assert.equal(first.feedbackEdge, test.first !== 'reference', test.name);
      if (test.first === 'reference') {
        assert(first.up && !first.down);
      } else if (test.first === 'feedback') {
        assert(!first.up && first.down);
      }
      const secondInput = test.first === 'both' ? first : events[1];
      const reset = events.find(event => event.resetEdge);
      assert(Math.abs(reset.ns - secondInput.ns - resetDelay) < 1e-7);
      assert(!reset.up && !reset.down);
      const fb = events.filter(event => event.feedbackEdge);
      const feedbackPeriodNs = divider * 1000 / (40 * divider + test.offset);
      for (const [i, event] of fb.entries()) {
        assert.equal(event.phase, i + 1, 'feedback edge count');
        assert(Math.abs(event.ns - (i + 1 - test.phase) * feedbackPeriodNs) < 1e-5,
          'feedback edges must follow oscillator phase accumulation divided by N');
      }
      const vcoPeriodNs = feedbackPeriodNs / divider;
      assert(vco.length > divider);
      for (const [i, event] of vco.entries()) {
        assert(Math.abs(event.ns - (event.edge - test.phase * divider) * vcoPeriodNs) < 1e-5);
        if (i > 0) assert(event.edge === vco[i - 1].edge + 1);
      }
      assert.deepEqual(vco.filter(event => event.edge > 0 && event.edge % divider === 0).map(event => event.ns),
        fb.map(event => event.ns));
      console.log(JSON.stringify({ divider, resetDelay, case: test.name, first: first.ns, reset: reset.ns }));
    }
  }
}
