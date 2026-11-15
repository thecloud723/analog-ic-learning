# PLL 18 章公式参考索引

公式旁的 Ref 给出可以核实的参考依据。课程重排符号、换算单位、加入教学数值或做离散化时，按推导或教学模型标注。索引覆盖公式块、能识别的正文和表格公式，以及本轮新增的交互计算模型。图里的示意性刻度和参数标号沿用图注。

| 章 | 公式块 | 正文与表格 | 实验模型 | 参考来源 |
|---|---:|---:|---:|---|
| [01](#第-01-章) | 7 | 7 | 0 | 086、PSD、TIP、143、008 |
| [02](#第-02-章) | 12 | 6 | 1 | PSD、PLL、TIP |
| [03](#第-03-章) | 9 | 5 | 1 | 086、RC、PLL、TIP |
| [04](#第-04-章) | 7 | 0 | 1 | PLL、ADP、LMX |
| [05](#第-05-章) | 12 | 9 | 1 | 086、JIT、LMX |
| [06](#第-06-章) | 9 | 11 | 1 | PLL、143、TIP |
| [07](#第-07-章) | 15 | 3 | 1 | RC、PLL、CP、143 |
| [08](#第-08-章) | 17 | 5 | 3 | OSC、LC |
| [09](#第-09-章) | 21 | 7 | 1 | PLL、RC |
| [10](#第-10-章) | 21 | 7 | 1 | PLL |
| [11](#第-11-章) | 12 | 7 | 1 | PSD、CTMS、TIP、PLL |
| [12](#第-12-章) | 19 | 1 | 1 | PSD、008、LEE、PLL |
| [13](#第-13-章) | 12 | 4 | 1 | 143、OSC |
| [14](#第-14-章) | 5 | 4 | 1 | LMX、MASH |
| [15](#第-15-章) | 6 | 5 | 1 | MASH |
| [16](#第-16-章) | 4 | 1 | 1 | ADP |
| [17](#第-17-章) | 0 | 5 | 1 | ADP、DTC |
| [18](#第-18-章) | 0 | 2 | 1 | LMX、TIP |

## 参考文献

- **PLL** [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html)
- **OSC** [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html)
- **086** [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf)
- **008** [ADI MT-008 · 相噪换算时间抖动](https://www.analog.com/media/en/training-seminars/tutorials/mt-008.pdf)
- **TIP** [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf)
- **PSD** [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html)
- **143** [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html)
- **LEE** [Leeson（1966）· 振荡器噪声模型](https://doi.org/10.1109/PROC.1966.4682)
- **LMX** [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf)
- **ADF** [ADI ADF4159 · RF Synthesizer: A Worked Example](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4159.pdf)
- **MASH** [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html)
- **ADP** [Staszewski / Balsara · All-Digital Frequency Synthesizer, Ch. 4](https://doi.org/10.1002/0470041951)
- **DTC** [Zhuang / Staszewski（2014）· ADPLL 相位预测](https://www.jstage.jst.go.jp/article/ipsjtsldm/7/0/7_2/_article)
- **JIT** [ADI · Random Noise Contribution to Timing Jitter](https://www.analog.com/en/resources/technical-articles/random-noise-contribution-to-timing-jitter8212theory-and-practice.html)
- **CTMS** [University of Michigan CTMS · Second-Order Systems](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=SystemAnalysis)
- **RC** [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits)
- **CP** [本课程 · 第 7 章 SPICE 网表与脚本](assets/cp-ripple-lab.zip)
- **LC** [本课程 · 第 8 章 SPICE 网表与脚本](assets/lc-vco-lab.zip)

## 第 01 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [overview · f01-001](chapters/01_PLL用途与系统全景.html#f01-001) | 正文或表格 | 反馈关系：整数-N PLL 的相位检测器比较参考时钟与分频后的反馈时钟，稳态频率关系为 fOUT/N = fREF。 | 086 · 锁定频率关系及本课程代入 |
| [equations · f01-002](chapters/01_PLL用途与系统全景.html#f01-002) | 公式块 | 适用：整数-N、R=1、输出不再额外分频的基本结构。锁定时反馈频率与参考频率相等（fFB = fREF）。 · f_{FB} =(f_{OUT})/(N)  f_{FB} =f_{REF}   f_{OUT}=Nf_{REF} | 086 · 锁定时的整数分频关系 |
| [equations · f01-003](chapters/01_PLL用途与系统全景.html#f01-003) | 公式块 | Δt 为对应边沿时间差；Δφ 单位 rad。符号取决于“谁领先”的定义。 · Δφ=2π(Δt)/(T_{REF})=2πf_{REF}Δt | PSD · 相位与时间换算 |
| [equations · f01-004](chapters/01_PLL用途与系统全景.html#f01-004) | 公式块 | 频率决定相位变化速度；频率差会使相位差随时间累积。 · (dφ(t))/(dt) =2πf(t)  φ(t) =φ(0)+2π∫_{0}^{t}f(τ)dτ | PSD · 由瞬时频率定义积分 |
| [equations · f01-005](chapters/01_PLL用途与系统全景.html#f01-005) | 公式块 | 必须说明 target、测量节点、参考基准和测试条件。 · ε_{ppm}=(f_{meas}−f_{target})/(f_{target})×10^{6} | TIP · 本课程以目标频率为基准定义 ppm |
| [example · f01-006](chapters/01_PLL用途与系统全景.html#f01-006) | 公式块 | f_{OUT}=16×100MHz=1.6GHz | 086 · 含本课程教学假设或数值代入 |
| [example · f01-007](chapters/01_PLL用途与系统全景.html#f01-007) | 正文或表格 | 当 N = 20 时，锁定输出频率为 2.0 GHz。上述关系适用于基本整数-N 结构。 | 086 · 含本课程教学假设或数值代入 |
| [example · f01-008](chapters/01_PLL用途与系统全景.html#f01-008) | 正文或表格 | 参考周期 T = 1/100 MHz = 10 ns。 | 086 · 含本课程教学假设或数值代入 |
| [example · f01-009](chapters/01_PLL用途与系统全景.html#f01-009) | 公式块 | Δφ =360^{∘}×(40ps)/(10ns)   =1.44^{∘}≈0.0251rad | PSD · 相位换算的本课程代入 |
| [example · f01-010](chapters/01_PLL用途与系统全景.html#f01-010) | 公式块 | ε_{ppm} =(1.5992−1.6000)/(1.6000)×10^{6}   =−500ppm | TIP · ppm 定义；本课程按本节约定的分母和符号 |
| [spec · f01-011](chapters/01_PLL用途与系统全景.html#f01-011) | 正文或表格 | 频偏回答尖峰离载波多远。dBc 回答这一根谱线的功率相对载波有多大，例如 −60 dBc 表示百万分之一。 | 143 · 单根谱线功率相对载波的 dBc 定义 |
| [spec · f01-012](chapters/01_PLL用途与系统全景.html#f01-012) | 正文或表格 | 先看测试条件。沿用前面的整数 N 例题：参考时钟 100 MHz，反馈分频比 N = 16，参考侧和输出侧都假设没有额外分频，锁定后的输出载波为 1.6 GHz。这张图只画这一个工作点。后面的分频滑块可计算 0.4–3.2 GHz 的目标频率，实际芯片可锁定的范围还取决于 VCO 调谐范围和分频设置。 | 008 · 含本课程教学假设或数值代入 |
| [lab · f01-013](chapters/01_PLL用途与系统全景.html#f01-013) | 正文或表格 | 滑块默认时间差为 40 ps。改变参考频率或边沿时间差，计算相位差 Δφ = 2πfREFΔt。 | PSD · 由相位与时间定义换算 |
| [quiz · f01-014](chapters/01_PLL用途与系统全景.html#f01-014) | 正文或表格 | 本章小结：整数-N PLL 的稳态频率满足 fOUT=NfREF；反馈环路通过控制振荡器频率调节相位。性能评价应结合频率、抖动、噪声、杂散及测量条件。 | 086 · 锁定频率关系及本课程代入 |

## 第 02 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p1 · f02-001](chapters/02_频率相位时间差与锁定.html#f02-001) | 公式块 | f(t)=(1)/(2π)(dφ(t))/(dt) | PSD · 按来源中的关系式整理 |
| [p1 · f02-002](chapters/02_频率相位时间差与锁定.html#f02-002) | 公式块 | φ(t)=φ(0)+2π∫_{0}^{t}f(τ)dτ | PSD · 按来源中的关系式整理 |
| [p1 · f02-003](chapters/02_频率相位时间差与锁定.html#f02-003) | 正文或表格 | 当频率为常数 f0 时：φ(t) = φ(0) + 2πf0t。固定频率对应线性增长的展开相位，而不是固定相位值。 | PSD · 按来源中的关系式整理 |
| [p1 · f02-004](chapters/02_频率相位时间差与锁定.html#f02-004) | 公式块 | Δφ =2π(100MHz)(35ns)   =7πrad=3.5×2πrad | PSD · 含本课程教学假设或数值代入 |
| [p2 · f02-005](chapters/02_频率相位时间差与锁定.html#f02-005) | 正文或表格 | 锁相环比较参考时钟与反馈时钟的相位。定义相位误差 eφ(t)=φREF(t)−φFB(t)。由相位对时间的导数，可直接得到频率误差与相位误差变化率的关系。 | PLL · 按来源中的关系式整理 |
| [p2 · f02-006](chapters/02_频率相位时间差与锁定.html#f02-006) | 公式块 | (de_{φ}(t))/(dt)=2π(f_{REF}(t)−f_{FB}(t)) | PLL · 按来源中的关系式整理 |
| [p2 · f02-007](chapters/02_频率相位时间差与锁定.html#f02-007) | 正文或表格 | 例如 REF = FB = 100 MHz，且 FB 的边沿始终晚 40 ps：两个时钟已经频率相等，但相位不一致。相位是否需要调整，取决于系统允许的目标相位偏差。 | PLL · 含本课程教学假设或数值代入 |
| [p3 · f02-008](chapters/02_频率相位时间差与锁定.html#f02-008) | 公式块 | Δφ(rad)=2π(Δt)/(T)=2πfΔt | PSD · 按来源中的关系式整理 |
| [p3 · f02-009](chapters/02_频率相位时间差与锁定.html#f02-009) | 公式块 | Δφ(deg)=360^{∘}(Δt)/(T) | PSD · 按来源中的关系式整理 |
| [p3 · f02-010](chapters/02_频率相位时间差与锁定.html#f02-010) | 公式块 | Δcycles=(Δt)/(T_{REF}) | PSD · 按来源中的关系式整理 |
| [p3 · f02-011](chapters/02_频率相位时间差与锁定.html#f02-011) | 公式块 | Δn =(40ps)/(10ns)=0.004cycles  Δφ =360^{∘}×0.004=1.44^{∘}   ≈0.02513rad | PSD · 含本课程教学假设或数值代入 |
| [p3 · f02-012](chapters/02_频率相位时间差与锁定.html#f02-012) | 正文或表格 | 1 cycle = 10 ns | PSD · 按来源中的关系式整理 |
| [p4 · f02-013](chapters/02_频率相位时间差与锁定.html#f02-013) | 公式块 | D_{XOR}=(&#124;Δφ&#124;)/(π),0≤&#124;Δφ&#124;≤π | PLL · 由等占空比 XOR 波形推导 |
| [p5 · f02-014](chapters/02_频率相位时间差与锁定.html#f02-014) | 正文或表格 | 定义 FB 相对 REF 的频率误差 ε = (fFB−fREF)/fREF。ppm 为相对误差的百万分之一。 | TIP · ppm 定义；本课程按本节约定的分母和符号 |
| [p5 · f02-015](chapters/02_频率相位时间差与锁定.html#f02-015) | 公式块 | ε_{ppm}=(f_{FB}−f_{REF})/(f_{REF})×10^{6} | TIP · ppm 定义；本课程按本节约定的分母和符号 |
| [p5 · f02-016](chapters/02_频率相位时间差与锁定.html#f02-016) | 公式块 | e_{φ}(t)=e_{φ}(0)−2π(f_{FB}−f_{REF})t | PSD · 按来源中的关系式整理 |
| [p5 · f02-017](chapters/02_频率相位时间差与锁定.html#f02-017) | 公式块 | Δt_{N}=N((1)/(f_{FB})−(1)/(f_{REF})) | PSD · 按来源中的关系式整理 |
| [p6 · f02-018](chapters/02_频率相位时间差与锁定.html#f02-018) | 实验模型 | 先看同频，再看频偏 | PSD · 本课程交互计算或 SPICE 基准 |
| [p8 · f02-019](chapters/02_频率相位时间差与锁定.html#f02-019) | 正文或表格 | 已知 REF = 100 MHz，FB = 100.010 MHz，初始两路边沿对齐。 | PSD · 含本课程教学假设或数值代入 |

## 第 03 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p2 · f03-001](chapters/03_从开环到闭环.html#f03-001) | 正文或表格 | 理想净脉宽≈0 | 086 · 按来源中的关系式整理 |
| [p3 · f03-002](chapters/03_从开环到闭环.html#f03-002) | 公式块 | ΔV_{ctrl}=(1)/(C)∫_{t_{0}}^{t_{1}}I_{CP}(t)dt | RC · 按来源中的关系式整理 |
| [p3 · f03-003](chapters/03_从开环到闭环.html#f03-003) | 公式块 | ΔV_{ctrl}=±(I_{CP}t_{ON})/(C) | RC · 按来源中的关系式整理 |
| [p3 · f03-004](chapters/03_从开环到闭环.html#f03-004) | 公式块 | ΔQ =I_{CP}t_{ON}=100μA×40ps=4fC  ΔV =(ΔQ)/(C)=(4fC)/(20pF)=0.2mV | RC · 含本课程教学假设或数值代入 |
| [p3 · f03-005](chapters/03_从开环到闭环.html#f03-005) | 正文或表格 | REF = 100 MHz，周期 10 ns；CP 平均电流 = ICP·ton/Tref。仅采用理想积分电容，暂不包含实际环路滤波器电阻与纹波。 | RC · 含本课程教学假设或数值代入 |
| [p4 · f03-006](chapters/03_从开环到闭环.html#f03-006) | 公式块 | f_{VCO}(t)=f_{free}+K_{VCO}[V_{ctrl}(t)−V_{ref}] | PLL · 按来源中的关系式整理 |
| [p4 · f03-007](chapters/03_从开环到闭环.html#f03-007) | 公式块 | φ_{VCO}(t)=φ_{VCO}(0)+2π∫_{0}^{t}f_{VCO}(τ)dτ | PLL · 按来源中的关系式整理 |
| [p4 · f03-008](chapters/03_从开环到闭环.html#f03-008) | 公式块 | Δf =K_{VCO}ΔV=100(MHz)/(V)×20mV=2MHz  Δφ =2πΔfΔt=4πrad | PLL · 含本课程教学假设或数值代入 |
| [p5 · f03-009](chapters/03_从开环到闭环.html#f03-009) | 实验模型 | 闭环第一次会往哪边拉？ | PLL · 本课程交互计算或 SPICE 基准 |
| [p5 · f03-010](chapters/03_从开环到闭环.html#f03-010) | 公式块 | e[k+1]=e[k]+1−(f_{VCO}[k])/(Nf_{REF}) | PLL · 本课程基于环路关系的逐拍离散化 |
| [p5 · f03-011](chapters/03_从开环到闭环.html#f03-011) | 公式块 | s[k+1] =s[k]+e[k+1]  f_{VCO}[k] =f_{free}+K_{p}e[k]+K_{i}s[k] | PLL · 本课程基于环路关系的逐拍离散化 |
| [p5 · f03-012](chapters/03_从开环到闭环.html#f03-012) | 正文或表格 | 已知：fREF=100 MHz、N=16、fFREE=1592 MHz。Kp 单位 MHz/周期相位误差、Ki 为每次更新的等效积分增益；该增益仅用于此离散教学模型，不表示 CP 实际元件值。 | PLL · 本课程基于环路关系的逐拍离散化 |
| [p7 · f03-013](chapters/03_从开环到闭环.html#f03-013) | 公式块 | t_{lock}=t_{firstsustainedpass}−t_{trigger} | TIP · 按来源中的关系式整理 |
| [p7 · f03-014](chapters/03_从开环到闭环.html#f03-014) | 正文或表格 | 频率切换在 t=0 启动。输出自 12 µs 起进入 ±100 ppm，但相位误差直到 18 µs 才进入 ±2°，且要求连续保持 5 µs。若 18～23 µs 均满足两项条件，按“完成保持区间”定义的锁定时间为 23 µs；按“首次进入后且将持续满足窗口的时刻”定义则为 18 µs。 | TIP · ppm 定义；本课程按本节约定的分母和符号 |
| [p8 · f03-015](chapters/03_从开环到闭环.html#f03-015) | 正文或表格 | 设 fREF=100 MHz，N=16，VCO 初始输出 1.592 GHz；VCO 为正增益、常规 CP 极性。 | 086 · 含本课程教学假设或数值代入 |

## 第 04 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p1 · f04-001](chapters/04_PLL架构地图.html#f04-001) | 实验模型 | 换一种 PLL，比较节点和控制量怎样变？ | PLL · 本课程交互计算或 SPICE 基准 |
| [p2 · f04-002](chapters/04_PLL架构地图.html#f04-002) | 公式块 | V_{e}(s)=K_{PD}[φ_{REF}(s)−(φ_{OUT}(s))/(N)] | PLL · 按来源中的关系式整理 |
| [p2 · f04-003](chapters/04_PLL架构地图.html#f04-003) | 公式块 | φ_{OUT}(s)=(K_{VCO})/(s)H_{LP}(s)V_{e}(s) | PLL · 按来源中的关系式整理 |
| [p3 · f04-004](chapters/04_PLL架构地图.html#f04-004) | 公式块 | ΔV=(I_{UP}t_{UP}−I_{DN}t_{DN})/(C) | PLL · 按来源中的关系式整理 |
| [p4 · f04-005](chapters/04_PLL架构地图.html#f04-005) | 公式块 | e[k]=φ_{REF}[k]−φ_{CKV}[k] | ADP · 按来源中的关系式整理 |
| [p4 · f04-006](chapters/04_PLL架构地图.html#f04-006) | 公式块 | u[k]=K_{p}e[k]+K_{i}∑m=0ke[m] | ADP · 按来源中的关系式整理 |
| [p5 · f04-007](chapters/04_PLL架构地图.html#f04-007) | 公式块 | f_{OUT}=(N+α)f_{PFD},0≤α&lt;1 | LMX · 按来源中的关系式整理 |
| [p5 · f04-008](chapters/04_PLL架构地图.html#f04-008) | 公式块 | N ̄=(f_{OUT})/(f_{PFD})=(1.625GHz)/(100MHz)=16.25 | LMX · 含本课程教学假设或数值代入 |

## 第 05 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p1 · f05-001](chapters/05_参考源与时钟输出链.html#f05-001) | 公式块 | f_{PD}=(f_{REF})/(R),f_{VCO}=Nf_{PD},f_{CLK}=(f_{VCO})/(D) | 086 · 按来源中的关系式整理 |
| [p2 · f05-002](chapters/05_参考源与时钟输出链.html#f05-002) | 公式块 | σ_{t}≈(σ_{v})/(&#124;dV/dt&#124;_{V_{th}}) | JIT · 按来源中的关系式整理 |
| [p2 · f05-003](chapters/05_参考源与时钟输出链.html#f05-003) | 正文或表格 | 阈值交越 Slew = 0.20 V/ns，等效输入噪声 2 mV RMS，则边沿时间不确定度约为 10 ps RMS。 | JIT · 含本课程教学假设或数值代入 |
| [p2 · f05-004](chapters/05_参考源与时钟输出链.html#f05-004) | 公式块 | σ_{t}≈(2mV)/(0.20V/ns)=10ps | JIT · 含本课程教学假设或数值代入 |
| [p3 · f05-005](chapters/05_参考源与时钟输出链.html#f05-005) | 公式块 | f_{PD}=(f_{REF})/(R),T_{PD}=(R)/(f_{REF}) | 086 · 按来源中的关系式整理 |
| [p3 · f05-006](chapters/05_参考源与时钟输出链.html#f05-006) | 正文或表格 | 10 MHz 晶体参考时钟经过 R = 50，得到 200 kHz 的 PFD 比较频率： | 086 · 含本课程教学假设或数值代入 |
| [p3 · f05-007](chapters/05_参考源与时钟输出链.html#f05-007) | 公式块 | f_{PD}=(10MHz)/(50)=200kHz | 086 · 含本课程教学假设或数值代入 |
| [p3 · f05-008](chapters/05_参考源与时钟输出链.html#f05-008) | 正文或表格 | 由 fVCO=N·fREF/R，R 翻倍使 fPD 和 fVCO 均减半。 | 086 · 锁定频率关系及本课程代入 |
| [p4 · f05-009](chapters/05_参考源与时钟输出链.html#f05-009) | 公式块 | f_{VCO}=Nf_{PD}=(N)/(R)f_{REF} | 086 · 按来源中的关系式整理 |
| [p4 · f05-010](chapters/05_参考源与时钟输出链.html#f05-010) | 公式块 | f_{VCO}=PNf_{PD} | 086 · 按来源中的关系式整理 |
| [p4 · f05-011](chapters/05_参考源与时钟输出链.html#f05-011) | 正文或表格 | fPD = 1 MHz，P = 4，后级 N = 400，则简单固定 Prescaler 合成频率为 1.6 GHz。将 N 增加 1 时，输出步进是 4 MHz，而非 1 MHz。 | 086 · 锁定频率关系及本课程代入 |
| [p4 · f05-012](chapters/05_参考源与时钟输出链.html#f05-012) | 公式块 | f_{VCO}=4×400×1MHz=1.6GHz | 086 · 含本课程教学假设或数值代入 |
| [p5 · f05-013](chapters/05_参考源与时钟输出链.html#f05-013) | 公式块 | f_{CLK,i}=(f_{VCO})/(D_{i}) | LMX · 按来源中的关系式整理 |
| [p6 · f05-014](chapters/05_参考源与时钟输出链.html#f05-014) | 正文或表格 | REF = 100 MHz，R=1，希望 VCO=1.6 GHz，同时输出 800 MHz 和 400 MHz。应使用 N=16，并在 VCO 后分别选 D1=2、D2=4。 | 086 · 含本课程教学假设或数值代入 |
| [p6 · f05-015](chapters/05_参考源与时钟输出链.html#f05-015) | 公式块 | N=(1.6GHz)/(100MHz)=16,D_{1}=2,D_{2}=4 | 086 · 含本课程教学假设或数值代入 |
| [p6 · f05-016](chapters/05_参考源与时钟输出链.html#f05-016) | 正文或表格 | REF=100 MHz，R=2 得到 PFD 频率 50 MHz。若仍要求 fVCO=1.6 GHz，N 应变成 32。 | 086 · 锁定频率关系及本课程代入 |
| [p6 · f05-017](chapters/05_参考源与时钟输出链.html#f05-017) | 公式块 | N=(1.6GHz)/(100MHz/2)=32 | 086 · 含本课程教学假设或数值代入 |
| [p6 · f05-018](chapters/05_参考源与时钟输出链.html#f05-018) | 公式块 | 整数增加、其余不变 · Δf_{VCO}=f_{PD}( N  1) | 086 · 按来源中的关系式整理 |
| [p6 · f05-019](chapters/05_参考源与时钟输出链.html#f05-019) | 正文或表格 | REFIN = 25 MHz，D = 1（倍频），T = 0，R = 5，INT = 250，FRAC = 0，DOUT = 4。 | 086 · 含本课程教学假设或数值代入 |
| [p6 · f05-020](chapters/05_参考源与时钟输出链.html#f05-020) | 正文或表格 | fPFD = 25 × 2 / 5 = 10 MHz；fVCO = 10 × 250 = 2500 MHz；fRFOUT = 2500 / 4 = 625 MHz。本振处于 ADF4351 的 2200–4400 MHz 范围内。 | 086 · 锁定频率关系及本课程代入 |
| [p7 · f05-021](chapters/05_参考源与时钟输出链.html#f05-021) | 实验模型 | 改一个分频器，哪些节点频率跟着变？ | 086 · 本课程交互计算或 SPICE 基准 |
| [p7 · f05-022](chapters/05_参考源与时钟输出链.html#f05-022) | 正文或表格 | fCLK=N·fREF/(R·D)，R 从 1 到 2，输出频率由 800 MHz 变为 400 MHz。请在下方验证。 | 086 · 含本课程教学假设或数值代入 |

## 第 06 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p1 · f06-001](chapters/06_PD_PFD相位与频率比较.html#f06-001) | 公式块 | Δφ=2π(Δt)/(T_{PD}) | PLL · 按来源中的关系式整理 |
| [p1 · f06-002](chapters/06_PD_PFD相位与频率比较.html#f06-002) | 公式块 | Δφ=2π(40ps)/(10ns)=0.008πrad=1.44^{∘} | PLL · 含本课程教学假设或数值代入 |
| [p2 · f06-003](chapters/06_PD_PFD相位与频率比较.html#f06-003) | 正文或表格 | REF 触发 DFF REF，QUP=1 | PLL · 按来源中的关系式整理 |
| [p2 · f06-004](chapters/06_PD_PFD相位与频率比较.html#f06-004) | 正文或表格 | FB 触发 DFF FB，QDN=1 | PLL · 按来源中的关系式整理 |
| [p3 · f06-005](chapters/06_PD_PFD相位与频率比较.html#f06-005) | 实验模型 | 用边沿先后预测 UP 和 DN | PLL · 本课程交互计算或 SPICE 基准 |
| [p3 · f06-006](chapters/06_PD_PFD相位与频率比较.html#f06-006) | 公式块 | t_{UP}=t_{RST}+max(Δt,0),t_{DN}=t_{RST}+max(−Δt,0) | PLL · 由双 DFF PFD 时序和固定复位延迟推导 |
| [p3 · f06-007](chapters/06_PD_PFD相位与频率比较.html#f06-007) | 正文或表格 | 其中 Δt=tFB−tREF；正值表示 REF 领先。该表达式是包含相同复位延迟的理想化 PFD 脉宽模型。 | PLL · 按来源中的关系式整理 |
| [p4 · f06-008](chapters/06_PD_PFD相位与频率比较.html#f06-008) | 公式块 | (dΔφ(t))/(dt)=2π(f_{REF}−f_{FB}) | PLL · 按来源中的关系式整理 |
| [p4 · f06-009](chapters/06_PD_PFD相位与频率比较.html#f06-009) | 正文或表格 | fREF=100 MHz，fFB=100.1 MHz。以相同初始相位开始，经过 100 个 REF 周期，反馈相位相对参考约前进 0.1 个周期，不能仅用某一瞬间的单个脉冲断定平均频率方向。 | PLL · 含本课程教学假设或数值代入 |
| [p4 · f06-010](chapters/06_PD_PFD相位与频率比较.html#f06-010) | 公式块 | 100×(0.1MHz)/(100MHz)≈0.10 cycle | PLL · 含本课程教学假设或数值代入 |
| [p5 · f06-011](chapters/06_PD_PFD相位与频率比较.html#f06-011) | 公式块 | I–_{CP}∣_{Δt=0}≈(I_{UP}−I_{DN})/(T_{PD})t_{RST} | 143 · 按相同重叠脉宽和恒流近似推导 |
| [p5 · f06-012](chapters/06_PD_PFD相位与频率比较.html#f06-012) | 正文或表格 | 如果 IUP=IDN，上式为零；如果存在不匹配，即使两输入边沿重合，也可能出现非零平均电流，引入静态相位偏差及纹波/Spur。 | 143 · 按来源中的关系式整理 |
| [p5 · f06-013](chapters/06_PD_PFD相位与频率比较.html#f06-013) | 正文或表格 | IUP = 1.01 mA，IDN = 1.00 mA，Δt = 40 ps，ABP = 3 ns（符号和有效脉宽定义基于本教学模型）。相位差贡献约 40.4 fC；1% 电流不匹配的基线贡献约 30 fC。两项量级接近，所以电流匹配对细小相位误差十分关键。 | 143 · 含本课程教学假设或数值代入 |
| [p6 · f06-014](chapters/06_PD_PFD相位与频率比较.html#f06-014) | 公式块 | I–_{CP}=I_{CP}(t_{UP}−t_{DN})/(T_{PD})=(I_{CP})/(2π)Δφ | PLL · 按来源中的关系式整理 |
| [p6 · f06-015](chapters/06_PD_PFD相位与频率比较.html#f06-015) | 公式块 | K_{PD}=(∂I–_{CP})/(∂Δφ)=(I_{CP})/(2π)[A/rad] | PLL · 按来源中的关系式整理 |
| [p6 · f06-016](chapters/06_PD_PFD相位与频率比较.html#f06-016) | 正文或表格 | fPD=100 MHz（TPD=10 ns），ICP=100 µA，REF 领先 40 ps，忽略失配与泄漏。 | PLL · 含本课程教学假设或数值代入 |
| [p6 · f06-017](chapters/06_PD_PFD相位与频率比较.html#f06-017) | 公式块 | I–_{CP}=100μA×(40ps)/(10ns)=0.40μA | PLL · 含本课程教学假设或数值代入 |
| [p7 · f06-018](chapters/06_PD_PFD相位与频率比较.html#f06-018) | 正文或表格 | 在 Δt≈0 周围细扫 | TIP · 按来源中的关系式整理 |
| [p7 · f06-019](chapters/06_PD_PFD相位与频率比较.html#f06-019) | 正文或表格 | 比较 ±Δt 的实际脉冲及平均电流 | TIP · 按来源中的关系式整理 |
| [p7 · f06-020](chapters/06_PD_PFD相位与频率比较.html#f06-020) | 正文或表格 | 教学模型：Δt 范围 −500～500 ps，ICP=100 µA，fPD=100 MHz；假设理想线性、匹配。不是实测曲线。 | TIP · 含本课程教学假设或数值代入 |
| [p8 · f06-021](chapters/06_PD_PFD相位与频率比较.html#f06-021) | 正文或表格 | 100 µA×60 ps/10 ns=0.6 µA；该值表示周期平均电流，导通时仍是 100 µA 等级。 | PLL · 含本课程教学假设或数值代入 |

## 第 07 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p2 · f07-001](chapters/07_Charge_Pump与Loop_Filter.html#f07-001) | 公式块 | i_{C}(t)=C(dv_{C}(t))/(dt) | RC · 按来源中的关系式整理 |
| [p2 · f07-002](chapters/07_Charge_Pump与Loop_Filter.html#f07-002) | 公式块 | Q(t_{1},t_{2})=∫_{t_{1}}^{t_{2}}i_{C}(t)dt,ΔV_{C}=(Q)/(C) | RC · 按来源中的关系式整理 |
| [p2 · f07-003](chapters/07_Charge_Pump与Loop_Filter.html#f07-003) | 公式块 | 恒流脉冲，理想电容 · ΔV_{C}=(I_{CP}t_{ON})/(C)() | RC · 按来源中的关系式整理 |
| [p2 · f07-004](chapters/07_Charge_Pump与Loop_Filter.html#f07-004) | 公式块 | ΔV_{C}=(50μA×1ns)/(100pF)=0.5mV | RC · 按来源中的关系式整理 |
| [p3 · f07-005](chapters/07_Charge_Pump与Loop_Filter.html#f07-005) | 正文或表格 | 图 7-2：R1–C1 串联支路与 C2 并联小电容。解释阻抗公式时，先令 C2=0，再考虑 C2 的高频滤波作用。 | RC · 按来源中的关系式整理 |
| [p3 · f07-006](chapters/07_Charge_Pump与Loop_Filter.html#f07-006) | 公式块 | Z_{1}(s)=R_{1}+(1)/(sC_{1})=(1+sR_{1}C_{1})/(sC_{1}) | RC · 由串联 R–C 阻抗推导 |
| [p3 · f07-007](chapters/07_Charge_Pump与Loop_Filter.html#f07-007) | 公式块 | ω_{z}=(1)/(R_{1}C_{1}),f_{z}=(1)/(2πR_{1}C_{1}) | RC · 令阻抗表达式分子为零 |
| [p3 · f07-008](chapters/07_Charge_Pump与Loop_Filter.html#f07-008) | 正文或表格 | R1=10 kΩ，C1=100 pF。 | RC · 按来源中的关系式整理 |
| [p3 · f07-009](chapters/07_Charge_Pump与Loop_Filter.html#f07-009) | 公式块 | f_{z}=(1)/(2π×10kΩ×100pF)≈159kHz | RC · 按来源中的关系式整理 |
| [p4 · f07-010](chapters/07_Charge_Pump与Loop_Filter.html#f07-010) | 公式块 | Z(s)=(R_{1}+(1)/(sC_{1}))∥(1)/(sC_{2}) | RC · 由两支路并联关系推导 |
| [p4 · f07-011](chapters/07_Charge_Pump与Loop_Filter.html#f07-011) | 公式块 | Z(s)=(1+sR_{1}C_{1})/(s(C_{1}+C_{2})+s^{2}R_{1}C_{1}C_{2}) | RC · 并联阻抗展开 |
| [p4 · f07-012](chapters/07_Charge_Pump与Loop_Filter.html#f07-012) | 公式块 | ω_{z}=(1)/(R_{1}C_{1}),ω_{p2}=(C_{1}+C_{2})/(R_{1}C_{1}C_{2}) | RC · 课程拓扑的零极点，由阻抗式推导 |
| [p5 · f07-013](chapters/07_Charge_Pump与Loop_Filter.html#f07-013) | 公式块 | K_{PD}=(I_{CP})/(2π)[A/rad] | PLL · 按来源中的关系式整理 |
| [p5 · f07-014](chapters/07_Charge_Pump与Loop_Filter.html#f07-014) | 公式块 | V_{CTRL}(s)=K_{PD}Z(s)ΔΦ(s) | PLL · 按来源中的关系式整理 |
| [p5 · f07-015](chapters/07_Charge_Pump与Loop_Filter.html#f07-015) | 公式块 | Φ_{VCO}(s)=(K_{VCO})/(s)V_{CTRL}(s) | PLL · 按来源中的关系式整理 |
| [p5 · f07-016](chapters/07_Charge_Pump与Loop_Filter.html#f07-016) | 公式块 | L(s)=(K_{PD}K_{VCO})/(Ns)Z(s) | PLL · 按来源中的关系式整理 |
| [p6 · f07-017](chapters/07_Charge_Pump与Loop_Filter.html#f07-017) | 实验模型 | UP 和 DN 同时导通，电流会互相抵消吗？ | CP · 局部恒流脉冲和偏置 RC 的 SPICE 教学模型 |
| [p6 · f07-018](chapters/07_Charge_Pump与Loop_Filter.html#f07-018) | 公式块 | Q_{net}=I_{UP}t_{UP}−I_{DN}t_{DN}−I_{leak}T_{PD} | 143 · 按来源中的关系式整理 |
| [p7 · f07-019](chapters/07_Charge_Pump与Loop_Filter.html#f07-019) | 正文或表格 | 理想积分电容满足 ΔV=I·t/C。因此电流翻倍时，ΔV 翻倍；实际 CP 要注意顺从范围和开关非理想。 | PLL · 按来源中的关系式整理 |

## 第 08 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p1 · f08-001](chapters/08_VCO与DCO可控振荡器.html#f08-001) | 公式块 | f_{out}(t)=f_{free}+K_{f}[V_{ctrl}(t)−V_{bias}] | OSC · 按来源中的关系式整理 |
| [p1 · f08-002](chapters/08_VCO与DCO可控振荡器.html#f08-002) | 公式块 | φ_{out}(t)=φ_{out}(0)+2π∫_{0}^{t}f_{out}(τ)dτ | OSC · 按来源中的关系式整理 |
| [p2 · f08-003](chapters/08_VCO与DCO可控振荡器.html#f08-003) | 实验模型 | LC VCO 调到了目标频率，还能起振吗？ | LC · 本课程交互计算或 SPICE 基准 |
| [p2 · f08-004](chapters/08_VCO与DCO可控振荡器.html#f08-004) | 公式块 | f_{0}=(1)/(2π√(LC)) | OSC · 按来源中的关系式整理 |
| [p2 · f08-005](chapters/08_VCO与DCO可控振荡器.html#f08-005) | 公式块 | Q=2π(E_{stored})/(E_{lost/cycle}),Q_{parallel}≈ω_{0}CR_{p} | OSC · 按来源中的关系式整理 |
| [p2 · f08-006](chapters/08_VCO与DCO可控振荡器.html#f08-006) | 公式块 | (∂f_{0})/(∂C)=−(f_{0})/(2C) | OSC · 由理想 LC 谐振频率对 C 求导 |
| [p2 · f08-007](chapters/08_VCO与DCO可控振荡器.html#f08-007) | 正文或表格 | 电感 L = 1 nH，总电容 C = 1 pF。 | OSC · 按来源中的关系式整理 |
| [p2 · f08-008](chapters/08_VCO与DCO可控振荡器.html#f08-008) | 公式块 | f_{0}=(1)/(2π√((1nH)(1pF)))≈5.03GHz | OSC · 含本课程教学假设或数值代入 |
| [p3 · f08-009](chapters/08_VCO与DCO可控振荡器.html#f08-009) | 实验模型 | 一级很快，绕一圈要多久？ | OSC · 本课程交互计算或 SPICE 基准 |
| [p3 · f08-010](chapters/08_VCO与DCO可控振荡器.html#f08-010) | 公式块 | f_{ring}≈(1)/(2Mt_{d}) | OSC · 按来源中的关系式整理 |
| [p3 · f08-011](chapters/08_VCO与DCO可控振荡器.html#f08-011) | 公式块 | f_{ring}≈(1)/(2×3×20ps)≈8.33GHz | OSC · 含本课程教学假设或数值代入 |
| [p4 · f08-012](chapters/08_VCO与DCO可控振荡器.html#f08-012) | 公式块 | K_{f}(V)=(df_{VCO})/(dV_{ctrl})[Hz/V] | OSC · 按来源中的关系式整理 |
| [p4 · f08-013](chapters/08_VCO与DCO可控振荡器.html#f08-013) | 公式块 | K_{VCO}(V)=2πK_{f}(V)[rad/(s⋅V)] | OSC · 按来源中的关系式整理 |
| [p4 · f08-014](chapters/08_VCO与DCO可控振荡器.html#f08-014) | 公式块 | Δf_{VCO}≈K_{f}ΔV_{ctrl} | OSC · 按来源中的关系式整理 |
| [p4 · f08-015](chapters/08_VCO与DCO可控振荡器.html#f08-015) | 正文或表格 | 在 0.7 V 附近测得 Kf = 400 MHz/V，控制电压从 0.70 V 上升到 0.72 V： | OSC · 含本课程教学假设或数值代入 |
| [p4 · f08-016](chapters/08_VCO与DCO可控振荡器.html#f08-016) | 公式块 | Δf≈(400MHz/V)(0.02V)=8MHz | OSC · 含本课程教学假设或数值代入 |
| [p5 · f08-017](chapters/08_VCO与DCO可控振荡器.html#f08-017) | 公式块 | C_{total}(D)=C_{0}+∑i=0m−1b_{i}C_{i},b_{i}∈{0,1} | OSC · 按来源中的关系式整理 |
| [p5 · f08-018](chapters/08_VCO与DCO可控振荡器.html#f08-018) | 公式块 | f(D)=(1)/(2π√(LC_{total}(D))) | OSC · 按来源中的关系式整理 |
| [p5 · f08-019](chapters/08_VCO与DCO可控振荡器.html#f08-019) | 公式块 | K_{DCO}(D)=f(D+1)−f(D)[Hz/LSB] | OSC · 按来源中的关系式整理 |
| [p5 · f08-020](chapters/08_VCO与DCO可控振荡器.html#f08-020) | 正文或表格 | 当 L=1 nH、基础 C=1 pF，打开额外 20 fF 电容时： | OSC · 按来源中的关系式整理 |
| [p5 · f08-021](chapters/08_VCO与DCO可控振荡器.html#f08-021) | 公式块 | f(0)≈5.0329GHz,f(1)≈4.9833GHz | OSC · 含本课程教学假设或数值代入 |
| [p5 · f08-022](chapters/08_VCO与DCO可控振荡器.html#f08-022) | 正文或表格 | 演示取 ΔfPVT=8 MHz/档、ΔfACQ=0.32 MHz/档、ΔfTRK=0.035 MHz/档，均为教学参数。真实论文的 PVT Bank 存在二进制与温度计组合，不能把它直接解释成全部档位等步进。 | OSC · 含本课程教学假设或数值代入 |
| [p6 · f08-023](chapters/08_VCO与DCO可控振荡器.html#f08-023) | 公式块 | Δf≈K_{f}ΔV_{ctrl},Δφ(t)=2π∫_{0}^{t}Δf(τ)dτ | OSC · 按来源中的关系式整理 |
| [p7 · f08-024](chapters/08_VCO与DCO可控振荡器.html#f08-024) | 实验模型 | 每档都加相同的电容，频率步进一样吗？ | OSC · 理想 LC 与并联电容求和的教学推导 |
| [p7 · f08-025](chapters/08_VCO与DCO可控振荡器.html#f08-025) | 正文或表格 | 由 f = 1/(2π√LC)，L 不变时电容增大导致频率下降。预测确认后可调整参数。 | OSC · 按来源中的关系式整理 |

## 第 09 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p1 · f09-001](chapters/09_完整CP_PLL动态.html#f09-001) | 公式块 | e_{φ}(t)=φ_{REF}(t)−(φ_{VCO}(t))/(N) | PLL · 按来源中的关系式整理 |
| [p1 · f09-002](chapters/09_完整CP_PLL动态.html#f09-002) | 公式块 | f_{VCO}(t)=f_{base}+K_{f}[V_{ctrl}(t)−V_{base}] | PLL · 按来源中的关系式整理 |
| [p2 · f09-003](chapters/09_完整CP_PLL动态.html#f09-003) | 公式块 | Δφ=2π(Δt)/(T_{REF}) | PLL · 按来源中的关系式整理 |
| [p2 · f09-004](chapters/09_完整CP_PLL动态.html#f09-004) | 公式块 | i–_{CP}=I_{CP}(Δt)/(T_{REF})=(I_{CP})/(2π)Δφ | PLL · 按来源中的关系式整理 |
| [p2 · f09-005](chapters/09_完整CP_PLL动态.html#f09-005) | 公式块 | K_{φ}=(I_{CP})/(2π)[A/rad] | PLL · 按来源中的关系式整理 |
| [p2 · f09-006](chapters/09_完整CP_PLL动态.html#f09-006) | 正文或表格 | fREF = 100 MHz，TREF = 10 ns，ICP = 50 µA，REF 领先 FB 100 ps： | PLL · 含本课程教学假设或数值代入 |
| [p2 · f09-007](chapters/09_完整CP_PLL动态.html#f09-007) | 公式块 | i–_{CP}=50μA(100ps)/(10ns)=0.50μA | PLL · 含本课程教学假设或数值代入 |
| [p3 · f09-008](chapters/09_完整CP_PLL动态.html#f09-008) | 公式块 | V_{C}(t)=V_{C}(0)+(1)/(C)∫_{0}^{t}i_{CP}(τ)dτ | RC · 按来源中的关系式整理 |
| [p3 · f09-009](chapters/09_完整CP_PLL动态.html#f09-009) | 公式块 | 平均模型 · V_{ctrl}(t)=V_{C}(t)+Ri_{CP}(t)() | RC · 按来源中的关系式整理 |
| [p3 · f09-010](chapters/09_完整CP_PLL动态.html#f09-010) | 公式块 | 理想、无泄漏 · (dV_{C})/(dt)∣_{i_{CP}=0}=0() | RC · 按来源中的关系式整理 |
| [p3 · f09-011](chapters/09_完整CP_PLL动态.html#f09-011) | 正文或表格 | 目标 Vctrl = 0.60 V。理想电容 C = 20 pF 保持该电压所需电荷为： | RC · 按来源中的关系式整理 |
| [p3 · f09-012](chapters/09_完整CP_PLL动态.html#f09-012) | 公式块 | Q=CV=(20pF)(0.60V)=12pC | RC · 按来源中的关系式整理 |
| [p4 · f09-013](chapters/09_完整CP_PLL动态.html#f09-013) | 公式块 | (dφ_{FB})/(dt)=2π(f_{VCO})/(N) | PLL · 按来源中的关系式整理 |
| [p4 · f09-014](chapters/09_完整CP_PLL动态.html#f09-014) | 公式块 | (de_{φ})/(dt)=2π(f_{REF}−(f_{VCO})/(N)) | PLL · 按来源中的关系式整理 |
| [p4 · f09-015](chapters/09_完整CP_PLL动态.html#f09-015) | 公式块 | Δe_{φ}[k]≈2π(1−(f_{VCO}[k])/(Nf_{REF})) | PLL · 按来源中的关系式整理 |
| [p4 · f09-016](chapters/09_完整CP_PLL动态.html#f09-016) | 正文或表格 | REF=100 MHz，N=16，当前 fVCO=1.56 GHz，反馈频率为97.5 MHz，约每个参考周期累积0.025个周期的相位差。 | PLL · 含本课程教学假设或数值代入 |
| [p4 · f09-017](chapters/09_完整CP_PLL动态.html#f09-017) | 公式块 | Δe_{φ}=2π(1−(1.56GHz)/(16×100MHz))=0.05πrad | PLL · 含本课程教学假设或数值代入 |
| [p5 · f09-018](chapters/09_完整CP_PLL动态.html#f09-018) | 正文或表格 | 实验统一采用下列参数：REF 100 MHz、N=16、VCO 在 0.50 V 时输出 1.56 GHz、频率增益 400 MHz/V。要达到 1.600 GHz，稳态控制电压应接近 0.60 V。 | PLL · 含本课程教学假设或数值代入 |
| [p5 · f09-019](chapters/09_完整CP_PLL动态.html#f09-019) | 公式块 | V_{target}=V_{base}+(Nf_{REF}−f_{base})/(K_{f}) | PLL · 按来源中的关系式整理 |
| [p5 · f09-020](chapters/09_完整CP_PLL动态.html#f09-020) | 公式块 | V_{target}=0.50V+(1.600−1.560GHz)/(0.400GHz/V)=0.60V | PLL · 含本课程教学假设或数值代入 |
| [p5 · f09-021](chapters/09_完整CP_PLL动态.html#f09-021) | 正文或表格 | 离散实验用无量纲的周期误差 e[k]=eφ[k]/(2π)，在每个参考周期更新一次；滤波器电压有“积分状态”和“电阻的瞬时比例分量”。 | PLL · 按来源中的关系式整理 |
| [p5 · f09-022](chapters/09_完整CP_PLL动态.html#f09-022) | 公式块 | i ̄[k]=I_{CP}e[k],V_{ctrl}[k]=V_{C}[k]+Ri ̄[k] | PLL · 本课程基于环路关系的逐拍离散化 |
| [p5 · f09-023](chapters/09_完整CP_PLL动态.html#f09-023) | 公式块 | V_{C}[k+1]=V_{C}[k]+(T_{REF})/(C)i ̄[k] | PLL · 本课程基于环路关系的逐拍离散化 |
| [p5 · f09-024](chapters/09_完整CP_PLL动态.html#f09-024) | 公式块 | e[k+1]=e[k]+1−(f_{VCO}[k])/(Nf_{REF}) | PLL · 本课程基于环路关系的逐拍离散化 |
| [p6 · f09-025](chapters/09_完整CP_PLL动态.html#f09-025) | 公式块 | limt→∞(f_{REF}−(f_{VCO})/(N))=0 | PLL · 按来源中的关系式整理 |
| [p6 · f09-026](chapters/09_完整CP_PLL动态.html#f09-026) | 公式块 | 理想无泄漏模型 · i–_{CP}→0,V_{C}→V_{target}() | PLL · 按来源中的关系式整理 |
| [p7 · f09-027](chapters/09_完整CP_PLL动态.html#f09-027) | 实验模型 | 同一环路里，哪个量先变？ | PLL · 本课程交互计算或 SPICE 基准 |
| [p7 · f09-028](chapters/09_完整CP_PLL动态.html#f09-028) | 正文或表格 | ΔVC = (TREF/C)·Iavg，电容增大而电流不变时，积分电压步进减小。 | PLL · 按来源中的关系式整理 |
| [p7 · f09-029](chapters/09_完整CP_PLL动态.html#f09-029) | 正文或表格 | 初始 e=+0.10 UI，初始 VC=0.50 V，目标输出为 1.60 GHz。仿真每个参考周期更新一次，理想化线性 PFD。 | PLL · 含本课程教学假设或数值代入 |

## 第 10 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p1 · f10-001](chapters/10_相位域模型与Type_I_II.html#f10-001) | 公式块 | e_{φ}(s)=φ_{ref}(s)−(φ_{out}(s))/(N) | PLL · 按来源中的关系式整理 |
| [p1 · f10-002](chapters/10_相位域模型与Type_I_II.html#f10-002) | 公式块 | φ_{out}(s)=(K_{ω})/(s)Z(s)K_{φ}e_{φ}(s) | PLL · 按来源中的关系式整理 |
| [p1 · f10-003](chapters/10_相位域模型与Type_I_II.html#f10-003) | 正文或表格 | Kφ = ICP/(2π) | PLL · 按来源中的关系式整理 |
| [p1 · f10-004](chapters/10_相位域模型与Type_I_II.html#f10-004) | 正文或表格 | V/A = Ω | PLL · 按来源中的关系式整理 |
| [p1 · f10-005](chapters/10_相位域模型与Type_I_II.html#f10-005) | 正文或表格 | Kω/s，Kω = 2πKf | PLL · 按来源中的关系式整理 |
| [p2 · f10-006](chapters/10_相位域模型与Type_I_II.html#f10-006) | 公式块 | Δω_{VCO}(t)=K_{ω}ΔV_{ctrl}(t) | PLL · 按来源中的关系式整理 |
| [p2 · f10-007](chapters/10_相位域模型与Type_I_II.html#f10-007) | 公式块 | Δφ_{out}(t)=∫_{0}^{t}Δω_{VCO}(τ)dτ | PLL · 按来源中的关系式整理 |
| [p2 · f10-008](chapters/10_相位域模型与Type_I_II.html#f10-008) | 公式块 | (Δφ_{out}(s))/(ΔV_{ctrl}(s))=(K_{ω})/(s) | PLL · 按来源中的关系式整理 |
| [p2 · f10-009](chapters/10_相位域模型与Type_I_II.html#f10-009) | 公式块 | Δφ=2πΔfΔt=2π(10^{3})(10^{−3})=2πrad | PLL · 按来源中的关系式整理 |
| [p3 · f10-010](chapters/10_相位域模型与Type_I_II.html#f10-010) | 正文或表格 | PLL Type 的定义取决于开环传递函数在 s=0 的积分器（原点极点）个数。简单 PD + 无积分特性的低通环路滤波器 + VCO，是典型 Type-I PLL。 | PLL · 按来源中的关系式整理 |
| [p3 · f10-011](chapters/10_相位域模型与Type_I_II.html#f10-011) | 公式块 | L_{I}(s)=(K_{PD}K_{ω})/(N)(H_{LP}(s))/(s) | PLL · 按来源中的关系式整理 |
| [p3 · f10-012](chapters/10_相位域模型与Type_I_II.html#f10-012) | 公式块 | H_{LP}(s)=(1)/(1+sτ)⟹L_{I}(s)∝(1)/(s)(s→0) | PLL · 按来源中的关系式整理 |
| [p4 · f10-013](chapters/10_相位域模型与Type_I_II.html#f10-013) | 正文或表格 | 电荷泵输出电流注入电容，电容上的电压是电流的积分。最简单的串联 R–C 阻抗为 Z(s)=R+1/(sC)，包含额外一个原点极点。 | PLL · 按来源中的关系式整理 |
| [p4 · f10-014](chapters/10_相位域模型与Type_I_II.html#f10-014) | 公式块 | Z(s)=R+(1)/(sC)=(1+sRC)/(sC) | PLL · 按来源中的关系式整理 |
| [p4 · f10-015](chapters/10_相位域模型与Type_I_II.html#f10-015) | 公式块 | L_{II}(s)=(K_{φ}K_{ω})/(N)(1+sRC)/(s^{2}C) | PLL · 按来源中的关系式整理 |
| [p5 · f10-016](chapters/10_相位域模型与Type_I_II.html#f10-016) | 正文或表格 | 将环路定义为 L(s)=Kφ Z(s) Kω/(sN)，从负反馈方程直接求出参考相位到输出相位的闭环传递函数。 | PLL · 按来源中的关系式整理 |
| [p5 · f10-017](chapters/10_相位域模型与Type_I_II.html#f10-017) | 公式块 | φ_{out}(s)=NL(s)[φ_{ref}(s)−(φ_{out}(s))/(N)] | PLL · 按来源中的关系式整理 |
| [p5 · f10-018](chapters/10_相位域模型与Type_I_II.html#f10-018) | 公式块 | (φ_{out}(s))/(φ_{ref}(s))=(NL(s))/(1+L(s)) | PLL · 按来源中的关系式整理 |
| [p5 · f10-019](chapters/10_相位域模型与Type_I_II.html#f10-019) | 公式块 | (e_{φ}(s))/(φ_{ref}(s))=(1)/(1+L(s)) | PLL · 按来源中的关系式整理 |
| [p5 · f10-020](chapters/10_相位域模型与Type_I_II.html#f10-020) | 公式块 | H_{VCO}(s)=(1)/(1+L(s)) | PLL · 按来源中的关系式整理 |
| [p6 · f10-021](chapters/10_相位域模型与Type_I_II.html#f10-021) | 公式块 | ω_{n}^{2}=(K_{φ}K_{ω})/(NC),2ζω_{n}=(K_{φ}K_{ω}R)/(N) | PLL · 对照二阶分母系数 |
| [p6 · f10-022](chapters/10_相位域模型与Type_I_II.html#f10-022) | 公式块 | ω_{n}=√((I_{CP}K_{f})/(NC)),ζ=(R)/(2)√((I_{CP}K_{f}C)/(N)) | PLL · 由式 (67) 换用 Hz/V 推导 |
| [p6 · f10-023](chapters/10_相位域模型与Type_I_II.html#f10-023) | 公式块 | H(s)=N(2ζω_{n}s+ω_{n}^{2})/(s^{2}+2ζω_{n}s+ω_{n}^{2}) | PLL · 式 (67)，统一符号后写出 |
| [p6 · f10-024](chapters/10_相位域模型与Type_I_II.html#f10-024) | 正文或表格 | ICP=50 µA、Kf=400 MHz/V、N=16、C=20 pF、R=10 kΩ： | PLL · 含本课程教学假设或数值代入 |
| [p6 · f10-025](chapters/10_相位域模型与Type_I_II.html#f10-025) | 公式块 | ω_{n}≈7.91×10^{6}rad/s,f_{n}=(ω_{n})/(2π)≈1.26MHz,ζ≈0.791 | PLL · 教学参数代入 |
| [p7 · f10-026](chapters/10_相位域模型与Type_I_II.html#f10-026) | 实验模型 | 改 R 后，0 dB 交越和相位一起怎么动？ | PLL · 本课程交互计算或 SPICE 基准 |
| [p7 · f10-027](chapters/10_相位域模型与Type_I_II.html#f10-027) | 公式块 | &#124;L(jω)&#124;=(K_{φ}K_{ω})/(NC)(√(1+(ωRC)^{2}))/(ω^{2}) | PLL · 按来源中的关系式整理 |
| [p7 · f10-028](chapters/10_相位域模型与Type_I_II.html#f10-028) | 公式块 | ∠L(jω)=−180^{∘}+tan^{−1}⁡(ωRC) | PLL · 按来源中的关系式整理 |
| [p7 · f10-029](chapters/10_相位域模型与Type_I_II.html#f10-029) | 公式块 | 开环模型： L(s) = [ICP/(2π)] · [KVCO/N] · [1+sRC] / [s²C(1+s/ωp)]相位裕量： PM = 180° + ∠L(jωc)，其中 &#124;L(jωc)&#124;=1 | PLL · 按来源中的关系式整理 |

## 第 11 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p1 · f11-001](chapters/11_瞬态响应稳定性与锁定时间.html#f11-001) | 正文或表格 | ΔφREF(t)=φ0u(t) | PSD · 按来源中的关系式整理 |
| [p1 · f11-002](chapters/11_瞬态响应稳定性与锁定时间.html#f11-002) | 正文或表格 | ΔfREF(t)=Δf·u(t) | PSD · 按来源中的关系式整理 |
| [p1 · f11-003](chapters/11_瞬态响应稳定性与锁定时间.html#f11-003) | 公式块 | Δφ(t)=Δφ(0)+2πΔft | PSD · 按来源中的关系式整理 |
| [p2 · f11-004](chapters/11_瞬态响应稳定性与锁定时间.html#f11-004) | 公式块 | s^{2}+2ζω_{n}s+ω_{n}^{2}=0 | CTMS · 标准无零点二阶响应；含本课程变换及推导 |
| [p2 · f11-005](chapters/11_瞬态响应稳定性与锁定时间.html#f11-005) | 公式块 | ω_{d}=ω_{n}√(1−ζ^{2}),0&lt;ζ&lt;1 | CTMS · 标准无零点二阶响应；含本课程变换及推导 |
| [p2 · f11-006](chapters/11_瞬态响应稳定性与锁定时间.html#f11-006) | 公式块 | y(t)=1−e^{−ζω_{n}t}[cos⁡(ω_{d}t)+(ζ)/(√(1−ζ^{2}))sin⁡(ω_{d}t)] | CTMS · 标准无零点二阶响应；含本课程变换及推导 |
| [p2 · f11-007](chapters/11_瞬态响应稳定性与锁定时间.html#f11-007) | 公式块 | M_{p}=e^{−(πζ)/(√(1−ζ^{2}))}×100% | CTMS · 标准无零点二阶响应；含本课程变换及推导 |
| [p2 · f11-008](chapters/11_瞬态响应稳定性与锁定时间.html#f11-008) | 公式块 | t_{p}=(π)/(ω_{d}),t_{s}(2%)≈(4)/(ζω_{n}) | CTMS · 标准无零点二阶响应；含本课程变换及推导 |
| [p2 · f11-009](chapters/11_瞬态响应稳定性与锁定时间.html#f11-009) | 正文或表格 | ζ ≈ 0.7 | CTMS · 标准无零点二阶响应；含本课程变换及推导 |
| [p2 · f11-010](chapters/11_瞬态响应稳定性与锁定时间.html#f11-010) | 正文或表格 | ζ ≥ 1 | CTMS · 标准无零点二阶响应；含本课程变换及推导 |
| [p3 · f11-011](chapters/11_瞬态响应稳定性与锁定时间.html#f11-011) | 公式块 | PM=180^{∘}+∠L(jω_{c}),&#124;L(jω_{c})&#124;=1 | TIP · 按来源中的关系式整理 |
| [p3 · f11-012](chapters/11_瞬态响应稳定性与锁定时间.html#f11-012) | 正文或表格 | 对指定的二阶环路滤波器族，可以由开环模型求出 PM 与 ζ 的关系；改变滤波器阶数、零极点配置或延迟后，该关系会变化。TI 的 PLL 设计手册给出特定二阶滤波器条件下的对应表，例如 PM=45° 时 ζ 约为 0.777，不能把该数值套用到任意 PLL。 | TIP · 按来源中的关系式整理 |
| [p3 · f11-013](chapters/11_瞬态响应稳定性与锁定时间.html#f11-013) | 正文或表格 | 若增益交越频率为 500 kHz，该频率处开环相位为 −132°，则 PM=180°−132°=48°。该结果表示相对于 −180° 的相位余量，不等同于“系统有 48° 的相位误差”。 | TIP · 按来源中的关系式整理 |
| [p4 · f11-014](chapters/11_瞬态响应稳定性与锁定时间.html#f11-014) | 公式块 | ω_{n}=2πf_{n},t_{s}(2%)≈(4)/(ζ2πf_{n}) | CTMS · 按来源中的关系式整理 |
| [p4 · f11-015](chapters/11_瞬态响应稳定性与锁定时间.html#f11-015) | 正文或表格 | 设主导自然频率 fn=200 kHz、ζ=0.70： | CTMS · 按来源中的关系式整理 |
| [p4 · f11-016](chapters/11_瞬态响应稳定性与锁定时间.html#f11-016) | 公式块 | t_{s}≈(4)/(0.7×2π×200×10^{3})=4.55μs | CTMS · 按来源中的关系式整理 |
| [p5 · f11-017](chapters/11_瞬态响应稳定性与锁定时间.html#f11-017) | 公式块 | t_{LOCK}=t_{qualifiedlock}−t_{trigger} | TIP · 按来源中的关系式整理 |
| [p6 · f11-018](chapters/11_瞬态响应稳定性与锁定时间.html#f11-018) | 公式块 | Δφ(t)=Δφ_{0}+2πΔft | TIP · 按来源中的关系式整理 |
| [p8 · f11-019](chapters/11_瞬态响应稳定性与锁定时间.html#f11-019) | 实验模型 | 同一条响应，为什么会报出不同锁定时间？ | PLL · 本课程交互计算或 SPICE 基准 |
| [p8 · f11-020](chapters/11_瞬态响应稳定性与锁定时间.html#f11-020) | 公式块 | Type-II CP-PLL 闭环相位传递（含环路零点）： Tφ(s)=(ωn²+2ζωns)/(s²+2ζωns+ωn²)频率阶跃响应： Δfout(t)=Δf·y(t)相位误差： Eφ(s)=2πΔf/[s²+2ζωns+ωn²]；Type-II 环路对恒定频率阶跃的稳态相位误差为 0。 | PLL · 式 (67) 归一化，频率阶跃误差为本课程推导 |

## 第 12 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p1 · f12-001](chapters/12_Phase_Noise与Jitter.html#f12-001) | 实验模型 | 同一载波，三步读懂边沿和频谱 | PSD · 等间距抽样、小相位周期图与单边带积分的课程模型 |
| [p1 · f12-002](chapters/12_Phase_Noise与Jitter.html#f12-002) | 公式块 | v(t)=Acos⁡(2πf_{0}t+φ_{n}(t)) | PSD · 按来源中的关系式整理 |
| [p1 · f12-003](chapters/12_Phase_Noise与Jitter.html#f12-003) | 公式块 | x(t)=(φ_{n}(t))/(2πf_{0}) | PSD · 按来源中的关系式整理 |
| [p1 · f12-004](chapters/12_Phase_Noise与Jitter.html#f12-004) | 公式块 | Δt = φ / (2πf₀) = (φ / 360°) · T₀ 相位用 rad 代入第一式，或用度数代入第二式。 | 008 · 相位角与等效时间的换算 |
| [p2 · f12-005](chapters/12_Phase_Noise与Jitter.html#f12-005) | 公式块 | L(Δf)=10log_{10}⁡((P_{noise}(f_{0}+Δf,1Hz))/(P_{carrier}))dBc/Hz | PSD · 按来源中的关系式整理 |
| [p2 · f12-006](chapters/12_Phase_Noise与Jitter.html#f12-006) | 公式块 | L_total(f) = 10log₁₀[10^(L₁/10) + 10^(L₂/10) + 10^(L₃/10)]白频率噪声项按 −20 dB/dec 变化；闪烁相关项按 −30 dB/dec 变化；最后在线性功率域求和。 | PSD · 独立噪声在线性功率域相加；斜率为教学合成项 |
| [p2 · f12-007](chapters/12_Phase_Noise与Jitter.html#f12-007) | 公式块 | 噪声功率（RBW 内）≈ L_noise + 10log₁₀(RBW) 单位从 dBc/Hz 积分到 RBW 内的 dBc；离散 Spur 直接以 dBc 表示。 | PSD · 局部平坦谱密度乘等效噪声带宽的近似 |
| [p3 · f12-008](chapters/12_Phase_Noise与Jitter.html#f12-008) | 公式块 | L(Δf) ≈ 10 log₁₀{[FkT/(2Ps)] · [1 + (f₀/(2QLΔf))²] · [1 + fc/Δf]} | LEE · 此处采用带闪烁项的常用教学形式 |
| [p3 · f12-009](chapters/12_Phase_Noise与Jitter.html#f12-009) | 公式块 | L(Δf) = 10log₁₀{[F kT/(2Pₛ)] · [1+(fL/Δf)²] · [1+f_c/Δf]}其中 fL = f₀/(2Qᴸ)，F 是线性噪声因子，Pₛ 是振荡信号功率。 | LEE · 此处采用带闪烁项的常用教学形式 |
| [p4 · f12-010](chapters/12_Phase_Noise与Jitter.html#f12-010) | 公式块 | T(s)=(L(s))/(1+L(s)),S(s)=(1)/(1+L(s)),T(s)+S(s)=1 | PLL · 按注入点整理，实验使用简化二阶模型 |
| [p4 · f12-011](chapters/12_Phase_Noise与Jitter.html#f12-011) | 公式块 | (Φ_{OUT})/(Φ_{REF})=NT(s),(Φ_{OUT})/(Φ_{VCO})=S(s) | PLL · 按注入点整理，实验使用简化二阶模型 |
| [p4 · f12-012](chapters/12_Phase_Noise与Jitter.html#f12-012) | 公式块 | T(s)=ωₙ²/[s²+2ζωₙs+ωₙ²] S(s)=s(s+2ζωₙ)/[s²+2ζωₙs+ωₙ²]输出参考噪声 = &#124;N·T&#124;²·S_ref；输出 VCO 噪声 = &#124;S&#124;²·S_vco。不同注入点必须使用各自的传递函数。 | PLL · 实验使用无零点二阶教学模型；S=1−T |
| [p5 · f12-013](chapters/12_Phase_Noise与Jitter.html#f12-013) | 公式块 | σ_{φ}^{2}=2∫_{f_{1}}^{f_{2}}10^{L(Δf)/10}d(Δf) | 008 · 按来源中的关系式整理 |
| [p5 · f12-014](chapters/12_Phase_Noise与Jitter.html#f12-014) | 公式块 | σ_{t}=(σ_{φ})/(2πf_{0}) | 008 · 按来源中的关系式整理 |
| [p5 · f12-015](chapters/12_Phase_Noise与Jitter.html#f12-015) | 公式块 | σ_{φ}^{2}≈2×10^{−12}×(10^{6}−10^{4})=1.98×10^{−6}rad^{2} | 008 · 按来源中的关系式整理 |
| [p5 · f12-016](chapters/12_Phase_Noise与Jitter.html#f12-016) | 公式块 | σ_{t}≈(√(1.98×10^{−6}))/(2π×100×10^{6})=2.24psrms | 008 · 含本课程教学假设或数值代入 |
| [p5 · f12-017](chapters/12_Phase_Noise与Jitter.html#f12-017) | 公式块 | σφ² = 2∫[f₁→f₂] 10^(L(f)/10) df σt = σφ/(2πf₀)这里采用小相位噪声、单边带 L(f) 的常用约定；积分范围必须随结果一起报告。 | 008 · 按来源中的关系式整理 |
| [p6 · f12-018](chapters/12_Phase_Noise与Jitter.html#f12-018) | 公式块 | 通常需按模型及目标定义，而非单一固定换算式 · σ_{TJ} RJ/DJ  BER | PSD · 总抖动依赖所用模型和目标定义 |
| [p6 · f12-019](chapters/12_Phase_Noise与Jitter.html#f12-019) | 公式块 | TIE[n] = RJ[n] + DJₚₑₐₖ·sin(2πn/P)RJ[n] 为标准差 σRJ 的高斯随机量；本实验的 DJ 是单音周期抖动示例，不代表所有 DJ 类型。 | PSD · 本课程的高斯随机量与单音周期误差叠加示例 |
| [p8 · f12-020](chapters/12_Phase_Noise与Jitter.html#f12-020) | 公式块 | Lout(f)=10log₁₀[10^(LREF,out/10)+10^(LVCO,out/10)]σφ²=2∫[f₁→f₂]10^(Lout(f)/10)df； σt=σφ/(2πf₀) | 008 · 按来源中的关系式整理 |
| [p8 · f12-021](chapters/12_Phase_Noise与Jitter.html#f12-021) | 正文或表格 | 模型说明：REF 相噪按参考输入端定义，输出传递函数为 N·T(s)；VCO 自身相噪通过 S(s)。先在线性功率域叠加，再积分。采用单边带相噪 L(f) 的小相位噪声约定，积分相位方差为 2∫10^(L/10)df。未包含 CP、电阻、分频器、PFD 等其他噪声源，也不代表实测芯片结果。 | 008 · 按来源中的关系式整理 |

## 第 13 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p1 · f13-001](chapters/13_Spur非线性与PVT.html#f13-001) | 公式块 | SpurLevel=10log_{10}⁡((P_{spur})/(P_{carrier}))dBc | 143 · 按来源中的关系式整理 |
| [p2 · f13-002](chapters/13_Spur非线性与PVT.html#f13-002) | 公式块 | f_{SPUR}=f_{OUT}±kf_{PFD},k=1,2,3,... | 143 · 按来源中的关系式整理 |
| [p3 · f13-003](chapters/13_Spur非线性与PVT.html#f13-003) | 公式块 | Q_{err}=I_{UP}t_{UP}−I_{DN}t_{DN}+I_{leak}T_{PFD} | 143 · 净电荷模型；此处把漏电定义为带符号的电流 |
| [p3 · f13-004](chapters/13_Spur非线性与PVT.html#f13-004) | 公式块 | ΔV_{TUNE}=(Q_{err})/(C),Δf≈K_{VCO}ΔV_{TUNE} | 143 · 由电容充放电与 VCO 局部线性关系推导 |
| [p4 · f13-005](chapters/13_Spur非线性与PVT.html#f13-005) | 实验模型 | 把第 7 章的纹波送进 VCO | 143 · 第 7 章 SPICE 纹波；AN143 FM 附录的小信号边带近似 |
| [p4 · f13-006](chapters/13_Spur非线性与PVT.html#f13-006) | 公式块 | β=(Δf_{pk})/(f_{m}) | 143 · FM 附录：频偏峰值与调制频率之比 |
| [p4 · f13-007](chapters/13_Spur非线性与PVT.html#f13-007) | 公式块 | P_{spur}[dBc]≈20log_{10}⁡((β)/(2)) | 143 · FM 附录：小调制指数的一阶单边带近似 |
| [p4 · f13-008](chapters/13_Spur非线性与PVT.html#f13-008) | 正文或表格 | 假设 fm=1 MHz，频偏峰值 Δfpk=100 Hz： | 143 · 含本课程教学假设或数值代入 |
| [p4 · f13-009](chapters/13_Spur非线性与PVT.html#f13-009) | 公式块 | β=(100)/(10^{6})=10^{−4} | 143 · 教学算例：代入频偏峰值与调制频率 |
| [p4 · f13-010](chapters/13_Spur非线性与PVT.html#f13-010) | 公式块 | P_{spur}≈20log_{10}⁡(5×10^{−5})=−86.0dBc | 143 · 教学算例：由 β/2 算单侧边带 dBc |
| [p5 · f13-011](chapters/13_Spur非线性与PVT.html#f13-011) | 正文或表格 | KVCO=df/dV 随 VTUNE 改变 | 143 · 工作点近似；本课程教学推导 |
| [p5 · f13-012](chapters/13_Spur非线性与PVT.html#f13-012) | 公式块 | K_{VDD}=(∂f_{OUT})/(∂V_{DD}),K_{VCO}=(∂f_{OUT})/(∂V_{TUNE}) | 143 · 工作点近似；本课程教学推导 |
| [p5 · f13-013](chapters/13_Spur非线性与PVT.html#f13-013) | 公式块 | Δf_{OUT}≈K_{VDD}ΔV_{DD} | 143 · 工作点近似；本课程教学推导 |
| [p6 · f13-014](chapters/13_Spur非线性与PVT.html#f13-014) | 公式块 | (Δf)/(f_{0})≈α_{V}ΔV_{DD}+α_{T}ΔT | OSC · 工作点近似；本课程教学推导 |
| [p7 · f13-015](chapters/13_Spur非线性与PVT.html#f13-015) | 正文或表格 | 公开案例采用 LTC6945 PLL 与 RFMD UMX-586-D16-G VCO，输出 2.1 GHz，fPFD=1 MHz，参考时钟 10 MHz，R=10、N=2100，环路带宽 40 kHz。频谱中可观察到载波两侧按 1 MHz 间隔排列的参考杂散。 | 143 · 图 3 的实测条件与分频关系 |
| [p8 · f13-016](chapters/13_Spur非线性与PVT.html#f13-016) | 公式块 | 等效每周期校正电荷： Qnet=ICP·ε·tp+Ileak·TPFD矩形脉冲第 n 次谐波： In,pk=2(Qnet/TPFD)·&#124;sinc(nπtp/TPFD)&#124;滤波器与 VCO： Vn,pk=In,pk&#124;Z(j2πnfPFD)&#124;，Δfn=KVCOVn,pk小调制指数边带： β=Δfn/(nfPFD)，Spur≈20log₁₀(β/2) | 143 · 与 AN143 的路径一致；矩形电流脉冲频谱为本课程推导 |
| [p8 · f13-017](chapters/13_Spur非线性与PVT.html#f13-017) | 正文或表格 | 模型边界：把每周期净电荷等效为宽度 tp 的矩形校正脉冲；其中 Ileak·TPFD 假设由 PFD/CP 每周期补偿成等效校正包。若漏电仅表现为恒定直流偏置，它主要改变锁定工作点，不会单独形成同样的离散 Spur。滤波器采用简化串联 R-C 阻抗 Z=R+1/(jωC)，并计算脉冲列前 10 次谐波；KVCO 滑块代表当前调谐电压和 PVT 工作点附近的局部斜率；真实器件应从不同 PVT corner 的 VCO tuning curve 提取该值，不能把本实验的单一数值当 | 143 · 按来源中的关系式整理 |

## 第 14 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p1 · f14-001](chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-001) | 公式块 | (f_{OUT})/(N)=f_{PFD}⇒f_{OUT}=Nf_{PFD} | LMX · 按来源中的关系式整理 |
| [p1 · f14-002](chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-002) | 正文或表格 | 例题：fREF=100 MHz、R=1，则 fPFD=100 MHz。输出可以是 6.0 GHz、6.1 GHz、6.2 GHz……但不能直接设成 6.025 GHz。 | LMX · 含本课程教学假设或数值代入 |
| [p2 · f14-003](chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-003) | 公式块 | f_{PFD}=(f_{REF})/(R),f_{OUT}=N(f_{REF})/(R) | LMX · 按来源中的关系式整理 |
| [p3 · f14-004](chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-004) | 公式块 | N_{avg}=N+α,0≤α&lt;1 / f_{OUT}=N+αf_{PFD} | LMX · 按来源中的关系式整理 |
| [p3 · f14-005](chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-005) | 正文或表格 | 每 4 次分频的总和是 241，平均值为 241/4=60.25。上面是简单一阶累加器序列；实际高阶 DSM/MASH 会生成更复杂的多位序列。 | LMX · 按来源中的关系式整理 |
| [p4 · f14-006](chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-006) | 公式块 | N_{avg}=INT+(NUM)/(DEN) / Δf_{step}=(f_{PFD})/(DEN) | LMX · NUM/DEN，理想最小频率步进由平均分频比推导 |
| [p4 · f14-007](chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-007) | 正文或表格 | 固定 fPFD 时，理想频率网格越细。例如 100 MHz / 225 ≈ 2.98 Hz。 | LMX · 含本课程教学假设或数值代入 |
| [p6 · f14-008](chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-008) | 公式块 | NTF_{L}z=1−z^{−1}^{L} | MASH · 按来源中的关系式整理 |
| [p7 · f14-009](chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-009) | 实验模型 | 每一拍都是整数，平均值怎样落在中间？ | LMX · 本课程交互计算或 SPICE 基准 |
| [p7 · f14-010](chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-010) | 正文或表格 | 固定 fPFD=25 MHz，α 从 0.20 增加到 0.25，输出频率会怎样变化？ | LMX · 含本课程教学假设或数值代入 |

## 第 15 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p1 · f15-001](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-001) | 公式块 | N_{avg}=N+α,α∈0,1 | MASH · 按来源中的关系式整理 |
| [p2 · f15-002](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-002) | 正文或表格 | 每拍把 α 加到状态里；一旦累加值达到 1，就输出进位 q[n]=1，并减去 1；否则输出 0。状态始终保留小数余量。 | MASH · 按来源中的关系式整理 |
| [p2 · f15-003](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-003) | 公式块 | v_{n}=a_{n−1}+α / q_{n}=v_{n}≥1?1:0,a_{n}=v_{n}−q_{n} | MASH · 按来源中的关系式整理 |
| [p2 · f15-004](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-004) | 公式块 | q_{n}=α+a_{n−1}−a_{n} | MASH · 按来源中的关系式整理 |
| [p2 · f15-005](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-005) | 正文或表格 | 对很多拍求和时，中间状态会望远镜式抵消，剩下的平均输出趋近 α。α=0.3 时，足够长的窗口里进位总数约占 30%。 | MASH · 按来源中的关系式整理 |
| [p3 · f15-006](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-006) | 公式块 | Yz=Y_{1}z+1−z^{−1}Y_{2}z+1−z^{−1}^{2}Y_{3}z | MASH · 三级数字抵消式；按本章误差符号约定 |
| [p4 · f15-007](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-007) | 公式块 | NTF_{MASH111}z=1−z^{−1}^{3} / &#124;NTF_{3}e^{jω}&#124;^{2}=2sin(ω)/(2)^{6} | MASH · 按来源中的关系式整理 |
| [p7 · f15-008](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-008) | 实验模型 | 都是 0.3，分频字的频谱一样吗？ | MASH · 本课程交互计算或 SPICE 基准 |
| [p7 · f15-009](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-009) | 正文或表格 | 输入 α=0.3，观察足够长的 MASH 1-1-1 输出。下面哪种描述正确？ | MASH · 按来源中的关系式整理 |
| [p7 · f15-010](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-010) | 公式块 | 一阶累加器： s₁[n]=s₁[n−1]+α−y₁[n]；y₁[n] 为 0/1 进位MASH 1-1-1： y[n]=y₁[n]+(1−z⁻¹)y₂[n]+(1−z⁻¹)²y₃[n]理想量化噪声传递： NTF₁(z)=1−z⁻¹；NTF₃(z)=(1−z⁻¹)³ | MASH · 按来源中的关系式整理 |
| [p8 · f15-011](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-011) | 正文或表格 | α=0、整数模式与接近 1 的边界。 | MASH · 按来源中的关系式整理 |
| [p8 · f15-012](chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-012) | 正文或表格 | α=1/2、1/4、3/8 等短周期分数。 | MASH · 按来源中的关系式整理 |

## 第 16 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p2 · f16-001](chapters/PLL_第16章_ADPLL结构与数字PI.html#f16-001) | 公式块 | Φ_{ref}n+1=Φ_{ref}n+FCW / Φ_{ref}n=Φ_{ref}0+n·FCW | ADP · 按来源中的关系式整理 |
| [p3 · f16-002](chapters/PLL_第16章_ADPLL结构与数字PI.html#f16-002) | 公式块 | Φ_{fb}n=Cn+(Δt)/(T_{DCO}) / e_{φ}n=Φ_{ref}n−Φ_{fb}n | ADP · 按来源中的关系式整理 |
| [p3 · f16-003](chapters/PLL_第16章_ADPLL结构与数字PI.html#f16-003) | 正文或表格 | 若 TDC 的时间分辨率是 ΔtLSB，则它对应的相位分辨率为 ΔφLSB=2π·ΔtLSB/TDCO。DCO 越快、周期越短，同样的时间 LSB 对应越大的相位量化步进。 | ADP · 按来源中的关系式整理 |
| [p4 · f16-004](chapters/PLL_第16章_ADPLL结构与数字PI.html#f16-004) | 公式块 | In+1=In+K_{I}·en / un=K_{P}·en+In | ADP · 独立写出的离散 PI 教学模型；含当前拍索引约定 |
| [p5 · f16-005](chapters/PLL_第16章_ADPLL结构与数字PI.html#f16-005) | 公式块 | f_{DCO}≈f_{0}+K_{DCO}·u | ADP · 按来源中的关系式整理 |
| [p7 · f16-006](chapters/PLL_第16章_ADPLL结构与数字PI.html#f16-006) | 实验模型 | 一次只走一拍，PI 用哪一拍的误差？ | ADP · 本课程交互计算或 SPICE 基准 |

## 第 17 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p2 · f17-001](chapters/PLL_第17章_TDC_DTC与DCO校准.html#f17-001) | 正文或表格 | TDC 输入两条待比较的事件边沿，例如参考事件和反馈事件。用一组延迟单元或等效时间基准，把事件间隔量化为整数码。示例模型：q=round(Δt/LSB)，回读估计为 q×LSB。 | ADP · 本课程简化模型、估算或教学算例 |
| [p4 · f17-002](chapters/PLL_第17章_TDC_DTC与DCO校准.html#f17-002) | 正文或表格 | 常用局部模型：Δt(D)=t₀+KDTC·D。实际常伴随固定延迟、非线性、温度漂移和不同输入斜率下的响应差异。 | DTC · 本课程简化模型、估算或教学算例 |
| [p5 · f17-003](chapters/PLL_第17章_TDC_DTC与DCO校准.html#f17-003) | 正文或表格 | 假设参考周期 Tref=10 ns，DTC 的满量程设为一个参考周期，整数控制范围 0…255。将希望补偿的分数相位转为时间，再映射为码字；真正的设计须检查 DTC 是否覆盖所需范围。 | DTC · 本课程简化模型、估算或教学算例 |
| [p5 · f17-004](chapters/PLL_第17章_TDC_DTC与DCO校准.html#f17-004) | 正文或表格 | 演示码字 round(255α)，实际延迟=码字×(10 ns/255)×(1+增益误差)。这是简化的单极性满量程示例，不代表所有 DTC 拓扑或实际 ADPLL 的时序对齐策略。 | DTC · 本课程简化模型、估算或教学算例 |
| [p6 · f17-005](chapters/PLL_第17章_TDC_DTC与DCO校准.html#f17-005) | 正文或表格 | DCO 把数字字转换为频率。通常先靠粗调阵列（band/cap/current）覆盖工艺与温度，再靠细调阵列取得更小的频率步长；校准时可测得局部 KDCO=Δf/Δcode。 | ADP · 本课程简化模型、估算或教学算例 |
| [p7 · f17-006](chapters/PLL_第17章_TDC_DTC与DCO校准.html#f17-006) | 实验模型 | 用两点测量校准 DCO 增益 | ADP · 课程两点增益估计与数字 PI 对照 |

## 第 18 章

| 位置 | 形式 | 公式或内容 | 参考与口径 |
|---|---|---|---|
| [p2 · f18-001](chapters/PLL_第18章_完整系统设计与指标.html#f18-001) | 正文或表格 | 理想频率规划 fVCO=fREF×(N+α)、fOUT=fVCO/M，未考虑器件允许频段、分频架构和实际锁定误差。 | LMX · 锁定频率关系及本课程代入 |
| [p8 · f18-002](chapters/PLL_第18章_完整系统设计与指标.html#f18-002) | 实验模型 | 给同一组规格跑一次验收 | TIP · 教学规格、根方和噪声预算；参见第 9–13 章的对应模型 |
| [p8 · f18-003](chapters/PLL_第18章_完整系统设计与指标.html#f18-003) | 正文或表格 | 结果核对：VCO=4.025 GHz，输出=2.0125 GHz；环路需要维持对自由振荡误差的稳态控制量。若输入噪声或分频量化存在，则可能有残余相位误差及杂散。 | TIP · 本课程简化模型、估算或教学算例 |
