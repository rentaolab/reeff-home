# Reeff — 品牌站（reeff.app）

Reeff 家族的母品牌站点：承接品牌词、展示产品矩阵、收集 waitlist。
定位与文案规则见 [docs/brand-brief.md](docs/brand-brief.md)（与工具仓库同源）。
**AdSense「低价值内容」整改计划（当前进行中）见 [docs/adsense-review-plan.md](docs/adsense-review-plan.md)** —— 含阶段划分、逐文件改动清单、门禁规则与进度日志；开新对话请先读该文件的第 8、9 节。

**为什么独立 repo**：与 `pdf.reeff.app`（工具站）内容、发布节奏、i18n 范围都不同；分开可保证这里任何改动都不会影响正在赚钱的工具站。

## 技术栈

Next.js 16 + React 19 + Tailwind v4 + TypeScript（与工具站同版本）。i18n 是**手写的两语言字典**（`src/lib/dictionaries.ts`），零依赖；超过两语言时再换 next-intl。

```
src/app/[locale]/            layout.tsx（根布局 + metadata）/ page.tsx / privacy / terms
src/app/proxy.ts             语言协商：/ → /zh 或 /en（Next 16 里 middleware 改名为 proxy）
src/app/{icon.svg,icon.png,icon1.png,icon2.png,apple-icon.png,opengraph-image.png,manifest.ts,sitemap.ts,robots.ts}
src/components/              SiteHeader / SiteFooter / ProductGrid / PillarGrid / ToolDirectory / WaitlistForm / LegalPage
public/brand/                mark.svg（唯一真源）+ og.svg + 导出的 PNG
scripts/brand.mjs            从 mark.svg / og.svg 重新导出全部尺寸
docs/brand-brief.md          定位、文案规则、命名与徽章规范
```

## 常用命令

```bash
npm run dev      # http://localhost:3000 → 自动跳到 /en 或 /zh
npm run build
npm run start
npm run lint
npm run brand    # 改了 public/brand/mark.svg 之后重新导出所有图标与 OG 图
```

## 品牌资产

- **唯一真源**：`public/brand/mark.svg`（深底圆角方 + 白色 R + 四个产品色点：PDF 红 / Image 紫 / Audio 琥珀 / Receipt 翠绿）
- 字形来自 Liberation Sans Bold 的真实轮廓（与 Arial 度量兼容，SIL OFL 1.1），**生产环境不需要加载任何字体**
- 改完源文件跑 `npm run brand`，会重新生成 `icon.svg` / `icon.png(32)` / `icon1.png(48)` / `icon2.png(96)` / `apple-icon.png(180)` / `opengraph-image.png(1200×630)` / `brand/icon-192|512|512-maskable`
- 脚本会自检 OG 图的留白（白字必须离边缘 ≥24px），太窄会直接把数字报出来

## ⚠️ 上线前必须核对的事

1. **waitlist 目前不存任何数据** —— 设置环境变量 `WAITLIST_WEBHOOK_URL`（Formspree / Buttondown / Resend / Zapier / 自建 API 均可，只要接受一个 JSON POST）。未设置时表单照常显示成功，但数据被丢弃，且服务端会打 `error` 日志。联系页的留言走 `CONTACT_WEBHOOK_URL`（未设时回落到 `WAITLIST_WEBHOOK_URL`）。
2. `CONTACT_EMAIL` 是 `reeff.app@proton.me`：这个邮箱必须真的能收信，并且与 `src/content/site.ts` 的 `SITE.email` 保持一致（正文里用的是后者）。
3. ✅ **「适用法律」已填**：Ripple Effect Technologies（马来西亚注册）。若主体或管辖地变更，同步改 `/[locale]/terms` 与 `src/content/site.ts` 的 `entity` / `jurisdiction`。
4. 加 Vercel Analytics（或 Plausible）后再更新 `/privacy` 的「我们收集什么」。

## 🚀 部署与 DNS（修掉 reeff.app 的 522）

