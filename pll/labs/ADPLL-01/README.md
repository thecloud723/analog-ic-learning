# ADPLL-01 浮点参考

从仓库根目录运行，使用 Python 标准库。

```sh
python pll/labs/ADPLL-01/check_reference.py
python pll/labs/ADPLL-01/adpll.py /tmp/adpll.csv --tdc-ps 2
```

每个参考沿累加 FCW，观测 DCO 整数边沿计数及由 TDC 量化的亚周期时间。模型用当拍 DCO 频率把时间量换回周期，P 与 I 路径分别输出，控制字作用于下一个参考周期。负控制字用有符号粗调与无符号细调表示。当前 DCO 假设粗细调完全连续，且亚周期内频率保持不变。定点比较、DNL/INL、DTC 与校准另见[阶段验收](../../docs/PLL_S4_ACCEPTANCE.md)。
