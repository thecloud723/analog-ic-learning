(() => {
  "use strict";
  const data = globalThis.pllNoise01;
  if (data?.schemaVersion !== 1) return;
  const names = {
    reference: "参考", vco: "VCO", divider_pfd: "分频器/PFD", charge_pump: "CP 电流",
    loop_resistor: "滤波电阻", supply: "VCO 供电", buffer: "输出缓冲",
  };
  const colors = ["#17658b", "#a64e25", "#6c538a", "#28705d", "#9a5515", "#89536f", "#566578"];
  const power = centidb => 10 ** (centidb / 1000);
  const frequencies = data.offsetHz;
  const x = frequencies.map(Math.log10);
  const xTicks = [[3, "1 kHz"], [4, "10 kHz"], [5, "100 kHz"], [6, "1 MHz"], [7, "10 MHz"]];
  function area(values, lo, hi) {
    let sum = 0;
    for (let i = 1; i < frequencies.length; i++) {
      const a = Math.max(lo, frequencies[i - 1]), b = Math.min(hi, frequencies[i]);
      if (b <= a) continue;
      const slope = (values[i] - values[i - 1]) / (frequencies[i] - frequencies[i - 1]);
      sum += (b - a) * (values[i - 1] + slope * ((a + b) / 2 - frequencies[i - 1]));
    }
    return sum;
  }
  const lab = document.querySelector('[data-lab="noise01"]');
  if (lab) {
    const get = id => document.getElementById(id);
    const indicators = [...lab.querySelectorAll("input[data-source]")];
    const result = lab.querySelector("[data-result]");
    const render = () => {
      const caseData = data.cases[get("noise01-case").value];
      const restore = caseData.ssbCentidb;
      const showGain = get("noise01-view").value === "gain";
      const enabled = data.sources.filter((_, i) => indicators[i].checked);
      const selected = new Set(enabled);
      const lo = Number(get("noise01-low").value), hi = Number(get("noise01-high").value);
      const rows = Object.fromEntries(data.sources.map(name => [name, restore[name].map(power)]));
      const sum = frequencies.map((_, i) => enabled.reduce((acc, name) => acc + rows[name][i], 0));
      const graph = enabled.map(name => {
        const values = showGain ? caseData.normalizedGainCentidb[name] : restore[name];
        return { points: x.map((f, i) => [f, values[i] / 100]), color: colors[data.sources.indexOf(name)] };
      });
      if (!showGain && enabled.length) {
        graph.push({ points: x.map((f, i) => [f, 10 * Math.log10(sum[i])]), color: "#202b35" });
      }
      get("noise01-axis").textContent = showGain
        ? "传递幅度（dB，各源以 100 kHz 为 0 dB）" : "输出单边带相噪（dBc/Hz）";
      plot(lab.querySelector("canvas"), {
        xMin: x[0], xMax: x.at(-1), xTicks, yMin: showGain ? -85 : -185, yMax: showGain ? 50 : -75,
        yTicks: ticks(showGain ? [-80, -60, -40, -20, 0, 20, 40] : [-180, -160, -140, -120, -100, -80]),
        series: graph,
      });
      const radiansToPs = 1e12 / (2 * Math.PI * caseData.carrierHz);
      const random = 2 * area(sum, lo, hi);
      const pm = data.pmSpurs.filter(s => s.offset_hz >= lo && s.offset_hz <= hi)
        .reduce((acc, s) => acc + 2 * 10 ** (s.single_sideband_dbc / 10), 0);
      const rms = variance => (Math.sqrt(variance) * radiansToPs).toFixed(3) + " ps";
      result.textContent = (caseData.carrierHz / 1e9).toFixed(2) + " GHz · " +
        "随机 RMS " + rms(random) + " · 带内纯 PM RMS " + rms(pm) +
        (get("noise01-pm").checked ? " · 合计 RMS " + rms(random + pm) : "");
      const table = get("noise01-rows");
      table.replaceChildren();
      for (const [i, name] of data.sources.entries()) {
        const row = table.insertRow();
        const label = row.insertCell();
        label.textContent = names[name];
        label.style.color = colors[i];
        row.insertCell().textContent = selected.has(name)
          ? rms(2 * area(rows[name], lo, hi)) : "关闭";
      }
    };
    lab.addEventListener("input", render);
    render();
  }

  const evm = document.querySelector('[data-lab="evmFixed"]');
  if (evm) {
    const markers = data.measurement.markers, held = data.evm.holdouts;
    const select = evm.querySelector("select");
    const fitted = markers.filter(m => m.split === "fit");
    const toPoint = m => [Math.log10(m.offset_hz), m.ssb_dbc_per_hz];
    const render = () => {
      const focus = held[Number(select.value)];
      const log = Math.log10(focus.offset_hz);
      plot(evm.querySelector("canvas"), {
        xMin: 2, xMax: 8, yMin: -155, yMax: -80,
        xTicks: [[2, "100 Hz"], ...xTicks.filter(([f]) => f < 7), [7, "10 MHz"], [8, "100 MHz"]],
        yTicks: ticks([-150, -130, -110, -90]),
        series: [
          { color: blue, points: fitted.map(toPoint) },
          { color: blue, points: fitted.map(toPoint), dots: true },
          { color: rust, points: markers.filter(m => m.split === "holdout").map(toPoint), dots: true, selected: log },
          { color: "#213549", points: [[log, focus.prediction_dbc_per_hz]], dots: true, selected: log },
        ],
      });
      evm.querySelector("[data-result]").textContent =
        "拟合 " + focus.prediction_dbc_per_hz.toFixed(2) + " dBc/Hz · 实测标记 " +
        focus.ssb_dbc_per_hz.toFixed(2) + " dBc/Hz · 残差 " + focus.residual_db.toFixed(2) + " dB";
    };
    select.addEventListener("input", render);
    render();
  }
})();
