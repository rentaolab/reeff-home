# AdSense「低价值内容」整改计划（Site Review Plan v1）

> **状态：阶段 0 待完成 → 阶段 1 未开始。**
> 最后更新：2026-11-06
> AdSense 站点状态：`需要注意` · 原因：**低价值内容**（2026-10 提交，已等 2 周）
> **接手第一件事**：读第 8 节的「接手须知」，然后从第 9 节「进度日志」最后一条的「下一步」开始。
>
> 本文件是本次整改的唯一依据。变更时同步更新：
> `src/lib/dictionaries.ts`（文案）、`src/app/sitemap.ts`（URL 集合）、
> `scripts/check-content.mjs`（门禁阈值）、`docs/brand-brief.md`（文案禁忌）。
>
> 关联仓库与本文件的分工：
>
> | 仓库 | 线上地址 | 平台 | 本次角色 |
> |---|---|---|---|
> | `rentaolab/reeff-home`（本仓库） | https://reeff.app | Vercel | **AdSense 审核主体**，本次整改的主战场 |
> | `rentaolab/my-pdf-app` | https://pdf.reeff.app | Cloudflare Pages | 产品站（12 个工具 / 170 URL），本次只做「审核期关广告」，内容加厚放在阶段 2 之后 |
>
> 政策原文出处见第 1 节，全部为 Google 官方页面（2026-11-06 核对）。

---

## 0. 为什么会判「低价值内容」（2026-11-06 实测）

AdSense 审核看的是**提交的站点本身**，即 `reeff.app` 根域（`docs/monetization.md` Step 1 已写明「子域会被拒绝，站点填 `reeff.app`」）。实测该域现状：

| 项目 | 实测值 | 判断 |
|---|---|---|
| `sitemap.xml` URL 数 | **6**（`/en` `/en/privacy` `/en/terms` + 对应 `zh`） | 内容总量过低 |
| 首页正文 | **285 词**（含导航与页脚） | 单页过薄 |
| `/contact` | **404**（页脚 `Contact` 只是 `mailto:`） | 无联系页面 |
| 产品区 | 3 张 `Coming soon` 卡片 + 1 个邮件收集表单 | 「未完成 / 占位」信号 |
| 信息型内容 | **0 篇** | 「实质性的独特价值」无载体 |
| 作者 / 团队 / 运营主体 | 无；`terms` 内仍是 `TODO：上线前在此填写你的经营主体与管辖地` | E-E-A-T 缺失 |
| 工具站 `pdf.reeff.app` | 170 URL；工具页正文 338–569 词，跨页共享模板 26–37%，独立文案仅 210–270 词/页；无文章、无截图、无 `about`→作者、无 `changelog` | 内容厚度不足，但技术 SEO（canonical/hreflang/JSON-LD）已达标 |

**结论**：问题不在技术 SEO，也不在工具质量，而在**审核主体缺内容、缺身份、缺维护记录**。因此本计划只做一件事：**把 `reeff.app` 从「落地页」升级为「内容中心」**，并让每一页都可被验证（作者、日期、实测数据、截图）。

---

## 1. 政策依据（原文要点）

