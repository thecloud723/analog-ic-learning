# PLL 现有公式来源逐项定位

基线为 2026-11-16 的 `main`。共 296 个已标注来源的位置，含独立公式、行内公式、例题及实验说明。部分位置有多个式子。表内保留现有来源链接，方便逐条迁移至具体图、公式、小节或本课程实验。只在 HTML 有可关联的公式文本时摘录公式，其他项按页签和原页 ID 定位。如果页面以页签控制显隐，先打开表中对应页签，再查锚点附近内容。未标注来源的行内公式仍需在改造时逐页补查。

[返回详细改造方案](JKU_PLL_REDESIGN.md)

### 01 [PLL用途与系统全景](../chapters/01_PLL用途与系统全景.html)（14 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f01-001](../chapters/01_PLL用途与系统全景.html#f01-001) | 基本 PLL 结构 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f01-002](../chapters/01_PLL用途与系统全景.html#f01-002) | 本章必须认识的四组公式 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f01-003](../chapters/01_PLL用途与系统全景.html#f01-003) | 本章必须认识的四组公式 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f01-004](../chapters/01_PLL用途与系统全景.html#f01-004) | 本章必须认识的四组公式 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f01-005](../chapters/01_PLL用途与系统全景.html#f01-005) | 本章必须认识的四组公式 | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f01-006](../chapters/01_PLL用途与系统全景.html#f01-006) | 两个完整的数字例题 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f01-007](../chapters/01_PLL用途与系统全景.html#f01-007) | 两个完整的数字例题 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f01-008](../chapters/01_PLL用途与系统全景.html#f01-008) | 两个完整的数字例题 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f01-009](../chapters/01_PLL用途与系统全景.html#f01-009) | 两个完整的数字例题 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f01-010](../chapters/01_PLL用途与系统全景.html#f01-010) | 两个完整的数字例题 | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f01-011](../chapters/01_PLL用途与系统全景.html#f01-011) | PLL 规格、设计参数与测量 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f01-012](../chapters/01_PLL用途与系统全景.html#f01-012) | PLL 规格、设计参数与测量 | 见原页锚点附近 | [ADI MT-008 · 相噪换算时间抖动](https://www.analog.com/media/en/training-seminars/tutorials/mt-008.pdf) |
| [f01-013](../chapters/01_PLL用途与系统全景.html#f01-013) | 相位换算实验：相同的时间差，在不同参考频率下代表多少相位？ | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f01-014](../chapters/01_PLL用途与系统全景.html#f01-014) | 本章理解核对 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |

### 02 [频率相位时间差与锁定](../chapters/02_频率相位时间差与锁定.html)（19 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f02-001](../chapters/02_频率相位时间差与锁定.html#f02-001) | 频率与相位 | `f(t)=\frac{1}{2\pi}\,\frac{\mathrm d\phi(t)}{\mathrm dt}` | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f02-002](../chapters/02_频率相位时间差与锁定.html#f02-002) | 频率与相位 | `\phi(t)=\phi(0)+2\pi\int_{0}^{t}f(\tau)\,\mathrm d\tau` | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f02-003](../chapters/02_频率相位时间差与锁定.html#f02-003) | 频率与相位 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f02-004](../chapters/02_频率相位时间差与锁定.html#f02-004) | 频率与相位 | `\begin{aligned}\Delta\phi&amp;=2\pi\,(100\,\mathrm{MHz})\,(35\,\mathrm{ns})\\&amp;=7\pi\,\mathrm{rad}=3.5\times2\pi\,\mathrm{rad}\end{aligned}` | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f02-005](../chapters/02_频率相位时间差与锁定.html#f02-005) | 参考相位与反馈相位 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f02-006](../chapters/02_频率相位时间差与锁定.html#f02-006) | 参考相位与反馈相位 | `\frac{\mathrm d e_{\phi}(t)}{\mathrm dt}=2\pi\bigl(f_{\mathrm{REF}}(t)-f_{\mathrm{FB}}(t)\bigr)` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f02-007](../chapters/02_频率相位时间差与锁定.html#f02-007) | 参考相位与反馈相位 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f02-008](../chapters/02_频率相位时间差与锁定.html#f02-008) | 边沿时间差与相位角 | `\Delta\phi\,(\mathrm{rad})=2\pi\frac{\Delta t}{T}=2\pi f\,\Delta t` | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f02-009](../chapters/02_频率相位时间差与锁定.html#f02-009) | 边沿时间差与相位角 | `\Delta\phi\,(\mathrm{deg})=360^\circ\frac{\Delta t}{T}` | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f02-010](../chapters/02_频率相位时间差与锁定.html#f02-010) | 边沿时间差与相位角 | `\Delta\mathrm{cycles}=\frac{\Delta t}{T_{\mathrm{REF}}}` | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f02-011](../chapters/02_频率相位时间差与锁定.html#f02-011) | 边沿时间差与相位角 | `\begin{aligned}\Delta n&amp;=\frac{40\,\mathrm{ps}}{10\,\mathrm{ns}}=0.004\,\mathrm{cycles}\\\Delta\phi&amp;=360^\circ\times0.004=1.44^\circ\\&amp;\approx0.02513\,\mathrm{rad}\end{aligned}` | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f02-012](../chapters/02_频率相位时间差与锁定.html#f02-012) | 边沿时间差与相位角 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f02-013](../chapters/02_频率相位时间差与锁定.html#f02-013) | XOR 鉴相器为何能反映相位差 | `D_{\mathrm{XOR}}=\frac{∣\Delta\phi∣}{\pi},\qquad0\leq∣\Delta\phi∣\leq\pi` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f02-014](../chapters/02_频率相位时间差与锁定.html#f02-014) | 频率偏差如何积累成相位偏移 | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f02-015](../chapters/02_频率相位时间差与锁定.html#f02-015) | 频率偏差如何积累成相位偏移 | `\epsilon_{\mathrm{ppm}}=\frac{f_{\mathrm{FB}}-f_{\mathrm{REF}}}{f_{\mathrm{REF}}}\times10^{6}` | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f02-016](../chapters/02_频率相位时间差与锁定.html#f02-016) | 频率偏差如何积累成相位偏移 | `e_{\phi}(t)=e_{\phi}(0)-2\pi(f_{\mathrm{FB}}-f_{\mathrm{REF}})\,t` | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f02-017](../chapters/02_频率相位时间差与锁定.html#f02-017) | 频率偏差如何积累成相位偏移 | `\Delta t_N=N\left(\frac{1}{f_{\mathrm{FB}}}-\frac{1}{f_{\mathrm{REF}}}\right)` | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f02-018](../chapters/02_频率相位时间差与锁定.html#f02-018) | 实验：预测频偏方向并观察累计相位 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f02-019](../chapters/02_频率相位时间差与锁定.html#f02-019) | 本章计算与判断 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |

### 03 [从开环到闭环](../chapters/03_从开环到闭环.html)（15 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f03-001](../chapters/03_从开环到闭环.html#f03-001) | 鉴频鉴相器的 UP/DOWN 脉冲 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f03-002](../chapters/03_从开环到闭环.html#f03-002) | UP/DOWN 如何改变控制电压 | `\Delta V_{\mathrm{ctrl}}=\frac{1}{C}\int_{t_0}^{t_1}I_{\mathrm{CP}}(t)\,\mathrm dt` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f03-003](../chapters/03_从开环到闭环.html#f03-003) | UP/DOWN 如何改变控制电压 | `\Delta V_{\mathrm{ctrl}}=\pm\frac{I_{\mathrm{CP}}\,t_{\mathrm{ON}}}{C}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f03-004](../chapters/03_从开环到闭环.html#f03-004) | UP/DOWN 如何改变控制电压 | `\begin{aligned}\Delta Q&amp;=I_{\mathrm{CP}}\,t_{\mathrm{ON}}=100\,\mathrm{\mu A}\times40\,\mathrm{ps}=4\,\mathrm{fC}\\[4pt]\Delta V&amp;=\frac{\Delta Q}{C}=\frac{4\,\mathrm{fC}}{20\,\mathrm{pF}}=0.2\,\mathrm{mV}\end{aligned}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f03-005](../chapters/03_从开环到闭环.html#f03-005) | UP/DOWN 如何改变控制电压 | 见原页锚点附近 | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f03-006](../chapters/03_从开环到闭环.html#f03-006) | 电压改变频率，频率改变相位 | `f_{\mathrm{VCO}}(t)=f_{\mathrm{free}}+K_{\mathrm{VCO}}\bigl[V_{\mathrm{ctrl}}(t)-V_{\mathrm{ref}}\bigr]` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f03-007](../chapters/03_从开环到闭环.html#f03-007) | 电压改变频率，频率改变相位 | `\phi_{\mathrm{VCO}}(t)=\phi_{\mathrm{VCO}}(0)+2\pi\int_{0}^{t}f_{\mathrm{VCO}}(\tau)\,\mathrm d\tau` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f03-008](../chapters/03_从开环到闭环.html#f03-008) | 电压改变频率，频率改变相位 | `\begin{aligned}\Delta f&amp;=K_{\mathrm{VCO}}\,\Delta V=100\,\frac{\mathrm{MHz}}{\mathrm V}\times20\,\mathrm{mV}=2\,\mathrm{MHz}\\[4pt]\Delta\phi&amp;=2\pi\Delta f\,\Delta t=4\pi\,\mathrm{rad}\end{aligned}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f03-009](../chapters/03_从开环到闭环.html#f03-009) | 实验：频率与相位误差如何收敛 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f03-010](../chapters/03_从开环到闭环.html#f03-010) | 实验：频率与相位误差如何收敛 | `e[k+1]=e[k]+1-\frac{f_{\mathrm{VCO}}[k]}{N\,f_{\mathrm{REF}}}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f03-011](../chapters/03_从开环到闭环.html#f03-011) | 实验：频率与相位误差如何收敛 | `\begin{aligned}s[k+1]&amp;=s[k]+e[k+1]\\f_{\mathrm{VCO}}[k]&amp;=f_{\mathrm{free}}+K_{\mathrm p}e[k]+K_{\mathrm i}s[k]\end{aligned}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f03-012](../chapters/03_从开环到闭环.html#f03-012) | 实验：频率与相位误差如何收敛 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f03-013](../chapters/03_从开环到闭环.html#f03-013) | Lock Time 必须绑定判定规则 | `t_{\mathrm{lock}}=t_{\mathrm{first\,sustained\,pass}}-t_{\mathrm{trigger}}` | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f03-014](../chapters/03_从开环到闭环.html#f03-014) | Lock Time 必须绑定判定规则 | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f03-015](../chapters/03_从开环到闭环.html#f03-015) | 综合核对：从偏差到锁定 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |

### 04 [PLL架构地图](../chapters/04_PLL架构地图.html)（8 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f04-001](../chapters/04_PLL架构地图.html#f04-001) | PLL 分类不能只用“模拟 / 数字” | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f04-002](../chapters/04_PLL架构地图.html#f04-002) | 线性相位检测与模拟环路 | `V_{\mathrm e}(s)=K_{\mathrm{PD}}\left[\phi_{\mathrm{REF}}(s)-\frac{\phi_{\mathrm{OUT}}(s)}{N}\right]` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f04-003](../chapters/04_PLL架构地图.html#f04-003) | 线性相位检测与模拟环路 | `\phi_{\mathrm{OUT}}(s)=\frac{K_{\mathrm{VCO}}}{s}\,H_{\mathrm{LP}}(s)\,V_{\mathrm e}(s)` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f04-004](../chapters/04_PLL架构地图.html#f04-004) | PFD + Charge Pump + 被动环路滤波器 | `\Delta V=\frac{I_{\mathrm{UP}}\,t_{\mathrm{UP}}-I_{\mathrm{DN}}\,t_{\mathrm{DN}}}{C}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f04-005](../chapters/04_PLL架构地图.html#f04-005) | All-Digital PLL 的相位域闭环 | `e[k]=\phi_{\mathrm{REF}}[k]-\phi_{\mathrm{CKV}}[k]` | [Staszewski / Balsara · All-Digital Frequency Synthesizer, Ch. 4](https://doi.org/10.1002/0470041951) |
| [f04-006](../chapters/04_PLL架构地图.html#f04-006) | All-Digital PLL 的相位域闭环 | `u[k]=K_{\mathrm p}\,e[k]+K_{\mathrm i}\sum_{m=0}^{k}e[m]` | [Staszewski / Balsara · All-Digital Frequency Synthesizer, Ch. 4](https://doi.org/10.1002/0470041951) |
| [f04-007](../chapters/04_PLL架构地图.html#f04-007) | 整数-N 与分数-N 是合成分辨率维度 | `f_{\mathrm{OUT}}=(N+\alpha)f_{\mathrm{PFD}},\qquad0\leq\alpha&lt;1` | [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |
| [f04-008](../chapters/04_PLL架构地图.html#f04-008) | 整数-N 与分数-N 是合成分辨率维度 | `\bar{N}=\frac{f_{\mathrm{OUT}}}{f_{\mathrm{PFD}}}=\frac{1.625\,\mathrm{GHz}}{100\,\mathrm{MHz}}=16.25` | [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |

### 05 [参考源与时钟输出链](../chapters/05_参考源与时钟输出链.html)（22 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f05-001](../chapters/05_参考源与时钟输出链.html#f05-001) | 完整的参考与输出链 | `f_{\mathrm{PD}}=\frac{f_{\mathrm{REF}}}{R},\quad f_{\mathrm{VCO}}=Nf_{\mathrm{PD}},\quad f_{\mathrm{CLK}}=\frac{f_{\mathrm{VCO}}}{D}` | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-002](../chapters/05_参考源与时钟输出链.html#f05-002) | 参考源及输入条件 | `\sigma_t\approx\frac{\sigma_v}{\left∣\mathrm dV/\mathrm dt\right∣_{V_\mathrm{th}}}` | [ADI · Random Noise Contribution to Timing Jitter](https://www.analog.com/en/resources/technical-articles/random-noise-contribution-to-timing-jitter8212theory-and-practice.html) |
| [f05-003](../chapters/05_参考源与时钟输出链.html#f05-003) | 参考源及输入条件 | 见原页锚点附近 | [ADI · Random Noise Contribution to Timing Jitter](https://www.analog.com/en/resources/technical-articles/random-noise-contribution-to-timing-jitter8212theory-and-practice.html) |
| [f05-004](../chapters/05_参考源与时钟输出链.html#f05-004) | 参考源及输入条件 | `\sigma_t\approx\frac{2\,\mathrm{mV}}{0.20\,\mathrm{V/ns}}=10\,\mathrm{ps}` | [ADI · Random Noise Contribution to Timing Jitter](https://www.analog.com/en/resources/technical-articles/random-noise-contribution-to-timing-jitter8212theory-and-practice.html) |
| [f05-005](../chapters/05_参考源与时钟输出链.html#f05-005) | 参考分频器 R | `f_{\mathrm{PD}}=\frac{f_{\mathrm{REF}}}{R},\qquad T_{\mathrm{PD}}=\frac{R}{f_{\mathrm{REF}}}` | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-006](../chapters/05_参考源与时钟输出链.html#f05-006) | 参考分频器 R | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-007](../chapters/05_参考源与时钟输出链.html#f05-007) | 参考分频器 R | `f_{\mathrm{PD}}=\frac{10\,\mathrm{MHz}}{50}=200\,\mathrm{kHz}` | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-008](../chapters/05_参考源与时钟输出链.html#f05-008) | 参考分频器 R | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-009](../chapters/05_参考源与时钟输出链.html#f05-009) | 反馈分频 N 与 Prescaler | `f_{\mathrm{VCO}}=N\,f_{\mathrm{PD}}=\frac{N}{R}f_{\mathrm{REF}}` | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-010](../chapters/05_参考源与时钟输出链.html#f05-010) | 反馈分频 N 与 Prescaler | `f_{\mathrm{VCO}}=P\,N\,f_{\mathrm{PD}}` | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-011](../chapters/05_参考源与时钟输出链.html#f05-011) | 反馈分频 N 与 Prescaler | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-012](../chapters/05_参考源与时钟输出链.html#f05-012) | 反馈分频 N 与 Prescaler | `f_{\mathrm{VCO}}=4\times400\times1\,\mathrm{MHz}=1.6\,\mathrm{GHz}` | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-013](../chapters/05_参考源与时钟输出链.html#f05-013) | 参考倍频与输出分频 | `f_{\mathrm{CLK},i}=\frac{f_{\mathrm{VCO}}}{D_i}` | [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |
| [f05-014](../chapters/05_参考源与时钟输出链.html#f05-014) | 分频与频率的计算例题 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-015](../chapters/05_参考源与时钟输出链.html#f05-015) | 分频与频率的计算例题 | `N=\frac{1.6\,\mathrm{GHz}}{100\,\mathrm{MHz}}=16,\quad D_1=2,\quad D_2=4` | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-016](../chapters/05_参考源与时钟输出链.html#f05-016) | 分频与频率的计算例题 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-017](../chapters/05_参考源与时钟输出链.html#f05-017) | 分频与频率的计算例题 | `N=\frac{1.6\,\mathrm{GHz}}{100\,\mathrm{MHz}/2}=32` | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-018](../chapters/05_参考源与时钟输出链.html#f05-018) | 分频与频率的计算例题 | `\Delta f_{\mathrm{VCO}}=f_{\mathrm{PD}}\quad\text{(整数 N 增加 1、其余不变)}` | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-019](../chapters/05_参考源与时钟输出链.html#f05-019) | 分频与频率的计算例题 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-020](../chapters/05_参考源与时钟输出链.html#f05-020) | 分频与频率的计算例题 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-021](../chapters/05_参考源与时钟输出链.html#f05-021) | 预测与验证：分频链实验 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |
| [f05-022](../chapters/05_参考源与时钟输出链.html#f05-022) | 预测与验证：分频链实验 | 见原页锚点附近 | [ADI MT-086 · PLL 基础与分频](https://www.analog.com/media/en/training-seminars/tutorials/mt-086.pdf) |

### 06 [PD_PFD相位与频率比较](../chapters/06_PD_PFD相位与频率比较.html)（21 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f06-001](../chapters/06_PD_PFD相位与频率比较.html#f06-001) | 相位检测器与鉴频器 | `\Delta\phi=2\pi\frac{\Delta t}{T_{\mathrm{PD}}}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-002](../chapters/06_PD_PFD相位与频率比较.html#f06-002) | 相位检测器与鉴频器 | `\Delta\phi=2\pi\frac{40\,\mathrm{ps}}{10\,\mathrm{ns}}=0.008\pi\,\mathrm{rad}=1.44^\circ` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-003](../chapters/06_PD_PFD相位与频率比较.html#f06-003) | 双 DFF PFD 门级电路 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-004](../chapters/06_PD_PFD相位与频率比较.html#f06-004) | 双 DFF PFD 门级电路 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-005](../chapters/06_PD_PFD相位与频率比较.html#f06-005) | UP / DOWN 时序及边沿顺序 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-006](../chapters/06_PD_PFD相位与频率比较.html#f06-006) | UP / DOWN 时序及边沿顺序 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-007](../chapters/06_PD_PFD相位与频率比较.html#f06-007) | UP / DOWN 时序及边沿顺序 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-008](../chapters/06_PD_PFD相位与频率比较.html#f06-008) | PFD 的鉴频作用 | `\frac{\mathrm d\Delta\phi(t)}{\mathrm dt}=2\pi\bigl(f_{\mathrm{REF}}-f_{\mathrm{FB}}\bigr)` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-009](../chapters/06_PD_PFD相位与频率比较.html#f06-009) | PFD 的鉴频作用 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-010](../chapters/06_PD_PFD相位与频率比较.html#f06-010) | PFD 的鉴频作用 | `100\times\frac{0.1\,\mathrm{MHz}}{100\,\mathrm{MHz}}\approx0.10\ \mathrm{cycle}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-011](../chapters/06_PD_PFD相位与频率比较.html#f06-011) | 复位延迟与死区 | `\left.\overline{I}_{\mathrm{CP}}\right∣_{\Delta t=0}\approx\frac{I_{\mathrm{UP}}-I_{\mathrm{DN}}}{T_{\mathrm{PD}}}\,t_{\mathrm{RST}}` | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f06-012](../chapters/06_PD_PFD相位与频率比较.html#f06-012) | 复位延迟与死区 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f06-013](../chapters/06_PD_PFD相位与频率比较.html#f06-013) | 复位延迟与死区 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f06-014](../chapters/06_PD_PFD相位与频率比较.html#f06-014) | PFD–CP 的平均增益 | `\overline{I}_{\mathrm{CP}}=I_{\mathrm{CP}}\frac{t_{\mathrm{UP}}-t_{\mathrm{DN}}}{T_{\mathrm{PD}}}=\frac{I_{\mathrm{CP}}}{2\pi}\Delta\phi` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-015](../chapters/06_PD_PFD相位与频率比较.html#f06-015) | PFD–CP 的平均增益 | `K_{\mathrm{PD}}=\frac{\partial\overline{I}_{\mathrm{CP}}}{\partial\Delta\phi}=\frac{I_{\mathrm{CP}}}{2\pi}\quad[\mathrm{A/rad}]` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-016](../chapters/06_PD_PFD相位与频率比较.html#f06-016) | PFD–CP 的平均增益 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-017](../chapters/06_PD_PFD相位与频率比较.html#f06-017) | PFD–CP 的平均增益 | `\overline I_{\mathrm{CP}}=100\,\mathrm{\mu A}\times\frac{40\,\mathrm{ps}}{10\,\mathrm{ns}}=0.40\,\mathrm{\mu A}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f06-018](../chapters/06_PD_PFD相位与频率比较.html#f06-018) | PFD 的指标与测量 | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f06-019](../chapters/06_PD_PFD相位与频率比较.html#f06-019) | PFD 的指标与测量 | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f06-020](../chapters/06_PD_PFD相位与频率比较.html#f06-020) | PFD 的指标与测量 | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f06-021](../chapters/06_PD_PFD相位与频率比较.html#f06-021) | 理解核对与资料 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |

### 07 [Charge_Pump与Loop_Filter](../chapters/07_Charge_Pump与Loop_Filter.html)（19 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f07-001](../chapters/07_Charge_Pump与Loop_Filter.html#f07-001) | 电荷积分与电压变化 | `i_C(t)=C\frac{\mathrm d v_C(t)}{\mathrm dt}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f07-002](../chapters/07_Charge_Pump与Loop_Filter.html#f07-002) | 电荷积分与电压变化 | `Q(t_1,t_2)=\int_{t_1}^{t_2}i_C(t)\,\mathrm dt,\qquad \Delta V_C=\frac{Q}{C}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f07-003](../chapters/07_Charge_Pump与Loop_Filter.html#f07-003) | 电荷积分与电压变化 | `\Delta V_C=\frac{I_{\mathrm{CP}}\,t_{\mathrm{ON}}}{C}\quad\text{(恒流脉冲，理想电容)}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f07-004](../chapters/07_Charge_Pump与Loop_Filter.html#f07-004) | 电荷积分与电压变化 | `\Delta V_C=\frac{50\,\mathrm{\mu A}\times1\,\mathrm{ns}}{100\,\mathrm{pF}}=0.5\,\mathrm{mV}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f07-005](../chapters/07_Charge_Pump与Loop_Filter.html#f07-005) | 被动 RC 滤波器及零点 | 见原页锚点附近 | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f07-006](../chapters/07_Charge_Pump与Loop_Filter.html#f07-006) | 被动 RC 滤波器及零点 | `Z_1(s)=R_1+\frac{1}{sC_1}=\frac{1+sR_1C_1}{sC_1}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f07-007](../chapters/07_Charge_Pump与Loop_Filter.html#f07-007) | 被动 RC 滤波器及零点 | `\omega_z=\frac{1}{R_1C_1},\qquad f_z=\frac{1}{2\pi R_1C_1}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f07-008](../chapters/07_Charge_Pump与Loop_Filter.html#f07-008) | 被动 RC 滤波器及零点 | 见原页锚点附近 | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f07-009](../chapters/07_Charge_Pump与Loop_Filter.html#f07-009) | 被动 RC 滤波器及零点 | `f_z=\frac{1}{2\pi\times10\,\mathrm{k\Omega}\times100\,\mathrm{pF}}\approx159\,\mathrm{kHz}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f07-010](../chapters/07_Charge_Pump与Loop_Filter.html#f07-010) | 加入 C2 后的极点与纹波 | `Z(s)=\left(R_1+\frac{1}{sC_1}\right)\parallel\frac{1}{sC_2}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f07-011](../chapters/07_Charge_Pump与Loop_Filter.html#f07-011) | 加入 C2 后的极点与纹波 | `Z(s)=\frac{1+sR_1C_1}{s(C_1+C_2)+s^2 R_1C_1C_2}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f07-012](../chapters/07_Charge_Pump与Loop_Filter.html#f07-012) | 加入 C2 后的极点与纹波 | `\omega_z=\frac{1}{R_1C_1},\qquad\omega_{p2}=\frac{C_1+C_2}{R_1C_1C_2}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f07-013](../chapters/07_Charge_Pump与Loop_Filter.html#f07-013) | CP–PFD 增益与 Type-II 概念 | `K_{\mathrm{PD}}=\frac{I_{\mathrm{CP}}}{2\pi}\quad [\mathrm{A/rad}]` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f07-014](../chapters/07_Charge_Pump与Loop_Filter.html#f07-014) | CP–PFD 增益与 Type-II 概念 | `V_{\mathrm{CTRL}}(s)=K_{\mathrm{PD}}\,Z(s)\,\Delta\Phi(s)` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f07-015](../chapters/07_Charge_Pump与Loop_Filter.html#f07-015) | CP–PFD 增益与 Type-II 概念 | `\Phi_{\mathrm{VCO}}(s)=\frac{K_{\mathrm{VCO}}}{s}V_{\mathrm{CTRL}}(s)` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f07-016](../chapters/07_Charge_Pump与Loop_Filter.html#f07-016) | CP–PFD 增益与 Type-II 概念 | `L(s)=\frac{K_{\mathrm{PD}}K_{\mathrm{VCO}}}{N\,s}\,Z(s)` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f07-017](../chapters/07_Charge_Pump与Loop_Filter.html#f07-017) | 电流失配、泄漏与 Spur | 见原页锚点附近 | [本课程 · 第 7 章 SPICE 网表与脚本](../assets/cp-ripple-lab.zip) |
| [f07-018](../chapters/07_Charge_Pump与Loop_Filter.html#f07-018) | 电流失配、泄漏与 Spur | `Q_{\mathrm{net}}=I_{\mathrm{UP}}t_{\mathrm{UP}}-I_{\mathrm{DN}}t_{\mathrm{DN}}-I_{\mathrm{leak}}T_{\mathrm{PD}}` | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f07-019](../chapters/07_Charge_Pump与Loop_Filter.html#f07-019) | 预测实验：电荷泵和环路滤波 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |

### 08 [VCO与DCO可控振荡器](../chapters/08_VCO与DCO可控振荡器.html)（25 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f08-001](../chapters/08_VCO与DCO可控振荡器.html#f08-001) | 振荡器在锁相环中的作用 | `f_{\mathrm{out}}(t)=f_{\mathrm{free}}+K_f\bigl[V_{\mathrm{ctrl}}(t)-V_{\mathrm{bias}}\bigr]` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-002](../chapters/08_VCO与DCO可控振荡器.html#f08-002) | 振荡器在锁相环中的作用 | `\phi_{\mathrm{out}}(t)=\phi_{\mathrm{out}}(0)+2\pi\int_0^t f_{\mathrm{out}}(\tau)\,\mathrm d\tau` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-003](../chapters/08_VCO与DCO可控振荡器.html#f08-003) | LC 谐振腔、损耗与负阻 | 见原页锚点附近 | [本课程 · 第 8 章 SPICE 网表与脚本](../assets/lc-vco-lab.zip) |
| [f08-004](../chapters/08_VCO与DCO可控振荡器.html#f08-004) | LC 谐振腔、损耗与负阻 | `f_0=\frac{1}{2\pi\sqrt{LC}}` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-005](../chapters/08_VCO与DCO可控振荡器.html#f08-005) | LC 谐振腔、损耗与负阻 | `Q=2\pi\frac{E_{\mathrm{stored}}}{E_{\mathrm{lost/cycle}}},\qquad Q_{\mathrm{parallel}}\approx\omega_0 C R_p` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-006](../chapters/08_VCO与DCO可控振荡器.html#f08-006) | LC 谐振腔、损耗与负阻 | `\frac{\partial f_0}{\partial C}=-\frac{f_0}{2C}` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-007](../chapters/08_VCO与DCO可控振荡器.html#f08-007) | LC 谐振腔、损耗与负阻 | 见原页锚点附近 | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-008](../chapters/08_VCO与DCO可控振荡器.html#f08-008) | LC 谐振腔、损耗与负阻 | `f_0=\frac{1}{2\pi\sqrt{(1\,\mathrm{nH})(1\,\mathrm{pF})}}\approx5.03\,\mathrm{GHz}` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-009](../chapters/08_VCO与DCO可控振荡器.html#f08-009) | Ring Oscillator：延迟决定频率 | 见原页锚点附近 | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-010](../chapters/08_VCO与DCO可控振荡器.html#f08-010) | Ring Oscillator：延迟决定频率 | `f_{\mathrm{ring}}\approx\frac{1}{2Mt_d}` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-011](../chapters/08_VCO与DCO可控振荡器.html#f08-011) | Ring Oscillator：延迟决定频率 | `f_{\mathrm{ring}}\approx\frac{1}{2\times3\times20\,\mathrm{ps}}\approx8.33\,\mathrm{GHz}` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-012](../chapters/08_VCO与DCO可控振荡器.html#f08-012) | VCO 增益与调谐范围 | `K_f(V)=\frac{\mathrm df_{\mathrm{VCO}}}{\mathrm dV_{\mathrm{ctrl}}}\quad[\mathrm{Hz/V}]` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-013](../chapters/08_VCO与DCO可控振荡器.html#f08-013) | VCO 增益与调谐范围 | `K_{\mathrm{VCO}}(V)=2\pi K_f(V)\quad[\mathrm{rad/(s\cdot V)}]` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-014](../chapters/08_VCO与DCO可控振荡器.html#f08-014) | VCO 增益与调谐范围 | `\Delta f_{\mathrm{VCO}}\approx K_f\,\Delta V_{\mathrm{ctrl}}` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-015](../chapters/08_VCO与DCO可控振荡器.html#f08-015) | VCO 增益与调谐范围 | 见原页锚点附近 | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-016](../chapters/08_VCO与DCO可控振荡器.html#f08-016) | VCO 增益与调谐范围 | `\Delta f\approx(400\,\mathrm{MHz/V})(0.02\,\mathrm V)=8\,\mathrm{MHz}` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-017](../chapters/08_VCO与DCO可控振荡器.html#f08-017) | DCO 控制码与电容阵列 | `C_{\mathrm{total}}(D)=C_0+\sum_{i=0}^{m-1}b_i C_i,\qquad b_i\in\{0,1\}` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-018](../chapters/08_VCO与DCO可控振荡器.html#f08-018) | DCO 控制码与电容阵列 | `f(D)=\frac{1}{2\pi\sqrt{L\,C_{\mathrm{total}}(D)}}` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-019](../chapters/08_VCO与DCO可控振荡器.html#f08-019) | DCO 控制码与电容阵列 | `K_{\mathrm{DCO}}(D)=f(D+1)-f(D)\quad[\mathrm{Hz/LSB}]` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-020](../chapters/08_VCO与DCO可控振荡器.html#f08-020) | DCO 控制码与电容阵列 | 见原页锚点附近 | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-021](../chapters/08_VCO与DCO可控振荡器.html#f08-021) | DCO 控制码与电容阵列 | `f(0)\approx5.0329\,\mathrm{GHz},\quad f(1)\approx4.9833\,\mathrm{GHz}` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-022](../chapters/08_VCO与DCO可控振荡器.html#f08-022) | DCO 控制码与电容阵列 | 见原页锚点附近 | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-023](../chapters/08_VCO与DCO可控振荡器.html#f08-023) | 噪声、PVT 与测量方法 | `\Delta f\approx K_f\,\Delta V_{\mathrm{ctrl}},\qquad \Delta\phi(t)=2\pi\int_0^t\Delta f(\tau)\,\mathrm d\tau` | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-024](../chapters/08_VCO与DCO可控振荡器.html#f08-024) | 预测实验：改变电容 Bank | 见原页锚点附近 | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f08-025](../chapters/08_VCO与DCO可控振荡器.html#f08-025) | 预测实验：改变电容 Bank | 见原页锚点附近 | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |

### 09 [完整CP_PLL动态](../chapters/09_完整CP_PLL动态.html)（29 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f09-001](../chapters/09_完整CP_PLL动态.html#f09-001) | 完整 CP-PLL 电路与信号流 | `e_{\phi}(t)=\phi_{\mathrm{REF}}(t)-\frac{\phi_{\mathrm{VCO}}(t)}{N}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-002](../chapters/09_完整CP_PLL动态.html#f09-002) | 完整 CP-PLL 电路与信号流 | `f_{\mathrm{VCO}}(t)=f_{\mathrm{base}}+K_f\bigl[V_{\mathrm{ctrl}}(t)-V_{\mathrm{base}}\bigr]` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-003](../chapters/09_完整CP_PLL动态.html#f09-003) | PFD 脉冲与平均电流 | `\Delta\phi=2\pi\frac{\Delta t}{T_{\mathrm{REF}}}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-004](../chapters/09_完整CP_PLL动态.html#f09-004) | PFD 脉冲与平均电流 | `\overline{i}_{\mathrm{CP}}=I_{\mathrm{CP}}\frac{\Delta t}{T_{\mathrm{REF}}}=\frac{I_{\mathrm{CP}}}{2\pi}\Delta\phi` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-005](../chapters/09_完整CP_PLL动态.html#f09-005) | PFD 脉冲与平均电流 | `K_{\phi}=\frac{I_{\mathrm{CP}}}{2\pi}\quad[\mathrm{A/rad}]` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-006](../chapters/09_完整CP_PLL动态.html#f09-006) | PFD 脉冲与平均电流 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-007](../chapters/09_完整CP_PLL动态.html#f09-007) | PFD 脉冲与平均电流 | `\overline{i}_{\mathrm{CP}}=50\,\mathrm{\mu A}\,\frac{100\,\mathrm{ps}}{10\,\mathrm{ns}}=0.50\,\mathrm{\mu A}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-008](../chapters/09_完整CP_PLL动态.html#f09-008) | 滤波器电容为什么保存控制状态 | `V_C(t)=V_C(0)+\frac{1}{C}\int_0^t i_{\mathrm{CP}}(\tau)\,\mathrm d\tau` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f09-009](../chapters/09_完整CP_PLL动态.html#f09-009) | 滤波器电容为什么保存控制状态 | `V_{\mathrm{ctrl}}(t)=V_C(t)+R\,i_{\mathrm{CP}}(t)\quad\text{(平均模型)}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f09-010](../chapters/09_完整CP_PLL动态.html#f09-010) | 滤波器电容为什么保存控制状态 | `\left.\frac{\mathrm dV_C}{\mathrm dt}\right∣_{i_{\mathrm{CP}}=0}=0\quad\text{(理想、无泄漏)}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f09-011](../chapters/09_完整CP_PLL动态.html#f09-011) | 滤波器电容为什么保存控制状态 | 见原页锚点附近 | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f09-012](../chapters/09_完整CP_PLL动态.html#f09-012) | 滤波器电容为什么保存控制状态 | `Q=CV=(20\,\mathrm{pF})(0.60\,\mathrm V)=12\,\mathrm{pC}` | [OpenStax《University Physics》Vol. 2 · §15.2](https://openstax.org/books/university-physics-volume-2/pages/15-2-simple-ac-circuits) |
| [f09-013](../chapters/09_完整CP_PLL动态.html#f09-013) | 从振荡频率到反馈相位 | `\frac{\mathrm d\phi_{\mathrm{FB}}}{\mathrm dt}=2\pi\frac{f_{\mathrm{VCO}}}{N}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-014](../chapters/09_完整CP_PLL动态.html#f09-014) | 从振荡频率到反馈相位 | `\frac{\mathrm d e_\phi}{\mathrm dt}=2\pi\left(f_{\mathrm{REF}}-\frac{f_{\mathrm{VCO}}}{N}\right)` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-015](../chapters/09_完整CP_PLL动态.html#f09-015) | 从振荡频率到反馈相位 | `\Delta e_{\phi}[k]\approx2\pi\left(1-\frac{f_{\mathrm{VCO}}[k]}{N f_{\mathrm{REF}}}\right)` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-016](../chapters/09_完整CP_PLL动态.html#f09-016) | 从振荡频率到反馈相位 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-017](../chapters/09_完整CP_PLL动态.html#f09-017) | 从振荡频率到反馈相位 | `\Delta e_{\phi}=2\pi\left(1-\frac{1.56\,\mathrm{GHz}}{16\times100\,\mathrm{MHz}}\right)=0.05\pi\,\mathrm{rad}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-018](../chapters/09_完整CP_PLL动态.html#f09-018) | 闭环定量模型与初始条件 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-019](../chapters/09_完整CP_PLL动态.html#f09-019) | 闭环定量模型与初始条件 | `V_{\mathrm{target}}=V_{\mathrm{base}}+\frac{Nf_{\mathrm{REF}}-f_{\mathrm{base}}}{K_f}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-020](../chapters/09_完整CP_PLL动态.html#f09-020) | 闭环定量模型与初始条件 | `V_{\mathrm{target}}=0.50\,\mathrm V+\frac{1.600-1.560\,\mathrm{GHz}}{0.400\,\mathrm{GHz/V}}=0.60\,\mathrm V` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-021](../chapters/09_完整CP_PLL动态.html#f09-021) | 闭环定量模型与初始条件 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-022](../chapters/09_完整CP_PLL动态.html#f09-022) | 闭环定量模型与初始条件 | `\bar i[k]=I_{\mathrm{CP}}e[k],\qquad V_{\mathrm{ctrl}}[k]=V_C[k]+R\bar i[k]` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-023](../chapters/09_完整CP_PLL动态.html#f09-023) | 闭环定量模型与初始条件 | `V_C[k+1]=V_C[k]+\frac{T_{\mathrm{REF}}}{C}\bar i[k]` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-024](../chapters/09_完整CP_PLL动态.html#f09-024) | 闭环定量模型与初始条件 | `e[k+1]=e[k]+1-\frac{f_{\mathrm{VCO}}[k]}{Nf_{\mathrm{REF}}}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-025](../chapters/09_完整CP_PLL动态.html#f09-025) | 稳态、纹波和锁定判据 | `\lim_{t\to\infty}\left(f_{\mathrm{REF}}-\frac{f_{\mathrm{VCO}}}{N}\right)=0` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-026](../chapters/09_完整CP_PLL动态.html#f09-026) | 稳态、纹波和锁定判据 | `\overline{i}_{\mathrm{CP}}\to0,\qquad V_C\to V_{\mathrm{target}}\quad\text{(理想无泄漏模型)}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-027](../chapters/09_完整CP_PLL动态.html#f09-027) | 预测实验：逐周期观察完整闭环 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-028](../chapters/09_完整CP_PLL动态.html#f09-028) | 预测实验：逐周期观察完整闭环 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f09-029](../chapters/09_完整CP_PLL动态.html#f09-029) | 预测实验：逐周期观察完整闭环 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |

### 10 [相位域模型与Type_I_II](../chapters/10_相位域模型与Type_I_II.html)（29 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f10-001](../chapters/10_相位域模型与Type_I_II.html#f10-001) | 从实际 PLL 到相位域 | `e_\phi(s)=\phi_{\mathrm{ref}}(s)-\frac{\phi_{\mathrm{out}}(s)}{N}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-002](../chapters/10_相位域模型与Type_I_II.html#f10-002) | 从实际 PLL 到相位域 | `\phi_{\mathrm{out}}(s)=\frac{K_\omega}{s}\,Z(s)K_\phi e_\phi(s)` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-003](../chapters/10_相位域模型与Type_I_II.html#f10-003) | 从实际 PLL 到相位域 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-004](../chapters/10_相位域模型与Type_I_II.html#f10-004) | 从实际 PLL 到相位域 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-005](../chapters/10_相位域模型与Type_I_II.html#f10-005) | 从实际 PLL 到相位域 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-006](../chapters/10_相位域模型与Type_I_II.html#f10-006) | VCO 中的 1/s 从哪里来 | `\Delta\omega_{\mathrm{VCO}}(t)=K_\omega\Delta V_{\mathrm{ctrl}}(t)` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-007](../chapters/10_相位域模型与Type_I_II.html#f10-007) | VCO 中的 1/s 从哪里来 | `\Delta\phi_{\mathrm{out}}(t)=\int_0^t\Delta\omega_{\mathrm{VCO}}(\tau)\,\mathrm d\tau` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-008](../chapters/10_相位域模型与Type_I_II.html#f10-008) | VCO 中的 1/s 从哪里来 | `\frac{\Delta\phi_{\mathrm{out}}(s)}{\Delta V_{\mathrm{ctrl}}(s)}=\frac{K_\omega}{s}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-009](../chapters/10_相位域模型与Type_I_II.html#f10-009) | VCO 中的 1/s 从哪里来 | `\Delta\phi=2\pi\Delta f\,\Delta t=2\pi(10^3)(10^{-3})=2\pi\,\mathrm{rad}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-010](../chapters/10_相位域模型与Type_I_II.html#f10-010) | Type-I：只有一个原点积分器 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-011](../chapters/10_相位域模型与Type_I_II.html#f10-011) | Type-I：只有一个原点积分器 | `L_{\mathrm I}(s)=\frac{K_{\mathrm{PD}}K_\omega}{N}\frac{H_{\mathrm{LP}}(s)}{s}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-012](../chapters/10_相位域模型与Type_I_II.html#f10-012) | Type-I：只有一个原点积分器 | `H_{\mathrm{LP}}(s)=\frac{1}{1+s\tau}\quad\Longrightarrow\quad L_{\mathrm I}(s)\propto\frac{1}{s}\quad(s\to0)` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-013](../chapters/10_相位域模型与Type_I_II.html#f10-013) | CP-PLL：Loop Filter 的额外积分器 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-014](../chapters/10_相位域模型与Type_I_II.html#f10-014) | CP-PLL：Loop Filter 的额外积分器 | `Z(s)=R+\frac{1}{sC}=\frac{1+sRC}{sC}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-015](../chapters/10_相位域模型与Type_I_II.html#f10-015) | CP-PLL：Loop Filter 的额外积分器 | `L_{\mathrm{II}}(s)=\frac{K_\phi K_\omega}{N}\frac{1+sRC}{s^2C}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-016](../chapters/10_相位域模型与Type_I_II.html#f10-016) | 闭环传递函数的推导 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-017](../chapters/10_相位域模型与Type_I_II.html#f10-017) | 闭环传递函数的推导 | `\phi_{\mathrm{out}}(s)=N L(s)\left[\phi_{\mathrm{ref}}(s)-\frac{\phi_{\mathrm{out}}(s)}{N}\right]` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-018](../chapters/10_相位域模型与Type_I_II.html#f10-018) | 闭环传递函数的推导 | `\frac{\phi_{\mathrm{out}}(s)}{\phi_{\mathrm{ref}}(s)}=\frac{N L(s)}{1+L(s)}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-019](../chapters/10_相位域模型与Type_I_II.html#f10-019) | 闭环传递函数的推导 | `\frac{e_\phi(s)}{\phi_{\mathrm{ref}}(s)}=\frac{1}{1+L(s)}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-020](../chapters/10_相位域模型与Type_I_II.html#f10-020) | 闭环传递函数的推导 | `H_{\mathrm{VCO}}(s)=\frac{1}{1+L(s)}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-021](../chapters/10_相位域模型与Type_I_II.html#f10-021) | 自然频率、阻尼、Type 与 Order | `\omega_n^2=\frac{K_\phi K_\omega}{NC},\qquad 2\zeta\omega_n=\frac{K_\phi K_\omega R}{N}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-022](../chapters/10_相位域模型与Type_I_II.html#f10-022) | 自然频率、阻尼、Type 与 Order | `\omega_n=\sqrt{\frac{I_{\mathrm{CP}}K_f}{NC}},\qquad \zeta=\frac{R}{2}\sqrt{\frac{I_{\mathrm{CP}}K_f C}{N}}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-023](../chapters/10_相位域模型与Type_I_II.html#f10-023) | 自然频率、阻尼、Type 与 Order | `H(s)=N\frac{2\zeta\omega_n s+\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-024](../chapters/10_相位域模型与Type_I_II.html#f10-024) | 自然频率、阻尼、Type 与 Order | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-025](../chapters/10_相位域模型与Type_I_II.html#f10-025) | 自然频率、阻尼、Type 与 Order | `\omega_n\approx7.91\times10^6\,\mathrm{rad/s},\quad f_n=\frac{\omega_n}{2\pi}\approx1.26\,\mathrm{MHz},\quad\zeta\approx0.791` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-026](../chapters/10_相位域模型与Type_I_II.html#f10-026) | 预测实验：Bode 图和相位裕量 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-027](../chapters/10_相位域模型与Type_I_II.html#f10-027) | 预测实验：Bode 图和相位裕量 | `∣L(j\omega)∣=\frac{K_\phi K_\omega}{NC}\frac{\sqrt{1+(\omega RC)^2}}{\omega^2}` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-028](../chapters/10_相位域模型与Type_I_II.html#f10-028) | 预测实验：Bode 图和相位裕量 | `\angle L(j\omega)=-180^\circ+\tan^{-1}(\omega RC)` | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f10-029](../chapters/10_相位域模型与Type_I_II.html#f10-029) | 预测实验：Bode 图和相位裕量 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |

### 11 [瞬态响应稳定性与锁定时间](../chapters/11_瞬态响应稳定性与锁定时间.html)（20 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f11-001](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-001) | 瞬态响应的对象与输入条件 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f11-002](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-002) | 瞬态响应的对象与输入条件 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f11-003](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-003) | 瞬态响应的对象与输入条件 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f11-004](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-004) | 二阶系统的阶跃响应 | 见原页锚点附近 | [University of Michigan CTMS · Second-Order Systems](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=SystemAnalysis) |
| [f11-005](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-005) | 二阶系统的阶跃响应 | 见原页锚点附近 | [University of Michigan CTMS · Second-Order Systems](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=SystemAnalysis) |
| [f11-006](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-006) | 二阶系统的阶跃响应 | 见原页锚点附近 | [University of Michigan CTMS · Second-Order Systems](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=SystemAnalysis) |
| [f11-007](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-007) | 二阶系统的阶跃响应 | 见原页锚点附近 | [University of Michigan CTMS · Second-Order Systems](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=SystemAnalysis) |
| [f11-008](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-008) | 二阶系统的阶跃响应 | 见原页锚点附近 | [University of Michigan CTMS · Second-Order Systems](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=SystemAnalysis) |
| [f11-009](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-009) | 二阶系统的阶跃响应 | 见原页锚点附近 | [University of Michigan CTMS · Second-Order Systems](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=SystemAnalysis) |
| [f11-010](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-010) | 二阶系统的阶跃响应 | 见原页锚点附近 | [University of Michigan CTMS · Second-Order Systems](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=SystemAnalysis) |
| [f11-011](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-011) | 相位裕量、阻尼与振铃 | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f11-012](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-012) | 相位裕量、阻尼与振铃 | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f11-013](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-013) | 相位裕量、阻尼与振铃 | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f11-014](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-014) | 环路带宽与收敛速度 | 见原页锚点附近 | [University of Michigan CTMS · Second-Order Systems](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=SystemAnalysis) |
| [f11-015](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-015) | 环路带宽与收敛速度 | 见原页锚点附近 | [University of Michigan CTMS · Second-Order Systems](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=SystemAnalysis) |
| [f11-016](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-016) | 环路带宽与收敛速度 | 见原页锚点附近 | [University of Michigan CTMS · Second-Order Systems](https://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=SystemAnalysis) |
| [f11-017](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-017) | Lock Time 的定义与测量 | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f11-018](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-018) | 大信号过程与 Cycle Slip | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f11-019](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-019) | 瞬态响应实验与测试判据 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f11-020](../chapters/11_瞬态响应稳定性与锁定时间.html#f11-020) | 瞬态响应实验与测试判据 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |

### 12 [Phase_Noise与Jitter](../chapters/12_Phase_Noise与Jitter.html)（21 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f12-001](../chapters/12_Phase_Noise与Jitter.html#f12-001) | 相位噪声与时间抖动的信号模型 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f12-002](../chapters/12_Phase_Noise与Jitter.html#f12-002) | 相位噪声与时间抖动的信号模型 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f12-003](../chapters/12_Phase_Noise与Jitter.html#f12-003) | 相位噪声与时间抖动的信号模型 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f12-004](../chapters/12_Phase_Noise与Jitter.html#f12-004) | 相位噪声与时间抖动的信号模型 | 见原页锚点附近 | [ADI MT-008 · 相噪换算时间抖动](https://www.analog.com/media/en/training-seminars/tutorials/mt-008.pdf) |
| [f12-005](../chapters/12_Phase_Noise与Jitter.html#f12-005) | 单边带相位噪声 L(Δf) | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f12-006](../chapters/12_Phase_Noise与Jitter.html#f12-006) | 单边带相位噪声 L(Δf) | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f12-007](../chapters/12_Phase_Noise与Jitter.html#f12-007) | 单边带相位噪声 L(Δf) | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f12-008](../chapters/12_Phase_Noise与Jitter.html#f12-008) | 振荡器噪声与 Leeson 模型 | 见原页锚点附近 | [Leeson（1966）· 振荡器噪声模型](https://doi.org/10.1109/PROC.1966.4682) |
| [f12-009](../chapters/12_Phase_Noise与Jitter.html#f12-009) | 振荡器噪声与 Leeson 模型 | 见原页锚点附近 | [Leeson（1966）· 振荡器噪声模型](https://doi.org/10.1109/PROC.1966.4682) |
| [f12-010](../chapters/12_Phase_Noise与Jitter.html#f12-010) | PLL 的噪声传递函数 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f12-011](../chapters/12_Phase_Noise与Jitter.html#f12-011) | PLL 的噪声传递函数 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f12-012](../chapters/12_Phase_Noise与Jitter.html#f12-012) | PLL 的噪声传递函数 | 见原页锚点附近 | [JKU《RFIC》· Phase-Locked Loops](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html) |
| [f12-013](../chapters/12_Phase_Noise与Jitter.html#f12-013) | 积分相位噪声与 RMS Jitter | 见原页锚点附近 | [ADI MT-008 · 相噪换算时间抖动](https://www.analog.com/media/en/training-seminars/tutorials/mt-008.pdf) |
| [f12-014](../chapters/12_Phase_Noise与Jitter.html#f12-014) | 积分相位噪声与 RMS Jitter | 见原页锚点附近 | [ADI MT-008 · 相噪换算时间抖动](https://www.analog.com/media/en/training-seminars/tutorials/mt-008.pdf) |
| [f12-015](../chapters/12_Phase_Noise与Jitter.html#f12-015) | 积分相位噪声与 RMS Jitter | 见原页锚点附近 | [ADI MT-008 · 相噪换算时间抖动](https://www.analog.com/media/en/training-seminars/tutorials/mt-008.pdf) |
| [f12-016](../chapters/12_Phase_Noise与Jitter.html#f12-016) | 积分相位噪声与 RMS Jitter | 见原页锚点附近 | [ADI MT-008 · 相噪换算时间抖动](https://www.analog.com/media/en/training-seminars/tutorials/mt-008.pdf) |
| [f12-017](../chapters/12_Phase_Noise与Jitter.html#f12-017) | 积分相位噪声与 RMS Jitter | 见原页锚点附近 | [ADI MT-008 · 相噪换算时间抖动](https://www.analog.com/media/en/training-seminars/tutorials/mt-008.pdf) |
| [f12-018](../chapters/12_Phase_Noise与Jitter.html#f12-018) | Jitter 的不同定义 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f12-019](../chapters/12_Phase_Noise与Jitter.html#f12-019) | Jitter 的不同定义 | 见原页锚点附近 | [ADI AN-1067 · 相位噪声与抖动 PSD](https://www.analog.com/en/resources/app-notes/an-1067.html) |
| [f12-020](../chapters/12_Phase_Noise与Jitter.html#f12-020) | 相噪积分与环路带宽实验 | 见原页锚点附近 | [ADI MT-008 · 相噪换算时间抖动](https://www.analog.com/media/en/training-seminars/tutorials/mt-008.pdf) |
| [f12-021](../chapters/12_Phase_Noise与Jitter.html#f12-021) | 相噪积分与环路带宽实验 | 见原页锚点附近 | [ADI MT-008 · 相噪换算时间抖动](https://www.analog.com/media/en/training-seminars/tutorials/mt-008.pdf) |

### 13 [Spur非线性与PVT](../chapters/13_Spur非线性与PVT.html)（17 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f13-001](../chapters/13_Spur非线性与PVT.html#f13-001) | 随机噪声与离散 Spur | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-002](../chapters/13_Spur非线性与PVT.html#f13-002) | Reference Spur 的周期性激励 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-003](../chapters/13_Spur非线性与PVT.html#f13-003) | CP 失配、漏电与馈通 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-004](../chapters/13_Spur非线性与PVT.html#f13-004) | CP 失配、漏电与馈通 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-005](../chapters/13_Spur非线性与PVT.html#f13-005) | 调谐纹波到 FM 边带的换算 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-006](../chapters/13_Spur非线性与PVT.html#f13-006) | 调谐纹波到 FM 边带的换算 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-007](../chapters/13_Spur非线性与PVT.html#f13-007) | 调谐纹波到 FM 边带的换算 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-008](../chapters/13_Spur非线性与PVT.html#f13-008) | 调谐纹波到 FM 边带的换算 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-009](../chapters/13_Spur非线性与PVT.html#f13-009) | 调谐纹波到 FM 边带的换算 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-010](../chapters/13_Spur非线性与PVT.html#f13-010) | 调谐纹波到 FM 边带的换算 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-011](../chapters/13_Spur非线性与PVT.html#f13-011) | 非线性与供电耦合 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-012](../chapters/13_Spur非线性与PVT.html#f13-012) | 非线性与供电耦合 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-013](../chapters/13_Spur非线性与PVT.html#f13-013) | 非线性与供电耦合 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-014](../chapters/13_Spur非线性与PVT.html#f13-014) | PVT 漂移与校准裕量 | 见原页锚点附近 | [JKU《RFIC》· Oscillators](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html) |
| [f13-015](../chapters/13_Spur非线性与PVT.html#f13-015) | 真实产品与论文案例：杂散测量和校准 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-016](../chapters/13_Spur非线性与PVT.html#f13-016) | 杂散与 PVT 交互实验 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |
| [f13-017](../chapters/13_Spur非线性与PVT.html#f13-017) | 杂散与 PVT 交互实验 | 见原页锚点附近 | [ADI AN143 · 参考杂散与 FM 附录](https://www.analog.com/en/resources/technical-articles/an143-a-simple-method-to-accurately-predict-pll-reference-spur-levels-due-to-leakage-current.html) |

### 14 [Integer-N与Fractional-N](../chapters/PLL_第14章_Integer-N与Fractional-N.html)（10 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f14-001](../chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-001) | Integer-N：输出频率只能落在参考频率的整数倍 | 见原页锚点附近 | [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |
| [f14-002](../chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-002) | Integer-N：输出频率只能落在参考频率的整数倍 | 见原页锚点附近 | [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |
| [f14-003](../chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-003) | Integer-N PLL：从参考时钟到反馈分频 | 见原页锚点附近 | [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |
| [f14-004](../chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-004) | Fractional-N：每拍仍然整数，长期平均可以是小数 | 见原页锚点附近 | [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |
| [f14-005](../chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-005) | Fractional-N：每拍仍然整数，长期平均可以是小数 | 见原页锚点附近 | [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |
| [f14-006](../chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-006) | NUM、DEN：小数目标如何编码？ | 见原页锚点附近 | [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |
| [f14-007](../chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-007) | NUM、DEN：小数目标如何编码？ | 见原页锚点附近 | [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |
| [f14-008](../chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-008) | 量化噪声、Fractional Spur 与 Integer-Boundary Spur | 见原页锚点附近 | [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html) |
| [f14-009](../chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-009) | 预测实验：分频比变化，输出频率和步进如何变化？ | 见原页锚点附近 | [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |
| [f14-010](../chapters/PLL_第14章_Integer-N与Fractional-N.html#f14-010) | 预测实验：分频比变化，输出频率和步进如何变化？ | 见原页锚点附近 | [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |

### 15 [Sigma-Delta_MASH与Dither](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html)（12 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f15-001](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-001) | Fractional-N 的小数目标，怎样变成整数分频命令？ | 见原页锚点附近 | [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html) |
| [f15-002](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-002) | 一阶累加器：0.3 为什么会变成 0、0、1、0……？ | 见原页锚点附近 | [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html) |
| [f15-003](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-003) | 一阶累加器：0.3 为什么会变成 0、0、1、0……？ | 见原页锚点附近 | [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html) |
| [f15-004](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-004) | 一阶累加器：0.3 为什么会变成 0、0、1、0……？ | 见原页锚点附近 | [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html) |
| [f15-005](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-005) | 一阶累加器：0.3 为什么会变成 0、0、1、0……？ | 见原页锚点附近 | [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html) |
| [f15-006](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-006) | MASH 1-1-1：不是把同一个 0.3 累加三遍 | 见原页锚点附近 | [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html) |
| [f15-007](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-007) | Noise Transfer Function：量化噪声被搬到哪里？ | 见原页锚点附近 | [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html) |
| [f15-008](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-008) | 交互实验：同一个 0.3，一阶累加器和 MASH 输出有什么不同？ | 见原页锚点附近 | [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html) |
| [f15-009](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-009) | 交互实验：同一个 0.3，一阶累加器和 MASH 输出有什么不同？ | 见原页锚点附近 | [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html) |
| [f15-010](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-010) | 交互实验：同一个 0.3，一阶累加器和 MASH 输出有什么不同？ | 见原页锚点附近 | [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html) |
| [f15-011](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-011) | 设计指标与验证：看平均值，也要看频谱和 RTL 代价 | 见原页锚点附近 | [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html) |
| [f15-012](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html#f15-012) | 设计指标与验证：看平均值，也要看频谱和 RTL 代价 | 见原页锚点附近 | [JKU《RFIC》· MASH Modulator (3rd Order)](https://iic-jku.github.io/radio-frequency-integrated-circuits/content/pll/delta_sigma_modulator-preview.html) |

### 16 [ADPLL结构与数字PI](../chapters/PLL_第16章_ADPLL结构与数字PI.html)（6 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f16-001](../chapters/PLL_第16章_ADPLL结构与数字PI.html#f16-001) | FCW：目标频率比怎样变成一条理想相位轨迹？ | 见原页锚点附近 | [Staszewski / Balsara · All-Digital Frequency Synthesizer, Ch. 4](https://doi.org/10.1002/0470041951) |
| [f16-002](../chapters/PLL_第16章_ADPLL结构与数字PI.html#f16-002) | 实际相位：计数器测整数周期，TDC 测剩余时间 | 见原页锚点附近 | [Staszewski / Balsara · All-Digital Frequency Synthesizer, Ch. 4](https://doi.org/10.1002/0470041951) |
| [f16-003](../chapters/PLL_第16章_ADPLL结构与数字PI.html#f16-003) | 实际相位：计数器测整数周期，TDC 测剩余时间 | 见原页锚点附近 | [Staszewski / Balsara · All-Digital Frequency Synthesizer, Ch. 4](https://doi.org/10.1002/0470041951) |
| [f16-004](../chapters/PLL_第16章_ADPLL结构与数字PI.html#f16-004) | 数字 PI：为什么一个积分器能保存长期频率修正？ | 见原页锚点附近 | [Staszewski / Balsara · All-Digital Frequency Synthesizer, Ch. 4](https://doi.org/10.1002/0470041951) |
| [f16-005](../chapters/PLL_第16章_ADPLL结构与数字PI.html#f16-005) | DCO：数字控制码最终怎样改变真实振荡频率？ | 见原页锚点附近 | [Staszewski / Balsara · All-Digital Frequency Synthesizer, Ch. 4](https://doi.org/10.1002/0470041951) |
| [f16-006](../chapters/PLL_第16章_ADPLL结构与数字PI.html#f16-006) | 交互实验：逐拍观察相位误差怎样被 PI 消除 | 见原页锚点附近 | [Staszewski / Balsara · All-Digital Frequency Synthesizer, Ch. 4](https://doi.org/10.1002/0470041951) |

### 17 [TDC_DTC与DCO校准](../chapters/PLL_第17章_TDC_DTC与DCO校准.html)（6 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f17-001](../chapters/PLL_第17章_TDC_DTC与DCO校准.html#f17-001) | 2. TDC：时间差怎样变成数字码 | 见原页锚点附近 | [Staszewski / Balsara · All-Digital Frequency Synthesizer, Ch. 4](https://doi.org/10.1002/0470041951) |
| [f17-002](../chapters/PLL_第17章_TDC_DTC与DCO校准.html#f17-002) | 4. DTC：数字码如何变成时间 | 见原页锚点附近 | [Zhuang / Staszewski（2014）· ADPLL 相位预测](https://www.jstage.jst.go.jp/article/ipsjtsldm/7/0/7_2/_article) |
| [f17-003](../chapters/PLL_第17章_TDC_DTC与DCO校准.html#f17-003) | 5. DTC 交互：分数相位与延迟补偿 | 见原页锚点附近 | [Zhuang / Staszewski（2014）· ADPLL 相位预测](https://www.jstage.jst.go.jp/article/ipsjtsldm/7/0/7_2/_article) |
| [f17-004](../chapters/PLL_第17章_TDC_DTC与DCO校准.html#f17-004) | 5. DTC 交互：分数相位与延迟补偿 | 见原页锚点附近 | [Zhuang / Staszewski（2014）· ADPLL 相位预测](https://www.jstage.jst.go.jp/article/ipsjtsldm/7/0/7_2/_article) |
| [f17-005](../chapters/PLL_第17章_TDC_DTC与DCO校准.html#f17-005) | 6. DCO：粗调、细调与增益测量 | 见原页锚点附近 | [Staszewski / Balsara · All-Digital Frequency Synthesizer, Ch. 4](https://doi.org/10.1002/0470041951) |
| [f17-006](../chapters/PLL_第17章_TDC_DTC与DCO校准.html#f17-006) | 7. 校准闭环：从测量到写寄存器 | 见原页锚点附近 | [Staszewski / Balsara · All-Digital Frequency Synthesizer, Ch. 4](https://doi.org/10.1002/0470041951) |

### 18 [完整系统设计与指标](../chapters/PLL_第18章_完整系统设计与指标.html)（3 处）

| 原页定位 | 页签 | 可直接提取的公式 | 现有来源 |
|---|---|---|---|
| [f18-001](../chapters/PLL_第18章_完整系统设计与指标.html#f18-001) | 2. 规格先行：频率规划与约束 | 见原页锚点附近 | [TI LMX2594 · N-Divider and Fractional Circuitry](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) |
| [f18-002](../chapters/PLL_第18章_完整系统设计与指标.html#f18-002) | 8. 毕业实验：系统验收清单 | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| [f18-003](../chapters/PLL_第18章_完整系统设计与指标.html#f18-003) | 8. 毕业实验：系统验收清单 | 见原页锚点附近 | [TI SNAA106C · PLL Performance, Simulation, and Design](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
