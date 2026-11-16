# VCO-01 · LC VCO 四级实验工程

对应 [PLL 第 8 章](../../chapters/08_VCO与DCO可控振荡器.html)。这份目录是**云端发布前的实验工程**，不是已发布的 Kaggle 链接。

## 当前状态（2026-11-15）

| 级别 | 状态 | 证据/入口 |
|---|---|---|
| L1 · 公式交互 | 源码已有 | 第 8 章理想 LC 频率、Bank、RO 等教学交互 |
| L2 · 真实仿真预计算 | 源码已有，待复核 | 第 8 章内嵌的 27 组 SKY130 TT SPICE 结果；原始 [ZIP](../../assets/lc-vco-lab.zip) |
| L3 · 公开详细实验 | **27 组真实 SPICE 已经 CI 重跑、L2 导出已通过；Kaggle 尚未发布** | [Kaggle L3/L4 Notebook 源码](VCO-01_Kaggle_L3_L4.ipynb) |
| L4 · 读者复现 | **已在 CI 中两次改参并生成完整 CSV；读者在 Kaggle Copy & Edit 仍未验证** | 发布后需要用其他账号/洁净会话 Copy & Edit 实测 |

## 真实仿真验证（2026-11-15）

- [源码检查：GitHub Actions 通过](https://github.com/thecloud723/analog-ic-learning/actions/runs/43682059029)：确认旧 HTML 的 27 组数据、ZIP 内 27 组 baseline 一致；Notebook 16 个单元格通过 Python AST 解析。
- [实际 SPICE 验证：GitHub Actions 通过](https://github.com/thecloud723/analog-ic-learning/actions/runs/43682286383)：从 ZIP 原始 Node/ngspice WASM 环境重新运行 **27/27** 组，自动导出 L2；频率、Vpp、功率相对 baseline 的最大绝对偏差均为 **0**。
- 同一 Runner 还验证了两个可修改参数的详细时域运行：`L=1 nH,C=810 fF,Rs=2.2 Ω,W=2.4 µm` 得到 `steady`，`Rs=3.3 Ω,W=3.0 µm` 得到 `decay`，均生成完整原始 CSV。
- Actions 附件含网格输出、L2 导出、日志和至少一个完整时域 CSV；附件有保留期限且下载受 GitHub 登录限制，**不替代 L3 的 Kaggle 公开发布**。
- 尚未测试 Kaggle 的网络/安装/会话限制，也没有通过读者账号的 L4 复现。上述 CI 通过只说明**仿真工程和数据通路可真实运行**。

## 与旧 ZIP 的关系

**只使用一份电路和模型**：`pll/assets/lc-vco-lab.zip` 内已有 `run.mjs`、`vco.cir`、`baseline.csv`、SKY130 模型与锁定依赖。它使用 **Node.js ≥22 + eecircuit-engine 1.9.0（ngspice 45.2 WASM）**；不能把它误写成纯 Python 仿真工程，也不必将电路重写一遍。

原始 27 组参数网格：L = {0.8, 1, 1.2} nH × C = {680, 810, 970} fF × Rs = {2.2, 3.3, 18} Ω。读者另可修改 MOS W/L、尾管偏置与起振脉冲；暂不模拟变容管连续调谐。SPICE 瞬态 FFT 不等于专业 PSS/PNoise。

## 文件说明

| 文件 | 用途 |
|---|---|
| `VCO-01_Kaggle_L3_L4.ipynb` | Kaggle/普通 Jupyter Notebook：下载固定源码、装 Node/npm、27组真实运行、详细单点、绘图、CSV与L2导出 |
| `export_l2.py` | 校验 27 组仿真及 `baseline.csv`，从 **L3 的 `web-data.json`** 精简输出 `web-data.json`、`web-data.js`、`l2_manifest.json`；不做未声明插值 |
| `validate_source.py` | 快速静态检查：已发布的 L2 HTML vs ZIP 的 27 组基准、Notebook Python 语法、导出器数据一致性；不调用仿真 |
| `experiment.yaml` | 规范记录 ID、模型、参数、默认工作点、结果以及未发布状态 |

## Kaggle 首次发布操作（下一阶段，尚未执行）

1. Kaggle → Notebooks → New Notebook → Import 本目录的 `.ipynb`。配置 **CPU**，打开 **Internet**，不需要 GPU。附加一个版本化的 Kaggle Dataset，里面放原始 `lc-vco-lab.zip` 和 `export_l2.py`。Notebook 直接展示可编辑网表，官方 27 组扫参读取原始网表，详细单点可启用 `USE_EDITED_NETLIST`。扫参参数行由运行脚本生成，修改 L、C、Rs 等用 Notebook 参数单元。
2. 运行全部单元格；先完成 27 组网格与 `baseline.csv` 检查，再完成默认一个详细点、FFT 与结果打包。任何检查失败都不得标记 L3 已完成。
3. `Save Version` 保存带输出的 Notebook，公开发布前核对模型/图片/代码许可，并确认原始数据、运行日志、结果 ZIP 可以访问。
4. 用**未登录浏览器**验证是否能查看 L3；随后用**另一个账号/洁净环境** Copy & Edit、改至少两个参数、重新运行，验证 L4。
5. 把真实 Kaggle URL、运行耗时、commit、验收记录补到 `experiment.yaml` 和 [实验台账](../../EXPERIMENT_LEVEL_ROADMAP.md)；再按需要把导出的 L2 放回课程资源目录。

**注意**：Kaggle 首次运行需附加实验输入，并访问 Node 下载站（如果 Node 低于 22）和 npm Registry。Kaggle 对 Internet、CPU 时间和文件保留的限制可能变化；网络不通时可以把 ZIP 与依赖做成版本化 Kaggle Dataset，再验证脱离在线安装的路径。

## 本地复现（不需要 Kaggle 账号）

```bash
# 仓库根目录运行（需 Python3、Node>=22，首次安装依赖需联网）
cd pll/assets
unzip lc-vco-lab.zip
cd lc-vco-lab
npm ci
node run.mjs --web --out web
python3 ../../labs/VCO-01/export_l2.py \
    --web-json web/web-data.json \
    --baseline baseline.csv \
    --package-zip ../lc-vco-lab.zip \
    --source-commit "$(git rev-parse HEAD)" \
    --output-dir web/L2-export
```

本地快速验证：

```bash
python3 pll/labs/VCO-01/validate_source.py
```

`--web` 不保存每一个原始采样点；要拿详细 CSV，用 `node run.mjs --l 1 --c 810 --rs 2.2 --out detail`。Notebook 默认保留 27 组预跑摘要/波形及一个详细 CSV，若开启 `RUN_FULL_RAW_GRID` 则额外产生 27 个原始时间序列文件，资源占用较大。

## 发布前必须注意的物理/数据边界

- 现有模型只使用 SKY130 TT/27 °C；温度虽然可以在后续扩展实验中扫参，但**原 `run.mjs` 当前没有独立的 `--temperature` 接口**，不能冒称已经实现温度扫描。
- 27组 L2 与 ZIP 的 `baseline.csv` 对照可以证明网页数据来源的一致性，**不能取代每次 ngspice 重新运行的验证**。
- `steady`/`decay`/`transient` 采用固定时窗判断，在临界起振参数附近并非绝对物理结论。
- 课程对外发布时仍要检查 `models/LICENSE` 和 npm 依赖的使用许可；不得导入私有企业 RTL 或认证凭据。
