# PLL 18 章实验四级体系：逐项状态与 L3/L4 建设规划

> **阶段 1 · PLL-S1-01**　已做[课程入口与导航源码审计](docs/PLL_S1_01_NAVIGATION_AUDIT.md)。已补齐 18 章迁移映射，可用于 S1-07 关联旧实验。实验成熟度沿用既有证据。旧实验保留原 ID，章级新版去向已补在各章标题下。
> **PLL-S1-02**　[新版 52 页覆盖矩阵](docs/PLL_S1_02_COURSE_COVERAGE.md)已建立，可用于 S1-07 合并台账。
> **PLL-S1-03**。[外部资料对照与正文引用](docs/PLL_S1_03_EXTERNAL_REFERENCE_MATRIX.md)已归档。公式级核对纳入 S1-04。
> **PLL-S1-04**。[新版公式索引](docs/PLL_S1_04_FORMULA_INDEX.md)已收录 54 个独立公式块及适用条件，行内公式和原文等式逐条对应待复核。

> 审核日期：2026-11-15  
> 范围：`analog-ic-learning/pll/chapters/` 18章 HTML、`course-labs.js`、`course-cp-data.js`、两份实验 ZIP 的**引用与现有课程记录**。  
> 本文只整理实施计划与源码核对状态；**没有发布 Kaggle、没有运行新的仿真、没有修改课程 HTML**。  
> 状态口径：“已”=在仓库源码中发现相关实现/数据，**不代表** Edge/手机真实浏览器验收、独立复现或电路物理准确性已验收。

## 新版实验索引

| ID | 课程去向 | 现有证据 |
|---|---|---|
| PLL-01 | [B3.1](course/b3-1.html) | VCO 调谐 9 点及 5 GHz 工作点 |
| PLL-02 | [C1.2](course/c1-2.html) | 等效 CP 净电荷 5 点 |
| PLL-03 | [C2.1](course/c2-1.html) | 平均相位闭环的 SPICE 求解 |
| PLL-04 | [D3.2](course/d3-2.html) | 周期纹波、参考杂散及示例输入谱的抖动预算 |

[Notebook 源码与实验边界](labs/PLL-SPICE/README.md)。原 49 项保留在下文。逐实验去向见下表。映射按教学主题确定，复现记录沿用各实验原有证据。作者运行记录与独立访客 L3/L4 验收分别取证。

## 49 项旧实验到新版的对应页面

| 旧实验 ID | 对应课程页 | 对应范围 |
|---|---|---|
| E01-01 | [A2-1](course/a2-1.html) | 主题对应 |
| E01-02 | [A1-1](course/a1-1.html) | 主题对应 |
| E01-03 | [A1-3](course/a1-3.html) | 主题对应 |
| E02-01 | [A2-1](course/a2-1.html) | 主题对应 |
| E02-02 | [A2-2](course/a2-2.html) | 主题对应 |
| E03-01 | [C1-2](course/c1-2.html) | 主题对应 |
| E03-02 | [C2-2](course/c2-2.html) | 主题对应 |
| E04-01 | [C1-1](course/c1-1.html)、[E3-1](course/e3-1.html) | 主题对应，旧交互覆盖需单独核对 |
| E04-02 | [E1-1](course/e1-1.html) | 主题对应 |
| E05-01 | [B1-2](course/b1-2.html) | 主题对应 |
| E06-01 | [C1-1](course/c1-1.html) | 主题对应 |
| E06-02 | [C1-1](course/c1-1.html) | 主题对应，旧交互覆盖需单独核对 |
| E07-01 | [C1-2](course/c1-2.html)、[C1-3](course/c1-3.html) | 主题对应 |
| E07-02 | [C1-4](course/c1-4.html) | 主题对应 |
| E08-01 | [B2-2](course/b2-2.html)、[B2-3](course/b2-3.html) | 主题对应 |
| E08-02 | [B2-3](course/b2-3.html) | 主题对应 |
| E08-03 | [B2-1](course/b2-1.html) | 主题对应 |
| E08-04 | [B3-2](course/b3-2.html) | 主题对应 |
| E09-01 | [C2-1](course/c2-1.html) | 主题对应 |
| E09-02 | [C2-2](course/c2-2.html) | 主题对应 |
| E10-01 | [C3-1](course/c3-1.html)、[C3-2](course/c3-2.html) | 主题对应 |
| E10-02 | [C3-3](course/c3-3.html) | 主题对应 |
| E11-01 | [C2-4](course/c2-4.html)、[C3-4](course/c3-4.html) | 主题对应 |
| E11-02 | [C2-3](course/c2-3.html)、[C3-4](course/c3-4.html) | 主题对应 |
| E12-01 | [D1-1](course/d1-1.html) | 主题对应，旧交互覆盖需单独核对 |
| E12-02 | [A2-1](course/a2-1.html) | 主题对应 |
| E12-03 | [D1-2](course/d1-2.html) | 主题对应，旧交互覆盖需单独核对 |
| E12-04 | [D1-1](course/d1-1.html) | 主题对应 |
| E12-05 | [D1-2](course/d1-2.html) | 主题对应 |
| E12-06 | [D2-1](course/d2-1.html) | 主题对应 |
| E12-07 | [D1-3](course/d1-3.html) | 主题对应 |
| E12-08 | [D1-3](course/d1-3.html) | 主题对应，旧交互覆盖需单独核对 |
| E12-09 | [D2-1](course/d2-1.html)、[D1-3](course/d1-3.html) | 主题对应，旧交互覆盖需单独核对 |
| E13-01 | [D3-2](course/d3-2.html) | 主题对应 |
| E13-02 | [D3-3](course/d3-3.html) | 主题对应，旧交互覆盖需单独核对 |
| E14-01 | [E1-1](course/e1-1.html) | 主题对应 |
| E14-02 | [E1-1](course/e1-1.html)、[E1-2](course/e1-2.html) | 主题对应 |
| E15-01 | [E2-1](course/e2-1.html)、[E2-2](course/e2-2.html) | 主题对应 |
| E15-02 | [E2-2](course/e2-2.html)、[E2-3](course/e2-3.html) | 主题对应，旧交互覆盖需单独核对 |
| E15-03 | [E2-3](course/e2-3.html) | 主题对应 |
| E16-01 | [E3-1](course/e3-1.html) | 主题对应 |
| E16-02 | [E3-2](course/e3-2.html) | 主题对应 |
| E17-01 | [E4-1](course/e4-1.html) | 主题对应 |
| E17-02 | [E4-2](course/e4-2.html) | 主题对应 |
| E17-03 | [B3-2](course/b3-2.html) | 主题对应 |
| E17-04 | [E4-3](course/e4-3.html) | 主题对应 |
| E18-01 | [B1-2](course/b1-2.html) | 主题对应 |
| E18-02 | [E3-2](course/e3-2.html) | 主题对应 |
| E18-03 | [F1-1](course/f1-1.html)、[F1-2](course/f1-2.html)、[F1-3](course/f1-3.html) | 主题对应，旧交互覆盖需单独核对 |

