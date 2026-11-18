# PLL-S1-06 回归记录

52 页侧栏和前后翻页断言通过，6 个课程 JS 文件通过 Node 语法检查。

本地资源路径异常 0 项。

线上已有 31/52 页打开与刷新通过，另外 21 页缺浏览器运行证据。线上复核沿用原计数。

2026-11-19 的[离线 Chromium 实测](https://github.com/thecloud723/analog-ic-learning/actions/runs/44351994846)使用本地文件并屏蔽外部网络。在 1440×900 与 390×844 各打开并刷新 52/52 页。104 次页面检查通过主标题、活动目录、横向溢出、非延迟图片和 JS 异常断言。两种视口各有 40 个滑块触发结果变化。旧版第 02～18 章的 17 条 #p8 深链均打开正确面板并经刷新保持。线上全页刷新、旧版第 01 章专用锚点以及未由滑块覆盖的交互仍需取证。

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
