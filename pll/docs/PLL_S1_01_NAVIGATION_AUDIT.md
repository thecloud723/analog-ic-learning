# PLL-S1-01 新版课程入口与导航审计

审计基线为 GitHub main 的 `64bdee560eeded5380efd6018e17c8b951f46ff1`。检查使用该提交的干净检出。

- 根目录 PLL 卡片和 PLL README 已指向 A1.1。`pll/course/index.html` 也指向 A1.1，并提供手动入口。
- 下表按 A1.1 的侧栏顺序列出 A–F 50 页与 2 个附录。静态检查逐页比较侧栏顺序、展开组、当前页标记、浏览器标题与正文标题、前后翻页目标。跨组和附录边界均通过。
- 对 52 页的本地 HTML 链接、片段、资源路径进行存在性检查，发现失效项 0。
- 旧版 18 个文件仍在。旧第 1 章采用具名片段，第 2–18 章均有 `#p1` 至 `#p8` 对应元素。旧版 URL 按原路径保留。
- **验收待完成**。云端 Chrome 逐页打开后刷新，31/52 页确认正文可见且当前页标记正确。其余 21 页遇到浏览器打开或 URL 策略错误，尚无通过证据。移动端目录操作和历史深链显示仍待运行验收。下面的“通过”仅指源码检查。

| 新版页面 | 源码导航检查 |
|---|---|
| [A1.1整机由哪些模块组成](../course/a1-1.html) | 通过 |
| [A1.2锁之前与锁之后](../course/a1-2.html) | 通过 |
| [A1.3第一张相噪图怎么读](../course/a1-3.html) | 通过 |
| [A2.1时间差怎样变成相位差](../course/a2-1.html) | 通过 |
| [A2.2频差怎样积成相位差](../course/a2-2.html) | 通过 |
| [A2.3PLL 第一次怎么纠偏](../course/a2-3.html) | 通过 |
| [B1.1晶体为什么能做参考](../course/b1-1.html) | 通过 |
| [B1.2一张表算清频率链](../course/b1-2.html) | 通过 |
| [B1.3选 PFD 频率会牵动什么](../course/b1-3.html) | 通过 |
| [B2.1RO 一圈的相位与延迟](../course/b2-1.html) | 通过 |
| [B2.2Tank 储能与损耗](../course/b2-2.html) | 通过 |
| [B2.3差分负阻如何启动 LC](../course/b2-3.html) | 通过 |
| [B3.1Varactor 与 VCO 增益](../course/b3-1.html) | 通过 |
| [B3.2粗细调和开关电容](../course/b3-2.html) | 通过 |
| [B3.3PVT 下还有多少调谐余量](../course/b3-3.html) | 通过 |
| [C1.1XOR 鉴相与双 DFF PFD](../course/c1-1.html) | 通过 |
| [C1.2CP 脉冲如何给电容充电](../course/c1-2.html) | 通过 |
| [C1.3RC 为什么有零点与额外极点](../course/c1-3.html) | 通过 |
| [C1.4锁定后为什么还有纹波](../course/c1-4.html) | 通过 |
| [C2.1跟踪一轮完整闭环](../course/c2-1.html) | 通过 |
| [C2.2从初始频差到近锁](../course/c2-2.html) | 通过 |
| [C2.3怎样在波形里辨认 Cycle Slip](../course/c2-3.html) | 通过 |
| [C2.4锁定时间取决于怎样判定](../course/c2-4.html) | 通过 |
| [C3.1电路怎样变成相位域模型](../course/c3-1.html) | 通过 |
| [C3.2Type-I / Type-II 与 T、S](../course/c3-2.html) | 通过 |
| [C3.3把实装 EVM 滤波器放进 Bode 图](../course/c3-3.html) | 通过 |
| [C3.4用小阶跃理解环路频响](../course/c3-4.html) | 通过 |
| [D1.1从载波两侧读懂 SSB 相噪](../course/d1-1.html) | 通过 |
| [D1.2Tank 为什么给出相噪斜率](../course/d1-2.html) | 通过 |
| [D1.3从相噪曲线算 RMS jitter](../course/d1-3.html) | 通过 |
| [D1.4LO 相噪怎样让邻道阻塞进入带内](../course/d1-4.html) | 通过 |
| [D2.1噪声从哪个节点进环路](../course/d2-1.html) | 通过 |
| [D2.2倍频与分频后怎么读相噪](../course/d2-2.html) | 通过 |
| [D2.3核对 EVM 实测曲线与测试条件](../course/d2-3.html) | 通过 |
| [D3.1为什么会隔一个 PFD 频率长出谱线](../course/d3-1.html) | 通过 |
| [D3.2把 VCTRL 纹波换算成边带](../course/d3-2.html) | 通过 |
| [D3.3用实测检查 CP 漏电模型](../course/d3-3.html) | 通过 |
| [E1.1整数分频怎样得到小数平均](../course/e1-1.html) | 通过 |
| [E1.2为什么分数分频会有 Spur](../course/e1-2.html) | 通过 |
| [E2.1一阶累加器怎样把 0.3 变成进位](../course/e2-1.html) | 通过 |
| [E2.2MASH 1-1-1 如何抵消前两级误差](../course/e2-2.html) | 通过 |
| [E2.3Dither 打散谱线要付出什么](../course/e2-3.html) | 通过 |
| [E3.1走一遍 ADPLL 数字闭环](../course/e3-1.html) | 通过 |
| [E3.2为什么积分会存住频率修正](../course/e3-2.html) | 通过 |
| [E4.1TDC 读出什么](../course/e4-1.html) | 通过 |
| [E4.2DTC 的数字延迟码从哪里来](../course/e4-2.html) | 通过 |
| [E4.3DCO 增益怎样做两点校准](../course/e4-3.html) | 通过 |
| [F1.1复核公开 EVM 的配置和结果](../course/f1-1.html) | 通过 |
| [F1.2改环路参数时，指标会怎样变化](../course/f1-2.html) | 通过 |
| [F1.3怎样读论文里的硅片结果](../course/f1-3.html) | 通过 |
| [附.1怎样选仿真与频谱设置](../course/app-1.html) | 通过 |
| [附.2从网页数据点追到可复跑实验](../course/app-2.html) | 通过 |

