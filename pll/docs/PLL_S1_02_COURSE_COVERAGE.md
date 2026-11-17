# PLL-S1-02 新版逐页覆盖矩阵

依据提交 `82405539febb893b5e3b18a49b312f6fc8fcbd33` 的正文和控件盘点。公式列列出源码中独立的 TeX 公式，正文行内关系保留在原页。交互列记录源码中的实验标识、输入控件和按钮。来源审计见 S1-03 / S1-04，运行验收见 S1-06。

| 页面 | 教学内容 | 独立公式 | 交互与控件 |
|---|---|---|---|
| [A1-1 整机由哪些模块组成](../course/a1-1.html) | 沿参考边沿走一圈，找出频率在哪改变、比较发生在哪里。 改一次分频比；在芯片框图里找这条回路 | `f_{\mathrm{VCO}}=N f_{\mathrm{PFD}}` | ratio；反馈分频 N |
| [A1-2 锁之前与锁之后](../course/a1-2.html) | 用三条同步波形观察 PLL 如何校正一小段初始频差。  | 无独立 TeX 公式，行内关系见正文 | settle；反映到输出端的初始频差（kHz） |
| [A1-3 第一张相噪图怎么读](../course/a1-3.html) | 从频谱上的载波出发，学会报出相噪频偏、数值和单位。 在实测读数中找频偏 | 无独立 TeX 公式，行内关系见正文 | noise；频偏 10 kHz100 kHz1 MHz10 MHz |
| [A2-1 时间差怎样变成相位差](../course/a2-1.html) | 先用 100 MHz 和 40 ps 算一遍，再改变边沿间隔。  | `\Delta\phi=360^\circ\frac{\Delta t}{T}` | delay；反馈边沿相对参考（ps） |
| [A2-2 频差怎样积成相位差](../course/a2-2.html) | 比较一直差一段时间与每周期都多走一点。  | `\phi_{\mathrm e}(t)=\phi_{\mathrm e}(0)+2\pi\int_0^t\Delta f(\tau)\,\mathrm d\tau` | ramp；参考减反馈频率（kHz） |
| [A2-3 PLL 第一次怎么纠偏](../course/a2-3.html) | 用一对边沿预测 UP/DN，并看频率变化怎样影响下一次反馈。  | `\Delta f_{\mathrm{VCO}}\approx K_{\mathrm{VCO}}\Delta V_{\mathrm{CTRL}}` | edge；lead |
| [B1-1 晶体为什么能做参考](../course/b1-1.html) | 改变负载，看频率往哪移 | `f_{\mathrm s}=\frac{1}{2\pi\sqrt{L_{\mathrm m}C_{\mathrm m}}}`；`f_0\approx f_{\mathrm s}\left[1+\frac{C_{\mathrm m}}{2(C_0+C_{\mathrm L})}\right]` | crystal；等效负载 Cₗ（pF） |
| [B1-2 一张表算清频率链](../course/b1-2.html) | 通用整数-N 频率链；TI LMX2594 的频率链；公开评估板的默认配置 | `f_{\mathrm{PD}}=\frac{f_{\mathrm{REF}}}{R},\qquad f_{\mathrm{VCO}}=N f_{\mathrm{PD}},\qquad f_{\mathrm{CLK}}=\frac{f_{\mathrm{VCO}}}{D}`；`f_{\mathrm{PD}}=\frac{f_{\mathrm{OSC}}\times\mathrm{OSC\_2X}\times\mathrm{MULT}}{\mathrm{PLL\_R\_PRE}\times\mathrm{PLL\_R}}`；`f_{\mathrm{VCO}}=f_{\mathrm{PD}}\left(N+\frac{\mathrm{NUM}}{\mathrm{DEN}}\right)`；`f_{\mathrm{RFoutA}}=\frac{f_{\mathrm{VCO}}}{\mathrm{CHDIV}}\quad(\mathrm{OUTA\_MUX}=\text{Channel Divider})` | 无源码中显式控件 |
| [B1-3 选 PFD 频率会牵动什么](../course/b1-3.html) |  | `N=\frac{f_{\mathrm{target}}}{f_{\mathrm{PFD}}}\in\mathbb Z` | plan；参考分频 R、反馈分频 N |
| [B2-1 RO 一圈的相位与延迟](../course/b2-1.html) |  | `f\approx\frac{1}{2Nt_{\mathrm d}}` | ring；级数 3579、单级延迟（ps） |
| [B2-2 Tank 储能与损耗](../course/b2-2.html) | 同一时刻读两条曲线 | `f_0=\frac{1}{2\pi\sqrt{LC}}`；`\frac{E(t)}{E_0}\approx e^{-\omega_0t/Q}`；`\frac{A(t)}{A_0}\approx e^{-\omega_0t/(2Q)}` | tank；品质因数 Q |
| [B2-3 差分负阻如何启动 LC](../course/b2-3.html) | 同一电路，改变串联损耗 | `R_{\mathrm{neg}}\approx-\frac{2}{g_{\mathrm m}},\qquad \frac{g_{\mathrm m}}{2}>\frac{1}{R_{\mathrm p}}` | startup；电感串联损耗 2.2 Ω3.3 Ω18 Ω |
| [B3-1 Varactor 与 VCO 增益](../course/b3-1.html) | 从 VCO-01 读固定电容扫点 | `\frac{\mathrm df}{\mathrm dC}=-\frac{f}{2C}`；`K_{\mathrm{VCO}}=\frac{\mathrm df}{\mathrm dV}=\frac{\mathrm df}{\mathrm dC}\frac{\mathrm dC}{\mathrm dV}` | capSweep；固定电容 680 fF810 fF970 fF |
| [B3-2 粗细调和开关电容](../course/b3-2.html) | 看看相邻频段能不能连上 | `\Delta f\approx-\frac{f}{2C}\Delta C` | bank；相邻档位增加的电容（fF）、细调电容范围（fF） |
| [B3-3 PVT 下还有多少调谐余量](../course/b3-3.html) | 给不同曲线放上同一条目标线 | `V_{\mathrm{margin}}=\min\!\left(V_{\mathrm{lock}}-V_{\min},\,V_{\max}-V_{\mathrm{lock}}\right)` | margin；教学频率平移（MHz） |
| [C1-1 XOR 鉴相与双 DFF PFD](../course/c1-1.html) |  | `D_{\mathrm{XOR}}=\frac{&#124;\Delta\phi&#124;}{\pi},\qquad \overline{V}_{\mathrm{XOR}}=V_{\mathrm{DD}}D_{\mathrm{XOR}},\qquad &#124;\Delta\phi&#124;\leq\pi` | pfd；边沿条件 REF 领先FB 领先同相FB 频率偏低、复位延迟（ns） |
| [C1-2 CP 脉冲如何给电容充电](../course/c1-2.html) | 在 ADF4351 手册上找到测点 | `\Delta Q=\int(i_{\mathrm{UP}}-i_{\mathrm{DN}})\,\mathrm dt,\qquad \Delta V_C=\frac{\Delta Q}{C}` | cp；下拉电流偏小 0%5%10%、滤波电容 5 pF10 pF20 pF |
| [C1-3 RC 为什么有零点与额外极点](../course/c1-3.html) | 实装网络多了什么 | `Z_{\mathrm s}(s)=R+\frac{1}{sC},\qquad Z(s)=\frac{Z_{\mathrm s}(s)}{1+sC_{\mathrm p}Z_{\mathrm s}(s)}` | rc；并联电容 移除5 pF20 pF |
| [C1-4 锁定后为什么还有纹波](../course/c1-4.html) |  | `\int_{t}^{t+T_{\mathrm{ref}}}i_C(\tau)\,\mathrm d\tau=0,\qquad V_{\mathrm{pp}}=V_{\max}-V_{\min}` | ripple；下拉电流偏小 0%5%10%、滤波电容 5 pF10 pF20 pF |
| [C2-1 跟踪一轮完整闭环](../course/c2-1.html) |  | `\frac{\mathrm d\phi_{\mathrm{VCO}}}{\mathrm dt}=2\pi f_{\mathrm{VCO}}(t),\qquad \phi_{\mathrm{FB}}=\frac{\phi_{\mathrm{VCO}}}{N}` | events；VCO 初始频偏（MHz）、教学 VCO 增益 70 MHz/V100 MHz/V130 MHz/V |
| [C2-2 从初始频差到近锁](../course/c2-2.html) |  | `f_{\mathrm{VCO}}=5\,\mathrm{GHz}+\Delta f_0+K_{\mathrm{VCO}}\bigl(V_{\mathrm{CTRL}}-0.9\,\mathrm V\bigr)` | capture；VCO 初始频偏（MHz）、教学 VCO 增益 70 MHz/V100 MHz/V130 MHz/V |
| [C2-3 怎样在波形里辨认 Cycle Slip](../course/c2-3.html) |  | `e_{\mathrm{wrap}}=e-\left\lfloor e+\tfrac12\right\rfloor` | slip；VCO 初始频偏（MHz）、教学 VCO 增益 70 MHz/V100 MHz/V130 MHz/V |
| [C2-4 锁定时间取决于怎样判定](../course/c2-4.html) |  | `&#124;\Delta f[k]&#124;\leq \Delta f_{\mathrm{tol}}\quad\text{for all samples in the dwell window}` | lock；VCO 初始频偏（MHz）、教学 VCO 增益 70 MHz/V100 MHz/V130 MHz/V、频差门限（kHz）、保持时间（µs） |
| [C3-1 电路怎样变成相位域模型](../course/c3-1.html) |  | `L(s)=\frac{I_{\mathrm{CP}}}{2\pi}\,Z(s)\,\frac{2\pi K_{\mathrm{VCO}}}{s}\,\frac{1}{N}` | 无源码中显式控件 |
| [C3-2 Type-I / Type-II 与 T、S](../course/c3-2.html) |  | `T=\frac{L}{1+L}=\frac{\omega_n^2+2\zeta\omega_ns}{s^2+2\zeta\omega_ns+\omega_n^2},\qquad S=\frac{1}{1+L}=\frac{s^2}{s^2+2\zeta\omega_ns+\omega_n^2}` | ts；阻尼 ζ |
| [C3-3 把实装 EVM 滤波器放进 Bode 图](../course/c3-3.html) |  | `Y_{\mathrm{CP}}=sC_1+\frac{1}{R_2+1/(sC_2)},\qquad Z_{\mathrm{out}}=\frac{1}{(1+sR_4C_4)Y_{\mathrm{CP}}+sC_4}` | bode；曲线 开环幅度开环相位归一化闭环幅度 |
| [C3-4 用小阶跃理解环路频响](../course/c3-4.html) |  | `Y(s)=\frac{T(s)}{s}\quad\text{for a unit step}` | step；阻尼 ζ |
| [D1-1 从载波两侧读懂 SSB 相噪](../course/d1-1.html) |  | `\mathcal L_{\mathrm{dBc/Hz}}(f)=10\log_{10}\frac{S_{\mathrm{side}}(f)}{P_{\mathrm c}},\qquad P_{\mathrm{noise,dBc}}\approx\mathcal L_{\mathrm{dBc/Hz}}+10\log_{10}\frac{B_{\mathrm{ENBW}}}{1\,\mathrm{Hz}}` | ssb；等效噪声带宽 10 Hz100 Hz1 kHz、random、tone |
| [D1-2 Tank 为什么给出相噪斜率](../course/d1-2.html) |  | `\mathcal L_{\mathrm{lin}}(\Delta f)=\frac{kTFR_{\mathrm p}}{V_{\mathrm p}^{2}}\left(\frac{f_0}{Q\Delta f}\right)^2,\qquad R_{\mathrm p}=\frac{Q}{2\pi f_0C}` | osc；Tank Q、峰值摆幅（V）、噪声因子 F |
| [D1-3 从相噪曲线算 RMS jitter](../course/d1-3.html) |  | `\sigma_t=\frac{\sqrt{2\int_{f_1}^{f_2}10^{\mathcal L_{\mathrm{dBc/Hz}}(f)/10}\,\mathrm df}}{2\pi f_0}` | rms；积分频带 12 kHz–20 MHz1 kHz–10 MHz100 kHz–20 MHz、载波 5 GHz14 GHz |
| [D1-4 LO 相噪怎样让邻道阻塞进入带内](../course/d1-4.html) |  | `P_{\mathrm{RM,dBm}}\approx P_{\mathrm{block,dBm}}+\mathcal L_{\mathrm{dBc/Hz}}(\Delta f)+10\log_{10}\frac{B}{1\,\mathrm{Hz}}` | mixing；阻塞功率（dBm）、该频偏处 LO 相噪（dBc/Hz）、接收等效带宽 100 kHz1 MHz10 MHz |
| [D2-1 噪声从哪个节点进环路](../course/d2-1.html) |  | `S_{\phi,\mathrm{out}}=&#124;NT&#124;^2\bigl(S_{\phi,\mathrm{REF}}+S_{\phi,\mathrm{FB}}+S_{\phi,\mathrm{CP\text{-}eq}}\bigr)+&#124;S&#124;^2S_{\phi,\mathrm{VCO}}` | transfer；二阶模型自然频率（kHz）、noise-ref、noise-vco、noise-cp、noise-fb |
| [D2-2 倍频与分频后怎么读相噪](../course/d2-2.html) |  | `\mathcal L_{\mathrm{out}}=\mathcal L_{\mathrm{in}}-20\log_{10}M,\qquad \frac{\phi/M}{2\pi(f_0/M)}=\frac{\phi}{2\pi f_0}` | divider；输出分频 ÷1÷2÷4÷8÷16 |
| [D2-3 核对 EVM 实测曲线与测试条件](../course/d2-3.html) |  | `\varepsilon_{\mathrm{dB}}=\mathcal L_{\mathrm{interp}}(f)-\mathcal L_{\mathrm{marker}}(f)` | readEvm；留下一个实测标记检查插值 10 kHz100 kHz1 MHz10 MHz |
| [D3-1 为什么会隔一个 PFD 频率长出谱线](../course/d3-1.html) |  | `f_{\mathrm{spur}}=f_{\mathrm c}\pm k f_{\mathrm{PFD}},\qquad \mathrm{Spur}_{\mathrm{dBc}}=10\log_{10}\frac{P_{\mathrm{spur}}}{P_{\mathrm c}}` | spurLoc；PFD 频率 0.5 MHz1 MHz1.25 MHz |
| [D3-2 把 VCTRL 纹波换算成边带](../course/d3-2.html) |  | `\beta_1=\frac{K_{\mathrm{VCO}}V_{\mathrm{1,pk}}}{f_{\mathrm{PFD}}},\qquad \mathrm{Spur}_{1,\mathrm{dBc}}\approx 20\log_{10}\!\left(\frac{\beta_1}{2}\right)\quad(\beta_1\ll1)` | cpSpur；电流失配 0%5%10%、电容 5 pF10 pF20 pF、VCO 调谐增益（MHz/V） |
| [D3-3 用实测检查 CP 漏电模型](../course/d3-3.html) |  | `\mathrm{Spur}_{1,\mathrm{dBc}}\approx20\log_{10}\!\left(\frac{K_{\mathrm{VCO}}I_{\mathrm{leak}}&#124;H_{\mathrm{post}}&#124;}{2\pi C_{\mathrm P}f_{\mathrm{PFD}}^2}\right),\quad &#124;H_{\mathrm{post}}&#124;=\frac{1}{\sqrt{1+(2\pi f_{\mathrm{PFD}}R_{\mathrm{P2}}C_{\mathrm{P2}})^2}}` | leakage；滤波器类型 无源有源、注流 5 nA10 nA25 nA50 nA100 nA1000 nA |
| [E1-1 整数分频怎样得到小数平均](../course/e1-1.html) |  | `f_{\mathrm{VCO}}=f_{\mathrm{PFD}}\left(N+\frac{\mathrm{NUM}}{\mathrm{DEN}}\right),\qquad \Delta f_{\mathrm{VCO}}=\frac{f_{\mathrm{PFD}}}{\mathrm{DEN}}` | fractional；NUM（DEN=16） |
| [E1-2 为什么分数分频会有 Spur](../course/e1-2.html) |  | `P=\frac{\mathrm{DEN}}{\gcd(\mathrm{NUM},\mathrm{DEN})},\qquad f_k=k\frac{f_{\mathrm{PFD}}}{P}` | pattern；NUM（DEN=16） |
| [E2-1 一阶累加器怎样把 0.3 变成进位](../course/e2-1.html) |  | `y[n]=x[n]+r[n-1]-r[n],\qquad \mathrm{NTF}(z)=1-z^{-1}` | firstOrder；输入分子（分母=10） |
| [E2-2 MASH 1-1-1 如何抵消前两级误差](../course/e2-2.html) |  | `y[n]=c_1[n]+\Delta c_2[n]+\Delta^2c_3[n]=x[n]-\Delta^3r_3[n],\quad \Delta=1-z^{-1}` | mashView；输入码（模数=16） |
| [E2-3 Dither 打散谱线要付出什么](../course/e2-3.html) |  | `P[k]=\frac{2\left&#124;\mathrm{DFT}\{w[n](y[n]-\bar y)\}[k]\right&#124;^2}{L\sum_n w[n]^2},\qquad 0<k<L/2` | ditherView；定点字长 6 bit8 bit10 bit12 bit |
| [E3-1 走一遍 ADPLL 数字闭环](../course/e3-1.html) |  | `\Phi_{\mathrm{ref}}[k+1]=\Phi_{\mathrm{ref}}[k]+\mathrm{FCW},\qquad e[k]=\Phi_{\mathrm{ref}}[k]-\left(C[k]+\frac{t_{\mathrm{frac}}[k]}{T_{\mathrm{DCO}}}\right)` | walk；FCW（圈/参考拍） 16.016.216.4、查看第几拍 |
| [E3-2 为什么积分会存住频率修正](../course/e3-2.html) |  | `I[k]=I[k-1]+K_i e[k],\qquad u[k]=K_p e[k]+I[k],\qquad \Phi_{\mathrm{fb}}[k+1]-\Phi_{\mathrm{fb}}[k]=f_{\mathrm{free}}T_{\mathrm s}+K_{\mathrm{DCO}}T_{\mathrm s}\,u[k-d]` | pi；附加延迟 0 拍1 拍3 拍、积分增益 Ki、观察拍号 |
| [E4-1 TDC 读出什么](../course/e4-1.html) |  | `q=\min\!\left(15,\left\lfloor\frac{t}{\Delta_t}\right\rfloor\right),\qquad \widehat\phi_{\mathrm{frac}}=\frac{q\Delta_t}{T_{\mathrm{DCO}}},\qquad \sigma_t\approx\frac{\Delta_t}{\sqrt{12}}` | tdc；延迟单元 2 ps5 ps8 ps、输入间隔（ps） |
| [E4-2 DTC 的数字延迟码从哪里来](../course/e4-2.html) |  | `t_{\mathrm{need}}[k]=r[k]T_{\mathrm{VCO}},\qquad d[k]=\operatorname{clip}_{[0,31]}\!\left(\operatorname{round}\frac{t_{\mathrm{need}}[k]}{\Delta_{\mathrm{DTC}}}\right)` | dtc；NUM/8 1/83/85/87/8、DTC 单码延迟（ps） |
| [E4-3 DCO 增益怎样做两点校准](../course/e4-3.html) |  | `\widehat K_{\mathrm{DCO}}=\frac{f(b)-f(a)}{b-a},\qquad c_{\mathrm{new}}=\operatorname{clip}_{[0,63]}\!\left(a+\operatorname{round}\frac{\Delta f}{\widehat K_{\mathrm{DCO}}}\right)` | calibrate；线性增益漂移（%）、相对码 10 的目标频差（MHz）、控制使用 标称 2 MHz/码两点校准 |
| [F1-1 复核公开 EVM 的配置和结果](../course/f1-1.html) | 换一颗芯片做配置验收 | 无独立 TeX 公式，行内关系见正文 | fDesign；验收表取数 实装两节点 RC仅保留 R2–C2 |
| [F1-2 改环路参数时，指标会怎样变化](../course/f1-2.html) | 把 VCO 调谐和 CP 非理想项放进同一条环路 | 无独立 TeX 公式，行内关系见正文 | fSystem、fCoupled；VCO 增益 70 MHz/V100 MHz/V130 MHz/V、CP 失配 0%5%10%、滤波电容 5 pF10 pF20 pF、初始频偏 −80 MHz−40 MHz0 MHz+40 MHz+80 MHz、下拉电流偏小 5%匹配10%、PFD 复位延迟 0.5 ns0 ns1 ns |
| [F1-3 怎样读论文里的硅片结果](../course/f1-3.html) | 1. 先在框图上找清楚量的是哪一路；2. 用调谐图和 VCO 噪声图分别回答两个问题；3. 在仪器截图里读闭环相噪与 RMS jitter；4. 把 Table 1 变成可比较的测量记录；动手复核 | `\sigma_t=\frac{\sigma_\phi}{2\pi f_0},\qquad \mathcal L_{\mathrm{out}}=\mathcal L_{\mathrm{in}}-20\log_{10}M` | 无源码中显式控件 |
| [APP-1 怎样选仿真与频谱设置](../course/app-1.html) |  | `\Delta f=\frac{1}{T_\mathrm{obs}}` | fFft；记录长度（µs）、时窗 矩形Hann |
| [APP-2 从网页数据点追到可复跑实验](../course/app-2.html) |  | 无独立 TeX 公式，行内关系见正文 | fInspect；CP 失配 0%5%10%、滤波电容 5 pF10 pF20 pF、下载当前稳态波形 CSV |
