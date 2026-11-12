# PLL 原图来源与授权清单

核对日期：2026-11-12  
用途：PLL 交互教材的原图归档、页面引用和后续授权复核。

## 1. 授权口径

- JKU RFIC 课程仓库声明 Apache-2.0。使用其原图时保留 LICENSE、作者、来源、原图号和修改说明。
- MDPI 开放获取论文图像按 CC BY 4.0 标注作者、论文标题、期刊、年份、DOI、图号和修改情况。
- Analog Devices、Texas Instruments 数据手册/应用笔记可下载不等于插图可自由再分发。个人学习归档保留来源和版权信息；公开发布前逐项复核许可，必要时改为链接或独立重绘。
- IEEE/作者课件逐份核对出版方许可；作者公开下载不等于插图可自由再分发。
- 仓库为 Private 不会自动改变第三方版权状态。

## 2. 已归档并实际用于页面的来源

| 来源 | 已归档原图 | 使用章节 | 授权/说明 |
|---|---|---|---|
| JKU RFIC PLL Chapter | Figures 74–88、90–98，共 24 张页面使用 PNG；Figure 89 仍是候选图 | 2、3、4、5、6、7、8、9、10、12、14、15、16、17 | Apache-2.0；原始裁切图在 materials/pll/originals/jku/，页面副本在 pll/assets/originals/jku/ |
| JKU RFIC PLL Chapter | Figure 74、83 两张 SVG | 1 | Apache-2.0；第 1 章沿用原有页面资源 |
| JKU RFIC Oscillators Chapter | Figures 60、61、69–73，共 7 张 SVG | 8 | Apache-2.0；原图和页面副本分别归档 |
| Biereigel et al., Electronics 2021, 10(22), 2741 | Figures 3、4、7，共 3 张 PNG | 8 | CC BY 4.0；DOI: 10.3390/electronics10222741 |
| Yan, Hu, Wu, Applied Sciences 2019, 9(13), 2705 | Figure 4，FPGA Vernier DTC 可编程延迟线 | 17 | CC BY 4.0；DOI: 10.3390/app9132705。只作为 FPGA 延迟线实现例，不代表 ASIC ADPLL DTC |

当前 pll/assets/ 有 37 个实际引用的图片文件，14 个章节新增 42 处引用。逐图路径和章节映射见 [材料清单](../materials/README.md) 与 [FIGURE_MANIFEST.csv](../materials/pll/FIGURE_MANIFEST.csv)。

## 3. 已下载但待入库的 8 份 PDF

以下文件已下载到 Work 暂存区，但还没有提交到仓库：

| 资料 | 计划归档路径 | 后续提取目标 |
|---|---|---|
| JKU RFIC 全课程 rfic.pdf | materials/pll/source-pdfs/jku/ | 完整课程归档、核对图号和页码 |
| ADI MT-086 | materials/pll/source-pdfs/adi/ | Figure 3A：参考/反馈分频链 |
| TI SNAA106C | materials/pll/source-pdfs/ti/ | Loop Filter、Bode、瞬态和 Lock Time；锁定曲线图号待核对 |
| ADI ADF4351 Datasheet | materials/pll/source-pdfs/adi/ | PDF 第 1 页功能框图、Figure 18（第 11 页）PFD/ABP |
| TI SNAA336A | materials/pll/source-pdfs/ti/ | Figure 1-4（第 4 页）VCO Core/Capcode/校准 |
| TI LMX2594 Datasheet | materials/pll/source-pdfs/ti/ | 功能框图（当前记录为第 19 页，需复核 PDF 版本） |
| MDPI 65 nm LC-DCO paper | materials/pll/source-pdfs/papers/ | 与已归档 Figure 3、4、7 对应的论文原文 |
| ADI AN143 | materials/pll/source-pdfs/adi/ | Figure 3（第 2 页）Reference Spurs |

下载文件大小、URL 和待入库状态见 [materials/README.md](../README.md)。

## 4. 仍需下载、提取或核实的来源

