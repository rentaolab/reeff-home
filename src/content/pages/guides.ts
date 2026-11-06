import type { Localized, PageDoc } from "@/content/types";

/** Intro copy for the /guides index. The articles themselves live in src/content/guides/. */
export const guidesIndexPage: Localized<PageDoc> = {
  en: {
    title: "Guides",
    description:
      "Practical PDF work, tested on real files: merging without losing bookmarks, splitting long scans, why compression disappoints, and print settings that survive the printer.",
    updated: "2026-11-06",
    body: [
      {
        kind: "p",
        text: "Most “how to merge a PDF” pages are the same six sentences with a different heading. These are not those. Each guide starts from a job that actually goes wrong — a 300-page scan that freezes the tab, a merge that loses every bookmark, a “compressed” file that prints worse — and explains what the tool does to the bytes, what it cannot do, and how to tell the difference in the result.",
      },
      {
        kind: "p",
        text: "Every guide is written after running the tool on real files, and every number in one is either measured on the hardware named in the text or explicitly labelled as arithmetic. When a figure depends on your device, the guide gives you the method to get your own answer instead of a confident number that would not apply to you.",
      },
      { kind: "h2", text: "How to read them", id: "how" },
      {
        kind: "ul",
        items: [
          "Guides are grouped by the kind of job: organising pages, converting formats, preparing a file for print, and how local processing behaves.",
          "Each one ends with the tools it refers to, so you can go from the explanation to the tool without a search.",
          "Publication and update dates are on every article. If a page has not been touched since the interface changed, that is a bug — tell us.",
        ],
      },
    ],
  },
  zh: {
    title: "指南",
    description:
      "用真实文件测出来的 PDF 实务：合并时不丢书签、拆分长扫描件、压缩为什么常常无效、以及能过打印机的那套设置。",
    updated: "2026-11-06",
    body: [
      {
        kind: "p",
        text: "大多数「怎么合并 PDF」的页面，都是同样的六句话换个标题。这里不是。每篇指南都从一个真的会出错的活儿开始——300 页扫描件把标签页卡死、合并之后书签全丢、所谓「压缩」之后打印更糊——然后讲清工具对字节做了什么、做不了什么，以及怎么在结果里分辨出来。",
      },
      {
        kind: "p",
        text: "每篇指南都是先用工具处理真实文件才写的；文中每个数字，要么是在文里写明的设备上实测的，要么明确标注为「按算术推算」。如果某个数值取决于你的设备，指南给的是自己测出答案的方法，而不是一个对你并不成立的笃定数字。",
      },
      { kind: "h2", text: "怎么读", id: "how" },
      {
        kind: "ul",
        items: [
          "指南按活儿分组：整理页面、转换格式、为打印做准备，以及本机处理的实际表现。",
          "每篇结尾都列出它提到的工具，看完就能直接进去用，不用再去搜。",
          "每篇都有发布日期与更新日期。界面改过而文章没动，那就是 Bug——请告诉我们。",
        ],
      },
    ],
  },
};
