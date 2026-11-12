/**
 * Hand-rolled two-language dictionary for the root brand site.
 *
 * v0 keeps i18n dependency-free on purpose (two languages, one file). If we ever
 * go past two, swap this for next-intl exactly like the tool site does.
 *
 * Copy follows docs/brand-brief.md — the brand line is "Office chores, sorted.",
 * the experience promise is "light / fast / simple", and pricing is stated as
 * "local features free and unlimited, server features pay as you go".
 */

import type { ToolPath } from "./tool-paths";

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/**
 * `hreflang` annotation per locale.
 *
 * The URL prefix stays the short code (`/zh/about`) — only the annotation is more
 * precise. A bare `zh` also covers Traditional Chinese, which this site does not
 * ship, so `zh-Hans` is the honest label and matches Simplified Chinese queries
 * more reliably. The tool site annotates its `zh` locale the same way; keeping
 * both domains on one label stops Google from treating the two Chinese versions
 * as separate languages.
 */
export const HREFLANG: Record<Locale, string> = {
  en: "en",
  zh: "zh-Hans",
};

/** Locale code → `hreflang`/`lang` annotation (falls back to the code itself). */
export const hreflangFor = (locale: Locale): string => HREFLANG[locale] ?? locale;

/** Tool subdomain — every product link points here with the same locale. */
export const PDF_BASE = "https://pdf.reeff.app";
/** Keep in sync with `SITE.email` in src/content/site.ts (content pages and the footer both use it). */
export const CONTACT_EMAIL = "reeff.app@proton.me";

export type Section = { h: string; p: string; list?: string[] };

