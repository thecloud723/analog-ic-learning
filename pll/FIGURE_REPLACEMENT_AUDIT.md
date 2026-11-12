# PLL 全部图片盘点与替换审计

检查日期：2026-11-12  
检查范围：main 分支下 pll/index.html、18 个章节 HTML、pll/assets/、materials/pll/originals/

## 本轮更新

第 8 章的 3 个联网图片链接已改为正文中的本地原图。其余新增原图放在对应知识点下，可展开对照，原有交互、教学简图和复绘曲线仍可使用。第 17 章新增 FPGA Vernier DTC 的可编程延迟线图，仍缺和本章 ADPLL 分数相位补偿完全匹配的 ASIC DTC 电路及增益校准原图。

已审阅 18 章并更新 14 章。新增 35 个本地图片文件、42 处引用。第 1 章原有两张 JKU SVG 继续使用。逐图路径、章节及状态见 [材料清单](../materials/README.md)。浏览器离线验证待完成。

## 上轮核对结论（更新前基线）

1. 已逐页检查 18 个章节 HTML 中的图片资源引用、内嵌 SVG、图注和来源链接。
2. 原先统计的约 239 个 SVG 标签不能等同于 239 张待替换图片，其中混有 MathJax 公式渲染、静态示意图、交互实验图、动态曲线和占位元素。本清单只把有独立教学含义的图形作为图片盘点对象。
3. 当前真正由课程页面加载的第三方原图有 2 张，均为 JKU 原始 SVG，已放在 pll/assets/，由第 1 章通过相对路径加载。
4. materials/pll/originals/jku/ 已归档 JKU PLL Figure 74–98 的 25 张 PNG 裁切图，但当前 18 章 HTML 没有直接引用这些 PNG。它们是已下载候选素材，不应误记为“已在页面使用”。
5. 第 8 章的 MDPI Figure 3、4、7 目前是指向外部 PNG 的文字链接，不是页面直接加载的图片。页面展示的是自绘/复绘图，尚未完成原图本地化。
6. 第 1 章 HTML 中也保留了 JKU 原图的外部链接，但它们只是“打开上游原图”的来源链接；页面实际 img.src 由 JavaScript 指向 ../assets/ 下的两张本地 SVG。第 8 章 MDPI 链接同样是来源超链接，不是 img 标签。其余章节没有发现直接加载远程图片文件的 img 资源。
6. 其他章节主要使用内嵌 SVG 自绘图和 JavaScript 生成的交互图。静态结构图应继续寻找原图；交互仿真图不应被静态截图替代。

## 2. 已在页面实际使用、且已放入 pll 目录的原图

| 页面 | 页面资源 | 原图来源 | 用途 | 状态 |
|---|---|---|---|---|
| 第 1 章 | pll/assets/jku-fig-pll-block-diagram.svg | JKU RFIC Figure 74 | 基本 PLL 框图 | 已本地加载 |
| 第 1 章 | pll/assets/jku-fig-pll-pfd-cp.svg | JKU RFIC Figure 83 | PFD-CP PLL 框图 | 已本地加载 |

第 1 章 HTML 中有对应的 img 元素，JavaScript 设置的路径分别为 ../assets/jku-fig-pll-block-diagram.svg 和 ../assets/jku-fig-pll-pfd-cp.svg。原图加载失败时会显示页面内嵌的自绘 fallback；正常情况下显示本地 JKU 原图。

两张 SVG 的上游来源、许可证和引用信息见 materials/pll/originals/jku/ 下的 LICENSE、CITATION.cff，以及 pll/assets/README.md。

## 3. 已下载但尚未被章节 HTML 引用的 JKU 图片

materials/pll/originals/jku/ 中的 fig_074.png 至 fig_098.png 共 25 张，均为 JKU PLL 章节 PDF 裁切图，已保留原图号、页码、图注和来源记录。

这些 PNG 当前属于“已归档、待页面使用”的素材。不要把它们标成已替换，也不要为了凑齐目录而全部复制到 pll/assets/。只有某张图实际被章节 HTML 引用时，才复制/转换到 pll/assets/originals/ 下，并更新 manifest。

建议映射：

