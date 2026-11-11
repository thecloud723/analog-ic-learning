# PLL 原图候选清单（按现有课程章节映射）

整理日期：2026-11-11  
用途：个人/内部学习资料整理；当前 GitHub 仓库可见性仍为 **Public**，上传前请先确认是否改为 Private。

## 先说清楚授权口径

- **JKU RFIC 课程资料**：仓库声明 Apache-2.0，属于目前最适合批量本地保存原图的来源。保存时仍须保留版权声明、LICENSE、NOTICE（如有）、来源链接和修改说明。
- **Analog Devices / TI 数据手册、教程和应用笔记**：可用于学习和引用，页面公开可访问不等于图片可自由再分发。建议先记录原始链接、图号、页码；如需放入私有仓库保存个人学习副本，仍需自行确认取得资料的授权/适用的合理使用范围。不能把私有仓库理解成自动获得复制许可。
- **论文、会议课件、教材**：逐份核对出版方版权/作者授权。作者公开 PDF 或能下载，不代表插图有开放再分发许可。
- **内部截图**：只作为个人学习笔记保存，保留原作者和出处，不去除水印/版权标识，不把截图重新包装成原创图。

## 推荐主图来源

| 来源 | 可优先覆盖的图 | 授权判断 | 操作建议 |
|---|---|---|---|
| JKU RFIC Chapter 7, Figures 74–98 | 基本 PLL、XOR PD、s-domain 模型、PFD、UP/DOWN 时序、CP、PFD-CP PLL、噪声、ADPLL、TDC、DCO、Fractional-N、DSM、MASH、Dither、MMD retiming | JKU 课程 GitHub 明确声明 Apache-2.0 | **第一优先**。原图本地化；保留 LICENSE/来源/图号。页面：https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html |
| Analog Devices, MT-086, Fundamentals of PLLs | 经典 PLL 框图、参考分频/Prescaler、PFD/CP、死区/anti-backlash、Fractional-N 背景 | ADI 原厂教程；未按开放图片许可处理 | 作为核对与出处；私有学习副本需确认使用条件。PDF：https://www.analog.com/media/en/training-seminars/tutorials/MT-086.pdf |
| Analog Devices, PLL Fundamentals（Ian Collins） | Fig.1 基本 PLL、Fig.2 环路模型、Fig.3 PFD、Fig.4–8 锁定/噪声示例 | ADI 原厂文章；网页图片不等于开放再分发 | 优先引用原网页；若做私有截图留存，保留作者、图号、文章 URL。https://www.analog.com/en/resources/analog-dialogue/articles/phase-locked-loop-pll-fundamentals.html |
| TI, PLL Performance, Simulation, and Design, SNAA106C | 环路滤波器、二阶/三阶环路、瞬态响应、稳定性、Fractional spur 和设计示例 | TI 原厂资料；未按开放图片许可处理 | 用作设计计算/波形核对；记录章节、图号和页码。https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf |
| R. Bogdan Staszewski, ADPLL seminar slides (2007) | CP-PLL 与 ADPLL 对照、TDC、数字环路、DCO 框图 | IEEE/作者课件，版权状态需逐项核实 | 适合学习 ADPLL 结构；暂不批量复制到仓库。https://ewh.ieee.org/soc/cas/dallas/documents/Sem-022107-stas_adpll.pdf |

## 逐章原图候选映射

