# PLL 素材下载清单

核对日期：2026-11-12。S 编号沿用原始资料需求，P 编号沿用原始插图需求。详细图片使用状态见 [PLL 全部图片盘点](../pll/FIGURE_REPLACEMENT_AUDIT.md)，下一项 Work 任务见 [TASK_PLL_NEXT_BATCH.md](TASK_PLL_NEXT_BATCH.md)。

## 按原始下载需求核对

| 需求 | 资料 | 下载与入库状态 | 仓库路径或计划归档位置 | 来源 |
| --- | --- | --- | --- | --- |
| S01 | JKU RFIC 教材 PLL 章 | 25 张 PDF 裁切 PNG 已归档，其中 24 张已复制到页面资源并被 HTML 引用；Fig.89 保留为候选。完整 rfic.pdf 已下载，待入库 | 原图在 materials/pll/originals/jku/；页面副本在 pll/assets/originals/jku/；PDF 计划放入 materials/pll/source-pdfs/jku/ | [JKU PLL 章节](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S02 | ADI MT-086 | PDF 已下载，待入库和提取 Figure 3A | 计划放入 pll/source-pdfs/adi/ | [ADI MT-086](https://www.analog.com/media/en/training-seminars/tutorials/MT-086.pdf) |
| S03 | ADI PLL Fundamentals | 原网页来源已记录；离线网页快照尚待保存和入库 | 计划放入 materials/pll/originals/adi/ | [Analog Dialogue](https://www.analog.com/en/resources/analog-dialogue/articles/phase-locked-loop-pll-fundamentals.html) |
| S04 | TI PLL Performance, Simulation, and Design | SNAA106C PDF 已下载，待入库；锁定时间图号/页码待核对 | 计划放入 pll/source-pdfs/ti/ | [TI SNAA106C](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| S05 | ADI ADF4351 数据手册 | PDF 已下载，待入库；功能框图和 Figure 18 待提取 | 计划放入 pll/source-pdfs/adi/ | [ADI ADF4351](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf) |
| S06 | TI LMX2594 数据手册及校准资料 | SNAA336A 和 LMX2594 PDF 均已下载，待入库；Figure 1-4/功能框图待提取 | 计划放入 pll/source-pdfs/ti/ | [TI SNAA336A](https://www.ti.com/lit/an/snaa336a/snaa336a.pdf) · [LMX2594 产品页](https://www.ti.com/product/LMX2594) |
| S07 | JKU RFIC GitHub 源码 | PLL 2 张 SVG 已用于第 1 章；Oscillators 7 张 SVG 已归档并用于第 8 章；完整源码归档待核实 | [页面资源目录](../pll/assets/) · [原始归档](pll/originals/jku/) | [JKU 上游仓库](https://github.com/iic-jku/radio-frequency-integrated-circuits) |
| S08 | Staszewski ADPLL 课件 | IEEE 下载地址本次返回 503；仍待获取和授权核对 | 计划放入 pll/source-pdfs/papers/ | [原始下载地址](https://ewh.ieee.org/soc/cas/dallas/documents/Sem-022107-stas_adpll.pdf) |
| S09 | JKU RFIC Oscillators 章节 | 7 张上游 SVG 已归档并用于第 8 章 | [原图目录](pll/originals/jku-oscillators/) | [JKU Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| S10 | MDPI 65 nm LC-DCO 论文 | Fig. 3、4、7 已归档并在第 8 章本地展示；PDF 已下载待入库 | [原图目录](pll/originals/mdpi/) | [论文 DOI](https://doi.org/10.3390/electronics10222741) |
| S11 | ADI AN143 Reference Spurs | PDF 已下载，待入库；Figure 3 待提取并核对复绘曲线条件 | 计划放入 pll/source-pdfs/adi/ | [ADI AN143 PDF](https://www.analog.com/media/en/technical-documentation/application-notes/AN143f.pdf) |
| S12 | DTC 专项资料 | FPGA Vernier DTC Fig. 4 已归档并用于第 17 章；ASIC ADPLL DTC 原图待补 | [原图目录](pll/originals/mdpi-dtc/) | [论文 DOI](https://doi.org/10.3390/app9132705) |

## 已实际被章节 HTML 使用的图片

截至本次提交，18 章中有 14 章新增了本地原图引用，共 42 处引用、35 个新增页面资源文件。加上第 1 章原有的 2 张 JKU SVG，当前 pll/assets/ 下共有 **37 个页面资源文件**。其中 11 张是本轮新下载归档的原图，另外 24 张 JKU PLL PNG 是之前已归档的候选图，本轮复制到页面资源目录并实际使用。

| 来源 | 页面资源数量 | 使用章节 | 页面资源路径 |
|---|---:|---|---|
| JKU PLL Figures 74–88、90–98 | 24 张 PNG | 2、3、4、5、6、7、8、9、10、12、14、15、16、17 | pll/assets/originals/jku/ |
| JKU PLL Figures 74、83 | 2 张 SVG | 1 | pll/assets/jku-fig-pll-block-diagram.svg、pll/assets/jku-fig-pll-pfd-cp.svg |
| JKU Oscillators Figures 60、61、69–73 | 7 张 SVG | 8 | pll/assets/originals/jku-oscillators/ |
| MDPI 65 nm LC-DCO Figures 3、4、7 | 3 张 PNG | 8 | pll/assets/originals/mdpi/ |
| FPGA Vernier DTC Figure 4 | 1 张 JPEG | 17 | pll/assets/originals/mdpi-dtc/ |

JKU PLL Figure 89 仍保留在 materials/pll/originals/jku/，当前 HTML 没有引用，因此状态仍是 archived_candidate。其余 24 张 JKU PLL PNG 已在 pll/assets/originals/jku/ 建立页面副本，并在章节中通过相对路径引用。

第 8 章 MDPI Figure 3、4、7 已经是正文中的本地图片，不再依赖外链。第 17 章的 FPGA Vernier DTC Figure 4 是可编程延迟线实现例，不等同于本课程 ADPLL 分数相位补偿所需的 ASIC DTC 电路及增益校准图；后者仍缺。

逐图原始归档路径、页面副本路径、图号、来源、状态和章节映射见 [FIGURE_MANIFEST.csv](pll/FIGURE_MANIFEST.csv)。逐章引用数量和缺图情况见 [PLL 图片审计](../pll/FIGURE_REPLACEMENT_AUDIT.md)。

## 图片使用和授权原则

- 页面实际引用的图片必须放在 pll/assets/，HTML 只使用相对路径。
- 未使用的原始 PDF/图片和候选截图放在 materials/pll/。
- 每张图片记录来源、作者/机构、图号/页码、许可证、裁切/转换方式、使用章节和页面路径。
- JKU 课程资料声明 Apache-2.0；MDPI 论文采用 CC BY 4.0；ADI/TI 及其他论文/课件资料需保留版权信息，公开发布前单独复核授权。
- 动态交互图保留实时计算，不用静态截图替换。

## 2026-11-12 页面更新

第 8 章的 3 个联网图片链接已改为正文中的本地原图。其余新增原图放在对应知识点下，可展开对照，原有交互、教学简图和复绘曲线仍可使用。第 17 章新增 FPGA Vernier DTC 的可编程延迟线图，仍缺和本章 ADPLL 分数相位补偿完全匹配的 ASIC DTC 电路及增益校准原图。

| 材料清单编号 | 图 | 使用章节 | 仓库路径 | 来源 |
| --- | --- | --- | --- | --- |
| S01 | 基本 PLL 框图 | 4 | [原始归档](../materials/pll/originals/jku/fig_074.png) · [页面副本](../pll/assets/originals/jku/fig_074.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | XOR 鉴相输入与输出波形 | 2 | [原始归档](../materials/pll/originals/jku/fig_075.png) · [页面副本](../pll/assets/originals/jku/fig_075.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | PLL 拉普拉斯域模型 | 10 | [原始归档](../materials/pll/originals/jku/fig_076.png) · [页面副本](../pll/assets/originals/jku/fig_076.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | PFD 电路实现 | 6 | [原始归档](../materials/pll/originals/jku/fig_077.png) · [页面副本](../pll/assets/originals/jku/fig_077.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 参考边沿领先 | 3、6 | [原始归档](../materials/pll/originals/jku/fig_078.png) · [页面副本](../pll/assets/originals/jku/fig_078.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 反馈边沿领先 | 3、6 | [原始归档](../materials/pll/originals/jku/fig_079.png) · [页面副本](../pll/assets/originals/jku/fig_079.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 相位和频率对齐 | 6 | [原始归档](../materials/pll/originals/jku/fig_080.png) · [页面副本](../pll/assets/originals/jku/fig_080.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 反馈频率偏高 | 6 | [原始归档](../materials/pll/originals/jku/fig_081.png) · [页面副本](../pll/assets/originals/jku/fig_081.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 电荷泵电路 | 7 | [原始归档](../materials/pll/originals/jku/fig_082.png) · [页面副本](../pll/assets/originals/jku/fig_082.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | PFD–CP PLL 闭环与滤波器 | 3、4、7、9 | [原始归档](../materials/pll/originals/jku/fig_083.png) · [页面副本](../pll/assets/originals/jku/fig_083.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 参考与 VCO 相位噪声贡献 | 12 | [原始归档](../materials/pll/originals/jku/fig_084.png) · [页面副本](../pll/assets/originals/jku/fig_084.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 全数字 PLL 框图 | 4、16 | [原始归档](../materials/pll/originals/jku/fig_085.png) · [页面副本](../pll/assets/originals/jku/fig_085.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 延迟链 TDC 电路 | 16、17 | [原始归档](../materials/pll/originals/jku/fig_086.png) · [页面副本](../pll/assets/originals/jku/fig_086.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | DAC 控制振荡器 | 8 | [原始归档](../materials/pll/originals/jku/fig_087.png) · [页面副本](../pll/assets/originals/jku/fig_087.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 开关差分变容单元 | 8 | [原始归档](../materials/pll/originals/jku/fig_088.png) · [页面副本](../pll/assets/originals/jku/fig_088.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 数字一阶 ΔΣ 调制器 | 15 | [原始归档](../materials/pll/originals/jku/fig_090.png) · [页面副本](../pll/assets/originals/jku/fig_090.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 一阶 ΔΣ 的噪声传递函数 | 15 | [原始归档](../materials/pll/originals/jku/fig_091.png) · [页面副本](../pll/assets/originals/jku/fig_091.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 三阶 MASH 序列和频谱 | 15 | [原始归档](../materials/pll/originals/jku/fig_092.png) · [页面副本](../pll/assets/originals/jku/fig_092.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 加入 Dither 的三阶 MASH 序列和频谱 | 15 | [原始归档](../materials/pll/originals/jku/fig_093.png) · [页面副本](../pll/assets/originals/jku/fig_093.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 三阶 MASH 1-1-1 框图 | 15 | [原始归档](../materials/pll/originals/jku/fig_094.png) · [页面副本](../pll/assets/originals/jku/fig_094.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | Fractional-N PLL 框图 | 14 | [原始归档](../materials/pll/originals/jku/fig_095.png) · [页面副本](../pll/assets/originals/jku/fig_095.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 带偏置电流的电荷泵 | 7 | [原始归档](../materials/pll/originals/jku/fig_096.png) · [页面副本](../pll/assets/originals/jku/fig_096.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 参考倍频器 | 5 | [原始归档](../materials/pll/originals/jku/fig_097.png) · [页面副本](../pll/assets/originals/jku/fig_097.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S01 | 带重定时触发器的 Fractional-N PLL | 14 | [原始归档](../materials/pll/originals/jku/fig_098.png) · [页面副本](../pll/assets/originals/jku/fig_098.png) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S09 | LC 谐振腔与负阻 | 8 | [原始归档](../materials/pll/originals/jku-oscillators/fig_061.svg) · [页面副本](../pll/assets/originals/jku-oscillators/fig_061.svg) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator_files/figure-revealjs/fig-neg-r-single-ended-output-1.svg) |
| S09 | NMOS 交叉耦合 LC 振荡器 | 8 | [原始归档](../materials/pll/originals/jku-oscillators/fig_069.svg) · [页面副本](../pll/assets/originals/jku-oscillators/fig_069.svg) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator_files/figure-revealjs/fig-oscillator-lc-nmos-output-1.svg) |
| S09 | PMOS 交叉耦合 LC 振荡器 | 8 | [原始归档](../materials/pll/originals/jku-oscillators/fig_070.svg) · [页面副本](../pll/assets/originals/jku-oscillators/fig_070.svg) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator_files/figure-revealjs/fig-oscillator-lc-pmos-output-1.svg) |
| S09 | 互补交叉耦合 LC 振荡器 | 8 | [原始归档](../materials/pll/originals/jku-oscillators/fig_071.svg) · [页面副本](../pll/assets/originals/jku-oscillators/fig_071.svg) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator_files/figure-revealjs/fig-oscillator-lc-cmos-output-1.svg) |
| S09 | 三级单端环形振荡器 | 8 | [原始归档](../materials/pll/originals/jku-oscillators/fig_060.svg) · [页面副本](../pll/assets/originals/jku-oscillators/fig_060.svg) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator_files/figure-revealjs/fig-ring-oscillator-output-1.svg) |
| S09 | VCO 相位积分器模型 | 8 | [原始归档](../materials/pll/originals/jku-oscillators/fig_073.svg) · [页面副本](../pll/assets/originals/jku-oscillators/fig_073.svg) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator_files/figure-revealjs/fig-oscillator-model-output-1.svg) |
| S09 | 振荡器调谐用开关电容 | 8 | [原始归档](../materials/pll/originals/jku-oscillators/fig_072.svg) · [页面副本](../pll/assets/originals/jku-oscillators/fig_072.svg) | [来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator_files/figure-revealjs/fig-switched-capacitor-output-1.svg) |
| S10 | 65 nm LC-DCO 晶体管级结构 | 8 | [原始归档](../materials/pll/originals/mdpi/fig_003.png) · [页面副本](../pll/assets/originals/mdpi/fig_003.png) | [来源](https://mdpi-res.com/electronics/electronics-10-02741/article_deploy/html/images/electronics-10-02741-g003.png) |
| S10 | Bottom-pinning 开关电容单元 | 8 | [原始归档](../materials/pll/originals/mdpi/fig_004.png) · [页面副本](../pll/assets/originals/mdpi/fig_004.png) | [来源](https://mdpi-res.com/electronics/electronics-10-02741/article_deploy/html/images/electronics-10-02741-g004.png) |
| S10 | Tracking Bank DNL / INL 实测曲线 | 8 | [原始归档](../materials/pll/originals/mdpi/fig_007.png) · [页面副本](../pll/assets/originals/mdpi/fig_007.png) | [来源](https://mdpi-res.com/electronics/electronics-10-02741/article_deploy/html/images/electronics-10-02741-g007.png) |
| S12 | FPGA Vernier DTC 中的可编程延迟线 | 17 | [原始归档](../materials/pll/originals/mdpi-dtc/fig_004.jpg) · [页面副本](../pll/assets/originals/mdpi-dtc/fig_004.jpg) | [来源](https://mdpi-res.com/applsci/applsci-09-02705/article_deploy/html/images/applsci-09-02705-g004-550.jpg) |

## 已下载、待入库的 PDF

| 材料清单编号 | 文件 | 字节数 | 计划归档路径 | 来源 |
| --- | --- | --- | --- | --- |
| S01 | rfic.pdf | 4231537 | `materials/pll/source-pdfs/jku/rfic.pdf` | [原始来源](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.pdf) |
| S02 | mt086.pdf | 417056 | `materials/pll/source-pdfs/adi/mt086.pdf` | [原始来源](https://www.analog.com/media/en/training-seminars/tutorials/MT-086.pdf) |
| S04 | snaa106c.pdf | 6475640 | `materials/pll/source-pdfs/ti/snaa106c.pdf` | [原始来源](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| S05 | adf4351.pdf | 714562 | `materials/pll/source-pdfs/adi/adf4351.pdf` | [原始来源](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf) |
| S06 | snaa336a.pdf | 1652713 | `materials/pll/source-pdfs/ti/snaa336a.pdf` | [原始来源](https://www.ti.com/lit/an/snaa336a/snaa336a.pdf) |
| S06 | lmx2594.pdf | 1991106 | `materials/pll/source-pdfs/ti/lmx2594.pdf` | [原始来源](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |
| S10 | mdpi.pdf | 3757837 | `materials/pll/source-pdfs/papers/mdpi.pdf` | [原始来源](https://doi.org/10.3390/electronics10222741) |
| S11 | an143.pdf | 256054 | `materials/pll/source-pdfs/adi/an143.pdf` | [原始来源](https://www.analog.com/media/en/technical-documentation/application-notes/AN143f.pdf) |
