# 第 11～13 章资料来源与模型说明

## 第 11 章
- TI, Dean Banerjee, *PLL Performance, Simulation, and Design*, 4th ed., Chapters 16–17, cycle slips and lock-time analysis: https://e2echina.ti.com/cfs-file.ashx/__key/communityserver-discussions-components-files/60/8508.PLL-Performance_2C00_-Simulation_2C00_-and-Design.PDF
- TI, SNAA106C, *PLL Performance, Simulation, and Design*, 2017: https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf

## 第 12 章
- Analog Devices, AN-1067, *The Power Spectral Density of Phase Noise and Jitter: Theory, Data Analysis, and Experimental Results*: https://www.analog.com/en/resources/app-notes/an-1067.html
- Analog Devices, *Phase-Locked Loops for High-Frequency Receivers and Transmitters – Part 2*: https://www.analog.com/en/resources/analog-dialogue/articles/pll-for-high-frequency-receivers-and-transmitters-2.html
- TI, SSZTB85, *Issues with Jitter, Phase Noise, Lock Time or Spurs? Check the Loop-filter Bandwidth of Your PLL*: https://www.ti.com/document-viewer/lit/html/SSZTB85/GUID-6556209D-FC52-4BCA-9C45-48B1462E3A65

## 第 13 章
- Analog Devices, AN143, *A Simple Method to Accurately Predict PLL Reference Spur Levels Due to Leakage Current*: https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html
- Thambidurai & Krishnapura, *Spur Reduction in Wideband PLLs by Random Positioning of Charge Pump Current Pulses*: https://www.ee.iitm.ac.in/~nagendra/papers/isc10-pllspurreduction-pap.pdf
- Yang et al., *A 360–456 MHz PLL frequency synthesizer with digitally controlled charge pump leakage calibration*, A-SSCC 2019: https://icas.tsinghua-sz.edu.cn/WebPublications/PaperDetail/1111?unit=1002

## Figure policy
- 本批框图和示意图为按原理重新绘制的教学图；不将第三方图片冒充原创或实测。
- TI 的锁定时间数值案例按原资料数据重新制图，并注明 446 μs 理论、449 μs 实测、换用电容后 578 μs。
- ADI AN143 的 2.1 GHz 频谱结构按原图测试条件重新绘制；未复制原始波形幅度，图中曲线高度明确标为示意。
- 所有公式均由 MathJax 在构建阶段预渲染为 SVG，HTML 离线运行不依赖 CDN。