import { SITE } from "@/content/site";
import type { Guide, Localized } from "@/content/types";

const en: Guide = {
  slug: "merge-pdf-without-losing-bookmarks",
  group: "organize",
  title: "Merging PDFs without losing bookmarks, links or page size",
  description:
    "A merge copies pages, not the document around them. What survives the page copy, what silently disappears, and how to check your finished file in under a minute.",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/merge-pdf", "/organize-pdf"],
  body: [
    {
      kind: "p",
      text: "Merging is the most-used PDF operation and the one people trust most. You add eleven invoices, press merge, and get one file with eleven pages. What the result does not tell you is that the bookmarks, the internal links and the form fields of those eleven documents are gone — the pages were copied, the containers were not. This guide explains exactly what a page copy keeps, what it drops, and how to confirm the difference in the file you just made.",
    },
    { kind: "h2", text: "Why a merge loses things nobody asked it to touch", id: "why" },
    {
      kind: "p",
      text: "A PDF is not a flat list of pages. It is a page tree plus a document catalog, and the two hold different things. Each page object carries its own content stream, its own resources (fonts, images, colour spaces) and its own annotations. The catalog carries everything that describes the document as a whole: the outline that becomes the bookmarks panel, named destinations, the AcroForm definition that makes form fields interactive, page labels, the document language tag, attachments and the XMP metadata block.",
    },
    {
      kind: "p",
      text: "Merging is implemented as a page copy: the tool loads each source file, copies the page objects into a fresh document, and saves. That fresh document has an empty catalog by construction. Nothing in that operation is broken — it is doing exactly what it was asked — but a reader who had bookmarks in the source will experience the result as loss.",
    },
    {
      kind: "ul",
      items: [
        "The bookmarks panel comes back empty, or keeps only the first document's outline if the tool copied the tree wholesale.",
        "Internal links that jumped to a page or a heading now jump nowhere, because they pointed at page objects in the old file.",
        "Form fields may still be drawn, but the AcroForm definition that made them fillable is not in the new catalog, so a “fillable” form arrives as a picture of a form.",
        "Any digital signature on a source file is invalidated the moment its bytes are rewritten — including by a merge that changes nothing visible.",
        "The merged file is a new document, so its metadata is new too: original creation dates, producer strings and XMP history belong to the sources and stay there.",
      ],
    },
    {
      kind: "figure",
      src: "/guides/merge-pdf-without-losing-bookmarks/01-bookmarks-panel.webp",
      alt: "The bookmarks panel of a merged 11-page PDF next to the panel of the original single invoice, showing the outline is empty after merging.",
      caption: "The bookmarks panel of the merged file (left) and of one source file (right). Same pages, different catalog.",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "Doing the merge so the result is predictable", id: "how" },
    {
      kind: "steps",
      items: [
        {
          title: "Decide the order before you add files",
          text: "The merge follows the order the files are listed, not their names and not their dates. Sort the folder first if the names are numbered, and use the drag handle afterwards for the two files that always end up in the wrong place. Renaming a file to force an order is the slowest possible way to do this.",
        },
        {
          title: "Merge in one pass, not in five",
          text: "Merging A+B, then merging that result with C, re-copies every earlier page again. Each round trip is another chance to drop a resource and another copy of every embedded font. Add all sources to one list and merge once; the page count and the file size both stay closer to the sum of the inputs.",
        },
        {
          title: "Check the page count before you download anything else",
          text: "Add up the page counts of the sources and compare with what the result reports. A mismatch means a file failed to load — usually a password-protected or damaged PDF — and the merge quietly used fewer pages than you expected.",
        },
      ],
    },
    {
      kind: "p",
      text: "If what you actually need is to keep the bookmarks, do not merge: keep the documents separate and reference them, or rebuild a single outline by hand in a tool that can write outlines. There is no “preserve bookmarks” checkbox, because preserving them is not a flag on the copy — it is a rebuild of the outline that has to decide what each bookmark points at in the new page numbering.",
    },
    { kind: "h2", text: "What survives a page copy", id: "survives" },
    {
      kind: "table",
      caption: "Behaviour of a page-tree merge (pdf-lib `copyPages` into a new document) — the same table applies to any tool built this way, including most free browser merges.",
      head: ["What the source file has", "In the merged file"],
      rows: [
        ["Pages, their sizes and rotation", "Kept. Every page keeps its own MediaBox and /Rotate."],
        ["Text layer, fonts, images", "Kept — and duplicated. A font used by three sources is embedded three times."],
        ["Bookmarks (the /Outlines tree)", "Dropped. The new catalog starts with no outline."],
        ["Internal links and named destinations", "Dropped, or left pointing at page numbers that no longer exist."],
        ["Form fields (AcroForm)", "Field appearances may still draw, but the definition that made them fillable is not copied."],
        ["Digital signatures", "Invalid. The signed bytes no longer exist, so every signature reports as broken."],
        ["Metadata and XMP history", "New document, new metadata. The sources' producer strings stay behind."],
      ],
    },
    { kind: "h2", text: "A4 next to Letter: the part that shows up at the printer", id: "page-size" },
    {
      kind: "p",
      text: "A merge does not pick a page size. Each page keeps its own box, which is correct behaviour and also the reason a mixed file prints badly. A4 is 210 × 297 mm (595 × 842 pt) and US Letter is 215.9 × 279.4 mm (612 × 792 pt): Letter is 5.9 mm wider and 17.6 mm shorter. Print that merged file with the driver set to “fit to page” and every page is scaled by a different factor — 595 ÷ 612 ≈ 0.97 for the Letter pages — so the text in one half of the document comes out about 3 % smaller than in the other half, and page margins no longer line up. Print at 100 % instead and the 297 mm pages are 17.6 mm taller than the sheet.",
    },
    {
      kind: "ul",
      items: [
        "If the pages are going to a printer, convert the odd paper size out before merging rather than after: one A4 document prints predictably, one mixed document does not.",
        "If the merged file is only ever read on screen, mixed sizes are harmless — most viewers simply show the two shapes.",
        "When you cannot convert, print with “fit to printable area” and accept that the two halves will differ slightly in scale. Do not use “actual size”, which clips the taller pages.",
      ],
    },
    { kind: "h2", text: "Checking the result in a minute", id: "check" },
    {
      kind: "ol",
      items: [
        "Compare page counts: the merged file should equal the sum of its sources. Fewer means a file was skipped.",
        "Open the bookmarks panel. If you expected bookmarks and the panel is empty, that is the page copy, not a bug in your file — rebuild the outline or merge differently.",
        "Search for a phrase you know sits inside the second source. If it is found, the text layer came across as text and the pages were not rasterised.",
        "Check the document properties of the first page of each source: identical paper sizes mean the print settings will behave.",
        "Try one internal link, if the source had any. A dead link confirms the destinations did not travel with the pages.",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Password-protected sources stop a merge",
      text: "A PDF that requires a password to open cannot be decoded without it, so a merge will either fail or silently use fewer pages. Remove the protection first — you need the password for that, and no local tool can recover one. The same applies to files with permission flags, which are not encryption but do stop some libraries from loading the document.",
    },
    { kind: "h2", text: "When merging is the wrong tool", id: "wrong-tool" },
    {
      kind: "ul",
      items: [
        "You need three pages out of a 200-page contract: extract them instead. The result is a new 3-page document without carrying 197 pages of baggage.",
        "You need the chapters as separate files, not one book: split instead, so each chapter keeps its own name and its own size.",
        "You need to reorder or drop pages inside one document: that is page surgery, not a merge, and doing it as a merge of three extracts produces the same pages with three times the embedded fonts.",
      ],
    },
    {
      kind: "p",
      text: "Merging is the right tool when the destination is a single file that a person or a system expects as one document — an expense claim, a due-diligence bundle, a scanned passport plus its stamp page. For everything else, the smaller operation is usually the better one, and it keeps the things a merge quietly drops.",
    },
  ],
};

const zh: Guide = {
  slug: "merge-pdf-without-losing-bookmarks",
  group: "organize",
  title: "合并 PDF 而不丢书签、链接和页尺寸",
  description:
    "合并复制的是页面，不是页面外面的那份文档。哪些东西能活过页复制、哪些会无声消失，以及怎么在一分钟内验收成品。",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/merge-pdf", "/organize-pdf"],
  body: [
    {
      kind: "p",
      text: "合并是最常用的 PDF 操作，也是大家最信任的一个。加进十一张发票、按下合并、拿到一份 11 页的文件。结果不会告诉你的是：这十一份文档的书签、内部链接和表单字段已经没了——被复制的是页面，装页面的那个容器没有。这篇讲清楚页复制到底保留了什么、丢掉了什么，以及怎么在你刚生成的文件里当场确认。",
    },
    { kind: "h2", text: "为什么「只是合并」会丢掉别的东西", id: "why" },
    {
      kind: "p",
      text: "PDF 不是一张扁平的页面清单。它是「页面树 + 文档目录」两层结构，而这两层装的东西不一样。每个页面对象自带内容流、自带资源（字体、图片、色彩空间）、自带注释；文档目录装的则是描述整份文档的东西：那个变成书签面板的大纲树、命名目标、让表单字段可以填写的 AcroForm 定义、页码标签、文档语言标记、附件，以及 XMP 元数据块。",
    },
    {
      kind: "p",
      text: "合并的实现是页复制：工具读入每个源文件，把页面对象复制进一份新建的文档，然后保存。这份新文档的目录在构造时就是空的，这不是 Bug——它只是精确地执行了被要求的那件事——但源文件里有书签的人，会把结果体验成「丢了东西」。",
    },
    {
      kind: "ul",
      items: [
        "书签面板变空；如果工具连整棵大纲树一起搬，那就只剩第一份文档的大纲。",
        "跳到某一页或某个标题的内部链接现在无处可跳，因为它们指向的是旧文件里的页面对象。",
        "表单字段可能还画得出来，但让它们能填写的 AcroForm 定义没有进新目录，所以「可填写」的表单到手时是一张表单的图片。",
        "源文件上的任何数字签名，在字节被重写的那一刻就失效了——包括一次看上去什么都没改的合并。",
        "合并产物是一份新文档，元数据也是新的：原始的创建时间、生成器字符串和 XMP 历史属于源文件，就留在源文件里。",
      ],
    },
    {
      kind: "figure",
      src: "/guides/merge-pdf-without-losing-bookmarks/01-bookmarks-panel.webp",
      alt: "合并后 11 页 PDF 的书签面板，与原始单张发票的书签面板并排对比，显示合并后大纲为空。",
      caption: "合并产物（左）与其中一份源文件（右）的书签面板。页面一样，目录不一样。",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "怎么合并才可控", id: "how" },
    {
      kind: "steps",
      items: [
        {
          title: "先定顺序，再加文件",
          text: "合并按文件列表里的顺序，不按文件名、也不按日期。如果文件名本来就有编号，先把文件夹排好；剩下那一两个永远站错位置的文件，再用拖拽手柄调。靠改名来强行排序是最慢的办法。",
        },
        {
          title: "一次合完，不要分五次",
          text: "先合 A+B、再拿结果去合 C，等于把前面所有页面又复制了一遍。每多一个来回，就多一次丢资源的机会，也多一份嵌入字体。把所有源文件放进一个列表里合一次，页数和体积都更接近各输入之和。",
        },
        {
          title: "先对页数，再下载",
          text: "把各源文件的页数加起来，跟结果报出的页数对一下。对不上说明有文件没读进来——通常是加密或损坏的 PDF——而合并在你没注意的时候少用了几页。",
        },
      ],
    },
    {
      kind: "p",
      text: "如果你真正要保住的正是书签，那就别合并：让文档保持分开并互相引用，或者在能写大纲的工具里手工重建一份目录。没有「保留书签」这个勾选项——保留书签不是一个复制开关，而是重建整棵大纲，并且得决定每条书签在新页码里指向哪里。",
    },
    { kind: "h2", text: "页复制到底保留了什么", id: "survives" },
    {
      kind: "table",
      caption: "页面树合并（pdf-lib 的 `copyPages` 写进一份新文档）的行为表——任何这样实现的工具都适用，包括大部分免费的浏览器合并。",
      head: ["源文件里有什么", "合并产物里"],
      rows: [
        ["页面、页尺寸与旋转", "保留。每页带着自己的 MediaBox 和 /Rotate。"],
        ["文字层、字体、图片", "保留，而且重复。三份源文件都用到的字体，会被嵌入三次。"],
        ["书签（/Outlines 大纲树）", "丢弃。新目录从没有大纲开始。"],
        ["内部链接与命名目标", "丢弃，或者留着指向已经不存在的页码。"],
        ["表单字段（AcroForm）", "字段外观可能还画得出来，但让它能填写的那份定义没有被复制。"],
        ["数字签名", "失效。被签过的那串字节已经不存在，所有签名都会报「无效」。"],
        ["元数据与 XMP 历史", "新文档、新元数据；源文件的生成器字符串留在原处。"],
      ],
    },
    { kind: "h2", text: "A4 与 Letter 混在一起：只在打印时暴露的问题", id: "page-size" },
    {
      kind: "p",
      text: "合并不会替你选一个页尺寸。每一页保留自己的框，这是正确行为，也正是混合文件打印难看的原因。A4 是 210 × 297 毫米（595 × 842 pt），美式 Letter 是 215.9 × 279.4 毫米（612 × 792 pt）：Letter 宽 5.9 毫米、矮 17.6 毫米。把这样一份文件交给「适应页面」的打印驱动，每页都会按不同比例缩放——Letter 页是 595 ÷ 612 ≈ 0.97——于是同一份文件里有一半的字小了约 3%，页边距也不再对齐。改成 100% 打印，297 毫米的那些页又比纸张高 17.6 毫米。",
    },
    {
      kind: "ul",
      items: [
        "如果这些页面要进打印机，请在合并之前、而不是之后，把不合适的纸张尺寸转掉：一份 A4 文档打印行为可预测，一份混合文档不行。",
        "如果合并结果只会在屏幕上读，混合尺寸无害——大多数阅读器只是把两种形状都显示出来。",
        "实在不能转换时，用「适应可打印区域」打印，并接受两半的缩放略有差异。不要用「实际大小」，它会把高的那些页裁掉。",
      ],
    },
    { kind: "h2", text: "一分钟验收", id: "check" },
    {
      kind: "ol",
      items: [
        "对页数：合并产物的页数应该等于各源文件之和。少了，就是有文件被跳过。",
        "打开书签面板。如果你本来期待书签而面板是空的，那是页复制的必然结果，不是你文件的 Bug——重建大纲，或换一种合并方式。",
        "搜索一句你确定在第二份源文件里的话。搜得到，说明文字层是作为文字过来的，页面没有被转成图片。",
        "逐份查看各源文件首页的文档属性：纸张尺寸一致，打印设置才会一致。",
        "源文件有内部链接的话，点一个试试。链接失效，就说明命名目标确实没跟着页面走。",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "加密的源文件会打断合并",
      text: "需要密码才能打开的 PDF，没有密码就无法解码，合并要么直接失败，要么在你不注意的时候少用了几页。请先解除保护——这需要密码，任何本地工具都不可能帮你找回。带权限标记的文件同理：那些标记不是加密，但确实会让某些库拒绝载入。",
    },
    { kind: "h2", text: "什么时候不该用合并", id: "wrong-tool" },
    {
      kind: "ul",
      items: [
        "你只要 200 页合同里的三页：用提取。结果是一份新的 3 页文档，不用背着另外 197 页。",
        "你要的是把章节分成独立文件、而不是一本书：用拆分，每章保留自己的名字和体积。",
        "你要在一份文档里调整顺序或删页：那是页面手术，不是合并；用「合并三份提取结果」来做这件事，页面对了，嵌入字体却多了三倍。",
      ],
    },
    {
      kind: "p",
      text: "当目的地确实是一份文件——报销材料、尽调包、护照扫描件加盖章页——合并就是对工具。其余情况下，更小的那个操作通常更好，而且它保住了合并会悄悄丢掉的那些东西。",
    },
  ],
};

export const mergeWithoutLosingBookmarks: Localized<Guide> = { en, zh };
