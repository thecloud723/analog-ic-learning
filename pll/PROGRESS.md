# PLL 课程制作与技术验收记录（01～13 章）

## 本批范围（2026-11-11）
- 新增第 11～13 章，每章 8 个页签，共 24 个教学页签。
- 累计 13 章、104 个页签；第 14～18 章保留为待制作目录。
- 第 11 章：二阶瞬态、阻尼/超调/调节时间、相位裕量、带宽、Lock Time 定义、Cycle Slip、TI 理论与实测锁定时间案例。
- 第 12 章：相位噪声定义、SSB L(f)、Leeson 模型、PLL 噪声传递函数、积分相噪、Jitter 类型、测量仪器与条件；实验采用一阶互补低通/高通权重分别表示参考路径与 VCO 路径，叠加后积分。
- 第 13 章：噪声与 Spur 区别、Reference Spur 机制、CP 失配/漏电/馈通、FM 边带估算、非线性、供电耦合、PVT 与校准。

## 本批关键公式与假设
- 二阶欠阻尼阶跃响应采用标准二阶系统形式；2% 调节时间使用包络近似 `t_s ≈ 4/(ζω_n)`，仅用于主导二阶模型。
- 相位裕量按增益交越处 `PM = 180° + ∠L(jω_c)`（负相位约定）。PM 与 ζ 的关系依赖具体环路结构，未写成普适换算。
- Cycle Slip 作为非线性离散事件处理；连续线性模型不用于直接预测滑移次数。
- SSB 相噪积分采用 `σφ² = 2∫10^(L(f)/10)df` 的单边带小相位噪声约定；必须给出积分上下限。
- RMS 时间抖动由 `σ_t = σφ/(2πf_0)` 转换。
- Spur 小调制指数近似采用 `β=Δf_pk/f_m`、`Pspur≈20log10(β/2)`；仅适用于单音小指数 FM。
- CP 误差电荷模型用于展示因果链，不替代完整环路滤波器阻抗及周期脉冲谐波分析。

## 真实工程资料
- TI, *PLL Performance, Simulation, and Design*, 4th ed.：Transient Response、Cycle Slips、Lock Time measured-vs-theory、非理想因素。
- ADI, AN-1067：相噪与 Jitter 的定义、频域/时域测量、仪器限制及实验数据。
- ADI, AN143：Reference Spur、Anti-Backlash pulse、CP leakage、LTC6945 2.1 GHz 测试频谱。
- TI SSZTB85：环路带宽对 Jitter、Phase Noise、Lock Time、Spurs 的取舍。
- IIT Madras, Spur Reduction in Wideband PLLs：CP pulse 与参考杂散的工程机制。
- Tsinghua A-SSCC 2019：数字 CP leakage calibration 的实际芯片案例（摘要报告约 25 dB Reference Spur 抑制）。

## 交互模型边界
- 第 11 章为标准二阶闭环教学模型，不包括真实 PFD 事件、CP rail saturation、VCO tuning range、附加极点及数字 LOCK qualification。
- 第 12 章使用教学用分段相噪曲线进行数值积分；环路带宽交越是概念模型，不是完整 CP-PLL 噪声仿真。
- 第 13 章将 CP mismatch/leakage 折算成等效周期电荷，再估算电压和频偏；未用完整 Z(s) 计算 Spur，因此明确标注为近似因果实验。

## 浏览器验收
- 每章 8 个页签，答案内置；实验滑块需先完成预测题才能启用。
- 数学公式构建期渲染为内嵌 MathJax SVG，离线可用；正文变量使用语义化 HTML 下标。
- 桌面/手机布局、页签切换、公式显示、曲线刷新、题目判题及文件链接需经 Playwright 验收后交付。


## 本批浏览器交互检查补充
- 第 11～13 章均为 8 个页签、8 个面板，MathJax 预渲染 SVG 已嵌入。
- 使用 Chromium 对 1365 px、390 px、320 px 视口进行页面内容加载检查；无 JavaScript pageerror，页面整体无横向溢出。
- 全部页签切换后仅显示一个面板；预测题能显示内置答案，提交后解锁对应滑块；三个实验均能刷新结果。
- 边界参数专项检查：ζ=1 的临界阻尼响应无 NaN；积分区间扩大时相噪积分正常更新；大调制指数时停止使用小指数 Spur 近似并显示模型范围提示。
- 第 10→11→12→13 章链接及 11/12/13 章侧栏链接已更新；第 13 章下一章按钮保持待制作状态。

## GitHub 导入记录（2026-11-11）
- 第 01–13 章 HTML 已正式导入 `thecloud723/analog-ic-learning` 的 `main` 分支。
- 专题入口：`pll/index.html`；章节目录：`pll/chapters/`。
- 每章保留独立 HTML，公式 SVG、样式和交互代码内嵌；外部链接仅用于参考资料。
- 配套进度、工程案例、资料来源与数学符号修订记录已归档。
