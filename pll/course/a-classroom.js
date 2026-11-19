(function () {
  "use strict";

  var M = window.PLLAModels;
  var D = window.PLLAData;
  if (!M || !D) return;

  function query(root, selector) { return root.querySelector(selector); }
  function all(root, selector) { return Array.prototype.slice.call(root.querySelectorAll(selector)); }
  function text(root, selector, value) {
    var el = query(root, selector);
    if (el) el.textContent = value;
  }
  function number(root, name) {
    var el = query(root, '[data-param="' + name + '"]');
    return el ? Number(el.value) : NaN;
  }
  function setParam(root, name, value) {
    all(root, '[data-param="' + name + '"]').forEach(function (el) { el.value = String(value); });
  }
  function fmt(value, digits) {
    return Number(value).toLocaleString("en-US", {minimumFractionDigits: digits, maximumFractionDigits: digits});
  }
  function signed(value, digits) {
    if (Math.abs(value) < 0.5 * Math.pow(10, -digits)) value = 0;
    return (value > 0 ? "+" : "") + fmt(value, digits);
  }
  function fmtHz(hz) {
    if (Math.abs(hz) >= 1e9) return fmt(hz / 1e9, 4) + " GHz";
    if (Math.abs(hz) >= 1e6) return fmt(hz / 1e6, 3) + " MHz";
    if (Math.abs(hz) >= 1e3) return fmt(hz / 1e3, 2) + " kHz";
    return fmt(hz, 1) + " Hz";
  }
  function linkControls(root, render) {
    all(root, "[data-param]").forEach(function (el) {
      el.addEventListener("input", function () {
        var name = el.dataset.param;
        var value = Number(el.value);
        if (!Number.isFinite(value)) return;
        var min = el.min === "" ? -Infinity : Number(el.min);
        var max = el.max === "" ? Infinity : Number(el.max);
        value = Math.max(min, Math.min(max, value));
        setParam(root, name, value);
        render();
      });
    });
  }
  function answerCards(root) {
    all(root, "[data-answer-form]").forEach(function (form) {
      var button = query(form, "[data-answer-button]");
      if (!button) return;
      button.addEventListener("click", function () {
        var chosen = query(form, 'input[type="radio"]:checked');
        var feedback = query(form, "[data-feedback]");
        if (!feedback) return;
        if (!chosen) {
          feedback.textContent = "先选择一个答案，再查看解释。";
          feedback.dataset.state = "idle";
          return;
        }
        var correct = chosen.value === form.dataset.correct;
        feedback.dataset.state = correct ? "correct" : "incorrect";
        feedback.textContent = correct ? form.dataset.correctText : form.dataset.wrongText;
        form.dataset.checked = "true";
      });
    });
  }
  function drawChart(canvas, spec) {
    if (!canvas) return;
    var width = Math.max(320, Math.floor(canvas.clientWidth || canvas.parentElement.clientWidth || 620));
    var height = Number(canvas.dataset.height || 230);
    var ratio = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.height = height + "px";
    var ctx = canvas.getContext("2d");
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    var legendSeries = (spec.series || []).filter(function (series) { return !!series.label; });
    var margin = {left: 62, right: 13, top: legendSeries.length ? 36 : 15, bottom: 44};
    var x0 = margin.left, x1 = width - margin.right;
    var y0 = margin.top, y1 = height - margin.bottom;
    var xSpan = (spec.xMax - spec.xMin) || 1;
    var ySpan = (spec.yMax - spec.yMin) || 1;
    var px = function (x) { return x0 + (x - spec.xMin) / xSpan * (x1 - x0); };
    var py = function (y) { return y1 - (y - spec.yMin) / ySpan * (y1 - y0); };
    ctx.font = "12px system-ui, sans-serif";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#dbe6ec";
    ctx.fillStyle = "#536b7c";
    (spec.xTicks || []).forEach(function (tick) {
      var x = px(tick[0]);
      ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke();
      ctx.textAlign = tick[0] === spec.xMin ? "left" : tick[0] === spec.xMax ? "right" : "center";
      ctx.fillText(String(tick[1]), x, height - 24);
    });
    (spec.yTicks || []).forEach(function (tick) {
      var y = py(tick[0]);
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      ctx.textAlign = "right";
      ctx.fillText(String(tick[1]), x0 - 7, y + 4);
    });
    ctx.strokeStyle = "#607c8d";
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
    ctx.fillStyle = "#314d60";
    ctx.textAlign = "center";
    if (spec.xLabel) ctx.fillText(spec.xLabel, (x0 + x1) / 2, height - 5);
    if (spec.yLabel) {
      ctx.save(); ctx.translate(15, (y0 + y1) / 2); ctx.rotate(-Math.PI / 2);
      ctx.fillText(spec.yLabel, 0, 0); ctx.restore();
    }
    if (legendSeries.length) {
      ctx.save();
      ctx.font = "11px system-ui, sans-serif";
      var legendWidths = legendSeries.map(function (series) { return 20 + ctx.measureText(series.label).width; });
      var legendGap = 14;
      var legendTotal = legendWidths.reduce(function (sum, item) { return sum + item; }, 0) + legendGap * (legendSeries.length - 1);
      var legendX = Math.max(6, (width - legendTotal) / 2);
      var legendY = 19;
      legendSeries.forEach(function (series, index) {
        var color = series.color || "#17658b";
        ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2.5;
        if (series.dots) {
          ctx.beginPath(); ctx.arc(legendX + 6, legendY, 3, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.beginPath(); ctx.moveTo(legendX, legendY); ctx.lineTo(legendX + 13, legendY); ctx.stroke();
        }
        ctx.fillStyle = "#314d60"; ctx.textAlign = "left";
        ctx.fillText(series.label, legendX + 19, legendY + 4);
        legendX += legendWidths[index] + legendGap;
      });
      ctx.restore();
    }
    (spec.series || []).forEach(function (series) {
      ctx.strokeStyle = series.color || "#17658b";
      ctx.fillStyle = series.color || "#17658b";
      ctx.lineWidth = series.lineWidth || 2.5;
      var prior = null;
      if (series.connect !== false && !series.dots) ctx.beginPath();
      (series.points || []).forEach(function (point, index) {
        if (!point || !Number.isFinite(point[0]) || !Number.isFinite(point[1])) {
          prior = null;
          return;
        }
        var shouldBreak = prior && (series.breakOnJump !== undefined && Math.abs(point[1] - prior[1]) > series.breakOnJump);
        if (series.dots) {
          var selected = series.selectedIndex === index;
          ctx.beginPath();
          ctx.arc(px(point[0]), py(point[1]), selected ? 7 : 4.5, 0, 2 * Math.PI);
          ctx.fill();
          if (selected) {
            ctx.beginPath(); ctx.arc(px(point[0]), py(point[1]), 10, 0, 2 * Math.PI);
            ctx.strokeStyle = "#a64e25"; ctx.lineWidth = 2; ctx.stroke();
            ctx.strokeStyle = series.color || "#17658b"; ctx.lineWidth = 2.5;
          }
        } else if (series.connect !== false) {
          if (!prior || shouldBreak) ctx.moveTo(px(point[0]), py(point[1]));
          else ctx.lineTo(px(point[0]), py(point[1]));
        }
        prior = point;
      });
      if (series.connect !== false && !series.dots) ctx.stroke();
    });
    if (Number.isFinite(spec.cursor) && spec.cursor >= spec.xMin && spec.cursor <= spec.xMax) {
      var cx = px(spec.cursor);
      ctx.save(); ctx.strokeStyle = "#a64e25"; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(cx, y0); ctx.lineTo(cx, y1); ctx.stroke(); ctx.restore();
    }
  }
  function ticks(values, suffix, digits) {
    return values.map(function (value) {
      return [value, (digits === undefined ? String(value) : Number(value).toFixed(digits)) + (suffix || "")];
    });
  }
  function setBadge(root, message) { text(root, "[data-status]", message); }
  function startTimer(root, tick, interval) {
    stopTimer(root);
    root._classroomTimer = window.setInterval(tick, interval || 50);
  }
  function stopTimer(root) {
    if (root._classroomTimer) window.clearInterval(root._classroomTimer);
    root._classroomTimer = null;
  }

  function checkCards(root) {
    answerCards(root);
    all(root, "[data-mode-select]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (root._beforeModeChange) root._beforeModeChange();
        root.dataset.mode = button.dataset.modeSelect;
        all(root, "[data-mode-select]").forEach(function (item) {
          item.setAttribute("aria-pressed", item === button ? "true" : "false");
        });
        if (root._render) root._render();
      });
    });
  }

  function drawEdgeSvg(svg, frequencyHz, deltaTimeSec) {
    if (!svg) return;
    var w = 860, h = 280, left = 64, right = 842;
    var period = 1 / frequencyHz, xmin = -0.38 * period, xmax = 1.35 * period;
    var x = function (time) { return left + (time - xmin) / (xmax - xmin) * (right - left); };
    function wave(offset, high, low) {
      var events = [];
      for (var k = -2; k <= 3; k++) {
        var rise = offset + k * period;
        var fall = rise + 0.45 * period;
        if (rise >= xmin && rise <= xmax) events.push({time: rise, value: true});
        if (fall >= xmin && fall <= xmax) events.push({time: fall, value: false});
      }
      events.sort(function (a, b) { return a.time - b.time; });
      var phase = ((xmin - offset) % period + period) % period;
      var active = phase < 0.45 * period;
      var y = active ? high : low;
      var d = "M " + x(xmin).toFixed(1) + " " + y;
      events.forEach(function (ev) {
        d += " L " + x(ev.time).toFixed(1) + " " + y;
        y = ev.value ? high : low;
        d += " L " + x(ev.time).toFixed(1) + " " + y;
      });
      d += " L " + x(xmax).toFixed(1) + " " + y;
      return d;
    }
    var fbX = x(deltaTimeSec), refX = x(0);
    var tickLines = "";
    [-0.25, 0, 0.25, 0.5, 0.75, 1].forEach(function (fraction) {
      var time = fraction * period;
      if (time < xmin || time > xmax) return;
      var label = (time / 1e-9).toFixed(2) + " ns";
      tickLines += '<line x1="' + x(time).toFixed(1) + '" y1="24" x2="' + x(time).toFixed(1) + '" y2="242" stroke="#e2ebf0"/>' +
        '<text x="' + x(time).toFixed(1) + '" y="266" text-anchor="middle">' + label + '</text>';
    });
    var dtPs = deltaTimeSec * 1e12;
    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    svg.innerHTML =
      '<defs><marker id="edge-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="#a64e25"/></marker></defs>' +
      tickLines +
      '<text x="8" y="92">REF</text><text x="8" y="195">FB</text>' +
      '<path class="wave ref-wave" d="' + wave(0, 54, 101) + '"/>' +
      '<path class="wave fb-wave" d="' + wave(deltaTimeSec, 157, 204) + '"/>' +
      '<line x1="' + refX.toFixed(1) + '" y1="42" x2="' + fbX.toFixed(1) + '" y2="42" stroke="#a64e25" stroke-width="2" marker-start="url(#edge-arrow)" marker-end="url(#edge-arrow)"/>' +
      '<text x="' + ((refX + fbX) / 2).toFixed(1) + '" y="32" text-anchor="middle">Δt = ' + signed(dtPs, 2) + ' ps</text>' +
      '<line x1="' + refX.toFixed(1) + '" y1="48" x2="' + refX.toFixed(1) + '" y2="216" stroke="#17658b" stroke-dasharray="4 4"/>' +
      '<line x1="' + fbX.toFixed(1) + '" y1="48" x2="' + fbX.toFixed(1) + '" y2="216" stroke="#a64e25" stroke-dasharray="4 4"/>' +
      '<circle class="edge-handle" data-edge-handle="true" cx="' + fbX.toFixed(1) + '" cy="225" r="9" role="slider" tabindex="0" aria-label="拖动反馈时钟边沿" aria-valuemin="' + (-period / 2 * 1e12).toFixed(2) + '" aria-valuemax="' + (period / 2 * 1e12).toFixed(2) + '" aria-valuenow="' + dtPs.toFixed(2) + '"/>' +
      '<text x="72" y="248">REF 上升沿固定在 0 ns · 拖动橙色圆点移动 FB 边沿</text>' +
      '<text x="805" y="18" text-anchor="end">T = ' + (period / 1e-9).toFixed(3) + ' ns</text>';
  }

  function drawPhaseDisk(svg, phaseDeg) {
    if (!svg) return;
    var angle = phaseDeg * Math.PI / 180;
    var cx = 120, cy = 120, radius = 82;
    var x = cx + radius * Math.sin(angle), y = cy - radius * Math.cos(angle);
    svg.innerHTML =
      '<circle cx="120" cy="120" r="96"/>' +
      '<line class="zero-axis" x1="120" y1="19" x2="120" y2="221"/><line class="zero-axis" x1="19" y1="120" x2="221" y2="120"/>' +
      '<text x="120" y="13" text-anchor="middle">0°</text><text x="230" y="125">+90°</text><text x="120" y="239" text-anchor="middle">±180°</text><text x="10" y="125">−90°</text>' +
      '<line class="phase-vector" x1="120" y1="120" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '"/><circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="7" fill="#a64e25"/>';
  }

  function initA21(root) {
    var modeSelect = query(root, "#phase-mode");
    var edgeSvg = query(root, "#edge-diagram");
    var disk = query(root, "#phase-disk");
    var cursor = 0;
    function render() {
      var fHz = number(root, "frequencyMHz") * 1e6;
      var dtPs = number(root, "deltaTimePs");
      var mode = modeSelect.value;
      var phaseTarget = number(root, "phaseTargetDeg");
      var period = 1 / fHz;
      var halfPs = period * 0.5e12;
      var dtControls = all(root, '[data-param="deltaTimePs"]');
      dtControls.forEach(function (el) { el.min = String(-halfPs); el.max = String(halfPs); el.disabled = mode === "fixed-phase"; });
      all(root, '[data-param="phaseTargetDeg"]').forEach(function (el) { el.disabled = mode !== "fixed-phase"; });
      if (mode === "fixed-phase") {
        dtPs = phaseTarget / 360 / fHz * 1e12;
        setParam(root, "deltaTimePs", dtPs);
      } else {
        dtPs = Math.max(-halfPs, Math.min(halfPs, dtPs));
        setParam(root, "deltaTimePs", dtPs);
        phaseTarget = M.phaseFromTimeOffset({frequencyHz: fHz, deltaTimeSec: dtPs * 1e-12}).phaseDeg;
        setParam(root, "phaseTargetDeg", phaseTarget);
      }
      var result = M.phaseFromTimeOffset({frequencyHz: fHz, deltaTimeSec: dtPs * 1e-12});
      text(root, '[data-value="frequencyMHz"]', fmt(fHz / 1e6, 0) + " MHz");
      text(root, '[data-value="deltaTimePs"]', signed(dtPs, 2) + " ps");
      text(root, '[data-value="phaseTargetDeg"]', signed(result.phaseDeg, 3) + "°");
      text(root, "[data-period]", fmt(period / 1e-9, 3) + " ns");
      text(root, "[data-phase-deg]", signed(result.phaseDeg, 3) + "°");
      text(root, "[data-phase-rad]", signed(result.phaseRad, 5) + " rad");
      text(root, "[data-fraction]", signed(result.fractionOfPeriod * 100, 4) + "%");
      text(root, "[data-sign-explanation]", dtPs > 0.000001 ? "FB 边沿晚于 REF：Δt>0，所以参考相位领先，Δφ>0。" :
        dtPs < -0.000001 ? "FB 边沿早于 REF：Δt<0，所以反馈相位领先，Δφ<0。" : "两个上升沿重合：Δt=0，当前相位差为零。");
      drawEdgeSvg(edgeSvg, fHz, dtPs * 1e-12);
      drawPhaseDisk(disk, result.phaseDeg);
      setBadge(root, mode === "fixed-phase" ? "固定相位角；频率改变时，所需 Δt 自动反比变化。" : "固定时间差；频率越高，同一 Δt 对应的相位角越大。");
    }
    linkControls(root, render);
    query(root, "[data-action='reset']").addEventListener("click", function () {
      modeSelect.value = "fixed-time";
      setParam(root, "frequencyMHz", 100);
      setParam(root, "deltaTimePs", 40);
      setParam(root, "phaseTargetDeg", 1.44);
      render();
    });
    modeSelect.addEventListener("change", function () {
      if (modeSelect.value === "fixed-phase") setParam(root, "phaseTargetDeg", M.phaseFromTimeOffset({
        frequencyHz: number(root, "frequencyMHz") * 1e6, deltaTimeSec: number(root, "deltaTimePs") * 1e-12
      }).phaseDeg);
      render();
    });
    var dragging = false;
    edgeSvg.addEventListener("pointerdown", function (event) {
      if (!event.target.closest("[data-edge-handle]")) return;
      dragging = true; edgeSvg.setPointerCapture(event.pointerId); event.preventDefault();
    });
    edgeSvg.addEventListener("pointermove", function (event) {
      if (!dragging) return;
      var rect = edgeSvg.getBoundingClientRect();
      var viewX = (event.clientX - rect.left) / rect.width * 860;
      var fHz = number(root, "frequencyMHz") * 1e6, period = 1 / fHz;
      var xmin = -0.38 * period, xmax = 1.35 * period;
      var time = xmin + (viewX - 64) / (842 - 64) * (xmax - xmin);
      var ps = Math.max(-period / 2 * 1e12, Math.min(period / 2 * 1e12, time * 1e12));
      if (modeSelect.value === "fixed-phase") setParam(root, "phaseTargetDeg", ps * 1e-12 * fHz * 360);
      else setParam(root, "deltaTimePs", ps);
      render();
    });
    edgeSvg.addEventListener("pointerup", function () { dragging = false; });
    edgeSvg.addEventListener("pointercancel", function () { dragging = false; });
    edgeSvg.addEventListener("keydown", function (event) {
      if (!event.target.closest("[data-edge-handle]")) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      var step = event.shiftKey ? 50 : 5;
      var dir = event.key === "ArrowRight" ? 1 : -1;
      var current = number(root, "deltaTimePs") + dir * step;
      if (modeSelect.value === "fixed-phase") setParam(root, "phaseTargetDeg", current * 1e-12 * number(root, "frequencyMHz") * 1e6 * 360);
      else setParam(root, "deltaTimePs", current);
      render();
    });
    root._render = render;
    render();
  }

  function initA22(root) {
    var playing = false;
    var cursorUs = 0;
    function render() {
      var dfKHz = number(root, "deltaFrequencyKHz");
      var initial = number(root, "initialPhaseCycles");
      var durationUs = Math.max(0, number(root, "durationUs"));
      cursorUs = Math.max(0, Math.min(durationUs, number(root, "cursorUs")));
      setParam(root, "cursorUs", cursorUs);
      all(root, '[data-param="cursorUs"]').forEach(function (el) { el.max = String(durationUs); });
      var endUs = Math.max(durationUs, 1);
      var samples = [];
      for (var i = 0; i <= 240; i++) {
        var tUs = durationUs * i / 240;
        var p = M.phaseFromFrequencyOffset({deltaFrequencyHz: dfKHz * 1e3, initialPhaseCycles: initial, timeSec: tUs * 1e-6});
        samples.push({x: tUs, full: p.unwrappedCycles, wrapped: p.wrappedCycles});
      }
      var fullPoints = samples.map(function (p) { return [p.x, p.full]; });
      var wrapPoints = samples.map(function (p) { return [p.x, p.wrapped]; });
      var current = M.phaseFromFrequencyOffset({deltaFrequencyHz: dfKHz * 1e3, initialPhaseCycles: initial, timeSec: cursorUs * 1e-6});
      var maxMagnitude = Math.max(0.5, Math.abs(initial), Math.abs(initial + dfKHz * (durationUs / 1000))) + 0.25;
      var span = Math.pow(10, Math.ceil(Math.log10(maxMagnitude * 2)));
      var yMax = Math.max(0.5, Math.ceil(maxMagnitude / span * 5) * span / 5);
      if (!Number.isFinite(yMax) || yMax < 0.75) yMax = 1;
      drawChart(query(root, "#unwrapped-chart"), {
        xMin: 0, xMax: endUs, yMin: -yMax, yMax: yMax,
        xTicks: ticks([0, endUs / 4, endUs / 2, 3 * endUs / 4, endUs], " μs", endUs < 10 ? 2 : 0),
        yTicks: ticks([-yMax, -yMax / 2, 0, yMax / 2, yMax], "", 2),
        xLabel: "Observation time (μs)", yLabel: "Unwrapped phase (cycle)",
        series: [{color: "#17658b", label: "Unwrapped phase", points: fullPoints}],
        cursor: cursorUs
      });
      drawChart(query(root, "#wrapped-chart"), {
        xMin: 0, xMax: endUs, yMin: -0.5, yMax: 0.5,
        xTicks: ticks([0, endUs / 4, endUs / 2, 3 * endUs / 4, endUs], " μs", endUs < 10 ? 2 : 0),
        yTicks: ticks([-0.5, -0.25, 0, 0.25, 0.5], "", 2),
        xLabel: "Observation time (μs)", yLabel: "Wrapped phase (cycle)",
        series: [{color: "#a64e25", label: "Wrapped phase", points: wrapPoints, breakOnJump: 0.5}],
        cursor: cursorUs
      });
      text(root, '[data-value="deltaFrequencyKHz"]', signed(dfKHz, 1) + " kHz");
      text(root, '[data-value="initialPhaseCycles"]', signed(initial, 2) + " cycle");
      text(root, '[data-value="durationUs"]', fmt(durationUs, 0) + " μs");
      text(root, '[data-value="cursorUs"]', fmt(cursorUs, 1) + " μs");
      text(root, "[data-phase-unwrapped]", signed(current.unwrappedCycles, 4) + " cycles");
      text(root, "[data-phase-wrapped]", signed(current.wrappedCycles, 4) + " cycles");
      text(root, "[data-phase-rad]", signed(current.unwrappedRad, 4) + " rad");
      setBadge(root, dfKHz === 0 ? "Δf=0：相位停在初始值，不继续累积。" : dfKHz > 0 ? "Δf>0：参考相位持续领先，未包裹相位斜率为正。" : "Δf<0：反馈频率更高，参考减反馈相位斜率为负。");
    }
    function advance() {
      var step = Math.max(1, number(root, "durationUs") / 100);
      var next = number(root, "cursorUs") + step;
      if (next > number(root, "durationUs")) {
        next = 0;
        if (!playing) return;
      }
      setParam(root, "cursorUs", next);
      render();
    }
    linkControls(root, render);
    all(root, "[data-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        var action = button.dataset.action;
        if (action === "play") { playing = true; startTimer(root, advance, 40); setBadge(root, "播放中：两个相位视图共用同一时间游标。"); }
        if (action === "pause") { playing = false; stopTimer(root); render(); }
        if (action === "step") { playing = false; stopTimer(root); advance(); }
        if (action === "reset" || action === "restart") { playing = false; stopTimer(root); setParam(root, "deltaFrequencyKHz", 2); setParam(root, "initialPhaseCycles", 0.15); setParam(root, "durationUs", 1000); setParam(root, "cursorUs", 0); render(); }
      });
    });
    root._render = render;
    render();
  }

  function initA23(root) {
    var eventIndex = 0;
    var playing = false;
    var trace = null;
    function edgePairs() {
      var mode = root.dataset.mode || "single";
      var reset = number(root, "resetDelayPs") * 1e-12;
      if (mode === "single") {
        var fbPs = number(root, "fbEdgePs");
        var pair = M.buildPfdTrace({referenceEdgesSec: [0], feedbackEdgesSec: [fbPs * 1e-12], resetDelaySec: reset});
        return {trace: pair, refTimes: [0], fbTimes: [fbPs * 1e-12], offsets: [fbPs], widthsUp: [pair.pulseWidthsSec.UP[0] || 0], widthsDn: [pair.pulseWidthsSec.DN[0] || 0], mode: mode};
      }
      var fRef = number(root, "refFrequencyMHz") * 1e6;
      var fFb = number(root, "fbFrequencyMHz") * 1e6;
      var count = Math.max(1, Math.round(number(root, "cycleCount")));
      var refs = Array.from({length: count}, function (_, i) { return i / fRef; });
      var fbs = Array.from({length: count}, function (_, i) { return i / fFb; });
      var full = M.buildPfdTrace({referenceEdgesSec: refs, feedbackEdgesSec: fbs, resetDelaySec: reset});
      var offsets = refs.map(function (t, i) { return (fbs[i] - t) * 1e12; });
      var widthsUp = [], widthsDn = [];
      refs.forEach(function (refTime, i) {
        var pairTrace = M.buildPfdTrace({referenceEdgesSec: [refTime], feedbackEdgesSec: [fbs[i]], resetDelaySec: reset});
        widthsUp.push((pairTrace.pulseWidthsSec.UP[0] || 0) * 1e12);
        widthsDn.push((pairTrace.pulseWidthsSec.DN[0] || 0) * 1e12);
      });
      return {trace: full, refTimes: refs, fbTimes: fbs, offsets: offsets, widthsUp: widthsUp, widthsDn: widthsDn, mode: mode};
    }
    function selectedTrace(pair) {
      if (pair.mode === "single") return pair.trace;
      var i = Math.max(0, Math.min(pair.refTimes.length - 1, Math.round(number(root, "cycleIndex")) - 1));
      return M.buildPfdTrace({referenceEdgesSec: [pair.refTimes[i]], feedbackEdgesSec: [pair.fbTimes[i]], resetDelaySec: number(root, "resetDelayPs") * 1e-12});
    }
    function render() {
      var mode = root.dataset.mode || "single";
      all(root, "[data-mode-panel]").forEach(function (panel) { panel.hidden = panel.dataset.modePanel !== mode; });
      var pair = edgePairs();
      trace = selectedTrace(pair);
      if (eventIndex >= trace.events.length) eventIndex = Math.max(0, trace.events.length - 1);
      var selected = trace.events[eventIndex] || {type: "等待边沿", timeSec: 0, state: {UP:false,DN:false,RESET:false}};
      drawPfdTimeline(query(root, "#pfd-timeline"), trace, selected.timeSec);
      text(root, "[data-event-count]", (trace.events.length ? eventIndex + 1 : 0) + " / " + trace.events.length);
      text(root, "[data-event-name]", eventLabel(selected.type));
      text(root, "[data-event-time]", (selected.timeSec * 1e12).toFixed(2) + " ps");
      text(root, "[data-pfd-state]", "UP=" + (selected.state.UP ? "1" : "0") + " · DN=" + (selected.state.DN ? "1" : "0") + " · RESET=" + (selected.state.RESET ? "1" : "0"));
      var upWidths = trace.pulseWidthsSec.UP.filter(function (v) { return v !== null; }).map(function (v) { return v * 1e12; });
      var dnWidths = trace.pulseWidthsSec.DN.filter(function (v) { return v !== null; }).map(function (v) { return v * 1e12; });
      text(root, "[data-up-width]", upWidths.length ? fmt(upWidths[0], 2) + " ps" : "保持为高");
      text(root, "[data-dn-width]", dnWidths.length ? fmt(dnWidths[0], 2) + " ps" : "保持为高");
      if (mode === "single") {
        var fbPs = number(root, "fbEdgePs");
        text(root, "[data-lead-summary]", Math.abs(fbPs) < 1e-9 ? "REF 与 FB 同时到达：两路都只保持 reset-delay 决定的最小脉冲。" :
          fbPs > 0 ? "REF 先到：UP 脉冲较长；FB 晚到后，reset 延迟结束时两路清零。" :
          "FB 先到：DN 脉冲较长；REF 晚到后，reset 延迟结束时两路清零。");
        text(root, '[data-value="fbEdgePs"]', signed(fbPs, 0) + " ps");
        drawChart(query(root, "#pfd-offset-chart"), {
          xMin: -2000, xMax: 2000, yMin: -2000, yMax: 2000,
          xTicks: ticks([-2000,-1000,0,1000,2000]," ps",0), yTicks: ticks([-2000,-1000,0,1000,2000],"",0),
          xLabel: "FB edge time relative to REF (ps)", yLabel: "Edge time (ps)",
          series: [{color:"#a64e25",label:"FB edge",dots:true,connect:false,selectedIndex:0,points:[[fbPs,fbPs]]}]
        });
      } else {
        var index = Math.max(1, Math.min(pair.offsets.length, Math.round(number(root, "cycleIndex")))) - 1;
        setParam(root, "cycleIndex", index + 1);
        all(root, '[data-param="cycleIndex"]').forEach(function (el) { el.max = String(pair.offsets.length); });
        text(root, '[data-value="cycleIndex"]', "周期 " + (index + 1) + " / " + pair.offsets.length);
        text(root, "[data-lead-summary]", pair.offsets[index] > 0 ? "FB 周期较长、边沿逐步落后；本周期 REF 先到，UP 脉冲加宽。" :
          pair.offsets[index] < 0 ? "FB 周期较短、边沿逐步提前；本周期 FB 先到，DN 脉冲加宽。" :
          "该周期边沿重合；两路脉冲宽度由 reset delay 决定。");
        drawChart(query(root, "#pfd-offset-chart"), {
          xMin: 1, xMax: Math.max(2, pair.offsets.length), yMin: Math.min(-1, Math.min.apply(null,pair.offsets)-5),
          yMax: Math.max(1, Math.max.apply(null,pair.offsets)+5),
          xTicks: pair.offsets.map(function (_, i) { return [i + 1, String(i + 1)]; }),
          yTicks: [Math.min.apply(null,pair.offsets), 0, Math.max.apply(null,pair.offsets)].map(function (v) { return [v, fmt(v, 1)]; }),
          xLabel: "Comparison cycle", yLabel: "tFB − tREF (ps)",
          series: [{color:"#17658b",label:"tFB − tREF",points:pair.offsets.map(function (v,i) { return [i + 1,v]; })}],
          cursor: index + 1
        });
        drawChart(query(root, "#pfd-width-chart"), {
          xMin: 1, xMax: Math.max(2, pair.offsets.length), yMin: 0,
          yMax: Math.max(40, Math.max.apply(null,pair.widthsUp.concat(pair.widthsDn)) * 1.15),
          xTicks: pair.widthsUp.map(function (_, i) { return [i + 1, String(i + 1)]; }),
          yTicks: [0, Math.max.apply(null,pair.widthsUp.concat(pair.widthsDn)) / 2, Math.max.apply(null,pair.widthsUp.concat(pair.widthsDn))].map(function (v) { return [v, fmt(v, 1)]; }),
          xLabel: "Comparison cycle", yLabel: "Pulse width (ps)",
          series: [
            {color:"#17658b",label:"UP pulse width",points:pair.widthsUp.map(function (v,i) { return [i + 1,v]; })},
            {color:"#a64e25",label:"DN pulse width",points:pair.widthsDn.map(function (v,i) { return [i + 1,v]; })}
          ],
          cursor: index + 1
        });
      }
      text(root, "[data-qualitative]", selected.state.UP ? "UP 有效：后级净作用方向为提高 VCTRL（本页只给方向，不计算电压）。" :
        selected.state.DN ? "DN 有效：后级净作用方向为降低 VCTRL（本页只给方向，不计算电压）。" :
        "UP/DN 当前复位为低；后续影响方向要看下一组输入边沿。");
      setBadge(root, mode === "single" ? "理想 PFD 事件模型 · 单次边沿比较" : "理想 PFD 事件模型 · 连续频差逐周期比较");
      text(root, '[data-value="resetDelayPs"]', fmt(number(root, "resetDelayPs"), 0) + " ps");
      if (mode === "multi") {
        text(root, '[data-value="refFrequencyMHz"]', fmt(number(root, "refFrequencyMHz"), 3) + " MHz");
        text(root, '[data-value="fbFrequencyMHz"]', fmt(number(root, "fbFrequencyMHz"), 3) + " MHz");
        text(root, '[data-value="cycleCount"]', String(Math.round(number(root, "cycleCount"))) + " cycles");
      }
    }
    function eventLabel(type) {
      return ({ref_rise:"REF 上升沿",fb_rise:"FB 上升沿",reset_assert:"RESET 拉高",reset_release:"RESET 到期，UP/DN 清零"})[type] || type;
    }
    root._beforeModeChange = function () { playing = false; stopTimer(root); eventIndex = 0; };
    function drawPfdTimeline(canvas, traceInput, cursorSec) {
      if (!canvas) return;
      var edgeValues = traceInput.edgeTimes.REF.concat(traceInput.edgeTimes.FB);
      var endpoints = [];
      ["UP","DN","RESET"].forEach(function (signal) {
        traceInput.intervals[signal].forEach(function (v) { endpoints.push(v.startSec); if (v.endSec !== null) endpoints.push(v.endSec); });
      });
      var times = edgeValues.concat(endpoints);
      if (!times.length) times = [0, 1e-9];
      var xmin = Math.min.apply(null,times), xmax = Math.max.apply(null,times);
      var span = xmax - xmin;
      var padding = Math.max(span * 0.15, traceInput.resetDelaySec * 2, 50e-12);
      xmin -= padding; xmax += padding;
      if (xmax <= xmin) xmax = xmin + 1e-9;
      var width = Math.max(320, Math.floor(canvas.clientWidth || 620)), height = Number(canvas.dataset.height || 270);
      var ratio = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width*ratio); canvas.height = Math.round(height*ratio); canvas.style.height = height+"px";
      var ctx=canvas.getContext("2d"); ctx.setTransform(ratio,0,0,ratio,0,0); ctx.clearRect(0,0,width,height);
      var left=68,right=width-12,top=20,bottom=height-34;
      var yMap=function (row,high) { return top + row*42 + (high ? 8 : 25); };
      var xMap=function (t) { return left+(t-xmin)/(xmax-xmin)*(right-left); };
      var labels=["REF","FB","UP","DN","RESET"];
      ctx.font="12px system-ui,sans-serif"; ctx.fillStyle="#526d80"; ctx.strokeStyle="#dce7ed"; ctx.lineWidth=1;
      for(var row=0;row<labels.length;row++){
        ctx.textAlign="right";ctx.fillText(labels[row],left-8,yMap(row,false)+4);
        ctx.beginPath();ctx.moveTo(left,yMap(row,false));ctx.lineTo(right,yMap(row,false));ctx.stroke();
      }
      function pulse(xStart,xEnd,row,color){
        var yLow=yMap(row,false),yHigh=yMap(row,true);
        ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.beginPath();
        ctx.moveTo(xMap(xStart),yLow);ctx.lineTo(xMap(xStart),yHigh);
        if(xEnd!==null){ctx.lineTo(xMap(xEnd),yHigh);ctx.lineTo(xMap(xEnd),yLow);}
        else ctx.lineTo(right,yHigh);
        ctx.stroke();
      }
      traceInput.edgeTimes.REF.forEach(function(t){pulse(t,t+Math.max(1e-12,(xmax-xmin)*.008),0,"#17658b");});
      traceInput.edgeTimes.FB.forEach(function(t){pulse(t,t+Math.max(1e-12,(xmax-xmin)*.008),1,"#a64e25");});
      traceInput.intervals.UP.forEach(function(v){pulse(v.startSec,v.endSec,2,"#17658b");});
      traceInput.intervals.DN.forEach(function(v){pulse(v.startSec,v.endSec,3,"#a64e25");});
      traceInput.intervals.RESET.forEach(function(v){pulse(v.startSec,v.endSec,4,"#2d6f59");});
      var units = (xmax-xmin)<1e-9 ? 1e12 : 1e9;
      var suffix = units===1e12 ? " ps" : " ns";
      ctx.strokeStyle="#607c8d";ctx.beginPath();ctx.moveTo(left,bottom);ctx.lineTo(right,bottom);ctx.stroke();
      ctx.fillStyle="#526d80";ctx.textAlign="center";
      for(var tick=0;tick<=4;tick++){
        var time=xmin+(xmax-xmin)*tick/4, px=xMap(time);
        ctx.strokeStyle="#e2ebf0";ctx.beginPath();ctx.moveTo(px,top);ctx.lineTo(px,bottom);ctx.stroke();
        ctx.fillText((time*units).toFixed(1)+suffix,px,height-9);
      }
      if(Number.isFinite(cursorSec)){
        var cx=xMap(cursorSec);ctx.save();ctx.strokeStyle="#93602f";ctx.setLineDash([4,3]);ctx.lineWidth=1.5;
        ctx.beginPath();ctx.moveTo(cx,top);ctx.lineTo(cx,bottom);ctx.stroke();ctx.restore();
      }
    }
    linkControls(root, render);
    all(root, "[data-action]").forEach(function (button) {
      button.addEventListener("click", function () {
        var action=button.dataset.action;
        if(action==="step"){
          playing=false;stopTimer(root);eventIndex=Math.min(trace.events.length-1,eventIndex+1);render();
        }
        if(action==="restart"){
          playing=false;stopTimer(root);eventIndex=0;render();
        }
        if(action==="play"){
          playing=true;startTimer(root,function(){
            if(eventIndex>=trace.events.length-1){playing=false;stopTimer(root);return;}
            eventIndex++;render();
          },450);
        }
        if(action==="pause"){playing=false;stopTimer(root);}
        if(action==="reset"){
          playing=false;stopTimer(root);eventIndex=0;
          setParam(root,"fbEdgePs",200);setParam(root,"resetDelayPs",20);
          setParam(root,"refFrequencyMHz",100);setParam(root,"fbFrequencyMHz",99.9);
          setParam(root,"cycleCount",8);setParam(root,"cycleIndex",1);root.dataset.mode="single";
          all(root,"[data-mode-select]").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.modeSelect==="single"?"true":"false");});
          render();
        }
      });
    });
    root._render=render;
    render();
  }

  function initA12(root) {
    var playing=false;
    function render(){
      var offsetKHz=number(root,"deltaF0KHz");
      var cursorUs=Math.max(0,Math.min(10,number(root,"cursorUs")));
      var times=Array.from({length:321},function(_,i){return i/32*1e-6;});
      var result=M.settlingResponse({deltaF0Hz:offsetKHz*1e3,fnHz:90e3,zeta:.7,N:125,kvcoHzPerVolt:100e6},times);
      var freq=result.samples.map(function(s){return [s.timeSec*1e6,s.deltaFVcoHz/1e3];});
      var ctrl=result.samples.map(function(s){return [s.timeSec*1e6,s.deltaVctrlV*1e3];});
      var phase=result.samples.map(function(s){return [s.timeSec*1e6,s.deltaPhaseRefMinusFbRad*1e3];});
      drawChart(query(root,"#settle-frequency"),{xMin:0,xMax:10,yMin:-220,yMax:220,xTicks:ticks([0,2,4,6,8,10]," μs",0),yTicks:ticks([-200,-100,0,100,200],"",0),xLabel:"Time (μs)",yLabel:"ΔfVCO (kHz)",series:[{color:"#17658b",label:"Frequency error",points:freq}],cursor:cursorUs});
      drawChart(query(root,"#settle-control"),{xMin:0,xMax:10,yMin:-2.2,yMax:2.2,xTicks:ticks([0,2,4,6,8,10]," μs",0),yTicks:ticks([-2,-1,0,1,2],"",0),xLabel:"Time (μs)",yLabel:"ΔVCTRL (mV)",series:[{color:"#2d6f59",label:"Control voltage deviation",points:ctrl}],cursor:cursorUs});
      drawChart(query(root,"#settle-phase"),{xMin:0,xMax:10,yMin:-12,yMax:12,xTicks:ticks([0,2,4,6,8,10]," μs",0),yTicks:ticks([-10,-5,0,5,10],"",0),xLabel:"Time (μs)",yLabel:"Δφe (mrad)",series:[{color:"#a64e25",label:"Phase error",points:phase}],cursor:cursorUs});
      var at=M.settlingResponse({deltaF0Hz:offsetKHz*1e3,fnHz:90e3,zeta:.7,N:125,kvcoHzPerVolt:100e6},cursorUs*1e-6).samples[0];
      text(root,'[data-value="deltaF0KHz"]',signed(offsetKHz,0)+" kHz");
      text(root,'[data-value="cursorUs"]',fmt(cursorUs,2)+" μs");
      text(root,"[data-readout-df]",signed(at.deltaFVcoHz/1e3,3)+" kHz");
      text(root,"[data-readout-v]",signed(at.deltaVctrlV*1e3,5)+" mV");
      text(root,"[data-readout-phase]",signed(at.deltaPhaseRefMinusFbRad*1e3,4)+" mrad");
      text(root,"[data-readout-vco]","fVCO 偏差 "+signed(at.deltaFVcoHz/1e3,3)+" kHz");
      var pfd=40e6;
      var edgeDelayPs=at.deltaPhaseRefMinusFbRad/(2*Math.PI*pfd)*1e12;
      var x0=150,x1=650,scale=6;
      var fbX=x0+Math.max(-45,Math.min(45,edgeDelayPs))*scale;
      var svg=query(root,"#settle-edge-view");
      svg.innerHTML='<line x1="90" y1="47" x2="770" y2="47" stroke="#e1e9ee"/><line x1="90" y1="96" x2="770" y2="96" stroke="#e1e9ee"/>'+
       '<text x="18" y="53">REF</text><text x="18" y="102">FB</text><line x1="'+x0+'" y1="25" x2="'+x0+'" y2="65" stroke="#17658b" stroke-width="4"/>'+
       '<line x1="'+fbX.toFixed(1)+'" y1="74" x2="'+fbX.toFixed(1)+'" y2="114" stroke="#a64e25" stroke-width="4"/>'+
       '<text x="90" y="140">局部边沿相对位置（放大示意；Δt='+signed(edgeDelayPs,3)+' ps）</text>';
      setBadge(root,offsetKHz<0?"VCO 偏慢：ΔfVCO<0，正 Kvco 下 ΔVCTRL<0。":"VCO 偏快或正好：控制偏差方向随 ΔfVCO 符号改变。");
    }
    function advance(){var next=number(root,"cursorUs")+.1;if(next>10)next=10;setParam(root,"cursorUs",next);render();if(next>=10){playing=false;stopTimer(root);}}
    linkControls(root,render);
    all(root,"[data-action]").forEach(function(button){button.addEventListener("click",function(){
      var action=button.dataset.action;
      if(action==="play"){playing=true;startTimer(root,advance,40);}
      if(action==="pause"){playing=false;stopTimer(root);render();}
      if(action==="step"){playing=false;stopTimer(root);advance();}
      if(action==="restart"||action==="reset"){playing=false;stopTimer(root);setParam(root,"deltaF0KHz",-100);setParam(root,"cursorUs",0);render();}
      if(action==="preset-slow"){setParam(root,"deltaF0KHz",-100);setParam(root,"cursorUs",0);render();}
      if(action==="preset-fast"){setParam(root,"deltaF0KHz",100);setParam(root,"cursorUs",0);render();}
      if(action==="preset-lock"){setParam(root,"deltaF0KHz",0);setParam(root,"cursorUs",0);render();}
    });});
    root._render=render;render();
  }

  function initA11(root){
    var selectedNode="reference",selectedPath=null,tourIndex=-1,tourTimer=null;
    var svg=query(root,"#pll-block-diagram");
    function applyPath(path){
      selectedPath=path;
      all(root,"#pll-block-diagram [data-path]").forEach(function(el){el.classList.toggle("is-highlighted",el.dataset.path===path);});
      all(root,"[data-path-select]").forEach(function(el){el.setAttribute("aria-pressed",el.dataset.pathSelect===path?"true":"false");});
      text(root,"[data-path-summary]",path?D.paths[path]:"选择一条路径开始追踪。");
    }
    function showNode(id){
      var item=D.nodes[id];if(!item)return;
      selectedNode=id;
      all(root,"#pll-block-diagram [data-node]").forEach(function(el){el.classList.toggle("is-selected",el.dataset.node===id);});
      text(root,"[data-node-title]",item.title);
      text(root,"[data-node-role]",item.role);
      text(root,"[data-node-input]",item.input);
      text(root,"[data-node-output]",item.output);
    }
    function tour(index){
      if(index<0||index>=D.tours.length){tourIndex=-1;window.clearInterval(tourTimer);tourTimer=null;showNode("reference");applyPath(null);text(root,"[data-tour-step]","Guided Tour 已结束。可点任意模块继续探索。");return;}
      tourIndex=index;var step=D.tours[index];showNode(step.node);applyPath(step.path);
      text(root,"[data-tour-step]",step.title+" · "+step.text);
      text(root,"[data-tour-count]",(index+1)+" / "+D.tours.length);
    }
    function render(){
      var p=M.frequencyPlan({fRefHz:number(root,"fRefMHz")*1e6,R:number(root,"refDividerR"),N:number(root,"feedbackDividerN"),D:number(root,"outputDividerD")});
      text(root,'[data-value="fRefMHz"]',fmt(p.fRefHz/1e6,0)+" MHz");
      text(root,'[data-value="refDividerR"]',"÷"+p.R);
      text(root,'[data-value="feedbackDividerN"]',"÷"+p.N);
      text(root,'[data-value="outputDividerD"]',"÷"+p.D);
      [["ref",p.fRefHz],["pfd",p.fPfdHz],["vco",p.fVcoHz],["fb",p.fFeedbackHz],["out",p.fOutHz]].forEach(function(pair){
        all(root,"[data-freq='"+pair[0]+"']").forEach(function(el){el.textContent=fmtHz(pair[1]);});
      });
      text(root,"[data-frequency-explain]","fVCO = N·fPFD = "+fmtHz(p.fVcoHz)+"；fOUT = fVCO/D = "+fmtHz(p.fOutHz)+".");
    }
    function focusFrequency(which){
      root.dataset.frequencyFocus=which;
      all(root,"[data-frequency-focus]").forEach(function(button){button.setAttribute("aria-pressed",button.dataset.frequencyFocus===which?"true":"false");});
      all(svg,"[data-frequency-kind]").forEach(function(group){group.classList.toggle("is-frequency-focus",group.dataset.frequencyKind===which);});
      all(svg,"[data-node='vco'],[data-node='outputDivider'],[data-node='output']").forEach(function(node){
        var active=which==="vco"?node.dataset.node==="vco":node.dataset.node==="outputDivider"||node.dataset.node==="output";
        node.classList.toggle("is-frequency-focus",active);
      });
      text(root,"[data-frequency-focus-summary]",which==="vco"?"当前突出显示 VCO 内部频率。":"当前突出显示最终 RF/Clock 输出频率。");
    }
    linkControls(root,render);
    svg.addEventListener("click",function(event){var node=event.target.closest("[data-node]");if(node)showNode(node.dataset.node);var wire=event.target.closest("[data-path]");if(wire)applyPath(wire.dataset.path);});
    svg.addEventListener("keydown",function(event){if((event.key==="Enter"||event.key===" ")&&event.target.matches("[data-node]")){event.preventDefault();showNode(event.target.dataset.node);}});
    all(root,"[data-path-select]").forEach(function(button){button.addEventListener("click",function(){applyPath(button.dataset.pathSelect);});});
    all(root,"[data-frequency-focus]").forEach(function(button){button.addEventListener("click",function(){focusFrequency(button.dataset.frequencyFocus);});});
    all(root,"[data-action='reset']").forEach(function(button){button.addEventListener("click",function(){
      setParam(root,"fRefMHz",40);setParam(root,"refDividerR",1);setParam(root,"feedbackDividerN",125);setParam(root,"outputDividerD",2);
      focusFrequency("vco");showNode("reference");applyPath("reference");render();
    });});
    query(root,"[data-action='tour-start']").addEventListener("click",function(){tour(0);});
    query(root,"[data-action='tour-prev']").addEventListener("click",function(){tour(Math.max(0,tourIndex-1));});
    query(root,"[data-action='tour-next']").addEventListener("click",function(){tour(tourIndex<0?0:tourIndex+1);});
    query(root,"[data-action='tour-play']").addEventListener("click",function(){
      if(tourTimer){window.clearInterval(tourTimer);tourTimer=null;return;}
      if(tourIndex<0)tour(0);
      tourTimer=window.setInterval(function(){if(tourIndex<D.tours.length-1)tour(tourIndex+1);else{window.clearInterval(tourTimer);tourTimer=null;tour(-1);}},1800);
    });
    query(root,"[data-action='tour-exit']").addEventListener("click",function(){if(tourTimer)window.clearInterval(tourTimer);tourTimer=null;tour(-1);});
    root._stopTour=function(){if(tourTimer)window.clearInterval(tourTimer);tourTimer=null;};
    root._render=render;render();showNode(selectedNode);applyPath("reference");focusFrequency("vco");
  }

  function initA13(root){
    var set=query(root,"#noise-marker");
    var mode=query(root,"#noise-unit-mode");
    function render(){
      var idx=Number(set.value),point=D.noiseMeasurement.markerPoints[idx];
      var points=D.noiseMeasurement.markerPoints.map(function(item){return [Math.log10(item.offsetHz),item.dbcPerHz];});
      drawChart(query(root,"#noise-chart"),{
        xMin:4,xMax:7,yMin:-150,yMax:-100,xTicks:[[4,"10 kHz"],[5,"100 kHz"],[6,"1 MHz"],[7,"10 MHz"]],
        yTicks:ticks([-150,-140,-130,-120,-110,-100],"",0),xLabel:"Offset frequency (log scale)",yLabel:"SSB phase noise (dBc/Hz)",
        series:[{color:"#17658b",label:"TI measured markers",dots:true,connect:false,selectedIndex:idx,points:points}]
      });
      text(root,"[data-noise-offset]",point.label);
      text(root,"[data-noise-level]",fmt(point.dbcPerHz,1)+" dBc/Hz");
      text(root,"[data-noise-carrier]",fmt(D.noiseMeasurement.carrierDisplayGHz,7)+" GHz");
      text(root,"[data-noise-source]",D.noiseMeasurement.extraction);
      all(root,"[data-unit-card]").forEach(function(card){card.hidden=card.dataset.unitCard!==mode.value;});
      all(root,"[data-marker-option]").forEach(function(button){button.setAttribute("aria-pressed",Number(button.dataset.markerOption)===idx?"true":"false");});
    }
    set.addEventListener("change",render);mode.addEventListener("change",render);
    all(root,"[data-marker-option]").forEach(function(button){button.addEventListener("click",function(){set.value=button.dataset.markerOption;render();});});
    all(root,"[data-action='reset']").forEach(function(button){button.addEventListener("click",function(){set.value="1";mode.value="continuous";render();});});
    root._render=render;render();
  }

  function init(root){
    checkCards(root);
    var type=root.dataset.classroomLab;
    if(type==="a21")initA21(root);
    if(type==="a22")initA22(root);
    if(type==="a23")initA23(root);
    if(type==="a11")initA11(root);
    if(type==="a12")initA12(root);
    if(type==="a13")initA13(root);
  }
  document.addEventListener("DOMContentLoaded",function(){
    all(document,"main[data-classroom-lab]").forEach(init);
  });
  window.addEventListener("resize",function(){
    all(document,"main[data-classroom-lab]").forEach(function(root){if(root._render)root._render();});
  });
  window.addEventListener("pagehide",function(){all(document,"main[data-classroom-lab]").forEach(function(root){stopTimer(root);if(root._stopTour)root._stopTour();});});
})();

