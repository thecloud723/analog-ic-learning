# PLL-S1-04 新版公式索引

基线为 main `f11e66e`。每一行对应一个独立 MathML 公式块。页面引文沿用公式块附近的链接。课程推导与教学模型的链接供查阅概念、拓扑或测试工况。索引覆盖独立公式，尚需逐条复核引文与原文等式是否完全对应，行内公式也需单独核对。

| 新版页面 | 公式 | 来源或类型 | 适用条件 |
|---|---|---|---|
| [A1-1](../course/a1-1.html) | `f_{\mathrm{VCO}}=N f_{\mathrm{PFD}}` | 页面引文 · [JKU §7.4 · 整数分频关系](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-frac-n) | 整数 N、已锁定、输出节点取 VCO |
| [A2-1](../course/a2-1.html) | `\Delta\phi=360^\circ\frac{\Delta t}{T}` | 页面引文 · [ADI AN-1067 · 相位与时间抖动](https://www.analog.com/en/resources/app-notes/an-1067.html) | 同周期比较，角度以度表示 |
| [A2-2](../course/a2-2.html) | `\phi_{\mathrm e}(t)=\phi_{\mathrm e}(0)+2\pi\int_0^t\Delta f(\tau)\,\mathrm d\tau` | 页面引文 · [JKU §6.7 · 瞬时角频率积分为相位](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator-modeling) | 未折叠相位，频差用 Hz、相位用 rad |
| [A2-3](../course/a2-3.html) | `\Delta f_{\mathrm{VCO}}\approx K_{\mathrm{VCO}}\Delta V_{\mathrm{CTRL}}` | 页面引文 · [JKU §6.6 · VCO 调谐增益](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-frequency-tuning-of-oscillators) | 工作点附近的小信号斜率 |
| [APP-1](../course/app-1.html) | `\Delta f=\frac{1}{T_\mathrm{obs}}` | 课程推导／教学模型 | 均匀采样 DFT 的频点间距，窗函数影响实际分辨能力 |
| [B1-1](../course/b1-1.html) | `f_{\mathrm s}=\frac{1}{2\pi\sqrt{L_{\mathrm m}C_{\mathrm m}}}` | 页面引文 · [JKU §6.4 · 式 60–61](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-single-ended-oscillators) | 晶体等效模型，负载近似要求动态电容远小于总并联电容 |
| [B1-1](../course/b1-1.html) | `f_0\approx f_{\mathrm s}\left[1+\frac{C_{\mathrm m}}{2(C_0+C_{\mathrm L})}\right]` | 页面引文 · [JKU §6.4 · 式 60–61](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-single-ended-oscillators) | 晶体等效模型，负载近似要求动态电容远小于总并联电容 |
| [B1-2](../course/b1-2.html) | `f_{\mathrm{PD}}=\frac{f_{\mathrm{REF}}}{R},\qquad f_{\mathrm{VCO}}=N f_{\mathrm{PD}},\qquad f_{\mathrm{CLK}}=\frac{f_{\mathrm{VCO}}}{D}` | 页面引文 · [ADI MT-086 · 第 8 页 Fig. 7(A)，整数-N 参考链与反馈链](https://www.analog.com/media/en/training-seminars/tutorials/MT-086.pdf#page=8)、[ADI ADF4351 Rev. A · 第 21 页「RF Synthesizer—A Worked Example」，式 (3)–(4)、Fig. 30](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf#page=21) | 已锁定。简化链使用理想分频。LMX2594 链使用有效倍频系数和已选输出路径 |
| [B1-2](../course/b1-2.html) | `f_{\mathrm{PD}}=\frac{f_{\mathrm{OSC}}\times\mathrm{OSC\_2X}\times\mathrm{MULT}}{\mathrm{PLL\_R\_PRE}\times\mathrm{PLL\_R}}` | 页面引文 · [TI LMX2594 数据手册 · 式 (1)](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) | 已锁定。简化链使用理想分频。LMX2594 链使用有效倍频系数和已选输出路径 |
| [B1-2](../course/b1-2.html) | `f_{\mathrm{VCO}}=f_{\mathrm{PD}}\left(N+\frac{\mathrm{NUM}}{\mathrm{DEN}}\right)` | 页面引文 · [TI LMX2594 数据手册 · §7.3.4 式 (2)](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) | 已锁定。简化链使用理想分频。LMX2594 链使用有效倍频系数和已选输出路径 |
| [B1-2](../course/b1-2.html) | `f_{\mathrm{RFoutA}}=\frac{f_{\mathrm{VCO}}}{\mathrm{CHDIV}}\quad(\mathrm{OUTA\_MUX}=\text{Channel Divider})` | 页面引文 · [TI LMX2594 数据手册 · 图 24、表 8 与 R45](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) | 已锁定。简化链使用理想分频。LMX2594 链使用有效倍频系数和已选输出路径 |
| [B1-3](../course/b1-3.html) | `N=\frac{f_{\mathrm{target}}}{f_{\mathrm{PFD}}}\in\mathbb Z` | 页面引文 · [TI LMX2594EVM §3 · 参考与反馈分频配置](https://www.ti.com/lit/ug/snau210b/snau210b.pdf#page=5) | 整数模式且目标是 VCO 频率，满足整除仍须检查器件范围 |
| [B2-1](../course/b2-1.html) | `f\approx\frac{1}{2Nt_{\mathrm d}}` | 页面引文 · [JKU §6 · 环形振荡器](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator) | 奇数级反相环，相近的平均传播延时 |
| [B2-2](../course/b2-2.html) | `f_0=\frac{1}{2\pi\sqrt{LC}}` | 页面引文 · [JKU §6 · 谐振频率、Q 与环降](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator) | 理想 LC 谐振及高 Q、弱阻尼包络 |
| [B2-2](../course/b2-2.html) | `\frac{E(t)}{E_0}\approx e^{-\omega_0t/Q}` | 页面引文 · [JKU §6 · 谐振频率、Q 与环降](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator) | 理想 LC 谐振及高 Q、弱阻尼包络 |
| [B2-2](../course/b2-2.html) | `\frac{A(t)}{A_0}\approx e^{-\omega_0t/(2Q)}` | 页面引文 · [JKU §6 · 谐振频率、Q 与环降](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator) | 理想 LC 谐振及高 Q、弱阻尼包络 |
| [B2-3](../course/b2-3.html) | `R_{\mathrm{neg}}\approx-\frac{2}{g_{\mathrm m}},\qquad \frac{g_{\mathrm m}}{2}>\frac{1}{R_{\mathrm p}}` | 页面引文 · [JKU §6.5 · 差分负阻](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-differential-oscillators) | 忽略寄生和输出电阻的小信号差分近似 |
| [B3-1](../course/b3-1.html) | `\frac{\mathrm df}{\mathrm dC}=-\frac{f}{2C}` | 页面引文 · [JKU §6.6 · 调谐灵敏度](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-frequency-tuning-of-oscillators) | 固定电感与其余电容，局部微分 |
| [B3-1](../course/b3-1.html) | `K_{\mathrm{VCO}}=\frac{\mathrm df}{\mathrm dV}=\frac{\mathrm df}{\mathrm dC}\frac{\mathrm dC}{\mathrm dV}` | 页面引文 · [JKU §6.6 · 调谐灵敏度](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-frequency-tuning-of-oscillators) | 固定电感与其余电容，局部微分 |
| [B3-2](../course/b3-2.html) | `\Delta f\approx-\frac{f}{2C}\Delta C` | 页面引文 · [JKU §6.6 · 电容阵列与调谐](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-frequency-tuning-of-oscillators) | 小电容步进的一阶近似 |
| [B3-3](../course/b3-3.html) | `V_{\mathrm{margin}}=\min\!\left(V_{\mathrm{lock}}-V_{\min},\,V_{\max}-V_{\mathrm{lock}}\right)` | 课程推导／教学模型 · [JKU §6.6 · 调谐范围与 PVT](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-frequency-tuning-of-oscillators) | 锁定电压距任一控制轨的最小距离，负值表示超范围 |
| [C1-1](../course/c1-1.html) | `D_{\mathrm{XOR}}=\frac{&#124;\Delta\phi&#124;}{\pi},\qquad \overline{V}_{\mathrm{XOR}}=V_{\mathrm{DD}}D_{\mathrm{XOR}},\qquad &#124;\Delta\phi&#124;\leq\pi` | 页面引文 · [JKU §7.1 · XOR 鉴相](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-basic-architecture) | 同频、50% 占空比的理想方波 |
| [C1-2](../course/c1-2.html) | `\Delta Q=\int(i_{\mathrm{UP}}-i_{\mathrm{DN}})\,\mathrm dt,\qquad \Delta V_C=\frac{\Delta Q}{C}` | 页面引文 · [JKU §7.2 · 式 (65)–(66)](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-charge-pump) | 电容恒定，积分电流以流入节点为正 |
| [C1-3](../course/c1-3.html) | `Z_{\mathrm s}(s)=R+\frac{1}{sC},\qquad Z(s)=\frac{Z_{\mathrm s}(s)}{1+sC_{\mathrm p}Z_{\mathrm s}(s)}` | 页面引文 · [JKU §7.2 · Fig. 83；并联网络由该拓扑推导](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-charge-pump) | 线性无源滤波器，忽略额外负载 |
| [C1-4](../course/c1-4.html) | `\int_{t}^{t+T_{\mathrm{ref}}}i_C(\tau)\,\mathrm d\tau=0,\qquad V_{\mathrm{pp}}=V_{\max}-V_{\min}` | 课程推导／教学模型 · [JKU §7.2 · 电荷与电压关系；CP-01 周期稳态读数定义](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-charge-pump) | 周期稳态，电容在完整周期的净电荷为零 |
| [C2-1](../course/c2-1.html) | `\frac{\mathrm d\phi_{\mathrm{VCO}}}{\mathrm dt}=2\pi f_{\mathrm{VCO}}(t),\qquad \phi_{\mathrm{FB}}=\frac{\phi_{\mathrm{VCO}}}{N}` | 页面引文 · [JKU §6.7 · 瞬时频率积分为相位](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator-modeling) | 理想分频，未折叠相位且忽略固定初始相位偏置 |
| [C2-2](../course/c2-2.html) | `f_{\mathrm{VCO}}=5\,\mathrm{GHz}+\Delta f_0+K_{\mathrm{VCO}}\bigl(V_{\mathrm{CTRL}}-0.9\,\mathrm V\bigr)` | 课程推导／教学模型 · [JKU §6.7 · VCO 局部线性模型](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator-modeling) | 课程线性 VCO 模型，局部工作区内使用 |
| [C2-3](../course/c2-3.html) | `e_{\mathrm{wrap}}=e-\left\lfloor e+\tfrac12\right\rfloor` | 课程推导／教学模型 · [ADF4351 Rev. A · 第 22 页滑移背景；本页以圈定义模相位](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf#page=22) | 相位误差以周期计，映射到半开区间 |
| [C2-4](../course/c2-4.html) | `&#124;\Delta f[k]&#124;\leq \Delta f_{\mathrm{tol}}\quad\text{for all samples in the dwell window}` | 课程推导／教学模型 · [本页教学锁定口径；芯片 fast-lock 条件见第 22 页](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf#page=22) | 课程频率驻留判据，须同时记录采样间隔与窗口长度 |
| [C3-1](../course/c3-1.html) | `L(s)=\frac{I_{\mathrm{CP}}}{2\pi}\,Z(s)\,\frac{2\pi K_{\mathrm{VCO}}}{s}\,\frac{1}{N}` | 页面引文 · [JKU §7.2 · 相位域环路；本式 K 以 Hz/V 计](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-charge-pump) | 锁定点线性化，VCO 增益用 Hz/V |
| [C3-2](../course/c3-2.html) | `T=\frac{L}{1+L}=\frac{\omega_n^2+2\zeta\omega_ns}{s^2+2\zeta\omega_ns+\omega_n^2},\qquad S=\frac{1}{1+L}=\frac{s^2}{s^2+2\zeta\omega_ns+\omega_n^2}` | 页面引文 · [JKU §7.2 · 式 (67)–(69)，T 已除以 N](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-charge-pump) | 二阶 PI 形式，忽略额外极点，T 为归一化闭环响应 |
| [C3-3](../course/c3-3.html) | `Y_{\mathrm{CP}}=sC_1+\frac{1}{R_2+1/(sC_2)},\qquad Z_{\mathrm{out}}=\frac{1}{(1+sR_4C_4)Y_{\mathrm{CP}}+sC_4}` | 课程推导／教学模型 · [按 TI Fig. 4-1 推导，R3 = 0、C3 未装](https://www.ti.com/lit/ug/snau210b/snau210b.pdf#page=6) | EVM 指定 RC 拓扑，假定 VCO 调谐端高阻 |
| [C3-4](../course/c3-4.html) | `Y(s)=\frac{T(s)}{s}\quad\text{for a unit step}` | 课程推导／教学模型 · [JKU §7.2 · 由式 (67) 的归一化闭环传递计算阶跃](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-charge-pump) | 线性时不变系统的零初态单位阶跃 |
| [D1-1](../course/d1-1.html) | `\mathcal L_{\mathrm{dBc/Hz}}(f)=10\log_{10}\frac{S_{\mathrm{side}}(f)}{P_{\mathrm c}},\qquad P_{\mathrm{noise,dBc}}\approx\mathcal L_{\mathrm{dBc/Hz}}+10\log_{10}\frac{B_{\mathrm{ENBW}}}{1\,\mathrm{Hz}}` | 页面引文 · [ADI MT-008 第 3 页 Fig. 3；带宽换算按平坦噪底](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=3) | 线性谱密度换算，带内近乎平坦才可乘等效噪声带宽 |
| [D1-2](../course/d1-2.html) | `\mathcal L_{\mathrm{lin}}(\Delta f)=\frac{kTFR_{\mathrm p}}{V_{\mathrm p}^{2}}\left(\frac{f_0}{Q\Delta f}\right)^2,\qquad R_{\mathrm p}=\frac{Q}{2\pi f_0C}` | 页面引文 · [JKU §6.1 · 式 (56)–(57)](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator-noise) | 简化 Tank 热噪声模型，使用图中的峰值和 Q 定义 |
| [D1-3](../course/d1-3.html) | `\sigma_t=\frac{\sqrt{2\int_{f_1}^{f_2}10^{\mathcal L_{\mathrm{dBc/Hz}}(f)/10}\,\mathrm df}}{2\pi f_0}` | 页面引文 · [ADI MT-008 第 3 页 Fig. 4；JKU §6.2 式 (58)](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=3) | 单边带相噪，用线性量积分，忽略离散 spur 或单独计入 |
| [D1-4](../course/d1-4.html) | `P_{\mathrm{RM,dBm}}\approx P_{\mathrm{block,dBm}}+\mathcal L_{\mathrm{dBc/Hz}}(\Delta f)+10\log_{10}\frac{B}{1\,\mathrm{Hz}}` | 页面引文 · [JKU §6.3 · 式 (59)](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator-reciprocal-mixing) | 阻塞相对通道较窄，所取频偏附近相噪近似平坦 |
| [D2-1](../course/d2-1.html) | `S_{\phi,\mathrm{out}}=&#124;NT&#124;^2\bigl(S_{\phi,\mathrm{REF}}+S_{\phi,\mathrm{FB}}+S_{\phi,\mathrm{CP\text{-}eq}}\bigr)+&#124;S&#124;^2S_{\phi,\mathrm{VCO}}` | 页面引文 · [JKU Fig. 84；CP 和分频项按其等效注入点扩展](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-phase-noise) | 各源互不相关，噪声统一折算到图示注入节点 |
| [D2-2](../course/d2-2.html) | `\mathcal L_{\mathrm{out}}=\mathcal L_{\mathrm{in}}-20\log_{10}M,\qquad \frac{\phi/M}{2\pi(f_0/M)}=\frac{\phi}{2\pi f_0}` | 页面引文 · [ADI MT-008 第 3 页相位到时间换算；理想分频关系由相位比例推导](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=3) | 理想无附加噪声分频，比较相同频偏 |
| [D2-3](../course/d2-3.html) | `\varepsilon_{\mathrm{dB}}=\mathcal L_{\mathrm{interp}}(f)-\mathcal L_{\mathrm{marker}}(f)` | 课程推导／教学模型 · [TI SNAU210B 第 6 页实测标记；误差定义用于本页插值练习](https://www.ti.com/lit/ug/snau210b/snau210b.pdf#page=6) | 插值与 marker 使用同一频偏和实测工况 |
| [D3-1](../course/d3-1.html) | `f_{\mathrm{spur}}=f_{\mathrm c}\pm k f_{\mathrm{PFD}},\qquad \mathrm{Spur}_{\mathrm{dBc}}=10\log_{10}\frac{P_{\mathrm{spur}}}{P_{\mathrm c}}` | 页面引文 · [ADI AN143 第 2 页 Fig. 3 · 参考杂散](https://www.analog.com/media/en/technical-documentation/application-notes/an143f.pdf#page=2) | 周期扰动稳态，k 为正整数 |
| [D3-2](../course/d3-2.html) | `\beta_1=\frac{K_{\mathrm{VCO}}V_{\mathrm{1,pk}}}{f_{\mathrm{PFD}}},\qquad \mathrm{Spur}_{1,\mathrm{dBc}}\approx 20\log_{10}\!\left(\frac{\beta_1}{2}\right)\quad(\beta_1\ll1)` | 页面引文 · [ADI AN143 第 8 页 · 窄带 FM 推导](https://www.analog.com/media/en/technical-documentation/application-notes/an143f.pdf#page=8) | 正弦频率调制的小指数近似，纹波为基波峰值 |
| [D3-3](../course/d3-3.html) | `\mathrm{Spur}_{1,\mathrm{dBc}}\approx20\log_{10}\!\left(\frac{K_{\mathrm{VCO}}I_{\mathrm{leak}}&#124;H_{\mathrm{post}}&#124;}{2\pi C_{\mathrm P}f_{\mathrm{PFD}}^2}\right),\quad &#124;H_{\mathrm{post}}&#124;=\frac{1}{\sqrt{1+(2\pi f_{\mathrm{PFD}}R_{\mathrm{P2}}C_{\mathrm{P2}})^2}}` | 页面引文 · [ADI AN143 第 7 页 Table 2 · 无源情形取后级增益为 1](https://www.analog.com/media/en/technical-documentation/application-notes/an143f.pdf#page=7) | 漏电锯齿近似及小调制指数，后级按给定滤波器近似 |
| [E1-1](../course/e1-1.html) | `f_{\mathrm{VCO}}=f_{\mathrm{PFD}}\left(N+\frac{\mathrm{NUM}}{\mathrm{DEN}}\right),\qquad \Delta f_{\mathrm{VCO}}=\frac{f_{\mathrm{PFD}}}{\mathrm{DEN}}` | 页面引文 · [JKU §7.4 · 分数分频；步进按固定 DEN、改变 1 个 NUM](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-frac-n-block) | 固定 PFD 和分母，使用平均分频比 |
| [E1-2](../course/e1-2.html) | `P=\frac{\mathrm{DEN}}{\gcd(\mathrm{NUM},\mathrm{DEN})},\qquad f_k=k\frac{f_{\mathrm{PFD}}}{P}` | 页面引文 · [JKU §7.4 · 本页为零初态一阶累加器周期](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-frac-n) | 一阶确定性累加器，无 dither |
| [E2-1](../course/e2-1.html) | `y[n]=x[n]+r[n-1]-r[n],\qquad \mathrm{NTF}(z)=1-z^{-1}` | 页面引文 · [JKU §7.4.1 Fig. 90](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-dsm-digital-first-order) | 一阶累加器余量约定，NTF 的符号随误差定义 |
| [E2-2](../course/e2-2.html) | `y[n]=c_1[n]+\Delta c_2[n]+\Delta^2c_3[n]=x[n]-\Delta^3r_3[n],\quad \Delta=1-z^{-1}` | 页面引文 · [JKU Fig. 94 · 依本页同拍编号推导](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-mash-third-order) | 各级按该页的对齐与余量定义执行 |
| [E2-3](../course/e2-3.html) | `P[k]=\frac{2\left&#124;\mathrm{DFT}\{w[n](y[n]-\bar y)\}[k]\right&#124;^2}{L\sum_n w[n]^2},\qquad 0<k<L/2` | 课程推导／教学模型 · [JKU Fig. 93 作原图对照；公式给出本页归一口径](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-mash-dither) | 课程单边窗函数功率谱，排除 DC 和 Nyquist |
| [E3-1](../course/e3-1.html) | `\Phi_{\mathrm{ref}}[k+1]=\Phi_{\mathrm{ref}}[k]+\mathrm{FCW},\qquad e[k]=\Phi_{\mathrm{ref}}[k]-\left(C[k]+\frac{t_{\mathrm{frac}}[k]}{T_{\mathrm{DCO}}}\right)` | 页面引文 · [JKU Fig. 85 · 相位按圈定义](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-adpll-block-diagram) | 同一 DCO 周期归一化，整数计数与分数相位对齐 |
| [E3-2](../course/e3-2.html) | `I[k]=I[k-1]+K_i e[k],\qquad u[k]=K_p e[k]+I[k],\qquad \Phi_{\mathrm{fb}}[k+1]-\Phi_{\mathrm{fb}}[k]=f_{\mathrm{free}}T_{\mathrm s}+K_{\mathrm{DCO}}T_{\mathrm s}\,u[k-d]` | 课程推导／教学模型 · [JKU Fig. 85 · 本页离散 PI 及命令延时](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-adpll-block-diagram) | 离散参考周期，控制码延迟 d 拍，DCO 线性化 |
| [E4-1](../course/e4-1.html) | `q=\min\!\left(15,\left\lfloor\frac{t}{\Delta_t}\right\rfloor\right),\qquad \widehat\phi_{\mathrm{frac}}=\frac{q\Delta_t}{T_{\mathrm{DCO}}},\qquad \sigma_t\approx\frac{\Delta_t}{\sqrt{12}}` | 课程推导／教学模型 · [JKU Fig. 86 · 教学量程与量化误差](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-tdc) | 非负时间输入，量化噪声近似需均匀、未饱和 |
| [E4-2](../course/e4-2.html) | `t_{\mathrm{need}}[k]=r[k]T_{\mathrm{VCO}},\qquad d[k]=\operatorname{clip}_{[0,31]}\!\left(\operatorname{round}\frac{t_{\mathrm{need}}[k]}{\Delta_{\mathrm{DTC}}}\right)` | 课程推导／教学模型 · [公开论文 §3.1 式 (10) · 从残差产生控制码](https://www.mdpi.com/2079-9292/12/4/841) | 课程 5 bit DTC 编码，按正向延迟约定 |
| [E4-3](../course/e4-3.html) | `\widehat K_{\mathrm{DCO}}=\frac{f(b)-f(a)}{b-a},\qquad c_{\mathrm{new}}=\operatorname{clip}_{[0,63]}\!\left(a+\operatorname{round}\frac{\Delta f}{\widehat K_{\mathrm{DCO}}}\right)` | 课程推导／教学模型 · [JKU ADPLL 框图 · 两点差分估计为教学模型](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-adpll-block-diagram) | 课程两点标定，差分增益非零且局部单调 |
| [F1-3](../course/f1-3.html) | `\sigma_t=\frac{\sigma_\phi}{2\pi f_0},\qquad \mathcal L_{\mathrm{out}}=\mathcal L_{\mathrm{in}}-20\log_{10}M` | 页面引文 · [Jo 等 · PDF 第 10 页 · §5 的 ÷2 换算](https://mdpi-res.com/d_attachment/electronics/electronics-11-01118/article_deploy/electronics-11-01118.pdf#page=10) | 相位抖动用 rad，分频式假设理想无附加噪声 |

## 行内公式覆盖范围

正文没有独立的行内 MathML 节点。以纯文本和上下标标记呈现的行内关系仍需人工索引。

## 2026-11-19 原文逐式核对

| 新版页面 | 原文定位 | 核对结果 |
|---|---|---|
| A1-1 | [JKU §7.4 首段](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-frac-n) | 原文直接给出整数倍频关系。将原文的比较参考频率记为课程的 PFD 频率。 |
| A2-3 | [JKU §6.6 调谐灵敏度定义](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-frequency-tuning-of-oscillators) | 原文以频率对控制电压的导数定义 VCO 增益。课程式为工作点附近一阶近似，增益单位 Hz/V。 |
| B1-1 | [JKU 式 (60)](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#eq-crystal-series-resonance) | 串联谐振式一致。 |
| B1-1 | [JKU 式 (61)](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#eq-crystal-pulling) | 负载拉频近似式一致，课程用 C_L 表示原文 C_load。 |
| C1-2 | [JKU 式 (65)](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#eq-cp-voltage-change) | 原文给出单个导通脉冲的电容电压增量。课程用 UP 减 DN 的净电流将同一关系扩展到两脉冲可重叠的情况。 |
| C1-3 | [JKU 式 (66) 与图 83](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-pfd-cp) | 式 (66) 括号内为串联 RC 阻抗。完整阻抗由图 83 中并到地的 C3 与串联 RC 合成。 |
| C3-1 | [JKU 式 (66)–(67)](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#eq-cp-transfer-function) | CP 增益、滤波器、VCO 积分和反馈分频按相同相位域模型组合。课程的 VCO 增益用 Hz/V，乘 2π 后与原文角频率增益一致。 |
| C3-2 | [JKU 式 (67)–(69)](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#eq-cp-pll-transfer-function) | 原文式 (67) 除以 N 得归一化 T，S 由 1−T 得到。两式都沿用忽略 C3 的二阶近似。 |
| B2-2 | [JKU 图 61 后的谐振关系](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-lc-oscillator) | 原文用角频率，除以 2π 得课程的 Hz 表达式。 |
| B2-2 | [JKU 式 (55) 和 §6.1 前的环降说明](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#eq-definition-q) | 原文按每周期约损失 2π/Q 的能量写出指数包络。用周期数等于 f₀t 得课程的连续时间近似。 |
| B2-2 | [JKU §6 环降说明](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator) | 原文给出储能与峰值电压平方的关系。幅度包络取能量包络的平方根，指数减半。 |
| D1-2 | [JKU 式 (56)–(57)](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#eq-leeson-equation) | 角频率比改用 Hz 比值后保持不变。并联电阻由原文的 Q=ω₀CRₚ 反解，使用正弦峰值振幅。 |
| D1-4 | [JKU 式 (59)](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#eq-reciprocal-mixing-noise) | 互易混频功率式一致，课程显式用 1 Hz 归一化积分带宽，并沿用窄带内相噪近似为常数的假设。 |
| B1-2 | [TI SNAS696C 式 (1)](https://www.ti.com/lit/ds/symlink/lmx2594.pdf#page=19) | 参考路径乘除关系一致。OSC_2X 和 MULT 使用实际倍频因子。 |
| B1-2 | [TI SNAS696C §7.3.4 式 (2)](https://www.ti.com/lit/ds/symlink/lmx2594.pdf#page=21) | 常规反馈路径的分数频率关系一致。SYNC 模式额外分频在课程正文中注明。 |
| B1-2 | [TI SNAS696C 图 24、表 8 和 R45 字段](https://www.ti.com/lit/ds/symlink/lmx2594.pdf#page=25) | OUTA_MUX 选通道分频时，分母取实际分频比。寄存器编码 0 映射为 ÷2。 |
| D1-1 | [ADI MT-008 图 3–4](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=3) | 图 3 的 SSB 谱密度以载波功率归一化。平坦噪声在等效带宽内积分得到十倍对数带宽修正。 |
| D1-3 | [ADI MT-008 图 4、式 (2)–(3)](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=4) | 原文 A 为单边谱积分后的 dBc。转为线性功率后乘 2，再开方并除以 2πf₀，得到秒。 |
| B3-1 | [JKU 图 61 后与 §6.6](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-lc-oscillator) | 固定 L 对理想谐振频率按 C 求导得 −f/(2C)，C 为总等效电容。 |
| B3-1 | [JKU §6.6 调谐灵敏度](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-frequency-tuning-of-oscillators) | 原文定义 df/dV。课程按固定 L 的单一电容调谐路径应用链式法则。 |
| B3-2 | [JKU 图 61 与 §6.6 的电容调谐背景](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-frequency-tuning-of-oscillators) | 课程对理想谐振式作一阶差分近似，要求电容步进相对总电容足够小。 |
| C2-1 | [JKU §6.7 图 73 与图 74](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator-modeling) | 相位积分微分还原角频率。除以 N 是理想分频器的相位状态模型，固定初始相位约定。 |
| C3-4 | [JKU 式 (67)](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#eq-cp-pll-transfer-function) | 课程将原文闭环函数除以 N，再乘单位阶跃的拉普拉斯变换 1/s。 |
| E1-1 | [JKU §7.4 与 TI SNAS696C 式 (2)](https://www.ti.com/lit/ds/symlink/lmx2594.pdf#page=21) | 锁定关系与 TI 式 (2) 一致。固定 DEN、NUM 增加 1 得到 VCO 频点步进。 |
| B2-1 | [JKU 图 60](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-ring-oscillator) | 原文说明频率取决于门延迟。对等延迟的奇数级环，边沿两次绕行构成一个完整周期，得到 2Nt_d。 |
| C1-4 | [JKU 式 (65)](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#eq-cp-voltage-change) 与 CP-01 | 周期稳态下电容首尾电压相等，因此整周期的电容净电荷为零。峰峰值采用所选稳态周期的最大值减最小值。 |
| C2-2 | [JKU §6.7](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator-modeling) | 原文给出线性化压控振荡器。课程采用 Hz/V，并把 0.9 V 定为局部模型参考点，将初始频差并入截距。 |
| E1-2 | [JKU §7.4 的整数分频序列](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-frac-n) | 课程的一阶余量循环由最小正整数 P 满足 P·NUM ≡ 0 (mod DEN) 得到。周期序列的谱线间隔为 f_PFD/P。 |

### 纯文本行内公式复核（首批）

| 页面 | 行内关系 | 方式和验算 |
|---|---|---|
| A2-1 | 100 MHz 对应 10 ns，40 ps 对应 0.004 圈和 1.44° | 用周期倒数和本页的时间差到相位差公式验算。 |
| B1-2 | 100 MHz 经 ×2 得 200 MHz，N=70 对应 14 GHz，输出 ÷2 得 7 GHz | 代入本页已核对的 TI 式 (1)–(2) 与通道分频表，默认配置见 TI SNAU210B 图 3-1。 |
| B1-3 | 输出直通时 N 加 1，载波步进一个 f_PFD | 由锁定整数分频关系取相邻频点之差，保持 f_PFD 不变。 |
| B2-1 | 三个反相器贡献 540°；每级额外滞后 60° 后总相位滞后 720° | 从相位闭合条件验算 3×(180°+60°)。该小信号相位条件与传播延迟频率估算的假设分别保留。 |

### 2026-11-19 来源与推导复核（续）

| 新版页面 | 原文定位或推导类型 | 核对结果 |
|---|---|---|
| A2-1 | [ADI AN-1067，Definitions 与 Jitter](https://www.analog.com/en/resources/app-notes/an-1067.html) | 原文角频率为 2πf，时间差乘角频率得 rad，再换成度。课程以反馈迟到为正。 |
| A2-2 | [JKU §6.7](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator-modeling) | 两路频率积分后相减，参考减反馈的频差应与相位差使用同一符号约定，再加入初始误差。JKU 给出显式积分，ADI AN-1067 提供相位定义。 |
| APP-1 | 课程推导 | L 点等间隔采样的 DFT 基函数相邻频率差为 fₛ/L。此处有效观测窗为 L/fₛ，首末样点时间差为 (L−1)/fₛ。 |
| B1-2 | [ADI MT-086 图 7(A)](https://www.analog.com/media/en/training-seminars/tutorials/MT-086.pdf#page=8) 与 [ADF4351 图 30](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf#page=21) | 第一个来源给参考与反馈的 R/N，第二个来源补输出端分频位置。D 是实际分频比。 |
| B1-3 | [TI LMX2594 式 (2)](https://www.ti.com/lit/ds/symlink/lmx2594.pdf#page=21) | 令 NUM 为 0、目标节点为 VCO 后反解 N，若比值非整数，该目标不可由此整数配置达到。 |
| B2-3 | [JKU §6.5](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-differential-oscillators) | 对称交叉耦合对的小信号差分输入阻抗为 −2/gm。与同口径的差分槽路电阻并联，净电导小于零为小信号起振条件。 |
| B3-3 | 课程定义 | 余量取锁定电压到两个边界的更短距离，恰在边界为零，落在范围外时为负。网页对范围外另行显示不可达。 |
| C1-1 | [JKU 图 75](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pd-xor-diagram) | 同频、50% 占空比时，每周期两段异或高电平各长一个边沿偏差。归一化占空比乘理想高电平得到平均电压。 |
| C2-3 | 课程推导 | 加半圈、取下整、再移回半圈得到 [−0.5, 0.5) 内唯一同余值。+0.5 映到 −0.5；包裹跳变本身不能判定真实 cycle slip。 |
| C2-4 | 课程定义与 c-labs.js | 进入频差容限后记录起点，任何超限样点清除起点，连续保持时间到达阈值才报告。阈值含等号，时间由离散样点证实。 |
| C3-3 | [TI SNAU210B 表 3、图 4-1](https://www.ti.com/lit/ug/snau210b/snau210b.pdf#page=6) | C3 开路、R3 短路后，对 CP 节点和 C4 节点写 KCL。由 Vcp=(1+sR4C4)Vout 与 Icp=Ycp·Vcp+sC4·Vout 得课程跨阻。 |
| D2-1 | [JKU 图 84](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-phase-noise) | 原文给参考低通、VCO 高通和带内 N²。课程扩展到输入折算的 CP 与分频路径，假设各源不相关并在线性 PSD 域相加。 |
| D2-2 | [ADI MT-008 式 (3)](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=4) | 相位缩小 M 倍，线性相位 PSD 缩小 M² 倍。载波频率同步除 M，所以同频偏范围内的等效时间抖动保持。 |
| D2-3 | [TI SNAU210B 图 5-1](https://www.ti.com/lit/ug/snau210b/snau210b.pdf#page=6) | 原图提供测量读数，带符号插值残差按本页定义为插值减标记值，两值使用同一个频偏和纵轴单位。 |
| D3-1 | [ADI AN143 图 3 与附录](https://www.analog.com/media/en/technical-documentation/application-notes/an143f.pdf#page=2) | 周期性 PFD 扰动的整数谐波调制载波，产生两侧偏移。杂散 dBc 由单根杂散功率对载波功率转换。 |
| D3-2 | [ADI AN143 窄带 FM 附录](https://www.analog.com/media/en/technical-documentation/application-notes/an143f.pdf#page=8) | 原文 Em 是调谐电压基波峰值，β=KVCO·Em/fm，单侧边带幅度比约 β/2。20 倍对数来自幅比平方转成功率比。 |
| D3-3 | [ADI AN143 表 2](https://www.analog.com/media/en/technical-documentation/application-notes/an143f.pdf#page=7) | 原文基波式与课程一致。无源情形后级增益为 1，指定有源滤波器的后级是单极点幅频响应。 |
| E2-1 | [JKU 图 90](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-dsm-digital-first-order) | 余量守恒 r[n]=x[n]+r[n−1]−y[n]。对余量使用负号定义量化误差即得正号形式的 NTF。 |
| E2-2 | [JKU 图 94](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-mash-third-order) 与 e-labs.js | 同拍余量实现满足 c1=x−Δr1、c2=r1−Δr2、c3=r2−Δr3。代入数字组合后前两级余量逐项消去。 |
| E2-3 | [JKU 图 93](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-mash-dither) 与 e-labs.js | 原图为带抖动频谱示例。课程按 Parseval 和窗均方值归一化每个频点功率。非 DC/Nyquist 点对折叠成单边频谱时乘 2。 |
| E3-1 | [JKU 图 85–86](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-adpll-block-diagram) | 课程把目标频率字累加成圈数，再减去整数反馈计数与 TDC 时间差归一化得到的反馈相位。原图提供拓扑，递推按本页索引推导。 |
| E3-2 | [JKU 图 85](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-adpll-block-diagram) 与 e-labs.js | 代码更新积分后计算当拍命令，并取延迟队列最旧值。作用于一个参考周期的 DCO 频率乘周期后为相位增量。 |
| E4-1 | [JKU 图 86](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-tdc) 与 e-labs.js | 教学码按步长向下取整并限制在 0–15，量化误差在未饱和且余量均匀时标准差为步长除 √12。向下取整产生半步长均值偏差，标准差与未去均值 RMS 有别。 |
| E4-3 | 课程推导与 e-labs.js | 两个频率测量点作割线估计局部增益，再用目标频差除该斜率估计码差，最近整数舍入并按 6 bit 范围限幅。 |

| E4-2 | [Electronics 12(4), 841，式 (10)](https://mdpi-res.com/d_attachment/electronics/electronics-12-00841/article_deploy/electronics-12-00841.pdf#page=5) | 原文用累加器输出形成输入周期的 256 级相位调整字。课程保留先从分数余量换算时间、再量化的结构，采用独立的 5 bit 正向延时教学编码。 |
| F1-3 | [Jo 等 §5](https://mdpi-res.com/d_attachment/electronics/electronics-11-01118/article_deploy/electronics-11-01118.pdf#page=10) 与 [ADI MT-008 式 (3)](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=4) | 理想 ÷2 使相噪下降 20log₁₀2≈6.02 dB。论文报告 −112.5 到 −118.5 dBc/Hz 的读数，课程沿用理想换算的符号。弧度抖动除以载波角频率换算为时间。 |

### 纯文本行内公式复核（第二批）

| 页面 | 行内关系 | 方式和验算 |
|---|---|---|
| B1-2 | 100 MHz、R=2、N=80、D=4，输出 1 GHz | 逐级得到 PFD 50 MHz、VCO 4 GHz、输出 1 GHz。 |
| C2-1 | 40 MHz 参考、N=125 对应 5 GHz | 40 MHz × 125 = 5 GHz。 |
| C3-3 | 15 GHz、200 MHz PFD 对应整数 N=75 | 15 GHz / 200 MHz = 75。SNAU210B 表 3 提供设计工况。 |
| D3-1 | 2.1 GHz 载波、10 MHz 参考经 R=10，第一对参考杂散在 2099/2101 MHz | 比较频率为 1 MHz，载波两侧各偏移 1 MHz，与 AN143 图 3 的读图口径一致。 |
| E1-1 | 240、240、240、241 的平均分频为 240.25 | 求和为 961，除以 4 得 240.25。 |
| E1-2 | DEN=16 时，NUM=4、5、0 的余量周期分别为 4、16、1 拍 | 分别除以 gcd(4,16)、gcd(5,16)、gcd(0,16) 得到。零输入虽有单拍周期，常值波形没有该序列的非直流音调。 |
| F1-2 | 40 MHz、N=125 给 5 GHz，4 µs 保持窗约含 160 个参考周期 | 目标由锁定比得到，时窗换算用 25 ns 比较周期。入带边界仍按样点时刻与频差门限共同判定。 |
| F1-3 | 5.8 GHz 的公布 FoM 约 −202.8 dB | 1 MHz 偏移的载波比项 20log₁₀(1 MHz / 5.8 GHz)≈−75.27 dB，8 mW 归一项约 +9.03 dB。加上 −116.6 dBc/Hz 得 −202.84 dB。 |

### 纯文本行内公式复核（第三批）

| 页面 | 行内关系 | 方式和验算 |
|---|---|---|
| C1-3 | 10 µA 峰值换算控制端纹波 | 单一正弦峰峰值为 2Ipk·abs(Z)。无并联电容时约 20.02 mVpp，20 pF 时约 3.87 mVpp。 |
| D1-1 | 平坦连续噪声在 100 倍等效带宽下增加 20 dB | 对积分功率比取 10log₁₀(100)。孤立纯音的合计功率在演示里保持 −88 dBc。 |
| D2-2 | 理想分频的相噪和时间抖动 | 相位与载波频率同除 M。相噪降低 20log₁₀M，时间抖动由相位除载波角频率所得，两次分频因子抵消。 |
| E4-1 | 5 GHz 对应 200 ps，16 码的饱和阈值为 16 LSB | 取 1/(5 GHz)。5 ps 步长时，码 15 自 75 ps 开始，达到 80 ps 时进入超量程。 |
| E4-2 | N+3/8 的第一拍若只数 N 圈，则提前 3/8 周期 | 取理想计数与实际计数之差，乘 200 ps 得 75 ps 的正补偿需求。 |
| F1-3 | 4.8 GHz 经理想 ÷2 到 2.4 GHz | −112.4903−20log₁₀2≈−118.51 dBc/Hz。与论文结论一致，原文图 12(a) 仍是分频前读数。 |
| F1-3 | 直出工况 36.2648 mrad 换算时间 RMS | 0.0362648/(2π·5.8 GHz)≈0.995 ps。 |
| F1-3 | VCO 截图中两个频偏的标记差 | 1 MHz 处 −127.82−(−117.37)=−10.45 dB，100 kHz 处按正文给出的两位小数差约 +3.75 dB。 |

### 纯文本行内公式复核（第四批）

| 页面 | 行内关系 | 方式和验算 |
|---|---|---|
| A1-3 | 连续相噪与离散谱线读数 | 连续单边谱密度除以载波功率后以 1 Hz 归一，报 dBc/Hz。离散线直接报总功率相对于载波的 dBc。 |
| A2-2 | 参考频率较高时，未包裹的参考减反馈相位持续上升 | 每 1 kHz 频差在 1 ms 累积 1 圈，初始相位额外相加。 |
| C2-1 | 串联电阻给出 VCTRL 瞬时台阶 | 理想电容电压连续；100 µA 的单向泵电流阶跃乘 4.7 kΩ，得到 0.47 V 的电阻压降。 |
| C2-3 | 模相位折返与累计整圈位移 | 模相位 ±0.5 圈跨界即可能折返；本页教学计数以相对于上一次整数基准的完整一圈位移更新。 |
| C3-2 | T 与 S 度量的是复数，和等于 1 | 代入 T=L/(1+L)、S=1/(1+L)，同分母相加。VCO 端参考传递还需乘 N。 |
| C3-4 | 频率阶跃的归一化传递仍为 T | 零初始扰动下，两端相位同时乘 s 得角频率，因子相消。 |
| D1-2 | 白噪声区与近载波闪烁区斜率 | 线性谱密度按频偏的 −2、−3 次幂变化时，频偏每增加十倍分别下降 20、30 dB。 |
| D3-3 | 漏电流增十倍的参考杂散幅度 | 固定其余工况，窄带 FM 边带幅比与漏电流成正比，20log₁₀(10)=20 dB。 |
| E3-1 | 小数相位与 rad 换算 | 余下时间除以 DCO 周期得到圈数，整数计数与该数相加，再乘 2π 换为 rad。 |
