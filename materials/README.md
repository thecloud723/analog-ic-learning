# PLL 素材下载清单

核对日期：2026-11-12。S 编号沿用原始资料需求，P 编号沿用原始插图需求。详细图片使用状态见 [PLL 全部图片盘点](../pll/FIGURE_REPLACEMENT_AUDIT.md)，下一项 Work 下载任务见 [TASK_PLL_IMAGE_REFRESH.md](TASK_PLL_IMAGE_REFRESH.md)。

## 按原始下载需求核对

| 需求 | 资料 | 下载与入库状态 | 仓库路径或计划归档位置 | 来源 |
| --- | --- | --- | --- | --- |
| S01 | JKU RFIC 教材 PLL 章 | 25 张 PDF 裁切 PNG 已入库；完整 PDF 尚未入库 | PNG 在 pll/originals/jku/；PDF 计划放入 pll/source-pdfs/jku/ | [JKU PLL 章节](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| S02 | ADI MT-086 | 有 PDF 下载记录，待入库 | 计划放入 pll/source-pdfs/adi/ | [ADI MT-086](https://www.analog.com/media/en/training-seminars/tutorials/MT-086.pdf) |
| S03 | ADI PLL Fundamentals | 有网页快照下载记录，待入库 | 计划放入 pll/originals/adi/ | [Analog Dialogue](https://www.analog.com/en/resources/analog-dialogue/articles/phase-locked-loop-pll-fundamentals.html) |
| S04 | TI PLL Performance, Simulation, and Design | 有 SNAA106C PDF 下载记录，待入库 | 计划放入 pll/source-pdfs/ti/ | [TI SNAA106C](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| S05 | ADI ADF4351 数据手册 | 有 PDF 下载记录，待入库 | 计划放入 pll/source-pdfs/adi/ | [ADI ADF4351](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf) |
| S06 | TI LMX2594 数据手册及校准资料 | 有 SNAA336A 下载记录，待入库；数据手册下载待核实 | 计划放入 pll/source-pdfs/ti/ | [TI SNAA336A](https://www.ti.com/lit/an/snaa336a/snaa336a.pdf) · [LMX2594 产品页](https://www.ti.com/product/LMX2594) |
| S07 | JKU RFIC GitHub 源码 | 已入库 2 张 SVG 页面资源副本、LICENSE、CITATION；完整源码归档待核实 | [页面资源目录](../pll/assets/) · [原始归档](pll/originals/jku/) | [JKU 上游仓库](https://github.com/iic-jku/radio-frequency-integrated-circuits) |
| S08 | Staszewski ADPLL 课件 | 下载及入库待核实 | 计划放入 pll/source-pdfs/papers/ | [原始下载地址](https://ewh.ieee.org/soc/cas/dallas/documents/Sem-022107-stas_adpll.pdf) |
| S09 | JKU RFIC Oscillators 章节 | 尚未归档；需下载 Figures 60、61、69–73 | 计划放入 pll/originals/jku-oscillators/ | [JKU Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| S10 | MDPI 65 nm LC-DCO 论文 | 第 8 章已有 Figure 3、4、7 外部链接；本地图片待下载 | 原始图放入 pll/originals/mdpi/；页面副本放入 ../pll/assets/originals/mdpi/ | [论文 DOI](https://doi.org/10.3390/electronics10222741) |
| S11 | ADI AN143 Reference Spurs | 第 13 章有 Figure 3 数据复绘；原始 PDF 待入库 | 计划放入 pll/source-pdfs/adi/ | [ADI AN143 PDF](https://www.analog.com/media/en/technical-documentation/application-notes/AN143f.pdf) |
| S12 | DTC 专项资料 | 尚未找到可直接匹配的开放原图 | 待 Work 搜索后放入 pll/originals/ 或 source-pdfs/ | 需检索 DTC delay line / digital-to-time converter / phase interpolator |

## 已实际被章节 HTML 使用的图片

目前确认的页面运行时原图只有以下两张，均在 pll/assets/，第 1 章通过相对路径加载：

- JKU Figure 74：pll/assets/jku-fig-pll-block-diagram.svg
- JKU Figure 83：pll/assets/jku-fig-pll-pfd-cp.svg

materials/pll/originals/jku/ 下的 25 张 PNG 是已下载候选图，不代表已经被 HTML 使用。第 8 章 MDPI Figure 3、4、7 目前只是来源超链接，并非本地显示图片。

## 图片使用和授权原则

- 页面实际引用的图片必须放在 pll/assets/，HTML 只使用相对路径。
- 未使用的原始 PDF/图片和候选截图放在 materials/pll/。
- 每张图片记录来源、作者/机构、图号/页码、许可证、裁切/转换方式、使用章节和页面路径。
- JKU 课程资料声明 Apache-2.0；MDPI 论文采用 CC BY 4.0；ADI/TI 及其他论文/课件资料需保留版权信息，公开发布前单独复核授权。
- 动态交互图保留实时计算，不用静态截图替换。