> 现状：`reeff.app` 与 `www.reeff.app` 都解析到 **Cloudflare 代理 IP**，但源站不可达 → 522；
> `pdf.reeff.app` 是**灰云直连 Vercel**（`b3e89319422d1ebb.vercel-dns-017.com`），所以正常。**最省事的做法是让根域照抄子域的路子。**

1. **Vercel**：新建项目指向本仓库 → Settings → Domains，添加 `reeff.app` 与 `www.reeff.app`，并让 `www` **301 跳转到 apex**。
2. **Cloudflare DNS**：**替换** `reeff.app`（@）那条旧记录 → 按 Vercel 提示填 `A 76.76.21.21`；**代理状态选 DNS only（灰云）**。
3. **Cloudflare DNS**：`www` 的 `CNAME → cname.vercel-dns.com`，同样灰云。
4. **别动** `pdf.reeff.app`（保持现状：灰云 + Vercel）。
5. 验证：
   ```bash
   curl -sSI https://reeff.app/          # 期望 200 或 301，不再是 522
   curl -sSI https://www.reeff.app/      # 期望 301 → https://reeff.app/
   ```
   > 若坚持保留橙云代理，Cloudflare 的 SSL/TLS 必须设为 **Full (strict)**，否则 522/525 会反复出现。

6. **Search Console**：按 **Domain property** 验证 `reeff.app`（用 DNS TXT 记录）—— 一个 Domain property **自动覆盖所有子域**，`pdf.` / `image.` / `audio.` 都不用再单独验证。

## SEO 说明

- **关键词分工**（见 brand-brief §9）：根域只抢品牌词与类别词（`reeff`、`reeff app`、`office tools`）；所有工具长尾词（`merge pdf` 等）留给 `pdf.reeff.app`，避免两个站互相抢排名。
- 根域自带 `Organization` + `WebSite` + `ItemList` JSON-LD（品牌实体识别）、`sitemap.xml`（9 个内容路径 + 9 篇指南，各 en/zh，共 36 条并带 hreflang alternates）、`robots.txt`。
- **历史工具 URL 统一 301 到子域**：`/{tool}`（如 `/merge-pdf`）与 `/{locale}/{tool}`（如 `/en/compress-pdf`）都由 `src/proxy.ts` 永久跳转到 `pdf.reeff.app` 的同路径。路径清单在 `src/lib/tool-paths.ts`，与字典里的工具目录共用，`check:content` 会断言两边完全一致。**不要再手写第二份清单** —— 工具数 11 → 12 那次漏了 `/compress-pdf`，它在 GSC「未编入索引」里挂成了长期 404。
- 站点已加基线安全头（`frame-ancestors 'self'` + `X-Frame-Options: SAMEORIGIN` + `nosniff` + Referrer-Policy），防止被第三方 iframe 嵌套白嫖带宽/请求配额。
- 建议把同样的 `frame-ancestors 'self'` 加到工具站（`pdf.reeff.app`）的 `next.config.ts`。

## AdSense / ads.txt

- `public/ads.txt` 是**必须保留**的文件：AdSense 的「添加网站」只接受注册域（子域会被表单拒绝），
  所以账户里的站点是 `reeff.app`，根域这份文件决定站点状态 ——
  `https://reeff.app/ads.txt` 必须返回 `200` + `text/plain` 且**不跳转**。
- 工具站 `pdf.reeff.app` 在另一个仓库（Cloudflare Pages）另有同内容的一份；两处 pub id 必须一致。
  真正承载广告单元的是工具站，根域这份只用于站点授权/状态。
- 记录行放在**第一行**（`#` 注释合法，但 AdSense 自己生成的片段就是记录在前）。
- `src/proxy.ts` 的 matcher 已排除带 `.` 的路径，`/ads.txt` 不会被重写成 `/{locale}/ads.txt`；
  本地 `next start` 实测 `200 text/plain`。改了 proxy 的 matcher 记得复查这一条。

## i18n

新增页面时：在 `src/components/SiteHeader.tsx` 的 `path` 传入该页的 locale-free 路径（如 `/privacy`），语言切换器会自动生成正确链接。
字典类型是强制的（`Dictionary`），漏字段会编译报错。
