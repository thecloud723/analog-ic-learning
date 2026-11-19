# PLL A 原教材来源映射 V2

> 状态：Phase 0 来源核验完成；页面重排进行中。基线：GitHub main 41b3444f46878f65d6769aa6f951572ec7d149d0（2026-11-19，Asia/Shanghai）。  
> 规范：[Source-First SDD V2](PLL_A_SOURCE_FIRST_SDD_V2_2026-11-19.md)、[A1–A2 内容清单](PLL_A1_A2_CONTENT_CHECKLIST_2026-11-19.md)、[编辑规范](PLL_SOURCE_FIRST_COURSE_EDITORIAL_SPEC_2026-11-19.md)。交互与模型依据：[Classroom SDD V1](PLL_A_CLASSROOM_SDD_2026-11-19.md)。

## 许可核验规则

- JKU RFIC 开放课程及源码仓库声明 Apache-2.0。本轮逐个核对 Fig.74–81、83 的 Quarto 源文件头，均含 Apache-2.0 许可头；未见这些图的源码注明第三方素材。页面保留 JKU、作者团队、原课程链接、图号、许可证，并注明中文翻译/改编；这不是对课程中所有素材的概括性法律意见。
- TI 官方版权条款允许个人非商业下载、打印和保存，但未授权进一步展示、复制或分发。SNAU210B Fig.5-1 使用官方 PDF 定位链接与原创中文读图说明，不嵌入仓库中的 PNG 副本。
- ADI MT-008 与 ADF4351 数据手册标注版权/保留权利；未找到当前 GitHub Pages 可直接再发布原图的明确授权。页面只用官方 PDF 链接、准确图号/页码和中文摘要。
- 数据手册图上的 marker 可作为注明来源的事实读数；TI 图内 RMS jitter、积分带宽等仪器读数只按原图工况引用，不能从四个 marker 重算或宣称为本页实验结果。

## 逐页来源与内容安排

| 页面 | 原始来源与精确位置 | 仓库素材/许可 | 页面处理方式 | 关联交互 |
|---|---|---|---|---|
| A1.1 整机组成 | JKU §7.1 Fig.74；正文给出锁定频率关系 f_out=N·f_ref（无公式编号）。图锚点：https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html#fig-pll-block-diagram。产品对照：ADI ADF4351 Rev.G Fig.1，PDF p.1。 | JKU 原图 pll/assets/originals/jku/fig_074.png，Apache-2.0，源文件 _fig_pll_block_diagram.qmd。ADF4351 PNG 属受限手册图，不作嵌入；只链接官方 PDF。 | 正文前部嵌入 JKU Fig.74 原图，逐块翻译 Reference/PD/LPF/VCO/Feedback Divider。中文导读 ADF4351 Fig.1，强调产品 RF 输出 ÷D 与环路反馈 ÷N 是两条路径。公式标明：无前置 R 分频时 f_VCO=N·f_PFD；产品输出 f_RFOUT=f_VCO/D 是产品拓扑补充。 | 保留可点击 PLL 框图、Guided Tour、R/N/D 频率链和 Reset。 |
| A1.2 锁定前后 | JKU §7.1 Fig.76、Eq.62–64：简单 PD+一阶 LPF+VCO Type-I 小信号闭环；§7.2 Fig.83、Eq.67–69：PFD/CP/环路滤波器 Type-II 结构。锚点 #fig-pll-block-diagram-s-domain、#fig-pfd-cp-pll。 | 原图 fig_076.png、fig_083.png；对应 QMD _fig_pll_block_diagram_s_domain.qmd、_fig_pfd_cp_pll.qmd，Apache-2.0。 | 两张原图与 Type-I/Type-II 标签并列；按原式摘录两组公式。注明 JKU 环路方程 K_VCO 单位 rad/(s·V)，与模型 Hz/V 相差 2π。现有三曲线是本课程简化二阶 Type-II 近锁行为模型，不是 Eq.62–64 数值仿真，不含大信号捕获。 | 保留三曲线同步示波器、时间游标、Play/Pause/Step/Reset、频率/控制电压/相位读数。 |
| A1.3 相噪读图 | TI LMX2594EVM SNAU210B Rev.B Fig.5-1，PDF p.6，14-GHz output；ADI MT-008 Fig.1 PDF p.1、Fig.3/4 PDF p.3。 | TI/ADI 现有 PNG 为手册图拷贝，没有可在 Pages 公开再发布的明确授权；六页不嵌入。链接：ti.com/lit/ug/snau210b/snau210b.pdf#page=6；analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=1 和 #page=3。 | TI 主图以官方链接定位，原创中文讲解 log offset 横轴和 SSB L(f) 的 dBc/Hz 纵轴；marker 数值注明 Fig.5-1、14 GHz 和干净 100 MHz 外部参考工况。ADI 内容只摘要解释载波、单位带宽归一化和积分到 jitter；不把 ADI 示意图当 TI 实测。dBc 与 dBc/Hz 不可互换；教学 marker 图如插值，明确标成教学示意，非原始测量。 | 保留四个原 marker 选择、数值显示、读图预测/检查。 |
| A2.1 时间差到相位差 | JKU §7.1 Fig.75 后、Eq.62 前的原始关系 Δφ=2π·Δt/T_ref 与 V_error=K_PD·Δφ（均无编号）。 | 原式可按 Apache-2.0 整理；Fig.75 原图 fig_075.png 可按教学需要使用，但不作为当前必需图，避免遮住核心比例公式。 | 首先呈现 JKU 原式和紧邻链接，再用 MathML 说明变量、单位和正负号。页面约定 Δt=t_FB−t_REF、Δφ=φ_REF−φ_FB；这是本课程符号约定，不是 JKU 原文正负定义。100 MHz/40 ps 算例为 +1.44°。 | 保留双边沿拖动、固定时间/固定相位模式、相位圆盘、实时读数和 Reset。 |
| A2.2 频差积分 | JKU §6.7 “Oscillator Modelling”的 ω_VCO(t) 与 φ_VCO(t) 积分式（无编号）；§7.1 相位与角频率导数关系（无编号）。Fig.73 展示 VCO 超额相位积分器。 | 公式/图源 Apache-2.0。目标仓库未找到 fig_073.png；页面使用课程原式和 Fig.73 原文定位链接，不以自绘替代原图。 | 原式与本课程推导分开标识。Δφ(t)=Δφ(0)+2π∫Δf dτ 是从相位导数关系得到的本课程关系式，不是 JKU 编号公式。正频差积分到未包裹相位；[-0.5,0.5) cycle 仅是显示坐标，不等同 Cycle Slip。 | 保留未包裹/模相位双曲线、共享时间游标、Play/Pause/Step/Reset。 |
| A2.3 PFD 逐事件 | JKU §7.2 Fig.77 双 DFF/复位；Fig.78 REF 领先；Fig.79 FB 领先；Fig.80 同相同频；Fig.81 大频差，单周期可短暂反向而平均指示减速；Fig.83 为 CP-PLL 对照。锚点 #fig-pfd-implementation、#fig-pfd-diagram1..4、#fig-pfd-cp-pll。 | pll/assets/originals/jku/fig_077.png、fig_078.png…fig_081.png、fig_083.png；源 QMD _fig_pfd_implementation.qmd、_fig_pfd_diagram1..4.qmd、_fig_pfd_cp_pll.qmd，Apache-2.0。 | 正文先呈现 Fig.77 电路及 Fig.78–81 原图组，再逐图中文解释边沿先后、锁存与 reset、UP/DN 方向及平均频差。本课程 t_UP≈Δt+t_reset 仅限理想 REF-leading 案例，不说成 JKU 通用解析式。 | 保留单次事件状态机、多周期频差实验、UP/DN 脉宽、Play/Step/Reset。 |

