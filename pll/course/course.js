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

const startupRuns = [{"rs":2.2,"f":5.429311599061681,"vpp":0.4610162755084226,"env":[0,0,0.00758,0.00949,0.01145,0.01423,0.01727,0.0208,0.02597,0.03122,0.03884,0.04646,0.05539,0.06795,0.07998,0.0961,0.11059,0.12554,0.14339,0.15751,0.1727,0.18378,0.19477,0.20234,0.20839,0.21412,0.21785,0.22117,0.22329,0.22531,0.22651,0.22736,0.22825,0.22882,0.22925,0.22945,0.2298,0.22999,0.23008,0.2301,0.23026,0.23035,0.23036,0.23034,0.23041,0.23046,0.23046,0.23042,0.23046,0.23049,0.23049,0.23043,0.23047,0.2305,0.2305,0.23045,0.23048,0.23051,0.2305,0.23044,0.23049,0.23051,0.2305,0.23044,0.23049,0.23051,0.2305,0.23045,0.23049,0.23051,0.2305,0.23044,0.23049,0.23051,0.2305,0.23043,0.23049,0.23051,0.2305,0.23043,0.23049,0.23051,0.2305,0.23044,0.23049,0.23051,0.2305,0.23043,0.2305,0.23051,0.2305,0.23042,0.2305,0.23051,0.2305,0.23043,0.23049,0.23051,0.23049,0.23043,0.2305,0.23051,0.2305,0.23042,0.2305,0.23051,0.23049,0.23043,0.2305,0.23051,0.23049,0.23044,0.2305,0.23051,0.23049,0.23043,0.2305,0.23051,0.23049,0.23044,0.2305,0.23051,0.23049,0.23044,0.2305,0.23051,0.23048,0.23045,0.2305,0.23051,0.23049,0.23044,0.23051,0.23051,0.23049,0.23045,0.2305,0.23051,0.23048,0.23046,0.2305,0.23051,0.23048,0.23045,0.23051,0.23051,0.23048,0.23045,0.23051,0.23051,0.23048,0.23046,0.23051,0.23051,0.23047,0.23047,0.23051,0.23051,0.23048,0.23046,0.23051,0.23051,0.23047,0.23046,0.23051,0.23051,0.23047,0.23047,0.23051,0.23051,0.23046,0.23046,0.23051,0.23051,0.23047,0.23047,0.23051,0.23051,0.23046,0.23047,0.23051,0.23051,0.23046,0.23048,0.23051,0.23051,0.23045,0.23047,0.23051,0.23051,0.23046,0.23048,0.23051,0.2305,0.23045,0.23048,0.23051,0.23051,0.23045,0.23049,0.23051,0.2305,0.23046,0.23048,0.23051,0.2305,0.23045,0.23048,0.23051,0.23051,0.23044,0.23049,0.23051,0.2305,0.23043,0.23048,0.23051,0.2305,0.23044,0.23049,0.23051,0.2305,0.23044,0.23049,0.23051,0.2305,0.23043,0.2305,0.23051,0.2305,0.23044,0.23049,0.23051,0.2305,0.23043,0.23049,0.23051,0.2305,0.23042,0.2305,0.19148]},{"rs":3.3,"f":null,"vpp":1.5774108819144317e-7,"env":[0,0,0.00646,0.00612,0.00565,0.00529,0.00495,0.00457,0.00428,0.00395,0.0037,0.00346,0.0032,0.00299,0.00276,0.00258,0.00242,0.00223,0.00209,0.00193,0.00181,0.00169,0.00156,0.00146,0.00135,0.00126,0.00118,0.00109,0.00102,0.00094,0.00088,0.00082,0.00076,0.00071,0.00066,0.00062,0.00057,0.00053,0.0005,0.00046,0.00043,0.0004,0.00037,0.00035,0.00032,0.0003,0.00028,0.00026,0.00024,0.00023,0.00021,0.00019,0.00018,0.00017,0.00016,0.00015,0.00014,0.00013,0.00012,0.00011,0.0001,0.0001,0.00009,0.00008,0.00008,0.00007,0.00007,0.00006,0.00006,0.00005,0.00005,0.00005,0.00004,0.00004,0.00004,0.00004,0.00003,0.00003,0.00003,0.00003,0.00002,0.00002,0.00002,0.00002,0.00002,0.00002,0.00002,0.00001,0.00001,0.00001,0.00001,0.00001,0.00001,0.00001,0.00001,0.00001,0.00001,0.00001,0.00001,0.00001,0.00001,0.00001,0.00001,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"rs":18,"f":null,"vpp":0,"env":[0,0,0.00419,0.00018,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}];
const measuredCapSweep = [[680,5.905378707048643],[810,5.429311599061681],[970,4.9759015069507475]];
const lcGHz = capacitanceFf => 1e-9 / (2 * Math.PI * Math.sqrt(1e-9 * capacitanceFf * 1e-15));
const samples = (start, end, fn) => Array.from({length:121}, (_, i) => {
  const x = start + (end - start) * i / 120;
  return [x, fn(x)];
});
const plotLab = spec => plot(lab.querySelector("canvas"), spec);
const selectedNumber = id => Number(document.getElementById(id).value);

Object.assign(render, {
  crystal() {
    const loadPf = value("cl", " pF");
    const pull = pf => 2500 / (2 + pf);
    plotLab({xMin:5,xMax:20,yMin:100,yMax:380,xTicks:ticks([5,10,15,20]," pF"),yTicks:ticks([100,200,300]),
      series:[{color:blue,points:samples(5,20,pull)},{color:rust,points:[[loadPf,pull(loadPf)]],dots:true}]});
    result("相对串联谐振 +" + pull(loadPf).toFixed(1) + " ppm · 相对标称 10 pF " + signed(pull(loadPf)-pull(10),1) + " ppm");
  },
  plan() {
    const r = value("ref-r"), n = value("plan-n");
    const pfd = 200 / r;
    result("PFD " + pfd.toFixed(2) + " MHz · 输出 " + (n*pfd/1000).toFixed(3) + " GHz · 保持 14 GHz 需 N = " + 70*r);
  },
  ring() {
    const n = selectedNumber("stages"), delay = value("stage-delay"," ps");
    result("半周期 " + n*delay + " ps · 近似频率 " + (1000/(2*n*delay)).toFixed(2) + " GHz");
  },
  tank() {
    const q = value("tank-q");
    const amplitude = cycles => Math.exp(-Math.PI*cycles/q);
    plotLab({xMin:0,xMax:40,yMin:0,yMax:1,xTicks:ticks([0,10,20,30,40]," 周期"),yTicks:ticks([0,.25,.5,.75,1]),
      series:[{color:blue,points:samples(0,40,amplitude)},{color:rust,points:samples(0,40,k=>amplitude(k)**2)}]});
    result("10 周期后 · 振幅 " + (100*amplitude(10)).toFixed(1) + "% · 能量 " + (100*amplitude(10)**2).toFixed(1) + "%");
  },
  startup() {
    const run = startupRuns.find(x=>x.rs===selectedNumber("series-loss"));
    const baseline = startupRuns[0];
    const makeTrace = x => x.env.map((point,i)=>[i/2,point]);
    const series = [{color:blue,points:makeTrace(run)}];
    if (run !== baseline) series.unshift({color:rust,points:makeTrace(baseline)});
    const ceiling = Math.max(.6, ...baseline.env, ...run.env) * 1.05;
    plotLab({xMin:0,xMax:120,yMin:0,yMax:ceiling,xTicks:ticks([0,30,60,90,120]," ns"),yTicks:ticks([0,.2,.4,.6]," V"),series});
    result((run.f===null?"蓝线未形成稳态频率":"蓝线稳态 "+run.f.toFixed(3)+" GHz")+
      " · 后段 Vpp "+run.vpp.toFixed(3)+" V"+(run!==baseline?" · 橙线：2.2 Ω 对照":""));
  },
  capSweep() {
    const capacitance = selectedNumber("vco-cap");
    const measured = measuredCapSweep.find(([cap])=>cap===capacitance)[1];
    plotLab({xMin:650,xMax:1000,yMin:4.8,yMax:6.4,xTicks:ticks([650,750,850,950]," fF"),yTicks:ticks([5,5.4,5.8,6.2]," GHz"),
      series:[{color:blue,points:samples(650,1000,lcGHz)},{color:rust,points:measuredCapSweep,dots:true,selected:capacitance}]});
    result("理想 LC "+lcGHz(capacitance).toFixed(3)+" GHz · SPICE "+measured.toFixed(3)+" GHz");
  },
  bank() {
    const step=value("cap-step"," fF"),span=value("cap-span"," fF");
    const upper=lcGHz(800), lower=lcGHz(800+span);
    const nextUpper=lcGHz(800+step), nextLower=lcGHz(800+step+span);
    const overlap=1000*(nextUpper-lower);
    plotLab({xMin:4.95,xMax:5.7,yMin:0,yMax:3,xTicks:ticks([5,5.2,5.4,5.6]," GHz"),yTicks:[[1,"档 1"],[2,"档 0"]],
      series:[{color:blue,points:[[lower,2],[upper,2]]},{color:rust,points:[[nextLower,1],[nextUpper,1]]}]});
    result(overlap===0?"相邻频段刚好接触":(overlap>0?"相邻频段重叠 ":"相邻频段空档 ")+Math.abs(overlap).toFixed(1)+" MHz");
  },
  margin() {
    const shift=value("pvt-shift"," MHz");
    const low=.2, high=1.2, gain=.3, target=5;
    const freq=v=>target+shift*.001+gain*(v-.7);
    const voltage=.7-shift*.001/gain;
    const inside=voltage>=low-1e-12&&voltage<=high+1e-12;
    plotLab({xMin:low,xMax:high,yMin:4.6,yMax:5.4,xTicks:ticks([.2,.45,.7,.95,1.2]," V"),yTicks:ticks([4.7,5,5.3]," GHz"),
      series:[{color:blue,points:[[low,freq(low)],[high,freq(high)]]},{color:rust,points:[[low,target],[high,target]]}]});
    result(inside?"可达 5 GHz · VCTRL "+voltage.toFixed(3)+" V · 最近电压余量 "+Math.max(0,1000*Math.min(voltage-low,high-voltage)).toFixed(0)+" mV":"5 GHz 超出该曲线的可调范围");
  }
});

if (lab && render[lab.dataset.lab]) {
  const draw = render[lab.dataset.lab];
  lab.addEventListener("input", draw);
  draw();
}
