# PLL A Source-First V2 执行状态

> 本节为当前 V2 任务断点；下方保留 V1 Classroom 开发历史。恢复时先读本节，再核对 GitHub main。

## 当前任务信息

- 项目：模拟系统知识学习 / thecloud723/analog-ic-learning
- 任务：PLL A 六页 Source-First 内容改造 V2
- 权威内容规范：pll/docs/PLL_A_SOURCE_FIRST_SDD_V2_2026-11-19.md
- 内容清单：pll/docs/PLL_A1_A2_CONTENT_CHECKLIST_2026-11-19.md
- 交互/模型规范：pll/docs/PLL_A_CLASSROOM_SDD_2026-11-19.md
- 当前分支：main
- 审计基线 SHA：41b3444f46878f65d6769aa6f951572ec7d149d0
- 最新本次提交：A2.2 原教材正文与交互顺序 17ce8e54502e01187bf3b560062a3fb1e5d9af01
- 当前阶段：Phase 2 A2.2 完成；继续 A2.3
- 最后更新时间：2026-11-19（Asia/Shanghai）

## V2 工作清单

| Task ID | 页面/模块 | 计划修改文件 | 状态 | 对应 commit | 测试结果 | 剩余问题 |
|---|---|---|---|---|---|---|
| V2-00 | 原教材审计与来源映射 | pll/docs/PLL_A_SOURCE_MAPPING_V2.md、WORK_EXECUTION_STATE.md、PROGRESS.md | 已完成 | dbc22ef | 映射及状态文件已读回；基线 main=41b3444 | 实施阶段继续核验页面 |
| V2-01 | A2.1 教学样板 | pll/course/a2-1.html、a-classroom.css、tests/test_a_classroom_pages.py | 已完成 | 7a463fe | Node 模型套件 8/8；A2.1 Reset 接线 unittest 通过；来源顺序/MathML/100 MHz 40 ps/1.44°/URL 自检通过 | 浏览器桌面/手机视觉待整页回归 |
| V2-02 | A2.2 频差积分 | pll/course/a2-2.html | 已完成 | 17ce8e5 | Node 模型套件 8/8；静态断言确认 JKU §6.7/§7.1、Fig.73 链接、本课程推导、2.15/+0.15 cycle 测试向量及分页 | 浏览器视觉/手机视口待集成验收 |
| V2-03 | A2.3 PFD | pll/course/a2-3.html | 进行中（下一项） | — | 待测 | Fig.77–81 原图组；REF/FB 顺序及脉宽 |
| V2-04 | A1.1 框图/频率链 | pll/course/a1-1.html | 未开始 | — | 待测 | Fig.74 主体；ADF4351 官方链接；VCO 内部频率与输出 D |
| V2-05 | A1.2 锁定与模型 | pll/course/a1-2.html | 未开始 | — | 待测 | Type-I Fig.76 Eq.62–64 与 Type-II Fig.83 Eq.67–69 区分 |
| V2-06 | A1.3 相噪读图 | pll/course/a1-3.html、materials/pll/FIGURE_MANIFEST.csv、必要的旧图引用 | 未开始 | — | 待测 | TI/ADI 官方链接；dBc/dBc/Hz 与 marker 来源 |
| V2-07 | 公共样式和测试 | pll/course/a-classroom.css、tests/test_a_classroom_pages.py | 进行中 | 7a463fe | 增加 Source-First 样式、A1.3 受限素材断言和顺序检查；全六页测试待页面全部改造 | 完成六页后全套回归 |
| V2-08 | 文档/实验台账 | README、主纲、页计划、成熟度台账、PROGRESS、执行状态、V2 验收报告 | 未开始 | — | 待测 | 不改变 L1–L4 成熟度判定 |
| V2-09 | 集成与 Pages 验收 | 六页、原图、MathML、桌面/手机、B–F、部署 | 未开始 | — | 待测 | 未实测项目保持未验证 |

## 已核验事实