| 课程章节 | 现有自绘静态图优先替换对象 | 首选原始图/资料 | 备注 |
|---|---|---|---|
| 01 PLL 用途与系统全景 | 基本 PLL 框图、PFD-CP PLL 总图 | JKU Fig.74、Fig.83；ADI PLL Fundamentals Fig.1 | 当前页面已有原图占位和 fallback，需确认本地图片真正落盘 |
| 02 频率相位时间差与锁定 | XOR PD 输入输出时序、相位差波形 | JKU Fig.75；Fig.78–81 | 交互相位滑块/动态边沿图保留为仿真 |
| 03 从开环到闭环 | PFD/CP、反馈环路和电荷泵信号路径 | JKU Fig.77、Fig.82、Fig.83 | UP/DOWN 动态波形可保留交互 |
| 04 PLL 架构地图 | 基本 PLL、相位域模型、CP-PLL、ADPLL、Fractional-N | JKU Fig.74、Fig.76、Fig.83、Fig.85、Fig.95、Fig.98 | 一页多架构可用多张原图，不要拼成一张自绘总图冒充原图 |
| 05 参考源与时钟输出链 | 参考分频、倍频、反馈分频、输出分频链 | ADI MT-086 Fig.3A；JKU Fig.95/97/98；ADF4351 数据手册框图 | 厂商图授权需确认；JKU 图优先本地化 |
| 06 PD/PFD 相位与频率比较 | 双 DFF PFD 电路、UP/DOWN 四种边沿关系 | JKU Fig.77–81；ADI PLL Fundamentals Fig.3–5 | 真实 PFD 原理图优先；时序动态演示保留 |
| 07 Charge Pump 与 Loop Filter | 电流源/开关 CP、环路滤波器拓扑、CP-PLL | JKU Fig.82、Fig.83；TI SNAA106C 环路滤波器章节 | CP 失配、charge injection 等动态曲线仍可作为教学模型 |
| 08 VCO 与 DCO | DCO DAC 结构、开关变容管、LC/RO 振荡器结构 | JKU Fig.87、Fig.88；JKU oscillator 章节；ADI/TI VCO 资料 | Fig.88 可优先复用；LC/RO 具体晶体管拓扑按对应振荡器章节寻找 |
| 09 完整 CP-PLL 动态 | 完整 PFD-CP-LF-VCO-÷N 反馈图 | JKU Fig.83；ADI PLL Fundamentals Fig.1–2 | 动态锁定波形保留仿真 |
| 10 相位域模型与 Type-I/II | s-domain PLL 方框图、积分器和传递函数结构 | JKU Fig.76；ADI PLL Fundamentals Fig.2 | 传递函数响应曲线若非原文数据，明确标注模型计算 |
| 11 瞬态响应与锁定时间 | 频率阶跃响应、开环 Bode/相位裕量 | TI SNAA106C transient response / loop stability 章节；JKU 对应控制模型 | 不把自算曲线换成不匹配的厂商曲线；需按参数匹配 |
| 12 Phase Noise 与 Jitter | PLL 输出参考噪声/VCO 噪声合成曲线、相噪传递路径 | JKU Fig.84；ADI PLL Fundamentals Fig.6–8 | 曲线参数与教材模型一致时才替换；否则保留教学计算曲线 |
| 13 Spur、非线性与 PVT | 连续噪声裙边、离散 spur、MASH 周期图/频谱 | JKU Fig.92–94；ADI MT-086 dead-zone/anti-backlash 部分 | 周期序列/FFT 如果由本页输入动态生成，应保留为仿真 |
| 14 Integer-N 与 Fractional-N | 分数分频框图、MMD 结构 | JKU Fig.95、Fig.98；ADI MT-086 | 原图替换静态框图 |
| 15 Sigma-Delta、MASH 与 Dither | 一阶 DSM、NTF、MASH 1-1-1、dither 结构和频谱 | JKU Fig.89–94 | Apache-2.0 来源，第一优先 |
| 16 ADPLL 与数字 PI | ADPLL 总框图、TDC、DCO 两种实现 | JKU Fig.85–88；Staszewski ADPLL slides | JKU 优先；外部课件图先只记录出处 |
| 17 TDC/DTC 与 DCO 校准 | TDC delay-line、DCO DAC、switched varactor | JKU Fig.86–88；DTC 另找开放论文/课程资料 | JKU 本章未覆盖完整 DTC，DTC 原图单独补源；不能拿 TDC/DCO 图替代 |
| 18 完整系统、设计流程与指标 | 系统总图、测试测量架构 | JKU Fig.74/83/85/95；TI/ADI 设计资料 | 系统验收清单和本页仿真曲线仍为自有教学内容 |

## JKU 原图优先下载清单（图号）

- Fig.74：基本 PLL 框图
- Fig.75：XOR PD 输入/输出波形
- Fig.76：PLL 拉普拉斯域模型
- Fig.77：PFD 实现
- Fig.78–81：PFD 四种时序情形
- Fig.82：Charge Pump 电路
- Fig.83：PFD-CP PLL
- Fig.84：PLL 输出相噪组成
- Fig.85：ADPLL 框图
- Fig.86：Delay-line TDC
- Fig.87：DAC 控制振荡器
- Fig.88：DCO switched varactor
- Fig.89–94：DSM、NTF、MASH、Dither
- Fig.95：Fractional-N PLL
- Fig.96：带 offset current 的 Charge Pump
- Fig.97：参考时钟倍频器
- Fig.98：带 retiming FF 的 Fractional-N PLL

JKU 图的准确图注、作者及课程版本，以课程页面为准。JKU 课程仓库：https://github.com/iic-jku/radio-frequency-integrated-circuits ，LICENSE 为 Apache-2.0。

## 仓库实施顺序

1. 先把当前仓库从 Public 改为 Private（如果确实只作内部个人资料）；改为 Private 不等于自动取得第三方图片复制授权。
2. 建立 `pll/assets/originals/jku/`，下载 Apache-2.0 许可允许再分发的 JKU 原图；附 LICENSE 和 attribution 清单。
3. 建立 `pll/assets/restricted-reference/` 清单，只保存 ADI/TI/论文图的出处、页码、访问链接；是否放截图需单独确认使用权。
4. 逐章替换静态结构图；每张图片旁标注“原图/原图裁切/教学仿真”及出处。
5. 对本地断网环境测试；所有原图路径使用相对路径，不依赖远程 CDN。
6. 最后逐页回归检查，删除无用 fallback 和过时在线加载逻辑。

## 当前状态

- [x] 18 章 SVG 数量盘点（约 239 个 SVG 元素，含交互图/仿真图，非 239 张静态原理图）。
- [x] 逐章建立候选原图映射。
- [x] 核实 JKU 课程仓库声明 Apache-2.0。
- [ ] 逐个下载 JKU 原图到本地 assets。
- [ ] 替换课程中的静态自绘图。
- [ ] 对 TI/ADI/论文图片逐张确认是否可在目标仓库保存。
- [ ] Edge/手机离线回归。

## 参考网页

- JKU PLL slides: https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html
- JKU RFIC notes: https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html
- JKU repository/license: https://github.com/iic-jku/radio-frequency-integrated-circuits
- ADI PLL Fundamentals: https://www.analog.com/en/resources/analog-dialogue/articles/phase-locked-loop-pll-fundamentals.html
- ADI MT-086: https://www.analog.com/media/en/training-seminars/tutorials/MT-086.pdf
- TI SNAA106C: https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf
- Staszewski ADPLL slides: https://ewh.ieee.org/soc/cas/dallas/documents/Sem-022107-stas_adpll.pdf
