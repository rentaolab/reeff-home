# 指南截图清单

> **状态：10 张已全部到位（2026-11-06）。** 文件在 `public/guides/<slug>/`，`GuideBody` 的构建期存在性检查现在全部命中，生产页会把图渲染出来；`npm run check:content` 也会在缺图时直接失败。
>
> 尺寸以文章里的 `width` / `height` 为准（已按真实像素写入）：9 张约 1900 × 1026–1030，内存那张 788 × 688。
> `docs/` 里保留的是原始 `.jpg` 抓图（已在 `.gitignore` 中排除，不进仓库）。

九篇指南的正文已经写完，每篇 1–2 张截图的**位置、路径、尺寸、说明**都在内容文件里写好了。截图文件一旦落到 `public/` 下的对应路径，页面上就会自动出现；在此之前：

- **生产构建**：`GuideBody` 会跳过该 `figure` 块（不会出现破图），见 `src/lib/public-assets.ts`。
- **`npm run dev`**：显示一个虚线占位框，写明待补的路径，方便边写边看版式。
- **门禁**：`scripts/check-content.mjs` 对缺图直接报错（退出码 1）。

## 一、怎么拍

1. 用真实文件在 `https://pdf.reeff.app` 上跑一遍，**不要摆拍空界面**。
2. 浏览器窗口固定 1440 × 900（或 1280 × 800），只截工具区域，不含书签栏与操作系统任务栏。
3. 导出 WebP（质量 80 左右，长边 1280），文件名与下表**完全一致**，放在 `public/guides/<slug>/` 下。
4. 截图里**不要出现**：真实姓名、客户文件内容、邮箱、身份证号。用自己造的样例文件（`sample-contract.pdf`、`invoice-01.pdf` 这类）。
5. 图片里的界面语言与文章语言无关——两种语言共用同一张图，所以选**英文界面**截图，覆盖面更广。

## 二、逐张清单

| # | 路径 | 所属指南 · 章节 | 画面里要能看到 |
|---|---|---|---|
| 1 | `public/guides/merge-pdf-without-losing-bookmarks/01-bookmarks-panel.webp` | 合并 · 为什么合并会丢东西 | 左右并排：合并产物（11 页）的书签面板为空，其中一份源文件的书签面板有 3 条大纲 |
| 2 | `public/guides/split-pdf-into-chapters/01-cut-points.webp` | 拆分 · 开始切 | 300 页 PDF 已载入，章节之间标了切分点，结果列表显示 12 个分段及其页数 |
| 3 | `public/guides/why-compress-pdf-barely-shrinks/01-levels.webp` | 压缩 · 三档各自做了什么 | 同一份 12 MB 扫描件在 Light / Balanced / Strong 三档下的结果体积（三个数字要清晰可读） |
| 4 | `public/guides/print-ready-pdf-checklist/01-crop-vs-size.webp` | 印刷预检 · 裁剪不是缩放 | 裁剪前后的页面 + 文件体积不变 + 文档属性里 CropBox 变小 |
| 5 | `public/guides/delete-extract-reorder-which-tool/01-grid.webp` | 页面手术 · 为什么是四个工具 | 40 页网格中三页被标记删除；另一张同文档的两页被拖到新位置 |
| 6 | `public/guides/sign-a-pdf-without-printer/01-signature-placed.webp` | 无打印机签字 · 编辑器怎么写 | 签名图片正在放到签名线上（含缩放控制点） |
| 7 | `public/guides/sign-a-pdf-without-printer/02-sizing.webp` | 无打印机签字 · 尺寸 | 同一个签名在签名线上三种尺寸的对比，中间那个贴合线条 |
| 8 | `public/guides/images-to-pdf-dpi-and-size/01-page-size-and-fit.webp` | 图片转 PDF · 工具做了什么 | 四张照片排队、页尺寸 A4、方向自动、页边距 28 pt |
| 9 | `public/guides/pdf-to-image-dpi-guide/01-dpi-and-format.webp` | PDF 转图片 · 格式 | 格式选 PNG、150 DPI，结果区显示像素尺寸与文件大小 |
| 10 | `public/guides/browser-memory-limits-for-pdf/01-memory-measurement.webp` | 浏览器内存 · 五分钟测量 | 浏览器自带任务管理器（Shift+Esc），能看到某个标签页在转换前后的内存数值 |

## 三、补完后的验收

```bash
# 10 张图是否都在
ls public/guides/*/*.webp | wc -l

# 构建后应无占位、无破图
npm run build && grep -rc "Screenshot pending" .next/server/app/en/guides | grep -v ":0" || echo "无占位残留"
```

补图之后 `updated` 日期要跟着改（`src/content/guides/*.ts` 里 `<slug>` 的 `updated`），sitemap 与 JSON-LD 都读这个字段。
