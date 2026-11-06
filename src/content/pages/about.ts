import type { Localized, PageDoc } from "@/content/types";
import { SITE } from "@/content/site";

/** /about — the "Who" and "How" that Google's helpful-content guidance asks for. */
export const aboutPage: Localized<PageDoc> = {
  en: {
    title: "About Reeff",
    description:
      "Who builds Reeff, why the local tools are free, how the guides are tested, and what we refuse to do.",
    updated: "2026-11-06",
    body: [
      {
        kind: "p",
        text: "Reeff is a small independent project. It exists because most “free online converters” ask you to upload a private document to a server you know nothing about, watch a progress bar, and then solve a CAPTCHA to get your own file back. We thought the browser could do the work instead.",
      },
      { kind: "h2", text: "Who runs this site", id: "who" },
      {
        kind: "p",
        text: `Reeff is built and maintained by the same small team that publishes Reeff.PDF. The code for both sites — this brand site and the toolkit at pdf.reeff.app — lives in public repositories in the ${SITE.org} organisation on GitHub (${SITE.orgUrl}), including the commit history.`,
      },
      {
        kind: "p",
        text: `There is no content agency and no outsourced editorial queue behind these pages. The person who answers mail at ${SITE.email} is the same person who writes and tests the tools, which is also why replies sometimes take a day.`,
      },
      { kind: "h2", text: "Why the local tools are free", id: "free" },
      {
        kind: "p",
        text: "A file processed in your browser costs us nothing per file: your device does the work, so there is no server bill to recover. That is why tools that run locally are free and unlimited, and why we do not put a quota counter or a “you have 2 conversions left” wall in front of them.",
      },
      {
        kind: "p",
        text: "Features that genuinely need a server — cloud OCR, invoice verification, batch queues, syncing history across devices — are planned as pay-as-you-go. We would rather say that up front than hide a paywall behind a free trial.",
      },
      { kind: "h2", text: "How the guides are written and tested", id: "method" },
      {
        kind: "ul",
        items: [
          "Each guide is written after using the tool on real files, then re-read against the current interface. They are not generated from a keyword list.",
          "Numbers are measured on the hardware and browser named in the guide. When something cannot be measured reliably, the guide says so and explains how to test it yourself instead of quoting a figure.",
          "Screenshots come from the live site. When an interface changes, the screenshot is replaced in the same commit as the change.",
          "Corrections are visible: the page keeps a publication date and an update date, and we change them when the text changes.",
        ],
      },
      { kind: "h2", text: "How often things change", id: "cadence" },
      {
        kind: "p",
        text: "Tools ship when they are usable, not on a calendar. The changelog records what changed and when it went live; the roadmap lists what we are working on and what we have decided not to build. Both are pages, not promises buried in an email.",
      },
      { kind: "h2", text: "What we will not do", id: "never" },
      {
        kind: "ul",
        items: [
          "No fake countdown timers, no “only 3 spots left”, no invented testimonials or review scores.",
          "No claiming a file “never leaves your device” for a feature that does upload it. Anything that talks to a server is labelled before you click.",
          "No selling, renting or trading the addresses people give us for the waitlist.",
          "No thin pages published just to hold a keyword — if a page has nothing to say yet, it does not go live.",
        ],
      },
      { kind: "h2", text: "Getting in touch", id: "contact" },
      {
        kind: "p",
        text: `Mail ${SITE.email} or use the contact page. Bug reports with the browser, the page count and the file size get a faster answer, because those three details usually explain the problem on their own.`,
      },
    ],
  },
  zh: {
    title: "关于 Reeff",
    description: "谁在做 Reeff、本地工具为什么免费、指南是怎么测出来的，以及我们不做什么。",
    updated: "2026-11-06",
    body: [
      {
        kind: "p",
        text: "Reeff 是一个小型的独立项目。做它的原因很直接：大多数「免费在线转换器」要你把一份私人文件上传到一台你完全不了解的服务器，看进度条跑完，再解一个验证码，才能拿回自己的文件。我们认为浏览器自己就能把这件事做完。",
      },
      { kind: "h2", text: "谁在维护这个站", id: "who" },
      {
        kind: "p",
        text: `Reeff 由发布 Reeff.PDF 的同一支小团队维护。品牌站与工具站（pdf.reeff.app）的代码都放在 GitHub 上 ${SITE.org} 组织的公开仓库里（${SITE.orgUrl}），提交历史也在那里。`,
      },
      {
        kind: "p",
        text: `这些页面背后没有内容工厂，也没有外包的编辑队列。回 ${SITE.email} 邮件的人，就是写工具、测工具的人——所以有时回信会晚一天。`,
      },
      { kind: "h2", text: "本地工具为什么免费", id: "free" },
      {
        kind: "p",
        text: "在你浏览器里处理的文件，不会给我们带来任何按次成本：算力是你的设备出的，没有服务器账单需要摊回来。所以本地跑的工具免费、不限量，也不设「今日剩余 2 次」这种计数墙。",
      },
      {
        kind: "p",
        text: "确实需要服务器的功能——云端 OCR、发票查验、批量队列、跨设备同步历史——会按需付费。这件事我们写在前面，而不是用「免费试用」盖住收费墙。",
      },
      { kind: "h2", text: "指南是怎么写、怎么测的", id: "method" },
      {
        kind: "ul",
        items: [
          "每篇指南都是先用工具处理真实文件、再对着当前界面复核之后写的，不是按关键词批量生成的。",
          "文中的数字都在指南里写明的设备与浏览器上测过。测不准的地方就直接说测不准，并给出你自己复现的方法，而不是编一个数字。",
          "截图来自线上站点。界面一改，截图会和改动在同一次提交里一起替换。",
          "纠错是可见的：页面保留发布时间与更新时间，正文改动时日期跟着改。",
        ],
      },
      { kind: "h2", text: "更新节奏", id: "cadence" },
      {
        kind: "p",
        text: "工具能用才上线，不按日历上线。更新日志记录改了什么、什么时候上线；路线图列出正在做的与决定不做的。两者都是页面，而不是藏在邮件里的口头承诺。",
      },
      { kind: "h2", text: "我们不做什么", id: "never" },
      {
        kind: "ul",
        items: [
          "不做假倒计时，不写「仅剩 3 个名额」，不编造用户评价与评分。",
          "不会把一个会上传文件的功能说成「文件从不离开你的设备」。任何要联网的处理，都会在你点击之前标注清楚。",
          "不贩卖、不出租、不交换等待名单里的邮箱。",
          "不为了占关键词而发布空洞页面——一个页面还没有实质内容，就不上线。",
        ],
      },
      { kind: "h2", text: "联系我们", id: "contact" },
      {
        kind: "p",
        text: `写信到 ${SITE.email}，或用联系页。带上浏览器、文件页数和文件体积的 bug 反馈会更快得到答复——这三项通常已经足够定位问题。`,
      },
    ],
  },
};
