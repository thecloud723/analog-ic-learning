# 下一项 Work 任务：PLL 原图下载、归档与静态图替换

日期：2026-11-12  
仓库：thecloud723/analog-ic-learning  
分支：main  
本任务承接 pll/FIGURE_REPLACEMENT_AUDIT.md 和 materials/README.md。

## 2026-11-12 执行结果

已读 18 章，更新 14 章。新归档 11 张原图，35 个文件加入页面资源，新增 42 处本地图片引用。逐章新增引用数为 2 章 1 处、3 章 3 处、4 章 3 处、5 章 1 处、6 章 5 处、7 章 3 处、8 章 12 处、9 章 1 处、10 章 1 处、12 章 1 处、14 章 2 处、15 章 5 处、16 章 2 处、17 章 2 处。另有第 1 章原有的两张 JKU SVG。

第 8 章的 3 个联网图片链接已改为正文中的本地原图。其余新增原图放在对应知识点下，可展开对照，原有交互、教学简图和复绘曲线仍可使用。第 17 章新增 FPGA Vernier DTC 的可编程延迟线图，仍缺和本章 ADPLL 分数相位补偿完全匹配的 ASIC DTC 电路及增益校准原图。

已检查新增相对路径与提交中的图片一一对应。Edge、手机和 18 章实际离线打开尚未验证。

### 第一章专项复核（2026-11-12）

- Figure 74、83 的 JKU 原始 SVG 已在 `pll/assets/`，并已被第一章 HTML 引用；此前因图片 CSS 默认 `display:none` 且使用 `loading=lazy`，原图可能无法触发加载，页面一直显示自绘 fallback。
- 已修复：原图现在默认显示、取消 lazy-load，fallback 默认隐藏，仅在原图加载失败时出现。代码已提交；仍需 Edge/手机实际打开验证。
- ADF4351 商业芯片框图仍是课程教学复绘，并非原厂原图。已定位 ADI 官方 Data Sheet Rev.A Figure 1 的图片直链 `https://mds.analog.com/api/public/content/adf4351-fbl.png`（PDF 第 1 页）；尚未下载为本地文件、归档和替换。该图版权/再分发许可需单独核查。

### 下一批待办

本文件下载表沿用本任务的编号，材料清单沿用原始需求编号。后续以资料名和 URL 对照。

- 继续归档本批已下载的 8 份 PDF（合计 19,496,505 B）。文件大小、来源和拟归档路径见 [材料清单](README.md)。
- 补齐 S02 上游源码归档、ADI PLL Fundamentals 网页快照、S11 Staszewski 课件（IEEE 地址本次返回 503），并核对版本与许可。
- 提取 ADF4351 功能框图（PDF 第 1 页）及 Fig. 18（第 11 页）、MT-086 Fig. 3A（第 3 页）、AN143 Fig. 3（第 2 页）、LMX2594 功能框图（第 19 页）、SNAA336A Fig. 1-4（第 4 页）。SNAA106C 锁定曲线图号和页码仍待核对。
- 为第 17 章继续寻找 ASIC ADPLL 用 DTC 原理及增益校准图。已归档的 FPGA DTC Fig. 4 可作数字码控制延迟的实现例。
- 在 Edge 桌面与手机离线验证 18 章。

## 目标

把当前 PLL 教材 18 章中需要引用的原始电路图、系统框图、时序图和实测曲线整理成可离线使用的本地资源。不要只下载资料而不替换页面，也不要把交互仿真图误替换成静态截图。

## 一、先下载并归档原始资料

原始 PDF/网页快照放入 materials/pll/，不要直接放到 pll/assets/。

