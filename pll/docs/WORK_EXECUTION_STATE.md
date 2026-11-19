# PLL A Classroom 持续执行状态

## 当前任务信息

- 项目：模拟系统知识学习 / `thecloud723/analog-ic-learning`
- 任务：PLL A 部分 Classroom 交互式课程完整开发
- 权威设计：`pll/docs/PLL_A_CLASSROOM_SDD_2026-11-19.md`
- 当前分支：`main`
- 已核对 main HEAD（本状态更新前）：`0ca0662192aac0e0b60d6faff966f043e4dfec8e`
- 最新代码提交：`e108790043e31981495fcdec7f33ce00a7711dd5`
- 文档批次提交：`3466ba25c72df42c9ed7c65bc5b0c7f2ef8710ed`
- 持续状态 checkpoint：`0ca0662192aac0e0b60d6faff966f043e4dfec8e`；本次修订将作为其后继提交。恢复时仍先读取 GitHub main ref，取得当前 HEAD。
- Pages 工作流：`44489881106`，成功；A1.2 与 A2.3 最新图例已在部署页核验
- 当前阶段：Phase 4 文档归档已推送；整体验收保留部分验证
- 最后更新时间：2026-11-19（UTC）
- 范围约束：不修改 SerDes 专题，不重构 PLL B–F；成熟度以 `pll/EXPERIMENT_LEVEL_ROADMAP.md` 为准。

## Phase 0 审计结论

- 以真实 GitHub main 为实施基线；开始时文档记录的旧 SDD 基线已过期，实际审计使用当时 main HEAD。此次最后核对的实现头为 `e108790043e31981495fcdec7f33ce00a7711dd5`。
- 六个 A 页面保留既有 URL、侧栏、翻页和 B–F 导航；旧 A 页交互层由共享 Classroom CSS、模型、数据和 UI 层承担，未改 `course.js`。
- A1.1、A1.3、A2.3 来源图和数据在仓库核对；A1.3 使用 TI LMX2594 手册原始 Fig. 5-1 和来源中的离散 marker，不将其描述为本项目测量。
- 核对关键符号：A2.1 `Δt=tFB−tREF`、`Δφ=φREF−φFB`；A2.2 wrapped 相位使用半开区间 `[-0.5,+0.5)` cycle；A2.3 按 REF/FB 事件顺序及 reset delay 推导 UP/DN；A1.2 分列频率误差、VCTRL 偏差和相位误差。
- A-INT-01～06 均为 L1 课程交互/行为模型；TI 实测图仍是外部实测素材，不把 UI 实验提升为 L2–L4。

## 工作清单

