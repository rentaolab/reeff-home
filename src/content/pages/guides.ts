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
      { kind: "h2", text: "Where to start", id: "start" },
      {
        kind: "p",
        text: "If you recognise the symptom but not the tool, this table is the short version. Each row names the failure, the guide that explains it, and the tool that fixes it — no search box, no second page.",
      },
      {
        kind: "table",
        caption: "Eight jobs people actually get wrong, one guide each. If your problem is not on this list, it is probably not a PDF problem.",
        head: ["What you are seeing", "The guide that explains it", "Tool"],
        rows: [
          ["The merged file lost its bookmarks, links and form fields", "Merging PDFs without losing bookmarks", "Merge PDF, Organise PDF"],
          ["A long scan freezes the tab or dies at 99%", "Browser memory limits for PDF", "Split PDF, Compress PDF"],
          ["“Compression” saved 8% and the text now looks soft", "Why compression barely shrinks a scan", "Compress PDF"],
          ["The print proof came back cropped, scaled or with a white margin", "Print-ready PDF checklist", "Crop PDF, Compress PDF"],
          ["One page has to go, five have to come out, a section has to move", "Delete, extract, reorder: which tool", "Delete pages, Extract pages, Organise PDF"],
          ["A signature has to land on the line today, without a printer", "Signing a PDF without a printer", "Sign / Edit PDF"],
          ["Photos have to become one PDF under an attachment limit", "Images to PDF: DPI and size", "Image to PDF"],
          ["A deck needs pages as images, for slides or a website", "PDF to image: choosing a DPI", "PDF to Image"],
        ],
      },
      { kind: "h2", text: "What you will not find here", id: "not-here" },
      {
        kind: "p",
        text: "No “15 best PDF tools of the year” list, no walkthrough for software you have to install first, and no promise that any of this rescues a file that is already broken beyond its page structure — a PDF with a corrupt cross-reference table has to be repaired before it can be split. We also do not write about operations our tools do not perform: optical character recognition, removing a password, redaction that really destroys the pixels underneath, and conversion to Word. Pointing those jobs at a page that cannot do them would waste your afternoon and our credibility.",
      },
      {
        kind: "p",
        text: "What is here is narrower and, we think, more useful: nine jobs that people genuinely get wrong, explained down to what happens to the bytes, with a way to check the result yourself in under a minute. Where a guide cannot measure something on your hardware, it says so and hands you the method instead of a confident number that would not have applied to you anyway.",
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
      { kind: "h2", text: "从哪儿开始", id: "start" },
      {
        kind: "p",
        text: "如果你认得出症状、但不知道该用哪个工具，这张表就是短版答案。每一行都写明出了什么问题、哪篇指南解释它、哪个工具解决它——不用搜索框，也不用再开一个页面。",
      },
      {
        kind: "table",
        caption: "八个真的会做错的活儿，一篇指南一个。你的问题不在这张表里，那它多半不是 PDF 的问题。",
        head: ["你看到的现象", "解释它的指南", "工具"],
        rows: [
          ["合并后的文件丢了书签、内链和表单域", "合并 PDF 而不丢书签", "合并 PDF、整理 PDF"],
          ["长扫描件让标签页卡死，或停在 99%", "PDF 处理中的浏览器内存上限", "拆分 PDF、压缩 PDF"],
          ["「压缩」只省了 8%，文字反而糊了", "为什么压缩几乎不缩小扫描件", "压缩 PDF"],
          ["打样回来被裁掉、被缩放，或边上多出白边", "印刷前的 PDF 预检清单", "裁剪 PDF、压缩 PDF"],
          ["要删一页、提取五页、把一段挪到前面", "删除、提取、排序该用哪个工具", "删除页面、提取页面、整理 PDF"],
          ["签名今天必须落在横线上，而且没有打印机", "没有打印机也能签 PDF", "签字 / 编辑 PDF"],
          ["照片要合成一份 PDF，还得在附件上限以内", "图片转 PDF：DPI 与体积", "图片转 PDF"],
          ["幻灯片或网页需要把页面当图片用", "PDF 转图片：DPI 怎么选", "PDF 转图片"],
        ],
      },
      { kind: "h2", text: "这里没有的东西", id: "not-here" },
      {
        kind: "p",
        text: "没有「年度十五个最佳 PDF 工具」式的榜单，没有必须先装软件的分步教程，也不承诺这些方法能救回一个页面结构已经坏掉的文件——交叉引用表损坏的 PDF，得先修好才能拆分。我们也不写自己的工具做不到的操作：文字识别（OCR）、解除密码、真正把底层像素销毁的涂黑，以及转成 Word。把这些活儿推给一个根本做不到的页面，只会浪费你一个下午，再赔上我们的可信度。",
      },
      {
        kind: "p",
        text: "这里的东西更窄，但我认为更有用：九个人们真的会做错、能一路讲到字节层面、并且附带一分钟自查方法的活儿。某个数字我们没在你的硬件上测过，指南会直说，然后把方法交给你，而不是给你一个对你本来就不成立的笃定数字。",
      },
    ],
  },
};