- 最新审计基线 SHA 以上述 GitHub main 为准。main 新增了 A1–A2 内容清单，已将其纳入编排参考；旧 V1 页面验收不作为 V2 结果。
- 六个 Classroom URL、侧栏和翻页骨架保持原样。当前 HTML 先放 Predict/Workbench，V2 要求把来源教材正文移到交互主体前。
- JKU §7.1 原式 Δφ=2π·Δt/T_ref 和 V_error=K_PD·Δφ 均无编号；已在 A2.1 主体使用 MathML 并配套单位/正负号约定。Eq.62–64 为 Type-I；§7.2 Eq.67–69 为 Type-II CP-PLL。现有三曲线模型不可引用 Eq.62–64。
- A2.1 约定 Δt=t_FB−t_REF、Δφ=φ_REF−φ_FB。100 MHz、+40 ps → +1.44°。相位式来源是 JKU，符号方向由页面声明。
- A1.3 TI marker：10 kHz −105.1543、100 kHz −108.0194、1 MHz −116.4369、10 MHz −141.5219 dBc/Hz；图内 53.169 fs 是原图测量读数，不由四点重算。教学可视化与原测量图区分。
- JKU Fig.73 原图在当前 PLL 图目录缺失；使用 §6.7 原公式及 Fig.73 官方定位，不自行重绘。

## 下一步工作

1. 立即完成 A2.3：按 JKU Fig.77–81 排入 PFD 电路及四工况原图，保留逐事件/多周期状态机。
2. 继续 A1.1、A1.2、A1.3，逐页完成原图/公式编排与独立数值/结构验收。
3. 六页完成后跑完整 Python/Node/视觉/部署/导航/B–F 回归；未能实测的项明确标为未验证。
4. 完成映射、README/主纲/页计划/台账/PROGRESS/最终验收报告并推送。

## 中断恢复协议

读取本节和 GitHub main SHA，从首个非“已完成”任务恢复；先 fetch 最新版本再写入。禁止把旧 V1 通过项当作 V2 验收，也不要重复建设模型。
---

# PLL A Classroom 持续执行状态

## 当前任务信息

- 项目：模拟系统知识学习 / `thecloud723/analog-ic-learning`
- 任务：PLL A 部分 Classroom 交互式课程完整开发
- 权威设计：`pll/docs/PLL_A_CLASSROOM_SDD_2026-11-19.md`
- 当前分支：`main`
- 已核对 main HEAD（本状态更新前）：`0b33b2f956b1e520c86f01e6f58976132af8df96`
- 最新代码/视觉修订提交：`0b33b2f956b1e520c86f01e6f58976132af8df96`
- 文档批次提交：`3466ba25c72df42c9ed7c65bc5b0c7f2ef8710ed`
- 持续状态 checkpoint：本文件随本次文档提交更新；恢复时以 GitHub `main` ref 为准，并将分支 SHA 与这里记录的最新代码提交核对。
- Pages 工作流：`44533031320`，成功；A1.1 图框、A1.2/A2.3 图例已在部署页核验
- 当前阶段：Phase 4 文档归档已推送；整体验收保留部分验证
- 最后更新时间：2026-11-19（Asia/Shanghai）
- 范围约束：不修改 SerDes 专题，不重构 PLL B–F；成熟度以 `pll/EXPERIMENT_LEVEL_ROADMAP.md` 为准。

## Phase 0 审计结论

- 以真实 GitHub main 为实施基线；开始时文档记录的旧 SDD 基线已过期，实际审计使用当时 main HEAD。此次最后核对的实现头为 `0b33b2f956b1e520c86f01e6f58976132af8df96`。
- 六个 A 页面保留既有 URL、侧栏、翻页和 B–F 导航；旧 A 页交互层由共享 Classroom CSS、模型、数据和 UI 层承担，未改 `course.js`。
- A1.1、A1.3、A2.3 来源图和数据在仓库核对；A1.3 使用 TI LMX2594 手册原始 Fig. 5-1 和来源中的离散 marker，不将其描述为本项目测量。
- 核对关键符号：A2.1 `Δt=tFB−tREF`、`Δφ=φREF−φFB`；A2.2 wrapped 相位使用半开区间 `[-0.5,+0.5)` cycle；A2.3 按 REF/FB 事件顺序及 reset delay 推导 UP/DN；A1.2 分列频率误差、VCTRL 偏差和相位误差。
- A-INT-01～06 均为 L1 课程交互/行为模型；TI 实测图仍是外部实测素材，不把 UI 实验提升为 L2–L4。

