# PLL A Classroom 持续执行状态

## 当前任务信息

- 项目：模拟系统知识学习 / analog-ic-learning
- 任务：PLL A 部分 Classroom 交互式课程完整开发
- 权威设计：`pll/docs/PLL_A_CLASSROOM_SDD_2026-11-19.md`
- 分支：`main`（以用户授权的 GitHub main 为工作基线）
- 当前基线 HEAD：`3edc1c809d874d44489d7c17acd92035146c38cd`
- 最新已完成实现提交：`9b6b0e74bc88c17e0c48551b144fe3a64a274390`
- 当前阶段：Phase 2（课程页面实施中；Phase 1 公共架构已完成）
- 更新时间：2026-11-19（Asia/Shanghai）
- 工作约束：只改 PLL A 六页及必要资源/文档；不改 SerDes，不重构 B–F；实验成熟度仍以 `pll/EXPERIMENT_LEVEL_ROADMAP.md` 为准。

## Phase 0 审计结论

- 当前 main 为 `3edc1c809d874d44489d7c17acd92035146c38cd`，SDD 记载的 `bde93ee853b01b622efc870f37d7a94aaf5800dd` 已不是当前 HEAD；以当前 main 为准。
- 六个目标 URL 均存在，导航侧栏、课程页签和翻页链接由现有 HTML/CSS 提供。
- 当前 A1.1–A2.3 只有 `data-lab` 单控件模型和静态内容，缺少 Classroom 预测流程、Guided Tour、统一状态、同步游标和 PFD 逐事件状态机。
- 现有 `course.js` 通过 `data-lab` 分派旧实验，并服务 B–F。本次将 A 页迁移到独立 `data-classroom-lab` 与新 JS 文件；不修改 `course.js`。
- JKU Fig. 74/78/79、ADI ADF4351 Fig. 1、ADI MT-008 Fig. 1、TI LMX2594 Fig. 5-1 均已有本地资源可复用。
- 已目视检查 `pll/assets/originals/ti/lmx2594-fig5-1.png`：图中载波标注为约 14.0000289 GHz，10 kHz、100 kHz、1 MHz、10 MHz 标记值与 SDD 四点一致。它是图上测量标记；交互读数显示 0.1 dB 精度并标记来源，不在离散点之间伪造测量曲线。
- Phase 1 已提交 `a-classroom.css`、`a-classroom-models.js`、`a-classroom-data.js` 和 Node 测试；8/8 组固定向量/边界测试通过。模型核对：A2.1 的 `Δt=tFB−tREF` 与 `Δφ=φREF−φFB` 正号关系一致；A2.2 使用半开区间 ([-0.5,0.5)) cycles；A2.3 PFD 双触发器及 reset 延迟脉宽约定可按 SDD 实现。
- A1.2 固定向量按 Hz/s/rad/V 计算得到 t=10 μs 时 Δf=−0.270618 kHz、ΔVCTRL=−0.002706 mV、Δφe=−0.185687 mrad，与 SDD 舍入目标一致。

## 工作清单

| Task ID | 工作项 | 修改文件 | 状态 | 对应提交 | 测试结果 | 剩余问题 |
|---|---|---|---|---|---|---|
| A-00 | 审计 main、SDD、六页、公共脚本、现有图源和公式 | 本文件、PROGRESS | 已完成 | 状态归档提交中 | GitHub 树和文件已核对；TI 图像已目视比对 | 后续回归仍需执行 |
| A-01 | 公共 Classroom CSS、组件与响应式布局 | `pll/course/a-classroom.css` | 已完成 | `9b6b0e74bc88c17e0c48551b144fe3a64a274390` | 静态结构检查通过 | 页面浏览器视觉验收待做 |
| A-02 | 统一纯模型与固定公式测试 | `pll/course/a-classroom-models.js`、`pll/course/tests/a-classroom-models.test.js` | 已完成 | `9b6b0e74bc88c17e0c48551b144fe3a64a274390` | Node 固定向量/边界测试 8/8 通过 | 页面集成待做 |
| A-03 | TI 相噪测量数据及来源元数据 | `pll/course/a-classroom-data.js` | 已完成 | `9b6b0e74bc88c17e0c48551b144fe3a64a274390` | 与原图测量标记一致，UI 精度策略已写入元数据 | 同步图源清单待做 |
| A-04 | 统一状态、图表、组件和六页交互绑定 | `pll/course/a-classroom.js` | 进行中 | — | 待执行 | A2.1 先集成 |
| A2.1 | 时间差/相位差课程与拖动示波图 | `pll/course/a2-1.html` | 未开始 | — | 待执行 | 保留 URL/翻页 |
| A2.2 | 频差累积、未包裹/模相位与同步游标 | `pll/course/a2-2.html` | 未开始 | — | 待执行 | 保留 URL/翻页 |
| A2.3 | PFD REF/FB 逐事件状态机和多周期实验 | `pll/course/a2-3.html` | 未开始 | — | 待执行 | 确认 UP/DN/reset 脉宽 |
| A1.1 | 可点击 SVG、四路径、Guided Tour、频率链 | `pll/course/a1-1.html` | 未开始 | — | 待执行 | 区分 VCO 与最终输出 |
| A1.2 | 三通道虚拟示波器和同一时间游标 | `pll/course/a1-2.html` | 未开始 | — | 待执行 | 三种物理量单位与符号 |
| A1.3 | TI 原图、离散 marker、dBc/dBc/Hz 训练 | `pll/course/a1-3.html`、资源清单 | 未开始 | — | 待执行 | 原图本地资源已存在 |
| A-REG | 页面、公式、响应式、离线、导航及 B–F 回归 | 新增验证脚本/报告 | 未开始 | — | 待执行 | Pages 浏览器测试待部署后执行 |
| A-DOC | 同步 README、主纲、逐页计划、实验台账、PROGRESS、验收报告 | 指定文档 | 未开始 | — | 待执行 | 不改变旧实验成熟度 |

## 下一步工作

1. 完成 `a-classroom.js` 的共享 Canvas/SVG 渲染、预测/检查反馈、播放/单步/复位、Guided Tour 与统一事件状态。
2. 先完成 A2.1 并集成模型/控件/同步图，再依次完成 A2.2、A2.3、A1.1、A1.2、A1.3。
3. 每页以浏览器操作和对应模型向量验收后再进入下一页。
4. 测试：Node 固定向量与边界测试；静态 HTTP 页面加载；桌面/移动布局；部署后的 Pages、控制台、离线资源、导航和 B–F 回归。
5. 验收目标：所有 SDD 固定向量通过；六页均能走完 Learn → Predict → Explore → Observe → Explain → Check；原图/公式证据标注明确；无未处理控制台错误。

## 恢复协议

恢复工作先查看本文件、`pll/PROGRESS.md` 与当前 GitHub main HEAD；从首个非“已完成”的任务继续。不要重做已有审计或改动 A 以外页面。任何无法验证项必须写为“未验证”并说明具体原因。