| Task ID | 页面/模块 | 修改范围 | 状态 | 已推送提交 | 测试与证据 | 剩余问题 |
|---|---|---|---|---|---|---|
| A-00 | Phase 0 审计 | 六页、共享资源、图/数据、公式、导航 | 已完成 | `8854bd357650a19d26cf9f2c66a34a515c7c9515` 起始状态记录 | 对照 SDD 与真实 main；公式符号与 TI marker 已核验 | 无 |
| A-01 | 公共架构 | `a-classroom.css`、`a-classroom-models.js`、`a-classroom-data.js`、`a-classroom.js` | 已完成 | `2296e26`、`e0c4f95`、`801c564`、`e108790` | Node 8/8；三个 JS 语法检查；最新图例线上可见 | 手机/离线浏览器验收另列 |
| A1.1 | 整机组成 | 既有页面 URL、SVG 框图、Guided Tour、R/N/D 频率链 | 已完成 | `2296e26`；当前头 `e108790` | 40 MHz、R=1、N=125、D=2 → fVCO=5 GHz、fOUT=2.5 GHz；N=126 与 D=4 复核；预测/检查和导览通过 | 最新桌面页面已加载；无功能遗留 |
| A1.2 | 锁之前与锁之后 | 三同步曲线、时间游标、播放控件 | 已完成 | `2296e26`；最新图例 `e108790` | 正负初始频差、游标、Play/Pause/Step/Restart/Reset；频率/VCTRL/相位读数区分；最新部署三图图例可见 | 模型为解析近锁 L1 |
| A1.3 | 第一张相噪图 | TI 原图、marker、dBc 与 dBc/Hz | 已完成 | `2296e26`；最新共享图例 `e108790` | 原图与四 marker 核对；14.0000289 GHz 载波；marker 切换、单位含义、检查题和 Reset 已实测 | 最新图例共享绘图器已覆盖；不代表本项目测量 |
| A2.1 | 时间差到相位差 | 双时钟边沿、相位圆盘、双输入模式 | 已完成 | `2296e26`；当前头 `e108790` | 100 MHz / +40 ps=+1.44°；200 MHz=+2.88°；负偏移得到负相位；拖动、键盘、Reset | L1 |
| A2.2 | 频差积成相位差 | 未包裹和模相位、时间游标 | 已完成 | `2296e26`；当前头 `e108790` | +2 kHz、初相位 0.15 cycle、1 ms → 2.15 / +0.15 cycle；负频差、零频差和播放控件已查 | L1 |
| A2.3 | PFD 逐事件纠偏 | REF/FB、UP/DN/RESET、多周期频差 | 已完成 | `2296e26`；最新图例 `e108790` | REF-first 与 FB-first；220/20 ps 脉宽；100 vs 99.9/100.1 MHz 多周期方向、控制和 Reset；最新部署双曲线图例可见 | 理想 PFD 模型，不含 CP/VCO 闭环 |
| A-UNIT | 自动测试 | Node 模型套件、Python 页面套件、JS 静态语法 | 已完成 | `e108790` | Node 8/8、Python 6/6、`node --check` 3/3 | 无 |
| A-DEPLOY | Pages 部署与线上检查 | GitHub Pages 六页与共享资产 | 已完成 | `e108790` | Actions run `44489881106` 成功；六页交互曾逐页检查，最新头实时复核 A1.1/A1.2/A2.3；B–F 44/44 | 全页最新图例视觉复核未逐页重跑 |
| A-REG | 综合回归与运行环境 | 视口、断网、本地 HTTP、Console、课程链接、B–F | 部分完成 | `e108790` | 桌面 Pages 已用；B–F 44/44；课程来源 Console 未见报错；早一代码头本地 HTTP 200 | 最新头本地 server 绑定失败；手机真实视口和浏览器 offline mode 均未验证；扩展自身 Console 噪声存在 |
| A-DOC | 文档与持续断点 | README、主纲、逐页计划、台账、进度、SDD、报告、本文件 | 已完成 | 文档批次 `3466ba25c72df42c9ed7c65bc5b0c7f2ef8710ed`；状态 checkpoint `0ca0662192aac0e0b60d6faff966f043e4dfec8e` | 八份文档在 GitHub main 已创建/更新；A-INT 仍为 L1 | 无；恢复时先读取最新 main ref |

## 测试证据和未验证项

- 最新代码头的模型测试：`node --test pll/course/tests/a-classroom-models.test.js`，8/8 通过，包含默认/边界频率链、正负时间相位、wrapped/unwrapped/零偏移、A1.2 近锁数值、PFD 事件先后/脉宽/多周期方向/非法边界。
- 最新代码头页面结构测试：`python3 -m unittest discover -s pll/course/tests -p 'test_*.py' -v`，6/6 通过，检查六页共享资源、导航/流程、图轴和曲线系列名、缓存版本。
- `node --check` 对三个共享 JS 全过。
- GitHub Actions Pages 部署 run `44489881106` 为 success；线上 A1.1、A1.2 和 A2.3（多周期）加载了 `20261119-3` 资产；图例在 A1.2、A2.3 可见。
- 六页功能操作、数据和 B–F 44/44 页面回归已做。B–F 检查标题、主标题和侧栏链接，未修改 B–F 源码。
- 代码头 `36cdf052` 曾通过本地 HTTP 冒烟；对最新 `e108790` 再次尝试多个端口时，当前托管沙箱拒绝本地监听/连接。因此最新头的本地 HTTP 不记为通过。
- 真实移动设备/手机视口布局未在浏览器中模拟；只静态审阅响应式断点，不作为移动验收。
- 浏览器断网模式下的六页交互未执行。当前云浏览器与 scratch localhost 不共享网络命名空间，且无法从本环境把该部署标签页切到离线。不得宣称已离线通过。
- Console 有云浏览器扩展自身 metadata 错误；未见课程来源错误，但不宣称全局零错误。

## 下一步工作（恢复时从这里开始）

1. 在具备浏览器设备仿真和网络离线开关的运行环境里，对 GitHub Pages 当前 main 做手机宽度交互和断网刷新/Reset 验收。
2. 若可用本地静态服务器的执行环境可用，则对 `e108790` 文件树重新做六页与三个共享 JS 的 HTTP/MIME 冒烟。
3. 用上述环境重新检查六页当前版本的图例布局、无溢出情况和 Console 来源。只记录实测；修复后再跑对应测试、提交、更新本文件和验收报告。
4. 在具备上述工具环境后完成未验证项，再把部分验收更新为全项通过；此前不要宣布 PLL A 整体验收完成。

## 中断恢复协议

恢复时先读取本文件和 GitHub main 最新 HEAD，再从“下一步工作”第一项继续。不要重复已通过的 Node、Python、语法、公式向量或 B–F 回归。不能完成的项目留在“未验证”，不能以规划或代码存在代替实测。
