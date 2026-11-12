# PLL 全部图片盘点与替换审计

## 本轮补图结果

| 章 | 正文使用的本地原图 |
| --- | --- |
| 01、18 | ADI ADF4351 Fig.1 功能框图 |
| 11 | TI SNAA336A Fig.2-2 跳频与校准曲线 |
| 13 | ADI AN143 Fig.3 参考杂散频谱 |
| 15 | JKU Fig.89，作为连续时间 ΔΣ 与数字 Fig.90 的对照 |
| 17 | Liang、Liu、Gan Fig.6，0.11 µm CMOS DTC 电路。FPGA Fig.4 留在原始素材目录。 |

原图路径和来源见 FIGURE_MANIFEST.csv。以下内容记录本轮补图前的状态。


核对日期：2026-11-12  
基准提交：f11366c（main）  
检查范围：18 个章节 HTML、pll/assets/、materials/pll/originals/、图片 Manifest。

## 1. 本轮更新结论

- 18 章全部检查，更新 14 章；第 1 章沿用原有的两张 JKU SVG。
- 新增 42 处本地图片引用，分布在 14 个章节。
- 新增 35 个页面资源文件；加上第 1 章原有的 2 个 SVG，pll/assets/ 当前共有 37 个图片文件。
- 本轮新下载归档 11 张原图：JKU Oscillators 7 张 SVG、MDPI 65 nm LC-DCO 3 张 PNG、FPGA Vernier DTC 1 张 JPEG。
- 之前已经归档的 JKU PLL PNG 中，有 24 张复制到 pll/assets/ 并实际引用；Figure 89 暂未使用，仍是候选图。
- 第 8 章的 MDPI Figure 3、4、7 已从外部链接改为正文中的本地图片。
- 需要明确区分“原图已归档/加入页面”和“自绘图已被原图替换”：本轮 42 处新增引用主要是把原图作为教学对照加入页面，并没有逐一删除或替换原有自绘图。因此 14 章更新不等于 14 章完成静态图替换。交互实验继续保留，不用静态截图替代。
- 静态资源路径已逐项核对：37 个本地图片文件均可解析，42 处引用对应 35 个新增资源文件。浏览器在当前执行环境启动失败，因此 Edge、手机和真实断网打开仍待实测。

## 2. 逐章本地图片引用

| 章节 | 新增引用数 | 当前使用的原图 |
|---|---:|---|
| 01 PLL 用途与系统全景 | 0（沿用 2 个资源） | JKU Figure 74、83 SVG；已修复原图显示逻辑 |
| 02 频率、相位、时间差与锁定 | 1 | JKU Fig.75 |
| 03 从开环到闭环 | 3 | JKU Fig.78、79、83 |
| 04 PLL 架构地图 | 3 | JKU Fig.74、83、85 |
| 05 参考源与时钟输出链 | 1 | JKU Fig.97 |
| 06 PD/PFD 相位与频率比较 | 5 | JKU Fig.77–81 |
| 07 Charge Pump 与 Loop Filter | 3 | JKU Fig.82、83、96 |
| 08 VCO 与 DCO 可控振荡器 | 12 | JKU Fig.87、88；Oscillator Fig.60、61、69–73；MDPI Fig.3、4、7 |
| 09 完整 CP-PLL 动态 | 1 | JKU Fig.83 |
| 10 相位域模型与 Type-I/II | 1 | JKU Fig.76 |
| 11 瞬态响应、稳定性与锁定时间 | 0 | 保留课程自绘和交互仿真 |
| 12 Phase Noise 与 Jitter | 1 | JKU Fig.84 |
| 13 Spur、非线性与 PVT | 0 | 保留课程复绘；ADI AN143 原图待提取 |
| 14 Integer-N 与 Fractional-N | 2 | JKU Fig.95、98 |
| 15 Sigma-Delta、MASH 与 Dither | 5 | JKU Fig.90–94 |
| 16 ADPLL 结构与数字 PI | 2 | JKU Fig.85、86 |
| 17 TDC/DTC 与 DCO 校准 | 2 | JKU Fig.86；FPGA Vernier DTC Fig.4 |
| 18 完整系统设计与指标 | 0 | 保留课程自绘系统总览 |

## 3. 已使用原图、归档位置和授权

| 来源 | 数量 | 页面资源目录 | 使用章节 | 授权 |
|---|---:|---|---|---|
| JKU PLL Figures 74–88、90–98 | 24 PNG | pll/assets/originals/jku/ | 2、3、4、5、6、7、8、9、10、12、14、15、16、17 | Apache-2.0 |
| JKU PLL Figures 74、83 | 2 SVG | pll/assets/ 根目录 | 1 | Apache-2.0 |
| JKU Oscillators Figures 60、61、69–73 | 7 SVG | pll/assets/originals/jku-oscillators/ | 8 | Apache-2.0 |
| MDPI 65 nm LC-DCO Figures 3、4、7 | 3 PNG | pll/assets/originals/mdpi/ | 8 | CC BY 4.0 |
| FPGA Vernier DTC Figure 4 | 1 JPEG | pll/assets/originals/mdpi-dtc/ | 17 | CC BY 4.0 |

