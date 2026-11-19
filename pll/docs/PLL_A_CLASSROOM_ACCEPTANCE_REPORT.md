# PLL A Classroom 验收报告

> 日期：2026-11-19  
> 验收对象：GitHub main 代码提交 `0b33b2f956b1e520c86f01e6f58976132af8df96`  
> Pages 部署：GitHub Actions run [44533031320](https://github.com/thecloud723/analog-ic-learning/actions/runs/44533031320)，状态 success  
> SDD：[`PLL_A_CLASSROOM_SDD_2026-11-19.md`](PLL_A_CLASSROOM_SDD_2026-11-19.md)  
> 当前结论：**部分验收通过，整体验收尚未完成。** 手机真实视口、浏览器断网模式和最新头本地 HTTP 冒烟未验证，故不宣布 A 部分全项通过。

## 1. 实际交付

共享实现位于 `pll/course/a-classroom.css`、`a-classroom-models.js`、`a-classroom-data.js`、`a-classroom.js`；保留六个现有页面 URL。六页都按 Learn → Predict → Explore → Observe → Explain → Check 组织，复用预测/检查卡、参数面板、数值读数、交互图、解释和来源说明。共享图表显示坐标、单位、轴标签和曲线图例。新增 Node 模型测试；原始图和测量数据保留来源与证据口径。

A 部分交互成熟度为 **L1**。A1.2 是解析近锁教学模型，A2.1–A2.3 是公式/理想事件行为模型；A1.3 显示 TI 的原始测量图和离散 marker，不代表本项目实测。没有将计划实验标成 L2、L3 或 L4。

## 2. 逐页验收

| 页面 | 已实现并实际操作 | 数值/证据检查 | 结果与边界 |
|---|---|---|---|
| A1.1 整机由哪些模块组成 | SVG 模块和信号路径、Guided Tour、R/N/D 输入、预测/检查 | R=1、N=125、D=2、fREF=40 MHz → fPFD=40 MHz、fVCO=5 GHz、fFB=40 MHz、fOUT=2.5 GHz；N=126 得 5.04/2.52 GHz；D=4 只将 fOUT 降为 1.25 GHz | 功能通过；明确 fVCO 与最终输出频率是不同节点。通用整数关系，不替代特定芯片寄存器校验 |
| A1.2 锁之前与锁之后 | 三条同步曲线、共享时间游标、Play/Pause/Step/Restart/Reset | 初始 +100 kHz 时 t=0 读数为 +100 kHz、+1 mV、0 mrad；t=2.25 μs 为 −6.493 kHz、−0.06493 mV、−4.0286 mrad；负频差方向也查过 | 功能通过；分别显示频率误差、控制电压偏差、相位误差。解析近锁模型，不是完整锁定捕获仿真 |
| A1.3 第一张相噪图怎么读 | TI 原图、离散 marker、marker 读数、dBc/Hz 与 dBc 解释、检查和 Reset | TI LMX2594 Fig. 5-1 载波约 14.0000289 GHz；10 kHz −105.2 dBc/Hz、100 kHz −108.0 dBc/Hz、1 MHz −116.4 dBc/Hz；marker 为原图读数，不做点间插值 | 功能通过；dBc/Hz 是单边带相噪密度读数，dBc 是相对载波的离散电平。来源是 TI 图，不是本项目测试 |
| A2.1 时间差怎样变成相位差 | 时间/相位输入模式、双时钟边沿拖动、键盘微调、相位圆盘和 Reset | Δt=tFB−tREF，Δφ=φREF−φFB；100 MHz、+40 ps → +1.44°；200 MHz → +2.88°；200 MHz、−40 ps → −2.88° | 正负符号与频率换算通过；L1 解析模型 |
| A2.2 频差怎样积成相位差 | 正/负频差、未包裹与模相位曲线、共享游标和 Play/Pause/Step/Restart/Reset | Δf=+2 kHz、φ0=0.15 cycle、t=1 ms → φu=2.15 cycle、φwrapped=+0.15 cycle；−2 kHz → −1.85/+0.15；零频差保持初相位 | 功能与回卷边界通过；wrapped 区间为 [−0.5,+0.5) cycle；L1 模型 |
| A2.3 PLL 第一次怎么纠偏 | REF/FB 事件逐步播放、UP/DN/RESET 时序、单周期/多周期频差、Reset | REF=0、FB=+200 ps、reset=20 ps → UP=220 ps、DN=20 ps；FB-first 对调方向；REF=100 MHz、FB=99.9/100.1 MHz 多周期曲线方向相反 | 事件顺序、复位、脉宽和多周期变化通过；不含 CP、电压、VCO 连续闭环 |

最新排版修订部署后，GitHub Pages 当前头 `0b33b2f` 已实时检查 A1.1/A1.2/A2.3；A1.2 三条曲线图例与 A2.3 多周期 UP/DN 图例可见。A1.1 框图在 1363 px 桌面视口下内容宽 762 px，容器宽与滚动宽均为 762 px（无图内横向溢出）。其余三页在紧邻版本已逐页加载和操作；当前共享 JS v6 已逐页加载，图片资源在 A1.3 成功读取。

## 3. 自动化测试

| 检查 | 结果 | 说明 |
|---|---:|---|
| Node 模型套件 | 8/8 通过 | 频率链、正负时间/相位、wrapped/unwrapped、近锁响应、PFD 先后顺序/脉宽/多周期方向、异常边界 |
| Python 页面套件 | 8/8 通过 | 六页结构/导航/资源/流程/图轴/曲线图例和当前缓存版本 |
| JavaScript 语法 | 3/3 通过 | `a-classroom.js`、`a-classroom-data.js`、`a-classroom-models.js` |
| GitHub Pages 部署 | 成功 | run 44533031320 对应提交 0b33b2f |
| B–F 导航回归 | 44/44 通过 | 逐页确认标题、主标题和侧栏，未改 B–F/SerDes 源码 |

固定公式向量包含：40 MHz integer-N 频率链、时间差相位正负方向、未包裹/模相位及零频差、A1.2 近锁采样值、PFD REF-first/FB-first 脉宽和多周期频差方向。测试文件为 `pll/course/tests/a-classroom-models.test.js` 和 `pll/course/tests/test_a_classroom_pages.py`。

## 4. 图像、数据与物理口径

- A1.1 使用 JKU Fig. 74 教学框图及 ADI ADF4351 产品框图；分别呈现 VCO 与输出分频节点。
- A1.3 使用本地保存的 TI LMX2594 SNAU210B Fig. 5-1 原图。marker 为原图标示读数；仅以离散点展示，不在点间编造连续数据。
- A2.3 的 PFD 原理解释注明理想模型边界，包含 JKU Fig. 78/79 来源。
- 公式与适用边界以页面来源说明、SDD 和课程公式索引为准；项目内生成曲线标注为行为/数学模型，未称为真实测量。
- 本次测试未把 SDD 中规划的 L2–L4 实验记作已完成。

## 5. 未验证项与恢复动作

1. **手机真实视口：未验证。** 目前云浏览器不暴露可用的 viewport/device emulation 设置；响应式 CSS 和页面静态测试不能替代真实窄屏交互检查。恢复环境需在约 390 px 视口逐页检查横向溢出、控件可达和图表尺寸。
2. **浏览器离线交互：未验证。** 云浏览器无法切换当前 Pages 标签为 offline；它与 scratch localhost 不共享网络命名空间。应在可用浏览器 DevTools 的环境先载入页面，再切断网络，检查六页图/模型、Reset 与资源是否可工作。
3. **最新头本地 HTTP：未验证。** 最新提交 `0b33b2f` 上对端口 8787、36101、39209 的本地服务/连接尝试均被当前托管沙箱拒绝。较早代码头 `36cdf052` 的静态 HTTP 六页和共享脚本曾返回 200；该结果不冒充最新代码头测试。
4. **全局 Console 零错误：未验证。** 云浏览器扩展产生 metadata 错误噪声；查看的课程页面未见课程来源错误，但不能据此宣称全局零错误。

下一步是在具备设备视口、浏览器网络离线开关和本地静态服务器的浏览器环境中补完上述验收。修复任何新问题后，需重跑对应检查并更新本报告和持续状态。此前整体结论维持“部分验收通过”。

## 6. 图框与数学排版专项复核（2026-11-19）

本轮针对实际页面中“框图过于粗糙、`fREF` 等符号像纯文本且下标/斜体不正确”的反馈完成修订，并在 Pages 部署页检查：

- A1.1 框图重新整理为两行拓扑，按参考、控制、反馈和 RF 输出路径区分颜色；反馈分频器、VCO 内部频率、输出分频器和最终 RF 输出分别标注，避免把 `fVCO` 与 `fOUT` 混为一个节点。
- 变量和公式读数采用共享行内数学标记：变量斜体，`REF`、`VCO` 等描述性下标使用真正的下标结构并保持正体；公式和普通句子中的符号保持行内排版，不依赖远程公式库。
- 1363 px 桌面视口测得 A1.1 图容器 `clientWidth=762`、`scrollWidth=762`，没有图内横向滚动；页面其他断点仍需手机真实视口验收。
- 在线操作 A1.1：输出分频 `D=4` 后 `fOUT=1.2500 GHz`、`fVCO=5.0000 GHz`；按 Reset 后恢复 `D=2`、`fOUT=2.5000 GHz`。
- 在线操作 A1.2：输入初始 `Δf0=+100 kHz`、时间游标 `t=5 μs`，三条读数分别显示 `ΔfVCO=−18.196 kHz`、`ΔVCTRL=−0.18196 mV`、`Δφe=−1.5499 mrad`，确认变量、下标和单位在实时值中正常显示。
- 对 `a-classroom.js?v=20261119-6` 的浏览器错误过滤结果为空；不代表云浏览器扩展自身无错误，也不取代未完成的手机/离线测试。

## 7. 相关提交

- 页面和共享 Classroom 实现起点：`2296e26a00bcd7f0d6a223209754ab027a6564a2`
- 模型/导航资源修复：`e0c4f954949de871d5644a31f57f4803cb8b43cb`
- 布局和 Reset 修复：`801c564ce28ceaeeb25c49f946994e4d6db9a885`
- 资源缓存版本修复：`36cdf0526ab2253fff87ab3372b64f32f23a41cd`
- 图例及最新模型/页面断言：[`e108790043e31981495fcdec7f33ce00a7711dd5`](https://github.com/thecloud723/analog-ic-learning/commit/e108790043e31981495fcdec7f33ce00a7711dd5)
