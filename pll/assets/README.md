# PLL 页面资源（assets）

这里仅保存 PLL HTML 实际引用的本地图片。所有章节均通过相对路径加载，离线使用时不依赖图片 CDN。

## 当前资源总览

- 页面资源总数：37 个文件。
- 新增页面资源：35 个文件。
- 第 1 章原有资源：2 张 JKU SVG。
- 本轮新增引用：42 处，分布在 14 个章节。
- 新下载并归档的原图：11 张（JKU Oscillators 7 张、MDPI LC-DCO 3 张、FPGA DTC 1 张）。
- 之前已归档、此次复制到页面资源目录的 JKU PLL PNG：24 张。
- 未被引用的候选图：JKU PLL Figure 89，仍只保留在 materials/pll/originals/jku/。

## 按来源和目录

| 资源目录/文件 | 数量 | 使用章节 | 来源与内容 |
|---|---:|---|---|
| jku-fig-pll-block-diagram.svg、jku-fig-pll-pfd-cp.svg | 2 SVG | 1 | JKU PLL Figure 74、83，基本 PLL 与 PFD-CP PLL |
| originals/jku/ | 24 PNG | 2、3、4、5、6、7、8、9、10、12、14、15、16、17 | JKU PLL Figures 74–88、90–98；Figure 89 未使用 |
| originals/jku-oscillators/ | 7 SVG | 8 | JKU Oscillators Figures 60、61、69–73 |
| originals/mdpi/ | 3 PNG | 8 | 65 nm LC-DCO 论文 Figures 3、4、7 |
| originals/mdpi-dtc/ | 1 JPEG | 17 | FPGA Vernier DTC 论文 Figure 4，可编程延迟线实现例 |

## 逐章引用

| 章节 | 新增本地图片引用 | 图号/资源 |
|---|---:|---|
| 01 | 0（沿用 2 张旧资源） | JKU SVG Figure 74、83 |
| 02 | 1 | JKU Fig.75 |
| 03 | 3 | JKU Fig.78、79、83 |
| 04 | 3 | JKU Fig.74、83、85 |
| 05 | 1 | JKU Fig.97 |
| 06 | 5 | JKU Fig.77–81 |
| 07 | 3 | JKU Fig.82、83、96 |
| 08 | 12 | JKU Fig.87、88；Oscillator Fig.60、61、69–73；MDPI Fig.3、4、7 |
| 09 | 1 | JKU Fig.83 |
| 10 | 1 | JKU Fig.76 |
| 11 | 0 | 交互和课程自绘图保留 |
| 12 | 1 | JKU Fig.84 |
| 13 | 0 | 复绘与课程教学图保留，ADI AN143 原图待提取 |
| 14 | 2 | JKU Fig.95、98 |
| 15 | 5 | JKU Fig.90–94 |
| 16 | 2 | JKU Fig.85、86 |
| 17 | 2 | JKU Fig.86；FPGA DTC Fig.4 |
| 18 | 0 | 课程系统总览自绘图保留 |

## 许可证与引用

- JKU RFIC 教材及 Oscillators 图：上游仓库声明 Apache-2.0。来源、作者、图号和 LICENSE/CITATION 信息保存在 materials/pll/originals/jku/ 及材料清单中。
- MDPI 65 nm LC-DCO 论文 Figure 3、4、7：CC BY 4.0。引用时保留作者、论文标题、期刊、年份、DOI、图号和修改说明。
- FPGA Vernier DTC 论文 Figure 4：CC BY 4.0。它仅代表 FPGA Vernier 延迟线实现，不应描述为 ASIC ADPLL DTC 的具体实现。
- 厂商数据手册和应用笔记：当前尚未把其插图复制到本目录；提取后需记录页码、来源和版权，未来公开发布前复核授权。

## 维护规则

1. 原始 PDF、未使用候选图和网页快照放在 materials/pll/。
2. 只有 HTML 实际引用的图片才放入本目录。
3. 每次新增/删除图片，同步更新 materials/pll/FIGURE_MANIFEST.csv、materials/README.md 和 pll/FIGURE_REPLACEMENT_AUDIT.md。
4. 静态原图可以作为教学对照；原有教学自绘图继续保留。
5. MathJax 公式、动态曲线、滑块实验、MASH 序列、TDC/DTC 交互仿真不能用静态截图替代。
6. 页面引用使用相对路径，不使用远程图片 URL。