| JKU 图号 | 原图内容 | 优先对应章节 |
|---|---|---|
| Fig.74 | 基本 PLL 框图 | 01、04、18 |
| Fig.75 | XOR PD 波形 | 02 |
| Fig.76 | PLL 拉普拉斯域/相位域模型 | 10 |
| Fig.77 | PFD 电路实现 | 06 |
| Fig.78–81 | PFD 不同边沿先后关系与时序 | 02、03、06 |
| Fig.82 | Charge Pump 电路 | 07 |
| Fig.83 | PFD-CP PLL 完整结构 | 01、03、04、09 |
| Fig.84 | PLL 输出相位噪声贡献 | 12 |
| Fig.85 | ADPLL 框图 | 04、16 |
| Fig.86 | Delay-line TDC | 17 |
| Fig.87 | DAC-controlled oscillator | 08、16 |
| Fig.88 | DCO switched varactor | 08 |
| Fig.89–94 | Delta-Sigma、NTF、MASH、Dither | 13、15 |
| Fig.95 | Fractional-N PLL | 04、14 |
| Fig.96 | 带 offset current 的 Charge Pump | 07 |
| Fig.97 | Reference frequency doubler | 05 |
| Fig.98 | 带 retiming flip-flop 的 Fractional-N PLL | 04、14 |

JKU 课程仓库声明 Apache-2.0。使用这些图时仍须保留许可证、作者、来源和修改说明。

## 4. 当前自绘静态图盘点

下表中的“自绘”指页面内嵌的教学框图、电路拓扑、时序图或数据复绘，不包括公式排版。后续应优先寻找一一对应的原图；找不到准确原图时，保留为教学复绘并明确标注来源，不能把复绘冒充原图。

| 章节 | 当前自绘/复绘静态图 | 优先原图来源或处理 |
|---|---|---|
| 01 PLL 用途与系统全景 | ADF4351 商业芯片功能框图；两张 JKU 图的 fallback 自绘版本 | ADF4351 数据手册功能框图；两张 JKU 原图已经本地使用 |
| 02 频率、相位、时间差与锁定 | 固定相位差边沿图；XOR 鉴相时序图 | JKU Fig.75、Fig.78–81；动态频偏累积曲线保留 |
| 03 从开环到闭环 | PFD-CP-LF-VCO-÷N 闭环简图；UP/DOWN 脉冲时序图 | JKU Fig.83、Fig.78–81 |
| 04 PLL 架构地图 | PD-LPF-VCO、CP-PLL、ADPLL 三种架构图 | JKU Fig.74、Fig.83、Fig.85 |
| 05 参考源与时钟输出链 | 参考/反馈/输出分频链；ADF4351 功能框图；参考倍频器 XOR+Delay 图 | ADI MT-086 Figure 3A；ADF4351 数据手册；JKU Fig.97 |
| 06 PD/PFD 相位与频率比较 | 双 DFF PFD 门级图；ADF4351 PFD/复位延迟（ABP）图；UP/DOWN 时序图 | JKU Fig.77–81；ADF4351 数据手册 Figure 18（页码由 Work 核对） |
| 07 Charge Pump 与 Loop Filter | CP 电流源/电流汇图；被动 RC 环路滤波器拓扑 | JKU Fig.82、Fig.83、Fig.96；TI SNAA106C |
| 08 VCO 与 DCO | LC Tank 损耗/负阻等效图；Ring Oscillator；current-starved RO；LC-DCO 电容 Bank；65 nm DCO PVT/ACQ/TRK 结构简化图；LMX2594 Core/Capcode 图；DNL/INL 数据复绘 | JKU Oscillator Figures 60、61、69–73；MDPI Figure 3、4、7；TI SNAA336A Figure 1-4 |
| 09 完整 CP-PLL 动态 | 完整 CP-PLL 反馈图；被动 RC 滤波器图；ADF4351 产品功能框图；启动/校准阶段图 | JKU Fig.83；ADF4351 数据手册。启动阶段图属于教学流程，可保留自绘并标注为教学抽象 |
| 10 相位域模型与 Type-I/II | PLL 小信号相位域框图；CP-PLL 被动滤波器图 | JKU Fig.76、Fig.83 |
| 11 瞬态响应、稳定性与锁定时间 | 瞬态测试对象框图；开环 Bode 增益/相位裕量图；TI 理论/实测 Lock Time 柱状数据复绘 | TI SNAA106C 对应章节与图 16.2/16.3；自算二阶阶跃响应保留 |
| 12 Phase Noise 与 Jitter | 理想/抖动边沿图；载波与连续噪声裙边/离散 Spur 示意；PLL 内部噪声传递路径 | JKU Fig.84；ADI PLL Fundamentals。积分相噪交互曲线保留 |
| 13 Spur、非线性与 PVT | Reference Spur 形成链路；ADI AN143 Figure 3 频谱数据复绘 | ADI AN143 Figure 3；原始 PDF 下载后核对图号、条件和曲线 |
| 14 Integer-N 与 Fractional-N | Integer-N PLL 框图；LMX2594 Fractional-N 功能框图 | JKU Fig.95、Fig.98；LMX2594 数据手册 |
| 15 Sigma-Delta、MASH 与 Dither | 一阶累加器/进位示意；MASH 1-1-1 级联及误差抵消；一阶/三阶 NTF 对比 | JKU Fig.89–94；动态 MASH 序列和频谱保留 |
| 16 ADPLL 结构与数字 PI | ADPLL 完整闭环；整数边沿计数+TDC 测相位；带可选 DTC 的完整闭环 | JKU Fig.85–88；Staszewski ADPLL 课件作为补充来源 |
| 17 TDC/DTC 与 DCO 校准 | TDC/数字 PI/DCO 路径图；DTC 延迟补偿路径说明 | JKU Fig.86；TI SNAA336A 校准资料；DTC 专用原图仍缺，需要单独搜索 |
| 18 完整系统设计与指标 | 系统级设计总图 | 这是课程自己的系统教学抽象，可由 JKU Fig.74/83/85 组合讲解；若保留自绘，标注“课程自绘系统总览”，不冒充外部原图 |