## 工作清单

| Task ID | 页面/模块 | 修改范围 | 状态 | 已推送提交 | 测试与证据 | 剩余问题 |
|---|---|---|---|---|---|---|
| A-00 | Phase 0 审计 | 六页、共享资源、图/数据、公式、导航 | 已完成 | `8854bd357650a19d26cf9f2c66a34a515c7c9515` 起始状态记录 | 对照 SDD 与真实 main；公式符号与 TI marker 已核验 | 无 |
| A-01 | 公共架构 | `a-classroom.css`、`a-classroom-models.js`、`a-classroom-data.js`、`a-classroom.js` | 已完成 | `2296e26`、`e0c4f95`、`801c564`、`e108790`、`0b33b2f` | Node 8/8；Python 页面测试 8/8；三个 JS 语法检查；当前 JS v6/CSS v8 已在线加载 | 手机/离线浏览器验收另列 |
| A1.1 | 整机组成 | 既有页面 URL、SVG 框图、Guided Tour、R/N/D 频率链 | 已完成 | `2296e26`；当前头 `0b33b2f` | 40 MHz、R=1、N=125、D=2 → fVCO=5 GHz、fOUT=2.5 GHz；N=126 与 D=4 复核；预测/检查和导览通过 | 最新桌面页面已加载；无功能遗留 |
| A1.2 | 锁之前与锁之后 | 三同步曲线、时间游标、播放控件 | 已完成 | `2296e26`；当前头 `0b33b2f` | 正负初始频差、游标、Play/Pause/Step/Restart/Reset；频率/VCTRL/相位读数区分；最新部署三图图例可见 | 模型为解析近锁 L1 |
| A1.3 | 第一张相噪图 | TI 原图、marker、dBc 与 dBc/Hz | 已完成 | `2296e26`；当前头 `0b33b2f` | 原图与四 marker 核对；14.0000289 GHz 载波；marker 切换、单位含义、检查题和 Reset 已实测 | 最新图例共享绘图器已覆盖；不代表本项目测量 |
| A2.1 | 时间差到相位差 | 双时钟边沿、相位圆盘、双输入模式 | 已完成 | `2296e26`；当前头 `0b33b2f` | 100 MHz / +40 ps=+1.44°；200 MHz=+2.88°；负偏移得到负相位；拖动、键盘、Reset | L1 |
| A2.2 | 频差积成相位差 | 未包裹和模相位、时间游标 | 已完成 | `2296e26`；当前头 `0b33b2f` | +2 kHz、初相位 0.15 cycle、1 ms → 2.15 / +0.15 cycle；负频差、零频差和播放控件已查 | L1 |
| A2.3 | PFD 逐事件纠偏 | REF/FB、UP/DN/RESET、多周期频差 | 已完成 | `2296e26`；当前头 `0b33b2f` | REF-first 与 FB-first；220/20 ps 脉宽；100 vs 99.9/100.1 MHz 多周期方向、控制和 Reset；最新部署双曲线图例可见 | 理想 PFD 模型，不含 CP/VCO 闭环 |
| A-UNIT | 自动测试 | Node 模型套件、Python 页面套件、JS 静态语法 | 已完成 | `0b33b2f` | Node 8/8、Python 8/8、`node --check` 3/3 | 无 |
| A-DEPLOY | Pages 部署与线上检查 | GitHub Pages 六页与共享资产 | 已完成 | `0b33b2f` | Actions run `44533031320` 成功；六页交互曾逐页检查，当前头核验 A1.1/A1.2/A2.3；B–F 44/44 | 手机、离线、本地 HTTP 未验证 |
| A-REG | 综合回归与运行环境 | 视口、断网、本地 HTTP、Console、课程链接、B–F | 部分完成 | `0b33b2f` | 桌面 Pages 1363 px 已用；A1.1 图 client/scroll 均 762 px；过滤当前课堂 JS 错误为空；B–F 44/44 | 最新头本地 server 绑定失败；手机真实视口和浏览器 offline mode 均未验证；扩展自身 Console 噪声存在 |
| A-DOC | 文档与持续断点 | README、主纲、逐页计划、台账、进度、SDD、报告、本文件 | 进行中 | 既有文档批次 `3466ba25c72df42c9ed7c65bc5b0c7f2ef8710ed`；本次视觉验收补充随当前文档提交 | 代码与视觉检查已完成；需推送文档并读回验证 | 提交后读回 main 确认文件内容及 SHA |

