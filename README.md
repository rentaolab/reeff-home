# Reeff — 品牌站（reeff.app）

Reeff 家族的母品牌站点：承接品牌词、展示产品矩阵、收集 waitlist。
定位与文案规则见 [docs/brand-brief.md](docs/brand-brief.md)（与工具仓库同源）。

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

## ⚠️ 上线前必须做的 4 件事

1. **waitlist 目前不存任何数据** —— 设置环境变量 `WAITLIST_WEBHOOK_URL`（Formspree / Buttondown / Resend / Zapier / 自建 API 均可，只要接受一个 JSON POST）。未设置时表单照常显示成功，但数据被丢弃，且服务端会打 `error` 日志。
2. `src/lib/dictionaries.ts` 里的 `CONTACT_EMAIL` 现在是占位 `hello@reeff.app` —— 换成真实邮箱。
3. `docs/brand-brief.md` 与 `/[locale]/terms` 里的「适用法律」是 `TODO` —— 填写经营主体与管辖地（接支付前必须补齐）。
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
- 根域自带 `Organization` + `WebSite` + `ItemList` JSON-LD（品牌实体识别）、`sitemap.xml`（3 页 × 2 语言带 alternates）、`robots.txt`。
- 站点已加基线安全头（`frame-ancestors 'self'` + `X-Frame-Options: SAMEORIGIN` + `nosniff` + Referrer-Policy），防止被第三方 iframe 嵌套白嫖带宽/请求配额。
- 建议把同样的 `frame-ancestors 'self'` 加到工具站（`pdf.reeff.app`）的 `next.config.ts`。

## i18n

新增页面时：在 `src/components/SiteHeader.tsx` 的 `path` 传入该页的 locale-free 路径（如 `/privacy`），语言切换器会自动生成正确链接。
字典类型是强制的（`Dictionary`），漏字段会编译报错。
