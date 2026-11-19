# PLL 专题

面向数字电路工程师的锁相环系统与电路课程。课程强调完整系统认识，并将基础原理、真实工业实现、控制接口、设计指标和测试方法联系起来。

## 课程入口

- **[PLL 教材内容优先改造规范（2026-11-19）](docs/PLL_SOURCE_FIRST_COURSE_EDITORIAL_SPEC_2026-11-19.md)**：原始 JKU/TI/ADI 图、公式和内容组织为主；既有 Classroom 交互保留作验证工具；当前为内容设计修正，尚未重排六页。


- **[PLL A 部分 Classroom 交互教学 SDD（2026-11-19）](docs/PLL_A_CLASSROOM_SDD_2026-11-19.md)**：六堂课的权威交互与模型设计基线；A 部分已按此实现，逐页验收结果见[验收报告](docs/PLL_A_CLASSROOM_ACCEPTANCE_REPORT.md)。
- **[持续执行状态](docs/WORK_EXECUTION_STATE.md)**：当前 main 提交、任务清单、测试证据和未验证项。
- **[PLL 完备度评估与五阶段详细执行计划（2026-11-17）](docs/PLL_COMPLETENESS_AND_EXECUTION_PLAN_2026-11-17.md)**：当前课程对标、交互/实验状态，以及阶段 1～5 的任务、交付物和验收标准。
- **[B1.2 频率规划器交互改造规格（2026-11-17）](docs/PLL_B1_2_FREQUENCY_PLANNER_SPEC_2026-11-17.md)**：按 TI TICS Pro Fig. 3-1 复刻布局，定义动态频率节点、LMX2594 约束、Mode A/B/C 和仿真/估算边界；仅为设计规格，尚未实施。

**[从新版 A1.1 开始 PLL 交互课程](course/a1-1.html)**

## A 部分 Classroom 交付状态