## 测试证据和未验证项

- 最新代码头的模型测试：`node --test pll/course/tests/a-classroom-models.test.js`，8/8 通过，包含默认/边界频率链、正负时间相位、wrapped/unwrapped/零偏移、A1.2 近锁数值、PFD 事件先后/脉宽/多周期方向/非法边界。
- 最新页面结构测试：`python3 pll/course/tests/test_a_classroom_pages.py`，8/8 通过，检查六页共享资源、导航/流程、图轴/图例、行内符号标记和缓存版本。
- `node --check` 对三个共享 JS 全过。
- GitHub Actions Pages 部署 run `44533031320` 为 success；线上六页共用 JS `20261119-6`、CSS `20261119-8`。桌面视口 1363 px 下 A1.1 图容器宽/滚动宽均 762 px；A1.2、A2.3 曲线图例可见。
- 六页功能操作、数据和 B–F 44/44 页面回归已做。B–F 检查标题、主标题和侧栏链接，未修改 B–F 源码。
- 代码头 `36cdf052` 曾通过本地 HTTP 冒烟；对最新 `0b33b2f` 再次尝试多个端口时，当前托管沙箱拒绝本地监听/连接。因此最新头的本地 HTTP 不记为通过。
- 真实移动设备/手机视口布局未在浏览器中模拟；只静态审阅响应式断点，不作为移动验收。
- 浏览器断网模式下的六页交互未执行。当前云浏览器与 scratch localhost 不共享网络命名空间，且无法从本环境把该部署标签页切到离线。不得宣称已离线通过。
- Console 有云浏览器扩展自身 metadata 错误；未见课程来源错误，但不宣称全局零错误。

## 视觉/符号专项复核（本状态更新）

- A1.1 SVG 框图已重新排布为两行路径拓扑，并区分参考、控制、反馈、RF 输出；部署页 1363 px 视口下图容器宽与内容宽均 762 px，无图内横向溢出。
- 六页共享行内符号显示为数学式样：变量斜体、描述性下标正体/下标化；动态参数、读数和选项也走同一渲染约定。代码提交 `0b33b2f956b1e520c86f01e6f58976132af8df96`，Pages run `44533031320` 成功。
- 实测 A1.1 `D=4` → `fOUT=1.2500 GHz`、`fVCO=5.0000 GHz`，Reset 恢复 `D=2`、`fOUT=2.5000 GHz`；A1.2 `+100 kHz`、游标 `5 μs` → `−18.196 kHz`、`−0.18196 mV`、`−1.5499 mrad`。

## 下一步工作（恢复时从这里开始）

1. 用支持 viewport/device emulation 的浏览器对当前 main 部署的六个 A URL 逐一设为约 390 px；检查页面横向溢出、滑块/按钮可达、图轴/图例可读。若发现问题，改 `pll/course/a-classroom.css` 或对应页面并重跑 `python3 pll/course/tests/test_a_classroom_pages.py` 与 Node 模型套件。
2. 在支持 DevTools 网络离线模式的浏览器中先载入 A1.1–A2.3，再断网检查本地脚本/图片、参数更新、Play/Step/Reset；失败则修复资源路径/初始化，再重验。
3. 在允许本地监听的环境对当前 `0b33b2f` 文件树启动静态 HTTP，检查六页 HTML、四个共享资源的状态码和 MIME；当前托管环境已拒绝本地监听，不能把较早 SHA 的结果当作当前头证据。
4. 更新 `pll/docs/PLL_A_CLASSROOM_ACCEPTANCE_REPORT.md`、`pll/docs/WORK_EXECUTION_STATE.md` 和 `pll/PROGRESS.md` 中的实测结果；完成上述三项之前保持“部分验收通过”。

## 中断恢复协议

恢复时先读取本文件和 GitHub main 最新 HEAD，再从“下一步工作”第一项继续。不要重复已通过的 Node、Python、语法、公式向量或 B–F 回归。不能完成的项目留在“未验证”，不能以规划或代码存在代替实测。
