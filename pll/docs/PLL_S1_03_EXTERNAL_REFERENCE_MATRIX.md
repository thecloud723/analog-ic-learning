# PLL-S1-03 外部资料对照

审计基线为 main 提交 `ce41d39`。以 A–F 的正文链接为现有证据。主题相关但正文未直接引用的资料列为参照。

| 来源 | 主题 | 新版对应 | 后续核对 |
|---|---|---|---|
| JKU RFIC | PLL 框图、参考链、整数分频 | [A1.1](../course/a1-1.html)、[B1.2](../course/b1-2.html) | 核对公式和图注的锚点 |
| JKU RFIC | 振荡器、PFD/CP、闭环、MASH、ADPLL | B2–B3、C1–C3、E2–E3，具体链接见下表 | 标明从开环模型到闭环应用的条件 |
| TI SNAU210B | TICS Pro 频率链与评估板环路滤波 | [B1.2](../course/b1-2.html)、[C3.3](../course/c3-3.html) | 将器件频点示例和计算模型的覆盖范围写清 |
| TI SNAA106C | 带宽、噪声、切换时间和 Fastlock 权衡 | C2、C3、D2 是对应教学主题 | Fastlock 与 Cycle Slip Reduction 的定量实例可参照 [第 32 章](https://www.ti.com/lit/ml/snaa106c/snaa106c.pdf) |
| ADI MT-008 | 相噪积分、RMS jitter | [D1.3](../course/d1-3.html) | 核对积分边界、单边谱和单位 |
| ADI AN143 | 漏电导致的参考杂散 | [D3.3](../course/d3-3.html) | 公式索引注明模型假设与实测工况 |
| Razavi | 抖动和相噪、RF 频率综合、数字 PLL | D1–D2、E1、E3 为主题参照 | 新版正文未找到出版社链接，暂只建立章节级参照，不填未经核对的页码 |

[Razavi 第 2 章](https://www.cambridge.org/highereducation/books/design-of-cmos-phase-locked-loops/0F328C818F3735C72DC6DD5557E42D07/introduction-to-jitter-and-phase-noise/403F6BDE20AF3E10FCCFC598E4103F99) · [RF Synthesis](https://www.cambridge.org/highereducation/books/design-of-cmos-phase-locked-loops/0F328C818F3735C72DC6DD5557E42D07/rf-synthesis/AD22257EED12D40B2E17C104FA883271) · [Digital PLL](https://www.cambridge.org/highereducation/books/design-of-cmos-phase-locked-loops/0F328C818F3735C72DC6DD5557E42D07/digital-phase-locked-loops/AC956AB51730AA7B560AB0779489AEEA)

## 新版实际引用

| 来源 | 正文链接 | 页面 |
|---|---|---|
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-adpll-block-diagram) | [E3-1](../course/e3-1.html)、[E3-2](../course/e3-2.html)、[E4-3](../course/e4-3.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-cp-implementation) | [C1-2](../course/c1-2.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-cross-coupled-pair) | [B2-3](../course/b2-3.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-crystal-equivalent-circuit) | [B1-1](../course/b1-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-crystal-oscillator) | [B1-1](../course/b1-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-lc-oscillator) | [B2-2](../course/b2-2.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-lc-oscillator-noise-model) | [D1-2](../course/d1-2.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-mash-dither) | [E2-3](../course/e2-3.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-mash-nodither) | [E2-3](../course/e2-3.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-mash-third-order) | [E2-2](../course/e2-2.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-oscillator-lc-nmos) | [B2-3](../course/b2-3.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-oscillator-model) | [B3-1](../course/b3-1.html)、[C3-1](../course/c3-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pd-xor-diagram) | [C1-1](../course/c1-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pfd-diagram1) | [A2-3](../course/a2-3.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pfd-diagram2) | [A2-3](../course/a2-3.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pfd-implementation) | [C1-1](../course/c1-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-phase-noise-spectrum) | [D1-2](../course/d1-2.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-block-diagram) | [A1-1](../course/a1-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-dsm-digital-first-order) | [E2-1](../course/e2-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-frac-n-block) | [E1-1](../course/e1-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-pfd-cp) | [C1-3](../course/c1-3.html)、[C2-1](../course/c2-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-phase-noise) | [D2-1](../course/d2-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-pll-tdc) | [E4-1](../course/e4-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-reciprocal-mixing) | [D1-4](../course/d1-4.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-ref-doubler) | [B1-2](../course/b1-2.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-ring-oscillator) | [B2-1](../course/b2-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-switched-capacitor) | [B3-2](../course/b3-2.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#fig-trx-coupling) | [D3-1](../course/d3-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-differential-oscillators) | [B2-3](../course/b2-3.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-frequency-tuning-of-oscillators) | [A2-3](../course/a2-3.html)、[B3-1](../course/b3-1.html)、[B3-2](../course/b3-2.html)、[B3-3](../course/b3-3.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator) | [B2-1](../course/b2-1.html)、[B2-2](../course/b2-2.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator-modeling) | [C2-1](../course/c2-1.html)、[C2-2](../course/c2-2.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator-noise) | [D1-2](../course/d1-2.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-oscillator-reciprocal-mixing) | [D1-4](../course/d1-4.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-basic-architecture) | [C1-1](../course/c1-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-charge-pump) | [A1-2](../course/a1-2.html)、[C1-2](../course/c1-2.html)、[C1-3](../course/c1-3.html)、[C1-4](../course/c1-4.html)、[C3-1](../course/c3-1.html)、[C3-2](../course/c3-2.html)、[C3-4](../course/c3-4.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-pll-frac-n) | [A1-1](../course/a1-1.html)、[E1-2](../course/e1-2.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-simulation) | [APP-1](../course/app-1.html) |
| JKU | [原文](https://iic-jku.github.io/radio-frequency-integrated-circuits/rfic.html#sec-single-ended-oscillators) | [B1-1](../course/b1-1.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/application-notes/an-1067.pdf) | [A2-1](../course/a2-1.html)、[A2-2](../course/a2-2.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/application-notes/an143f.pdf#page=2) | [D3-1](../course/d3-1.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/application-notes/an143f.pdf#page=6) | [D3-3](../course/d3-3.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/application-notes/an143f.pdf#page=7) | [D3-2](../course/d3-2.html)、[D3-3](../course/d3-3.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf) | [A1-1](../course/a1-1.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf#page=10) | [D2-3](../course/d2-3.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf#page=11) | [C3-1](../course/c3-1.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf#page=14) | [F1-1](../course/f1-1.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf#page=21) | [B1-2](../course/b1-2.html)、[E1-1](../course/e1-1.html)、[F1-1](../course/f1-1.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf#page=22) | [C2-3](../course/c2-3.html)、[C2-4](../course/c2-4.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf#page=23) | [E1-2](../course/e1-2.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf#page=3) | [C1-2](../course/c1-2.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf#page=6) | [C3-1](../course/c3-1.html) |
| ADI | [原文](https://www.analog.com/media/en/technical-documentation/data-sheets/adf4351.pdf#page=7) | [C1-2](../course/c1-2.html) |
| ADI | [原文](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=2) | [A1-3](../course/a1-3.html) |
| ADI | [原文](https://www.analog.com/media/en/training-seminars/tutorials/MT-008.pdf#page=3) | [D1-1](../course/d1-1.html)、[D1-3](../course/d1-3.html)、[D2-2](../course/d2-2.html) |
| ADI | [原文](https://www.analog.com/media/en/training-seminars/tutorials/MT-086.pdf#page=8) | [B1-2](../course/b1-2.html) |
| TI | [原文](https://www.ti.com/lit/ds/symlink/lmx2594.pdf) | [B1-2](../course/b1-2.html) |
| TI | [原文](https://www.ti.com/lit/ug/snau210b/snau210b.pdf#page=5) | [B1-2](../course/b1-2.html)、[B1-3](../course/b1-3.html)、[B3-3](../course/b3-3.html)、[C3-3](../course/c3-3.html)、[F1-1](../course/f1-1.html) |
| TI | [原文](https://www.ti.com/lit/ug/snau210b/snau210b.pdf#page=6) | [A1-3](../course/a1-3.html)、[C1-3](../course/c1-3.html)、[C3-3](../course/c3-3.html)、[D2-3](../course/d2-3.html)、[F1-1](../course/f1-1.html) |
