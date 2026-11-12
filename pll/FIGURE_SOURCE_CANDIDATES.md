# PLL 原图来源与授权清单

核对日期：2026-11-12  
用途：PLL 交互教材图片替换和个人学习资料归档。

## 1. 授权口径

- JKU RFIC 课程仓库声明 Apache-2.0。可优先使用其原图和源码，但必须随图保留 LICENSE、作者、来源、图号及修改说明。
- MDPI 论文《Radiation-Tolerant All-Digital PLL/CDR with Varactorless LC DCO in 65 nm CMOS》为 CC BY 4.0 开放获取。使用图像时按 CC BY 4.0 标注作者、论文、DOI、许可证及修改情况。
- Analog Devices、Texas Instruments 数据手册/应用笔记是厂商版权资料。页面可访问不代表图片可自由再分发。个人学习归档时保留完整来源和版权信息；未来公开发布时逐项复核许可，必要时改为链接或重新绘制。
- IEEE/作者课件及论文逐份核对出版方许可。作者公开下载不等于插图可自由再分发。
- 仓库为 Private 不会自动改变第三方版权状态。

## 2. 已归档、已使用和待下载来源

| 来源 | 主要图片 | 当前状态 | 授权/使用注意 |
|---|---|---|---|
| JKU RFIC PLL Chapter | Figures 74–98 | 25 张 PNG 裁切图已放入 materials/pll/originals/jku/；Figure 74、83 的 SVG 副本已放入 pll/assets/ 并由第 1 章实际加载 | Apache-2.0；保留 LICENSE/CITATION.cff |
| JKU RFIC Oscillators Chapter | Figures 60、61、69–73 等 | 尚未归档；下一批需下载 | Apache-2.0；优先获取上游 SVG/绘图源码 |
| Biereigel et al., Electronics 2021, 10(22), 2741 | Figures 3、4、7 | 第 8 章有外部 PNG 链接，但没有本地文件；需要下载并本地化 | CC BY 4.0；DOI: 10.3390/electronics10222741 |
| ADI MT-086 | PLL 结构、分频、PFD/CP | 有下载记录，PDF 尚未入库 | 原厂版权资料；保存出处和页码 |
| ADI ADF4351 Datasheet | 产品功能框图、PFD/ABP、频率规划 | 下载/入库待 Work 核对 | 原厂版权资料；个人学习归档，公开发布前复核 |
| ADI PLL Fundamentals | PLL 基本结构、模型、锁定和噪声 | 有网页快照下载记录，尚未入库 | 原厂文章；保留作者、文章 URL |
| ADI AN143 | Figure 3 Reference Spurs | 第 13 章有复绘图；原始 PDF 尚未入库 | 原厂应用笔记；原图用于核对，不得误标为课程实测 |
| TI SNAA106C | Loop Filter、稳定性、瞬态和 Lock Time 案例 | 有下载记录，PDF 尚未入库 | TI 原厂资料；记录图号、页码和测试条件 |
| TI SNAA336A | LMX2594 VCO Core、Capcode、Calibration | 有下载记录，PDF 尚未入库 | TI 原厂资料；用于第 8、17 章 |
| TI LMX2594 Datasheet | Fractional-N PLL 功能框图、寄存器和校准 | 数据手册下载状态待核实 | TI 原厂资料 |
| Staszewski ADPLL slides | ADPLL、TDC、数字环路、DCO | 下载及入库状态待核实 | IEEE/作者课件；许可逐项核对 |
| DTC 专项资料 | DTC 延迟链/相位插值、数字码到延迟关系 | 尚未找到可直接使用的开放原图 | 下一项 Work 任务需单独搜索，不能拿 TDC 图替代 |

## 3. 具体来源 URL

### 开放许可优先

- JKU PLL：https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html
- JKU Oscillators：https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html
- JKU 上游仓库：https://github.com/iic-jku/radio-frequency-integrated-circuits
- JKU 全课程 PDF：https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.pdf
- MDPI 论文：https://www.mdpi.com/2079-9292/10/22/2741
- MDPI DOI：https://doi.org/10.3390/electronics10222741
- MDPI Figure 3 PNG：https://mdpi-res.com/electronics/electronics-10-02741/article_deploy/html/images/electronics-10-02741-g003.png
- MDPI Figure 4 PNG：https://mdpi-res.com/electronics/electronics-10-02741/article_deploy/html/images/electronics-10-02741-g004.png
- MDPI Figure 7 PNG：https://mdpi-res.com/electronics/electronics-10-02741/article_deploy/html/images/electronics-10-02741-g007.png
- CC BY 4.0：https://creativecommons.org/licenses/by/4.0/

