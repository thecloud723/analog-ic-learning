# PLL 素材归档

本目录保存 PLL 教程的源素材，与页面运行时使用的文件分开管理。

- 原始图像：`materials/pll/originals/<source>/`
- 原始 PDF：`materials/pll/source-pdfs/<source>/`
- 资料索引：`materials/pll/SOURCES.md`
- 插图清单：`materials/pll/FIGURE_MANIFEST.csv`
- 页面实际引用的图片：`pll/assets/`
- 教程 HTML：`pll/chapters/`

## 当前已归档的原始图像

| 文件 | 来源/图号 | 状态 |
|---|---|---|
| `originals/jku/fig_074.png` 至 `fig_098.png` | JKU RFIC Figures 74–98，共 25 张高分辨率裁切图 | 已推送；图号、PDF页码、图注及章节映射见 `FIGURE_MANIFEST.csv` |
| `originals/jku/LICENSE`、`CITATION.cff` | JKU 上游仓库 | 已推送，随图保留 |

页面当前实际引用的两张 SVG 副本在 `pll/assets/`。这 25 张 PNG 作为原图素材单独存档；后续刷新 HTML 后，只把实际引用的图复制到 `pll/assets/`。

## 其他来源文件

ADI、TI、JKU 的原始 PDF 和 ADI 网页快照已有本地下载记录；本次提交仅推送了 25 张原图及 JKU 许可/引用文件。PDF 和网页快照仍需按本目录结构另行入库。

原始来源链接和使用说明见 `SOURCES.md`。私有仓库保存只用于个人学习归档；是否可以对外分发仍需按每项资料的许可证确认。
