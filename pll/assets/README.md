# PLL 页面资源（assets）

这里只放 PLL HTML 页面实际引用的图片副本。页面应通过相对路径从本目录加载，保持离线可用。

## 当前实际使用

| 页面资源 | 原始归档/来源 | 来源图号 | 用途 | 当前状态 |
|---|---|---|---|---|
| jku-fig-pll-block-diagram.svg | materials/pll/originals/jku/ 同名 SVG；JKU RFIC | Figure 74 | 第 1 章基本 PLL 框图 | 已由 HTML 本地加载 |
| jku-fig-pll-pfd-cp.svg | materials/pll/originals/jku/ 同名 SVG；JKU RFIC | Figure 83 | 第 1 章 PFD-CP PLL 框图 | 已由 HTML 本地加载 |

两份 JKU SVG 的上游仓库声明 Apache-2.0。保留材料目录中的 LICENSE、CITATION.cff、来源和修改说明。

## 目前不属于页面运行时资源的素材

- materials/pll/originals/jku/fig_074.png 至 fig_098.png：25 张 JKU PDF 裁切图，当前是候选归档，尚未被章节 HTML 直接引用。只有完成某张图的页面替换后，才复制到本目录的 originals/jku/ 并更新 manifest。
- 第 8 章链接的 MDPI Figure 3、4、7：目前只是外部来源链接，尚未下载成本地图片，也未作为本地页面图片展示。
- ADI、TI、论文 PDF 和其他候选截图：放在 materials/pll/，不要将未使用的资料混入运行时资源目录。

## 新增图片规则

1. 先在 materials/pll/ 归档原始 PDF/图片、来源、图号、页码和授权信息。
2. 确认某张图确实会被页面使用后，将其页面副本放到 pll/assets/ 或子目录。
3. HTML 只引用 pll/assets/ 下的相对路径，不使用在线 CDN 或远程图片地址。
4. 更新 materials/pll/FIGURE_MANIFEST.csv，记录原始来源、许可证、处理方式、引用章节和页面路径。
5. 交互实验、动态曲线和由输入参数实时生成的图不替换为静态截图。

## 2026-11-12 新增本地引用

共新增 35 个页面资源文件，分别位于 `originals/jku/`、`originals/jku-oscillators/`、`originals/mdpi/` 和 `originals/mdpi-dtc/`。逐图路径、来源和章节见[材料清单](../../materials/README.md)。