原始图片位于 materials/pll/originals/ 对应来源目录；页面使用副本位于 pll/assets/。逐图原始路径、页面副本路径、原图号、作者、来源 URL、许可证和章节映射以 materials/pll/FIGURE_MANIFEST.csv 为准。

JKU PLL Figure 89 是连续时间一阶 Delta-Sigma 图，当前课程内容主要讲数字 DSM/MASH，因此暂不引用，仍保留在 materials/pll/originals/jku/ 作为候选图。

## 4. 当前仍保留的自绘/复绘静态图

本轮新增的原图主要作为知识点下的原始资料对照，不取代课程原有的教学简图。以下自绘图继续承担概念引导、简化表达或具体教学场景的作用：

| 章节 | 保留的自绘/复绘图 | 当前处理 |
|---|---|---|
| 01 | ADF4351 商业芯片功能框图仍是教学复绘；Figure 74/83 已删除自绘 fallback，原图加载失败时只显示文字提示 | JKU Figure 74、83 本地原图已存在，2026-11-12 修复 img 默认隐藏与 lazy-load 的显示问题；ADF4351 官方 Figure 1 已定位，但尚未下载为本地资源并替换复绘 |
| 02 | 固定相位差边沿图、XOR 鉴相时序图 | JKU Fig.75 作为原始资料对照；频偏导致的边沿时间差继续动态生成 |
| 03 | PFD-CP-LF-VCO-÷N 闭环简图、UP/DOWN 脉冲时序图 | JKU Fig.78、79、83 作为原图对照 |
| 04 | PD-LPF-VCO、CP-PLL、ADPLL 三种架构简图 | JKU Fig.74、83、85 作为原图对照 |
| 05 | 参考/反馈/输出分频链、ADF4351 功能框图、参考倍频器 XOR+Delay 图 | JKU Fig.97 已补；MT-086 Fig.3A 和 ADF4351 功能图待提取 |
| 06 | 双 DFF PFD 门级图、ADF4351 PFD/复位延迟（ABP）图、UP/DOWN 时序图 | JKU Fig.77–81 已补；ADF4351 Fig.18 待提取 |
| 07 | CP 电流源/电流汇图、被动 RC 环路滤波器拓扑 | JKU Fig.82、83、96 已补；TI 环路滤波资料待提取 |
| 08 | LC Tank 损耗/负阻等效图、current-starved RO、LC-DCO 电容 Bank、65 nm DCO PVT/ACQ/TRK 简化图、LMX2594 Core/Capcode 图、DNL/INL 数据复绘 | JKU Oscillator 和 MDPI 原图已补；TI SNAA336A/LMX2594 图待提取 |
| 09 | 完整 CP-PLL 反馈图、被动 RC 滤波器图、ADF4351 产品功能框图、启动/校准阶段图 | JKU Fig.83 已补；启动阶段图是课程教学抽象，保留自绘 |
| 10 | PLL 小信号相位域框图、CP-PLL 被动滤波器图 | JKU Fig.76 已补 |
| 11 | 瞬态测试对象框图、开环 Bode 增益/相位裕量图、TI 理论/实测 Lock Time 数据复绘 | 保留自绘和二阶系统仿真；SNAA106C 曲线待核对 |
| 12 | 理想/抖动边沿图、载波与连续噪声裙边/离散 Spur 示意、PLL 内部噪声传递路径 | JKU Fig.84 作为原图对照；积分相噪交互曲线保留 |
| 13 | Reference Spur 形成链路、ADI AN143 Figure 3 频谱数据复绘 | 保留复绘；待从 AN143 PDF 提取原图并核对条件 |
| 14 | Integer-N PLL 框图、LMX2594 Fractional-N 功能框图 | JKU Fig.95、98 已补；LMX2594 功能框图待提取 |
| 15 | 一阶累加器/进位示意、MASH 1-1-1 级联及误差抵消、一阶/三阶 NTF 对比 | JKU Fig.90–94 作为原图对照；MASH 动态序列和频谱继续实时生成 |
| 16 | ADPLL 完整闭环、整数边沿计数+TDC 测相位、带可选 DTC 的闭环 | JKU Fig.85、86 已补；Staszewski 课件待获取 |
| 17 | TDC/数字 PI/DCO 路径图、DTC 延迟补偿路径说明 | JKU TDC 和 FPGA DTC 原图已补；ASIC DTC 及增益校准图仍缺 |
| 18 | 系统级设计总图 | 课程自己的系统教学抽象，继续保留自绘 |

