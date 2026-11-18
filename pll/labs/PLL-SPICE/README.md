# PLL SPICE 系列 · 整数-N CP-PLL

从 [Kaggle 的 PLL SPICE 00 主 Notebook](https://www.kaggle.com/code/ericzhangyin/pll-spice-00-n-cp-pll) 进入。前置实验 [VCO-01 起振与扫参](https://www.kaggle.com/code/ericzhangyin/pll-spice-vco-01-lc-vco) 使用相同的 SKY130 振荡器核心。

| 实验 | 课程 | 默认工况与结果 |
| --- | --- | --- |
| PLL-01 | B3 | 晶体管级振荡核心 + 教学结电容，VCTRL 0.35–1.55 V 共 9 点，提取频率、振幅、5 GHz 工作点 |
| PLL-02 | C1 | 40 MHz PFD 周期，5 个时间差，ngspice 提取等效电流源 CP 的净电荷，供 PLL-03 使用 |
| PLL-03 | C2 / F | 目标 5 GHz、N=125、初始频差 −80 MHz，比较线性 VCO、SPICE 标定 VCO、再加 CP 非理想；SPICE 解平均相位域闭环 |
| PLL-04 | D | 默认 5% CP 失配，用锁定周期显式脉冲 SPICE 和复包络 FFT 提取 ±40 MHz 参考杂散，再以示例 REF/VCO 输入谱算 12 kHz–20 MHz RMS jitter |

`settings.json` 为共同工况，`pll_spice_series.mjs` 为 ngspice 运行脚本。Notebook 内含相同设置、脚本和网表，运行时从 SkyWater 公开仓库按固定提交下载所需模型和许可证，并核对 SHA-256。`measure_pll04.py` 从原始波形提取谱线，并生成相噪预算与积分抖动。更改这些源文件时，同步更新 Notebook 中的对应单元。

Kaggle 使用 CPU、打开 Internet，运行全部单元。首次需安装锁定的 Node/npm 依赖，无需附加数据集。结果目录 `pll-spice-series/` 保存 `.cir`、原始 CSV、PNG、日志和配置。网页 L2 可从这些结果中抽取代表工况。锁定时间采用连续 4 µs 保持在 ±100 kHz 频差以内的最早入带时刻。

PLL-03 用平均相位状态反馈。PLL-04 的锁定周期通过净电荷平衡设定显式 UP/DN 时序，并增加 5 pF 并联滤波电容。默认 ±40 MHz 参考杂散约 −88.63 dBc，减半最大步长后变化小于 0.01 dB。示例 REF 和 VCO 两项积分得到 0.197 ps RMS，未计 CP、分频器与离散杂散。逐边沿完整捕获和器件本底相噪仍待验证。Kaggle 保存完整输出，GitHub 保存可复跑源码。

## LOOP-01 逐边沿行为级基准

从仓库根目录运行 `node pll/labs/PLL-SPICE/run_loop01.mjs /tmp/loop01`。可在输出根目录后传入共用配置和模型配置的自定义 JSON 路径。每次运行写出配置、事件、采样和版本记录。边沿模型使用课程的分段 VCO 与串联 RC，模型假设和实测步骤见[阶段 2 验收表](../../docs/PLL_S2_ACCEPTANCE.md)。

- 从 PLL-01 输出的 `pll-01-vco-metrics.json` 建立分段与线性校准配置。执行 `node pll/labs/PLL-SPICE/calibrate_loop01.mjs METRICS_JSON OUTPUT_JSON`，再将生成的 JSON 作为 `run_loop01.mjs` 的第三个参数。设置 `recordVcoEdges: true` 可额外导出 `vco_edges.csv`。
- 使用 `python pll/labs/PLL-SPICE/compare_loop01_average.py SPICE_OUTPUT_DIR NEW_OUTPUT_DIR` 在相同初始偏压下对照 PLL-03。脉冲 SPICE 与 11 点捕获都可从[验证工作流](https://github.com/thecloud723/analog-ic-learning/actions/runs/44405573563)下载配置、报告和波形。
