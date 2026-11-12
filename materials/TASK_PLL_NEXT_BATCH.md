# 下一批 Work 任务：PLL PDF 入库、厂商原图提取与 ASIC DTC 调研

日期：2026-11-12  
仓库：thecloud723/analog-ic-learning  
分支：main  
前置结果：首轮原图归档和 14 章页面引用已完成，见 pll/FIGURE_REPLACEMENT_AUDIT.md。

## 目标

完成已经下载但尚未提交的 8 份 PDF 入库；从 ADI/TI 文档中提取当前教材真正需要的原图；继续寻找与 ADPLL 分数相位补偿路径匹配的 ASIC DTC 电路和增益校准图。不要重复下载已归档的 JKU/MDPI 图片，也不要用 TDC 图冒充 DTC 图。

## 一、将 8 份 PDF 入库

这些 PDF 已下载到 Work 暂存区，但尚未进入 GitHub 仓库。若暂存文件仍可用，直接核对后入库；若文件不可用，从下方官方来源重新下载。

| 文件 | 官方来源 | 仓库目标路径 | 下载时记录 |
|---|---|---|---|
| rfic.pdf | https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.pdf | materials/pll/source-pdfs/jku/rfic.pdf | 4,231,537 bytes |
| mt086.pdf | https://www.analog.com/media/en/training-seminars/tutorials/MT-086.pdf | materials/pll/source-pdfs/adi/mt086.pdf | 417,056 bytes |
| snaa106c.pdf | https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf | materials/pll/source-pdfs/ti/snaa106c.pdf | 6,475,640 bytes |
| adf4351.pdf | https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf | materials/pll/source-pdfs/adi/adf4351.pdf | 714,562 bytes |
| snaa336a.pdf | https://www.ti.com/lit/an/snaa336a/snaa336a.pdf | materials/pll/source-pdfs/ti/snaa336a.pdf | 1,652,713 bytes |
| lmx2594.pdf | https://www.ti.com/lit/ds/symlink/lmx2594.pdf | materials/pll/source-pdfs/ti/lmx2594.pdf | 1,991,106 bytes |
| mdpi.pdf | https://doi.org/10.3390/electronics10222741 | materials/pll/source-pdfs/papers/mdpi.pdf | 3,757,837 bytes |
| an143.pdf | https://www.analog.com/media/en/technical-documentation/application-notes/AN143f.pdf | materials/pll/source-pdfs/adi/an143.pdf | 256,054 bytes |

原记录合计 19,496,505 bytes。实际入库时重新计算文件大小和 SHA-256；若来源版本或大小不同，记录实际值和下载日期，不要为了匹配旧记录而修改文件。

PDF 只放 materials/pll/source-pdfs/，不要放进 pll/assets/。保留来源 URL、文档修订版、下载日期和版权声明。厂商 PDF 的下载和私有学习归档不代表获得公开再分发许可。

## 二、提取指定原图并评估是否加入页面

先在 PDF 中核对图号、页码、版本和图注。图像应清晰可读，保留完整图号/标注，不要擅自裁掉信号名或版权信息。

| 来源 | 目标图 | PDF 页码（待复核） | 对应章节 | 目标 |
|---|---|---:|---|---|
| ADI ADF4351 | 产品完整功能框图 | 1 | 1、5、9 | 真实商业 PLL 架构参考 |
| ADI ADF4351 | Figure 18：PFD/ABP 结构 | 11 | 6 | PFD 复位延迟/Anti-Backlash Pulse |
| ADI MT-086 | Figure 3A：PLL 参考与反馈分频链 | 3 | 5 | 频率规划与分频路径 |
| ADI AN143 | Figure 3：Reference Spurs 频谱 | 2 | 13 | 核对课程已有复绘图及测试条件 |
| TI LMX2594 | 功能框图 | 约 19，需核对版本 | 14 | 实际 Fractional-N PLL 架构 |
| TI SNAA336A | Figure 1-4：VCO Core/Capcode/校准相关图 | 4 | 8、17 | VCO Core、Capcode 和校准流程 |
| TI SNAA106C | 锁定时间/瞬态响应曲线 | 图号页码未知 | 11 | 核对课程理论/实测 Lock Time 复绘 |

