"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const M = require("../a-classroom-models.js");

const close = (actual, expected, tolerance, message) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, (message || "value") + ": expected " + expected + ", got " + actual);

test("T-A11-01 and T-A11-02 frequency plan separates VCO and output divider", () => {
  const a = M.frequencyPlan({fRefHz: 40e6, R: 1, N: 125, D: 2});
  close(a.fPfdHz, 40e6, 1e-6);
  close(a.fVcoHz, 5e9, 1e-6);
  close(a.fOutHz, 2.5e9, 1e-6);
  close(a.fFeedbackHz, 40e6, 1e-6);
  const b = M.frequencyPlan({fRefHz: 40e6, R: 1, N: 126, D: 2});
  close(b.fVcoHz, 5.04e9, 1e-6);
  close(b.fOutHz, 2.52e9, 1e-6);
});

test("T-A21-01/02/03 preserve the stated sign convention", () => {
  close(M.phaseFromTimeOffset({frequencyHz: 100e6, deltaTimeSec: 40e-12}).phaseDeg, 1.44, 1e-12);
  close(M.phaseFromTimeOffset({frequencyHz: 200e6, deltaTimeSec: 40e-12}).phaseDeg, 2.88, 1e-12);
  close(M.phaseFromTimeOffset({frequencyHz: 100e6, deltaTimeSec: -40e-12}).phaseDeg, -1.44, 1e-12);
});

test("T-A22-01/02/03 distinguish unwrapped and wrapped phase", () => {
  const positive = M.phaseFromFrequencyOffset({deltaFrequencyHz: 2e3, initialPhaseCycles: 0.15, timeSec: 1e-3});
  close(positive.unwrappedCycles, 2.15, 1e-12);
  close(positive.wrappedCycles, 0.15, 1e-12);
  const zero = M.phaseFromFrequencyOffset({deltaFrequencyHz: 0, initialPhaseCycles: 0.15, timeSec: 1e-3});
  close(zero.unwrappedCycles, 0.15, 1e-12);
  close(zero.wrappedCycles, 0.15, 1e-12);
  const negative = M.phaseFromFrequencyOffset({deltaFrequencyHz: -2e3, initialPhaseCycles: 0.15, timeSec: 1e-3});
  close(negative.unwrappedCycles, -1.85, 1e-12);
  close(negative.wrappedCycles, 0.15, 1e-12);
});

test("A1.2 default endpoints agree with the SDD analytic response", () => {
  const input = {deltaF0Hz: -100e3, fnHz: 90e3, zeta: 0.7, N: 125, kvcoHzPerVolt: 100e6};
  const start = M.settlingResponse(input, [0]).samples[0];
  close(start.deltaFVcoHz, -100e3, 1e-9);
  close(start.deltaVctrlV, -1e-3, 1e-12);
  close(start.deltaPhaseRefMinusFbRad, 0, 1e-15);
  const end = M.settlingResponse(input, [10e-6]).samples[0];
  close(end.deltaFVcoHz / 1e3, -0.2706178, 0.00001);
  close(end.deltaVctrlV * 1e3, -0.00270618, 0.0000001);
  close(end.deltaPhaseRefMinusFbRad * 1e3, -0.185687, 0.00001);
});

test("T-A23-01/02 reset delay determines short and long PFD pulses", () => {
  const p = M.buildPfdTrace({referenceEdgesSec: [0], feedbackEdgesSec: [200e-12], resetDelaySec: 20e-12});
  close(p.pulseWidthsSec.UP[0] / 1e-12, 220, 1e-9);
  close(p.pulseWidthsSec.DN[0] / 1e-12, 20, 1e-9);
  assert.deepEqual(p.events.map(e => e.type), ["ref_rise", "fb_rise", "reset_assert", "reset_release"]);
  const n = M.buildPfdTrace({referenceEdgesSec: [0], feedbackEdgesSec: [-200e-12], resetDelaySec: 20e-12});
  close(n.pulseWidthsSec.DN[0] / 1e-12, 220, 1e-9);
  close(n.pulseWidthsSec.UP[0] / 1e-12, 20, 1e-9);
});

test("simultaneous PFD edges produce a reset-delay minimum pulse", () => {
  const p = M.buildPfdTrace({referenceEdgesSec: [0], feedbackEdgesSec: [0], resetDelaySec: 20e-12});
  close(p.pulseWidthsSec.UP[0] / 1e-12, 20, 1e-9);
  close(p.pulseWidthsSec.DN[0] / 1e-12, 20, 1e-9);
  assert.equal(p.finalState.UP, false);
  assert.equal(p.finalState.DN, false);
});

test("T-A23-03/04 frequency mismatch accumulates edge offset and changes long pulse", () => {
  function widths(fRef, fFb) {
    const edgesRef = Array.from({length: 8}, (_, i) => i / fRef);
    const edgesFb = Array.from({length: 8}, (_, i) => i / fFb);
    const tr = M.buildPfdTrace({referenceEdgesSec: edgesRef, feedbackEdgesSec: edgesFb, resetDelaySec: 20e-12});
    return {tr, offsets: edgesFb.map((t, i) => (t - edgesRef[i]) / 1e-12)};
  }
  const slower = widths(100e6, 99.9e6);
  assert.ok(slower.offsets[7] > slower.offsets[0]);
  assert.ok(slower.tr.pulseWidthsSec.UP.at(-1) > slower.tr.pulseWidthsSec.UP[1]);
  const faster = widths(100e6, 100.1e6);
  assert.ok(faster.offsets[7] < faster.offsets[0]);
  assert.ok(faster.tr.pulseWidthsSec.DN.at(-1) > faster.tr.pulseWidthsSec.DN[1]);
});

test("invalid model inputs fail explicitly", () => {
  assert.throws(() => M.frequencyPlan({fRefHz: 1e6, R: 0, N: 1, D: 1}), /R/);
  assert.throws(() => M.frequencyPlan({fRefHz: 1e6, R: 1, N: 1.5, D: 1}), /integer/);
  assert.throws(() => M.phaseFromTimeOffset({frequencyHz: -1, deltaTimeSec: 0}), /frequencyHz/);
  assert.throws(() => M.settlingResponse({deltaF0Hz: 1, fnHz: 1, zeta: 1, N: 1, kvcoHzPerVolt: 1}, [0]), /zeta/);
  assert.throws(() => M.phaseFromFrequencyOffset({deltaFrequencyHz: 1, initialPhaseCycles: 0, timeSec: -1}), /timeSec/);
  assert.throws(() => M.buildPfdTrace({referenceEdgesSec: [], feedbackEdgesSec: [], resetDelaySec: -1}), /resetDelaySec/);
});
