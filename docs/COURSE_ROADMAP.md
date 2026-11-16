# 课程总路线图

## 教学对象与目标

面向具备数字电路基础的工程师，建立模拟与混合信号电路的系统认识，能够阅读常见模拟 IP 框图、电路结构、关键控制接口、设计指标和测试报告。

## 教学内容组织

每个专题按需要拆成多个独立页面。每个知识点优先覆盖：

1. 物理机制与系统作用。
2. 经典基础框图及晶体管/电路级原理图。
3. 数学模型、公式推导和定量例题。
4. 公开论文或工业产品的真实实现。
5. 设计规格、设计参数、测试指标及测量方法。
6. 交互实验、预测题和结果解释。
7. 参考来源、图号、许可及模型适用范围。

不是每页机械地包含全部项目；应按知识点选择最合适的素材，但不能用文字方框替代关键电路图。

## 专题路线

| 专题 | 主要范围 | 状态 |
|---|---|---|
| RFIC 基础与模拟射频前端 | 无线链路与 RF 系统概览、噪声/线性度、收发机架构、LNA、Mixer、PA、I/Q 与阻抗匹配 | 新增规划；以 JKU RFIC 作为重要参考体系 |
| PLL | 基本环路、PFD/CP、VCO/DCO、环路动态、噪声、杂散、分数-N、ADPLL | 第 01–18 章已建立，课程内容持续核对；L3/L4 云端实验待建设 |
| SerDes | 通道、均衡、采样、CDR、DSP/模拟架构 | 持续规划 |
| 时钟与振荡器 | 晶体振荡器、LC/RO、时钟分配、抖动 | 待规划；可复用 JKU Oscillators 的基础内容 |
| ADC/DAC | 采样、量化、架构、动态性能和测试 | 待规划 |
| DDR/HBM | PHY、时序训练、校准、接口指标 | 待规划 |
| Die-to-Die | 并行接口、PHY、电气指标、封装通道 | 待规划 |

**跨专题共性知识：** 噪声、线性度、Noise Figure、IP3、相位噪声、Jitter、Spur、串扰、耦合和自干扰不应只放在某一个模块中；在 RFIC、PLL、SerDes 等专题中按具体应用解释，并建立术语和测试指标之间的交叉链接。

## 公共参考教材与外部课程体系：JKU RFIC

### 来源定位

将 Johannes Kepler University（JKU）Harald Pretl 教授团队维护的 **Radio-Frequency Integrated Circuits（RFIC）** 课程作为本项目的公共参考教材之一。它覆盖范围远大于 Oscillator/PLL，可为 RF 系统基础、模拟射频前端、时钟频率生成、杂散与串扰、电路仿真和系统案例提供统一的知识来源。

