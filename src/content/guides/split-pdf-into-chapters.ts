import { SITE } from "@/content/site";
import type { Guide, Localized } from "@/content/types";

const en: Guide = {
  slug: "split-pdf-into-chapters",
  group: "organize",
  title: "Splitting a 300-page PDF into chapters without re-compressing it",
  description:
    "A split copies pages into new documents, so nothing is re-encoded — but the total size grows, the outline disappears and the printed page numbers stop matching. How to cut a long file so each part is usable on its own.",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/split-pdf", "/extract-pdf-pages"],
  body: [
    {
      kind: "p",
      text: "A 300-page report, manual or scanned bundle is rarely useful as one file: the accountant wants the financial section, the lawyer wants the annex, the person printing wants the ten pages that go to the client. Splitting is the operation that turns one file into those parts. It is also the operation where the arithmetic surprises people, because every part is a complete new document — with its own copy of the fonts, its own metadata and no outline at all.",
    },
    { kind: "h2", text: "A split is a page copy, not a re-export", id: "what-a-split-is" },
    {
      kind: "p",
      text: "The tool loads the source once, then writes one new PDF per segment by copying the pages that belong to it. Nothing is decoded, nothing is re-rendered and no image is re-encoded: each page's content stream and resources are handed to the new document as they are. That is the good news, and it is why splitting is the safe operation for a scan — a 300-page file cut into twelve chapters still has the same text layer, the same images and the same resolution in every part.",
    },
    {
      kind: "p",
      text: "The less good news is what “a complete new document” costs. Every segment carries its own document-level structure, and any resource its pages use has to be present inside that segment. A font subset embedded once in the original is embedded again in each part whose pages use it. For a Latin text document that is often 40–200 KB of duplicated font data per part; for a PDF with a CJK font subset or a large colour profile it can be a megabyte or more per part.",
    },
    {
      kind: "table",
      caption: "What survives a split, per output file.",
      head: ["Thing", "After splitting into 12 parts"],
      rows: [
        ["Page content, images, text layer", "Identical to the source. Nothing is re-encoded, so nothing degrades."],
        ["Embedded fonts and colour profiles", "Copied into every part that uses them, so the total across all parts is larger than the original."],
        ["Bookmarks (outline)", "Gone. Each part is a new document with an empty catalog."],
        ["Form fields", "The definition lives in the document catalog, so fields stop being fillable even when they still draw."],
        ["Metadata", "Each part gets fresh producer and dates; the source's history is not carried over."],
        ["Page numbering", "Restarts at 1 in every part. A part that was pages 61–90 shows page 1 on its first page."],
      ],
    },
    {
      kind: "figure",
      src: "/guides/split-pdf-into-chapters/01-cut-points.webp",
      alt: "The split tool with a 300-page PDF loaded and cut points marked between chapters, showing twelve segments in the result list.",
      caption: "Cut points are set after a page, not at a page: the file is divided into the segments between them.",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "Finding the boundaries before you cut", id: "boundaries" },
    {
      kind: "p",
      text: "The hard part of splitting is never the button. It is knowing that chapter 4 starts on printed page 61, which may be PDF page 67 — or page 3, if the front matter uses roman numerals. Getting this wrong produces parts that are off by six pages, and the error stays invisible until somebody notices a chapter beginning mid-sentence.",
    },
    {
      kind: "ol",
      items: [
        "Search the document for the chapter heading itself (“Chapter 4”, “Annex B”, the exact heading string). The viewer jumps to the page where that text is, which is the page you must cut before.",
        "Note the viewer's page number and the number printed on the page. Keep the offset — for example, printed 61 is viewer 67, so the offset is +6 for the rest of the document.",
        "If the file is a scan with no text layer there is nothing to search: read the printed page numbers off the thumbnails and apply the offset you worked out from the first chapter.",
        "Write the cut points down as “before page N” in one list before touching the tool. Splitting from memory in three passes is how documents end up with a duplicated page.",
      ],
    },
    { kind: "h2", text: "Cutting", id: "how" },
    {
      kind: "steps",
      items: [
        {
          title: "Add the file and let it count the pages",
          text: "Confirm the page count matches what the viewer reports. A file that loads as 298 pages instead of 300 has two damaged pages, and every cut point after them is now shifted.",
        },
        {
          title: "Set cut points, not ranges",
          text: "Splitting works from breakpoints: a cut after page 30 means pages 1–30 become the first file and 31 onwards the second. Twelve chapters need eleven cut points, not twelve — the first segment always starts at page 1 and the last always ends on the final page.",
        },
        {
          title: "Name the parts before you download them",
          text: "A dozen files called report-1.pdf through report-12.pdf are unusable a week later. Rename as you save, with the chapter number first so the folder sorts correctly, and keep the zero padding (02, 03 … 12) once there are more than nine.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "note",
      title: "A cut on the last page is ignored",
      text: "A breakpoint only means something if there are pages on both sides of it, so a cut after the final page produces no extra file — there is nothing to cut. If you expected twelve files and got eleven, the missing one is almost always a cut point that landed on an edge.",
    },
    { kind: "h2", text: "What to check in each part", id: "check" },
    {
      kind: "ol",
      items: [
        "Add up the page counts of all the parts and compare with the source. Twelve parts that add to 299 mean one page went missing at a boundary.",
        "Read the first line of every part. A chapter that starts mid-sentence is an off-by-one in the page offset you wrote down, and it is the single most common split mistake.",
        "Search inside one part for a word you know is in that chapter. A split keeps the text layer, so the search must work; if it does not, the file was already rasterised before you split it.",
        "Open the smallest part on a phone. A part that refuses to open usually lost a resource the page copy did not bring along — rare, but this is the cheapest possible test for it.",
        "Check that the names sort correctly in the folder listing: 02 has to come before 10, which only happens if you kept the zero padding.",
      ],
    },
    { kind: "h2", text: "When a split is the wrong operation", id: "wrong-tool" },
    {
      kind: "ul",
      items: [
        "You want one range out of a 300-page file: extract is one operation, while splitting gives you twelve files you then have to delete.",
        "You want those pages with a new numbering scheme, a running header or a rebuilt outline: that is an export from the application that made the document, not a PDF operation. No page-copy tool can invent page labels.",
        "The parts must stay searchable together: splitting destroys the shared structure, so each part is searched on its own from then on.",
        "The document is under about 20 pages. Splitting it into chapters saves nothing — one file with bookmarks would have been the better artefact.",
      ],
    },
    {
      kind: "p",
      text: "A split is worth doing when each part has its own owner, its own deadline or its own destination: the annex goes to the auditor, the manual goes to the printer, the contract goes to the client. If the parts only exist to get under an upload limit, compressing or trimming the document is the smaller change.",
    },
  ],
};

const zh: Guide = {
  slug: "split-pdf-into-chapters",
  group: "organize",
  title: "把 300 页 PDF 拆成章节，而不重新压缩",
  description:
    "拆分是页复制，不是重新导出：什么都不重编码，但总体积会变大、大纲会消失、印刷页码会对不上。怎么切，才能让每一份都能单独用。",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/split-pdf", "/extract-pdf-pages"],
  body: [
    {
      kind: "p",
      text: "300 页的报告、手册或扫描合集，作为一份文件几乎没用：会计要财务那一段，法务要附件，打印的人只要交给客户的十页。拆分就是把这一个文件变成那几份的操作。它也是最容易让人对体积感到意外的操作，因为每一份都是完整的新文档——自带一份字体、自带元数据，而且完全没有大纲。",
    },
    { kind: "h2", text: "拆分是页复制，不是重新导出", id: "what-a-split-is" },
    {
      kind: "p",
      text: "工具只载入源文件一次，然后为每个分段写出一份新 PDF：把属于这一段的页面复制进去。不解码、不重绘、不重编码图片——每页的内容流和资源都是原样交给新文档的。这是好消息，也是为什么说拆分对扫描件是安全操作：300 页切 12 章之后，每一份的文字层、图片和分辨率都和原来一样。",
    },
    {
      kind: "p",
      text: "不那么好的消息是「完整的新文档」要付的代价。每个分段都自带文档级结构，它页面上用到的任何资源都必须存在于这一段里。原来只嵌入一次的字体子集，会在每一个用到它的分段里再嵌入一次。对拉丁文字文档来说，这常常是每份 40–200 KB 的重复字体数据；而带中日韩字体子集或大色彩配置文件的 PDF，每份可能要多出 1 MB 以上。",
    },
    {
      kind: "table",
      caption: "拆分后每一份产物里，哪些东西还在。",
      head: ["项目", "拆成 12 份之后"],
      rows: [
        ["页面内容、图片、文字层", "与源文件完全一致。没有任何重编码，所以画质不会下降。"],
        ["嵌入字体与色彩配置文件", "被复制进每一个用到它们的分段，因此各份加起来比原件更大。"],
        ["书签（大纲）", "没了。每一份都是新文档，目录是空的。"],
        ["表单字段", "字段定义住在文档目录里，所以即使还能画出来，也已经不能填写。"],
        ["元数据", "每份都有新的生成器和日期；源文件的历史不会跟过来。"],
        ["页码", "每份都从 1 重新开始。原来是 61–90 页的那一份，第一页会显示第 1 页。"],
      ],
    },
    {
      kind: "figure",
      src: "/guides/split-pdf-into-chapters/01-cut-points.webp",
      alt: "拆分工具里载入了一份 300 页 PDF，章节之间标好了切分点，结果列表显示十二个分段。",
      caption: "切分点是「在第几页之后切」，不是「在第几页切」：文件被切成这些点之间的段落。",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "先找边界，再动手", id: "boundaries" },
    {
      kind: "p",
      text: "拆分难的一直不是那个按钮，而是你得知道「第 4 章从印刷页码 61 开始」这件事对应到 PDF 的第几页——可能是第 67 页，也可能因为前面用了罗马数字而是第 3 页。这一步搞错，切出来的每一份都会偏六页，而且这个错误直到有人发现某章从半句话开始才会暴露。",
    },
    {
      kind: "ol",
      items: [
        "直接搜章节标题本身（「第 4 章」「附件 B」，或那行标题的原文）。阅读器会跳到文字所在的那一页，那就是你要切在它前面的页。",
        "记下阅读器显示的页号，以及纸上印的页号，把偏移量记住——例如印的 61 是查看器的 67，那么整份文档的偏移就是 +6。",
        "如果是没有文字层的扫描件，就没得搜：从缩略图上读印刷页码，套用你从第一章算出来的偏移量。",
        "动手之前，把切点写成一个列表：「在第 N 页之前」。分三次凭记忆拆，是文档出现重复页的标准原因。",
      ],
    },
    { kind: "h2", text: "开始切", id: "how" },
    {
      kind: "steps",
      items: [
        {
          title: "先加文件，让它数页数",
          text: "确认页数和阅读器报的一致。本该 300 页却载入成 298 页，说明有两页损坏，而它们之后的每个切点都跟着移位了。",
        },
        {
          title: "设的是切点，不是区间",
          text: "拆分是按断点工作的：在第 30 页之后切一刀，意思是 1–30 页成为第一份、31 页往后是第二份。12 章只需要 11 个切点，不是 12 个——第一段永远从第 1 页开始，最后一段永远到最后一页结束。",
        },
        {
          title: "下载之前就改好名字",
          text: "一堆叫 report-1.pdf 到 report-12.pdf 的文件，一周后就没法用了。保存时顺手改名，把章号放在最前面，文件夹才能正确排序；超过九份时保留补零（02、03 … 12）。",
        },
      ],
    },
    {
      kind: "callout",
      tone: "note",
      title: "切在最后一页上的刀会被忽略",
      text: "一个断点只有在两边都有页面时才有意义，所以在最后一页之后切不会多出文件——没有东西可切。如果你期待 12 份却只拿到 11 份，缺的那一刀几乎总是落在了边上。",
    },
    { kind: "h2", text: "每一份都要检查什么", id: "check" },
    {
      kind: "ol",
      items: [
        "把所有分段的页数加起来，和源文件对。12 份加起来是 299 页，说明有一页在某个边界上丢了。",
        "读每一份的第一行。某一章从半句话开始，就是你记的页码偏移量差了一位——这是拆分最常见的错误。",
        "在其中一份里搜一个你确定属于这一章的词。拆分保留文字层，所以一定搜得到；搜不到说明这份文件在拆分之前就已经被栅格化了。",
        "把最小的一份在手机上打开。打不开通常是页复制时没带上某个资源——不常见，但这是最便宜的检查方式。",
        "看文件夹里的排序对不对：02 必须排在 10 前面，这只有在你保留了补零时才会成立。",
      ],
    },
    { kind: "h2", text: "什么时候不该拆分", id: "wrong-tool" },
    {
      kind: "ul",
      items: [
        "你只要 300 页里的一段：提取是一个操作，拆分给你的是十二份、还得再删掉十一份。",
        "你要给这些页面换页码规则、加页眉、重建大纲：那是回源应用重新导出的事，不是 PDF 操作。任何页复制工具都变不出页码标签。",
        "这些部分必须能一起被搜索：拆分破坏了原来的整体结构，从此每一份只能各自被搜到。",
        "文档本身不到 20 页。拆成章节什么也没省下——一份带书签的文件才是更好的产物。",
      ],
    },
    {
      kind: "p",
      text: "拆分值得做的前提是：每一份都有自己的负责人、自己的截止时间或自己的去处——附件给审计、手册给印厂、合同给客户。如果拆开只是为了钻过一个上传上限，那么压缩或裁剪文档是更小的改动。",
    },
  ],
};

export const splitPdfIntoChapters: Localized<Guide> = { en, zh };