| 编号 | 资料 | 下载地址 | 目标路径 | 重点 |
|---|---|---|---|---|
| S01 | JKU RFIC 全课程 PDF | https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.pdf | materials/pll/source-pdfs/jku/ | 核对现有 25 张 PLL 裁切图，并提取 Oscillator Figures 60、61、69–73 |
| S02 | JKU RFIC 上游源码 | https://github.com/iic-jku/radio-frequency-integrated-circuits | materials/pll/source-pdfs/jku/source/ 或保留必要源码文件 | 优先取原始 SVG/绘图源码，不要重绘冒充原图 |
| S03 | ADI MT-086 | https://www.analog.com/media/en/training-seminars/tutorials/MT-086.pdf | materials/pll/source-pdfs/adi/ | Figure 3A 等参考/反馈分频结构 |
| S04 | ADI ADF4351 Datasheet | https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf | materials/pll/source-pdfs/adi/ | 第 1、5、6、9 章；提取功能框图及 Figure 18 PFD/ABP，核实实际页码 |
| S05 | ADI PLL Fundamentals | https://www.analog.com/en/resources/analog-dialogue/articles/phase-locked-loop-pll-fundamentals.html | materials/pll/originals/adi/ | 网页快照、作者和图号 |
| S06 | TI SNAA106C | https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf | materials/pll/source-pdfs/ti/ | Loop Filter、Bode、瞬态和 Lock Time；核对第 11 章 Figure 16.2/16.3 |
| S07 | TI SNAA336A | https://www.ti.com/lit/an/snaa336a/snaa336a.pdf | materials/pll/source-pdfs/ti/ | VCO Core、Capcode、VCO calibration、锁定时间 |
| S08 | TI LMX2594 Datasheet | https://www.ti.com/product/LMX2594 | materials/pll/source-pdfs/ti/ | 获取最新版数据手册，提取 Fractional-N 功能框图 |
| S09 | ADI AN143 | https://www.analog.com/media/en/technical-documentation/application-notes/AN143f.pdf | materials/pll/source-pdfs/adi/ | Figure 3 Reference Spurs；核对第 13 章复绘图的测试条件 |
| S10 | MDPI 65 nm LC-DCO 论文 | https://www.mdpi.com/2079-9292/10/22/2741 | materials/pll/source-pdfs/papers/ | Figure 3、4、7；保存论文 PDF 和许可信息 |
| S11 | Staszewski ADPLL slides | https://ewh.ieee.org/soc/cas/dallas/documents/Sem-022107-stas_adpll.pdf | materials/pll/source-pdfs/papers/ | ADPLL、TDC、数字环路和 DCO；下载状态及许可待核实 |

下载后记录文件大小、来源 URL、下载日期、版本/修订号和授权信息。下载失败时寻找官方替代地址，不要用不明来源镜像替代。

## 二、需要下载/提取的具体图片

### A. MDPI 论文：优先完成

论文：Biereigel et al., “Radiation-Tolerant All-Digital PLL/CDR with Varactorless LC DCO in 65 nm CMOS”, Electronics 2021, 10(22), 2741，DOI 10.3390/electronics10222741。

论文为 CC BY 4.0：https://creativecommons.org/licenses/by/4.0/

当前第 8 章已有三个外部 PNG 超链接，但未本地化：

- Figure 3：LC-DCO 晶体管级结构  
  https://mdpi-res.com/electronics/electronics-10-02741/article_deploy/html/images/electronics-10-02741-g003.png
- Figure 4：Bottom-pinning 开关电容单元  
  https://mdpi-res.com/electronics/electronics-10-02741/article_deploy/html/images/electronics-10-02741-g004.png
- Figure 7：Tracking Bank DNL/INL 实测图  
  https://mdpi-res.com/electronics/electronics-10-02741/article_deploy/html/images/electronics-10-02741-g007.png

下载到 materials/pll/originals/mdpi/。若页面实际使用这些图片，再复制到 pll/assets/originals/mdpi/，将第 8 章外链改为本地相对路径并展示原图。图片附近注明作者、论文、Figure 编号、DOI、CC BY 4.0，以及是否裁切/缩放。

### B. JKU Oscillator 原图

从 JKU Oscillators 章节提取：

- Figure 60：Three-stage single-ended Ring Oscillator
- Figure 61：LC parallel tank with negative resistance
- Figure 69–71：NMOS/PMOS/CMOS cross-coupled differential LC oscillator
- Figure 72：LC oscillator frequency tuning / switched capacitor tuning（核对实际图注）
- Figure 73：VCO as an integrator model

课程页面：https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html

优先从上游仓库取原始 SVG 或图形源码；必要时从课程 PDF 高分辨率裁切。原始文件放 materials/pll/originals/jku-oscillators/。只有页面真正引用的图才复制到 pll/assets/originals/jku-oscillators/。

### C. 已有 JKU PLL Figure 74–98

25 张 PNG 已在 materials/pll/originals/jku/，不要重复下载。根据 FIGURE_REPLACEMENT_AUDIT.md，把真正替换静态自绘图的文件复制到 pll/assets/originals/jku/，并更新章节 HTML。

