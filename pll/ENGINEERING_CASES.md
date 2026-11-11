# PLL 课程 01–10：工程案例补充版 · 变更与核对记录

## 刷新范围
- 第 01 章：ADF4351 的完整系统功能分区、产品规格与主信号路径。
- 第 05 章：商业参考与输出链，增加 ADF4351 频率规划实算。
- 第 06 章：可编程 Anti-backlash pulse、PFD 结构、CP 失配与小误差量级。
- 第 08 章：公开 65nm LC-DCO 的 PVT/ACQ/TRK；TI VCO Core/Capcode/Bias；电流调节 RO；多 Bank 预测实验；非线性与测试指标。
- 第 09 章：产品级 Frequency Calibration、Fast Lock、持续闭环和 Lock Detect；区分校准时间、锁定时间、ready。
- 第 02、03、04、07、10 章：保留前版，未声称进行了工程扩写。

## 资料与版权
- Biereigel 等, Electronics 2021 10(22) 2741, Figure 3/4/7: CC BY 4.0；本教材用结构复绘示意并提供原文图链接，非 PDF 原图截取。
- Analog Devices ADF4351 Datasheet (2017), Figure 1/18: 仅引用技术定义并独立绘制便于跟线的教学示意，不直接再分发商业数据手册图像。
- TI SNAA336A (2021), Figure 1-4: 参考产品的七个 VCO Core、Capcode 与 bias 分类，曲线以定性图呈现；不是原产品量测曲线。
- 原数学公式继续保留内嵌的离线 SVG，新加公式也已预渲染 SVG。

## 模型边界
- LC Bank 频率实验是教学用局部线性模型，未采用论文真实完整频率-码表；PVT 真实 coarse bank 非均匀阶梯。
- RO 电流延迟模型只适用于具有电流限幅机制的延迟单元，实际频率对电流并非严格线性。
- PFD ABP 的 CP 电荷公式是理想匹配附近的近似，需注意对应真实器件的脉冲及复位定义。
- VCO Core/CAP 图为定性示意，未将虚构的频率斜率说成真实产品测量。
- 工业实际电路信息均只涉及公开出版物/产品资料，不包含内部型号或模块命名。