# PLL A 原教材来源映射 V2

> 状态：六页 Source-First 内容重排已完成；公共素材清理和最终集成验收进行中。初始审计基线为 GitHub main 41b3444f46878f65d6769aa6f951572ec7d149d0；A1.3 页面提交 d368e848050e4c22c7bd54f38bb07aed54985751。  
> 规范：[Source-First SDD V2](PLL_A_SOURCE_FIRST_SDD_V2_2026-11-19.md)、[A1–A2 内容清单](PLL_A1_A2_CONTENT_CHECKLIST_2026-11-19.md)、[编辑规范](PLL_SOURCE_FIRST_COURSE_EDITORIAL_SPEC_2026-11-19.md)。交互与模型依据：[Classroom SDD V1](PLL_A_CLASSROOM_SDD_2026-11-19.md)。

## 许可核验规则

- JKU RFIC 开放课程及源码仓库声明 Apache-2.0。本轮逐个核对 Fig.74–81、83 的 Quarto 源文件头，均含 Apache-2.0 许可头；未见这些图的源码注明第三方素材。页面保留 JKU、作者团队、原课程链接、图号、许可证，并注明中文翻译/改编；这不是对课程中所有素材的概括性法律意见。
- TI 官方版权条款允许个人非商业下载、打印和保存，但未授权进一步展示、复制或分发。SNAU210B Fig.5-1 使用官方 PDF 定位链接与原创中文读图说明，不嵌入仓库中的 PNG 副本。
- ADI MT-008、ADF4351 和 AN-143 图像的公开再发布授权未核实；本仓库不保留其图像副本，页面只用官方 PDF/文章链接、准确图号/页码和独立中文摘要。
- 数据手册图上的 marker 可作为注明来源的事实读数；TI 图内 RMS jitter、积分带宽等仪器读数只按原图工况引用，不能从四个 marker 重算或宣称为本页实验结果。

## 逐页来源与内容安排

