# PLL 第 01～10 章行内数学符号排版修订记录

## 修订范围

对第 01～10 章全部 HTML 的正文、标题、表格、选择题、图注、静态 SVG 标签进行行内数学符号检查与格式化。新增运行时格式化器，覆盖选择题解析动态插入文本和交互图动态生成的 SVG 标签。

## 统一格式

- `fOUT` → `f` 的 OUT 下标
- `fREF`、`fFB`、`fVCO`、`fPFD`、`fPD`、`fCLK`、`fRFOUT`、`fFREE` → 标准下标
- `Vctrl`、`VCTRL`、`VTUNE`、`VDD` → 标准下标
- `Icp`、`ICP`、`IUP`、`IDN`、`Iavg` → 标准下标
- `KVCO`、`KDCO`、`KPD`、`Kp`、`Ki`、`Kφ` → 标准下标
- `φref`、`φREF`、`φfb`、`φFB`、`φout`、`eφ` → 标准下标
- `TREF`、`tREF`、`tFB`、`tRESET`、`TPD`、`t_d`、`ωn` → 标准下标
- `ΔfPVT`、`ΔfACQ`、`ΔfTRK`、`ΔfLSB`、`ΔVC`、`C0/C1/C2`、`R1`、`D1/D2`、`M1–M5`、`INV1–INV3` → 标准下标
- `RFOUT`、`REFIN` 等端口名使用下标排版。

变量主体使用斜体，描述性下标使用正体。独立公式由此前的预渲染数学公式保持原样；本次重点处理行内符号。动态生成的反馈文字和 SVG 标签由内嵌脚本统一处理，离线可用。

## 注意

此修订只改变符号排版，不改变公式、数值、逻辑或教学模型。单位如 `fC`（femtocoulomb）不被错误拆成变量下标；PLL、PFD、VCO、PVT、TIE 等缩写保持正体原样。