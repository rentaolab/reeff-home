import type { Localized, PageDoc } from "@/content/types";
import { SITE } from "@/content/site";

/** /contact — a real page (not a mailto in the footer) so the site has a reachable owner. */
export const contactPage: Localized<PageDoc> = {
  en: {
    title: "Contact",
    description: "How to reach Reeff: bug reports, tool requests, privacy questions, and what to include.",
    updated: "2026-11-06",
    body: [
      {
        kind: "p",
        text: `Write to ${SITE.email}. One inbox, read by the people who build the tools. Most messages get a reply within two working days; a hard bug that needs a fix may take a little longer, and we will tell you so instead of going quiet.`,
      },
      { kind: "h2", text: "Reporting a bug", id: "bug" },
      {
        kind: "p",
        text: "Because the processing happens on your device, we cannot look at your file — we never received it. That makes three details worth more than a paragraph of description:",
      },
      {
        kind: "ul",
        items: [
          "Browser and version, plus the device (for example Safari 18 on an iPhone 13, or Chrome on Windows 11 with 8 GB of RAM).",
          "Page count and approximate file size — “a 340-page, 48 MB scan” is enough.",
          "What you expected and what happened instead, including the exact wording of any error message.",
        ],
      },
      {
        kind: "p",
        text: "If the tab froze or crashed, mention how much memory the browser was using if you happened to see it. Freezes on large scans are almost always a memory limit rather than a bug, and knowing the device makes it possible to reproduce.",
      },
      { kind: "h2", text: "Requesting a tool", id: "request" },
      {
        kind: "p",
        text: "Tell us the job, not the feature name: “I need to turn a folder of phone photos into one A4 PDF at a sensible size” is more useful than “add a batch mode”. Requests that start with a real chore are the ones that get built.",
      },
      { kind: "h2", text: "Privacy and data questions", id: "privacy" },
      {
        kind: "p",
        text: `Anything about the waitlist — including deleting your entry — goes to the same address. We keep the email address you typed and the product you picked, nothing else. What the pages themselves collect is listed in the privacy policy.`,
      },
      { kind: "h2", text: "What we cannot help with", id: "limits" },
      {
        kind: "ul",
        items: [
          "Recovering a file. Local processing means no copy exists anywhere; if the output was overwritten or the tab closed, there is nothing on our side to restore.",
          "Reading a document for you, or advising on its legal or tax content.",
          "Password recovery for a PDF you cannot open.",
        ],
      },
      {
        kind: "callout",
        tone: "note",
        title: "Press and partnerships",
        text: `Use the same address with “press” in the subject line. We answer questions about how the tools work, but we do not pay for reviews or place sponsored “best tools” listicles.`,
      },
    ],
  },
  zh: {
    title: "联系我们",
    description: "怎么联系 Reeff：Bug 反馈、工具需求、隐私问题，以及需要附上哪些信息。",
    updated: "2026-11-06",
    body: [
      {
        kind: "p",
        text: `写信到 ${SITE.email}。只有一个邮箱，由做工具的人自己看。多数邮件两个工作日内回复；需要真正修代码的硬 Bug 可能久一点，但我们会告诉你进度，不会拖着不回。`,
      },
      { kind: "h2", text: "反馈 Bug", id: "bug" },
      {
        kind: "p",
        text: "因为处理发生在你的设备上，我们看不到你的文件——我们从来没有收到过它。所以下面三项信息比一大段描述更有用：",
      },
      {
        kind: "ul",
        items: [
          "浏览器与版本，以及设备（例如 iPhone 13 上的 Safari 18，或 8 GB 内存的 Windows 11 上的 Chrome）。",
          "文件页数与大致体积——「一份 340 页、48 MB 的扫描件」就够了。",
          "你期望发生什么、实际发生了什么，以及报错的原文。",
        ],
      },
      {
        kind: "p",
        text: "如果标签页卡死或崩溃，顺手看一眼浏览器占了多少内存并写进来。大扫描件卡死几乎都是内存上限问题而不是 Bug，知道设备才可能复现。",
      },
      { kind: "h2", text: "想要一个工具", id: "request" },
      {
        kind: "p",
        text: "说事情，别说功能名：「我要把一堆手机照片拼成一份体积合理的 A4 PDF」比「加一个批量模式」有用得多。从真实杂活出发的需求，才会真的被做出来。",
      },
      { kind: "h2", text: "隐私与数据问题", id: "privacy" },
      {
        kind: "p",
        text: "等待名单相关的一切——包括删除你的记录——都发同一个地址。我们只保留你填的邮箱和你选的产品，别的不存。页面本身收集什么，写在隐私政策里。",
      },
      { kind: "h2", text: "我们帮不了的", id: "limits" },
      {
        kind: "ul",
        items: [
          "找回文件。本地处理意味着任何地方都没有副本；输出被覆盖或标签页关掉之后，我们这边没有东西可以恢复。",
          "替你阅读文件，或就其法律、税务内容给出建议。",
          "破解你打不开的 PDF 密码。",
        ],
      },
      {
        kind: "callout",
        tone: "note",
        title: "媒体与合作",
        text: "用同一个地址，标题里写 press。关于工具怎么实现的问题我们会回答，但我们不付费买评测，也不投放「最佳工具」这类软文榜单。",
      },
    ],
  },
};
