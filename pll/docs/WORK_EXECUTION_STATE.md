# PLL A Source-First V2 执行状态

> 本节是本次 V2 任务断点。下方为 V1 Classroom 开发历史；恢复时先读取本节，再核对 GitHub main 最新 SHA。

## 当前任务信息

- 项目：模拟系统知识学习 / thecloud723/analog-ic-learning
- 任务：PLL A 六页 Source-First 内容改造 V2
- 权威内容规范：pll/docs/PLL_A_SOURCE_FIRST_SDD_V2_2026-11-19.md
- 编辑原则：pll/docs/PLL_SOURCE_FIRST_COURSE_EDITORIAL_SPEC_2026-11-19.md
- 交互/模型规范：pll/docs/PLL_A_CLASSROOM_SDD_2026-11-19.md
- 当前分支：main
- 最新已验证代码 SHA：fa00160778d9fb5b61d0945c412934142b997c95
- 最新内容/来源/验收文档 SHA：0ada8a663142a924bb52d9495877e8335e57d58f
- 本状态文件更新前 main HEAD：0ada8a663142a924bb52d9495877e8335e57d58f；本文件随其后的状态检查点提交，恢复时仍须重新读取 main。
- 本状态更新时间：2026-11-19（Asia/Shanghai）
- 当前阶段：Phase 4 文档归档已完成；整体验收部分通过，浏览器集成检查待有浏览器环境时补做。
- Pages workflow：run 44567452401，head fa001607，success（只证明构建/部署任务成功，不证明页面已在浏览器实测）。

## V2 工作清单

| Task ID | 页面/模块 | 计划修改文件 | 状态 | 对应 commit | 测试结果 | 剩余问题 |
|---|---|---|---|---|---|---|
| V2-00 | 原教材审计与来源映射 | pll/docs/PLL_A_SOURCE_MAPPING_V2.md、materials/pll/FIGURE_MANIFEST.csv | 已完成 | 0ada8a6（归档）、29ea81e（材料清理） | 定位六页章节/图号/公式与许可；TI/ADI 原图改 official-link-only | 浏览器链接可达性待实测 |
| V2-01 | A2.1 时间差→相位差 | pll/course/a2-1.html | 已完成 | 7a463fe | JKU §7.1 原式、100 MHz/40 ps=1.44°、正负号和静态结构检查；模型向量通过 | 页面视觉/手机浏览器未验 |
| V2-02 | A2.2 频差→相位差 | pll/course/a2-2.html | 已完成 | 17ce8e5 | JKU §6.7/§7.1 与本课程推导分开；2.15/+0.15 cycle 固定向量通过 | 页面视觉/手机浏览器未验 |
| V2-03 | A2.3 PFD 逐事件 | pll/course/a2-3.html | 已完成 | 530adf1 | Fig.77–81 来源与事件模型静态检查；REF/FB 顺序、reset 和多周期方向向量通过 | 页面视觉/手机浏览器未验 |
| V2-04 | A1.1 框图/频率链 | pll/course/a1-1.html | 已完成 | a3f0f05；标签/符号修订 fa001607 | Fig.74 来源主图、ADF 官方 PDF 链接；R/N/D 频率向量、Reset、Guided Tour 检查 | 页面视觉/手机浏览器未验 |
| V2-05 | A1.2 锁定与 Type-I/II | pll/course/a1-2.html、pll/course/a-classroom.css | 已完成 | 9b8a869 | Fig.76/Eq.62–64 与 Fig.83/Eq.67–69 分开；模型 t=0/采样向量通过；三曲线保留 | 页面视觉/手机浏览器未验 |
| V2-06 | A1.3 相噪读图 | pll/course/a1-3.html、pll/course/a-classroom-data.js | 已完成 | d368e848；厂商图清理 29ea81e | TI 四 marker、dBc/dBc/Hz、ADI Eq.2–3 与官方链接；无本地厂商图路径 | 页面视觉/手机浏览器未验 |
| V2-07 | 数学排版及交互框图标签 | 六个 a*.html、a-classroom.css/js/data、tests/test_a_classroom_pages.py | 已完成 | fa001607 | 119 个 MathML 块结构无错；无数值 HTML 实体、fREF/fVCO 等裸伪公式；三共享 JS 解析通过 | 真实浏览器字体效果待验 |
| V2-08 | 公式、图片与课程台账归档 | pll/docs/PLL_S1_04_FORMULA_INDEX.md、PLL_S1_05_FIGURE_MANIFEST.md、pll/EXPERIMENT_LEVEL_ROADMAP.md、PLL_MASTER_COURSE_OUTLINE、PLL_PAGE_PLAN、README、checklist | 已完成 | 0ada8a6 | 文档 GitHub 回读内容匹配；实验成熟度仍为 L1，旧图片清单标为历史 | 无 |
| V2-09 | 验收报告和进度断点 | pll/docs/PLL_A_SOURCE_FIRST_ACCEPTANCE_V2.md、pll/docs/WORK_EXECUTION_STATE.md、pll/PROGRESS.md | 已完成（此状态检查点提交后） | 0ada8a6 + 本状态提交 | 六页/模型/来源证据已归档；报告明确未验证项 | 状态提交 SHA 由 main 历史读取 |
| V2-10 | 六页真实浏览器/设备/离线及 B–F 回归 | 六个 A 页面、B–F 页面、共享资源 | 待验证 | — | 当前未运行 | 需可访问 Pages 的浏览器、390 px 视口、DevTools Offline/Console 与本地静态 HTTP |

