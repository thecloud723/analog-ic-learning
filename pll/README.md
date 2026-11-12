# PLL 专题

面向数字电路工程师的锁相环系统与电路课程。课程强调完整系统认识，并将基础原理、真实工业实现、控制接口、设计指标和测试方法联系起来。

## 课程入口

**[从第 1 章开始 PLL 交互课程](chapters/01_PLL用途与系统全景.html)**

- [章节页面模板](PAGE_TEMPLATE.md)
- [章节进度与验收记录](PROGRESS.md)
- [参考资料索引](REFERENCES.md)
- [第 11–13 章资料与模型说明](REFERENCES_11_13.md)
- [第 14–16 章资料与模型说明](REFERENCES_14_16.md)
- [工程案例补充说明](ENGINEERING_CASES.md)
- [行内数学符号修订记录](MATH_RENDERING_CHANGELOG.md)
- [第 12 章曲线互动实验改造记录](CH12_CURVE_INTERACTION_AUDIT.md)
- [第 10、11、13、15 章曲线互动改造记录](CH10_11_13_15_CURVE_INTERACTION_AUDIT.md)

## 章节目录

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

## 页面规范

- 每章独立 HTML；左侧章节目录、顶部页签、底部跨章导航。
- 公式采用标准数学排版；题目、解析、图注和动态结果中的上下标保持一致。
- 基础电路图与真实论文/工业产品图并用，不以文字方框代替关键电路结构。
- 预测题先于滑块实验；完成预测后观察参数变化，再解释物理原因。
- 指标要区分系统规格、设计参数和测试结果，并说明测量条件。
- 教学近似模型与真实芯片测试数据明确区分。