## 5. 应保留为交互仿真/模型生成的图

以下图形由页面参数、公式或实验状态实时生成，不存在必须下载的固定原图。不得用静态截图替代：

- 第 1 章：合成相位噪声示例曲线、REF/VCO 周期关系实验。
- 第 2 章：频偏导致的边沿时间差/相位累积曲线。
- 第 3 章：闭环频率与相位误差收敛曲线。
- 第 5 章：时钟频率链计算可视化。
- 第 6 章：PFD/CP 平均电流与相位差曲线。
- 第 7 章：RC 阻抗曲线、CP 电流失配曲线。
- 第 8 章：LC-DCO 电容 Bank 与振荡频率实验。
- 第 9、10 章：PLL 闭环、相位域模型的动态响应。
- 第 11 章：标准二阶系统阶跃响应。
- 第 12 章：相位噪声积分区间与 RMS Jitter 计算。
- 第 15 章：MASH 输出序列和频谱计算。
- 第 16 章：ADPLL 相位误差收敛。
- 第 17 章：TDC 量化阶梯、DTC 码字-延迟关系。
- 第 18 章：逐拍闭环交互。

## 6. 仍需下载、提取或核实的资料

本轮已有 8 份 PDF 下载到 Work 暂存区，合计 19,496,505 bytes，但尚未提交到 GitHub：

1. JKU 全课程 rfic.pdf。
2. ADI MT-086。
3. TI SNAA106C。
4. ADI ADF4351 Datasheet。
5. TI SNAA336A。
6. TI LMX2594 Datasheet。
7. MDPI 65 nm LC-DCO 论文 PDF。
8. ADI AN143。

下一批工作详见 [TASK_PLL_NEXT_BATCH.md](../materials/TASK_PLL_NEXT_BATCH.md)：

- 将上述 8 份 PDF 归档到 materials/pll/source-pdfs/，记录文件大小、版本、来源 URL 和下载日期。
- 提取 ADF4351 功能框图（PDF 第 1 页）及 Figure 18（第 11 页）。
- 提取 MT-086 Figure 3A（第 3 页）。
- 提取 AN143 Figure 3（第 2 页），核对第 13 章复绘的测试条件。
- 提取 LMX2594 功能框图（当前记录为第 19 页，需复核 PDF 版本）。
- 提取 SNAA336A Figure 1-4（第 4 页）。
- 核对 SNAA106C 锁定时间曲线的图号、页码和测试条件。
- 保存 ADI PLL Fundamentals 离线网页快照。
- 核实 JKU 完整源码归档。
- Staszewski ADPLL 课件原下载地址返回 503，寻找可靠替代来源并核对授权。
- 继续搜索 ASIC ADPLL DTC 电路和增益校准图。FPGA Vernier DTC Figure 4 只能作为数字码控制延迟的实现例，不能替代 ASIC 图。

## 7. 图片入库和授权规则

- 页面实际引用的图片必须保存在 pll/assets/ 或其子目录，HTML 使用相对路径。
- 原始 PDF、未使用的候选图和网页快照放在 materials/pll/。
- 每张第三方图片必须在 FIGURE_MANIFEST.csv 中记录来源、作者/机构、原图号/页码、许可证、处理方式、引用章节和页面路径。
- 已引用图片标记 active_in_html；已下载但未引用的图标记 archived_candidate。
- JKU 图保留 Apache-2.0 License/CITATION；MDPI 图按 CC BY 4.0 署名；厂商资料授权未核实前不标记为可公开再分发。
- 交互实验、动态曲线和模型生成图继续实时计算。

## 8. 当前验收状态

- [x] 检查全部 18 个章节 HTML。
- [x] 更新 14 个章节。
- [x] 新增 42 处本地图片引用。
- [x] 新增 35 个页面资源文件；连同原有 2 个 SVG 共 37 个。
- [x] 归档 11 张新原图。
- [x] 逐项核对 37 个页面资源文件均存在且可解析。
- [x] 确认第 8 章 MDPI 三张图已本地展示。
- [x] 第 1 章 JKU Figure 74/83 改为默认显示本地原图；已删除自绘 fallback；原图加载失败时只显示文字提示。
- [ ] 第 1 章 ADF4351 官方 Figure 1 下载归档并替换课程复绘图。
- [x] 保留教学自绘图和交互实验。
- [ ] 将 8 份已下载 PDF 入库。
- [ ] 将 ADF4351 官方 Figure 1 原图下载到 materials/pll/originals/adi/，核对版权后复制到 pll/assets/originals/adi/ 并替换第 1 章复绘图。
- [ ] 提取 ADI/TI 关键图并更新页面。
- [ ] 找到 ASIC ADPLL DTC 电路及增益校准图。
- [ ] 完成 Edge 桌面端离线打开验证。
- [ ] 完成手机离线打开验证。