## 已完成且已推送的代码/文档证据

- 六页 URL、导航和原有实验结构保留；每页正文先呈现来源材料和中文解释，再进入已存在的交互验证。
- JKU 可复用原图保留本地路径、原图号和许可信息；TI/ADI 厂商图没有镜像到公开页面；来源位置和现行清单已同步。
- A1.1 明确 fVCO 与最终 RF 输出是不同节点。A1.2 不混淆 Type-I/Type-II。A2.2 不把相位显示回卷称为 Cycle Slip。A2.3 明确理想 PFD 事件模型边界。
- V8 harness 中 Node 模型套件 8/8；32 个固定向量/边界断言通过。六页静态结构、关键控件、URL、Reset、导航和来源顺序检查通过。MathML 119/119 结构通过；共享 JavaScript 3/3 可解析。
- GitHub main 上 fa001607 的 Pages build/deployment workflow success；内容/来源/验收 docs commit 0ada8a6 已推送并抽样回读。A-INT-01～06 成熟度全为 L1。

## 下一步工作（精确恢复任务）

当前没有可用浏览器/截图、viewport、DevTools Offline/Console 或本地监听 shell。恢复环境后只做以下待验证项，不重做来源审计或改写交互：

1. 打开 https://thecloud723.github.io/analog-ic-learning/pll/course/a1-1.html、a1-2.html、a1-3.html、a2-1.html、a2-2.html、a2-3.html，逐页验证来源图/公式、R/N/D、Marker、拖动边沿、相位圆盘、共享曲线游标、PFD 逐事件/多周期、Play/Step/Reset 和答题反馈。
2. 设置约 390 px 手机视口，检查横向溢出、图轴/图例、公式行宽、控件可达和滚动表现；修复后复跑六页结构和模型测试。
3. 打开 DevTools Console 检查课程自身错误；载入后切到 Offline，确认本地图片/脚本和关键交互仍可用。
4. 在本地静态服务器环境验证六页 HTML 与共享资源 HTTP 状态/MIME；浏览器回归受图片链接变更影响的 PLL 遗留页及 B–F 页面。
5. 将实测结果写回本文件、V2 验收报告、PROGRESS 和 README，再将“部分验收”结论按证据更新。

以上浏览器检查是当前第一个未完成项。环境未提供对应能力时，保留“待验证”，不可伪造通过。

## 中断恢复协议

恢复时先读取本文件和 GitHub main 最新 HEAD，从 V2-10 首个未完成事项继续；检查现有 commit 和验收证据，避免重复已完成的实施。

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