## 1. 四级定义（长期统一规范）

| Level | 名称 | 页面/平台 | 数据来源与资格条件 | 当前验收要求 |
|---|---|---|---|---|
| **L1** | 公式/教学模型交互 | 离线 HTML + JS | 解析式、理想模型、数值算法或**教学行为模型**即时计算；不冒称SPICE | 参数可变、曲线即时响应、公式/单位/适用边界清楚，先预测再验证 |
| **L2** | **真实仿真数据**预计算交互 | 离线 HTML + 精简 JSON/JS | L3 同一实验运行产生的真实 SPICE/RTL/数值仿真结果，经明确的降采样与指标准备；**L1算过再存盘不算L2** | 每条曲线可追溯实验 ID/模型版本、条件；非预跑参数不插值冒充真实结果 |
| **L3** | 作者公开的完整标准实验 | 首选公开 Kaggle Notebook，GitHub 保留源码及公开结果镜像 | 作者已经运行、保存的环境配置、脚本/网表、原始数据、日志、完整曲线、参数表、误差与限制 | 读者免登录可查看公开结果（需实际访客验证）；保存运行版本和下载出口 |
| **L4** | 读者自行修改并重跑 | L3 同一 Notebook 的复制/编辑/运行模式 | 读者登录平台，在自己的计算会话修改参数并执行相同工程；也保留本地包 | 通过洁净账号/会话启动；模型可用、参数有范围/单位、计算受限、结果相对基准可核验 |

说明：L3 与 L4 通常是**同一个工程/Notebook**，L3 为作者已完成的发布快照，L4 为读者复制后运行；二者不要求两套仿真系统。L1 与 L2 可以同时放在一个知识点上，用于比较“理想机理”和“真实非理想”。并不是所有图都必须做到 L4。

## 1.1. VCO-01 实际仿真复现里程碑（2026-11-15）