优先考虑：
- 第 2 章：Fig.75、78–81
- 第 3 章：Fig.78、83
- 第 4 章：Fig.74、83、85、95、98
- 第 5 章：Fig.97
- 第 6 章：Fig.77–81
- 第 7 章：Fig.82、83、96
- 第 8 章：Fig.87、88
- 第 9 章：Fig.83
- 第 10 章：Fig.76
- 第 12 章：Fig.84
- 第 13/15 章：Fig.89–94
- 第 14 章：Fig.95、98
- 第 16/17 章：Fig.85–88

注意：原图和教学页面结构不完全匹配时，不要强行替换。可以保留教学复绘并标明“依据某图改绘”。

### D. ADI / TI 图

- ADF4351：提取数据手册完整功能框图和 Figure 18 PFD/ABP 结构，替换第 1、5、6、9 章对应的自绘产品图。
- MT-086 Figure 3A：核对第 5 章参考分频、反馈分频和输出分频链。
- TI SNAA106C：核对第 7 章环路滤波器拓扑，以及第 11 章 Bode/瞬态/Lock Time 案例。
- TI SNAA336A：核对第 8 章 7 个 VCO Core、256 个 Capcode、偏置优化图；第 17 章 VCO calibration 流程。
- ADI AN143 Figure 3：核对第 13 章参考杂散频谱。若版权不适合打包，保留原始链接和图号，当前复绘图明确标注为“根据 AN143 Figure 3 的测试条件重绘”，不要称作原图。

ADI/TI 图像仅用于个人学习归档时也必须保留完整版权/来源信息。不要移除水印、署名或版权说明；不要在文档中宣称厂商图片已获得开放再分发许可。

### E. DTC 专项图：必须单独搜索

第 17 章目前缺少真正对应 DTC 的原理图。搜索：
- Digital-to-Time Converter (DTC) circuit
- Digitally controlled delay line
- Phase interpolator / delay interpolator
- ADPLL DTC calibration and gain
- DTC code-to-delay transfer curve

要求找到真正说明“数字码控制延迟”的电路/架构图，不得用 TDC delay-line 图替代。优先论文作者公开课件、开放许可教材或厂商公开资料；记录 DOI、图号、页码和许可。若无合适来源，明确报告缺失，不要随意下载不匹配图片。

## 三、替换 HTML 的要求

1. 对每个静态自绘框图/电路图，匹配一张真实原图；若原图与当前教学抽象不一致，保留自绘并标记为“教学改绘”，不要误导。
2. 页面实际使用的图片必须放在 pll/assets/ 或子目录，HTML 使用相对路径；不能依赖外网/CDN。
3. 原始 PDF、未使用的候选图片和网页快照留在 materials/pll/。
4. 图片图注注明作者/机构、来源、原图号/页码、许可证、是否裁切/缩放/改绘。
5. 不要替换 MathJax 公式 SVG。
6. 不要将动态曲线、滑块实验、MASH 序列、TDC/DTC 仿真截图替换为静态原图；这些必须继续实时生成。
7. 保留现有点击高亮、图中信号交互和章节导航。若原图本身无法交互，可将交互说明/控件放在原图旁，不要破坏教学功能。

## 四、清单与验收

更新以下文件：

- pll/FIGURE_REPLACEMENT_AUDIT.md
- pll/FIGURE_SOURCE_CANDIDATES.md
- pll/assets/README.md
- materials/pll/FIGURE_MANIFEST.csv
- materials/pll/SOURCES.md
- materials/README.md

每张图片状态必须区分：
- archived_candidate：已下载归档，但 HTML 尚未引用
- active_in_html：已放入 pll/assets 并被页面引用
- custom_redraw：课程自绘/改绘，已标注来源
- interactive_generated：由代码实时生成，保留
- missing_source：尚未找到或下载
- license_review：来源/授权尚未核实

验收时逐项报告：
- 下载资料数量及文件路径
- 下载图片数量及图号
- 实际复制到 pll/assets 的图片数量
- 已替换的 HTML 图片数量（逐章列出）
- 仍保留的自绘图及原因
- 未找到原图的项目，特别是 DTC
- 授权不确定的项目
- 18 章离线打开测试结果
- Edge 桌面端和手机显示结果

不要把“网页有链接”算作“已下载”，不要把“下载到 materials”算作“页面已使用”，不要把“页面有自绘图”算作“原图已替换”。