export type Dictionary = {
  meta: { title: string; description: string };
  hero: { title: string; subtitle: string; cta: string; ctaNote: string };
  products: { title: string; live: string; soon: string; items: { name: string; tagline: string; live: boolean }[] };
  pillars: { title: string; items: { title: string; body: string }[] };
  tools: { title: string; note: string; items: { name: string; href: ToolPath }[] };
  waitlist: {
    title: string;
    body: string;
    emailLabel: string;
    emailPlaceholder: string;
    pickLabel: string;
    options: string[];
    submit: string;
    success: string;
    error: string;
  };
  privacy: { title: string; updated: string; sections: Section[] };
  terms: { title: string; updated: string; sections: Section[] };
  footer: {
    brandLine: string;
    products: string;
    resources: string;
    legal: string;
    privacy: string;
    terms: string;
    contact: string;
    copyright: string;
  };
  /** Labels for the feedback form on /contact (server action in src/app/actions.ts). */
  contactForm: {
    title: string;
    body: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    success: string;
    error: string;
  };
  /** Shared labels for content pages (dates, reading time, breadcrumbs). */
  common: {
    lastUpdated: string;
    published: string;
    minRead: string;
    relatedTools: string;
    home: string;
    allGuides: string;
  };
  /** Nav + footer labels for the content section. Paths live in src/lib/nav.ts. */
  nav: {
    guides: string;
    whyLocal: string;
    about: string;
    changelog: string;
    roadmap: string;
    contact: string;
  };
  langLabel: string;
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "Reeff — Office chores, sorted.",
      description:
        "Reeff builds light, fast, simple office tools that run in your browser. PDF tools are live today; image, audio and receipt tools are on the way.",
    },
    hero: {
      title: "Office chores, sorted.",
      subtitle:
        "Light, fast, simple: no installs, no sign-up, no waiting for uploads. One tool does one job — right in your browser.",
      cta: "Open Reeff.PDF",
      ctaNote: "12 free PDF tools · no account needed",
    },
    products: {
      title: "The family",
      live: "Live",
      soon: "Coming soon",
      items: [
        { name: "Reeff.PDF", tagline: "Merge, split, rotate, crop, edit and convert PDFs.", live: true },
        { name: "Reeff.Image", tagline: "Compress, resize and convert images.", live: false },
        { name: "Reeff.Audio", tagline: "Trim, convert and tidy up audio.", live: false },
        { name: "Reeff.Receipt", tagline: "Scan, split and export receipts and invoices.", live: false },
      ],
    },
    pillars: {
      title: "Why Reeff",
      items: [
        { title: "Open and go", body: "No installs and no sign-up. The same experience on your phone, tablet and desktop." },
        {
          title: "No queue",
          body: "Files are processed on your own device, so there is nothing to upload and no quota wall to hit.",
        },
        {
          title: "Straight answers",
          body: "We label what runs locally and what needs the internet. No dark patterns, no fake countdowns.",
        },
      ],
    },
    tools: {
      title: "Everything in Reeff.PDF",
      note: "Twelve tools, all free, all running in your browser.",
      items: [
        { name: "Organize PDF", href: "/organize-pdf" },
        { name: "Merge PDF", href: "/merge-pdf" },
        { name: "Split PDF", href: "/split-pdf" },
        { name: "Rotate PDF", href: "/rotate-pdf" },
        { name: "Reorder Pages", href: "/reorder-pdf-pages" },
        { name: "Delete Pages", href: "/delete-pdf-pages" },
        { name: "Extract Pages", href: "/extract-pdf-pages" },
        { name: "Crop PDF", href: "/crop-pdf" },
        { name: "Edit PDF", href: "/edit-pdf" },
        { name: "PDF to Image", href: "/pdf-to-image" },
        { name: "Image to PDF", href: "/image-to-pdf" },
        { name: "Compress PDF", href: "/compress-pdf" },
      ],
    },
    waitlist: {
      title: "Which tool should we build next?",
      body: "Leave your email and pick the one you need. We only use it to tell you when it ships.",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      pickLabel: "I need…",
      options: [
        "Reeff.Image — image tools",
        "Reeff.Audio — audio tools",
        "Reeff.Receipt — receipts & invoices",
        "Not sure yet — just keep me posted",
      ],
      submit: "Notify me",
      success: "Thanks — you're on the list.",
      error: "That email does not look right. Mind checking it?",
    },
    privacy: {
      title: "Privacy",
      updated: "Last updated: 6 November 2026",
      sections: [
        {
          h: "What runs where",
          p: "For our PDF tools your file is processed inside your browser. It is not uploaded to us and we keep no copy of it. Some future features (invoice verification, for example) need a server round-trip — those are always labelled before you use them.",
        },
        {
          h: "What we collect",
          p: "If you join a waitlist or send a message from the contact page we store the email address you gave us, what you picked or wrote, and nothing else.",
        },
        {
          h: "Advertising",
          p: "Some pages on the toolkit (pdf.reeff.app) may carry Google AdSense units. Where they do, Google and its partners may use cookies or device identifiers to serve and measure those ads, and a consent prompt appears first where the law requires one. You can turn off personalised advertising in Google's Ads Settings. The brand site you are reading now carries no ad units.",
        },
        {
          h: "Server logs",
          p: "Like any website, our host (Vercel) records basic request data — IP address, user agent, timestamp — for security and abuse prevention.",
        },
        { h: "Your choices", p: `Write to ${CONTACT_EMAIL} or use the contact page at any time and we will delete your waitlist entry.` },
        { h: "Changes", p: "If this policy changes we will update the date at the top of this page." },
      ],
    },
    terms: {
      title: "Terms of use",
      updated: "Last updated: 2026",
      sections: [
        {
          h: "The service",
          p: "Reeff provides free browser-based tools. You may use them for personal or commercial work at no cost.",
        },
        {
          h: "Acceptable use",
          p: "Do not use the tools to break the law, to process material you have no right to, or to attack or overload our infrastructure.",
        },
        {
          h: "No warranty",
          p: 'The tools are provided "as is", without warranties of any kind. Always keep your own backup of important files before processing them.',
        },
        {
          h: "Liability",
          p: "To the extent permitted by law we are not liable for indirect or consequential losses, including lost or corrupted files.",
        },
        {
          h: "Intellectual property",
          p: "The Reeff name, logo and site content belong to us. Your files remain entirely yours.",
        },
        {
          h: "Governing law",
          p: "Reeff is operated by Ripple Effect Technologies, a company registered in Malaysia. These terms are governed by the laws of Malaysia, and any dispute falls under the jurisdiction of the Malaysian courts. Write to reeff.app@proton.me first — most problems are settled in one exchange of email.",
        },
      ],
    },
    footer: {
      brandLine: "Office chores, sorted.",
      products: "Products",
      resources: "Resources",
      legal: "Legal",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
      copyright: "© 2026 Reeff · reeff.app",
    },
    contactForm: {
      title: "Send a message",
      body: "No account, no ticket number. Describe the job or the bug and include the browser and file size if it is a bug.",
      emailLabel: "Your email",
      emailPlaceholder: "you@example.com",
      messageLabel: "Message",
      messagePlaceholder: "What were you trying to do, and what happened?",
      submit: "Send",
      success: "Message received. We read everything and usually reply within two working days.",
      error: "That did not send. Check the email address, or write to us directly.",
    },
    common: {
      lastUpdated: "Last updated",
      published: "Published",
      minRead: "min read",
      relatedTools: "Tools used here",
      home: "Home",
      allGuides: "All guides",
    },
    nav: {
      guides: "Guides",
      whyLocal: "On-device",
      about: "About",
      changelog: "Changelog",
      roadmap: "Roadmap",
      contact: "Contact",
    },
    langLabel: "Language",
  },
  zh: {
    meta: {
      title: "Reeff — 办公杂活，交给 Reeff",
      description:
        "Reeff 做轻、快、简的办公工具，全部跑在浏览器里。PDF 工具已上线，图片、音频、票据工具在计划中。",
    },
    hero: {
      title: "办公杂活，交给 Reeff",
      subtitle:
        "轻·快·简：不装软件、不用注册、不用等上传。一个工具只做一件事，全部在浏览器里完成。",
      cta: "进入 Reeff.PDF",
      ctaNote: "12 个免费 PDF 工具 · 无需账号",
    },
    products: {
      title: "产品家族",
      live: "已上线",
      soon: "即将推出",
      items: [
        { name: "Reeff.PDF", tagline: "合并、拆分、旋转、裁剪、编辑与转换 PDF。", live: true },
        { name: "Reeff.Image", tagline: "图片压缩、缩放与格式转换。", live: false },
        { name: "Reeff.Audio", tagline: "音频裁剪、转格式与整理。", live: false },
        { name: "Reeff.Receipt", tagline: "票据扫描、拆分与导出，报销用。", live: false },
      ],
    },
    pillars: {
      title: "为什么是 Reeff",
      items: [
        { title: "打开就能用", body: "免安装、免注册。手机、平板、电脑同一套体验。" },
        { title: "不排队", body: "文件在你自己的设备上处理，不用上传，也没有额度墙。" },
        { title: "交代清楚", body: "哪些在本地跑、哪些要联网，我们都会标注。没有假倒计时，也没有套路。" },
      ],
    },
    tools: {
      title: "Reeff.PDF 的全部工具",
      note: "12 个工具，全部免费，全部在浏览器里跑。",
      items: [
        { name: "页面整理", href: "/organize-pdf" },
        { name: "拼接 PDF", href: "/merge-pdf" },
        { name: "拆分 PDF", href: "/split-pdf" },
        { name: "旋转 PDF", href: "/rotate-pdf" },
        { name: "页面重排", href: "/reorder-pdf-pages" },
        { name: "删除页面", href: "/delete-pdf-pages" },
        { name: "提取页面", href: "/extract-pdf-pages" },
        { name: "裁剪 PDF", href: "/crop-pdf" },
        { name: "编辑 PDF", href: "/edit-pdf" },
        { name: "PDF 转图片", href: "/pdf-to-image" },
        { name: "图片转 PDF", href: "/image-to-pdf" },
        { name: "压缩 PDF", href: "/compress-pdf" },
      ],
    },
    waitlist: {
      title: "下一个该做哪个工具？",
      body: "留下邮箱并选一个你最需要的，我们只在它上线时通知你。",
      emailLabel: "邮箱",
      emailPlaceholder: "you@example.com",
      pickLabel: "我需要…",
      options: ["Reeff.Image — 图片工具", "Reeff.Audio — 音频工具", "Reeff.Receipt — 票据与报销", "还没想好，先保持联系"],
      submit: "通知我",
      success: "收到，你已在名单里。",
      error: "这个邮箱看起来不太对，麻烦检查一下？",
    },
    privacy: {
      title: "隐私政策",
      updated: "最后更新：2026 年 11 月 6 日",
      sections: [
        {
          h: "什么在本地、什么在云端",
          p: "我们的 PDF 工具在你的浏览器里完成处理：文件不会上传给我们，我们也没有任何副本。未来少数功能（例如发票查验）需要经过服务器，这些功能都会在你使用前明确标注。",
        },
        {
          h: "我们收集什么",
          p: "如果你加入等待名单，或从联系页发来留言，我们只保存你填写的邮箱、你选择或写下的内容，其他什么都不存。",
        },
        {
          h: "广告",
          p: "工具站（pdf.reeff.app）的部分页面可能展示 Google AdSense 广告。这些页面上，Google 及其合作方可能使用 Cookie 或设备标识来投放和衡量广告；法律要求时会先出现同意提示。你可以在 Google 的广告设置里关闭个性化广告。你现在看的这个品牌站本身不含广告位。",
        },
        {
          h: "服务器日志",
          p: "和任何网站一样，我们的托管商（Vercel）会记录基础请求信息（IP、User-Agent、时间戳），用于安全与防滥用。",
        },
        { h: "你的选择", p: `随时写信到 ${CONTACT_EMAIL} 或使用联系页，我们会删除你的等待名单记录。` },
        { h: "变更", p: "如果本政策有变化，我们会更新本页顶部的日期。" },
      ],
    },
    terms: {
      title: "使用条款",
      updated: "最后更新：2026 年",
      sections: [
        { h: "服务内容", p: "Reeff 提供免费的浏览器端工具，个人与商业用途均可免费使用。" },
        { h: "使用规范", p: "请勿用这些工具从事违法活动、处理你无权处理的材料，或攻击、压垮我们的基础设施。" },
        { h: "无担保", p: "工具按「现状」提供，不附带任何形式的担保。处理重要文件前，请务必自行备份。" },
        { h: "责任限制", p: "在法律允许的范围内，我们不对间接损失或后果性损失负责，包括文件丢失或损坏。" },
        { h: "知识产权", p: "Reeff 名称、标识与站点内容归我们所有；你的文件始终完全属于你自己。" },
        { h: "适用法律", p: "Reeff 由在马来西亚注册的 Ripple Effect Technologies 运营。本条款适用马来西亚法律，争议由马来西亚法院管辖。请先写信到 reeff.app@proton.me——大多数问题一封邮件就能解决。" },
      ],
    },
    footer: {
      brandLine: "办公杂活，交给 Reeff",
      products: "产品",
      resources: "资源",
      legal: "法务",
      privacy: "隐私政策",
      terms: "使用条款",
      contact: "联系我们",
      copyright: "© 2026 Reeff · reeff.app",
    },
    contactForm: {
      title: "给我们留言",
      body: "不用注册，也没有工单号。写清你想做的事或遇到的问题；如果是 Bug，请附上浏览器与文件体积。",
      emailLabel: "你的邮箱",
      emailPlaceholder: "you@example.com",
      messageLabel: "留言",
      messagePlaceholder: "你想做什么，实际发生了什么？",
      submit: "发送",
      success: "已收到。我们都会看，通常两个工作日内回复。",
      error: "没有发送成功。检查一下邮箱地址，或直接写信给我们。",
    },
    common: {
      lastUpdated: "最后更新",
      published: "发布于",
      minRead: "分钟读完",
      relatedTools: "用到的工具",
      home: "首页",
      allGuides: "全部指南",
    },
    nav: {
      guides: "指南",
      whyLocal: "本地处理",
      about: "关于",
      changelog: "更新日志",
      roadmap: "路线图",
      contact: "联系我们",
    },
    langLabel: "语言",
  },
};
