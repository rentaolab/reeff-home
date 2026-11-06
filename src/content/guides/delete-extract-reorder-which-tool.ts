import { SITE } from "@/content/site";
import type { Guide, Localized } from "@/content/types";

const en: Guide = {
  slug: "delete-extract-reorder-which-tool",
  group: "organize",
  title: "Delete, extract or reorder: picking the right page-surgery tool",
  description:
    "Four tools do almost the same thing and one of them is always the right one. A decision table for page surgery, why the page numbers shift under you, and the check that catches a wrong deletion before you send the file.",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/delete-pdf-pages", "/extract-pdf-pages", "/reorder-pdf-pages", "/organize-pdf"],
  body: [
    {
      kind: "p",
      text: "There are four ways to change which pages a PDF contains, and the difference between them is smaller than the four menu entries suggest: all four copy pages into a new document. What changes is which pages you have to name — the ones you keep, or the ones you throw away — and that single difference is where every mistake in this family happens.",
    },
    { kind: "h2", text: "The decision takes one question", id: "decision" },
    {
      kind: "p",
      text: "Ask how many pages survive. If most of the pages survive, name the ones that go. If only a few survive, name the ones that stay. If the count is roughly half, use the grid tool and stop counting.",
    },
    {
      kind: "table",
      caption: "Which tool for which job. “New document every time” means the output is a fresh file, so page numbering restarts at 1 and bookmarks do not come along.",
      head: ["What you want", "Tool", "What you have to select"],
      rows: [
        ["Remove 3 pages from a 40-page report", "Delete pages", "The 3 pages that go"],
        ["Keep pages 12–18 of a 200-page contract", "Extract pages", "The 7 pages that stay"],
        ["Move the signed page to the end", "Reorder pages", "Nothing — you drag instead"],
        ["Remove some, keep some, fix the order in one pass", "Organise pages", "The grid, page by page"],
      ],
    },
    { kind: "h2", text: "Why four tools instead of one", id: "why-four" },
    {
      kind: "p",
      text: "Because the input you need is different. Deleting a page asks you for a page number, which you can read off the viewer. Extracting asks you for a range, which you can copy from a table of contents. Reordering asks for neither — it asks for a shape, and dragging thumbnails is the only way to express it. A single tool that accepted all three kinds of input would be one long form, and the long form is where people select the wrong set.",
    },
    {
      kind: "p",
      text: "All four produce the same kind of artefact: a new document built by copying pages. So the consequences are the same ones described in the merging guide — the text layer survives, the bookmarks do not, embedded fonts are duplicated, and page numbering restarts at 1.",
    },
    {
      kind: "figure",
      src: "/guides/delete-extract-reorder-which-tool/01-grid.webp",
      alt: "The page grid of a 40-page PDF with three pages marked for deletion, and the same document with two pages dragged into a new order.",
      caption: "The grid shows the whole document at once, which is the only view where an accidental deletion is obvious.",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "If the file is a scan", id: "scan" },
    {
      kind: "p",
      text: "Scans change what you can trust. A page that looks blank in a thumbnail is not always blank: the reverse side may carry a faint stamp, a signature or bleed-through from the other side of the sheet, and none of that survives being shrunk to 80 pixels wide. Open the page at 100 % before you delete it, and when you are unsure, keep it — a stray blank page costs one sheet of paper, a deleted signature costs the transaction.",
    },
    {
      kind: "ul",
      items: [
        "A spread scanned across two pages means “one page” in the grid is half of a document page. Deleting it removes half a chapter, not a sheet.",
        "If the scan was OCR'd, the text layer travels with the pages you keep. A page you delete loses its text permanently — the text is not stored anywhere else in the file.",
        "Rotated pages are a separate operation. Deleting and re-adding a page does not straighten it, and a scan that was rotated with a viewing tool rather than saved will come back rotated in the next tool you open.",
      ],
    },
    { kind: "h2", text: "The numbering trap", id: "numbering" },
    {
      kind: "p",
      text: "Page numbers in the interface are positions, not identities. Delete page 4 and the old page 5 becomes page 4 — so a second round of “now delete page 9” deletes something you did not look at. Every accident in this family comes from doing the surgery in several passes while reading numbers off a list.",
    },
    {
      kind: "ul",
      items: [
        "Collect every page you want to remove first, then apply them in one operation.",
        "When you have to work in passes, always work from the highest page number down, so earlier deletions cannot shift the numbers you are about to use.",
        "A page's printed number and its position are two different things. A document whose front matter is numbered i–iv has a six-page offset by the time chapter 1 starts.",
        "After any operation, the output starts at page 1 again. If you need the original numbering to survive, that is a page-label feature of the source application, not something a page copy can recreate.",
      ],
    },
    { kind: "h2", text: "Doing it safely", id: "how" },
    {
      kind: "steps",
      items: [
        {
          title: "Write the target page list down before you open the tool",
          text: "“Remove 3, 7, 12–14” is a plan; “remove the pages that look wrong” is a session. The list also gives you something to check the output against.",
        },
        {
          title: "Name the pages by their content, not only their number",
          text: "Look at the thumbnail and read the heading. That is what catches the case where the page you are about to delete is the only signed one in the document.",
        },
        {
          title: "Apply once, then verify the count",
          text: "Expected page count is easy arithmetic: 40 pages minus 3 deleted is 37. If the number does not match, you either missed one or deleted a different one, and the count tells you which before you send anything.",
        },
        {
          title: "Keep the source file",
          text: "Page surgery is destructive in the sense that the output has no memory of the original. Keep the input until the recipient confirms they have what they needed.",
        },
      ],
    },
    { kind: "h2", text: "Check before you send", id: "check" },
    {
      kind: "ol",
      items: [
        "Count the pages. Compare against the arithmetic, not against a feeling.",
        "Open the first and the last page of the result, and read the headings. Those are where an off-by-one shows up first.",
        "Search for a word that only appears on a page you kept. If it is found, the text layer survived and the pages were not rasterised.",
        "Scroll the thumbnails once, quickly, at small size. Ordering mistakes are obvious there and invisible page by page.",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Deleting a page is not redacting it",
      text: "Removing a page removes nothing else: annotations attached to other pages, the document's metadata, embedded files and the text of XMP blocks all stay in the output. If the job is to remove information rather than to remove pages, the document has to be rebuilt from a sanitised source — page tools can only take pages away.",
    },
    { kind: "h2", text: "When page surgery is the wrong tool", id: "wrong-tool" },
    {
      kind: "ul",
      items: [
        "You need pages from several documents in a fixed order: that is a merge, and doing it as three extracts and a reorder produces the same pages with three copies of the fonts.",
        "You need a chapter as its own file: split gives you every segment in one pass instead of one extract per chapter.",
        "You want the page order changed but the bookmarks kept: no page-copy tool can do that. Rebuild the outline, or keep the original and add a reading-order note.",
      ],
    },
    {
      kind: "p",
      text: "The four tools exist because naming the pages you keep is a different mental task from naming the ones you throw away. Pick the one that matches the sentence you would say out loud — “drop the last two pages”, “give me pages 12 to 18”, “move the signature to the end” — and the operation stops being risky.",
    },
  ],
};

const zh: Guide = {
  slug: "delete-extract-reorder-which-tool",
  group: "organize",
  title: "删除、提取还是排序：页面手术该用哪个工具",
  description:
    "四个工具做几乎一样的事，而其中永远有一个是对的。一张决策表、页码为什么会「跑位」，以及发送前那个能抓住误删的检查。",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/delete-pdf-pages", "/extract-pdf-pages", "/reorder-pdf-pages", "/organize-pdf"],
  body: [
    {
      kind: "p",
      text: "改变一份 PDF「包含哪些页」有四条路，而它们之间的差别比四个菜单项看上去要小：四条路都是把页面复制进一份新文档。变的只是你要点名的是哪一边——留下的那些，还是扔掉的那些——这一类操作的所有错误都发生在这一个差别上。",
    },
    { kind: "h2", text: "一个问题就能决定", id: "decision" },
    {
      kind: "p",
      text: "问自己：有多少页会活下来。大部分页面都留下，就点要走的那几页；只有少数几页留下，就点要留下的那几页；数量差不多一半，就用网格工具，别再数了。",
    },
    {
      kind: "table",
      caption: "什么活儿用什么工具。「每次都是新文档」意味着产物是一份新文件，所以页码从 1 重新开始，书签也不会跟过来。",
      head: ["你想要什么", "工具", "你要选中什么"],
      rows: [
        ["从 40 页报告里去掉 3 页", "删除页面", "要走的那 3 页"],
        ["保留 200 页合同的第 12–18 页", "提取页面", "要留下的那 7 页"],
        ["把签字页挪到最后", "页面排序", "什么都不用选——拖就行"],
        ["一边删、一边留、一边调顺序", "整理页面", "整张网格，逐页处理"],
      ],
    },
    { kind: "h2", text: "为什么是四个工具，而不是一个", id: "why-four" },
    {
      kind: "p",
      text: "因为需要的输入不一样。删除要你给页码，而页码可以直接从阅读器上读出来。提取要你给区间，而区间可以从目录上抄下来。排序两样都不要——它要的是一个形状，而形状只能靠拖缩略图表达。一个同时接受三种输入的工具，最后会变成一张很长的表单，而长表单正是人们选错集合的地方。",
    },
    {
      kind: "p",
      text: "四个工具产出的是同一种东西：靠页复制建起来的新文档。所以后果也和合并那篇写的一样——文字层还在，书签不会在，嵌入字体会被复制，页码从 1 重新开始。",
    },
    {
      kind: "figure",
      src: "/guides/delete-extract-reorder-which-tool/01-grid.webp",
      alt: "一份 40 页 PDF 的页面网格，其中三页被标记为删除；同一份文档另有两页被拖到了新位置。",
      caption: "网格一次显示整份文档，这是唯一能让误删一眼可见的视图。",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "如果文件是扫描件", id: "scan" },
    {
      kind: "p",
      text: "扫描件会改变你能信任什么。缩略图里看着空白的一页，并不一定是空白：背面可能有一个淡章、一个签名，或者纸背透印过来的字，而这些东西在缩到 80 像素宽时全都看不见。删之前把那一页放大到 100% 看一眼；拿不准就留着——多一张空白页只多一张纸，删掉一个签名要赔一笔交易。",
    },
    {
      kind: "ul",
      items: [
        "跨两页扫进来的一个版面，意味着网格里的「一页」只是文档半页。删掉它删掉的是半章，不是一张纸。",
        "如果这份扫描件做过 OCR，文字层会跟着你保留的页面走。被删掉的那一页，它的文字永久消失——文件里没有第二个地方存着它。",
        "旋转是另一个操作。删掉再加回来并不会把页面摆正；而且用阅读器「查看」而不是保存来旋转的扫描件，在下一个工具里还会是歪的。",
      ],
    },
    { kind: "h2", text: "页码跑位的陷阱", id: "numbering" },
    {
      kind: "p",
      text: "界面上的页码是位置，不是身份。删掉第 4 页，原来的第 5 页就变成了第 4 页——于是第二轮「再删第 9 页」删掉的是你没看过的那一页。这一类事故，全部来自分几趟做手术、同时照着列表读数字。",
    },
    {
      kind: "ul",
      items: [
        "先把要删的页全部收集齐，再一次性应用。",
        "必须分趟做时，永远从页码大的往小的做，这样先前删掉的页面不会挪动你接下来要用的编号。",
        "纸面印的页码和它在文件里的位置是两件事。前置内容用 i–iv 编号的文档，到第 1 章时已经差了六页。",
        "任何操作之后，产物都从第 1 页重新开始。如果你需要原编号活下来，那是源应用的页码标签功能，不是页复制能变出来的。",
      ],
    },
    { kind: "h2", text: "怎么安全地做", id: "how" },
    {
      kind: "steps",
      items: [
        {
          title: "打开工具之前，先把目标页写下来",
          text: "「删掉 3、7、12–14」是计划，「删掉看着不对的那几页」是一次会话。写下来的清单还能当作验收对照。",
        },
        {
          title: "用内容认页，而不只是用编号",
          text: "看缩略图，读标题。这正是能抓住「你准备删掉的这页是全文档唯一签过字的那页」的那一刻。",
        },
        {
          title: "一次应用，然后核对页数",
          text: "预期页数是简单算术：40 页减 3 页是 37 页。数字对不上，说明你漏了一页或者删错了页，而这个数会在你把文件发出去之前告诉你。",
        },
        {
          title: "留着源文件",
          text: "页面手术是破坏性的——产物对原件没有任何记忆。在对方确认拿到需要的东西之前，输入文件别删。",
        },
      ],
    },
    { kind: "h2", text: "发送前检查", id: "check" },
    {
      kind: "ol",
      items: [
        "数页数。对照算术结果，而不是对照感觉。",
        "打开结果的第一页和最后一页，读标题。差一位的错误最先在这两处暴露。",
        "搜一个只出现在你保留页面上的词。搜得到，说明文字层活着，页面没有被栅格化。",
        "快速把小尺寸缩略图滚一遍。顺序错误在那里一目了然，逐页翻的时候完全看不见。",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "删页不是涂抹遮盖",
      text: "删掉一页并不删除别的东西：挂到其他页上的注释、文档元数据、内嵌附件、XMP 块里的文字，全都留在产物里。如果这件事的目的是去掉信息而不是去掉页面，那么文档必须从干净的源重建——页面工具只能把页面拿走。",
    },
    { kind: "h2", text: "什么时候页面手术是错的工具", id: "wrong-tool" },
    {
      kind: "ul",
      items: [
        "你要把几份文档的页面按固定顺序拼起来：那是合并；用「三次提取加一次排序」做出同样的页面，却多带了三份字体。",
        "你要把某一章变成独立文件：拆分会一次给你全部段落，而不是一章一次提取。",
        "你想改页面顺序又要保住书签：没有任何页复制工具能做到。要么重建大纲，要么保留原件并另附一份阅读顺序说明。",
      ],
    },
    {
      kind: "p",
      text: "这四个工具之所以都存在，是因为「点名留下的那些」和「点名扔掉的那些」是两种不同的心智动作。挑那个和你脱口而出的话对得上的——「去掉最后两页」「给我 12 到 18 页」「把签字页挪到最后」——这个操作就不再有风险。",
    },
  ],
};

export const deleteExtractReorderWhichTool: Localized<Guide> = { en, zh };