A1.1、A1.2、A1.3、A2.1、A2.2、A2.3 六页已在 GitHub Pages 部署，均按 `Learn → Predict → Explore → Observe → Explain → Check` 组织，并共享 Classroom UI、模型、数据和交互层。最新代码提交 [`e108790`](https://github.com/thecloud723/analog-ic-learning/commit/e108790043e31981495fcdec7f33ce00a7711dd5) 已通过 Pages 部署。该部分当前是 **L1**：A1.2 使用解析近锁模型，A2.1–A2.3 使用本地行为模型；A1.3 显示 TI 原始测量图和离散标记读数。它们不是新的 L2 仿真、L3 云端运行或 L4 读者复跑。

- [打开已部署课程](https://thecloud723.github.io/analog-ic-learning/pll/course/a1-1.html)
- [查看逐页验收、测试证据和未验证项](docs/PLL_A_CLASSROOM_ACCEPTANCE_REPORT.md)
- **验收边界：** GitHub Pages 桌面交互、六页导航及 B–F 回归已检查；真实手机视口和浏览器断网运行仍未验证，故整体验收结论保留为部分验证。
- [统一实验台账](EXPERIMENT_LEVEL_ROADMAP.md)（新版实验、49 项旧实验去向、L1–L4 状态与复跑证据）
- [章节页面模板](PAGE_TEMPLATE.md)
- [章节进度与验收记录](PROGRESS.md)
- [参考资料索引](REFERENCES.md)
- [第 11–13 章资料与模型说明](REFERENCES_11_13.md)
- [第 14–16 章资料与模型说明](REFERENCES_14_16.md)
- [工程案例补充说明](ENGINEERING_CASES.md)
- [行内数学符号修订记录](MATH_RENDERING_CHANGELOG.md)
- [第 12 章曲线互动实验改造记录](CH12_CURVE_INTERACTION_AUDIT.md)
- [第 10、11、13、15 章曲线互动改造记录](CH10_11_13_15_CURVE_INTERACTION_AUDIT.md)

## 旧版章节与深链

| 章节 | 标题 | 页面 |
|---|---|---|
| 01 | PLL 的用途与系统全景 | [打开](chapters/01_PLL用途与系统全景.html) |
| 02 | 频率、相位、时间差与锁定 | [打开](chapters/02_频率相位时间差与锁定.html) |
| 03 | 从开环到闭环 | [打开](chapters/03_从开环到闭环.html) |
| 04 | PLL 架构地图 | [打开](chapters/04_PLL架构地图.html) |
| 05 | 参考源与时钟输出链 | [打开](chapters/05_参考源与时钟输出链.html) |
| 06 | PD/PFD：相位与频率比较 | [打开](chapters/06_PD_PFD相位与频率比较.html) |
| 07 | Charge Pump 与 Loop Filter | [打开](chapters/07_Charge_Pump与Loop_Filter.html) |
| 08 | VCO 与 DCO 可控振荡器 | [打开](chapters/08_VCO与DCO可控振荡器.html) |
| 09 | 完整 CP-PLL 动态 | [打开](chapters/09_完整CP_PLL动态.html) |
| 10 | 相位域模型与 Type-I/II | [打开](chapters/10_相位域模型与Type_I_II.html) |
| 11 | 瞬态响应、稳定性与锁定时间 | [打开](chapters/11_瞬态响应稳定性与锁定时间.html) |
| 12 | Phase Noise 与 Jitter | [打开](chapters/12_Phase_Noise与Jitter.html) |
| 13 | Spur、非线性与 PVT | [打开](chapters/13_Spur非线性与PVT.html) |
| 14 | Integer-N 与 Fractional-N | [打开](chapters/PLL_第14章_Integer-N与Fractional-N.html) |
| 15 | ΣΔ、MASH 与 Dither | [打开](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html) |
| 16 | ADPLL 的结构与数字 PI | [打开](chapters/PLL_第16章_ADPLL结构与数字PI.html) |
| 17 | TDC/DTC、DCO 校准 | [打开](chapters/PLL_第17章_TDC_DTC与DCO校准.html) |
| 18 | 完整系统与指标 | [打开](chapters/PLL_第18章_完整系统设计与指标.html) |

## 四级实验路线

- **L1**：浏览器本地公式/教学行为模型，拖动滑块立即计算。
- **L2**：网页本地选择真实仿真预计算数据；当前第 07 章 CP 纹波、第 08 章 LC VCO 已有原型。
- **L3**：作者发布完整已运行的云端实验；计划首选 Kaggle，但尚未发布，须验证无登录阅读。
- **L4**：读者登录并复制 L3 Notebook，修改参数、重跑、保存结果；与 L3 共用仿真工程。

不是所有图都需要 L3/L4；详细到每个实验的当前证据、后续引擎、可调参数和优先级，统一维护在 [实验四级台账](EXPERIMENT_LEVEL_ROADMAP.md)。L1 与 L2 继续支持离线，不能把 JS 公式缓存误标为真实仿真。

## 页面规范

- 每章独立 HTML；左侧章节目录、顶部页签、底部跨章导航。
- 公式采用标准数学排版；题目、解析、图注和动态结果中的上下标保持一致。
- 基础电路图与真实论文/工业产品图并用，不以文字方框代替关键电路结构。
- 预测题先于滑块实验；完成预测后观察参数变化，再解释物理原因。
- 指标要区分系统规格、设计参数和测试结果，并说明测量条件。
- 教学近似模型与真实芯片测试数据明确区分。

## 阶段 1 审计

[导航与 18 章迁移](docs/PLL_S1_01_NAVIGATION_AUDIT.md) · [逐页覆盖](docs/PLL_S1_02_COURSE_COVERAGE.md) · [教材对照](docs/PLL_S1_03_EXTERNAL_REFERENCE_MATRIX.md) · [公式](docs/PLL_S1_04_FORMULA_INDEX.md) · [图片](docs/PLL_S1_05_FIGURE_MANIFEST.md) · [回归](docs/PLL_S1_06_REGRESSION.md) · [实验台账](EXPERIMENT_LEVEL_ROADMAP.md) · [阶段验收](docs/PLL_S1_09_ACCEPTANCE.md)