每张图先判断是否比现有课程自绘图更有教学价值。若加入页面：
1. 原始 PDF 留在 materials/pll/source-pdfs/。
2. 页面使用的图片副本放在 pll/assets/originals/adi/ 或 pll/assets/originals/ti/。
3. HTML 使用相对路径，不能引用在线 PDF 页面或 CDN。
4. 图注标明厂商、文档编号、图号、PDF 页码和版权信息。
5. Manifest 状态设为 active_in_html；尚未使用的提取图保持 archived_candidate 或 license_review。
6. 不要把厂商框图硬塞进不匹配的知识点；不匹配时只归档并记录原因。

## 三、继续寻找 ASIC ADPLL DTC 原图（重点）

现有第 17 章新增的 MDPI Figure 4 是 FPGA Vernier DTC 的可编程延迟线实现例。它只能解释“数字码控制延迟”的一种实现，不能代表 ASIC ADPLL 中 DTC 的电路结构、DTC gain calibration 或相位补偿路径。

继续检索以下主题：
- ASIC ADPLL digital-to-time converter architecture
- DTC gain calibration in fractional-N ADPLL
- DTC code-to-delay transfer curve
- digitally controlled delay line in ADPLL
- phase interpolator / delay interpolator calibration
- DTC INL/DNL calibration and gain estimation

优先论文作者公开版本、大学课程、开放许可论文或厂商公开课件。对每个候选来源记录：
- 论文/课件题目、作者、机构、年份、DOI/URL；
- 原图编号、PDF 页码；
- 图中是 DTC 还是 TDC，是否真正在 ADPLL 回路中；
- 数字控制码如何映射到时间延迟；
- 是否说明 DTC gain、INL/DNL 或校准环路；
- 许可证和是否允许图像复用。

重点找一张真正体现“ADPLL 数字环路输出相位/时间校正码 → DTC → 延迟后的参考/反馈边沿”的架构图，以及一张 DTC gain calibration/测量图。若找不到匹配来源，明确报告缺失，保留课程自绘图，不要用不匹配的 FPGA/TDC 图替代。

## 四、补齐其他资料

- 保存 ADI PLL Fundamentals 离线网页快照，记录作者、图号和访问日期。
- JKU 上游源码归档状态核实；只保存需要的源码和许可证，不必无差别打包整个仓库。
- Staszewski ADPLL slides 的 IEEE 地址曾返回 503；尝试作者/学校可靠来源，若仍不可得，记录失败和替代来源。

## 五、页面与清单更新

只有实际加入 HTML 的图片才放到 pll/assets/。完成后更新：
- materials/README.md
- materials/pll/README.md
- materials/pll/SOURCES.md
- materials/pll/FIGURE_MANIFEST.csv
- pll/assets/README.md
- pll/FIGURE_REPLACEMENT_AUDIT.md
- 对应章节 HTML

继续保留原有教学自绘图和交互实验。不要把动态曲线、相位误差收敛、MASH 序列、TDC/DTC 滑块仿真替换为静态截图。

## 六、验收标准

- 8 份 PDF 实际入库，文件大小和 SHA-256 有记录。
- 每张提取图的图号、页码、来源、版权/许可证和用途已核实。
- 页面实际使用的图全部放在 pll/assets/ 并通过相对路径引用。
- 逐图 Manifest 状态与 HTML 实际引用一致。
- DTC 专项结果明确区分 FPGA 实现例与 ASIC ADPLL 实现；没有匹配原图时如实报告。
- Edge 桌面端和手机端完成离线打开测试，记录浏览器版本、设备和结果。
- 18 章图片资源无缺失；交互功能未被静态图片破坏。
