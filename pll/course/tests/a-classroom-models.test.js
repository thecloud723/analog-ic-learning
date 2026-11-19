"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const M = require("../a-classroom-models.js");

function near(actual, expected, tolerance = 1e-9) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} not within ${tolerance} of ${expected}`);
}

test("T-A11-01: default integer frequency chain keeps VCO and output distinct", () => {
  const r = M.frequencyPlan({ fRefHz: 40e6, R: 1, N: 125, D: 2 });
  near(r.fPfdHz, 40e6); near(r.fVcoHz, 5e9); near(r.fFeedbackHz, 40e6); near(r.fOutHz, 2.5e9);
});

test("T-A11-02: N changes VCO and output frequencies", () => {
  const r = M.frequencyPlan({ fRefHz: 40e6, R: 1, N: 126, D: 2 });
  near(r.fVcoHz, 5.04e9); near(r.fOutHz, 2.52e9);
});

test("T-A21: time offset maps to signed phase", () => {
  near(M.phaseFromTimeOffset({ frequencyHz: 100e6, deltaTimeSec: 40e-12 }).phaseDeg, 1.44);
  near(M.phaseFromTimeOffset({ frequencyHz: 200e6, deltaTimeSec: 40e-12 }).phaseDeg, 2.88);
  near(M.phaseFromTimeOffset({ frequencyHz: 100e6, deltaTimeSec: -40e-12 }).phaseDeg, -1.44);
});

test("T-A22: frequency offset accumulates unwrapped phase and wraps into half-open interval", () => {
  const positive = M.phaseFromFrequencyOffset({ deltaFrequencyHz: 2e3, initialPhaseCycles: 0.15, timeSec: 1e-3 });
  near(positive.unwrappedCycles, 2.15); near(positive.wrappedCycles, 0.15);
  const negative = M.phaseFromFrequencyOffset({ deltaFrequencyHz: -2e3, initialPhaseCycles: 0.15, timeSec: 1e-3 });
  near(negative.unwrappedCycles, -1.85); near(negative.wrappedCycles, 0.15);
  const held = M.phaseFromFrequencyOffset({ deltaFrequencyHz: 0, initialPhaseCycles: 0.15, timeSec: 1e-3 });
  near(held.unwrappedCycles, 0.15); near(held.wrappedCycles, 0.15);
  near(M.wrappedCycles(0.5), -0.5);
});

test("A1.2: initial near-lock response separates frequency, control voltage, and phase", () => {
  const input = { deltaF0Hz: -100e3, fnHz: 90e3, zeta: 0.7, N: 125, kvcoHzPerVolt: 100e6 };
  const start = M.settlingResponse(input, 0).samples[0];
  near(start.deltaFVcoHz, -100e3); near(start.deltaVctrlV, -1e-3); near(start.deltaPhaseRefMinusFbRad, 0);
  const later = M.settlingResponse(input, 10e-6).samples[0];
  near(later.deltaFVcoHz, -270.618, 1); near(later.deltaVctrlV * 1e3, -0.002706, 0.00002);
  near(later.deltaPhaseRefMinusFbRad * 1e3, -0.185687, 0.002);
});

test("T-A23-01: REF before FB produces wider UP and ordered reset events", () => {
  const trace = M.buildPfdTrace({ referenceEdgesSec: [0], feedbackEdgesSec: [200e-12], resetDelaySec: 20e-12 });
  near(trace.pulseWidthsSec.UP[0], 220e-12, 1e-18);
  near(trace.pulseWidthsSec.DN[0], 20e-12, 1e-18);
  assert.deepEqual(trace.events.map(e => e.type), ["ref_rise", "fb_rise", "reset_assert", "reset_release"]);
});

test("T-A23-02: FB before REF produces wider DN", () => {
  const trace = M.buildPfdTrace({ referenceEdgesSec: [0], feedbackEdgesSec: [-200e-12], resetDelaySec: 20e-12 });
  near(trace.pulseWidthsSec.DN[0], 220e-12, 1e-18);
  near(trace.pulseWidthsSec.UP[0], 20e-12, 1e-18);
});

test("T-A23-03/04 and boundary checks: cycle mismatch widens the expected pulse; invalid inputs reject", () => {
  function widths(fRefHz, fFbHz, cycle) {
    const tRef = cycle / fRefHz, tFb = cycle / fFbHz;
    const trace = M.buildPfdTrace({ referenceEdgesSec: [tRef], feedbackEdgesSec: [tFb], resetDelaySec: 20e-12 });
    return { up: trace.pulseWidthsSec.UP[0], dn: trace.pulseWidthsSec.DN[0] };
  }
  const slowFb0 = widths(100e6, 99.9e6, 0), slowFb5 = widths(100e6, 99.9e6, 5);
  assert.ok(slowFb5.up > slowFb0.up);
  const fastFb0 = widths(100e6, 100.1e6, 0), fastFb5 = widths(100e6, 100.1e6, 5);
  assert.ok(fastFb5.dn > fastFb0.dn);
  assert.throws(() => M.frequencyPlan({ fRefHz: 40e6, R: 0, N: 125, D: 2 }), RangeError);
  assert.throws(() => M.phaseFromFrequencyOffset({ deltaFrequencyHz: 0, initialPhaseCycles: 0, timeSec: -1 }), RangeError);
  assert.throws(() => M.buildPfdTrace({ referenceEdgesSec: [0], feedbackEdgesSec: [], resetDelaySec: -1 }), RangeError);
});