| 来源 | 当前状态 | 后续动作 |
|---|---|---|
| ADI PLL Fundamentals | 已记录网页来源；离线快照尚待保存 | 保存网页正文/图像、作者、图号和访问日期 |
| JKU RFIC 上游源码 | 已归档并使用部分原图；完整源码归档状态待核实 | 保存必要绘图源码及 LICENSE/CITATION |
| Staszewski ADPLL slides | IEEE 原下载地址本次返回 503 | 寻找作者/机构可靠镜像或替代课件，核对许可 |
| ASIC ADPLL DTC | 缺少与本课程分数相位补偿路径匹配的电路和增益校准图 | 搜索 ASIC DTC architecture、DTC gain calibration、ADPLL phase compensation；记录 DOI、图号和许可 |
| ADI/TI 厂商资料 | 8 份 PDF 已下载但待入库和提取 | 依上表提取指定图号，保留原厂版权信息 |

## 5. 按章节匹配与当前缺口

| 章节 | 已使用原图 | 仍需补充的原图/资料 |
|---|---|---|
| 01 | JKU Fig.74、83 SVG（沿用资源） | ADF4351 功能框图，若需展示真实器件实现则从数据手册提取 |
| 02 | JKU Fig.75 | Fig.78–81 时序图已在第 3、6 章使用；可视教学需要再增加 |
| 03 | JKU Fig.78、79、83 | 暂无硬性缺图 |
| 04 | JKU Fig.74、83、85 | 真实商业 PLL 框图可补 ADF4351 |
| 05 | JKU Fig.97 | MT-086 Figure 3A、ADF4351 频率规划链待提取 |
| 06 | JKU Fig.77–81 | ADF4351 Figure 18 的 PFD/ABP 电路待提取 |
| 07 | JKU Fig.82、83、96 | TI SNAA106C 的完整 Loop Filter 示例待提取 |
| 08 | JKU Fig.87、88；JKU Oscillator Fig.60、61、69–73；MDPI Fig.3、4、7 | TI SNAA336A 的 VCO Core/Capcode 及 LMX2594 实际校准资料待提取 |
| 09 | JKU Fig.83 | ADF4351 产品级功能框图可补充 |
| 10 | JKU Fig.76 | 如需更多 Type-I/II 设计例，可从 TI 资料提取 |
| 11 | 当前以课程自绘 Bode/瞬态和仿真为主 | SNAA106C 锁定时间曲线图号/页码待核对 |
| 12 | JKU Fig.84 | ADI PLL Fundamentals 的相噪资料可补充 |
| 13 | 当前保留课程复绘图 | ADI AN143 Figure 3 待提取并核对测试条件 |
| 14 | JKU Fig.95、98 | LMX2594 Fractional-N 功能框图待提取 |
| 15 | JKU Fig.90–94 | Fig.89 为连续时间 DSM 图，当前不匹配课程数字 MASH 内容，暂不引用 |
| 16 | JKU Fig.85、86 | Staszewski ADPLL 课件待获取 |
| 17 | JKU Fig.86；FPGA DTC Fig.4 | **ASIC ADPLL DTC 电路及增益校准图仍缺** |
| 18 | 保留课程自绘系统总览 | 无需强行套用外部原图 |

## 6. 图片维护规则

- 原始 PDF、网页快照和未使用候选图放在 materials/pll/。
- 页面实际引用图片放在 pll/assets/，HTML 使用相对路径。
- 每张图在 FIGURE_MANIFEST.csv 中记录来源、作者/机构、原图号/页码、许可证、处理方式、引用章节、页面副本路径和状态。
- JKU Figure 89 当前未引用，状态应为 archived_candidate；实际被页面引用的图统一标记 active_in_html。
- MDPI CC BY 4.0 图片保留完整署名、DOI、图号和修改说明。
- 厂商资料授权未核实前，不标记为可公开再分发。
- 动态图、滑块实验、模型曲线和实时生成波形继续保留，不用静态截图替换。
