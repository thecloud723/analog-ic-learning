(function (root) {
  "use strict";
  root.PLLAData = {
    noiseMeasurement: {
      id: "A-INT-03",
      evidence: "TI Datasheet / Measured Figure",
      sourceName: "Texas Instruments LMX2594EVM User's Guide, SNAU210B, Fig. 5-1",
      sourceUrl: "https://www.ti.com/lit/ug/snau210b/snau210b.pdf#page=6",
      imagePath: "../assets/originals/ti/lmx2594-fig5-1.png",
      carrierHz: 14000028900,
      carrierDisplayGHz: 14.0000289,
      extraction: "Values copied from the marker readouts printed in the TI measurement figure. UI rounds to 0.1 dB; this is not a newly acquired instrument data set.",
      markerPoints: [
        {offsetHz: 10000, dbcPerHz: -105.1543, label: "10 kHz"},
        {offsetHz: 100000, dbcPerHz: -108.0194, label: "100 kHz"},
        {offsetHz: 1000000, dbcPerHz: -116.4369, label: "1 MHz"},
        {offsetHz: 10000000, dbcPerHz: -141.5219, label: "10 MHz"}
      ]
    },
    nodes: {
      reference: {title: "Reference / OSC", role: "提供稳定的比较节拍。参考频率记为 fREF，精度和相位噪声会影响整个合成器。", input: "晶体、TCXO 或外部时钟", output: "fREF（Hz）"},
      refDivider: {title: "Reference Divider R", role: "把参考频率按 R 分频，形成 PFD 比较频率。通用教学模型采用 fPFD=fREF/R。", input: "fREF", output: "fPFD=fREF/R"},
      pfd: {title: "PFD / PD", role: "比较参考与反馈边沿的先后，输出 UP/DN 方向信息。A2.3 会逐事件观察理想 PFD。", input: "参考边沿与反馈边沿", output: "UP / DN"},
      chargePump: {title: "Charge Pump", role: "把 UP/DN 脉冲转换为充电或放电电流。A 部分只解释方向，不在这里虚构电流和 VCTRL 数值。", input: "UP / DN", output: "正向或反向电流"},
      loopFilter: {title: "Loop Filter", role: "把电荷泵电流整形成较平滑的控制电压，同时决定环路动态和稳定性。", input: "电荷泵电流", output: "VCTRL（V）"},
      vco: {title: "VCO", role: "电压控制振荡器的内部频率为 fVCO。正 Kvco 假设下，VCTRL 增大使振荡频率上升。", input: "VCTRL", output: "fVCO（Hz）"},
      feedbackDivider: {title: "Feedback Divider N", role: "把 fVCO 按 N 分频并送回 PFD。锁定关系下 fFB=fPFD；N 是闭环反馈分频比。", input: "fVCO", output: "fFB=fVCO/N"},
      outputDivider: {title: "Output Divider D", role: "只作用于输出支路，fOUT=fVCO/D。D 与反馈分频 N 是不同的参数。", input: "fVCO", output: "fOUT=fVCO/D"},
      output: {title: "RF / Clock Output", role: "最终对外输出。它可能与 VCO 内部频率不同，取决于输出分频 D。", input: "fVCO 经 D 分频", output: "fOUT（Hz）"}
    },
    tours: [
      {node: "reference", path: "reference", title: "1 · 参考输入", text: "从稳定参考开始。它决定比较器多久收到一次基准边沿。"},
      {node: "refDivider", path: "reference", title: "2 · 参考分频 R", text: "R 改变 PFD 节拍，公式是 fPFD=fREF/R。"},
      {node: "pfd", path: "reference", title: "3 · 相位比较", text: "PFD 同时比较参考边沿和反馈边沿；它不直接产生 RF 输出。"},
      {node: "chargePump", path: "control", title: "4 · 纠偏控制", text: "UP/DN 经过电荷泵和环路滤波器变成 VCTRL。"},
      {node: "vco", path: "control", title: "5 · 振荡器调频", text: "VCO 内部频率由控制电压改变，反馈和输出从这里分支。"},
      {node: "feedbackDivider", path: "feedback", title: "6 · 闭环反馈", text: "反馈路径按 N 分频回到 PFD；另一路才经 D 得到外部输出。"}
    ],
    paths: {
      reference: "参考路径：OSC → R → PFD，建立比较节拍。",
      feedback: "反馈路径：VCO → N → PFD，决定闭环比较比值。",
      control: "控制路径：PFD → CP → Loop Filter → VCO，形成纠偏作用。",
      output: "输出路径：VCO → D → RF/Clock Output。改变 D 不会改变反馈中的 N。"
    }
  };
})(typeof globalThis === "object" ? globalThis : this);

