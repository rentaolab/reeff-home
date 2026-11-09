# 内容规划与维护手册（reeff.app 根域）

> 这份文件是 `docs/adsense-review-plan.md` 的执行结果说明：计划怎么落地、内容放在哪、门禁卡什么、下一个人改内容时照着走哪几步。
> 最后更新：2026-11-06。

## 1. 现在的规模

| 指标 | 数值 | 来源 |
|---|---|---|
| 可索引页面 | 36 条 URL（18 个路径 × en/zh） | `sitemap.xml` |
| 指南文章 | 9 篇（每篇 en + zh） | `src/content/guides/` |
| 指南截图 | 10 张 WebP（约 984 KB） | `public/guides/<slug>/` |
| 首页正文 | en 1,465 词 / zh 2,192 字 | 构建后 HTML 实测 |
| 根域 en 正文合计 | 18,095 词 | `npm run check:content` |
| 广告 | 审核期零请求 | `NEXT_PUBLIC_ADS_ENABLED` 未设置 |

## 2. 内容放在哪，边界在哪

```
src/lib/dictionaries.ts      界面文案：按钮、导航标签、页脚、法律页条款
src/content/site.ts          站点身份：URL、名称、运营主体、邮箱
src/content/pages/*.ts       非文章的正文：about / contact / why-local / changelog / roadmap / guides
src/content/guides/*.ts      文章：一篇一个文件，en 与 zh 在同一文件里
src/content/guides/index.ts  注册表（数组顺序无关，列表按 updated 排序）
public/guides/<slug>/        该文章的截图，文件名与内容里的 figure src 完全一致
```

**判据**：读者会读一整段的，进 `content/`；只当标签用的，进 `dictionaries.ts`。
**硬约束**：`Localized<T>` 要求 en/zh 同时存在，少一种语言**编译就过不了**——这是故意的，半发布的页面比没发布更糟。

## 3. 门禁（`scripts/check-content.mjs`）

挂在 `postbuild` 上，所以 `npm run build` 失败就是门禁失败。也可以单独跑 `npm run check:content`。

| 规则 | 阈值 | 为什么 |
|---|---|---|
| sitemap URL 数 | ≥ 30 | 6 条落地页是本次被拒的直接原因 |
| 指南数量 + 名单 | 9 篇，逐个点名 | 文章被悄悄删掉要能报警 |
| 每篇 en 正文 | ≥ 1,200 词 | 工程阈值，不是 Google 分数线 |
| 每篇 zh 正文 | ≥ 1,500 字 | 中文一「字」信息量低于一「词」，所以阈值更高 |
| `published` / `updated` | 必填、ISO、`updated ≥ published` | JSON-LD 与 sitemap 都读它，写错就是给 Google 假信息 |
| `author` | 两种语言都要有 | 审核要求「谁写的」可查 |
| 每个 `figure` 的图片 | 必须在 `public/` 里真实存在 | **截图缺失直接红**，不允许静默降级 |
| 渲染后的文章页 | 必须有 `<img>`、必须有 `alt`、必须不是 `noindex` | 内容有了但没放出来，等于没做 |
| 必达路径 | about / contact / why-local / guides / changelog / roadmap / privacy / terms × 2 语言 | 审核者要能走到 |
| 首页 | en ≥ 900 词 | 原 285 词的落地页是最像 doorway 的页面 |
| `PENDING_PATHS` | 必须为空 | 阶段 6 已放开索引，再有待放开路径说明漏了一步 |
| `src/` 内 `TODO` / `FIXME` / lorem | 不得出现 | 上一版就是靠 `TODO` 混过去的 |
| 根域 en 总量 | 目标 18,000 词（**不阻塞**） | 差得远说明内容还不够厚，但不该让构建永远红着 |

**已验证**：把任一张截图移走，`npm run check:content` 退出码 1 并指出缺失路径；放回去即恢复全绿。

## 4. 新增一篇指南的步骤

1. 在 `src/content/guides/` 新建 `<slug>.ts`，`en` 与 `zh` 两个 `Guide` 对象写在同一文件。
2. `slug` 用 kebab-case，与文件名一致；`group` 取 `organize | convert | print | privacy` 之一。
3. 结构固定：摘要 → 为什么容易做错 → 步骤（含 1–2 张图）→ 数据表或自查方法 → 边界（做不了什么）→ 常见错误 → 相关工具。
4. `author: SITE.author`，`published` / `updated` 用 ISO 日期（首次发布两者相同）。
5. 每个 `figure` 的 `src` 写成 `/guides/<slug>/NN-<描述>.webp`，**`width` / `height` 填真实像素**（CSS 是 `w-full`，写错只影响预留空间与 CLS，但门禁外面还有人眼）。
6. 在 `src/content/guides/index.ts` 里 import + 加进数组；同时在 `scripts/check-content.mjs` 的 `EXPECTED_SLUGS` 里加一行，否则它不被点名保护。
7. 若文章涉及未索引的新页面，先把它写进 `src/lib/indexing.ts` 的 `PENDING_PATHS`，写完再拿掉。
8. `npm run build`（会顺带跑门禁）→ `npm run lint` → 提交。

> 别为了凑词数灌水：门禁是**地板**，不是目标。宁可一篇 1,300 词每句都能验证，也不要 2,500 词里塞满「在当今数字化时代」。

## 5. 数字从哪来（这是本站的可信度所在）

- **算出来的**：写明算式（例：A4 在 150 DPI = 210/25.4×150 ≈ 1240 px；位图 = 像素 × 4 字节）。
- **测出来的**：写明设备与文件（例：Chrome 在 16 GB 笔记本上合并 40 页）。
- **测不了**：给出五分钟自查法（浏览器任务管理器 / DevTools Network / 计时），并直说「取决于你的设备」。

第 9 篇 `browser-memory-limits-for-pdf` 是这条规矩的样板：它明确拒绝给基准表。

## 6. 更新节奏

| 触发 | 要改什么 |
|---|---|
| 工具界面改了（按钮、档位、默认值） | 相关文章的正文与截图 → 该篇 `updated` → sitemap 里它的 `lastmod` 自动跟着变 |
| 非文章页面正文改了 | `PageDoc.updated` + `src/app/sitemap.ts` 里 `STATIC_PATHS` 的对应日期（手工，不用 `new Date()`） |
| 新增一篇文章 | 第 4 节流程；`STATIC_PATHS` 不用动（文章日期取自身 `updated`） |
| 发现过时数字 | 改成新的可验证数字，或降级为自查法；**不要**留着旧数字 |

## 7. 复审与广告

1. 部署后在 GSC 提交 `https://reeff.app/sitemap.xml`，对 `/en`、`/en/guides`、三篇重点文章点「请求编入索引」。
2. 等 3–4 周（让抓取与收录稳定），期间不要改 URL 结构。
3. 再提交 AdSense，说明按「问题—改动—证据」三段写（模板见 `docs/adsense-review-plan.md` §4 阶段 8）。
4. 过审后才按 `NEXT_PUBLIC_ADS_ENABLED` 灰度开广告；**审核期一次广告请求都不要发**。