| 政策 | 关键原文 | 对本项目的约束 |
|---|---|---|
| [AdSense 资格要求](https://support.google.com/adsense/answer/9724?hl=zh-Hans) | 「您提供的内容**必须是可以吸引受众群体的优质原创内容**」 | 需要有"内容"，不能只有工具入口 |
| AdSense 审核结果页「低价值内容」 | 「网站必须提供**实质性的独特价值**，在网络上**建立稳定的影响力**，并展现出足以支撑商业广告合作的**用户热度**」；三条整改条件：真实高质量的信息/工具/服务 → **持续**精选内容并维护结构 → 能**切实引起并持续吸引**用户关注 | 要"持续"证据：`changelog`、更新日期、路线图 |
| [Google 发布商政策](https://support.google.com/publisherpolicies/answer/10502938?hl=zh-Hans) | 「您不得在**违反 Google 网页搜索垃圾内容政策**的页面上展示 Google 投放的广告」；另列「误导性体验」「价值不足的内容」 | AdSense 与 Search 用同一把尺子 |
| [Google 搜索垃圾内容政策](https://developers.google.com/search/docs/essentials/spam-policies?hl=zh-cn) | 「**内容贫乏的联属营销**…要么在同一网站内以**模板化**的方式提供相同或相似的内容，要么在**多个网域内或以多种语言**提供此类内容」；另有**大规模生成内容（scaled content abuse）** | ⚠️ 禁止「同一段话模板化铺页」，禁止 AI 批量生成凑量 |
| [创建实用、可靠、以用户为中心的内容](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=zh-cn) | 「主要内容」**包含互动功能**（在线工具）；评估维度为**用心程度 / 原创性 / 才华技艺 / 准确性**；Who（作者是否一眼可见）— How（怎么做的）— Why（为什么做） | 工具算内容，但必须补 Who / How / Why |

**硬性红线（写在检查清单里，任何阶段都不得违反）**

1. 不虚构数据。没有实测过的数字一律不写；写不出的就写"取决于设备，附自查方法"。
2. 不用 AI 批量生成文章凑字数（命中 scaled content abuse 比"低价值"更难恢复）。
3. 不造作者身份、不用 AI 头像、不编资历（政策明确把伪造创作者资料列为欺骗行为）。
4. 不做关键词落地页（doorway）：每篇指南必须有独立结论、独立数据、独立截图。
5. 审核期内保持 `pdf.reeff.app` 广告位关闭（`NEXT_PUBLIC_ADS_ENABLED` 不设）。
6. 不在 2 周内反复提交 AdSense；整改完成后再提交一次。

---

## 2. 目标态（验收即按此表逐项打勾）

| 指标 | 现状 | 目标 | 由谁保证 |
|---|---|---|---|
| `reeff.app` sitemap URL | 6 | **≥ 30** | `src/app/sitemap.ts` |
| 根域正文总量 | ~1,000 词 | **≥ 18,000 词** | `scripts/check-content.mjs` |
| 首页正文 | 285 词 | **≥ 900 词** + 8–10 条可见 FAQ | `check-content` |
| 指南文章 | 0 | **9 篇**（en 每篇 ≥1,200 词，zh 每篇 ≥1,500 字） | `src/content/guides/*` |
| 信息页 | 0 | `/why-local` `/about` `/contact` `/changelog` `/roadmap` `/guides` | 新路由 |
| 联系可达 | `mailto:` | **`/{locale}/contact` 页面**，每页页脚可达 | `SiteFooter.tsx` |
| 作者与日期 | 无 | 每篇文章有作者行 + 发布/更新 ISO 日期；`/about` 有作者页 | `Guide` 类型必填字段 |
| 运营主体 | `TODO` 残留 | `terms` 填实主体与管辖地 | `dictionaries.ts` |
| 广告 | 子域 12 页有广告位（未过审，空位） | 审核期**零广告请求** | 环境变量 + `check:ads` |
| 工程门禁 | 无内容门禁 | `npm run check:content` 全绿才允许提交 | `scripts/check-content.mjs` |

> 目标词数是**工程自定阈值**，不是 Google 公布的分数线（官方未给字数门槛）。设定的依据是：让每页"读得出人写的用心"，且让 doorway/模板页无法通过门禁。

---

## 3. 阶段划分

| 阶段 | 名称 | 产出 | 工期 | 状态 |
|---|---|---|---|---|
| **0** | 计划与基线 | 本文件 + 基线快照 | 0.5 天 | ⏳ 进行中 |
| **1** | 内容骨架与数据层 | `src/content/*`、`src/lib/content.ts`、`GuideBody/GuideCard/ProsePage`、路由骨架（**不上 sitemap、不进导航、`noindex`**） | 1 天 | ⬜ 未开始 |
| **2** | 站点身份页 | `/why-local` `/about` `/contact` `/changelog` `/roadmap` 正式文案 + 页脚/导航 + `terms` 主体 | 2 天 | ⬜ 未开始 |
| **3** | 首页扩写 | 首页 ≥900 词 + FAQ + FAQPage JSON-LD + `Coming soon` → `/roadmap` | 1.5 天 | ⬜ 未开始 |
| **4** | 指南写作（前半） | 文章 1–5（en + zh） + 截图 | 3 天 | ⬜ 未开始 |
| **5** | 指南写作（后半） | 文章 6–9（en + zh） + 截图 | 2.5 天 | ⬜ 未开始 |
| **6** | 放开索引与门禁 | 新页从 `noindex` 转为可索引、进 sitemap/导航、`check:content` 接入 postbuild | 1 天 | ⬜ 未开始 |
| **7** | 线上验证与提交 | Vercel 部署核对、GSC 提交 sitemap 并请求索引、证据留存 | 1 天 | ⬜ 未开始 |
| **8** | 重新提交 AdSense | 「问题—改动—证据」说明 + 提交 | 0.5 天（**在阶段 7 完成后 3–4 周**） | ⬜ 未开始 |

> **为什么阶段 1 的页面要 `noindex`**：把空壳页面直接铺到线上，就是再造一批"占位页"，正好是本次被拒的原因。因此**内容未就绪的页面一律不进 sitemap、不进导航、加 `noindex`**，内容写完再在阶段 6 一次性放开。这条不要为了"看起来进度快"而提前打破。

---

## 4. 各阶段任务明细

### 阶段 1 · 内容骨架与数据层（1 天）

**为什么这样分层**：`src/lib/dictionaries.ts` 顶部注释明确写着「v0 keeps i18n dependency-free on purpose (two languages, one file)」，9 篇长文若塞进该文件会膨胀到 3,000+ 行。因此文章正文走**独立数据目录 + 渲染组件**，仍然零新增依赖。

| 文件 | 动作 | 要点 |
|---|---|---|
| `src/content/types.ts` | 新增 | `Block` 联合类型：`{kind:"h2"}` `{kind:"h3"}` `{kind:"p"}` `{kind:"ul"}` `{kind:"ol"}` `{kind:"steps"}` `{kind:"table"}` `{kind:"figure"}` `{kind:"callout"}`；`Guide = { slug; group; title; description; author; published; updated; tools: string[]; body: Block[] }`；`author`/`published`/`updated` **必填**（缺 → TS 报错） |
| `src/content/guides/<slug>.ts` | 新增 × 9 | 每个文件 `export const guide: Record<Locale, Guide>`，en/zh 同文件，缺一门语言直接编译失败 |
| `src/content/guides/index.ts` | 新增 | 汇总 + `guideSlugs` + `GROUP_ORDER`（`organize` / `convert` / `print` / `privacy`） |
| `src/lib/content.ts` | 新增 | `getGuides(locale)`、`getGuide(locale, slug)`、`readingTime(blocks)`、`plainText(blocks)`（供门禁计词）、`guideUpdated(slug)`（供 sitemap 用每篇自己的日期） |
| `src/lib/indexing.ts` | 新增 | **唯一索引开关**：`PENDING_PATHS: Set<string>` + `isIndexable(path)`。阶段 1–5 期间新页面全在 `PENDING_PATHS` 里；阶段 6 清空即上线 |
| `src/components/GuideBody.tsx` | 新增 | `Block[]` → 语义 HTML，沿用暗色 token（`text-slate-300` / `border-white/10` / `bg-white/[0.03]`）；`table` 需横向可滚动 |
| `src/components/GuideCard.tsx` | 新增 | 标题 + 摘要 + `updated` + 阅读时长 |
| `src/components/ProsePage.tsx` | 新增 | 长文外壳（参考 `LegalPage.tsx`），支持顶部日期与作者行 |
| `src/app/[locale]/guides/page.tsx` | 新增 | 分组索引；**阶段 1–5 加 `robots:{index:false}`** |
| `src/app/[locale]/guides/[slug]/page.tsx` | 新增 | `generateStaticParams()`（locale × slug）、`generateMetadata()`（canonical + hreflang + OG + `Article` + `BreadcrumbList` JSON-LD）；页尾「相关工具」外链 `pdf.reeff.app/{locale}/<tool>` |
| `src/app/[locale]/{why-local,about,contact,changelog,roadmap}/page.tsx` | 新增 × 5 | 先落结构，文案在阶段 2 填满；同样受 `indexing.ts` 控制 |

**验收**：`npm run build` 通过；`npx tsc --noEmit` 无错；新路由返回 200 且 HTML 里含 `noindex`；`sitemap.xml` 仍为 6 条（未放开）。

---

### 阶段 2 · 站点身份页（2 天）

| 页面 | 必含内容（缺一条不算完成） |
|---|---|
| `/why-local` | ① pdf-lib 改文档结构、pdf.js 光栅化，各自负责什么（可与代码事实对齐）；② 何时才加载 1.2 MB worker、为什么默认不预取；③ 「做不了什么」：OCR、云存储、批量脚本；④ **自证方法**：DevTools → Network 面板看点击工具后无上传请求（分步截图）；⑤ 浏览器/设备适用面（定性描述，**不编造基准数字**） |
| `/about` | 谁在做（真实身份与角色）+ 为什么做 Reeff + 编辑与测试原则 + 更新节奏 + 联系方式；`Person`/`Organization` JSON-LD |
| `/contact` | 邮箱（复用 `CONTACT_EMAIL`）+ 响应时限 + 报 Bug 需附信息（浏览器/文件页数/体积）+ 表单（`kind: "waitlist" \| "feedback"` 复用 `src/app/actions.ts`） |
| `/changelog` | 真实日期条目（可从两个仓库的 `git log` 提取），倒序；阶段 6 起每次上线追加一条 |
| `/roadmap` | 承接首页 3 张 `Coming soon`，写成「计划中 · 目标季度 · 状态」，并说明为什么还没做 |

同步修改：
- `src/lib/dictionaries.ts`：新增 `nav`、`resources`、`about`、`contact`、`whyLocal`、`changelog`、`roadmap` 文案块（**en 与 zh 同时补**）；`hero.ctaNote` 与 `tools.items` 从 **11 → 12 个工具**（工具站已有 `compress-pdf`）；`terms.sections` 填实运营主体与管辖地，**删除 `TODO`**；`privacy.sections` 补「广告由 Google AdSense 提供」与联系页地址。
- `src/components/SiteFooter.tsx`：新增 `Resources` 列；`Contact` 由 `mailto:` 改为 `/{locale}/contact`。
- `src/components/SiteHeader.tsx`：导航加 `Guides`。

**验收**：五个页面正文合计 ≥ 3,000 词；`grep -rn "TODO" src/` 为空；`/contact` 表单能成功提交（`npm run dev` 手测）。

---

### 阶段 3 · 首页扩写（1.5 天）

`src/app/[locale]/page.tsx` 新增四个 section（顺序即审核者视线的顺序）：

1. `What people use it for` — 4 个真实场景，每段带情景化内链（不是"点这里"）。
2. `How it works` — 三步摘要 → 指向 `/why-local`。
3. `From the guides` — 3 张 `GuideCard`（取 `updated` 最新三篇）。
4. `FAQ` — 8–10 条**页面可见**问答 + 与之一一对应的 `FAQPage` JSON-LD（同一数组双写，防漂移，做法与工具站 `ToolPageShell` 一致）。

同步：`src/components/ProductGrid.tsx` 的 `soon` 卡改为链接 `/roadmap#{slug}` 并显示目标季度。

**验收**：首页渲染文本 ≥ 900 词；FAQ 可见条数 == JSON-LD 条数；Rich Results Test 对 `FAQPage` 无报错。

---

### 阶段 4 / 5 · 九篇指南（5.5 天）

选题与顺序见第 5 节。每篇固定骨架：摘要（40–60 词）→ 为什么容易做错 → 步骤（含 1–2 张截图）→ **实测数据表**（设备 / 页数 / 体积 / 耗时，写不出就换成"自查方法"）→ 边界与做不了的事 → 常见错误 → 相关工具 → 作者 + 发布/更新日期。

**验收（每篇）**：en ≥ 1,200 词、zh ≥ 1,500 字；含 ≥1 张真实截图（WebP，带 `alt` 与宽高）；`updated` 晚于 `published` 且为合法 ISO 日期；无 `TODO`、无编造数字。

---

### 阶段 6 · 放开索引与门禁（1 天）

1. 清空 `src/lib/indexing.ts` 的 `PENDING_PATHS`。
2. `src/app/sitemap.ts`：`PATHS` 由 3 → 10+，guides 逐篇用自身 `updated`；`LAST_MODIFIED` 手工更新。
3. `scripts/check-content.mjs` 新增并接入 `package.json` 的 `postbuild`（规则见第 6 节）。
4. `docs/launch-verification` 式记录：把本次改动前后的 URL 数与词数写进第 8 节进度日志。

**验收**：`npm run build && npm run check:content` 全绿；`sitemap.xml` ≥ 30 条且每条含 `alternates.languages`。

---

### 阶段 7 · 线上验证与提交（1 天）

1. Vercel 部署后核对：`curl -s https://reeff.app/sitemap.xml | grep -c "<loc>"`；
2. GSC 提交 sitemap → URL Inspection 对 `/en`、`/en/guides`、3 篇重点文章逐个「请求编入索引」；
3. 留存证据图：GSC 索引覆盖、首页与两篇文章截图、`/why-local` 的 Network 截图；
4. 记录进第 8 节进度日志。

---

### 阶段 8 · 重新提交 AdSense（阶段 7 后 3–4 周）

提交说明按「问题 — 改动 — 证据」三段写：

> **问题**：上一版 `reeff.app` 仅 6 个可索引页面，以落地页与占位符为主，缺少信息型内容。
> **改动**：新增 9 篇原创指南（列表 URL）、`/why-local`、`/about`、`/contact`、`/changelog`、`/roadmap`；首页正文从 285 词扩至 XXX 词并补 FAQ；工具站 `pdf.reeff.app` 同步加厚（如已做）。
> **证据**：Search Console 收录截图、近 30 天访问数据、指南中的实测表与截图。

过审后再按 `docs/monetization.md` 灰度开启广告（P1 → P2 → P3）。

---

## 5. 九篇指南选题（阶段 4 = 1–5，阶段 5 = 6–9）

| # | slug | 分组 | 核心价值（必须有独立结论/数据） | 关联工具 |
|---|---|---|---|---|
| 1 | `merge-pdf-without-losing-bookmarks` | organize | 页序、书签丢失、A4+Letter 混排的真实后果与正确做法 | merge / organize |
| 2 | `split-pdf-into-chapters` | organize | 300 页按章节拆分而不重压文字；range 语法与边界 | split / extract |
| 3 | `why-compress-pdf-barely-shrinks` | convert | 为什么"压缩"对扫描件几乎无效、什么才有效（含前后体积表） | compress |
| 4 | `print-ready-pdf-checklist` | print | 出血、裁切标记、`crop` ≠ `resize` 的判定方法 | crop / compress |
| 5 | `delete-extract-reorder-which-tool` | organize | 页面手术的决策树：删/提/排/整理的边界 | delete / extract / reorder |
| 6 | `sign-a-pdf-without-printer` | organize | 无打印机签字流程；手写笔迹与图片图章的差别与风险 | edit |
| 7 | `images-to-pdf-dpi-and-size` | convert | DPI、页尺寸与 2 MB 邮件附件上限的取舍 | image-to-pdf |
| 8 | `pdf-to-image-dpi-guide` | convert | 投屏 vs 印刷各需要多少 DPI；PNG/JPG/WebP 选择 | pdf-to-image |
| 9 | `browser-memory-limits-for-pdf` | privacy | 浏览器能处理多大 PDF：**只写可复现的自查方法 + 用户可自行测的步骤**，不编造设备基准 | why-local 同源 |

> 第 9 篇是本计划的**反造假样板**：如果拿不到真实测量，就用「三段自查法（任务管理器 / Network / 耗时）」写，并明确说明"取决于设备"。宁可少一个数字，不可编一个数字。

---

## 6. 门禁规则（`scripts/check-content.mjs`）

对齐 `my-pdf-app` 的 `check-*` 风格（读构建产物 + 常量，失败退出码非 0）：

| 规则 | 阈值 | 失败信息示例 |
|---|---|---|
| sitemap URL 数 | ≥ 30 | `sitemap 只有 6 条，阶段 6 未放开索引` |
| 指南数量 | ≥ 9 | `缺少指南：<slug>` |
| 每篇 en 正文词数 | ≥ 1,200 | `merge-pdf...: 812 words < 1200` |
| 每篇 zh 正文字数 | ≥ 1,500 | 同上 |
| `author` / `published` / `updated` | 必填、ISO 格式 | `guide <slug> 缺 updated` |
| 首页渲染词数 | ≥ 900 | `首页 285 words < 900` |
| 必达路径 | `/contact` `/about` `/why-local` `/guides` `/changelog` `/roadmap` | `缺少页面 /contact` |
| 禁用残留 | `src/` 内不得出现 `TODO` | `src/lib/dictionaries.ts:277 仍有 TODO` |
| 索引开关 | 阶段 6 起 `PENDING_PATHS` 必须为空 | `indexing.ts 仍有 N 个待放开路径` |

接入：`package.json` → `"check:content": "node scripts/check-content.mjs"`，并挂到 `postbuild`。

---

## 7. 跨仓库边界与后续待办

**本仓库（`reeff-home`）本次只做第 4 节阶段 0–8。** 以下是另一个仓库的待办，不要在本仓库里做：

| 仓库 | 待办 | 时机 |
|---|---|---|
| `my-pdf-app`（pdf.reeff.app） | **P0**：审核期关闭广告位（`NEXT_PUBLIC_ADS_ENABLED` 不设），并让 `check:ads` 断言「0 广告 DOM」 | 立刻 |
| `my-pdf-app` | **P0**：新增 `/contact` 页（10 语言），页脚 `mailto` 改页面链接 | 立刻 |
| `my-pdf-app` | **P2**：工具页独立文案 ≥600 词（merge/split/compress/edit ≥900）、解绑 4 条通用 FAQ、新增 4–6 个信息页、每工具 1–2 张截图 | 阶段 6 之后 |
| `my-pdf-app` | **P2**：`scripts/check-content.mjs`（单页词数 + 跨页重复率 <30%） | 同上 |
| 两站 | 外部分发（Show HN / Product Hunt / Reddit r/pdf / V2EX）与 GSC 收录监控 | 阶段 6 之后持续 |

> 子域 `pdf.reeff.app` 的页面**不要**与根域指南写成同一段话的搬运，否则会放大"模板化 × 多域"的观感。

---

## 8. 接手须知（新对话从这里开始）

**先读什么**：本文件第 3 节的阶段表 → 第 9 节进度日志最后一行 → 对应阶段的第 4 节明细。

**硬约束（违反即回退）**

1. 阶段 1–5 期间，新页面必须留在 `src/lib/indexing.ts` 的 `PENDING_PATHS` 里（不进 sitemap、不进导航、`robots:{index:false}`）。**内容没写完就不要放开索引。**
2. 文章正文放 `src/content/guides/`，**不要**塞进 `src/lib/dictionaries.ts`；该文件只放界面文案。
3. 每篇文章的 `Record<Locale, Guide>` 必须 en/zh 同时存在（缺一门编译失败是**设计意图**，不要改成可选）。
4. 不编造任何测量数字与作者身份；写不出就写自查方法。
5. 文案风格遵循 `docs/brand-brief.md`：不用"最快/最好/极速/功能强大"，不用假倒计时，定价只说「本地免费不限量，云端按需付费」。
6. 每次改动后跑：`npx tsc --noEmit && npm run lint && npm run build`。

**提交约定（与两个仓库一致）**

```
feat(content): 新增 /guides 数据层与路由骨架（阶段 1）
feat(site): 补齐 about/contact/changelog/roadmap/why-local（阶段 2）
feat(home): 首页扩写至 900+ 词并加 FAQ 结构化数据（阶段 3）
feat(guides): 指南 1–5（en/zh）与截图（阶段 4）
feat(guides): 指南 6–9（en/zh）与截图（阶段 5）
chore(seo): 放开索引并接入 check:content 门禁（阶段 6）
docs(verify): 记录线上验证与 GSC 收录结果（阶段 7）
```

每阶段完成 → `git add -A && git commit -m "<上表文案>" && git push origin main` → Vercel 自动部署。

**常用命令**

```bash
cd ~/projects/reeff-home
npm run dev                 # 本地预览（http://localhost:3000/en）
npx tsc --noEmit            # 类型检查
npm run lint
npm run build               # 生产构建
npm run check:content       # 阶段 6 起可用
curl -s https://reeff.app/sitemap.xml | grep -c "<loc>"     # 线上 URL 数
```

**关键事实速查（避免重复调研）**

- AdSense 审核主体：`reeff.app`（根域）；子域 `pdf.reeff.app` 是同一账号下的放量位置。
- 基线（2026-11-06）：根域 sitemap **6** 条、首页 **285** 词；工具站 **170** URL、工具页正文 338–569 词、跨页共享模板 26–37%。
- 根域技术栈：Next 16 App Router + 手写双语字典（**无 next-intl**）+ Tailwind v4 + Vercel；`middleware.ts` 在 Next 16 中名为 `src/proxy.ts`。
- 工具站技术栈：Next 16 静态导出 + next-intl（10 语言）+ Cloudflare Pages。
- 发布商 ID：`ca-pub-4891040014815847`（两域 `ads.txt` 均已上线）。
- 联系邮箱：`hello@reeff.app`（根域）/ `reeff.app@proton.me`（工具站）。

---

## 9. 进度日志

> 每完成一个阶段追加一行；**提交前先更新本表**，这样新对话能凭最后一行接上。

| 日期 | 阶段 | 完成内容 | 验证结果 | 下一步 |
|---|---|---|---|---|
| 2026-11-06 | 0 | 建立本计划；记录基线（根域 6 URL / 285 词，工具站 170 URL / 338–569 词）；确定分层与红线 | 未涉及代码 | 阶段 1：`src/content/*` + `src/lib/{content,indexing}.ts` + 3 个渲染组件 + 8 个路由骨架（`noindex`） |

