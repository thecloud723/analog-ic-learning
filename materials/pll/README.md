# PLL 素材归档

本目录保存 PLL 教程的原始材料、来源记录和授权信息；页面运行时实际引用的图片副本统一放在 pll/assets/。

## 目录

- originals/jku/：JKU PLL Figures 74–98 的原始裁切 PNG、LICENSE、CITATION。
- originals/jku-oscillators/：本轮新增的 JKU Oscillators 7 张上游 SVG。
- originals/mdpi/：65 nm LC-DCO 论文 Figures 3、4、7。
- originals/mdpi-dtc/：FPGA Vernier DTC 论文 Figure 4。
- source-pdfs/：计划归档下载的 PDF；本轮 8 份 PDF 已下载到 Work 暂存区，尚未提交到仓库。
- FIGURE_MANIFEST.csv：逐图来源、原始路径、页面副本路径、章节映射和状态。
- SOURCES.md：来源索引与授权说明。

## 当前已归档的原始图片

| 来源 | 数量 | 当前状态 | 原始归档路径 |
|---|---:|---|---|
| JKU PLL Figures 74–98 | 25 PNG | 24 张已在章节 HTML 使用；Figure 89 是未引用候选 | originals/jku/ |
| JKU Oscillators Figures 60、61、69–73 | 7 SVG | 已在第 8 章使用 | originals/jku-oscillators/ |
| MDPI 65 nm LC-DCO Figures 3、4、7 | 3 PNG | 已在第 8 章使用 | originals/mdpi/ |
| MDPI FPGA Vernier DTC Figure 4 | 1 JPEG | 已在第 17 章作为实现例使用 | originals/mdpi-dtc/ |

页面资源副本位于 pll/assets/，共 37 个文件：24 张 JKU PLL PNG、7 张 JKU Oscillator SVG、3 张 MDPI PNG、1 张 FPGA DTC JPEG，以及第 1 章原有的 2 张 JKU SVG。共 42 处引用分布在 14 个章节。

## 已下载、待入库的 8 份 PDF

本轮已下载 8 份 PDF，合计 19,496,505 bytes，尚未提交到 GitHub 仓库：

| 文件 | 计划归档路径 | 用途 |
|---|---|---|
| rfic.pdf | source-pdfs/jku/rfic.pdf | JKU 全课程原始材料 |
| mt086.pdf | source-pdfs/adi/mt086.pdf | 参考/反馈分频链，Figure 3A |
| snaa106c.pdf | source-pdfs/ti/snaa106c.pdf | 环路滤波器、稳定性、瞬态和锁定时间 |
| adf4351.pdf | source-pdfs/adi/adf4351.pdf | 产品功能框图、PFD/ABP Figure 18 |
| snaa336a.pdf | source-pdfs/ti/snaa336a.pdf | LMX2594 VCO Core、Capcode 和校准 |
| lmx2594.pdf | source-pdfs/ti/lmx2594.pdf | Fractional-N PLL 功能框图及寄存器 |
| mdpi.pdf | source-pdfs/papers/mdpi.pdf | 65 nm LC-DCO 论文原文 |
| an143.pdf | source-pdfs/adi/an143.pdf | Reference Spur Figure 3 |

## 仍需补充的资料和图片

- ADI PLL Fundamentals：保存离线网页快照并记录作者、图号和访问日期。
- JKU 上游源码：完整源码归档状态待核实；已使用图片的 LICENSE/CITATION 需保留。
- Staszewski ADPLL 课件：当前 IEEE 下载地址返回 503，需寻找作者或机构的可靠替代来源。
- ASIC ADPLL DTC：仍缺与分数相位补偿路径对应的 ASIC DTC 电路和增益校准原图。已归档的 FPGA Vernier DTC Figure 4 只能作为可编程延迟线实现例，不能替代 ASIC 图。
- 厂商原图：ADF4351 功能框图和 Figure 18、MT-086 Figure 3A、AN143 Figure 3、LMX2594 功能框图、SNAA336A Figure 1-4 等尚待从 PDF 提取。
- SNAA106C 的锁定时间曲线图号和页码仍待核对。

具体执行步骤见 materials/TASK_PLL_IMAGE_REFRESH.md；逐图状态以 FIGURE_MANIFEST.csv 为准。

## 授权说明

- JKU RFIC 课程仓库声明 Apache-2.0，随图保留 LICENSE/CITATION。
- MDPI 两篇论文图像按 CC BY 4.0 标注作者、论文、DOI、图号和修改情况。
- ADI/TI 数据手册、应用笔记及 IEEE/作者课件需要逐项核对版权和许可。下载可访问不等于获得公开再分发许可。
- 当前仓库为个人学习用途；未来公开发布前需复核每项素材授权。
