"use strict";

const blue = "#17658b";
const rust = "#a64e25";
const lab = document.querySelector("[data-lab]");

function plot(canvas, spec) {
  const context = canvas.getContext("2d");
  const {width, height} = canvas;
  const {xMin, xMax, yMin, yMax, xTicks, yTicks, series} = spec;
  const left = 65, right = width - 17, top = 12, bottom = height - 38;
  const mapX = x => left + (x - xMin) / (xMax - xMin) * (right - left);
  const mapY = y => bottom - (y - yMin) / (yMax - yMin) * (bottom - top);
  context.clearRect(0, 0, width, height);
  context.font = "18px system-ui";
  context.strokeStyle = "#d9e4eb";
  context.fillStyle = "#3b5365";
  for (const [x, label] of xTicks) {
    context.beginPath(); context.moveTo(mapX(x), top); context.lineTo(mapX(x), bottom); context.stroke();
    context.textAlign = x === xMax ? "right" : x === xMin ? "left" : "center";
    context.fillText(label, mapX(x), bottom + 25);
  }
  for (const [y, label] of yTicks) {
    context.beginPath(); context.moveTo(left, mapY(y)); context.lineTo(right, mapY(y)); context.stroke();
    context.textAlign = "right"; context.fillText(label, left - 8, mapY(y) + 5);
  }
  context.save();
  context.beginPath(); context.rect(left - 6, top - 6, right - left + 12, bottom - top + 12); context.clip();
  for (const line of series) {
    context.strokeStyle = line.color;
    context.fillStyle = line.color;
    context.lineWidth = 3;
    context.beginPath();
    let previous;
    for (const [x, y] of line.points) {
      if (line.dots) {
        context.beginPath(); context.arc(mapX(x), mapY(y), line.selected === x ? 8 : 5, 0, 2 * Math.PI); context.fill();
      } else if (previous === undefined || (line.wrap && Math.abs(y - previous) > 0.5)) {
        context.moveTo(mapX(x), mapY(y));
      } else {
        context.lineTo(mapX(x), mapY(y));
      }
      previous = y;
    }
    if (!line.dots) context.stroke();
  }
  context.restore();
}

const ticks = (values, suffix = "") => values.map(value => [value, value + suffix]);
const result = text => { lab.querySelector("[data-result]").textContent = text; };
function value(id, suffix = "") {
  const v = Number(document.getElementById(id).value);
  document.getElementById(id + "-value").textContent = v + suffix;
  return v;
}
const signed = (v, digits) => (v > 0 ? "+" : "") + v.toFixed(digits);

const render = {
  ratio() {
    const n = value("n");
    result("VCO 输出 " + (40 * n / 1000).toFixed(2) + " GHz · ÷" + n + " 后反馈仍为 40 MHz");
  },
  settle() {
    const offset = value("offset", " kHz");
    const naturalRate = 2 * Math.PI * 90000;
    const damping = 0.7;
    const decayRate = damping * naturalRate;
    const dampedRate = naturalRate * Math.sqrt(1 - damping ** 2);
    const traces = [[], [], []];
    for (let i = 0; i <= 320; i++) {
      const us = i / 32;
      const time = us * 1e-6;
      const sine = Math.sin(dampedRate * time);
      const envelope = Math.exp(-decayRate * time);
      const frequencyError = offset * envelope * (Math.cos(dampedRate * time) - decayRate * sine / dampedRate);
      const phaseError = -2 * Math.PI * offset * 1e6 * envelope * sine / (125 * dampedRate);
      traces[0].push([us, frequencyError]);
      traces[1].push([us, frequencyError / 100]);
      traces[2].push([us, phaseError]);
    }
    const bounds = [220, 2.2, 12];
    const labels = [[-200, 0, 200], [-2, 0, 2], [-10, 0, 10]];
    lab.querySelectorAll("canvas").forEach((canvas, i) => plot(canvas, {
      xMin:0, xMax:10, yMin:-bounds[i], yMax:bounds[i],
      xTicks:ticks([0, 2, 4, 6, 8, 10], " µs"), yTicks:ticks(labels[i]),
      series:[{color: i === 2 ? rust : blue, points:traces[i]}]
    }));
    result("初始 VCTRL 偏差 " + signed(offset / 100, 2) + " mV · N = 125 · VCO 增益 = 100 MHz/V");
  },
  noise() {
    const markers = [-105.1543, -108.0194, -116.4369, -141.5219];
    const select = document.getElementById("marker");
    const index = select.selectedIndex;
    plot(lab.querySelector("canvas"), {
      xMin:-0.2, xMax:3.2, yMin:-150, yMax:-100,
      xTicks:[[0,"10 kHz"],[1,"100 kHz"],[2,"1 MHz"],[3,"10 MHz"]], yTicks:ticks([-150,-140,-130,-120,-110,-100]),
      series:[{color:blue, points:markers.map((marker, i) => [i, marker]), dots:true, selected:index}]
    });
    result("频偏 " + select.value + " · " + markers[index].toFixed(4) + " dBc/Hz");
  },
  delay() {
    const delay = value("delay", " ps");
    const edge = (time, level) => [[-3,level],[time,level],[time,level+0.65],[3,level+0.65]];
    plot(lab.querySelector("canvas"), {xMin:-3,xMax:3,yMin:-0.1,yMax:1.8,
      xTicks:ticks([-3,-2,-1,0,1,2,3]," ns"),yTicks:[[0.33,"反馈"],[1.33,"参考"]],
      series:[{color:blue,points:edge(0,1)},{color:rust,points:edge(delay/1000,0)}]});
    result("参考减反馈相位 " + signed(360 * delay / 10000, 2) + "°");
  },
  ramp() {
    const df = value("df", " kHz"), full = [], wrapped = [];
    for (let i = 0; i <= 240; i++) {
      const ms = i / 240, phase = 0.15 + df * ms;
      full.push([ms,phase]);
      wrapped.push([ms,phase - Math.floor(phase + 0.5)]);
    }
    plot(lab.querySelector("canvas"), {xMin:0,xMax:1,yMin:-5.5,yMax:5.5,
      xTicks:ticks([0,0.25,0.5,0.75,1]," ms"),yTicks:ticks([-5,-2.5,0,2.5,5]),
      series:[{color:blue,points:full},{color:rust,points:wrapped,wrap:true}]});
    result("1 ms 时未包裹相位 " + signed(0.15 + df, 2) + " 圈 · 初始相位 +0.15 圈");
  },
  edge() {
    const referenceLeads = lab.querySelector("input:checked").value === "ref";
    result(referenceLeads ? "UP → 净充电 → VCTRL 上升 → VCO 加速 → 反馈边沿提前" :
      "DN → 净放电 → VCTRL 下降 → VCO 减速 → 反馈边沿延后");
  }
};

if (lab && render[lab.dataset.lab]) {
  const draw = render[lab.dataset.lab];
  lab.addEventListener("input", draw);
  draw();
}
