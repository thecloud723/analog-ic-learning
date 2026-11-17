# PLL SPICE 系列 · 整数-N CP-PLL

从 [Kaggle 的 PLL SPICE 00 主 Notebook](https://www.kaggle.com/code/ericzhangyin/pll-spice-00-n-cp-pll) 进入。前置实验 [VCO-01 起振与扫参](https://www.kaggle.com/code/ericzhangyin/pll-spice-vco-01-lc-vco) 使用相同的 SKY130 振荡器核心。

| 实验 | 课程 | 默认工况与结果 |
| --- | --- | --- |
| PLL-01 | B3 | 晶体管级振荡核心 + 教学结电容，VCTRL 0.35–1.55 V 共 9 点，提取频率、振幅、5 GHz 工作点 |
| PLL-02 | C1 | 40 MHz PFD 周期，5 个时间差，ngspice 提取等效电流源 CP 的净电荷，供 PLL-03 使用 |
| PLL-03 | C2 / F | 目标 5 GHz、N=125、初始频差 −80 MHz，比较线性 VCO、SPICE 标定 VCO、再加 CP 非理想；SPICE 解平均相位域闭环 |
| PLL-04 | D | 计划用同一工况做参考杂散及噪声积分，需增补逐边沿模型和有来源的噪声输入 |

`settings.json` 为共同工况，`pll_spice_series.mjs` 为 ngspice 运行脚本。Notebook 内含相同设置、脚本和网表，运行时从 SkyWater 公开仓库按固定提交下载所需模型和许可证，并核对 SHA-256。更改共用设置或脚本时同步更新 Notebook 参数和运行单元。

Kaggle 使用 CPU、打开 Internet，运行全部单元。首次需安装锁定的 Node/npm 依赖，无需附加数据集。结果目录 `pll-spice-series/` 保存 `.cir`、原始 CSV、PNG、日志和配置。网页 L2 可从这些结果中抽取代表工况。锁定时间采用连续 4 µs 保持在 ±100 kHz 频差以内的最早入带时刻。

PLL-03 用平均相位状态反馈，未模拟逐个数字边沿及 cycle slip。后续须建立逐边沿闭环并核对控制电压限幅和参考杂散。器件本底相噪仍需专门的噪声分析或可追溯输入谱。
