# B1.2 交互改造规格：复刻 TICS Pro 频率链界面，建立 LMX2594 Frequency Planner

> 日期：2026-11-17  
> 状态：**设计规格已完成；尚未实施网页修改**  
> 目标页面：\`pll/course/b1-2.html\`（现有页面改造，不新建重复章节）  
> 课程位置：B1.2「一张表算清频率链」  
> 主要参考：TI SNAU210B Fig. 3-1、TI LMX2594 数据手册 SNAS696C Rev. C  
> 实施约束：本文件只定义设计与验收。实现工作应在当前 PLL 阶段 1 课程整理/冻结完成后，由 Work 模式按本文执行；除非用户另行明确授权，不要提前修改 HTML/JS。

## 0. 设计结论

本页应改造成一个**以 TI TICS Pro Fig. 3-1 为视觉布局参考、以信号流为主线的可交互频率规划器**。

关键决定：

1. **界面要复刻 Fig. 3-1 的整体组织和信号关系**，而不是改成普通表单、卡片计算器或纯粹的通用框图。
2. 参考输入、每级倍频/分频、PFD、N Divider、VCO、Channel Divider、RFout 的位置关系要一眼能看清。
3. 在每个信号节点/模块输出处增加动态频率值。例如 OSCin=100 MHz，经过 Doubler 后立即显示 200 MHz，并继续向后传播。
4. 在关键模块下方增加状态文字：是否满足芯片规格、是否在 VCO 工作范围、是否接近边界、是否有需要进一步评估的性能权衡。
5. 保留 TI LMX2594 默认配置作为可恢复的教学基准。
6. 增加 Mode A（正向计算）、Mode B（目标反推）、Mode C（方案对比）。三种模式共用同一张频率流界面，不应切换成三套完全不同的 UI。
7. Mode C 第一版**不依赖新的 SPICE 仿真**。频率、合法性、分辨率和数据手册定义的 PLL 核心噪声估算可以计算；绝对相噪、真实 Spur 幅度、非线性锁定行为等必须有相应模型、仿真或测量证据。
8. 第一版是 L1 交互；可叠加 TI 数据手册曲线作为有明确来源的参考数据。后续才接入 L2 仿真数据、L3/L4 Notebook。

一句话目标：

> 用户给定参考频率和目标输出频率，能够沿着一张与 TICS Pro Fig. 3-1 相似的界面，看清每个节点的频率如何变化、配置是否合法、VCO 是否在合适工作区，并比较不同规划方案的代价。

---

## 1. 现有页面与改造边界

### 1.1 现有资产

当前 main 中已存在：

- \`pll/course/b1-2.html\`：标题「一张表算清频率链」。
- 页面已有通用 Integer-N 频率链说明。
- 页面已有 JKU Fig. 97 参考倍频原图及来源链接。
- 页面已有 TI LMX2594 频率链和默认 EVM 配置相关内容。
- \`pll/course/b1-3.html\`：解释 PFD 频率变化带来的影响。
- \`pll/course/c3-3.html\`：已有 EVM 环路滤波器与 Bode 图分析。
- \`pll/course/d2-3.html\`：已有公开 EVM 实测相噪曲线读图。
- \`pll/course/course.css\`、\`course.js\`：当前课程共享样式和交互代码。

### 1.2 必须遵守的改造原则

1. 改造现有 B1.2，不创建另一个 B1.2 或新的同义页面。
2. 保留原有通用 Integer-N 公式和 JKU Fig. 97 教学内容；可以重新组织顺序，但不能无理由删除。
3. 把 TI LMX2594 作为具体芯片案例，不要把 LMX2594 的限制写成所有 PLL 的通用规律。
4. B1.2 负责频率规划；B1.3 继续解释 PFD 频率的系统影响；C3.3 负责滤波器设计。三页应相互链接，避免 B1.2 变成一个过度庞大的 PLL 设计软件。
5. 页面保持离线可用，优先原生 HTML/CSS/SVG/JavaScript，不引入必须联网的依赖。
6. 本页只计算频率规划和有明确模型依据的指标，不实现 SPI 寄存器写入，不声称能替代 TICS Pro。
7. 不把 TI 的受版权保护截图直接作为网页背景。按原图的结构、字段关系和布局自行绘制可交互界面，并保留原图来源链接。

---

## 2. 教学目标：本页究竟要教会什么

读者完成本页后，应能独立回答：

1. OSCin、PFD、VCO、RFout 分别是什么频率，为什么不是同一个数值？
2. OSCin Doubler、Pre-R、Multiplier、Post-R 分别改变哪一级频率？
3. PFD 的输入频率如何计算？
4. N Divider 为什么有整数 N 和 NUM/DEN 两部分？
5. 为什么 VCO 频率通常高于最终 RF 输出频率？
6. 为什么必须检查 VCO 工作范围，而不能只看输出频率是否算对？
7. 同一个 RFout 为什么可以由不同的 PFD、N、NUM/DEN、Channel Divider 组合得到？
8. 提高 PFD 频率、减小 N、使用 Fractional-N 分别带来什么收益和代价？
9. 哪些指标可以由公式直接算出，哪些只能做趋势估算，哪些必须经过仿真或实测？
10. 频率规划完成后，为什么还需要单独设计 Loop Filter？

### 教学顺序

建议页面按以下顺序引导：

1. 先展示 TI Fig. 3-1 风格的完整界面，让读者知道自己正在看什么。
2. 默认加载 TI 的 100 MHz → 200 MHz → 14 GHz → 7 GHz 配置。
3. 沿信号流逐个点亮模块，解释每个节点频率。
4. 让读者修改一个参数，观察后续节点的频率一起变化。
5. 展示硬件约束和 VCO 工作区状态。
6. 再切换到目标反推和方案对比，理解工程上为什么有多种解。
7. 最后引出 PFD、N、相噪、Spur 和 Loop Filter 的权衡，链接到 B1.3、C3.3、D2.3。

---

## 3. 主界面：以 TI TICS Pro Fig. 3-1 为布局基准

### 3.1 原图和来源

- TI LMX2594 EVM Instructions, SNAU210B, Fig. 3-1，PDF 第 5 页：
  https://www.ti.com/lit/ug/snau210b/snau210b.pdf#page=5
- TI LMX2594 数据手册 SNAS696C Rev. C：
  https://www.ti.com/lit/ds/symlink/lmx2594.pdf

实现时应打开原 PDF 的 Fig. 3-1，逐项核对字段、模块和位置。本文定义动态教学信息，不代替对原图字段的实际核对。

### 3.2 布局要求

**核心要求：用户打开页面，第一眼看到的仍然是类似 Fig. 3-1 的 TICS Pro 配置界面，而不是一张普通流程图。**

- 尽可能保留原图的区域划分、字段密度、模块相对位置和信号流方向。
- 保留原图中可识别的配置字段和功能模块名称，必要时在旁边增加中文解释。
- 将原图中的静态数字替换为可编辑值或动态计算值。
- 不要求逐像素复制 TI 的软件皮肤，但要保持“像在看 TICS Pro 配置界面”的整体感觉。
- 用原生 HTML/CSS/SVG 重建，不把原截图铺成背景，也不把交互控件做成覆盖截图的透明热区。
- 字段和动态数字要清晰可读；不要为了视觉复刻牺牲频率数值的可读性。

### 3.3 必须呈现的信号路径

#### 参考输入路径

按真实信号顺序显示：

\`OSCin → OSCin Doubler → Pre-R Divider → Multiplier → Post-R Divider → PFD\`

每个模块旁显示当前配置；每个模块输出的信号线上/下方显示当前频率：

| 节点 | 默认值 | 动态显示 |
|---|---:|---|
| OSCin | 100 MHz | \`Fosc = 100 MHz\` |
| Doubler 输出 | ×2 | \`200 MHz\` |
| Pre-R 输出 | ÷1 | \`200 MHz\` |
| Multiplier 输出 | Bypass | \`200 MHz\` |
| Post-R 输出 / PFD 输入 | ÷1 | \`Fpd = 200 MHz\` |

必须让读者看出：频率数值是沿信号路径逐级变化的，而不是在页面某个角落只显示最终答案。

#### 反馈路径

显示：

\`VCO → N Divider (N + NUM/DEN) → PFD feedback input\`

至少显示：

- VCO 输出频率 \`Fvco\`。
- 整数分频 N。
- 分子 NUM、分母 DEN。
- Fractional 部分 NUM/DEN。
- 总分频比 \`Ntotal = N + NUM/DEN\`。
- 反馈频率 \`Ffb = Fvco/Ntotal\`。
- 锁定频率关系 \`Ffb = Fpd\`。

在锁定状态下，显示 PFD 两个输入的频率相等；要强调“频率相等”不代表任意时刻相位差都为零，锁定时仍可能存在由 CP 脉冲、死区和非理想因素造成的相位偏移/纹波。

#### VCO 区域

VCO 是主界面中最重要的状态点，至少显示：

- \`Fvco\` 当前频率。
- LMX2594 VCO 总范围 7.5–15 GHz。
- 当前所属 VCO Core（VCO1～VCO7）。
- 当前 Core 对应的 KVCO 估算值（如果启用该显示）。
- 频率合法性状态。
- 距离 Core 边界或总范围边界的说明。

默认示例：14 GHz 落在 VCO7（13.9–15 GHz）频段内。根据数据手册 Table 7 的端点线性插值，KVCO 约为：

\[
K_{\mathrm{VCO}}\approx182+(239-182)\frac{14.0-13.9}{15.0-13.9}
\approx187.2\ \mathrm{MHz/V}
\]

这应标注为**数据手册端点线性插值估算**，不是该 EVM 在当前板卡/温度/电压下的实测 KVCO。

#### 输出路径

显示：

\`VCO → Channel Divider → RFoutA / RFoutB\`

至少显示：

- Channel Divider 当前分频值。
- Channel Divider 的实际分段组合（如果数据手册 Profile 已实现）。
- RFoutA、RFoutB 各自的输出选择/启用状态。
- 每个输出端口的最终频率。
- 如果输出直接选择 VCO，而不是 Channel Divider，要显示 Bypass/Direct 模式，不能仍然把频率除以 CHDIV。

### 3.4 动态频率标签规则

每个模块的输入和输出值要有明确区别。例如：

- 模块输入：\`200 MHz\`
- 模块：\`Post-R ÷ 1\`
- 模块输出：\`200 MHz\`

参数改变时：

1. 立即重新计算所有下游节点。
2. 上游未受影响的节点保持原值。
3. 发生非法组合时，不要继续显示一个看似正常的绿色最终输出；应显示错误原因和受影响的后续节点。
4. 若某个输出被关闭，显示 Disabled，而不是显示一个仍然有效的输出频率。
5. 所有频率统一内部使用 Hz 计算，显示时按 Hz/kHz/MHz/GHz 自动格式化；避免浮点误差导致显示 6999.999999 MHz。

### 3.5 频率值下方的状态提示

每个关键模块下面增加短状态文字：

- \`PASS · 在器件规格范围内\`
- \`WARN · 参数合法，但性能权衡需要进一步评估\`
- \`FAIL · 超出器件硬约束\`
- \`INFO · 该指标需要模型/仿真/实测数据\`

状态要有颜色，但不能只依赖颜色：

- 绿色：硬件约束通过。
- 黄色/橙色：合法但需要注意，或接近用户设定的安全边界。
- 红色：违反硬件硬约束。
- 灰色：当前无法判断/没有数据。
- 蓝色：参考数据或估算值。

**必须把“规格合法性”和“设计优劣”拆开显示。**

例如 VCO=14 GHz：
- 合法性：绿色，处于 7.5–15 GHz 范围内。
- 工作 Core：VCO7。
- 设计建议：不能仅凭“在范围内”就说它是最优点；若没有相噪、功率、KVCO 和温度等依据，应标记“性能需结合后续指标评估”。

不得自行定义一个未经数据手册或验证支持的“最佳 VCO 频率”。若要提示“接近边界”，应依据器件 Core 区间或用户可配置的 margin，并说明这是提醒，不是 TI 官方的 Good/Bad 分类。

---

## 4. 默认配置：TI SNAU210B Fig. 3-1

默认配置应作为页面一键恢复的第一个 Preset，逐项核对原图后录入。

当前按 Fig. 3-1 的可见配置建立的教学基准如下；实施前必须再用原图/TICS Pro 配置核对字段：

| 参数 | 默认值 | 说明 |
|---|---:|---|
| OSCin | 100 MHz | 参考输入 |
| OSCin Doubler | Enabled, ×2 | 参考倍频 |
| Pre-R | 1 / Bypass | 前置分频 |
| Multiplier | Bypass / effective ×1 | 注意 MULT=1 表示 Bypass，不是启用 ×1 有源倍频 |
| Post-R | 1 / Bypass | 后置分频 |
| Fpd | 200 MHz | PFD 频率 |
| N | 70 | 整数分频 |
| NUM | 0 | 整数模式 |
| DEN | 按原图保留 | Integer mode 下不影响当前整数比值 |
| MASH_ORDER | 0 | Integer mode |
| Fvco | 14 GHz | VCO 频率 |
| Channel Divider | ÷2 | 输出分频 |
| RFoutA | 7 GHz | 若输出选择 Channel Divider |
| RFoutB | 按原图 | 保留原图实际输出设置，不自行假定与 A 完全相同 |

计算：

\[
f_{\mathrm{PD}}=
\frac{100\ \mathrm{MHz}\times2\times1}{1\times1}
=200\ \mathrm{MHz}
\]

\[
N_{\mathrm{total}}=70+\frac{0}{DEN}=70
\]

\[
f_{\mathrm{VCO}}=200\ \mathrm{MHz}\times70=14\ \mathrm{GHz}
\]

\[
f_{\mathrm{RFout}}=\frac{14\ \mathrm{GHz}}{2}=7\ \mathrm{GHz}
\]

### 4.1 必须区分的第二个 TI 参考配置：Table 4-1 Loop Filter

SNAU210B Table 4-1 还给出一个环路滤波器设计参考：

| 参数 | TI Table 4-1 |
|---|---:|
| VCO Gain | 132 MHz/V |
| Loop Bandwidth | 285 kHz |
| Phase Margin | 65° |
| C1_LF | 390 pF |
| C2_LF | 68 nF |
| C3_LF | Open |
| C4_LF | 1800 pF |
| R2 | 68 Ω |
| R3_LF | 0 Ω |
| R4_LF | 18 Ω |
| Effective Charge Pump Gain | 15 mA |
| Phase Detector Frequency | 200 MHz |
| VCO Frequency Designed for | 15 GHz（文档说明可在整个 VCO 范围工作） |

这组数据与 Fig. 3-1 默认配置不是同一张配置快照。**不要把 Table 4-1 的 KVCO=132 MHz/V 直接覆盖到 Fig. 3-1 的 14 GHz 频率规划上，也不要把数据手册 VCO Core 插值得到的 KVCO 当成 Table 4-1 的滤波器设计输入。**

实现时建议保留两个独立 Preset：

1. \`TICS Pro Fig. 3-1 Default Frequency Plan\`：用于频率链教学。
2. \`TI EVM Table 4-1 Loop Filter Reference\`：用于后续环路滤波器计算/对比。

两个 Preset 的参数来源和用途要明确标注。若页面显示 Fig. 3-1 的 VCO Gain 字段，应以原图为准，并和数据手册 Table 7 的 KVCO 估算分开说明。

---

## 5. Mode A：正向计算（复刻 TICS Pro 的主要交互）

### 目标

用户直接修改原图里的配置字段，页面实时计算各节点频率。

### 控件

- OSCin Frequency。
- OSCin Doubler：Bypass / ×2。
- Pre-R Divider。
- Multiplier：Bypass / ×3 / ×4 / ×5 / ×6 / ×7。
- Post-R Divider。
- N Divider Integer。
- NUM。
- DEN。
- MASH_ORDER：0～4。
- Channel Divider。
- OUTA_MUX / OUTB_MUX：VCO Direct / Channel Divider（其他功能如 SYSREF 可先显示但不在第一版频率规划中深入实现）。
- Output A/B Enable。

### 交互行为

- 所有参数修改后即时更新。
- 可逐项点击模块，显示公式、参数解释、输入/输出频率。
- 提供“沿信号流走一遍”引导：点击 Next 后依次高亮 OSCin、Doubler、Pre-R、Multiplier、Post-R、PFD、N、VCO、Channel Divider、RFout。
- 默认加载 Fig. 3-1。
- 一键恢复默认配置。
- 支持复制当前配置摘要（参数、频率和状态）。

### 本模式教学重点

- 不是只得到一个 Fout，而是看清频率每经过一级模块怎样变化。
- 反馈路径中的 N Divider 决定 VCO 与 PFD 的锁定频率关系。
- 输出分频在输出路径，不应误认为它也参与了基本 N-divider 反馈比（除非具体同步模式配置改变了反馈关系，第一版先不模拟 SYNC 特殊路径）。

---

## 6. Mode B：目标反推（Frequency Planner）

### 目标

用户输入参考频率和目标输出频率，页面自动搜索满足 LMX2594 硬约束的配置组合。

### 输入

- OSCin Frequency。
- Target RFout Frequency。
- Output Path：VCO Direct / Channel Divider。
- Integer-only / Allow Fractional-N。
- 期望的 PFD 区间或目标 PFD。
- DEN（用户指定或允许自动选择）。
- MASH_ORDER。
- 最大允许频率误差。
- 是否优先较高 PFD、较小 N 或 Integer-N。

### 反推过程

1. 根据目标 Fout 和输出模式，反推目标 Fvco。
2. 枚举 LMX2594 允许的 Channel Divider。
3. 枚举参考路径组合：Doubler、Pre-R、Multiplier、Post-R。
4. 计算每个组合的 Fpd。
5. 计算 \`Ntotal = Fvco/Fpd\`。
6. Integer-only 时检查 Ntotal 是否为整数。
7. Fractional-N 时，根据 DEN 计算 NUM，检查舍入误差和寄存器范围。
8. 检查 PFD 最大/最小频率、N 最小值、VCO 范围、Channel Divider 合法组合、参考输入范围和各级输入频率。
9. 去掉不合法候选。
10. 对剩余候选进行多维度比较，不要只按一个“综合分数”排序。

### 输出

每个候选方案显示：

- Fpd。
- N。
- NUM/DEN。
- Ntotal。
- Fvco。
- Channel Divider。
- RFout。
- 频率误差。
- Integer/Fractional。
- 频率分辨率。
- 硬件约束状态。
- 需要进一步评估的性能权衡。

### 方案筛选原则

- 先剔除硬件非法方案。
- 再区分 Integer-N 和 Fractional-N。
- 再比较 PFD、N、频率步进、PLL 核心噪声估算。
- 不要未经用户选择就给出一个不可解释的“最佳方案”。
- 结果中保留至少数个有代表性的候选，而不是只给唯一答案。

---

## 7. Mode C：频率规划方案比较器（本次重点）

### 7.1 目标

同一个目标输出频率通常存在多种频率规划组合。Mode C 的目标是帮助读者理解：

- 哪些组合都能实现目标频率？
- 哪个组合的 PFD 更高？
- 哪个组合的 N 更小？
- 哪个组合是 Integer-N，哪个是 Fractional-N？
- 频率步进分别是多少？
- PLL 核心噪声趋势有什么差异？
- 哪些性能结论可以直接计算，哪些只是估算，哪些必须仿真？

### 7.2 第一版不依赖 SPICE

**频率规划器不是电路仿真器。** 频率链和寄存器组合的搜索是离散约束求解问题，使用 JavaScript 公式和枚举即可完成。为了计算 100 MHz ×2 = 200 MHz、N=70、VCO=14 GHz、输出 7 GHz，没有必要启动 SPICE。

Mode C 第一版分成三类信息：

#### A. 公式可精确计算

- Fpd。
- Fvco。
- Fout。
- Ntotal。
- Integer/Fractional。
- 频率误差。
- 频率分辨率。
- PFD / N / Channel Divider / VCO 是否满足器件硬约束。

对于固定 DEN，NUM 增加 1 时：

\[
\Delta f_{\mathrm{VCO}}=\frac{f_{\mathrm{PD}}}{DEN}
\]

若输出经过 Channel Divider：

\[
\Delta f_{\mathrm{OUT}}=\frac{f_{\mathrm{PD}}}{DEN\cdot CHDIV}
\]

Integer-N 的相邻整数 N 输出间隔则为：

\[
\Delta f_{\mathrm{OUT,int}}=\frac{f_{\mathrm{PD}}}{CHDIV}
\]

这可以直接解释：Integer-N 的频率网格由 Fpd 和输出分频决定；Fractional-N 通过 NUM/DEN 把网格进一步细化。

#### B. 数据手册模型可估算

TI LMX2594 数据手册给出 PLL 核心噪声的归一化模型。可在 Mode C 中增加一个可展开的“PLL Core Noise Estimate”区域。

数据手册公式：

\[
PN_{\mathrm{PLL,flat}} =
FOM_{\mathrm{PLL}}
+20\log_{10}\left(\frac{f_{\mathrm{VCO}}}{f_{\mathrm{PD}}}\right)
+10\log_{10}\left(\frac{f_{\mathrm{PD}}}{1\ \mathrm{Hz}}\right)
\]

\[
PN_{\mathrm{PLL,1/f}}(\Delta f)=
PN_{\mathrm{PLL,1/f,norm}}
+20\log_{10}\left(\frac{f_{\mathrm{VCO}}}{1\ \mathrm{GHz}}\right)
-10\log_{10}\left(\frac{\Delta f}{10\ \mathrm{kHz}}\right)
\]

两部分在线性功率域相加：

\[
PN_{\mathrm{PLL,total}}=
10\log_{10}\left(
10^{PN_{\mathrm{flat}}/10}
+10^{PN_{\mathrm{1/f}}/10}
\right)
\]

LMX2594 数据手册典型归一化参数：
- PLL Flat FOM：约 -236 dBc/Hz。
- Normalized PLL 1/f Noise：约 -129 dBc/Hz。

**重要限制：** TI 说明这些 PLL 噪声贡献是在干净参考源和宽环路带宽条件下测得/定义的核心噪声模型。它不是完整输出端的总相噪。它不自动包含参考源相噪、VCO 噪声、CP/滤波器/分频器噪声传递、输出 Divider Additive Noise、PCB 耦合和板级杂散。

因此 UI 标签必须是：
- \`TI datasheet normalized PLL-core estimate\`
- \`估算值，不是本次配置的 SPICE 结果或 EVM 实测结果\`

不能把它命名为“最终输出相噪”。

TI 数据手册还明确指出：
- 提高 PFD 频率可以改善 PLL 平坦噪声区。
- OSCin Doubler 增加的噪声较小，可用于提高 PFD。
- Programmable Multiplier 用于移动整数边界、降低整数边界杂散，但它会使 PLL FOM 变差。

因此不能简单地把“PFD 越高”当作永远正确的最佳方案。应同时显示参考源质量、Multiplier 使用情况、PFD 上限、N、环路带宽和杂散风险等权衡。

#### C. 必须依赖进一步模型/仿真/实测

下面这些不能仅凭 Fosc、Fpd、N、NUM/DEN、Fvco 算出准确数值：

- Fractional Spur 的实际幅度。
- Integer Boundary Spur 的实际幅度。
- CP mismatch / leakage 导致的参考杂散。
- 实际输出端完整相噪曲线。
- 最终 RMS Jitter。
- 非线性捕获时间、Cycle Slip 和锁定时间。
- 电源噪声到 RF 输出的真实耦合量。
- VCO 的实际振幅、功耗、KVCO 和温度变化（若没有对应测量/模型数据）。

这些项目可显示：
- \`需要进一步模型/仿真\`
- \`暂无可追溯数据\`
- 或链接到已有实验页。

不允许仅凭 Fractional-N 的 NUM/DEN 就给出虚构的 Spur dBc 数字。

### 7.3 推荐比较表

| 指标 | Scheme A | Scheme B | Scheme C |
|---|---:|---:|---:|
| Fpd | 200 MHz | 100 MHz | 200 MHz |
| N | 70 | 140 | 70.001 |
| NUM/DEN | 0/Integer | 0/Integer | 1/1000 |
| Fvco | 14 GHz | 14 GHz | 14.0002 GHz |
| CHDIV | 2 | 2 | 2 |
| RFout | 7 GHz | 7 GHz | 7.0001 GHz |
| 类型 | Integer-N | Integer-N | Fractional-N |
| 输出频率步进 | 100 MHz | 50 MHz | 100 kHz |
| PLL 核心噪声 | 按 TI FOM 估算 | 按 TI FOM 估算 | 按 TI FOM 估算，需考虑 Fractional 模式条件 |
| Spur 幅度 | 未仿真/未测量 | 未仿真/未测量 | 未仿真/未测量 |

说明：
- A 和 B 是同一个 7 GHz 输出目标的两个不同 Integer-N 方案。
- C 是 7.0001 GHz 的 Fractional-N 示例，用于说明细频率步进；不能把 C 误写成同一个 7 GHz 的等价方案。
- 100 MHz / 200 MHz 等输出步进是对应固定输出分频条件下，整数 N 增加 1 的频率网格，不是 PLL 的锁定误差或频率准确度。

### 7.4 推荐显示的方案评价维度

分成三列，不合并成一个神秘分数：

1. **Hardware Feasibility**：PASS / FAIL。
2. **Design Trade-off**：高 PFD、较小 N、整数模式、分辨率、Multiplier FOM 等。
3. **Evidence Level**：公式精确计算 / TI 数据手册估算 / 已有 L2 仿真 / 公开实测 / 暂无数据。

### 7.5 Fractional-N 风险提示

- 显示 MASH_ORDER。
- 显示 NUM/DEN 和化简后的分数。
- 可显示 \`DEN/gcd(NUM,DEN)\` 作为简单分数序列周期的参考。
- 明确这只是理想数字序列的周期线索，不是 Spur 幅度预测。
- Dither、MASH 阶数、有限字长、CP mismatch、参考泄漏和环路滤波器都会影响最终谱线。
- 若后续接入 E1.2/E2.1/E2.2 的数字序列模型，可显示实际生成序列的 FFT，但要标注它是数字调制序列频谱，不等于芯片 RF 输出实测 Spur。

---

## 8. LMX2594 器件约束与状态判定

实现时必须将器件限制放在一个独立 Profile 中，不要把规则散落在多个事件回调中。建议后续形成：

\`pll/course/data/lmx2594-profile.json\`

若现有目录结构不适合，可按仓库约定调整；关键是器件参数独立于通用计算函数。

以下数据按 LMX2594 SNAS696C Rev. C 整理。正式实现前仍需 Work 逐条对照原始数据手册和 TICS Pro，尤其是下述标记为待核对的限制。

### 8.1 参考输入和 Reference Path

公式：

\[
f_{\mathrm{PD}}=
\frac{f_{\mathrm{OSC}}\times OSC\_2X\times MULT}
{PLL\_R\_PRE\times PLL\_R}
\]

有效倍频因子：
- OSCin Doubler Off：\`OSC_2X = 1\`。
- OSCin Doubler On：\`OSC_2X = 2\`。
- Multiplier Bypass：有效因子 1。
- Multiplier Enabled：3、4、5、6、7。

约束：
- OSCin 输入频率：Doubler Off 时 5–1400 MHz。
- OSCin 输入频率：Doubler On 时 5–200 MHz。
- Doubler 输出频率最高 400 MHz。
- Multiplier 输入频率范围：30–70 MHz。
- Multiplier 输出频率范围：180–250 MHz。
- Multiplier 有效倍数：3–7；1 表示 Bypass，0/2/8–31 保留。
- Pre-R Divider：1（Bypass）至 128。
- Post-R Divider：1（Bypass）至 255；使用 Post-R 时，其输入频率不超过 250 MHz。
- Pre-R 主要用于 Multiplier 已启用、但输入频率过高时降低 Multiplier 输入频率。
- **OSCin Doubler 与 Programmable Multiplier 不允许同时启用。**
- 使用 Doubler 或 Multiplier 时，参考输入需要满足数据手册关于 50% duty cycle 的要求。

注意：
- 不要把 MULT 的寄存器编码值和数学有效倍数混淆。
- UI 显示 \`Multiplier: Bypass (×1 effective)\`，寄存器/器件编码单独解释。
- 当组合不合法时，在对应模块处标红，并解释违反哪一条限制。

### 8.2 PFD 频率范围

按 MASH_ORDER：
| 模式 | fPD 最小值 | fPD 最大值 |
|---|---:|---:|
| Integer，MASH_ORDER=0 | 0.125 MHz | 400 MHz |
| Fractional，MASH_ORDER=1/2/3 | 5 MHz | 300 MHz |
| Fractional，MASH_ORDER=4 | 5 MHz | 240 MHz |

检查时不能只看 PFD 最大值，还要同时检查 VCO 频率对应的 N 最小值。

### 8.3 N Divider 限制

N 最大值：524287。最小值依赖 MASH_ORDER 和 VCO 频率，且与 PFD_DLY_SEL 配置有关。按数据手册 Table 2 实现：

| MASH_ORDER | VCO 条件 | Minimum N | PFD_DLY_SEL |
|---:|---|---:|---:|
| 0 | fVCO ≤ 12.5 GHz | 28 | 1 |
| 0 | fVCO > 12.5 GHz | 32 | 2 |
| 1 | fVCO ≤ 10 GHz | 28 | 1 |
| 1 | 10–12.5 GHz | 32 | 2 |
| 1 | fVCO > 12.25 GHz | 36 | 3 |
| 2 | fVCO ≤ 10 GHz | 32 | 2 |
| 2 | fVCO > 10 GHz | 36 | 3 |
| 3 | fVCO ≤ 10 GHz | 36 | 3 |
| 3 | fVCO > 10 GHz | 40 | 4 |
| 4 | fVCO ≤ 10 GHz | 44 | 5 |
| 4 | fVCO > 10 GHz | 48 | 6 |

**数据手册 Table 2 中 MASH_ORDER=1 的区间有重叠：10–12.5 GHz 与 >12.25 GHz。** 实现时不得擅自忽略重叠或选较宽松限制。先以保守规则采用较大的 Minimum N，并记录待核对项；由 Work 对照最新 TI 文档/TICS Pro 结果确认最终边界和 PFD_DLY_SEL。

### 8.4 VCO 范围与 KVCO

LMX2594 VCO 工作范围：7.5–15 GHz。

数据手册 Table 7 的 VCO Core 区间与 KVCO 端点：

| Core | f1 (MHz) | f2 (MHz) | KVCO1 (MHz/V) | KVCO2 (MHz/V) |
|---|---:|---:|---:|---:|
| VCO1 | 7500 | 8600 | 73 | 114 |
| VCO2 | 8600 | 9800 | 61 | 121 |
| VCO3 | 9800 | 10800 | 98 | 132 |
| VCO4 | 10800 | 12000 | 106 | 141 |
| VCO5 | 12000 | 12900 | 170 | 215 |
| VCO6 | 12900 | 13900 | 172 | 218 |
| VCO7 | 13900 | 15000 | 182 | 239 |

数据手册建议用线性插值估算：

\[
K_{\mathrm{VCO}}=
K_{\mathrm{VCO1}}+
(K_{\mathrm{VCO2}}-K_{\mathrm{VCO1}})
\frac{f_{\mathrm{VCO}}-f_1}{f_2-f_1}
\]

状态规则：
- fVCO < 7.5 GHz 或 > 15 GHz：FAIL。
- 7.5–15 GHz：VCO Range PASS。
- 显示 Core 编号和 KVCO 插值估算。
- 不能只凭 Core 编号就推断相噪最好或最差。
- 如果频率处于 Core 边界，显示边界提示，不要未经验证地判为非法。
- 真实 VCO calibration 结果、温度、供电和具体芯片个体差异不在第一版频率规划器中仿真。

### 8.5 Channel Divider

LMX2594 Channel Divider 不是任意整数分频器，而是由多个分段组合实现。合法等效分频值包括：

\`1 (Bypass), 2, 4, 6, 8, 12, 16, 24, 32, 48, 64, 72, 96, 128, 192, 256, 384, 512, 768\`

其中 2–768 的合法性和输出频率范围按数据手册 Table 8 实现；不能把 3、5、7、10 等任意整数加入下拉菜单。

Table 8 中的典型边界：

| Divide | OutMin (MHz) | OutMax (MHz) | 频率限制 |
|---:|---:|---:|---|
| 2 | 3750 | 7500 | None |
| 4 | 1875 | 3750 | None |
| 6 | 1250 | 2500 | None |
| 8 | 937.5 | 1437.5 | fVCO ≤ 11.5 GHz |
| 12 | 625 | 958.333 | fVCO ≤ 11.5 GHz |
| 16 | 468.75 | 718.75 | fVCO ≤ 11.5 GHz |
| 24 | 312.5 | 479.167 | fVCO ≤ 11.5 GHz |
| 32 | 234.375 | 359.375 | fVCO ≤ 11.5 GHz |
| 48 | 156.25 | 239.583 | fVCO ≤ 11.5 GHz |
| 64 | 117.1875 | 179.6875 | fVCO ≤ 11.5 GHz |
| 72 | 104.167 | 159.722 | fVCO ≤ 11.5 GHz |
| 96 | 78.125 | 119.792 | fVCO ≤ 11.5 GHz |
| 128 | 58.594 | 89.844 | fVCO ≤ 11.5 GHz |
| 192 | 39.0625 | 59.896 | fVCO ≤ 11.5 GHz |
| 256 | 29.297 | 44.922 | fVCO ≤ 11.5 GHz |
| 384 | 19.531 | 29.948 | fVCO ≤ 11.5 GHz |
| 512 | 14.648 | 22.461 | fVCO ≤ 11.5 GHz |
| 768 | 9.766 | 14.974 | fVCO ≤ 11.5 GHz |

**待核对冲突：** 数据手册 Table 1 的摘要注释称 VCO 频率高于 10 GHz 时最大 Channel Divider 为 6；但详细 Table 8 对分频值 8 及以上列出 \`fVCO ≤ 11.5 GHz\` 的限制。实现时必须把这条文档差异列入审计，结合 TICS Pro 的实际配置结果和 TI 对应版本资料确认，不能简单选择其中一个而不记录。

第一版：
- 必须支持 Table 8 的有效分频值和频率范围。
- 对存在上述冲突的组合采取保守处理或标记“需核对”，不要错误显示绿色 PASS。
- VCO Direct 模式按 \`Fout=Fvco\` 计算，不应用 Channel Divider。
- Channel Divider 模式按 \`Fout=Fvco/CHDIV\` 计算。
- OUTA、OUTB 分别判断输出选择和启用状态。

### 8.6 其他约束

- LMX2594 输出频率范围：10 MHz–15 GHz（结合 VCO 与 Divider 结构）。
- 输出端口可能选择 VCO Direct 或 Channel Divider；输出选择要参与计算。
- SYNC 模式会引入额外 IncludedDivide 等关系，第一版明确不支持复杂 SYNC 频率/相位规划，不得静默忽略。
- RF 输出功率、OUTx_PWR、SYSREF、Ramp/Chirp、SPI 寄存器序列不属于第一版频率规划核心范围。

---

## 9. 状态颜色与评价规则

不要使用单一的“好/坏”颜色覆盖所有指标。至少区分：

### 9.1 硬件合法性

- PASS：符合数据手册明确限制。
- FAIL：违反数据手册明确限制。
- UNKNOWN：数据手册冲突、缺少必要参数或暂未实现的模式。

### 9.2 设计倾向

- 推荐/较有利：必须有公式或数据手册趋势支持。
- 可用但有代价：例如 Multiplier 会影响 PLL FOM、Fractional-N 需要关注 Spur。
- 需进一步验证：无法由当前输入定量判断。

### 9.3 证据等级

- Exact calculation：公式直接计算。
- Datasheet estimate：基于数据手册典型参数或曲线估算。
- L2 simulation：由可追溯仿真生成的预计算结果。
- Measured：公开 EVM/芯片实测数据。
- Not available：暂无可信数据。

颜色之外必须有文本和 tooltip。不要把“在规格范围内”自动等同于“最优”；不要把“估算趋势”显示成“仿真 PASS”。

---

## 10. 模式 C 的仿真/数据策略：什么必须算，什么必须仿真

| 指标 | 第一版是否可计算 | 所需依据 | 是否必须 SPICE |
|---|---|---|---|
| Fpd/Fvco/Fout | 是，精确计算 | 频率关系式 | 否 |
| N/NUM/DEN | 是，精确计算 | 频率关系式和量化规则 | 否 |
| 输出频率误差 | 是，精确计算 | 量化后实际参数 | 否 |
| Integer-N 频率网格 | 是 | fPD、CHDIV | 否 |
| Fractional-N 频率步进 | 是 | fPD、DEN、CHDIV | 否 |
| 器件硬约束 | 是 | LMX2594 数据手册 Profile | 否 |
| VCO Core / KVCO | 可估算 | 数据手册 Table 7 插值 | 否 |
| PLL 核心 Flat/Flicker Noise | 可估算 | TI FOM/归一化 1/f 公式 | 否 |
| 参考源噪声到输出 | 可计算/估算 | 参考源相噪曲线和闭环传递函数 | 不一定 |
| VCO 噪声到输出 | 可计算/估算 | VCO 相噪数据和闭环传递函数 | 不一定 |
| Loop Bandwidth / Phase Margin | 可计算 | ICP、KVCO、N、实际 Loop Filter 网络 | 不一定；线性化模型可计算 |
| Fractional Spur 频点/序列周期 | 部分可计算 | NUM/DEN、MASH 序列模型 | 数字模型可做 |
| Fractional Spur 幅度 | 不能只靠频率链准确计算 | MASH、非线性、CP mismatch、泄漏、实测/仿真 | 需要适当模型/仿真/测量 |
| Reference Spur 幅度 | 不能只靠频率链准确计算 | CP、PFD、泄漏、滤波器、VCO 增益和实际噪声 | 需要适当模型/仿真/测量 |
| 最终输出相噪/Jitter | 不能只靠频率链 | 全部噪声源谱和闭环传递函数 | 需要可信噪声数据；SPICE 不是唯一方法 |
| Lock Time/Cycle Slip | 不能只靠频率链 | 非线性时域闭环模型 | 需要行为/混合级/电路仿真 |
| 电源耦合/PCB 串扰 | 不能只靠频率链 | 注入模型、板级数据或实测 | 需要板级/电路仿真或实测 |

### 第一版 Mode C 的结论

- 先用公式、器件约束和 TI 数据手册模型完成。
- 真实仿真不是第一版上线的前置条件。
- 只要某项没有足够模型，就显示“暂无可追溯数据”，不要伪造精度。
- 后续如果接入仿真，应保留 L2 的实验 ID、参数、模型版本和数据来源。
- 网页本身继续保持秒级以内交互；复杂扫描、SPICE 和 Notebook 放到 L3/L4。

### 后续真实数据来源

1. TI LMX2594 数据手册 Typical Characteristics、Phase Noise vs fPD 曲线、VCO Core/KVCO 表。
2. SNAU210B EVM 默认配置和 Table 4-1 Loop Filter 参数。
3. TI PLLatinum Sim Tool 或 TICS Pro/相关工具导出的设计结果（需要明确工具版本和工况）。
4. 课程现有 C3.3 Bode、D2.3 EVM 实测曲线、D3 Spur 交互。
5. 后续自己的 PLL-SPICE/行为模型实验结果。
6. 若取得公开 EVM 的相噪/杂散实测数据，需记录载波、参考源、PFD、环路带宽、温度、输出功率、仪器设置和积分区间。

---

## 11. 与其他课程页的关系

| 页面 | 关系 |
|---|---|
| B1.1 晶体为什么能做参考 | 提供 Fosc、参考源质量和输入时钟概念 |
| **B1.2 本页** | 频率链可视化、LMX2594 频率规划、方案比较 |
| B1.3 选 PFD 频率会牵动什么 | 深入解释 Fpd、N、噪声和频率网格的权衡 |
| C3.1/C3.2 | 从器件参数进入线性化环路模型 |
| C3.3 把实装 EVM 滤波器放进 Bode 图 | 使用 TI Table 4-1 Loop Filter 参数做频响分析 |
| D2.1/D2.2 | 噪声传递和分频对相噪的影响 |
| D2.3 核对 EVM 实测曲线与测试条件 | 对照公开实测数据 |
| D3.1/D3.2/D3.3 | 解释参考 Spur、CP 纹波、漏电与边带 |
| E1.1/E1.2 | 深入 Fractional-N 分辨率、序列周期与 Spur |
| E2.1/E2.2/E2.3 | 深入 MASH、Dither、数字序列频谱 |

页面结尾建议加入明确的下一步：
- 如果想理解为什么高 PFD 不一定总是最优，去 B1.3。
- 如果想把这组频率参数带入真实滤波器，去 C3.3。
- 如果想理解 Fractional-N 的序列和 Spur，去 E1/E2。
- 如果想看实测相噪，去 D2.3。

---

## 12. 实现建议与代码组织

当前课程是独立 HTML + 共享 CSS/JS，且强调离线使用。实现应先检查当前架构，再决定代码落点。

建议结构（供 Work 判断，不强制新增每一个文件）：

- \`pll/course/b1-2.html\`：页面结构和课程文字。
- \`pll/course/b1-2-frequency-planner.js\`：B1.2 专属交互逻辑，避免把全部功能塞进全局 course.js。
- \`pll/course/data/lmx2594-profile.json\`：器件限制、VCO Core、KVCO、Channel Divider 表和默认 Preset。
- \`pll/course/course.css\`：仅增加命名空间明确的样式，避免影响其他章节。

建议将计算逻辑拆分为纯函数：

1. \`calcReferencePath(config)\`
2. \`calcNDivider(config)\`
3. \`calcVcoFrequency(config)\`
4. \`calcOutputFrequency(config, output)\`
5. \`validateReferencePath(config, profile)\`
6. \`validatePfd(config, profile)\`
7. \`validateNDivider(config, profile)\`
8. \`validateVco(config, profile)\`
9. \`validateChannelDivider(config, profile)\`
10. \`estimateKvco(fvco, profile)\`
11. \`estimatePllCoreNoise(fpd, fvco, profile)\`
12. \`enumerateFrequencyPlans(target, profile, preferences)\`
13. \`compareFrequencyPlans(plans)\`

要求：
- 内部频率单位统一为 Hz。
- 所有显示单位由 formatter 负责。
- 不要在 DOM event handler 中复制频率公式。
- 数据手册参数放 Profile，不要硬编码在多处。
- Mode A/B/C 共享同一套频率计算和验证函数。
- Mode C 只消费已验证的候选方案，不自己重新写一套公式。
- 如果某项规则有数据手册冲突，Profile 应保留 source note / validation status，不允许静默硬编码为 PASS。

### 12.1 SVG 与响应式

- 主频率链使用 SVG 或可访问的 HTML block + CSS connector。
- 桌面优先按 Fig. 3-1 的区域关系布局。
- 频率数值作为可读 HTML/SVG text，不要烘焙到图片。
- 移动端不要把整张图强行压缩到不可读；可允许横向滚动，并在窄屏下提供纵向信号链摘要。
- 参数输入区域可以折叠，但默认配置和主要信号路径必须始终可见。
- 支持键盘操作、focus-visible 和清晰的单位。
- 状态不能只用颜色表达。

---

## 13. 验收标准

### 13.1 视觉与布局

- 页面主界面明显复刻 Fig. 3-1 的配置区域和信号流布局。
- 不是普通的单列计算器表单。
- 每个主要信号节点有动态频率显示。
- 模块顺序和反馈关系正确。
- RFoutA/RFoutB 输出支路关系正确。
- 原图来源链接可打开。
- 桌面可读；移动端不出现文字挤压或频率标签遮挡。

### 13.2 默认数值验收

恢复 TI Fig. 3-1 默认配置后，应得到：

- Fosc = 100 MHz。
- Doubler 输出 = 200 MHz。
- Fpd = 200 MHz。
- Ntotal = 70。
- Fvco = 14 GHz。
- Channel Divider = 2。
- RFout = 7 GHz（仅在该输出选择 Channel Divider 时）。

默认配置的具体 UI 字段值必须在 Work 实现前对照 Fig. 3-1 原图复核。

### 13.3 公式单元测试

至少覆盖：

1. 100 MHz ×2 /1 /1 /1 = 200 MHz。
2. 100 MHz ×1 /1 /1 /1 = 100 MHz。
3. 100 MHz ×2、Pre-R=1、Multiplier Bypass、Post-R=2 = 100 MHz。
4. Multiplier=3～7 的合法输入/输出范围。
5. Doubler 与 Multiplier 同时启用必须失败。
6. PFD integer/fractional 不同上限。
7. N min 随 MASH_ORDER 和 VCO 频率变化。
8. VCO 7.5GHz、15GHz 边界及边界外输入。
9. VCO Core 和 KVCO 插值，例如 14GHz → VCO7，约 187.2MHz/V。
10. Channel Divider 合法列表和各项频率边界。
11. VCO Direct 和 Channel Divider 两种输出模式。
12. NUM=0 时 Integer-N。
13. NUM/DEN 非零时 Fractional-N。
14. Fractional 输出步进 fPD/(DEN×CHDIV)。
15. 频率格式化、浮点误差和舍入。

### 13.4 Mode B/C 验收

- 输入 100MHz、目标 7GHz，能够找到至少两个合法的 Integer-N 候选（例如 fPD=200MHz/N=70 与 fPD=100MHz/N=140，前提是参考路径和器件限制通过）。
- 输入 7.0001GHz，允许 Fractional-N 且 DEN=1000 时，能够正确展示 200MHz PFD、CHDIV=2、Ntotal=70.001、NUM=1、DEN=1000 的示例。
- 对所有候选明确区分硬件合法性、设计权衡和证据等级。
- 不把 Spur 幅度、绝对相噪或 Jitter 伪装成公式精确结果。
- TI PLL Core Noise 估算公式与数据手册单位/条件一致。
- 候选排序可解释，用户能看到为什么 A 与 B 的权衡不同。

### 13.5 教学验收

读者不看代码，只通过网页交互，能够解释：

- 100MHz 为什么变成 200MHz。
- 200MHz 如何与 N=70 得到 14GHz。
- 14GHz 为什么经过 ÷2 得到 7GHz。
- VCO 为什么要检查 7.5–15GHz。
- 同一个 7GHz 输出为什么可以用不同的 PFD/N。
- 为什么高 PFD 可能改善 PLL 核心噪声，但整数频率步进会变化。
- 为什么 Fractional-N 能细化频率网格，但不能仅由 NUM/DEN 推出实际 Spur 幅度。
- 为什么频率规划之后仍需设计 Loop Filter。

---

## 14. Work 模式实施步骤

Work 模式执行前先检查当前 main，不要假设本文件创建时的代码状态仍然是最新的。

### 实施前

1. 读取本规格。
2. 检查 main 最新 commit。
3. 读取 \`pll/course/b1-2.html\`、\`b1-3.html\`、\`c3-3.html\`、\`d2-3.html\`。
4. 检查当前 \`course.css\`、\`course.js\`、页面导航和离线资源组织。
5. 打开 SNAU210B Fig. 3-1 和 SNAS696C Rev. C 数据手册，复核所有字段、默认值和器件约束。
6. 优先复用已有 B1.2 的 JKU 原图、公式和内容，不重复建设。
7. 先形成实际修改文件清单，再开始修改。

### 实施顺序

1. 先搭出与 Fig. 3-1 一致的静态界面布局，不加复杂 Mode C。
2. 实现 Mode A 正向频率计算和节点实时数值。
3. 实现器件约束验证、VCO Core/KVCO 状态显示。
4. 完成默认 Preset 和单元测试。
5. 实现 Mode B 目标反推和候选搜索。
6. 实现 Mode C 候选比较和 TI PLL Core Noise Estimate。
7. 将现有 B1.2 理论解释与 B1.3/C3.3/D2.3/E1/E2 页面连接起来。
8. 完成桌面、移动端、离线和浏览器回归。
9. 更新覆盖矩阵、PROGRESS、实验台账（若涉及实验状态）和本规格实施状态。
10. 提交 commit 并记录验收结果。

### 实施中禁止事项

- 不要先做 SPICE 再做频率规划器。
- 不要把 Mode C 的所有性能指标都变成虚构数值。
- 不要把 LMX2594 的约束套用到通用 PLL 模式。
- 不要将 TI Fig. 3-1 截图直接作为页面背景。
- 不要将 Table 4-1 的 Loop Filter 设计参数与 Fig. 3-1 频率规划默认值混成同一组配置。
- 不要把“规格范围内”说成“最优工作点”。
- 不要未经验证地解决数据手册 Table 1/8 Channel Divider 限制差异。
- 不要在当前阶段 1 冻结工作未完成前，擅自扩大为整套 PLL 页面重构。

---

## 15. 交付物

实现完成后应有：

1. 改造后的 \`pll/course/b1-2.html\`。
2. B1.2 专属 JS 和 LMX2594 Profile（若架构需要）。
3. 默认配置、约束检查和频率计算的自动测试。
4. Mode A/B/C 的页面截图和验收记录。
5. TI 参考资料和数据手册版本记录。
6. 更新后的 B1.2 覆盖矩阵。
7. 更新后的 \`PROGRESS.md\`，注明这是交互教学功能，不误记为 SPICE 实验。
8. commit SHA 和测试结果。

本规格当前状态：

- [x] 需求和教学目标已整理。
- [x] 现有 B1.2 页面已确认存在，明确采用改造而非新建。
- [x] 主界面复刻 Fig. 3-1 的要求已明确。
- [x] Mode A/B/C 功能范围已明确。
- [x] Mode C 的公式估算与真实仿真边界已明确。
- [x] LMX2594 主要硬约束已整理，待 Work 对照原始资料复核冲突项。
- [ ] HTML/CSS/JS 尚未修改。
- [ ] Mode A/B/C 尚未实现。
- [ ] 浏览器验收尚未执行。

---

## 16. 参考资料

1. Texas Instruments, *LMX2594 EVM Instructions – 15-GHz Wideband Low Noise PLL With Integrated VCO*, SNAU210B, Fig. 3-1, Table 4-1:
   https://www.ti.com/lit/ug/snau210b/snau210b.pdf
2. Texas Instruments, *LMX2594 15-GHz Wideband PLLATINUM RF Synthesizer With Phase Synchronization and JESD204B Support*, SNAS696C, Rev. C:
   https://www.ti.com/lit/ds/symlink/lmx2594.pdf
3. TI TICS Pro:
   https://www.ti.com/tool/TICSPRO-SW
4. TI PLLatinum Sim Tool（环路设计和仿真参考；是否可自动化/导出需单独确认）：
   https://www.ti.com/tool/PLLATINUMSIM-SW

引用要求：
- 页面中的每条数据手册约束标注对应章节/表格。
- 数据手册曲线若数字化，应记录 Figure 编号、频率、温度、测试条件和数据点来源。
- 公开 EVM 数据、数据手册典型值、公式估算和课程仿真数据分别标记。
- 未来公开发布前再次检查 TI 文档、图像和软件相关许可；优先自行重绘并链接原始资料。
