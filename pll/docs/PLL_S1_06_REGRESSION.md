# PLL-S1-06 回归记录

52 页侧栏和前后翻页断言通过，6 个课程 JS 文件通过 Node 语法检查。

本地资源路径异常 0 项。

初次抽查时线上 31/52 页已有证据。随后已完成双视口线上 104/104 与离线 104/104 检查，当前证据见末尾。

2026-11-19 的[离线 Chromium 实测](https://github.com/thecloud723/analog-ic-learning/actions/runs/44351994846)使用本地文件并屏蔽外部网络。在 1440×900 与 390×844 各打开并刷新 52/52 页。104 次页面检查通过主标题、活动目录、横向溢出、非延迟图片和 JS 异常断言。两种视口各有 40 个滑块触发结果变化。旧版第 02～18 章的 17 条 #p8 深链均打开正确面板并经刷新保持。这些后续检查的实测结果见下文。

| 页面 | 输入、选择和按钮数 | 实验标识 |
|---|---|---|
| [A1-1](../course/a1-1.html) | 1 | ratio |
| [A1-2](../course/a1-2.html) | 1 | settle |
| [A1-3](../course/a1-3.html) | 1 | noise |
| [A2-1](../course/a2-1.html) | 1 | delay |
| [A2-2](../course/a2-2.html) | 1 | ramp |
| [A2-3](../course/a2-3.html) | 2 | edge |
| [B1-1](../course/b1-1.html) | 1 | crystal |
| [B1-2](../course/b1-2.html) | 0 |  |
| [B1-3](../course/b1-3.html) | 2 | plan |
| [B2-1](../course/b2-1.html) | 2 | ring |
| [B2-2](../course/b2-2.html) | 1 | tank |
| [B2-3](../course/b2-3.html) | 1 | startup |
| [B3-1](../course/b3-1.html) | 1 | capSweep |
| [B3-2](../course/b3-2.html) | 2 | bank |
| [B3-3](../course/b3-3.html) | 1 | margin |
| [C1-1](../course/c1-1.html) | 2 | pfd |
| [C1-2](../course/c1-2.html) | 2 | cp |
| [C1-3](../course/c1-3.html) | 1 | rc |
| [C1-4](../course/c1-4.html) | 2 | ripple |
| [C2-1](../course/c2-1.html) | 2 | events |
| [C2-2](../course/c2-2.html) | 2 | capture |
| [C2-3](../course/c2-3.html) | 2 | slip |
| [C2-4](../course/c2-4.html) | 4 | lock |
| [C3-1](../course/c3-1.html) | 0 |  |
| [C3-2](../course/c3-2.html) | 1 | ts |
| [C3-3](../course/c3-3.html) | 1 | bode |
| [C3-4](../course/c3-4.html) | 1 | step |
| [D1-1](../course/d1-1.html) | 3 | ssb |
| [D1-2](../course/d1-2.html) | 3 | osc |
| [D1-3](../course/d1-3.html) | 2 | rms |
| [D1-4](../course/d1-4.html) | 3 | mixing |
| [D2-1](../course/d2-1.html) | 5 | transfer |
| [D2-2](../course/d2-2.html) | 1 | divider |
| [D2-3](../course/d2-3.html) | 1 | readEvm |
| [D3-1](../course/d3-1.html) | 1 | spurLoc |
| [D3-2](../course/d3-2.html) | 3 | cpSpur |
| [D3-3](../course/d3-3.html) | 2 | leakage |
| [E1-1](../course/e1-1.html) | 1 | fractional |
| [E1-2](../course/e1-2.html) | 1 | pattern |
| [E2-1](../course/e2-1.html) | 1 | firstOrder |
| [E2-2](../course/e2-2.html) | 1 | mashView |
| [E2-3](../course/e2-3.html) | 1 | ditherView |
| [E3-1](../course/e3-1.html) | 2 | walk |
| [E3-2](../course/e3-2.html) | 3 | pi |
| [E4-1](../course/e4-1.html) | 2 | tdc |
| [E4-2](../course/e4-2.html) | 2 | dtc |
| [E4-3](../course/e4-3.html) | 3 | calibrate |
| [F1-1](../course/f1-1.html) | 1 | fDesign |
| [F1-2](../course/f1-2.html) | 6 | fSystem, fCoupled |
| [F1-3](../course/f1-3.html) | 0 |  |
| [APP-1](../course/app-1.html) | 2 | fFft |
| [APP-2](../course/app-2.html) | 3 | fInspect |

[第二次浏览器运行](https://github.com/thecloud723/analog-ic-learning/actions/runs/44352270772)补证第 01 章 #quiz，18/18 条旧章代表深链通过。线上共 104 次页面检查，103 次通过。桌面 C1.3 的请求记录有 HTTP 错误，页面最终渲染通过，需复跑确认状态码和稳定性。

[第三次回归](https://github.com/thecloud723/analog-ic-learning/actions/runs/44352573992)线上与离线均全通过。同一浏览器分别以 1440×900、390×844 打开并刷新线上课程各 52 页，C1.3 桌面复跑无 HTTP 错误。两种来源合计 208 次页面检查，旧章代表深链 18/18。交互断言覆盖两个视口各 40 个滑块，其他控件和真实触屏设备未纳入本次运行。

[扩展交互回归](https://github.com/thecloud723/analog-ic-learning/actions/runs/44362373390)在桌面和手机视口分别验证 89 个控件的结果变化，含下拉框、复选框、单选组、滑块和画布响应。线上和屏蔽外部网络的本地文件模式均通过。附录 2 的 CSV 在四种来源/视口组合均成功下载，列名、500 行有限数值和 2 ns 时间间隔校验通过。该证据覆盖控件响应与 CSV 格式，逐交互物理方向和全部边界值仍需核对。

[物理响应回归](https://github.com/thecloud723/analog-ic-learning/actions/runs/44374517555)新增 6 页、每种来源/视口组合 17 条断言，共 68 条通过。A1.1 用 N=100/150 验证输出 4/6 GHz 且分频反馈不变，A2.1 验证 −2500/0/+2500 ps 得 −90/0/+90°，A2.2 验证负、零、正频差，A2.3 验证领先边沿切换 UP/DN，D2.2 验证五档理想分频的相噪改善和等效时间抖动，E1.1 验证 NUM=0/15 的平均分频、周期和 VCO 频率。初次运行的 D2.2/E1.1 失败来自脚本读取了错误的结果元素，修正后通过。其余页面的物理方向和边界值仍待取证。

[第二批物理响应回归](https://github.com/thecloud723/analog-ic-learning/actions/runs/44383974923)新增 13 个页面。覆盖锁前 VCTRL 正负偏差、晶体拉频、整数频率规划、LC 起振与调谐、RC 跨阻、互补传递函数、RBW 和杂散、分数序列栅格、TDC 饱和与 DCO 限幅。累计 19 页、196 条断言在桌面与模拟手机视口、线上与离线四种组合全部通过。

[边界与旧实验复跑](https://github.com/thecloud723/analog-ic-learning/actions/runs/44384500978)通过 320 次滑块上下限检查，覆盖 40 个滑块、两种视口与两种打开方式，未出现非有限读数。旧第 05 章 #p7 与第 18 章 #p2 的实验均在离线刷新后重新计算通过，输出分别为 400.00 MHz 和 2.0125 GHz。上一轮线上有一次图片请求返回 HTTP 503，本轮全量复跑通过，该图片独立请求返回 200。

[第三批数值回归](https://github.com/thecloud723/analog-ic-learning/actions/runs/44395097182)验证 49 页的主交互，线上和离线双视口共通过 416 条断言。覆盖 PFD 首个边沿与纠偏方向、低失配 CP、频偏与控制电压方向、入带和整圈位移、振荡噪声与泄漏斜率、MASH 和 ADPLL、FFT 窗长和导出元数据。C2.2 另加理想模型的电压/电流未限幅说明。

[冻结基线回归](https://github.com/thecloud723/analog-ic-learning/actions/runs/44395905337)完成 52 页双视口线上和离线刷新，共 208 次。老版 18 章共 144 个页签深链均在离线刷新后打开对应面板，11 个原版交互复跑通过。新版 49 个交互页的 50 个实验共通过 420 条数值/方向断言，40 个滑块共通过 320 次上下限检查。离线强制解码了每视口全部 41 处图片引用，包括延迟加载图；CSV 4/4 导出通过。F1.2 耦合交互在固定初始频偏的测试中复现了 36.025 µs 与 24.325 µs 两种入带结果。手机使用 Chromium 窄屏视口。