### 厂商资料（下载后保留版权/来源信息）

- ADI MT-086：https://www.analog.com/media/en/training-seminars/tutorials/MT-086.pdf
- ADI ADF4351 Datasheet：https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf
- ADI PLL Fundamentals：https://www.analog.com/en/resources/analog-dialogue/articles/phase-locked-loop-pll-fundamentals.html
- ADI AN143 PDF：https://www.analog.com/media/en/technical-documentation/application-notes/AN143f.pdf
- TI SNAA106C：https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf
- TI SNAA336A：https://www.ti.com/lit/an/snaa336a/snaa336a.pdf
- TI LMX2594 产品页（用于找到最新版数据手册）：https://www.ti.com/product/LMX2594
- Staszewski ADPLL slides：https://ewh.ieee.org/soc/cas/dallas/documents/Sem-022107-stas_adpll.pdf

## 4. 按章节匹配

| 章节 | 优先图源 | 目标图片 |
|---|---|---|
| 01 | JKU Fig.74/83；ADF4351 Datasheet | 基本 PLL、CP-PLL、商业器件功能框图 |
| 02 | JKU Fig.75、78–81 | XOR PD、相位差与 PFD 时序 |
| 03 | JKU Fig.78、83 | PFD 时序和完整 CP-PLL |
| 04 | JKU Fig.74、83、85、95、98 | PD-PLL、CP-PLL、ADPLL、Fractional-N 架构 |
| 05 | JKU Fig.97；ADI MT-086 Figure 3A；ADF4351 Datasheet | 参考倍频、R/N 分频与输出链 |
| 06 | JKU Fig.77–81；ADF4351 Datasheet Figure 18 | 双 DFF PFD、UP/DOWN、ABP |
| 07 | JKU Fig.82、83、96；TI SNAA106C | Charge Pump、RC Loop Filter |
| 08 | JKU Oscillator Fig.60、61、69–73；MDPI Fig.3、4、7；TI SNAA336A | Ring/LC oscillator、DCO bank、开关电容单元、DNL/INL |
| 09 | JKU Fig.83；ADF4351 Datasheet | CP-PLL、真实芯片辅助控制 |
| 10 | JKU Fig.76、83 | 相位域小信号模型、CP-PLL |
| 11 | TI SNAA106C | Bode、瞬态响应、Lock Time |
| 12 | JKU Fig.84；ADI PLL Fundamentals | 相噪传递路径与输出相噪 |
| 13 | ADI AN143 Figure 3；JKU Fig.92–94 | Reference Spur 频谱、DSM/MASH |
| 14 | JKU Fig.95、98；LMX2594 Datasheet | Integer-N/Fractional-N 结构 |
| 15 | JKU Fig.89–94 | 一阶/三阶 DSM、MASH、Dither |
| 16 | JKU Fig.85–88；Staszewski | ADPLL、TDC、DCO |
| 17 | JKU Fig.86–88；TI SNAA336A；DTC 专项资料 | TDC、DCO 校准、DTC |
| 18 | JKU Fig.74、83、85 | 系统架构参考；课程总览图可保留教学自绘 |

## 5. 下载与入库规则

- 原始 PDF、网页快照、未用于页面的候选图放在 materials/pll/。
- HTML 实际引用的图片必须放在 pll/assets/ 或其子目录，使用相对路径。
- JKU 图优先直接获取 SVG 或源码；PDF 截图作为无法提取矢量图时的备选。
- MDPI CC BY 4.0 图片保留作者、论文标题、期刊、年份、DOI、许可证和修改说明。
- ADI/TI 图片记录图号、页码、版权说明；未确认许可前不要将其标记为可公开分发。
- 每次复制到 pll/assets/ 后更新 FIGURE_MANIFEST.csv、pll/assets/README.md 和对应章节图注。
- 交互图保留动态计算；不以原图截图替代。
