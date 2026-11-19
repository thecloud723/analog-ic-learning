# PLL A Classroom 持续执行状态

## 当前任务信息

- 项目：模拟系统知识学习 / analog-ic-learning
- 任务：PLL A 部分 Classroom 交互式课程完整开发
- 权威设计：`pll/docs/PLL_A_CLASSROOM_SDD_2026-11-19.md`
- 当前 Git 分支：`main`
- 最新已完成实现提交：`2296e26a00bcd7f0d6a223209754ab027a6564a2`
- 当前执行阶段：Phase 3（六页集成、浏览器与回归验收）
- 更新时间：2026-11-19（Asia/Shanghai）
- 工作约束：只改 PLL A 六页及必要资源/文档；不改 SerDes，不重构 B–F；成熟度以 `pll/EXPERIMENT_LEVEL_ROADMAP.md` 为准。

## Phase 0 审计结论

- 实施前 main HEAD 为 `3edc1c809d874d44489d7c17acd92035146c38cd`；SDD 所载基线已过期，审计使用当时 main 的真实状态。
- 六个目标 URL、A–F 侧栏和课程翻页均存在。原 A 页面使用旧 `data-lab` 单控件脚本；本次 A 页切换到独立 `data-classroom-lab` 与 Classroom runtime，没有修改 `course.js`。
- 复核并保留 JKU Fig. 74/78/79、ADI ADF4351 Fig. 1 与 MT-008 Fig. 1、TI LMX2594 Fig. 5-1。TI 图上的载波约 14.0000289 GHz，四个 marker 与 SDD 记录一致；读数显示到 0.1 dB，独立图只画离散点。
- 数学核对：A2.1 采用 Δt=tFB−tREF、Δφ=φREF−φFB；A2.2 使用半开区间 [-0.5,+0.5) cycle；A2.3 REF/FB 顺序、reset 延迟和脉宽按 SDD 定义；A1.2 10 μs 向量为 Δf=−0.270618 kHz、ΔVCTRL=−0.002706 mV、Δφe=−0.185687 mrad。

## 工作清单

| Task ID | 工作项 | 修改文件 | 状态 | 对应提交 | 测试结果 | 剩余问题 |
|---|---|---|---|---|---|---|
| A-00 | main、SDD、六页、脚本、原图和公式审计 | 本文件、PROGRESS | 已完成 | `8854bd357650a19d26cf9f2c66a34a515c7c9515` | 真实 main HEAD 和页面/素材已核对 | 无 |
| A-01 | 公共 Classroom 组件、布局和渲染 | `pll/course/a-classroom.css`、`a-classroom.js` | 已实现 | `9b6b0e74bc88c17e0c48551b144fe3a64a274390`、`2296e26a00bcd7f0d6a223209754ab027a6564a2` | 三个 JS 语法检查通过；六页静态结构检查通过 | Pages 视觉/浏览器验收待做 |
| A-02 | 单位统一的纯模型与固定向量测试 | `pll/course/a-classroom-models.js`、`pll/course/tests/a-classroom-models.test.js` | 已完成 | `9b6b0e74bc88c17e0c48551b144fe3a64a274390`、`781cce93d2614ca5141746d538b9dbf3234cc4d3` | SDD 向量与边界 Node 测试 8/8 通过 | UI 浏览器联动待验 |
| A-03 | TI marker 数据与来源元数据 | `pll/course/a-classroom-data.js` | 已完成 | `9b6b0e74bc88c17e0c48551b144fe3a64a274390`、`2296e26a00bcd7f0d6a223209754ab027a6564a2` | 图内标记核验；精度口径明确 | 文档台账同步待做 |
| A-04 | 六页共享事件、读数、曲线、流程和交互绑定 | `pll/course/a-classroom.js` | 已实现 | `2296e26a00bcd7f0d6a223209754ab027a6564a2` | 语法检查通过；固定模型向量通过 | 动态浏览器、键盘和窄屏验收待做 |
| A2.1 | 时间差/相位差、边沿拖动、相位圆盘 | `pll/course/a2-1.html` | 待验证 | `2296e26a00bcd7f0d6a223209754ab027a6564a2` | T-A21-01/02/03 通过；静态页检查通过 | 实际拖动和模式切换待验 |
| A2.2 | 频差积分、未包裹/模相位、同步游标 | `pll/course/a2-2.html` | 待验证 | `2296e26a00bcd7f0d6a223209754ab027a6564a2` | T-A22-01/02/03 通过；静态页检查通过 | Play/Pause/Step/Reset 与边界窗口待验 |
| A2.3 | REF/FB 逐事件状态机和多周期频差实验 | `pll/course/a2-3.html` | 待验证 | `2296e26a00bcd7f0d6a223209754ab027a6564a2` | T-A23-01/02/03/04 通过；静态页检查通过 | 浏览器事件播放与图表联动待验 |
| A1.1 | SVG 框图、节点/路径、Guided Tour、R/N/D 计算 | `pll/course/a1-1.html` | 待验证 | `2296e26a00bcd7f0d6a223209754ab027a6564a2` | T-A11-01/02 通过；静态页与原图资源检查通过 | 点击/键盘/导览/分频变化待验 |
| A1.2 | 三通道虚拟示波器、共享时间游标和局部边沿图 | `pll/course/a1-2.html` | 待验证 | `2296e26a00bcd7f0d6a223209754ab027a6564a2` | 起点、终点和正负频差模型向量通过 | 浏览器播放及三图同步待验 |
| A1.3 | TI 原图、四个 marker、dBc 与 dBc/Hz 教学 | `pll/course/a1-3.html` | 待验证 | `2296e26a00bcd7f0d6a223209754ab027a6564a2` | TI 图/数值来源核对；本地图片路径通过 | marker 切换、图片显示与重置待验 |
| A-REG | Pages、控制台、桌面/移动、离线、导航、B–F 回归 | 浏览器验收记录、测试脚本 | 进行中 | — | 本地静态 HTTP 六页均 200；Node 8/8、Python 4/4 | 浏览器环境限制下的本地渲染未验证；改用 Pages 检查 |
| A-DOC | README、主纲、逐页计划、实验台账、进度和验收报告同步 | 指定文档及新报告 | 进行中 | — | 先前启动/审计状态已归档 | 等最终浏览器结果后一次同步真实验收状态 |