- [JKU Slides 总目录（11 个课件）](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/)
- [JKU 完整讲义（按章节组织，含公式、图、示例与参考文献）](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html)
- [JKU GitHub 源码仓库](https://github.com/iic-jku/radio-frequency-integrated-circuits)
- [Apache License 2.0](https://github.com/iic-jku/radio-frequency-integrated-circuits/blob/main/LICENSE)

Slides 目录中的 11 个课件由完整讲义生成；课件适合快速浏览，涉及公式推导、图号、仿真分析和案例时，应优先回到完整讲义对应章节。Simulation 与 Fairphone 两个课件虽然标题带有 Appendix，但在完整讲义中分别是第 10、11 章，属于这套课程的正式内容。

### JKU 11 个课件及其对本项目的用途

| # | JKU 课件 | 主要内容 | 对本项目的用途 |
|---|---|---|---|
| 1 | [Introduction](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/intro.html) | 无线传输、波长、链路损耗、无线标准、RF 设计的系统权衡 | 作为模拟/RF 教程的系统入口，建立频率、波长、链路预算和射频系统概念 |
| 2 | [Fundamentals](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/fundamentals.html) | 信道容量、线性度、单音/双音、IIP3、噪声、Noise Figure、灵敏度、调制、脉冲成形、OFDM | 建立读懂模拟指标、频谱和通信性能的基础；与 SerDes 的噪声、线性度和信号质量知识交叉 |
| 3 | [Transceivers](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/trx.html) | 直接变频收发机、调制/解调、滤波、FDD/TDD/全双工、超外差、Low-IF、I/Q 失配 | 建立收发机系统架构地图，帮助把 PLL、Mixer、LNA、PA 放回完整信号链理解 |
| 4 | [Low Noise Amplifiers](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/lna.html) | 阻抗匹配、Bode-Fano、稳定性、共源/共栅、源极电感退化、反馈 LNA | 作为模拟接收前端专题的基础资料 |
| 5 | [Mixers](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/mixer.html) | 非线性/时变混频、单平衡/双平衡、Gilbert Cell、N-path、LO 生成、多相网络 | 作为混频器与本振接口专题的基础资料 |
| 6 | [Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) | 振荡器噪声、相位噪声、Jitter、Reciprocal Mixing、单端/差分振荡器、调谐与建模 | 已用于 PLL 第 08、12 章等；后续时钟与振荡器专题可继续复用 |
| 7 | [Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) | 基本 PLL、JK 触发器鉴相器、CP-PLL、ADPLL、TDC、DCO、Fractional-N、Delta-Sigma | 已用于 PLL 课程的核心参考；继续核对图号、概念覆盖和公式来源 |
| 8 | [Power Amplifiers](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/poweramp.html) | PA 效率、非线性、放大器类别、稳定性、中和及进阶技术 | 作为模拟发射前端专题的基础资料 |
| 9 | [Spurs, Crosstalk and Self-Interference](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/spurs.html) | 耦合路径、频率合成器杂散、Spur 与串扰抑制 | 重点补充 PLL 第 13 章，并作为 PLL/SerDes/RF 前端的跨专题知识 |
| 10 | [Appendix: RF Circuit Simulation](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/simulation.html) | DC 工作点/扫描、AC、S 参数、小信号噪声、Transient、Transient Noise、PSS、HB、PAC/HBAC、PNOISE/HBNOISE、仿真器支持 | 建立全课程统一的仿真方法地图；为 L3/L4 实验选择分析类型、理解结果边界提供依据 |
| 11 | [Appendix: Case Study Fairphone (Gen. 6) RF Front-End](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/fp6.html) | 手机 RF 架构、频段、天线、SDR735、接收/发射链、APT、反馈接收、双上行与自干扰、Wi-Fi/BT | 作为系统级案例，把前端模块、指标、校准和共存问题串起来 |

### 完整讲义 12 章的纳入范围

总纲跟踪下面全部 12 章。表中的「纳入」是课程规划，逐页制作与发布另按专题进度记录。Slides 共 11 套，完整讲义另有第 12 章习题。

| JKU 完整讲义 | 在本项目的安排 |
|---|---|
| [1–3 无线基础、系统指标与收发机](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-intro) | 纳入 RFIC 主线。从链路预算、噪声/线性度到收发机架构。PLL 开篇引用本振用途。 |
| [4–5 LNA 和混频器](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-lna) | 纳入 RFIC 接收前端，包括匹配、噪声、混频和 LO；进阶电路按阅读所需展开。 |
| [6–7 振荡器和 PLL](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator) | 纳入 PLL A–E 主线。Reciprocal Mixing 与接收前端互链。F 组整机验收继续用公开评估板、论文和课程仿真。 |
| [8 功率放大器](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-poweramp) | 纳入 RFIC 发射前端，包括效率、线性度和放大器类别。 |
| [9 杂散、串扰与自干扰](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-spurs) | 频率合成器杂散进入 PLL D3；收发通路与共存问题纳入 RFIC。 |
| [10 RF 仿真](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-simulation) | 纳入公共仿真方法，PLL 附录先讲 tran/FFT、PSS/HB 与周期噪声。 |
| [11 Fairphone 6 RF 前端](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-fp6) | 纳入 RFIC 系统案例，介绍手机实物和信号链。 |
| [12 习题](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-exam-questions) | 纳入习题索引，PLL 和 RFIC 按专题选用预测题与计算题。 |

### 与现有专题的映射及改造重点

| 本项目位置 | JKU 对应内容 | 使用方式 / 待办 |
|---|---|---|
| 模拟/RF 总览及新增 RFIC 基础专题 | Introduction、Fundamentals、Transceivers | 补齐链路预算、波长、RF 频段、收发机架构、噪声/线性度等前置知识；不是直接照搬 JKU 章节 |
| 新增模拟射频前端专题 | LNA、Mixers、Power Amplifiers、Transceivers | 按接收链/发射链组织，讲清电路结构、关键参数、匹配、噪声、线性度和测试方法 |
| PLL 第 01 章：用途与系统全景 | Introduction、Transceivers、Fundamentals、PLL | 从无线系统需求引出频率合成与时钟，再进入 PLL |
| PLL 第 02–07 章：相位/频率比较、PFD、CP、Loop Filter | PLL 第 7 章 | 作为基本环路、鉴相器、CP 和环路滤波器的主要外部对照 |
| PLL 第 08 章：VCO/DCO | Oscillators 第 6 章、PLL 第 7 章 | 交叉检查 LC/差分振荡器、调谐方式、相位积分器及 DCO 结构 |
| PLL 第 09–11 章：完整闭环、相位域模型、瞬态与稳定性 | PLL、RF Circuit Simulation | 结合环路理论与 Transient/PSS 等仿真方法；区分线性模型和真实电路仿真 |
| PLL 第 12 章：Phase Noise 与 Jitter | Oscillators 的 Oscillator Noise/Jitter/Reciprocal Mixing、PLL Figure 84、Simulation 的 PNOISE/HBNOISE | 重点补充相噪来源、环路带宽内外噪声传递、Reciprocal Mixing，以及振荡器/PLL 相噪仿真的适用条件 |
| PLL 第 13 章：Spur、非线性与 PVT | Spurs 第 9 章、Oscillators、Simulation | 系统补充耦合路径、Reference/Fractional Spur、串扰、自干扰及抑制方法；连接第 7 章 CP 纹波与第 12 章频谱读图 |
| PLL 第 14–15 章：Integer-N/Fractional-N、Sigma-Delta/MASH | PLL 第 7.4 节及其 MASH Notebook | 对照 Fractional-N、DSM、量化噪声整形和实际实现；保留本项目对 MASH 111 的深入解释 |
| PLL 第 16–17 章：ADPLL、TDC/DTC/DCO | PLL 第 7.3 节，尤其 TDC 与 DCO | 对照 ADPLL 框图、延迟链 TDC、DCO 调谐；JKU 可作为 TDC/DCO 基础参考，不能替代本项目对 DTC、增益校准和具体芯片控制链的深入分析 |
| PLL 第 18 章：完整系统与指标 | Transceivers、Fundamentals、Simulation、Fairphone | 增加从模块指标到完整 RF 系统的联系，案例中明确区分系统框图、仿真结果和产品实测 |
| SerDes | Fundamentals、Oscillators、PLL、Spurs、Simulation 中的相关知识 | 复用噪声、线性度、Jitter、相噪、耦合和仿真方法；JKU 不覆盖本项目 SerDes 的 FFE/DFE/CTLE、眼图、BER、CDR 架构等核心内容，不能替代 SerDes 专用教材 |
| ADC/DAC、DDR/HBM、Die-to-Die | JKU RFIC 仅提供部分通用模拟/RF 背景 | 不视为这些专题的完整教材，仍需各自寻找对应的架构、协议、测试和电路资料 |

### PLL 改造执行方案

PLL 教程已确定按 A–F 重排，保留旧 01–18 章链接和页签映射。JKU 支撑原理推导；TI LMX2594EVM 提供整机建模与实测对照，ADI AN143 提供参考杂散验证，论文提供片内电路案例。自建 SKY130 配置用于可改电路的整机实验，各自使用可追溯的参数和工况。先做共享 Type-II 模型修正、EVM 频响复算，再完成杂散、相噪和整机验收。[PLL 改造计划](../pll/docs/JKU_PLL_REDESIGN.md) · [实验台账](../pll/EXPERIMENT_LEVEL_ROADMAP.md) · [296 处公式标注台账](../pll/docs/PLL_FORMULA_SOURCE_INVENTORY.md)

### JKU 图表、引用和许可使用规范

1. **优先定位到完整讲义中的具体图号。** 不要只把图注链接到 Slides 首页或整份课件；引用时尽量链接到 `rfic.html#fig-...` 的具体图锚点，并在图注写明作者/课程、Figure 编号和来源。
2. **区分原图与教学重绘。** 直接使用原图时标注“原图”；根据原图重新绘制时标注“依据 JKU Figure xx 重绘”，不得让读者误认为是原始电路图或实测结果。
3. **已核对的图号示例：**
   - [Figure 75：XOR Phase Detector](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pd-xor-diagram)
   - [Figure 84：PLL Phase-Noise Contributions](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-phase-noise)
   - [Figure 86：Delay-Line TDC](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-tdc)
   - [Figure 97：Reference Frequency Doubler](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-ref-doubler)
4. **图号章节范围便于快速检索：** Figure 59–73 属于 Oscillators；Figure 74–98 属于 PLL；Figure 99 起进入 Power Amplifiers。引用前仍应以当前完整讲义中的图题和上下文为准。
5. **许可：** JKU 课程源码声明采用 Apache-2.0。若复制、修改或随课程发布其内容，应遵守许可证要求，保留版权/许可声明，对修改过的文件明确标记修改，并检查原课程中嵌入的第三方图表是否另有许可限制。记录来源不等于自动获得所有嵌入素材的再分发权。

### 当前状态与边界

- JKU 已纳入**总体参考体系和章节映射**；不代表 11 个课件内容已经导入本仓库，也不代表新增 RFIC 前端专题已经制作。
- 现有 PLL 第 01–18 章保持原有进度；本次路线图更新不修改 HTML、图片、公式或实验代码。
- 下一轮优先工作：先核对并完善 PLL 第 12、13 章的 JKU 引用与图号；再把 JKU Simulation 的分析方法映射到 L3/L4 实验；随后规划 RFIC 基础与模拟射频前端专题。
- JKU 资料作为重要参考之一，不作为唯一教材。涉及 SerDes、ADC/DAC、DDR/HBM、Die-to-Die 和具体芯片实现时，仍需引入对应标准、教材、论文、产品手册和实测资料。

## 实验体系与逐项状态（2026-11-15 起）

课程图表和实验统一按 **L1/L2/L3/L4** 记录，而不是只用“实验已完成”一个状态：

| 级别 | 读者体验 | 数据来源 | 是否需要账号 |
|---|---|---|---|
| **L1 公式交互** | 网页上调滑块，公式和教学模型实时计算曲线 | 本地 JS / 解析式 / 数值行为模型 | 否 |
| **L2 预计算仿真交互** | 在网页选择参数，立即显示先前跑好的真实仿真曲线 | 真实 SPICE/RTL/数值仿真输出的精简数据；应能追溯 L3 | 否 |
| **L3 云端完整实验** | 看作者已经运行的 Notebook、原始数据、图表、模型、脚本和日志 | 作者发布的实验快照；首选 Kaggle（待实测） | 公开阅读原则上不需要，需验证 |
| **L4 自主复现与改参** | 读者复制 L3 的工程，改变参数、重新运行、保存结果 | 同一工程 + 读者自己的计算资源 | 一般需要 |

**维护规范：**

- L1 是教学计算模型，不等于 SPICE；预存 JS 结果不能冒充 L2。
- 不要求所有知识点都建设到 L4。基础定义和结构图通常保留 L1，真实非理想行为才值得深度仿真。
- L2 优先由 L3 标准实验自动导出，保留单位、条件、实验 ID 与数值精度；网页仍必须离线、快速、无云端依赖。
- **[PLL 18 章逐实验四级状态与 L3/L4 规划](../pll/EXPERIMENT_LEVEL_ROADMAP.md)** 是实验建设的详细台账，包含 49 个实验/交互项、共用的仿真工程、当前已完成状态、下一步参数及优先级。
- Kaggle 公开发布作为下一步，**本次只是路线图与台账整理**，不视为 L3/L4 已完成。现有第 07 章 CP 纹波和第 08 章 LC VCO 有 L2 数据原型。

## 进度原则

- 逐章制作、逐章核验，不一次性批量生成空洞页面。
- 章节完成后更新专题进度、总 CHANGELOG 和入口。
- HTML 必须离线运行；公式和必要资源需本地化。
- 真实产品/论文图与教学重绘图明确区分，并记录来源。
