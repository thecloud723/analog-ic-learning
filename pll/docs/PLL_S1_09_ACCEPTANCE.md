# PLL-S1-09 阶段 1 验收记录

阶段 1 于 2026-11-19 验收通过，课程结构冻结于 [`90de444`](https://github.com/thecloud723/analog-ic-learning/commit/90de44442b92618f42c0b9b66a4e1d8ae86d01db)。验收采用执行计划 §1.1–1.5 的范围。

| 项目 | 本轮交付 | 余项 |
|---|---|---|
| S1-01 至 S1-03 | 导航、迁移、覆盖与外部教材索引 | 运行检查纳入 S1-06 |
| S1-04 | 54 个独立公式，已核查行内标记形式 | 54/54 独立公式和 29 条独立行内定量关系已核对原文或推导 |
| S1-05 | 新版使用图片、出处与既有许可记录 | 四图已改用原文链接 |
| S1-06 | 全页静态导航、资源和 JS 语法检查 | 线上及离线双视口 208/208，144 个旧页签深链，50 个新版实验 420 条断言及 320 次上下限检查通过 |
| S1-07 | 保留 49 项，补 18 章去向并加入四项新版实验 | 49 个旧实验 ID 唯一，63 条新版页面引用全部存在。PLL-01～04 本地独立重跑通过，VCO-01 全 27 组与 CP-01 全 9 组独立复跑，11 项旧 L1 原交互复跑。历史实现与可操作入口保留，L3/L4 随各实验阶段取证 |
| S1-08 | README、PROGRESS 和审计入口统一 | 主入口沿用新版 A1.1 |
| S1-09 | 本验收表 | 验收通过，冻结提交 `90de444` |

证据见[冻结基线浏览器回归](https://github.com/thecloud723/analog-ic-learning/actions/runs/44395905337)、[公式审计](PLL_S1_04_FORMULA_INDEX.md)、[图片清单](PLL_S1_05_FIGURE_MANIFEST.md)和[统一实验台账](../EXPERIMENT_LEVEL_ROADMAP.md)。后续阶段从 Integer-N LOOP-01 开始。

PLL-04 后处理复跑通过。使用原 SPICE CSV 和配置，在空输出目录重算，两侧参考杂散分别为 −88.630075 和 −88.629472 dBc，12 kHz–20 MHz 示例谱积分为 0.197272 ps。各项与保存结果的绝对差均小于 1e−8。此记录覆盖后处理，SPICE 输入波形的独立生成仍待复核。

2026-11-19 独立运行（源码基线 `a3ae38c`）。从仓库的 `lc-vco-lab.zip` 解包，用锁文件执行 `npm ci`（eecircuit-engine 1.9.0），再运行 `node pll_spice_series.mjs . ../out settings.json`，输入为仓库网表和设置，`../out` 初始不存在。重新执行 Notebook 的 PLL-01～03 数据检查和 `measure_pll04.analyze_pll04`。

| 实验 | 从新生成波形得到的结果 |
|---|---|
| PLL-01 | 9 个调谐点，4.825770–5.111025 GHz，5 GHz 插值工作点 0.94250 V |
| PLL-02 | 5 个边沿偏移点，−1/0/+1 ns 对应 −92.25/+2.75/+102.75 fC |
| PLL-03 | 三组平均模型达到 ±100 kHz 连续保持 4 µs 的判据，首次进入并保持的时间分别为 14.709、14.875、15.145 µs |
| PLL-04 | 两侧参考杂散 −88.630075/−88.629472 dBc，减半最大仿真步长后变化约 0.00000241 dB。12 kHz–20 MHz 示例谱积分为 0.197272 ps RMS |

此证据覆盖本地 SPICE 与后处理流程。旧版 49 项独立复现记录和读者账号的 Notebook 验收仍按原口径分别核对。

本地 Chromium 启动时因 Unix socket 权限失败，未形成新增浏览器验收结论。

另以 GitHub Actions 运行离线双视口和旧版深链回归。首次启动 Chrome 后调试端口未就绪，改用 Playwright pipe 后通过[离线复跑](https://github.com/thecloud723/analog-ic-learning/actions/runs/44351994846)。

CP-01 九组预跑波形与网页数据逐点一致，VCO-01 改参单组重新生成了 60,020 个瞬态点。见[实验台账](../EXPERIMENT_LEVEL_ROADMAP.md)。

[最新浏览器复跑](https://github.com/thecloud723/analog-ic-learning/actions/runs/44352573992)的线上 104/104、离线 104/104 与旧章代表深链 18/18 均通过。移动端结果来自 Chromium 390×844 模拟视口。

[扩展交互回归](https://github.com/thecloud723/analog-ic-learning/actions/runs/44362373390)通过。VCO-01 的 27 组基准复跑中频率、Vpp、功耗最大绝对差均为 0。阶段 1 当时仍待补证。

[新增物理响应回归](https://github.com/thecloud723/analog-ic-learning/actions/runs/44374517555)通过。旧实验表与新版迁移表的 49 个 ID 已逐项确认一致，历史已有 L2 数据的两项均有独立 SPICE 复跑。

[第二批物理响应回归](https://github.com/thecloud723/analog-ic-learning/actions/runs/44383974923)累计覆盖 19 个新版页面。旧实验 E05-01 与 E18-01 已补可运行的新课程页及旧交互入口，49 项均有对应的新版交互，其中部分控制范围需要沿旧页面核对。

[最新复跑](https://github.com/thecloud723/analog-ic-learning/actions/runs/44384500978)补证所有 40 个滑块的上下限，共 320 次。旧频率规划 E05-01、E18-01 已通过原页面的离线深链与数值复跑。此旧记录随后由冻结回归补齐新版实验覆盖及高差异的历史交互。
