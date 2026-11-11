# PLL 第 14–16 章参考资料

## Fractional-N 与工业产品

1. Texas Instruments, **LMX2594 15-GHz Wideband PLLATINUM RF Synthesizer Data Sheet**, SNAS696C, Rev. C (2019). 重点：Functional Block Diagram、N-Divider and Fractional Circuitry、32-bit programmable denominator、MASH_ORDER、PFD mode limits。
   - https://www.ti.com/lit/ds/symlink/lmx2594.pdf
2. Analog Devices, **ADF4159 Direct Modulation/Fast Waveform Generating, 13 GHz, Fractional-N Frequency Synthesizer Data Sheet**, Rev. E. 重点：INT + FRAC/2^25、third-order fractional interpolator、fPFD/2^25 frequency step、fractional spur 与 integer-boundary spur。
   - https://www.analog.com/media/en/technical-documentation/data-sheets/adf4159.pdf
3. Ian Galton, **Fractional-N PLLs**, IEEE Solid-State Circuits Society Short Course, 2010, 81 slides. 覆盖 Integer-N 局限、ΔΣ 分频、噪声整形、Fractional-N 环路模型、spur 和实际芯片设计。
   - https://resourcecenter.sscs.ieee.org/education/short-courses/sscstut0207

## ΣΔ / MASH / Dither

4. Harald Pretl et al., **MASH Modulator (3rd Order)**, JKU Radio-Frequency Integrated Circuits course material. 三级一阶级联、量化误差传递、数字噪声抵消、MASH 输出序列与 Dither 实验。页面声明 Apache License 2.0；本课程图形为独立重绘。
   - https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html
5. Texas Instruments, **LMX2594 Data Sheet**, N-Divider and Fractional Circuitry. MASH_ORDER 可配置、分母和 N-divider 限制、MASH seed 与相位关系。
   - https://www.ti.com/lit/ds/symlink/lmx2594.pdf
6. MathWorks, **Model MASH and SMASH Delta-Sigma Modulators**. 对 MASH 级联量化误差与数字抵消的补充参考。
   - https://www.mathworks.com/help/msblks/ug/model-mash-and-smash-delta-sigma-modulators.html

## ADPLL、TDC / DTC / DCO

7. Michael Perrott, **Tutorial on Digital Phase Locked Loops**, IEEE SSCS Short Course, 2008. 涵盖 DPLL 架构、TDC、DCO、噪声建模和数字环路设计。
   - https://resourcecenter.sscs.ieee.org/education/short-courses/sscstut2081
8. Jingcheng Zhuang and Robert Bogdan Staszewski, **All-Digital RF Phase-Locked Loops Exploiting Phase Prediction**, IPSJ Transactions on System and LSI Design Methodology, Vol. 7, 2014, pp. 2–15. 讨论 ADPLL 相位预测、TDC、DTC、整数/小数相位检测与芯片验证。
   - https://www.jstage.jst.go.jp/article/ipsjtsldm/7/0/7_2/_article
9. **A PVT Tolerant 10 to 500 MHz All-Digital Phase-Locked Loop With Coupled TDC and DCO**, IEEE Journal of Solid-State Circuits, Vol. 45, No. 2, 2010, pp. 314–321. 0.13 μm CMOS 实测 ADPLL 案例。
   - https://ieeexplore.ieee.org/document/5405141/
10. **A 2.2 GHz -242 dB-FOM 4.2 mW ADC-PLL Using Digital Sub-Sampling Architecture**, IEEE Journal of Solid-State Circuits, Vol. 51, No. 6, 2016, pp. 1385–1397. 说明 ADPLL 的数字相位量化路径不一定都采用传统 TDC。
    - https://ieeexplore.ieee.org/document/7463453/

## 图表与版权说明

- LMX2594、ADF4159 的结构图按公开数据手册中的功能关系重新绘制，未把厂商原图直接嵌入课程。
- JKU MASH 页面采用 Apache License 2.0；本课程只借鉴公开原理并独立重绘图形、重写讲解和交互。
- IEEE 论文和短课程材料以原始链接引用；未打包受版权保护的整页幻灯片或论文图。
- 厂商规格、论文实测数据、课程教学模型分别标注，不互相替代。
