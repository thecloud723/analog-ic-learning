(function (root) {
  "use strict";
  root.PLLAData = {
    noiseMeasurement: {
      id: "A-INT-03",
      evidence: "TI Datasheet / Measured Figure",
      sourceName: "Texas Instruments LMX2594EVM User's Guide, SNAU210B, Fig. 5-1",
      sourceUrl: "https://www.ti.com/lit/ug/snau210b/snau210b.pdf#page=6",
      carrierHz: 14000028900,
      carrierDisplayGHz: 14.0000289,
      extraction: "Four discrete readings copied from markers printed in TI SNAU210B Fig. 5-1. UI rounds to 0.1 dB; the points are not interpolated and are not a newly acquired instrument data set.",
      markerPoints: [
        {offsetHz: 10000, dbcPerHz: -105.1543, label: "10 kHz"},
        {offsetHz: 100000, dbcPerHz: -108.0194, label: "100 kHz"},
        {offsetHz: 1000000, dbcPerHz: -116.4369, label: "1 MHz"},
        {offsetHz: 10000000, dbcPerHz: -141.5219, label: "10 MHz"}
      ]
    },
    nodes: {
      reference: {title: "参考振荡器", role: "提供稳定的比较节拍；参考源的频率精度与相位噪声会影响合成器输出。", input: "晶体、TCXO 或外部时钟", output: "参考频率（Hz）"},
      refDivider: {title: "参考分频器", role: "按参考分频比缩短比较周期，形成送入 PFD 的比较节拍。", input: "参考频率", output: "PFD 比较频率"},
      pfd: {title: "PFD / PD", role: "比较参考边沿和反馈边沿的先后，输出 UP/DN 方向信息。A2.3 会逐事件观察理想 PFD。", input: "参考边沿与反馈边沿", output: "UP / DN"},
      chargePump: {title: "电荷泵", role: "把 UP/DN 脉冲转换为充电或放电电流。A 部分只解释方向，不虚构电流和控制电压数值。", input: "UP / DN", output: "正向或反向电流"},
      loopFilter: {title: "环路滤波器", role: "把电荷泵电流整形成较平滑的控制电压，同时决定环路动态和稳定性。", input: "电荷泵电流", output: "控制电压（V）"},
      vco: {title: "压控振荡器", role: "产生可调的内部振荡频率。在正向增益假设下，控制电压升高会使频率上升。", input: "控制电压", output: "VCO 内部频率（Hz）"},
      feedbackDivider: {title: "反馈分频器", role: "按反馈分频比把 VCO 信号送回 PFD；锁定后，反馈节拍与比较节拍相同。", input: "VCO 内部频率", output: "反馈频率"},
      outputDivider: {title: "输出分频器", role: "只作用于输出支路；它与闭环反馈分频比是两个不同参数。", input: "VCO 内部频率", output: "分频后的输出"},
      output: {title: "RF / 时钟输出", role: "最终对外输出。它可能与 VCO 内部频率不同，取决于输出分频设置。", input: "VCO 输出经输出分频", output: "最终输出频率（Hz）"}
    },
    tours: [
      {node: "reference", path: "reference", title: "1 · 参考输入", text: "从稳定参考开始。它决定比较器多久收到一次基准边沿。"},
      {node: "refDivider", path: "reference", title: "2 · 参考分频", text: "参考分频比改变 PFD 的比较节拍。"},
      {node: "pfd", path: "reference", title: "3 · 相位比较", text: "PFD 同时比较参考边沿和反馈边沿；它不直接产生 RF 输出。"},
      {node: "chargePump", path: "control", title: "4 · 纠偏控制", text: "UP/DN 经过电荷泵和环路滤波器变成控制电压。"},
      {node: "vco", path: "control", title: "5 · 振荡器调频", text: "VCO 内部频率由控制电压改变，反馈和输出从这里分支。"},
      {node: "feedbackDivider", path: "feedback", title: "6 · 闭环反馈", text: "反馈路径经反馈分频后回到 PFD；另一路经输出分频得到外部信号。"}
    ],
    paths: {
      reference: "参考路径：参考源经参考分频后进入 PFD，建立比较节拍。",
      feedback: "反馈路径：VCO 输出经反馈分频后回到 PFD。",
      control: "控制路径：PFD 的 UP/DN 信号经电荷泵和环路滤波器控制 VCO。",
      output: "输出路径：VCO 输出经独立的输出分频送到 RF 或时钟端口。"
    }
  };
})(typeof globalThis === "object" ? globalThis : this);