## 5. 应保留为交互仿真/模型生成的图

以下图形由页面参数、公式或实验状态实时生成，不存在必须下载的固定“原图”。应保留其动态能力，并在图注中说明模型假设、数据来源和是否为实测：

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

## 6. 上轮下载需求（当前进度见任务文件）

1. MDPI 论文 Figure 3、4、7：第 8 章已经有外链，但尚未下载到本地，也没有作为本地图片展示。
2. JKU Oscillator 章节 Figure 60、61、69–73：用于替换第 8 章 Ring/LC oscillator、差分 LC 核心和 VCO 模型自绘图。
3. ADI ADF4351 数据手册：至少提取完整功能框图和 PFD/ABP Figure 18，服务第 1、5、6、9 章。
4. ADI MT-086 Figure 3A：第 5 章参考/反馈分频链的核对来源。
5. TI SNAA106C：第 7、11 章环路滤波、稳定性、锁定时间资料。
6. TI SNAA336A 与 LMX2594 数据手册：第 8、14、17 章 VCO Core、Capcode、校准状态机。
7. ADI AN143 Figure 3：第 13 章参考杂散频谱原图。
8. DTC：第 17 章仍缺少真正对应的 DTC 原理图/码字-延迟实现图。不能用 TDC 图替代。
9. Staszewski ADPLL 课件：下载状态和可用图号仍需核实。

具体下载 URL、保存路径、授权核对要求和执行顺序见 [下一项 Work 任务](../materials/TASK_PLL_IMAGE_REFRESH.md)。

## 7. 图片入库和替换规则

- 页面实际使用的图片必须保存在 pll/assets/ 或其子目录，HTML 使用相对路径，确保离线可用。
- 原始 PDF、未使用的候选图和来源快照放在 materials/pll/，不要混入运行时资源目录。
- 每张被 HTML 引用的第三方图片必须在 FIGURE_MANIFEST.csv 中有记录：来源、作者/机构、原图号/页码、许可证、修改/裁切方式、引用章节、实际页面路径。
- 仅下载但未引用的图片标记为 archived_candidate，不得标记为 used。
- 静态图优先用原始 SVG/PDF 图；PDF 无法提取矢量图时再高分辨率裁切。
- 动态图、实验图、模型曲线不得被静态截图替换。
- 对厂商资料、论文或课件，下载可访问不等于获得再分发许可。私有仓库仅用于个人学习归档；未来公开发布前必须逐项复核授权。

## 8. 状态

- [x] 检查 18 个章节 HTML 的图像资源引用。
- [x] 确认第 1 章实际使用的两张 JKU SVG 已在 pll/assets/ 本地加载。
- [x] 确认 JKU 25 张 PNG 是已归档候选图，而非当前页面已引用图。
- [x] 确认第 8 章 MDPI Figure 3/4/7 当前仅为外部链接。
- [x] 建立静态自绘图、外部来源图和交互仿真图的区分。
- [ ] Work 下载并整理下一批原始资料和缺失图片。
- [ ] 按章节逐项替换已匹配的静态自绘图。
- [ ] 所有实际使用图片本地化到 pll/assets/。
- [ ] 完成 Edge 桌面端、手机和断网打开测试。