- **当前实际验证已经超过静态源码检查**： [GitHub Actions 27组真实 SPICE 复跑](https://github.com/thecloud723/analog-ic-learning/actions/runs/43682286383) 已通过，使用原 ZIP 的 Node.js + EEcircuit-engine（ngspice WASM）和 SKY130 模型，且 27 组导出结果与原 ZIP 的 baseline 频率、Vpp、功耗逐项一致（最大差值 0）。
- **L4 引擎级改参能力**：同一 CI 验证两套不同 Rs / MOS W 组合，均生成完整时域 CSV，且显示不同的起振结果。属于**改参能力已验证**，不等于读者 Kaggle 复制/运行体验已通过。
- **Kaggle L3/L4 尚未发布**：独立工程见 [`labs/VCO-01/`](labs/VCO-01/)，包含 Notebook（16单元格）、原 ZIP 复用逻辑、基准比较、L2 自动导出、实验元数据。后续仍需在 Kaggle 开启 CPU/Internet 完整执行、Save Version、无账号阅读、洁净账号 Copy & Edit。
- **平台口径明确**：现有包的真实执行器是 **eecircuit-engine 1.9.0 / ngspice 45.2 WASM**，不是独立的原生 ngspice CLI 依赖；尽管网表可供原生 ngspice 运行，但两者不保证数值完全相同。
- 本文逐项表的 L3/L4 栏仍是**计划**，不能因 CI 通过而标成 Kaggle 已发布。

## 2. 当前基线与容易误判的地方

- 第 07 章 CP 纹波：`pll/assets/course-cp-data.js` 已保存 **3 组失配比例 × 3 组电容 = 9 组**局部 SPICE 最后一个周期波形；`course-labs.js` 的 `data-study=cp` 做直接切换；页面已链接 `cp-ripple-lab.zip`。这符合 **L2 的实现形式**，但完整云端 L3 未发布。
- 第 08 章 LC VCO：页面内嵌 **27 组 SKY130 TT/27℃** 预运行样本并即时选择，包含振荡状态、频率、振幅、功率与波形；页面链接 `lc-vco-lab.zip`。具备 **L2 原型**，仍要补充源结果校验、独立运行环境及 L3。
- 第 13 章 Spur：`data-study=spur13` 可复用第 07 章 SPICE 纹波或导入 `vctrl.csv`，之后通过 **JS 傅里叶基波 + 频率调制公式估算**边带；`lab13` 是简化谐波估算。**不能把输出 Spur 图说成实际 SPICE 频谱**。
- 第 18 章验收：`data-study=accept` 调用第 7 章的 CP 数据作局部输入，其余锁定/噪声预算是 JS 教学模型；不是完整芯片或整机测量结果。
- 第 12 章 8组新曲线，及 10/11/13/15 章的高级曲线，已在 JS 源码中有实现；**不因为使用数值积分、DFT、随机序列就自动成为 L2**。
- 本次未对两个 ZIP 的内部文件逐字节重新验收，也未用洁净环境重跑；以仓库中存在 ZIP、HTML 对其引用和已有实现记录为依据。L3 发版前须补复现测试。

## 3. 逐实验状态（共 49 条）

状态中的“无”表示暂未在当前页面查到可信的预计算外部仿真结果；L3/L4 栏是**下一步规划**，不是已完成。未单建 L3 的基础实验仍可链接相关深度实验，不必重复开发。

### 第 01 章｜[PLL 用途与全景](chapters/01_PLL用途与系统全景.html)

新版去向 [A1.1](course/a1-1.html)、[A1.2](course/a1-2.html)、[A1.3](course/a1-3.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E01-01 相位差/时间差换算 | 已：频率与 Δt 滑块计算 | 无 | 不单建，保留解析教学模型 | 不单建 | P3 |
| E01-02 整数 N 与输出频率 | 已：频率规划/反馈变化 | 无 | 不单建；可链接 LOOP-01 | 不单建 | P3 |
| E01-03 载波、Spur、相噪读图 | 部分：示意与计算例题 | 无 | 引用 NOISE-01/SPUR-01 标准结果，不单建 | 由第12/13章进入 | P2 |

### 第 02 章｜[频率、相位、时间差](chapters/02_频率相位时间差与锁定.html)

新版去向 [A2.1](course/a2-1.html)、[A2.2](course/a2-2.html)、[C2.4](course/c2-4.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E02-01 边沿偏移与相位关系 | 已：JS 时序/公式实验 | 无 | 不单建 | 不单建 | P3 |
| E02-02 反馈频偏累积成相位漂移 | 已：data-study=phase 与局部 lab | 无 | 不单建；可对比 LOOP-01 | 不单建 | P3 |

### 第 03 章｜[从开环到闭环](chapters/03_从开环到闭环.html)

新版去向 [A2.3](course/a2-3.html)、[C2.1](course/c2-1.html)、[C3.4](course/c3-4.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E03-01 CP 脉宽、电荷和电压步进 | 已：脉宽/ΔQ/ΔV 模型 | 无 | 复用 CP-01 | 在 CP-01 中改电流、脉宽、C | P2 |
| E03-02 自由振荡偏差、环路收敛 | 已：方向判断+归一化 PI 模型 | 无 | 复用 LOOP-01 | 修改初始频偏、环路增益/初始状态 | P2 |

### 第 04 章｜[PLL 架构地图](chapters/04_PLL架构地图.html)

新版去向 [A1.1](course/a1-1.html)、[E1.1](course/e1-1.html)、[E3.1](course/e3-1.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E04-01 XOR/CP/ADPLL 路径切换 | 已：data-study=arch | 无 | 不单建：结构识图 | 不单建 | P3 |
| E04-02 平均分频比示意 | 已：α 调节 | 无 | 复用 DSM-01 | 从第15章进入 | P3 |

### 第 05 章｜[参考源与时钟输出链](chapters/05_参考源与时钟输出链.html)

新版去向 [B1.1](course/b1-1.html)、[B1.2](course/b1-2.html)、[B1.3](course/b1-3.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E05-01 R、N、D、Prescaler 频率规划 | 已：data-study=frequency 与计算实验 | 无 | 不单建；复用 LOOP-01 频率规划 | 不单建 | P3 |

### 第 06 章｜[PD/PFD](chapters/06_PD_PFD相位与频率比较.html)

新版去向 [C1.1](course/c1-1.html)、[A2.3](course/a2-3.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E06-01 PFD 输入边沿、UP/DN/RESET 时序 | 已：data-study=pfd 事件模型 | 无 | 可选 PFD-01：Verilog/事件仿真对照 | 改边沿、复位延时、死区参数 | P2 |
| E06-02 复位延时与 anti-backlash/dead-zone | 已：基础讲解和局部参数实验 | 无 | 可选 PFD-01：引入延迟/不匹配模型 | 改 reset delay、传播延迟 | P2 |

### 第 07 章｜[Charge Pump 与 Loop Filter](chapters/07_Charge_Pump与Loop_Filter.html)

新版去向 [C1.2](course/c1-2.html)、[C1.3](course/c1-3.html)、[C1.4](course/c1-4.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E07-01 ΔQ、ΔV、RC 零极点与滤波 | 已：公式/预测/滑块 | 无 | CP-01：加入滤波器 RC、瞬态及扫频 | 改 I、脉宽、R/C、偏置 | P1 |
| E07-02 CP 匹配/失配与 VCTRL 纹波 | 已：data-study=cp | 已：9 组局部 SPICE 预跑曲线，course-cp-data.js | CP-01：整理完整原始波形、网表、日志和参数扫表 | 复制 Notebook，改失配/C/偏置/脉冲 | P0 |

### 第 08 章｜[VCO 与 DCO](chapters/08_VCO与DCO可控振荡器.html)

新版去向 [B2.1](course/b2-1.html)、[B2.2](course/b2-2.html)、[B2.3](course/b2-3.html)、[B3.1](course/b3-1.html)、[B3.2](course/b3-2.html)、[E4.3](course/e4-3.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E08-01 理想 LC 频率、Q 与起振条件 | 已：公式对照与起振说明 | 无（理论公式非仿真） | VCO-01：与真实起振门槛/损耗对比 | 改 L/C/Rs 与偏置 | P0 |
| E08-02 LC VCO 起振、稳态波形、功率 | 已：参数选择、即时曲线切换 | 已：27 组 SKY130 TT/27℃ SPICE 预跑 | VCO-01：波形、FFT、指标和完整工艺模型 | 改 MOS W/L、尾管偏置、L/C/Rs | P0 |
| E08-03 RO 级数与传播延迟 | 已：data-study=ro 理想延迟模型 | 无 | 可选 RO-01：延迟链瞬态 SPICE | 改级数、负载、供电/温度 | P3 |
| E08-04 电容 Bank、DCO 码字与调谐曲线 | 已：data-study=bank 与电容步进 | 无（理想公式） | VCO-02：开关电容 Bank 非线性/PVT 扫参 | 改 bank code、unit C、corner | P2 |

### 第 09 章｜[完整 CP-PLL 动态](chapters/09_完整CP_PLL动态.html)

新版去向 [C2.1](course/c2-1.html)、[C2.2](course/c2-2.html)、[C2.3](course/c2-3.html)、[C2.4](course/c2-4.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E09-01 PFD→CP→VCTRL→VCO 逐周期过程 | 已：逐周期/平均控制教学模型 | 无 | LOOP-01：真实行为/电路联合仿真 | 改 ICP、R/C、初始频偏 | P1 |
| E09-02 实验 9-A：CP、R、C、锁定过程 | 已：实验 9-A 和 data-study=loop9 | 无 | LOOP-01：频偏/控制电压/锁定轨迹全量 | 改带宽、初始条件、锁定判据 | P1 |

### 第 10 章｜[相位域与 Type-I/II](chapters/10_相位域模型与Type_I_II.html)

新版去向 [C3.1](course/c3-1.html)、[C3.2](course/c3-2.html)、[C3.3](course/c3-3.html)、[C3.4](course/c3-4.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E10-01 Type-I/II 与积分器/传递函数 | 已：公式推导与交互 | 无 | 不单建，复用 LOOP-01 | 从第9章进入 | P3 |
| E10-02 实验 10-A：Bode/交越/相位裕量 | 已：6 参数 Bode/附加极点交互 | 无 | LOOP-01：真实环路数值频响和时间域交叉验证 | 改 loop filter、延迟、零极点 | P2 |

### 第 11 章｜[瞬态响应与锁定](chapters/11_瞬态响应稳定性与锁定时间.html)

新版去向 [C2.2](course/c2-2.html)、[C2.3](course/c2-3.html)、[C2.4](course/c2-4.html)、[C3.3](course/c3-3.html)、[C3.4](course/c3-4.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E11-01 误差带、锁定时间、相位阶跃 | 已：data-study=loop11 | 无 | 复用 LOOP-01：从实际仿真轨迹提取 lock time | 改误差带、保持时间、判据 | P2 |
| E11-02 频率阶跃/超调/振铃/Cycle Slip | 已：lab11 含零点的二阶模型 | 无 | LOOP-01：加入非线性饱和/大信号/离散 PFD | 改步进幅度、初始偏置、环路参数 | P1 |

### 第 12 章｜[Phase Noise 与 Jitter](chapters/12_Phase_Noise与Jitter.html)

新版去向 [D1.1](course/d1-1.html)、[D1.2](course/d1-2.html)、[D1.3](course/d1-3.html)、[D2.1](course/d2-1.html)、[D2.2](course/d2-2.html)、[D2.3](course/d2-3.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E12-01 理想载波+周期/随机扰动 | 已：data-study=noise12 | 无 | NOISE-01：有限时间序列及分析窗口示例 | 改时长、采样率、噪声/周期扰动 | P2 |
| E12-02 A 相位偏移↔时间误差 | 已：曲线交互 A | 无 | 不单建 | 不单建 | P3 |
| E12-03 B 合成相噪裙边 | 已：曲线交互 B | 无 | NOISE-01：输入可信噪声源/PSD 数据做对比 | 改谱密度参数与噪声源 | P2 |
| E12-04 C 连续噪声、离散 Spur、RBW | 已：曲线交互 C | 无 | NOISE-01：FFT/窗函数/RBW 数值分析示例 | 改窗口、RBW、离散边带 | P2 |
| E12-05 D Leeson Q/功率/噪声因子 | 已：曲线交互 D | 无 | NOISE-01：先与 VCO-01 比较指标；严格 PN 不冒称 ngspice FFT | 改 Q、Ps、F、corner（模型级） | P2 |
| E12-06 E REF/VCO 噪声传递 | 已：曲线交互 E | 无 | NOISE-01：输出噪声预算与频响计算 | 改 N、带宽、各输入 PSD | P1 |
| E12-07 F 相噪积分→RMS Jitter | 已：曲线交互 F | 无 | NOISE-01：从保存 PSD 积分并导出误差预算 | 改上下限、积分算法、载波 | P1 |
| E12-08 G RJ/DJ 与 TIE 直方图 | 已：曲线交互 G | 无 | NOISE-01：更长时间序列和统计比较 | 改 seed、样本量、随机/周期项 | P2 |
| E12-09 H 完整输出噪声与积分 Jitter | 已：综合实验 lab12 | 无 | NOISE-01：复现多源预算与完整报告 | 改噪声源、滤波器、积分范围 | P1 |

### 第 13 章｜[Spur、非线性与 PVT](chapters/13_Spur非线性与PVT.html)

新版去向 [B3.3](course/b3-3.html)、[D3.1](course/d3-1.html)、[D3.2](course/d3-2.html)、[D3.3](course/d3-3.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E13-01 第7章 VCTRL 纹波→第一对边带 | 已：data-study=spur13，后段为 JS/小调制估算 | 部分：输入复用 CP 的 SPICE 波形，不是 SPICE 频谱 | SPUR-01：真实波形的 FFT 与边带分析，和估算比较 | 改失配、R/C、KVCO、分析长度 | P1 |
| E13-02 CP mismatch/leakage→1~10 次谐波 | 已：lab13 简化等效脉冲 + RC + FM 模型 | 无（计算的是公式估算） | SPUR-01：非理想源与滤波器链路扫参 | 改脉冲、漏电、失配、滤波器、PVT | P1 |

### 第 14 章｜[Integer-N/Fractional-N](chapters/PLL_第14章_Integer-N与Fractional-N.html)

新版去向 [B1.2](course/b1-2.html)、[E1.1](course/e1-1.html)、[E1.2](course/e1-2.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E14-01 N+α 逐拍整数分频与长期平均 | 已：data-study=fractional | 无 | 复用 DSM-01 | 在第15章改 NUM/DEN、分频序列 | P2 |
| E14-02 NUM/DEN、频率步进和序列周期 | 已：课程参数交互/例题 | 无 | 复用 DSM-01 | 改固定字长、溢出、时长 | P2 |

### 第 15 章｜[ΣΔ、MASH 与 Dither](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html)

新版去向 [E2.1](course/e2-1.html)、[E2.2](course/e2-2.html)、[E2.3](course/e2-3.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E15-01 一阶与 MASH 1-1-1 逐拍输出 | 已：data-study=mash 与逐拍比较 | 无 | DSM-01：Python/可选 Verilator 黄金模型对比 | 改 α、字长、seed、拍数 | P1 |
| E15-02 NTF、DFT 频谱与 Idle Tone | 已：理想 NTF、频谱动态对照 | 无 | DSM-01：窗口、PSD 估计、极限环、误差谱 | 改算法/采样点/窗口、字长 | P1 |
| E15-03 Dither 的谱线与噪声底代价 | 已：Dither/seed 调节 | 无 | DSM-01：独立随机种子与统计重复实验 | 改 seed、Dither 类型/幅度 | P1 |

### 第 16 章｜[ADPLL 与数字 PI](chapters/PLL_第16章_ADPLL结构与数字PI.html)

新版去向 [E3.1](course/e3-1.html)、[E3.2](course/e3-2.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E16-01 FCW、目标相位、TDC 量化和 PI 逐拍 | 已：data-study=digital | 无 | ADPLL-01：Python/可选 Verilator 定点时序闭环 | 改 FCW、Kp/Ki、TDC LSB、流水线延时 | P1 |
| E16-02 DCO 控制状态、频偏与锁定 | 已：逐拍归一化行为模型 | 无 | ADPLL-01：量化、饱和、限幅和 DCO 增益偏差 | 改 DCO gain、码宽、初始偏差 | P1 |

### 第 17 章｜[TDC/DTC、DCO 校准](chapters/PLL_第17章_TDC_DTC与DCO校准.html)

新版去向 [E4.1](course/e4-1.html)、[E4.2](course/e4-2.html)、[E4.3](course/e4-3.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E17-01 TDC 量化阶梯/误差 | 已：TDC slider 教学模型 | 无 | CAL-01：TDC 抖动/延迟链与 DNL/INL | 改 LSB、噪声、延迟不均匀 | P2 |
| E17-02 DTC 分数相位→实际延迟码 | 已：DTC 目标与增益误差滑块 | 无 | CAL-01：非线性、测量/校准前后对比 | 改增益偏差/偏移/INL | P2 |
| E17-03 DCO 粗细调与频率码字 | 已：code/gain 教学模型 | 无 | VCO-02/CAL-01：实际码频曲线和 PVT | 改码字、corner、步进/重叠 | P2 |
| E17-04 两点法测量、回写 DCO 增益 | 已：data-study=cal | 无 | CAL-01：有噪声的多点拟合/回环验证 | 改测量次数、拟合方法、增益漂移 | P2 |

### 第 18 章｜[完整系统与指标](chapters/PLL_第18章_完整系统设计与指标.html)

新版去向 [F1.1](course/f1-1.html)、[F1.2](course/f1-2.html)、[F1.3](course/f1-3.html)、[D2.3](course/d2-3.html)、[APP.1](course/app-1.html)、[APP.2](course/app-2.html)。

| ID / 实验 | L1 当前 | L2 当前 | L3 拟建 | L4 拟建 | 优先级 |
|---|---|---|---|---|---|
| E18-01 参考频率、N+α、输出频率规划 | 已：频率规划实验 | 无 | 不单建，复用 LOOP-01/DSM-01 | 从子实验进入 | P3 |
| E18-02 逐拍 PI/DCO 闭环 | 已：逐拍交互 | 无 | 复用 ADPLL-01 | 从第16章进入 | P2 |
| E18-03 规格验收：锁定、Jitter、Spur | 已：data-study=accept 教学预算/判定 | 部分：Spur 指标引用第7章 SPICE 纹波，其余为行为/预算模型 | SYS-01：汇总 LOOP/NOISE/SPUR/ADPLL 输出，生成可追溯验收报告 | 改规格、corner、实验组合 | P2 |


## 4. 共享的 L3/L4 标准实验包（避免同一闭环仿真重复造轮子）

| 实验包 | 对应章节 | 引擎 | L3 完整保存内容 | L4 可改参数 | 优先级 |
|---|---|---|---|---|---|
| CP-01 | 07，复用03/13/18 | ngspice；局部 CP/RC SPICE | UP/DN、净电流、VCTRL 波形、周期纹波、参数扫描表；每条结果对应网表/条件 | IUP/IDN、重叠脉冲、R/C、Vbias、周期；输出 `vctrl.csv` | P0 |
| VCO-01 | 08，复用12 | ngspice + SKY130 开放模型 | 27组基线+详细起振/稳态波形、FFT、频率/幅度/功耗、状态判定；不冒称严格相噪 | L/C/Rs、MOS W/L、尾管偏置、kick、温度和可用corner | P0 |
| LOOP-01 | 09/11，复用03/10/18 | Python/SciPy离散行为模型；可补 ngspice 模拟子电路 | 环路状态、PFD脉冲、VCTRL、输出/反馈相位、Lock Time、频响/PM对照 | ICP、R/C、KVCO、N、初始频偏、饱和、延迟、判据 | P1 |
| SPUR-01 | 13，复用07/12/18 | CP 纹波数据 + Python 时频分析，必要时联动SPICE | VCTRL-频偏-相位-FM-FFT全链路；窗函数、RBW、spur dBc；与小信号估算比较 | 失配、泄漏、PFD、KVCO、FFT窗/时长、PVT | P1 |
| NOISE-01 | 12，复用18 | Python/NumPy/SciPy 噪声模型和统计；外加可靠外部PSD可导入 | dBc/Hz、RBW、积分抖动、分源贡献、TIE/直方图；明确模型与实测来源 | 噪声参数、f1/f2、种子、样本长度、采样率、窗口 | P1 |
| DSM-01 | 15，复用14 | Python 黄金模型 + 可选开源 Verilator | MASH序列、误差整形、平均值、有限时长DFT/PSD、定点溢出与参考校验 | α、NUM/DEN、字长、dither、seed、样本数 | P1 |
| ADPLL-01 | 16，复用17/18 | Python定点/事件模型 + 可选 Verilator RTL | FCW→相位计数/TDC→PI→DCO时序、校准前后、锁定/噪声/定点误差 | Kp/Ki、TDC LSB、延时、DCO增益、限幅、频偏、码宽 | P1 |
| VCO-02 | 08/17 | ngspice 或数据驱动码频模型；模型来源要独立标注 | cap bank / DCO 码频曲线、步进、INL、PVT与覆盖范围 | bank code、单元C、寄生、corners | P2 |
| CAL-01 | 17 | Python/开源 SPICE，分 TDC / DTC / DCO 子实验 | TDC/DTC 量化和 DNL/INL、误差源、DCO 测量与回写 | LSB、失配、噪声、增益、采样数、拟合/校准策略 | P2 |
| SYS-01 | 18 | 从上面已发布数据聚合，不重新发明新模型 | 指标表：规格+数值+条件+模型等级+验证来源；可追溯报告 | 参数/规格门限、corner、选定实验run | P2 |
| PFD-01 | 06 | 事件仿真或 Verilator 小型 RTL | UP/DN/RESET 实时事件、非重叠与reset延迟对照 | edge offset、drift、延迟、脉宽 | P2可选 |
| RO-01 | 08 | ngspice 简化 RO | 瞬态频率/延迟/功耗与级数、负载、供电关系 | 级数、驱动强度、负载、VDD、温度 | P3可选 |

共享原则：同一 L3 实验包可以支持多个章节的 L2；每章页内只显示最能帮助读者理解的少量参数与曲线，L3 则保存完整的 raw/metrics/logs。一个 L3 包可有多个 Notebook，但应统一实验 ID 与数据 schema。

**当前交付。** [F1.2 耦合行为实验](course/f1-2.html) 在同一 40 MHz、N=125 配置下依次比较线性 VCO、分段 VCO 及加入 CP 失配/复位延迟的捕获轨迹。分段频率和 CP 参数均为可追溯的教学设定。实际 SKY130 调谐扫参、CP 标定及同工况 EVM 逐源噪声仍待补齐。

**完整 CP-PLL 大实验。** `LOOP-01` 共用模型和绘图代码，分别运行 LMX2594EVM 公开工况和自建 SKY130 配置。公开工况先交付设计点频响复算，自建配置先交付接入 `VCO-01` 调谐曲线前后的闭环对照。`SPUR-01` 以 AN143 Fig. 8/Table 1 验证，再处理 `CP-01` 纹波。`NOISE-01` 按匹配工况对照 EVM 相噪，`SYS-01` 分配置验收。[新版目录与分步实验](docs/JKU_PLL_REDESIGN.md)

## 5. 发布路径与数据流水线

```text
GitHub (唯一主版本：netlist / models声明 / scripts / notebooks / manifest)
     ├─ L1: HTML JavaScript 公式/行为模型（独立、离线、<10秒）
     └─ 作者在 Kaggle 等运行标准实验
           └─ L3 原始结果：完整 waveform/PSD/metrics/logs/version
                 ├─ 发布已运行 Notebook：读者免登录看（需验证访客访问）
                 ├─ 导出 L2：抽点/分段保存 JSON + 标签 + 精度检验
                 │     └─ 教程 HTML 直接加载本地结果，无网络也能看
                 └─ L4：读者登录平台，复制原 Notebook 修改参数再运行
```

### 文件标准（提案，不立即改动现有目录）

每个实验在 GitHub 同一源码下记录：
- `experiment.yaml`：唯一ID、所属章节、物理量和单位、仿真引擎、可调参数（默认/上下界/单位）、运行版本、参考资料、结果描述和模型适用范围。
- `run.sh` / `simulate.py`：无需 Notebook 交互也能本地运行；避免把仿真逻辑只写在 Kaggle 单元格里。
- `notebook.ipynb`：说明、默认参数、真实仿真运行、指标与绘图、CSV/JSON 导出。
- `raw/` 与 `metrics.csv`：完整数据供 L3；大数据用发布版本/外部 artifact 持久化，不把整波形塞进课程 HTML。
- `export_l2.py` 与 `l2.json`：**由同一 L3 执行输出**；统一 units、time axis、有效位数、下采样、量纲、实验来源与 commit hash。
- `validate.py`：对 L2 与 L3 的显示关键值进行数值校验，确保波形压缩后峰值、频率、Spur、jitter 等结论不走样。

**频谱数据特别要求：** 区分振荡器瞬态 FFT 与真实 phase-noise PSD/PSS-PNoise；不能把 FFT 噪声底当相噪。标注 window、RBW/ENBW、样本时间、FFT 单位 (dB/bin、dBc、dBc/Hz) 和积分带宽；算法行为模拟与晶体管级结果必须分开。振荡器只用 ngspice 瞬态结果时不能声称完成严格的相位噪声电路仿真。

### 统一验收（逐实验完成时打勾）

- [ ] L1：公式/教学假设与动态曲线对应，单位清楚；无远程服务也能用；实际 Edge/手机验证。
- [ ] L2：数据来自明确真实运行而非 JS 公式缓存；有版本、工作点、原始数据对应关系；不存在未注明的插值/外推；加载在目标秒级。
- [ ] L3：作者 Notebook 在清洁环境完成运行，结果包含原始数据、日志、参数、版本、异常情况；公开后无登录访问测试通过。
- [ ] L4：另一个账号/洁净会话可复制、安装依赖、调至少两项参数、运行并检查与 L3 差异；GPU 非必需；计算时间和配额限制已说明。
- [ ] 所有数据：原理模型/行为模型/SPICE/RTL/实测标记明确；公开 PDK/模型授权核对；数据不可含私有 RTL、敏感 Token 或公司资料。

## 6. 建设顺序：先打通闭环，不要先铺满 18 章

| 阶段 | 范围 | 交付边界 |
|---|---|---|
| **P0 / 发布前准备** | **CP-01 第7章 + VCO-01 第8章** | 核对 ZIP 内脚本、生成标准 notebook+run/manifest、复跑并生成 raw/metrics/export_l2；本阶段不触及 Kaggle 发布 |
| **可并行的发布验证** | **把 VCO-01 发到 Kaggle，验证 L3/L4** | 作者发布已执行的 Notebook，验证公开匿名阅读、洁净账号复制执行；检查 ngspice + SKY130 模型与输出留存。**这项尚未开始** |
| P1 | LOOP-01、SPUR-01、NOISE-01 | EVM 频响、边沿捕获、自建 VCO 替换、AN143 杂散验证和同工况相噪对照 |
| P2 | SYS-01、DSM-01、ADPLL-01、VCO-02、CAL-01；可选 PFD-01 | 交付整机验收；完成 E1–E4 的分数-N、定点、校准及 PVT 实验迁移 |
| P3 | 基础知识图表和可选 RO-01 | 原则上保留 L1，引用已有 L3，不必为了级别而制造计算包 |

## 7. 对课程大纲的影响（本轮定稿建议）

- **阅读目录重排为 A–F。** 本文件的旧 01–18 章是实验迁移索引，实验 ID 继续用于现有链接。A1/F1 前后对照整机，B–D 按模块带入大实验，E1–E4 保留 Fractional-N 与 ADPLL 两条分支。
- 每个有实验的小节，未来统一一个“实验级别 / 模型类型 / 当前结果 / 查看完整 L3 / 复制运行 L4 / 下载本地包”信息栏；未发布的入口不显示失效链接。
- 第 07、08、09、12、13、15、16、17、18 章为深度实验主线；第 10/11 是环路模型与性能验证；第 01–06 章以 L1 入门为主。
- L3 与 L4 不替代网页 L1/L2。网站依然必须可离线；云端失败不得影响教程访问。
- 维护此文件为**实验级真实状态的唯一台账**；`pll/PROGRESS.md` 仍记录章节与曲线改造历史，`docs/COURSE_ROADMAP.md` 只给总体方法和入口。
- 后续每次完成一个实验：同时更新本文件状态、课程页面链接、数据 manifest、`pll/PROGRESS.md` 和 CHANGELOG；不得只凭Notebook上传成功就标记 L4 完成。

## 8. 下一步发布前必须解决的三个问题

1. Kaggle 的公开 Notebook 能否由未登录读者完整查看结果及下载原始数据？用无痕窗口实测。
2. Kaggle CPU 环境能否一键部署 ngspice 和模型，并完成第 08 章的 27 组基线？用洁净会话验证依赖、模型文件和会话超时。
3. Notebook 保存的完整结果是否能自动导出与当前 HTML 相同或更可靠的 L2 数据？必须有数值核对与自动化测试。

**本次只记录方案与现状，不提前宣称上述三个问题已经验证成功。**