| 页面 | 原始来源与精确位置 | 仓库素材/许可 | 页面处理方式 | 关联交互 |
|---|---|---|---|---|
| A1.1 整机组成 | JKU §7.1 Fig.74；正文给出锁定频率关系 f_out=N·f_ref（无公式编号）。图锚点：https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html#fig-pll-block-diagram。产品对照：ADI ADF4351 Rev.G Fig.1，PDF p.1。 | JKU 原图 pll/assets/originals/jku/fig_074.png，Apache-2.0，源文件 _fig_pll_block_diagram.qmd。ADF4351 PNG 属受限手册图，不作嵌入；只链接官方 PDF。 | 正文前部嵌入 JKU Fig.74 原图，逐块翻译 Reference/PD/LPF/VCO/Feedback Divider。中文导读 ADF4351 Fig.1，强调产品 RF 输出 ÷D 与环路反馈 ÷N 是两条路径。公式标明：无前置 R 分频时 f_VCO=N·f_PFD；产品输出 f_RFOUT=f_VCO/D 是产品拓扑补充。 | 保留可点击 PLL 框图、Guided Tour、R/N/D 频率链和 Reset。 |
| A1.2 锁定前后 | JKU §7.1 Fig.76、Eq.62–64：简单 PD+一阶 LPF+VCO Type-I 小信号闭环；§7.2 Fig.83、Eq.67–69：PFD/CP/环路滤波器 Type-II 结构。锚点 #fig-pll-block-diagram-s-domain、#fig-pfd-cp-pll。 | 原图 fig_076.png、fig_083.png；对应 QMD _fig_pll_block_diagram_s_domain.qmd、_fig_pfd_cp_pll.qmd，Apache-2.0。 | 两张原图与 Type-I/Type-II 标签并列；按原式摘录两组公式。注明 JKU 环路方程 K_VCO 单位 rad/(s·V)，与模型 Hz/V 相差 2π。现有三曲线是本课程简化二阶 Type-II 近锁行为模型，不是 Eq.62–64 数值仿真，不含大信号捕获。 | 保留三曲线同步示波器、时间游标、Play/Pause/Step/Reset、频率/控制电压/相位读数。 |
| A1.3 相噪读图 | TI LMX2594EVM SNAU210B Rev.B Fig.5-1，PDF p.6，14-GHz output；图旁说明参考输入须很干净（如 100-MHz Wenzel oscillator），普通信号发生器不够干净。ADI MT-008 Fig.1 PDF p.1、Fig.3 p.2、Fig.4 p.3、Eq.2–3 p.4。 | TI/ADI 位图已从网页和仓库副本移除；图表与公式仅以官方链接定位。TI 四个 Marker 是明示数据值，不托管原图。 | 先讲来源原图的载波、log 频偏轴与 SSB dBc/Hz，再用 MathML 摘录 ADI Eq.2–3。说明积分变量 A 是指定频带积分后的功率 dBc；离散 spur dBc 不等价于 dBc/Hz。四个 marker 以离散点核对，不连接、不插值；不以这四点计算 RMS jitter。 | 保留 Marker 选择、数值显示、单位概念切换、Reset、Predict/Check。
| A2.1 时间差到相位差 | JKU §7.1 Fig.75 后、Eq.62 前的原始关系 Δφ=2π·Δt/T_ref 与 V_error=K_PD·Δφ（均无编号）。 | 原式可按 Apache-2.0 整理；Fig.75 原图 fig_075.png 可按教学需要使用，但不作为当前必需图，避免遮住核心比例公式。 | 首先呈现 JKU 原式和紧邻链接，再用 MathML 说明变量、单位和正负号。页面约定 Δt=t_FB−t_REF、Δφ=φ_REF−φ_FB；这是本课程符号约定，不是 JKU 原文正负定义。100 MHz/40 ps 算例为 +1.44°。 | 保留双边沿拖动、固定时间/固定相位模式、相位圆盘、实时读数和 Reset。 |
| A2.2 频差积分 | JKU §6.7 “Oscillator Modelling”的 ω_VCO(t) 与 φ_VCO(t) 积分式（无编号）；§7.1 相位与角频率导数关系（无编号）。Fig.73 展示 VCO 超额相位积分器。 | 公式/图源 Apache-2.0。目标仓库未找到 fig_073.png；页面使用课程原式和 Fig.73 原文定位链接，不以自绘替代原图。 | 原式与本课程推导分开标识。Δφ(t)=Δφ(0)+2π∫Δf dτ 是从相位导数关系得到的本课程关系式，不是 JKU 编号公式。正频差积分到未包裹相位；[-0.5,0.5) cycle 仅是显示坐标，不等同 Cycle Slip。 | 保留未包裹/模相位双曲线、共享时间游标、Play/Pause/Step/Reset。 |
| A2.3 PFD 逐事件 | JKU §7.2 Fig.77 双 DFF/复位；Fig.78 REF 领先；Fig.79 FB 领先；Fig.80 同相同频；Fig.81 大频差，单周期可短暂反向而平均指示减速；Fig.83 为 CP-PLL 对照。锚点 #fig-pfd-implementation、#fig-pfd-diagram1..4、#fig-pfd-cp-pll。 | pll/assets/originals/jku/fig_077.png、fig_078.png…fig_081.png、fig_083.png；源 QMD _fig_pfd_implementation.qmd、_fig_pfd_diagram1..4.qmd、_fig_pfd_cp_pll.qmd，Apache-2.0。 | 正文先呈现 Fig.77 电路及 Fig.78–81 原图组，再逐图中文解释边沿先后、锁存与 reset、UP/DN 方向及平均频差。本课程 t_UP≈Δt+t_reset 仅限理想 REF-leading 案例，不说成 JKU 通用解析式。 | 保留单次事件状态机、多周期频差实验、UP/DN 脉宽、Play/Step/Reset。 |

## 仓库级受限图片审计

