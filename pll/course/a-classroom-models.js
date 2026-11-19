(function (root) {
  "use strict";

  function finite(name, value) {
    if (!Number.isFinite(value)) throw new RangeError(name + " must be finite");
    return value;
  }
  function positive(name, value) {
    finite(name, value);
    if (value <= 0) throw new RangeError(name + " must be greater than zero");
    return value;
  }
  function integerPositive(name, value) {
    positive(name, value);
    if (!Number.isInteger(value)) throw new RangeError(name + " must be a positive integer");
    return value;
  }
  function wrappedCycles(cycles) {
    return cycles - Math.floor(cycles + 0.5);
  }

  function frequencyPlan(input) {
    var fRefHz = positive("fRefHz", Number(input.fRefHz));
    var R = integerPositive("R", Number(input.R));
    var N = integerPositive("N", Number(input.N));
    var D = integerPositive("D", Number(input.D));
    var fPfdHz = fRefHz / R;
    var fVcoHz = N * fPfdHz;
    var fOutHz = fVcoHz / D;
    return {
      fRefHz: fRefHz, R: R, N: N, D: D,
      fPfdHz: fPfdHz, fVcoHz: fVcoHz, fFeedbackHz: fVcoHz / N,
      fOutHz: fOutHz, units: {frequency: "Hz"}
    };
  }

  function settlingResponse(input, timeSec) {
    var deltaF0Hz = finite("deltaF0Hz", Number(input.deltaF0Hz));
    var fnHz = positive("fnHz", Number(input.fnHz));
    var zeta = finite("zeta", Number(input.zeta));
    if (!(zeta > 0 && zeta < 1)) throw new RangeError("zeta must be between zero and one for this underdamped model");
    var N = positive("N", Number(input.N));
    var kvcoHzPerVolt = positive("kvcoHzPerVolt", Number(input.kvcoHzPerVolt));
    var times = Array.isArray(timeSec) ? timeSec : [timeSec];
    var wn = 2 * Math.PI * fnHz;
    var wd = wn * Math.sqrt(1 - zeta * zeta);
    var alpha = zeta * wn;
    var samples = times.map(function (time) {
      time = finite("timeSec", Number(time));
      if (time < 0) throw new RangeError("timeSec must be nonnegative");
      var sine = Math.sin(wd * time);
      var envelope = Math.exp(-alpha * time);
      var deltaF = deltaF0Hz * envelope * (Math.cos(wd * time) - (alpha / wd) * sine);
      var deltaV = deltaF / kvcoHzPerVolt;
      var phase = -(2 * Math.PI * deltaF0Hz / (N * wd)) * envelope * sine;
      return {
        timeSec: time, deltaFVcoHz: deltaF, deltaVctrlV: deltaV,
        deltaPhaseRefMinusFbRad: phase
      };
    });
    return {
      omegaNradPerSec: wn, omegaDradPerSec: wd, alphaPerSec: alpha,
      samples: samples, units: {time: "s", frequency: "Hz", voltage: "V", phase: "rad"}
    };
  }

  function phaseFromTimeOffset(input) {
    var frequencyHz = positive("frequencyHz", Number(input.frequencyHz));
    var deltaTimeSec = finite("deltaTimeSec", Number(input.deltaTimeSec));
    var periodSec = 1 / frequencyHz;
    var phaseRad = 2 * Math.PI * frequencyHz * deltaTimeSec;
    return {
      frequencyHz: frequencyHz, deltaTimeSec: deltaTimeSec, periodSec: periodSec,
      fractionOfPeriod: deltaTimeSec / periodSec,
      phaseDeg: phaseRad * 180 / Math.PI, phaseRad: phaseRad,
      units: {frequency: "Hz", time: "s", phase: "rad"}
    };
  }

  function phaseFromFrequencyOffset(input) {
    var deltaFrequencyHz = finite("deltaFrequencyHz", Number(input.deltaFrequencyHz));
    var initialPhaseCycles = finite("initialPhaseCycles", Number(input.initialPhaseCycles));
    var timeSec = finite("timeSec", Number(input.timeSec));
    if (timeSec < 0) throw new RangeError("timeSec must be nonnegative");
    var unwrappedCycles = initialPhaseCycles + deltaFrequencyHz * timeSec;
    var wrapped = wrappedCycles(unwrappedCycles);
    return {
      deltaFrequencyHz: deltaFrequencyHz, initialPhaseCycles: initialPhaseCycles,
      timeSec: timeSec, unwrappedCycles: unwrappedCycles,
      unwrappedRad: 2 * Math.PI * unwrappedCycles, wrappedCycles: wrapped,
      wrappedRad: 2 * Math.PI * wrapped,
      units: {frequency: "Hz", time: "s", phase: "cycle"}
    };
  }

  function buildPfdTrace(input) {
    var resetDelaySec = finite("resetDelaySec", Number(input.resetDelaySec));
    if (resetDelaySec < 0) throw new RangeError("resetDelaySec must be nonnegative");
    function edges(name, values, order) {
      if (!Array.isArray(values)) throw new TypeError(name + " must be an array");
      return values.map(function (timeSec) {
        return {timeSec: finite(name + " edge", Number(timeSec)), signal: name, order: order};
      });
    }
    var reference = edges("REF", input.referenceEdgesSec || [], 0);
    var feedback = edges("FB", input.feedbackEdgesSec || [], 1);
    var all = reference.concat(feedback).sort(function (a, b) {
      return a.timeSec - b.timeSec || a.order - b.order;
    });
    var state = {UP: false, DN: false, RESET: false};
    var highStart = {UP: null, DN: null, RESET: null};
    var intervals = {UP: [], DN: [], RESET: []};
    var events = [];
    var resetDeadline = null;
    var resetAssertSec = null;
    var epsilon = 1e-15;

    function setSignal(signal, value, timeSec) {
      if (state[signal] === value) return;
      state[signal] = value;
      if (value) {
        highStart[signal] = timeSec;
      } else if (highStart[signal] !== null) {
        if (timeSec > highStart[signal]) {
          intervals[signal].push({startSec: highStart[signal], endSec: timeSec});
        }
        highStart[signal] = null;
      }
    }
    function record(type, timeSec) {
      events.push({
        type: type, timeSec: timeSec,
        state: {UP: state.UP, DN: state.DN, RESET: state.RESET}
      });
    }
    function releaseReset() {
      var releaseSec = resetDeadline;
      setSignal("RESET", false, releaseSec);
      setSignal("UP", false, releaseSec);
      setSignal("DN", false, releaseSec);
      resetDeadline = null;
      record("reset_release", releaseSec);
    }

    all.forEach(function (edge) {
      if (resetDeadline !== null && resetDeadline <= edge.timeSec + epsilon) releaseReset();
      if (edge.signal === "REF") {
        setSignal("UP", true, edge.timeSec);
        record("ref_rise", edge.timeSec);
      } else {
        setSignal("DN", true, edge.timeSec);
        record("fb_rise", edge.timeSec);
      }
      if (state.UP && state.DN && resetDeadline === null) {
        resetAssertSec = edge.timeSec;
        setSignal("RESET", true, edge.timeSec);
        record("reset_assert", edge.timeSec);
        resetDeadline = edge.timeSec + resetDelaySec;
        if (resetDelaySec === 0) releaseReset();
      }
    });
    if (resetDeadline !== null) releaseReset();

    ["UP", "DN", "RESET"].forEach(function (signal) {
      if (state[signal] && highStart[signal] !== null) {
        intervals[signal].push({startSec: highStart[signal], endSec: null});
      }
    });
    return {
      events: events,
      intervals: intervals,
      edgeTimes: {
        REF: reference.map(function (edge) { return edge.timeSec; }),
        FB: feedback.map(function (edge) { return edge.timeSec; })
      },
      pulseWidthsSec: {
        UP: intervals.UP.map(function (item) { return item.endSec === null ? null : item.endSec - item.startSec; }),
        DN: intervals.DN.map(function (item) { return item.endSec === null ? null : item.endSec - item.startSec; })
      },
      resetDelaySec: resetDelaySec,
      resetAssertSec: resetAssertSec,
      finalState: {UP: state.UP, DN: state.DN, RESET: state.RESET},
      units: {time: "s"}
    };
  }

  var api = {
    frequencyPlan: frequencyPlan,
    settlingResponse: settlingResponse,
    phaseFromTimeOffset: phaseFromTimeOffset,
    phaseFromFrequencyOffset: phaseFromFrequencyOffset,
    buildPfdTrace: buildPfdTrace,
    wrappedCycles: wrappedCycles
  };
  if (typeof module === "object" && module.exports) module.exports = api;
  root.PLLAModels = api;
})(typeof globalThis === "object" ? globalThis : this);