## 旧 18 章到新版的迁移映射

依据新版实际页面主题和既有逐页方案核对。拆分迁移表示新版覆盖该章主线，旧版案例、页签和历史 URL 继续保留。

| 旧章 | 新版去向 | 迁移状态 | 对应范围 |
|---|---|---|---|
| [01](../chapters/01_PLL用途与系统全景.html) | [A1.1](../course/a1-1.html)、[A1.2](../course/a1-2.html)、[A1.3](../course/a1-3.html) | 拆分迁移 | 整机、锁定前后与第一次读相噪图 |
| [02](../chapters/02_频率相位时间差与锁定.html) | [A2.1](../course/a2-1.html)、[A2.2](../course/a2-2.html)、[C2.4](../course/c2-4.html) | 拆分迁移 | 相位与时间差、频差积累及锁定判据 |
| [03](../chapters/03_从开环到闭环.html) | [A2.3](../course/a2-3.html)、[C2.1](../course/c2-1.html)、[C3.4](../course/c3-4.html) | 拆分迁移 | 纠偏、闭环路径及阶跃响应 |
| [04](../chapters/04_PLL架构地图.html) | [A1.1](../course/a1-1.html)、[E1.1](../course/e1-1.html)、[E3.1](../course/e3-1.html) | 拆分迁移 | 整机框图、分数分频与数字闭环。旧版架构总览保留供横向比较 |
| [05](../chapters/05_参考源与时钟输出链.html) | [B1.1](../course/b1-1.html)、[B1.2](../course/b1-2.html)、[B1.3](../course/b1-3.html) | 拆分迁移 | 晶体、参考与输出频率链及 PFD 频率选择 |
| [06](../chapters/06_PD_PFD相位与频率比较.html) | [C1.1](../course/c1-1.html)、[A2.3](../course/a2-3.html) | 拆分迁移 | XOR、双 DFF PFD 及边沿纠偏 |
| [07](../chapters/07_Charge_Pump与Loop_Filter.html) | [C1.2](../course/c1-2.html)、[C1.3](../course/c1-3.html)、[C1.4](../course/c1-4.html) | 拆分迁移 | 净电荷、RC 零极点及锁定纹波 |
| [08](../chapters/08_VCO与DCO可控振荡器.html) | [B2.1](../course/b2-1.html)、[B2.2](../course/b2-2.html)、[B2.3](../course/b2-3.html)、[B3.1](../course/b3-1.html)、[B3.2](../course/b3-2.html)、[E4.3](../course/e4-3.html) | 拆分迁移 | RO、LC 起振、调谐、粗细调及 DCO 校准 |
| [09](../chapters/09_完整CP_PLL动态.html) | [C2.1](../course/c2-1.html)、[C2.2](../course/c2-2.html)、[C2.3](../course/c2-3.html)、[C2.4](../course/c2-4.html) | 拆分迁移 | 闭环路径、捕获、周跳和锁定判据 |
| [10](../chapters/10_相位域模型与Type_I_II.html) | [C3.1](../course/c3-1.html)、[C3.2](../course/c3-2.html)、[C3.3](../course/c3-3.html)、[C3.4](../course/c3-4.html) | 拆分迁移 | 相位域、环路类型、Bode 及阶跃 |
| [11](../chapters/11_瞬态响应稳定性与锁定时间.html) | [C2.2](../course/c2-2.html)、[C2.3](../course/c2-3.html)、[C2.4](../course/c2-4.html)、[C3.3](../course/c3-3.html)、[C3.4](../course/c3-4.html) | 拆分迁移 | 捕获、周跳、锁定时间及稳定性 |
| [12](../chapters/12_Phase_Noise与Jitter.html) | [D1.1](../course/d1-1.html)、[D1.2](../course/d1-2.html)、[D1.3](../course/d1-3.html)、[D2.1](../course/d2-1.html)、[D2.2](../course/d2-2.html)、[D2.3](../course/d2-3.html) | 拆分迁移 | 相噪定义、斜率、积分、噪声传递及实测 |
| [13](../chapters/13_Spur非线性与PVT.html) | [B3.3](../course/b3-3.html)、[D3.1](../course/d3-1.html)、[D3.2](../course/d3-2.html)、[D3.3](../course/d3-3.html) | 拆分迁移 | PVT 调谐余量及参考杂散。完整 PVT 验证留待后续阶段 |
| [14](../chapters/PLL_第14章_Integer-N与Fractional-N.html) | [B1.2](../course/b1-2.html)、[E1.1](../course/e1-1.html)、[E1.2](../course/e1-2.html) | 拆分迁移 | 整数频率链、平均分频及分数杂散 |
| [15](../chapters/PLL_第15章_Sigma-Delta_MASH与Dither.html) | [E2.1](../course/e2-1.html)、[E2.2](../course/e2-2.html)、[E2.3](../course/e2-3.html) | 拆分迁移 | 一阶累加器、MASH 与 Dither |
| [16](../chapters/PLL_第16章_ADPLL结构与数字PI.html) | [E3.1](../course/e3-1.html)、[E3.2](../course/e3-2.html) | 拆分迁移 | ADPLL 闭环与数字 PI |
| [17](../chapters/PLL_第17章_TDC_DTC与DCO校准.html) | [E4.1](../course/e4-1.html)、[E4.2](../course/e4-2.html)、[E4.3](../course/e4-3.html) | 拆分迁移 | TDC、DTC 与 DCO 校准 |
| [18](../chapters/PLL_第18章_完整系统设计与指标.html) | [F1.1](../course/f1-1.html)、[F1.2](../course/f1-2.html)、[F1.3](../course/f1-3.html)、[D2.3](../course/d2-3.html)、[APP.1](../course/app-1.html)、[APP.2](../course/app-2.html) | 拆分迁移 | 评估板、模型、硅片数据及仿真复现。旧版整机指标汇总保留供参考 |
