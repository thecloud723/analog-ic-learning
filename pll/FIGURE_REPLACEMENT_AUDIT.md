# PLL 插图原图替换清单

检查日期：2026-11-11  
仓库：thecloud723/analog-ic-learning

## 检查结果

当前 18 个章节 HTML 共检出约 239 个内嵌 SVG 元素。SVG 数量不等于需要替换的静态原理图数量：其中包含系统/电路结构图、交互式教学图、动态计算曲线、频谱/波形示意和装饰性图形，必须逐个判定，不能把实时仿真图误替换成静态截图。

| 章节 | SVG 数量 | 初步判定 |
|---|---:|---|
| 01 PLL 用途与系统全景 | 12 | 有 JKU 原图占位，但存在自绘 fallback；需核实原图是否真正本地化 |
| 02 频率相位时间差与锁定 | 15 | 时序/相位解释图，需逐图匹配教材原图 |
| 03 从开环到闭环 | 12 | 经典闭环框图及动态说明图 |
| 04 PLL 架构地图 | 10 | 多种 PLL 架构框图 |
| 05 参考源与时钟输出链 | 19 | 频率规划、分频与输出链框图 |
| 06 PD/PFD 相位与频率比较 | 15 | PFD 电路结构及 UP/DOWN 时序图 |
| 07 Charge Pump 与 Loop Filter | 19 | 电流泵电路、环路滤波器及波形 |
| 08 VCO 与 DCO | 28 | LC/RO 电路结构、调谐阵列及动态实验 |
| 09 完整 CP-PLL 动态 | 27 | 闭环框图、环路滤波器及动态曲线 |
| 10 相位域模型与 Type-I/II | 23 | 相位域框图、传递函数和响应图 |
| 11 瞬态响应与锁定时间 | 15 | 响应曲线/Bode 图；应优先引用公开原始曲线或明确标注教学仿真 |
| 12 Phase Noise 与 Jitter | 15 | 噪声传递路径、频谱和边沿图 |
| 13 Spur、非线性与 PVT | 14 | Spur 形成结构及频谱图 |
| 14 Integer-N 与 Fractional-N | 2 | 分频器与频率规划图 |
| 15 Sigma-Delta、MASH 与 Dither | 4 | MASH 结构、累加器和量化序列 |
| 16 ADPLL 与数字 PI | 4 | ADPLL 系统框图与环路状态图 |
| 17 TDC/DTC 与 DCO 校准 | 3 | TDC/DTC/DCO 校准路径及实验图 |
| 18 完整系统、设计流程与指标 | 2 | 系统总图与闭环实验曲线 |

## 替换原则

1. 静态系统框图、电路图、经典结构图：优先使用可合法再分发的原始 SVG/PDF/图片；保存本地副本，页面不依赖在线图片 URL。
2. 动态仿真曲线、交互波形和由滑块实时生成的数据图：没有一一对应的“原图”，保留交互计算，但标注模型假设、来源和非实测属性。
3. 厂商数据手册、付费教材或未明确授权的论文插图：公开仓库不直接打包整张受版权保护的截图；改用明确许可的开放教材图，或保留来源链接、页码和图号。
4. 每张本地原图必须记录作者/机构、原始 URL、图号/页码、许可证、下载日期及是否有裁切/缩放。
5. 不允许以自行重绘的近似图冒充“原图”；找不到可合法本地化的原图时，应明确标记为待替换并说明原因。

## 优先原始资料

- JKU, Harald Pretl, *Radio-Frequency Integrated Circuits*, PLL 第 7 章。该课程仓库声明 Apache-2.0；可优先复用其中允许再分发的原始图，并保留版权/许可证说明。
  - 课程页面：https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll
  - PDF：https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.pdf
  - GitHub：https://github.com/iic-jku/radio-frequency-integrated-circuits
- Analog Devices MT-086：PLL Fundamentals（原厂资料，需保留出处；再分发前核对授权）。
- TI, *PLL Performance, Simulation, and Design*, SNAA106C（原厂资料，需保留出处；再分发前核对授权）。
- TI LMX2594、ADI ADF4351/ADF4159 数据手册（产品结构图仅按授权条件使用）。

## 状态

- [x] 完成 18 章 SVG/图片元素数量盘点。
- [x] 区分“静态原理图替换”与“交互仿真图保留”的处理原则。
- [ ] 逐图建立原图匹配表（原章节/页签、现图、候选原图、来源/许可）。
- [ ] 将许可允许的原始图片保存到仓库本地 assets 目录。
- [ ] 替换 HTML 中的自绘静态图，并清理在线依赖及 fallback。
- [ ] Edge 桌面端、手机离线环境回归检查。