2026-11-19 对所有 73 个 HTML 文件检索 `pll/assets/originals/{adi,ti}/` 引用。发现 A1.3、旧第 1/11/12/13/18 章以及课程 D1.1/D1.3/D3.1 共 9 个页面引用 TI/ADI 位图。已将旧页面中的图片位替换为出版方官方链接与中文读图摘要；本次清理已从 Pages 可访问目录移除 10 个运行时位图及 `materials/pll/originals/` 下 6 个归档副本。未引用、来源定位未核实的旧孤立副本也删除，不把它们继续当作可发布教材素材。提交后对全仓库 HTML 和树路径复查无受限图片路径引用或文件残留。

TI 原图保留在 TI 官方 PDF：Fig.5-1 的具体数据/测量前提见 A1.3；旧第 11 章引用 SNAA336A Fig.2-2（PDF p.6，fSM=200 MHz）作为校准示例。ADI ADF4351、AN-143、MT-008 均仅链接官方来源。清理不更改其余课程的交互逻辑。

## 核心公式/事实交叉核验

- JKU §7.1 原式明确为 Δφ=2π·Δt/T_ref、V_error=K_PD·Δφ。JKU 称 Δt 为到达时间差；正负号由本课程声明。
- JKU §6.6 指出数据手册 K_VCO 的 Hz/V 值转换为环路方程角频率灵敏度时需乘 2π；当前 A1.2 模型内部使用 Hz/V。
- JKU §7.1 Fig.76 只有一个环路积分器，定义为 Type-I；Eq.62–64 适用于锁定点小信号与连续时间近似，不能引用为现有 Type-II 曲线推导。§7.2 Eq.67–69 在忽略 C3 时得到二阶 CP-PLL 响应；Fig.83 保留 C3 时环路滤波器为三阶。
- TI Fig.5-1 纵轴是 SSB phase noise（dBc/Hz），横轴为 offset frequency；载波 14.000028900 GHz。Marker：10 kHz −105.1543、100 kHz −108.0194、1 MHz −116.4369、10 MHz −141.5219 dBc/Hz。图内 RMS jitter 53.169 fs 是 TI 原测量设置读数，不是由四个 marker 重算。
- ADI MT-008 Fig.1 是载波/1-Hz 带宽相噪定义示意；Fig.3 位于 PDF p.2，展示 dBc/Hz 对 log 频偏的概念斜率；Fig.4 位于 p.3，展示积分；Eq.2–3 位于 p.4，完成 RMS phase/time jitter 换算，与 TI LMX2594EVM 实测数据无关。

## 源链接

- [JKU RFIC §6.7–§7.2](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html)
- [JKU PLL slide：Fig.74–81、83](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html)
- [JKU Oscillator slide：§6.7/Fig.73](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html)
- [JKU 源码许可](https://github.com/iic-jku/radio-frequency-integrated-circuits/blob/main/LICENSE)
- [TI SNAU210B Rev.B Fig.5-1, PDF p.6](https://www.ti.com/lit/ug/snau210b/snau210b.pdf#page=6)
- [TI copyright terms](https://www.ti.com/legal/terms-conditions/copyright.html)
- [ADI MT-008 Fig.1, PDF p.1](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=1)
- [ADI MT-008 Fig.3, PDF p.2](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=2)
- [ADI MT-008 Fig.4, PDF p.3](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=3)
- [ADI MT-008 Eq.2–3, PDF p.4](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=4)
- [ADI ADF4351 Datasheet Fig.1, PDF p.1](https://www.analog.com/media/en/technical-documentation/data-sheets/ADF4351.pdf#page=1)

## 实施阶段待关闭

1. 六页 HTML 回读，核对图旁链接、MathML、章节文字和交互次序。
2. A1.3 明确图中 marker 可视化性质，不把插值曲线称为原始测量。
3. 已将旧 PLL 引用改为官方链接；提交后复查全仓库不再请求/托管 TI/ADI 图片，并同步材料清单。
4. 浏览器确认 JKU 原图清晰，检查桌面/手机/离线行为。
5. 未实测的视觉、部署和离线项目写为未验证，不能用静态字符串测试替代。
