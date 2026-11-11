# PLL 素材归档

本目录保存 PLL 教程的源素材，与页面运行时使用的文件分开管理。

- 原始图像：`materials/pll/originals/<source>/`
- 原始 PDF：`materials/pll/source-pdfs/<source>/`
- 资料索引：`materials/pll/SOURCES.md`
- 页面实际引用的图片：`pll/assets/`
- 教程 HTML：`pll/chapters/`

## 当前已归档的原始图像

| 原始文件 | 来源/图号 | 页面使用副本 | 许可与备注 |
|---|---|---|---|
| `originals/jku/jku-fig-pll-block-diagram.svg` | JKU RFIC, Figure 74 | `pll/assets/jku-fig-pll-block-diagram.svg` | 上游仓库声明 Apache-2.0；保留来源与许可 |
| `originals/jku/jku-fig-pll-pfd-cp.svg` | JKU RFIC, Figure 83 | `pll/assets/jku-fig-pll-pfd-cp.svg` | 上游仓库声明 Apache-2.0；保留来源与许可 |

## 尚未在当前仓库文件树中找到

先前下载记录提到 JKU Figures 74–98 的裁切图、JKU RFIC PDF、ADI MT-086/ADF4351、TI SNAA106C/SNAA336A 以及 ADI PLL Fundamentals 页面资料；当前 main 分支中除上表两张 JKU SVG 外，尚未看到这些文件。收到文件后放入本目录对应的 originals/source-pdfs 子目录，再把页面实际引用的副本放入 `pll/assets/`。

原始来源链接和使用说明见 `SOURCES.md`。私有仓库保存只用于个人学习归档；是否可以对外分发仍需按每项资料的许可证确认。
