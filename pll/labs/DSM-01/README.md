# DSM-01 · 有限字长 Fractional-N 分频命令

参照 [阶段 4 验收](../../docs/PLL_S4_ACCEPTANCE.md) 查看位宽、时序和定量结果。输入为 W 位二进制分子，对应实际比例 word/2^W。模型输出同一拍的一阶进位、MASH 1-1 和 MASH 1-1-1 命令。正负码均须与整数分频 N 相加后检查分频器的允许范围。

从仓库根目录执行，需 Python 3.12、Icarus Verilog，谱比较使用 NumPy 2.3.5。

```sh
lab=pll/labs/DSM-01
python "$lab/check_mash.py" 12 /tmp/mash-vectors.txt
iverilog -g2012 -s mash111_tb -P mash111_tb.WIDTH=12 \
  -o /tmp/mash.vvp "$lab/mash111.sv" "$lab/mash111_tb.sv"
vvp /tmp/mash.vvp +vectors=/tmp/mash-vectors.txt
python "$lab/measure_mash.py" /tmp/mash-spectrum
```

谱输出包含每拍有效输入和命令 CSV、矩形窗单边功率谱和摘要。记录单位为 command²/bin。启用 dither 时可选 seed 和幅度。默认一阶与 MASH 命令比较在 1/8，另可传入 NUM 与 DEN。

## Fractional-N 逐边沿闭环

需 Node.js 与 NumPy。从仓库根目录执行以下命令，或在本目录打开 [闭环 Notebook](FractionalN_Closed_Loop.ipynb)。

```sh
python pll/labs/DSM-01/compare_fractional.py /tmp/dsm-closed-loop
```

输出包括四种反馈工况的相位/频偏 CSV 以及入带时刻、相位 RMS 和复包络谱摘要。可用 `--num`、`--den`、`--width` 和 `--seed` 复跑。测试以 40 MHz 采样谱比较模型，分辨带宽为 40 MHz / 8192。
