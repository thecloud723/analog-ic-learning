(() => {
  "use strict";

  const replay = document.querySelector('[data-lab="fReplay"]');
  const payload = globalThis.pllLoopReplay;
  if (!replay || payload?.schemaVersion !== 1) return;

  const select = replay.querySelector("select");
  const [frequencyCanvas, voltageCanvas] = replay.querySelectorAll("canvas");
  const result = replay.querySelector("[data-result]");
  function render() {
    const run = payload.runs[Number(select.value)];
    const rows = run.data;
    const last = rows.at(-1)[0];
    const xTicks = ticks([0, last / 3, 2 * last / 3, last], " µs");
    const frequencyBound = Math.max(10, ...rows.map(row => Math.abs(row[1])));
    plot(frequencyCanvas, {
      xMin: 0, xMax: last, yMin: -frequencyBound, yMax: frequencyBound, xTicks,
      yTicks: ticks([-frequencyBound, 0, frequencyBound]),
      series: [{ points: rows.map(([time, frequency]) => [time, frequency]), color: blue }],
    });
    const voltageMin = run.parameters.voltageMin, voltageMax = run.parameters.voltageMax;
    plot(voltageCanvas, {
      xMin: 0, xMax: last, yMin: voltageMin, yMax: voltageMax, xTicks,
      yTicks: ticks([voltageMin, run.parameters.initialVoltage, voltageMax]),
      series: [
        { points: rows.map(row => [row[0], row[2]]), color: blue },
        { points: rows.map(row => [row[0], row[3]]), color: rust },
      ],
    });
    const lock = run.lock
      ? run.lock.entryUs.toFixed(3) + " µs 入带，" + run.lock.confirmationUs.toFixed(3) + " µs 确认"
      : "观察窗内未通过联合锁定判据";
    result.textContent = "Cp " + (run.parameters.shuntF * 1e12).toFixed(0) + " pF · " +
      "下拉失配 " + (run.cpMismatch * 100).toFixed(0) + "% · " +
      "UP/DN 延迟 " + run.parameters.upDelayNs.toFixed(2) + "/" +
      run.parameters.downDelayNs.toFixed(2) + " ns · " +
      (run.parameters.pumpOutputResistanceOhm
        ? "输出电阻 " + run.parameters.pumpOutputResistanceOhm / 1000 + " kΩ"
        : "理想电流源") + " · " + lock;
  }
  select.addEventListener("input", render);
  render();
})();