## 核心公式/事实交叉核验

- JKU §7.1 原式明确为 Δφ=2π·Δt/T_ref、V_error=K_PD·Δφ。JKU 称 Δt 为到达时间差；正负号由本课程声明。
- JKU §6.6 指出数据手册 K_VCO 的 Hz/V 值转换为环路方程角频率灵敏度时需乘 2π；当前 A1.2 模型内部使用 Hz/V。
- JKU §7.1 Fig.76 只有一个环路积分器，定义为 Type-I；Eq.62–64 适用于锁定点小信号与连续时间近似，不能引用为现有 Type-II 曲线推导。§7.2 Eq.67–69 在忽略 C3 时得到二阶 CP-PLL 响应；Fig.83 保留 C3 时环路滤波器为三阶。
- TI Fig.5-1 纵轴是 SSB phase noise（dBc/Hz），横轴为 offset frequency；载波 14.000028900 GHz。Marker：10 kHz −105.1543、100 kHz −108.0194、1 MHz −116.4369、10 MHz −141.5219 dBc/Hz。图内 RMS jitter 53.169 fs 是 TI 原测量设置读数，不是由四个 marker 重算。
- ADI MT-008 Fig.1 是载波/噪声功率密度定义示意；Fig.3 展示相噪对频偏的表达；Fig.4 示意指定带宽内积分换算 jitter，与 TI LMX2594EVM 实测数据无关。

## 源链接

- [JKU RFIC §6.7–§7.2](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html)
- [JKU PLL slide：Fig.74–81、83](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/pll.html)
- [JKU Oscillator slide：§6.7/Fig.73](https://iic-jku.github.io/radio-frequency-integrated-circuits/slides/oscillator.html)
- [JKU 源码许可](https://github.com/iic-jku/radio-frequency-integrated-circuits/blob/main/LICENSE)
- [TI SNAU210B Rev.B Fig.5-1, PDF p.6](https://www.ti.com/lit/ug/snau210b/snau210b.pdf#page=6)
- [TI copyright terms](https://www.ti.com/legal/terms-conditions/copyright.html)
- [ADI MT-008 Fig.1, PDF p.1](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=1)
- [ADI MT-008 Fig.3–4, PDF p.3](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=3)
- [ADI ADF4351 Datasheet Fig.1, PDF p.1](https://www.analog.com/media/en/technical-documentation/data-sheets/ADF4351.pdf#page=1)

## 实施阶段待关闭

1. 六页 HTML 回读，核对图旁链接、MathML、章节文字和交互次序。
2. A1.3 明确图中 marker 可视化性质，不把插值曲线称为原始测量。
3. 从 A1.1/A1.3 移除受限 ADI/TI 图片；同步材料清单并检查旧页面遗留引用。
4. 浏览器确认 JKU 原图清晰，检查桌面/手机/离线行为。
5. 未实测的视觉、部署和离线项目写为未验证，不能用静态字符串测试替代。
