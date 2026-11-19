# 交互式教学平台设计规范：对标 Circuits & Systems Classroom

> 日期：2026-11-19  
> 状态：**调研与规范完成；尚未启动页面重构**  
> 适用范围：analog-ic-learning 全项目（PLL、SerDes、Clocking、ADC/DAC、DDR/HBM、Die-to-Die）  
> 一级交互体验标杆：**Circuits & Systems Classroom**  
> 电路编辑工具候选：**Analog Canvas**  
> 仿真执行环境：保持可插拔，当前可考虑 ngspice / Kaggle / 后续自建服务  
> 本文件定义教学交互、模型、可视化、验证、数据证据和工程组织规范；不要求立即迁移所有现有 HTML 页面。

---

## 1. 结论与项目方向

本项目的目标不是“带有若干滑块的 HTML 教材”，而是一个面向数字电路工程师的**交互式模拟与混合信号系统学习平台**。

三个外部项目承担不同角色：

| 项目 | 定位 | 在本项目中的角色 |
|---|---|---|
| [Circuits & Systems Classroom](https://circuits-and-systems.tokenzhang.com/) | 交互式模拟/混合信号教学 | **交互体验、模型组织、图表联动和教学验证的一级标杆** |
| [Analog Canvas](https://analog-canvas.tokenzhang.com/) | 可编辑模拟电路原理图 | 电路绘制/编辑工具候选；导出网表后再交给仿真器 |
| ngspice / Kaggle / 其他仿真环境 | 电路或数值仿真执行 | L2 数据生产、L3 作者实验、L4 读者改参运行的后端 |

核心架构关系：

\`课程知识与引导 → 交互式系统模型 → 可编辑电路（按需） → 仿真任务 → 结果回流课程\`

关键原则：

1. **先理解，再操作，再深入电路，再做真实仿真。** 不要求读者一开始就面对复杂 SPICE。
2. **交互必须揭示因果关系。** 修改一个参数后，读者应能看见它影响了哪个模块、哪条信号、哪张曲线和哪个指标。
3. **多视图共享同一个模型状态。** 框图、时序、波形、频谱、眼图和读数不能各自使用互不一致的数据。
4. **模型边界必须明确。** 公式计算、行为级教学模型、真实仿真、公开实测分开标注。
5. **所有重要数值都可追溯。** 记录公式/模型、参数、数据来源、仿真器版本、运行条件和验证方式。
6. **网页交互优先快速。** 简单交互应即时响应；复杂计算异步执行；不把几十秒甚至数分钟的仿真伪装成普通滑块交互。
7. **先建立可复用规范和样板，再逐步改造现有课程。** 不推翻已完成的 PLL/SerDes 内容，不为了统一框架而一次性重写所有页面。

## 2. Classroom 源码审计基线

### 2.1 审计对象

- 网站首页：https://circuits-and-systems.tokenzhang.com/
- GitHub：https://github.com/Arcadia-1/circuits-and-systems-classroom
- 本次源码审计基线：\`main\` commit \`f377bd965e8acfef82b303cf807a210c064fc1a6\`
- 项目许可证：MIT（复用代码时仍需保留版权和许可证声明）
- 网站源码目录：\`web/\`

按本次源码树统计，交互课程路由约为：

| 专题 | 页面数 |
|---|---:|
| ADC | 19 |
| PLL | 3 |
| SerDes | 3 |
| Amplifiers | 1 |
| **合计** | **26** |

源码中有约 94 个 Svelte 组件、32 个 Vitest 模型测试文件/测试模块。数字是本次审计快照的目录统计，不是永久指标。

### 2.2 技术栈

Classroom 的 \`web/README.md\` 和 \`package.json\` 显示：

- Astro：静态页面、路由和站点外壳。
- Svelte 5：交互式教学组件。
- TypeScript：交互模型和 UI 类型。
- SVG：主要二维框图、时序、曲线和频谱绘制。
- Three.js：只在 CDR/112G 等需要三维场景的页面按需加载。
- NumPy：独立 Python 参考模型。
- Vitest：模型数值测试。
- Playwright：构建后的浏览器交互测试。
- 静态站点构建；Cloudflare Worker 用于访问统计等辅助能力，不代表 PLL/SerDes 模型依赖远程仿真服务。

项目开发说明要求 Node.js 22.12+、pnpm 11。常用命令：
- \`pnpm check\`：Astro/Svelte/TypeScript/Worker 类型检查及 Vitest。
- \`pnpm build\`：构建静态站点。
- \`pnpm browser:check\`：生产构建及 Playwright 浏览器检查。

### 2.3 关键源码组织

| 路径 | 作用 |
|---|---|
| \`web/src/pages/\` | 每个课程路由一个 Astro 页面 |
| \`web/src/illustrations/<topic>/\` | 一个交互实验的 Svelte 视图和模型 |
| \`web/src/illustrations/<topic>/model.ts\` | 纯数学/行为模型 |
| \`web/src/components/ui/\` | Range、Segmented、ValueField、Notes 等共享控件 |
| \`web/src/components/chart/\` | 响应式 SVG Plot、CoursePlot、SpectrumChart 等 |
| \`web/src/lib/\` | FFT、随机数、格式化、单位、数值尺度等通用函数 |
| \`web/python/\` | NumPy 等独立参考模型 |
| \`web/python/expected/\` | 参考模型输出，用于跨语言核对 |
| \`web/tests/\` | Vitest 模型测试 |
| \`web/e2e/\` | Playwright 浏览器验收 |

每个 Astro 页面通过 \`client:load\` 挂载相应 Svelte 实验组件。**页面路由/课程内容、交互视图、数学模型是分离的。**

### 2.4 Classroom 的核心工程原则

最值得吸收的不是具体框架，而是它的职责分离：

1. \`model.ts\` 只描述模型，不直接操作 DOM。
2. Svelte 组件负责控件、状态、动画、图表和模型结果的展示。
3. 共享组件统一控件和图表体验。
4. Python 参考模型提供独立计算路径，避免 TypeScript 与测试共用同一段公式导致“自测自证”。
5. 模型测试验证解析关系、物理不变量、边界条件和参考结果。
6. 浏览器测试检查真正的用户交互、错误、响应式和生产构建。
7. 教学审查另外检查“读者是否看懂因果关系”，不能仅靠测试通过代替教学质量判断。

## 3. 代表性课程拆解

### 3.1 PLL Introduction：闭环动态的因果可视化

页面：https://circuits-and-systems.tokenzhang.com/pll/introduction/

源码：
- \`web/src/illustrations/pll-intro/PllIntro.svelte\`
- \`web/src/illustrations/pll-intro/model.ts\`
- \`web/python/pll_introduction.py\`
- \`web/tests/intro-courses.test.ts\`

值得借鉴的设计：

- Open Loop、Lock、P only、Ringing、Phase Step 五种预设状态。
- 信号链按 Phase Detector → Loop Filter → VCO → Divider 排列。
- 每个模块显示当前相位误差、控制电压、VCO 频率和反馈频率。
- Reference、VCO、VCO/N 三路时钟在同一视图对照。
- 时间轴可以播放、暂停、重启，并检查某一时刻的状态。
- 频率收敛与相位误差收敛使用同一模型状态。

模型边界：
- 平均化线性鉴相器、PI 环路、VCO 控制电压限幅和 anti-windup。
- 适合解释近锁定状态下的闭环跟踪、P-only 静态相位误差和阻尼。
- 不模拟真实 PFD 的 cycle slipping/capture range、CP 脉冲和参考 Spur。

**对本项目的要求：** PLL 基础交互必须把完整反馈路径和各节点动态量放在同一视图，不能只有一个输出频率曲线。

### 3.2 Integer-N vs Fractional-N：多视图共享一个模型

页面：https://circuits-and-systems.tokenzhang.com/pll/integer-vs-fractional/

源码：
- \`web/src/illustrations/pll/PllIntFrac.svelte\`
- \`web/src/illustrations/pll/model.ts\`
- \`web/python/pll_int_vs_frac.py\`
- \`web/tests/pll-model.test.ts\`

值得借鉴的设计：

- 同一目标频率下并列比较 Integer-N 与 Fractional-N。
- 参考频率和目标输出频率可调。
- 1st-order accumulator 与 MASH 1-1-1 可切换。
- DTC 开关影响分频时序误差及后续曲线。
- 同一模型驱动 Block Diagram、Frequency Ruler、Phase Detector Timing、Phase Noise/Spur 等视图。
- 显示频率分辨率、量化误差、RMS Jitter 和 Spur 检测结果。
- Model Notes 明确说明 24-bit、无 Dither、理想 DTC、噪声假设、有限记录和 Spur 检测阈值。

模型边界：
- 这是 reference-rate 行为级 PLL 模型，不是晶体管级 PLL 仿真。
- 噪声源和环路带宽等采用明确假设。
- 输出频谱是模型条件下的基带相位调制视图，不应冒充真实芯片完整 RF 相噪。
- \`none detected\` 只代表有限记录和检测门限下未发现谱线，不代表没有 Spur。

**对本项目的要求：** MASH 相关实验应把数字序列、分频时序、相位误差、DTC 补偿、频谱和 Jitter 联动；每个结果显示证据类型和检测条件。

### 3.3 CDR：Guided Tour + 多种观察视角

页面：https://circuits-and-systems.tokenzhang.com/serdes/clock-and-data-recovery/

源码：
- \`web/src/illustrations/cdr/CdrLesson.svelte\`
- \`web/src/illustrations/cdr/model.ts\`
- \`web/src/illustrations/cdr/scene.ts\`
- \`web/python/serdes_cdr.py\`
- \`web/tests/cdr-model.test.ts\`

值得借鉴的设计：

- 六步 Guided Tour：无时钟数据流、频偏、边沿恢复、积分路径学习频偏、Jitter、真实链路时间尺度。
- 每一步包含标题、解释、观察提示、预设参数和视角。
- Conveyor Belt 看数据块与采样点；Phase Tunnel 看长时间相位轨迹；Phase Wheel 看 UI 内相位；Loop 看反馈结构。
- PRBS7、PRBS31、CID 模式可切换。
- 可调 ppm、SJ、RJ、比例增益、积分路径、投票间隔、环路延迟。
- 显示 Reader offset、Tracked ppm、Timing margin violation、Cycle Slip、Jitter Tolerance。
- 支持播放速度、Pause、Restart、视角和标签控制。

模型边界：
- 理想已知数据边沿的 early/late 判决、64-step PI 和固定 0.6 UI timing window。
- 不模拟真实模拟 Slicer 噪声和完整 Alexander 三采样逻辑。
- 三维 Conveyor/Tunnel 是系统行为的可视化，不是电磁场或晶体管级仿真。

**对本项目的要求：** SerDes/ CDR 教学应优先采用“逐步引导 + 同一数据流多视角”，而不是只展示一个眼图。

### 3.4 112G PAM4 SerDes Link：系统链路和测量视图联动

页面：https://circuits-and-systems.tokenzhang.com/serdes/112g-pam4-link/

源码：
- \`web/src/illustrations/serdes/SerdesLink.svelte\`
- \`web/src/illustrations/serdes/model.ts\`
- \`web/src/illustrations/serdes/scene.ts\`
- \`web/src/illustrations/serdes/streams.ts\`
- \`web/python/serdes_112g_link.py\`
- \`web/tests/serdes-model.test.ts\`

值得借鉴的设计：

- 3D 场景包含 TX Die、PCB Channel、RX Die 和模块级结构。
- 可切换 Short/Lossy/Echo/Long Channel。
- 可调通道损耗、Echo、TX FFE、RX CTLE、FFE/DFE、串扰和 RX 输入噪声。
- 支持 Overview、TX、Channel、RX、TI-ADC 等视角。
- 波形沿链路传播，场景与 RX 端采样数据联动。
- Compare/Stages/Plain PAM4/Channel 多种视图。
- 眼图、幅度直方图、SNR、BER 等测量共享同一批采样数据。
- 有“Same CTLE & clock”比较选项，保证 DSP 模式对比使用相同前端/时钟条件。

模型边界：
- 频域通道响应、脉冲响应、CTLE、FFE/DFE、噪声和采样行为模型。
- 3D 场景用于展示模块位置和信号传播，不代表 3D 电磁/封装场仿真。
- “measured/observed” 应理解为模型内部生成的采样测量，不能等同芯片实验室实测。

**对本项目的要求：** SerDes 系统图、通道响应、均衡器、采样波形、眼图和 BER 应共享相同链路模型与采样记录，比较时必须固定条件或明确说明条件变化。

## 4. 从 Classroom 提炼的教学设计规范

以下条款作为本项目交互页面的通用规范。MUST 表示必须满足，SHOULD 表示强烈建议。

### 4.1 每个交互页面先定义一个学习问题

MUST：
- 页面顶部明确写出“本页要回答的问题”。
- 写出关键物理关系/系统关系。
- 说明读者应观察哪一个图形特征或数值来验证理解。
- 默认状态必须能展示一个有意义、可解释的现象。

SHOULD：
- 一个页面聚焦一个主要问题，不把整章所有知识塞进同一个超级页面。
- 复杂系统可有 Overview，但内部用分步 Guided Tour 逐步揭示。
- 预先设计读者最容易误解的地方，并在对应交互旁解释。

### 4.2 建立明确的因果链

每个实验至少明确：

\`用户改变的参数 → 影响的模块/状态 → 发生的物理变化 → 图形/指标变化 → 工程含义\`

MUST：
- 用户能看见被改变的参数。
- 能看见变化经过哪些模块或信号路径。
- 至少有一个图形或指标直接呈现这个因果结果。
- 解释“为什么变化”，不能只显示新数值。

SHOULD：
- 用高亮、颜色、游标或局部注释标出当前影响路径。
- 提供一个反例或边界场景，帮助读者理解模型适用范围。

### 4.3 默认状态、预设和操作

MUST：
- 页面初始状态就有可读、可解释的结果，不让读者先拖动才能看到内容。
- 提供 Reset/恢复默认。
- 重要对比提供有名称的 Preset，例如 Lock/Ringing、Short/Lossy/Echo。
- 每个控件显示名称、当前数值、单位和范围。
- 输入非法值或超范围时，显示明确原因，不静默截断。

SHOULD：
- 连续参数用 Slider/Range；精确输入提供 Number Field。
- 离散架构/模式用 Segmented Control。
- 复杂实验支持 Pause、Restart、Play、Speed 和时间游标。
- 控件修改后相关视图同步更新；无关状态不要被意外重置。
- 对长计算采用 debounce、进度提示或 Web Worker，不阻塞页面。

### 4.4 多视图联动

MUST：
- 同一实验的框图、时序、波形、频谱、眼图、指标来自同一份模型状态/结果。
- 用户切换模型参数后，所有相关视图一起更新。
- 图表明确横轴、纵轴、单位、采样范围和归一化方式。
- 比较两个模式时，明确哪些参数相同、哪些参数不同。

SHOULD：
- 支持 hover/cursor 联动：在一个图上移动，其他图显示相同时间/频率/采样点。
- 支持视角切换，而不是把所有图挤在一个屏幕。
- 复杂系统可提供 Overview / Block / Timing / Spectrum / Eye 等视图。
- 3D 只在确实有空间关系或模块层次价值时使用；不能为了炫酷而引入。

### 4.5 Guided Tour

适用于 CDR、ADPLL、Fractional-N、完整 SerDes 等具有时间演进或多阶段因果关系的主题。

每个 Tour Step 至少包含：
- 标题。
- 一段短解释（解释当前发生了什么）。
- 一句观察提示（请看哪个信号/图形）。
- 对应预设参数。
- 目标视图。
- 下一步动作。

MUST：
- Next/Back 可用。
- 用户手动调整后，不应无提示地覆盖用户状态。
- 退出/重置 Tour 后有清晰状态。
- Tour 的每一步都必须能验证一个教学结论，不能只是一段动画。

### 4.6 图表和测量规范

MUST：
- 频谱图标出载波、offset、单位、dBc/dBc/Hz、RBW/FFT 长度或等效分析条件。
- 相噪图说明单边/双边、积分频段和 RMS Jitter 的计算口径。
- 眼图说明 UI、采样相位、样本数、幅度单位和是否含噪声/均衡。
- Bode 图说明传递函数、频率单位、幅度/相位定义。
- 时序图标明 UI、周期、边沿、延迟和采样位置。
- 所有比较图采用可比的坐标范围和归一化；若不同，必须说明。

SHOULD：
- 读者可切换关键参数观察曲线移动。
- 对重要曲线标注关键点、拐点、峰值、零点、带宽或阈值。
- 图下方给出“怎么看这张图”，不只给图例。
- 用游标/tooltip 显示精确数值。

禁止：
- 只因 FFT 中出现一条线就称为真实芯片 Spur。
- 把有限记录“未检测到”写成“没有 Spur”。
- 把模型生成的 BER/Jitter 标成芯片实测。
- 为了视觉效果自动缩放到掩盖比较差异的范围。

### 4.7 模型说明和证据标签

每个交互实验 MUST 有 Model Notes，至少包含：
- 模型类型：解析公式 / 数值行为模型 / 预计算真实仿真 / 可执行仿真 / 实测数据。
- 关键公式和参数。
- 单位、采样/时间步长、记录长度、随机种子（如适用）。
- 主要假设。
- 未包含的物理效应。
- 适用范围和已知限制。
- 数据/模型来源和版本。

统一证据标签：
- **Formula / Analytical**：解析式或直接计算。
- **Behavioral model**：教学行为模型/数值系统模型。
- **SPICE simulation**：明确仿真器、模型库和工况。
- **RTL / Digital simulation**：明确仿真器、RTL 版本和时钟条件。
- **Measured**：真实器件/板卡测量，并列测试条件。
- **Estimated**：数据手册/经验模型估算。
- **Not available**：暂无可信证据。

不得将行为模型和真实仿真混为一类。

---

## 5. 本项目 L1–L4 实验等级：保持现有定义

严格沿用 \`pll/EXPERIMENT_LEVEL_ROADMAP.md\` 中已经确定的定义，不因 Classroom 的模型能力而重新命名。

| Level | 名称 | 页面/平台 | 数据资格 |
|---|---|---|---|
| **L1** | 公式/教学模型交互 | 离线 HTML + JS | 解析式、理想模型、数值算法或教学行为模型即时计算；不得冒称 SPICE |
| **L2** | 真实仿真数据预计算交互 | 离线 HTML + 精简 JSON/JS | 必须来自 L3 同一实验运行产生的真实 SPICE/RTL/数值仿真结果；L1 算完再存盘不算 L2 |
| **L3** | 作者公开的完整标准实验 | 首选公开 Kaggle Notebook，GitHub 保留源码及公开结果镜像 | 作者已运行并保存环境、脚本/网表、原始数据、日志、完整曲线、参数表、误差和限制 |
| **L4** | 读者自行修改并重跑 | L3 同一 Notebook 的复制/编辑/运行模式 | 读者在自己的会话修改参数并执行同一工程；需要洁净访客验收，也保留本地包 |

补充规范：
1. L1 与 L2 可以在同一个知识点并存：L1 解释机理，L2 展示真实仿真对比。
2. L3/L4 通常是同一个工程/Notebook：L3 是作者发布快照，L4 是读者复制运行。
3. 不是每个知识点都必须做到 L4。
4. L2 的数据必须保留实验 ID、模型版本、参数和原始数据来源。
5. 不能用插值把未仿真的参数点伪装成真实 SPICE 结果。
6. Classroom 的 PLL/Cdr/SerDes 页面主要属于 Behavioral model，不应因为有时域积分、FFT、眼图就自动算作 L2。

---

## 6. 统一交互组件规范

先建设可复用组件，不要求每页从零手写。

### 6.1 控件组件

| 组件 | 用途 | 必须能力 |
|---|---|---|
| Range / Slider | 连续参数 | 当前值、单位、min/max/step、键盘可操作 |
| Value Field | 精确数值输入 | 单位、有效位数、范围校验 |
| Segmented | 离散模式 | 当前模式明确，切换不丢失无关参数 |
| Toggle | 开关 | 开/关状态、语义标签 |
| Preset Selector | 典型工况 | 可恢复、可解释、记录默认参数 |
| Play/Pause/Restart | 时域动画 | 可控播放，不依赖自动播放才能读懂 |
| Time/Frequency Cursor | 图表游标 | 精确值、多图联动 |
| Guided Tour | 教学步骤 | Back/Next、步骤状态、参数预设 |

### 6.2 可视化组件

| 组件 | 典型用途 |
|---|---|
| Block Diagram | PLL、CDR、ADC、SerDes 信号链 |
| Signal Path / Flow | 显示每一级输入输出和动态数值 |
| Timing Diagram | PFD、MASH、CDR、采样时序 |
| Time Plot | 瞬态、控制电压、相位误差、眼图采样 |
| Spectrum Plot | FFT、相噪、Spur、噪声谱 |
| Bode Plot | 增益/相位、零极点、环路带宽 |
| Eye Plot | NRZ/PAM4 眼图、采样裕量 |
| Histogram | 抖动、码密度、幅度分布 |
| State/Metric Panel | Lock、Cycle Slip、SNR、BER、Jitter 等 |
| 3D Scene | 仅用于具有空间结构意义的系统链路/模块 |

组件必须有统一的字体、颜色语义、单位格式、轴样式、tooltip、暗色/亮色策略和响应式规则。

### 6.3 颜色和视觉语义

- 颜色表达稳定的信号类别或状态，不要每个页面重新定义。
- 同一页面同一信号在框图、时序、频谱和图例中保持一致颜色。
- 状态颜色至少区分：正常、警告、错误、参考/估算、未知。
- 颜色之外必须有文字/符号，不能只靠颜色传递信息。
- 默认使用克制配色；高亮只用于当前正在讲解的路径/信号。

---

## 7. 模型与代码组织规范

### 7.1 模型必须独立于 UI

每个交互实验优先采用：

\`<experiment>/model.ts\`：纯函数/状态模型  
\`<experiment>/<Experiment>.svelte\`：控件、状态、图表和交互  
\`<experiment>/presets.ts\`：默认值和教学场景  
\`<experiment>/notes.md\`：公式、假设、数据来源、限制  
\`tests/<experiment>.test.ts\`：模型测试  
\`python/<experiment>.py\`：复杂模型的独立参考实现（按需）  
\`data/<experiment>/\`：L2 数据、参数和元数据（按需）

不得把全部公式、状态、图表和事件回调写在一个巨大 HTML 文件里。

### 7.2 单一模型状态

- 每个实验有一个明确的参数/状态对象。
- 所有视图从同一模型状态读取。
- 公式只在模型层实现一次。
- UI 不复制另一套“简化公式”计算同一个指标。
- 每个参数都有单位、默认值、范围和物理含义。
- 每个输出指标有明确计算口径。

### 7.3 数值模型要求

- 内部单位统一，显示层负责单位转换。
- 随机模型必须有可控 seed，便于复现。
- 对随机噪声，记录分布、带宽、采样率和随机种子。
- 对 FFT，记录 N、fs、window、单双边、幅值/功率归一化和检测门限。
- 对时域仿真，记录 dt、总时长、预热时间、积分算法和稳定性边界。
- 对复杂模型，明确使用浮点、定点或离散事件模型。
- 大型数组尽量使用 TypedArray，避免每帧重复创建大型对象。
- 重计算使用缓存、预计算、debounce 或 Worker；动画帧只更新必要的显示状态。

### 7.4 不强制所有模型都做 Python 双实现

简单公式/解析关系可用解析不变量和单元测试验证。

复杂行为模型、FFT、随机模型、非线性链路模型 SHOULD 建立独立 Python/NumPy 参考实现，避免同一代码同时充当实现和验证。

---

## 8. 科学性与验证规范

### 8.1 模型验证分层

1. **解析验证**：能写出闭式关系的，先验证边界、极限和解析解。
2. **独立参考**：复杂数值模型使用独立 Python/NumPy 或另一种实现。
3. **物理不变量**：例如功率非负、频率守恒、概率范围、稳定性边界、能量/电荷守恒。
4. **回归测试**：典型工况和已知边界条件有固定 expected values。
5. **浏览器测试**：真实控件、图表更新、模式切换、重置、播放和移动端。
6. **教学审查**：人工检查默认状态是否解释正确，图形是否真的展示了宣称的物理因果关系。

### 8.2 测试工具建议

若采用 Classroom 类似的前端架构：
- Vitest：纯模型、公式、边界、数据格式。
- Python/NumPy：独立数值参考。
- Playwright：生产构建后的浏览器操作。
- 截图/视觉审查：检查曲线是否被遮挡、轴范围是否误导、控件是否挤压。
- CI：类型检查、模型测试、构建、浏览器测试。

### 8.3 每个实验的最低测试集

- 默认配置输出与手算结果一致。
- 每个控件的 min/max/step 边界。
- 至少一个典型现象和一个反例/极限。
- 参数变化后所有关联视图同步更新。
- Reset 后恢复完全一致的初始状态。
- 同一 seed 重跑结果可复现。
- 不同模式的比较条件正确。
- 没有 NaN、Infinity、非法坐标或无效频谱。
- 生产构建和离线资源可用。

### 8.4 教学审查标准

每次修改模型、曲线或控件，必须回答：

1. 这一页的核心物理关系是什么？
2. 默认状态哪一条曲线/哪个信号展示了它？
3. 改变一个参数后，预期哪个图形特征变化？
4. 实际变化是否与物理解释一致？
5. 比较的两组数据是否使用相同的轴、归一化、采样记录和噪声条件？
6. 是否把视图缩放、局部窗口或统计样本数误当成物理参数变化？
7. 模型没有覆盖什么？读者是否能看到限制？

Classroom 的 \`web/CODING_STANDARDS.md\` 强调：必须让因果关系可见；比较和显示变换必须诚实；自动化测试通过不代表教学清晰，必须检查真实渲染页面。

---

## 9. 性能、响应式和可访问性

### 9.1 性能

- L1 常见滑块交互目标：修改后立即响应，通常应在 100 ms 量级内完成。
- 中等模型可采用局部重算、缓存和 50–150 ms debounce。
- 复杂 FFT/长记录/大规模眼图统计应考虑 Web Worker。
- 真实 SPICE 仿真不应阻塞浏览器主线程；通过任务队列/Notebook/后端执行。
- 页面初始加载只加载当前实验需要的代码；Three.js 等重型依赖按页面懒加载。
- 3D 动画应有 Pause、速度控制、静态视角和 prefers-reduced-motion 支持。
- 任何需要等待数秒以上的操作都应显示状态；超过 10 秒的任务应转为明确的后台/Notebook 工作流，而不是伪装成即时交互。

### 9.2 响应式

- 桌面：可以使用多列和并排比较。
- 平板：可折叠控制区或切换视图。
- 手机：优先保证主信号路径、主要图表和关键读数可读；不要把桌面多列直接压窄。
- 复杂图表可提供 tabs：Overview / Timing / Spectrum / Eye。
- 重要控件不能依赖 hover 才能使用。

### 9.3 可访问性和离线

- 控件必须有 label、单位和键盘操作。
- 状态不能只通过颜色表达。
- 图表提供可读标题、轴名称和单位。
- 动画可暂停，支持 reduced motion。
- 课程正文、公式、核心交互和关键资源优先离线可用。
- 如果模型或数据文件较大，页面需说明下载/加载状态和失败原因。

---

## 10. Analog Canvas 与真实仿真的边界

Analog Canvas 不取代交互教学模型，也不负责决定 L1–L4 的证据等级。

建议把它作为**可选的电路编辑层**：

\`课程原理 → L1 行为交互 → Analog Canvas 原理图编辑 → SPICE 网表 → 仿真执行器 → L2/L3/L4 数据\`

### 10.1 适用场景

优先考虑：
- B2.3 LC VCO：交叉耦合、Tank、尾电流、器件 W/L、L/C/Rs。
- C1.2 Charge Pump：开关、电流源、失配、漏电。
- C1.3 Loop Filter：R/C 拓扑和 AC/Bode。
- 后续完整 CP-PLL 子模块。

不适合：
- B1.2 频率规划器：它是数字频率链和器件约束计算，不需要电路编辑器。
- 纯数学/时序/数字算法交互：没有必要引入原理图工具。

### 10.2 仿真后端必须可替换

不要把页面绑定到某一个在线仿真服务。建议定义统一 Simulation Job：

- experiment_id
- model/netlist version
- simulator name/version
- PDK/model files and hashes
- analysis type（DC/AC/TRAN/NOISE 等）
- parameter overrides
- temperature/process/supply
- random seed（如适用）
- run status/log
- raw output files
- derived plots/metrics
- reproducibility manifest

后端可以先是本地 ngspice 或 Kaggle Notebook，后续再接自建服务器。前端只负责提交参数、展示状态和读取结果。

### 10.3 许可证

Classroom 仓库为 MIT；若复用具体源码，应保留原作者版权和 MIT License 文本。Analog Canvas 使用不同许可证，实际集成、修改或托管前应单独检查其许可证和部署方式。**优先借鉴设计模式，不默认复制整个项目。**

---

## 11. 对 analog-ic-learning 当前仓库的落地建议

当前仓库已经有：
- 18 章独立 PLL HTML 页面和统一页签。
- 课程内嵌公式和离线资源。
- SerDes 独立页面。
- L1–L4 实验体系和实验台账。
- 已有 SPICE/RTL/行为模型 Notebook、GitHub Actions 和仿真数据。

因此不建议立即把整个仓库迁移成 Classroom 的 Astro 工程，也不应为了技术统一重写已完成的 18 章。

### 推荐渐进式架构

**第一阶段：建立交互组件和模型规范。**
- 先保留现有静态 HTML、课程目录和导航。
- 新建独立的交互组件工程/构建入口，优先评估 Svelte 5 + TypeScript。
- 将模型、视图、数据、测试分离。
- 构建产物以静态 JS/CSS 资源嵌入现有 HTML 页面，继续支持 GitHub Pages 和离线。
- Astro 可作为未来全站路由/内容组织的候选，不作为第一阶段强制迁移条件。

**第二阶段：三个代表性样板。**
1. PLL 闭环：验证信号链、动态时序、环路参数、锁定过程。
2. Fractional-N/MASH：验证数字序列、分频时序、相位误差、DTC、频谱和 Jitter 联动。
3. CDR：验证 Guided Tour、数据流、采样点、相位视图、眼图和 Cycle Slip。

**第三阶段：电路级样板。**
4. LC VCO：引入 Analog Canvas 原理图编辑，再连接现有 VCO-01 仿真环境。
5. Charge Pump / Loop Filter：把电路编辑、AC/TRAN 仿真和课程 Bode 图连起来。

**第四阶段：按规范扩展到 ADC、SerDes、DDR/HBM、Die-to-Die。**

### 当前页面改造优先级

| 现有课程/实验 | 建议改造方向 | 备注 |
|---|---|---|
| PLL A2/C2 闭环 | PLL Introduction 风格 | 先建立通用闭环组件 |
| PLL E1/E2 Fractional-N/MASH | Integer-vs-Fractional 风格 | 重点做多视图和模型说明 |
| SerDes CDR | Guided Tour + 多视角 | 优先级高 |
| SerDes 通道/眼图/FFE/CTLE/DFE | 112G 链路风格 | 逐模块联动，不必第一版做 3D |
| PLL B1.2 频率规划 | Fig. 3-1 风格的独立 L1 | 沿用已归档的 B1.2 规格，不需要 Analog Canvas |
| PLL B2.3 LC VCO | 交互模型 + Analog Canvas + VCO-01 | 电路编辑与真实仿真的代表样板 |
| PLL C1.2/C1.3 | CP/Loop Filter 交互 + SPICE | 后续电路级样板 |

---

## 12. 统一交互实验说明模板

每个实验页面/实验卡片应能提供以下信息。不是每个页面都要把全部文字展开，但数据结构和审查时必须具备。

\`\`\`yaml
experiment:
  id: PLL-LOOP-01
  title: PLL 闭环锁定过程
  learning_question: "积分路径为什么能消除稳态相位误差？"
  level: L1
  model_type: behavioral
  model_version: "1.0"
  inputs:
    - name: f_ref
      unit: Hz
      default: 10e6
      min: 5e6
      max: 20e6
    - name: divider
      unit: ratio
      default: 4
  outputs:
    - name: phase_error
      unit: rad
    - name: vco_frequency
      unit: Hz
    - name: lock_status
      unit: enum
  views:
    - block_diagram
    - timing
    - frequency_response
    - phase_error
  presets:
    - open_loop
    - p_only
    - pi_lock
    - ringing
  assumptions:
    - "Averaged linear phase detector"
    - "VCO control limited to specified range"
  not_modeled:
    - "PFD cycle slipping"
    - "Charge-pump pulse ripple"
  evidence:
    type: behavioral_model
    reference:
      - "source title / URL / section"
  tests:
    - "default equilibrium"
    - "P-only residual phase error"
    - "unreachable target"
\`\`\`

说明：以上是规范示例，不代表已建立 YAML 工具链。实际可采用 JSON、TypeScript 类型或 Markdown front matter，只要字段含义稳定即可。

---

## 13. 样板验收标准

### 13.1 PLL 闭环样板

- 框图显示完整反馈路径。
- 参考、VCO、反馈时钟同时可观察。
- Open Loop / P-only / PI / Ringing / Phase Step 预设。
- 可暂停、重启、查看指定时刻。
- 频率和相位误差由同一模型驱动。
- 明确行为模型与真实 PFD/CP 的区别。
- 公式、单位、模型参数和限制可查看。

### 13.2 Fractional-N/MASH 样板

- Integer-N 与 Fractional-N 在同一目标频率下比较。
- Accumulator 和 MASH 1-1-1 可切换。
- 显示分频字序列、累积量化误差、PFD 时序。
- DTC 补偿前后可比较。
- 相位误差、频谱、Spur、Jitter 联动。
- 显示 FFT 记录长度、归一化、噪声模型和 Spur 检测门限。
- 若使用真实 L2 数据，必须有仿真 ID 和原始结果。

### 13.3 CDR 样板

- Guided Tour 能从“无时钟”逐步讲到“闭环恢复”。
- 数据、边沿、采样点、PI 相位和眼图使用同一数据流。
- 可调 ppm、SJ、RJ、PRBS/CID、Kp/Ki、Decimation、Latency。
- 显示 tracking error、margin violation、cycle slip 和 jitter tolerance。
- 模型说明明确理想边沿判决、PI 量化和未建模的 slicer/PD 行为。

### 13.4 LC VCO 电路级样板

- 网页 L1 交互可在 10 秒内完成典型参数观察。
- Analog Canvas 可打开/编辑电路或导出等效网表。
- SPICE 结果能追溯 PDK、模型版本、温度、供电和网表。
- L2 曲线来自 L3 同一实验运行。
- L3 作者 Notebook 可公开查看和下载。
- L4 洁净读者会话可复制、改参、运行并与基准比较。

---

## 14. 近期执行顺序

本文件只完成规范，不代表立即开始大规模页面改造。

建议顺序：

1. 将本规范作为全项目交互设计基线。
2. 先选 Classroom 的 PLL Introduction、Fractional-N、CDR 三个页面做逐项对照表。
3. 盘点 analog-ic-learning 已有交互：保留、增强、重做、暂缓。
4. 确定 Svelte 组件构建方式与当前静态 HTML 的集成路径；先做一个最小试点，不迁移全站。
5. 先交付 PLL 闭环样板，再做 MASH 和 CDR。
6. 样板通过模型、浏览器、教学审查后，才建立公共组件库并扩展。
7. LC VCO 最后接入 Analog Canvas 和真实 SPICE 后端。

禁止：
- 直接复制整个 Classroom 作为我们的课程。
- 仅模仿配色和图表，不建立独立模型。
- 把行为模型输出标为真实 SPICE/实测。
- 为了 3D 效果牺牲交互速度和手机可用性。
- 未验证便把所有现有 HTML 页面迁移到新框架。
- 用一套复杂模型强行覆盖所有知识点；每页按学习目标选合适的模型复杂度。

---

## 15. 参考资料与源码入口

### Classroom 网站
- [首页与课程目录](https://circuits-and-systems.tokenzhang.com/)
- [PLL Introduction](https://circuits-and-systems.tokenzhang.com/pll/introduction/)
- [Integer-N vs Fractional-N](https://circuits-and-systems.tokenzhang.com/pll/integer-vs-fractional/)
- [Clock and Data Recovery](https://circuits-and-systems.tokenzhang.com/serdes/clock-and-data-recovery/)
- [112G PAM4 SerDes Link](https://circuits-and-systems.tokenzhang.com/serdes/112g-pam4-link/)

### Classroom 源码
- [Repository README](https://github.com/Arcadia-1/circuits-and-systems-classroom/blob/main/README.md)
- [Web architecture / development README](https://github.com/Arcadia-1/circuits-and-systems-classroom/blob/main/web/README.md)
- [Teaching review standards](https://github.com/Arcadia-1/circuits-and-systems-classroom/blob/main/web/CODING_STANDARDS.md)
- [PLL Introduction model](https://github.com/Arcadia-1/circuits-and-systems-classroom/blob/main/web/src/illustrations/pll-intro/model.ts)
- [Fractional-N model](https://github.com/Arcadia-1/circuits-and-systems-classroom/blob/main/web/src/illustrations/pll/model.ts)
- [CDR model](https://github.com/Arcadia-1/circuits-and-systems-classroom/blob/main/web/src/illustrations/cdr/model.ts)
- [112G SerDes model](https://github.com/Arcadia-1/circuits-and-systems-classroom/blob/main/web/src/illustrations/serdes/model.ts)
- [Model tests](https://github.com/Arcadia-1/circuits-and-systems-classroom/tree/main/web/tests)
- [Python reference models](https://github.com/Arcadia-1/circuits-and-systems-classroom/tree/main/web/python)
- [MIT License](https://github.com/Arcadia-1/circuits-and-systems-classroom/blob/main/LICENSE)

### 本项目相关基线
- [课程总路线图](COURSE_ROADMAP.md)
- [PLL 四级实验体系与状态台账](../pll/EXPERIMENT_LEVEL_ROADMAP.md)
- [B1.2 频率规划器交互规格](../pll/docs/PLL_B1_2_FREQUENCY_PLANNER_SPEC_2026-11-17.md)

---

## 16. 当前状态

- [x] Classroom 网站结构和公开课程目录审计。
- [x] GitHub 源码结构、技术栈和许可证审计。
- [x] PLL Introduction、Fractional-N、CDR、112G PAM4 四个代表性页面拆解。
- [x] 提炼交互教学、模型组织、可视化、科学性和验证规范。
- [x] 与本项目既有 L1–L4 定义对齐。
- [x] 给出 Analog Canvas / 仿真后端的边界和渐进式落地方案。
- [ ] 现有 PLL/SerDes 交互逐页对照矩阵。
- [ ] Svelte 组件构建与静态 HTML 集成的最小技术试点。
- [ ] 三个交互样板实施和验收。

**结论：本文件是后续交互页面设计与改造的统一规范。先按规范完成样板，不在本次调研中直接重写现有课程。**