## 已完成工作（GitHub main）

- `pll/course/a-classroom.css`：三栏/单列样式、Canvas/SVG、可访问焦点、减少动态效果和窄屏布局。
- `pll/course/a-classroom-models.js`：频率链、二阶近锁响应、时间差相位、频差相位累积、PFD 事件模型。
- `pll/course/a-classroom-data.js`：TI marker 元数据、节点职责、信号路径与导览步骤。
- `pll/course/a-classroom.js`：Canvas 图、SVG 边沿与相位圆盘、A1.1–A1.3 和 A2.1–A2.3 绑定、预测/检查反馈、Play/Pause/Step/Reset。
- 六个既有 URL 页面均已实现课程流程和相应实验台；A1.1 区分 fVCO 与 fOUT，A1.3 保留 TI 原图并将四个点作为不连线的离散读数，A2.3 包含本地 JKU Fig. 78/79 原图。
- 新增 `pll/course/tests/test_a_classroom_pages.py`，检查六页共享脚本、课程流程、唯一 ID、导航和本地图片。

## 已运行测试

- `node --test pll/course/tests/a-classroom-models.test.js`：8/8 通过，覆盖 SDD 固定向量和异常边界。
- `python3 -m unittest discover -s pll/course/tests -p 'test_*.py' -v`：4/4 通过。
- `node --check`：`a-classroom.js`、`a-classroom-data.js`、`a-classroom-models.js` 通过。
- 本地静态 HTTP：六个页面分别返回 200。
- 提交后从 GitHub commit `2296e26a00bcd7f0d6a223209754ab027a6564a2` 逐文件读回，10 个改动文件均与已测试工作区内容完全一致。
- 尚未执行：部署 Pages 的动态交互、浏览器 Console、桌面与手机真实渲染、断网实测、B–F 页面浏览器回归。本地 Chromium 因受限运行环境无法启动；云浏览器与 scratch localhost 不在同一网络命名空间。不能把这些项目记为通过。

## 下一步工作（按此恢复）

1. 用云浏览器打开 GitHub Pages 的 A1.1，确认部署版本、主框图和资源加载；检查浏览器控制台。
2. 在 Pages 上依次操作六页：频率链和 Guided Tour；A1.2 游标及 Play/Pause/Step/Restart；A1.3 marker/单位切换；A2.1 拖动与固定相位模式；A2.2 正负频差及游标；A2.3 REF/FB 事件和多周期模式。
3. 检查各 A URL 的侧栏、上一页/下一页，和至少一个 B–F 旧页面，确认 `course.js` 功能未受影响；另按可验证范围检查手机宽度和控制台。
4. 能修复的现场问题直接修复并复跑。无法做的验收明确列“未验证”，记录环境限制。
5. 更新 `README.md`、`PLL_MASTER_COURSE_OUTLINE_2026-11-19.md`、`PLL_PAGE_PLAN.md`、`EXPERIMENT_LEVEL_ROADMAP.md`、`PROGRESS.md)，建立 `PLL_A_CLASSROOM_ACCEPTANCE_REPORT.md`，随后提交并复核实际 SHA 和 GitHub 文件。

## 中断恢复协议

恢复时先读取本文件和 GitHub main 最新 HEAD，再从“下一步工作”第一项继续。不要重复已经实际通过的模型与结构测试。遇到未验证项，保留待验证/受阻状态，不得伪造浏览器或部署验收。
