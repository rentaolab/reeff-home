import { SITE } from "@/content/site";
import type { Guide, Localized } from "@/content/types";

const en: Guide = {
  slug: "why-compress-pdf-barely-shrinks",
  group: "convert",
  title: "Why “compress PDF” barely shrinks your file — and what actually does",
  description:
    "Most PDFs are already compressed, so a lossless pass saves a few percent. The lever that works is pixels: DPI, JPEG quality and colour. What each level of the tool really does, with the arithmetic behind it.",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/compress-pdf", "/pdf-to-image"],
  body: [
    {
      kind: "p",
      text: "You have a 12 MB PDF, you press compress, and you get 11.6 MB. Nothing is broken — that is what compression can do to a file that was already compressed. Almost every PDF produced in the last fifteen years already has its streams deflated and its images JPEG-encoded, so “compress” has to take something away to give you bytes back. This guide shows what the tool actually removes at each level, why the size is decided by pixel count rather than by page count, and how to pick a level you can defend.",
    },
    { kind: "h2", text: "Two completely different files called “a PDF”", id: "two-kinds" },
    {
      kind: "p",
      text: "Before choosing a level, find out which kind of document you have. The answer decides whether compression will do almost nothing or a great deal.",
    },
    {
      kind: "table",
      caption: "How to tell the two apart in five seconds.",
      head: ["", "Text-born PDF", "Scanned PDF"],
      rows: [
        ["How it was made", "Exported from Word, LaTeX, InDesign, a browser print dialog", "Photographed or scanned page by page, then wrapped in a PDF"],
        ["What is inside", "Fonts plus text operators, a few vector shapes", "One large image per page, usually JPEG or JPEG2000"],
        ["Can you select a word?", "Yes", "No — unless it was OCR'd afterwards"],
        ["Typical size", "80 KB – 2 MB", "2 MB – 40 MB"],
        ["What compression can save", "A few percent, occasionally more on old exports", "A lot, but only by lowering resolution or quality"],
      ],
    },
    {
      kind: "p",
      text: "A quick test: open the file, drag across a line of text and press Ctrl/Cmd+C. If the selection highlights characters and pastes as text, it is text-born. If the selection is a rectangle around the whole page, it is a scan.",
    },
    { kind: "h2", text: "What the three levels actually do", id: "levels" },
    {
      kind: "steps",
      items: [
        {
          title: "Light — repacks the file, keeps everything",
          text: "The document is loaded and re-saved with object streams enabled and metadata updates switched off. No page is decoded. Text stays text, images keep their exact bytes, and nothing becomes blurry. The saving is whatever the original's packaging wasted: usually a few percent, and on files written by older software sometimes a few hundred kilobytes. A file exported by a current version of any mainstream tool usually has very little to win here, because it already uses object streams.",
        },
        {
          title: "Balanced — renders each page at 150 DPI as a JPEG (quality 0.8)",
          text: "This is rasterisation: every page is drawn to a canvas and re-encoded as a single JPEG at roughly 1240 × 1754 pixels for A4. The page is now an image. The file gets much smaller, text stops being selectable or searchable, and small type starts to soften when printed. 150 DPI is the point where a scan still reads comfortably on screen and in print.",
        },
        {
          title: "Strong — renders each page at 110 DPI as a JPEG (quality 0.65)",
          text: "The same operation at lower resolution and lower quality: about 909 × 1286 pixels for A4. This is the level for “it must fit under an upload limit”, not the level for anything a client will read closely. Text below about 8 pt starts to break up, and JPEG artefacts appear around high-contrast edges such as black text on white.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Balanced and Strong make the text disappear",
      text: "After rasterisation there is no text layer left: Ctrl+F finds nothing, copying gives you nothing, screen readers have nothing to read, and a PDF/A or accessibility check fails. If the document has to stay searchable, Light is the only level you can use — and it will not make a big difference on a scan.",
    },
    {
      kind: "figure",
      src: "/guides/why-compress-pdf-barely-shrinks/01-levels.webp",
      alt: "The compression tool showing Light, Balanced and Strong levels with the resulting file size for the same scanned 12 MB PDF.",
      caption: "The same 12 MB scan at the three levels. The size difference comes from pixels, not from a better algorithm.",
      width: 1897,
      height: 1027,
    },
    { kind: "h2", text: "The number that explains everything: pixels", id: "pixels" },
    {
      kind: "p",
      text: "A rasterised page is a grid of pixels, and the file has to store one value for each of them. Double the resolution and you quadruple the pixels — which is why “compress to 300 DPI” and “compress to 150 DPI” are not 2× apart in size, they are 4× apart before any quality setting is applied.",
    },
    {
      kind: "table",
      caption: "A4 page (210 × 297 mm) rendered at four resolutions. Bitmap memory is pixels × 4 bytes, the size a canvas needs while the page is being drawn — not the JPEG that is finally written.",
      head: ["Resolution", "A4 pixel size", "Pixels", "Bitmap while rendering"],
      rows: [
        ["72 DPI (PDF's native unit)", "595 × 842", "0.5 MP", "≈ 2.0 MB"],
        ["110 DPI (Strong)", "909 × 1286", "1.2 MP", "≈ 4.7 MB"],
        ["150 DPI (Balanced)", "1240 × 1754", "2.2 MP", "≈ 8.7 MB"],
        ["300 DPI (print quality)", "2480 × 3508", "8.7 MP", "≈ 34.8 MB"],
      ],
    },
    {
      kind: "p",
      text: "The JPEG that gets written is far smaller than the bitmap that produced it, because JPEG throws away detail the eye is bad at noticing. A text page at 150 DPI typically lands somewhere between 80 KB and 400 KB depending on how much ink is on it, which is why a 300-page scan lands in the tens of megabytes and a 3-page one lands under a megabyte. Those are ranges, not promises: the only number that matters is the one on your own file, and the tool shows it before you download.",
    },
    { kind: "h2", text: "Why a re-encoded scan can come out bigger", id: "bigger" },
    {
      kind: "p",
      text: "A scan that was already saved as a low-quality JPEG at 200 DPI can grow when it is re-encoded at 150 DPI and quality 0.8: fewer pixels, but more bits spent per pixel. Compression is not a monotonic dial. It also costs quality twice — JPEG is lossy, so every round trip adds artefacts on top of artefacts that are already there.",
    },
    {
      kind: "ul",
      items: [
        "The tool refuses to hand you a result that is the same size or larger at the chosen level. That refusal is information: this file has nothing to give at this setting.",
        "Compressing an already-compressed scan twice, then a third time, is how a document ends up unreadable while still being too big.",
        "Encrypted PDFs and files with damaged cross-reference tables can fail to load at all; compression is not a repair tool.",
      ],
    },
    { kind: "h2", text: "What actually works, in order", id: "what-works" },
    {
      kind: "ol",
      items: [
        "Write down the limit you are fighting: “under 2 MB for an upload form” and “as small as possible” lead to different choices, and only the first one has a stopping point.",
        "If the document must stay searchable, use Light and accept the few percent. If that is not enough, split the document into volumes instead of degrading it.",
        "If it is a scan that will only be read on screen, use Balanced (150 DPI). Compare a page at 100 % zoom before you send it; if the type is still crisp, stop there.",
        "If it still will not fit, use Strong (110 DPI) and check the smallest text, not the largest. A signature line is where low resolution shows first.",
        "If you still have the paper, re-scan at 150–200 DPI in greyscale instead of post-processing a 600 DPI colour scan. That removes the problem instead of shrinking it.",
        "Whatever level you chose, open the result and search for a word you know is in the text. If the search fails, you have rasterised the document and should keep both files.",
      ],
    },
    {
      kind: "p",
      text: "The honest summary: the only PDFs that shrink dramatically are scans, and they shrink because their pages stop being pages and become photographs. Everything else saves a few percent. Knowing which of the two you are holding is the whole decision.",
    },
  ],
};

const zh: Guide = {
  slug: "why-compress-pdf-barely-shrinks",
  group: "convert",
  title: "为什么「压缩 PDF」几乎没让小多少——以及什么才真的有用",
  description:
    "大多数 PDF 本来就已经压缩过了，无损档只能省几个百分点。真正起作用的是像素：DPI、JPEG 质量和颜色。三档各自做了什么，以及背后的算术。",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/compress-pdf", "/pdf-to-image"],
  body: [
    {
      kind: "p",
      text: "你有 12 MB 的 PDF，按下压缩，拿到 11.6 MB。什么都没有坏——对一份本来就压缩过的文件，这就是压缩能做到的程度。近十五年生成的 PDF，数据流基本都 deflate 过、图片基本都是 JPEG，所以「压缩」想还你空间，就必须拿走一些东西。这篇讲清楚每一档究竟拿走了什么、为什么体积由像素数而不是页数决定，以及怎么选一个你能解释得通的档位。",
    },
    { kind: "h2", text: "两种完全不同的文件，都叫「PDF」", id: "two-kinds" },
    { kind: "p", text: "选档位之前，先弄清手上是哪一种。答案决定了压缩几乎没用，还是效果巨大。" },
    {
      kind: "table",
      caption: "五秒分辨两种文件。",
      head: ["", "文字型 PDF", "扫描型 PDF"],
      rows: [
        ["怎么来的", "从 Word、LaTeX、InDesign 或浏览器打印导出的", "一页一页拍照或扫描，再包进 PDF"],
        ["里面装的是什么", "字体加文字指令，少量矢量图形", "每页一张大图，通常是 JPEG 或 JPEG2000"],
        ["能选中一个字吗", "能", "不能——除非后来做过 OCR"],
        ["常见体积", "80 KB – 2 MB", "2 MB – 40 MB"],
        ["压缩能省多少", "几个百分点，老软件导出的偶尔更多", "很多，但只能靠降分辨率或降质量换来"],
      ],
    },
    {
      kind: "p",
      text: "最快的判断方法：打开文件，在一行文字上拖选，按 Ctrl/Cmd+C。如果高亮的是字符、粘贴出来是文字，就是文字型；如果选区是整个页面的大方块，就是扫描型。",
    },
    { kind: "h2", text: "三档各自做了什么", id: "levels" },
    {
      kind: "steps",
      items: [
        {
          title: "Light——重新打包，什么都不丢",
          text: "载入文档、开启对象流、关掉元数据更新，再存一次。没有任何页面被解码。文字还是文字，图片还是原来的字节，什么都不变糊。省下的是原文件打包时浪费的空间：通常几个百分点，老软件写的文件偶尔能省几百 KB。用当前版本主流软件导出的文件在这里几乎没有可省的，因为它本来就用对象流。",
        },
        {
          title: "Balanced——每页按 150 DPI 渲染成 JPEG（质量 0.8）",
          text: "这一档是栅格化：每页先画到画布上，再整体编码成一张 JPEG，A4 大约 1240 × 1754 像素。页面从此就是一张图片。文件会小很多，文字不再可选中、不可搜索，小字号印出来开始发虚。150 DPI 是扫描件还能在屏幕上舒服阅读、也能印的临界点。",
        },
        {
          title: "Strong——每页按 110 DPI 渲染成 JPEG（质量 0.65）",
          text: "同样的操作，分辨率更低、质量更低：A4 约 909 × 1286 像素。这一档是对付「必须小于上传上限」的，不是交给客户细看的。8 pt 以下的字开始破碎，白底黑字的边缘会出现 JPEG 噪块。",
        },
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Balanced 和 Strong 会让文字消失",
      text: "栅格化之后就没有文字层了：Ctrl+F 搜不到、复制拿不到、读屏软件没有内容可读，PDF/A 与无障碍检查也过不去。如果这份文档必须保持可搜索，你只能用 Light——而它对扫描件几乎没用。",
    },
    {
      kind: "figure",
      src: "/guides/why-compress-pdf-barely-shrinks/01-levels.webp",
      alt: "压缩工具显示 Light、Balanced、Strong 三档，以及同一份 12 MB 扫描件在三档下的结果体积。",
      caption: "同一份 12 MB 扫描件在三档下的结果。体积差异来自像素，不是来自更聪明的算法。",
      width: 1897,
      height: 1027,
    },
    { kind: "h2", text: "解释一切的那个数：像素", id: "pixels" },
    {
      kind: "p",
      text: "栅格化后的页面是一格一格的像素，文件必须为每一格存一个值。分辨率翻倍，像素数就变成四倍——这就是为什么「压到 300 DPI」和「压到 150 DPI」在体积上不是 2 倍之差，而是在还没有算质量参数之前就已经是 4 倍之差。",
    },
    {
      kind: "table",
      caption: "A4 页面（210 × 297 毫米）在四种分辨率下。位图内存 = 像素数 × 4 字节，是绘制时画布需要的量，不是最后写出的 JPEG。",
      head: ["分辨率", "A4 像素尺寸", "像素数", "渲染时位图"],
      rows: [
        ["72 DPI（PDF 的原生单位）", "595 × 842", "0.5 MP", "≈ 2.0 MB"],
        ["110 DPI（Strong）", "909 × 1286", "1.2 MP", "≈ 4.7 MB"],
        ["150 DPI（Balanced）", "1240 × 1754", "2.2 MP", "≈ 8.7 MB"],
        ["300 DPI（印刷级）", "2480 × 3508", "8.7 MP", "≈ 34.8 MB"],
      ],
    },
    {
      kind: "p",
      text: "最后写出的 JPEG 比生成它的位图小得多，因为 JPEG 丢掉的是眼睛本来就不敏感的细节。一页 150 DPI 的文字稿，通常落在 80 KB 到 400 KB 之间，取决于纸上有多少墨——所以 300 页的扫描件落在几十 MB，而 3 页的不到 1 MB。这些是区间，不是承诺：唯一有意义的数字是你自己那份文件上的数字，而工具在下载前就会显示它。",
    },
    { kind: "h2", text: "为什么重编码之后反而更大", id: "bigger" },
    {
      kind: "p",
      text: "一份本来就以 200 DPI、低质量 JPEG 保存的扫描件，用 150 DPI、质量 0.8 重编码后可能变大：像素少了，但每个像素花的比特更多了。压缩不是一根单调的旋钮。而且它要收两次画质的账——JPEG 是有损的，每一次往返都在已经存在的噪块上再叠一层。",
    },
    {
      kind: "ul",
      items: [
        "工具不会把「一样大或更大」的结果交给你。这次拒绝本身就是信息：这份文件在这个档位上没有可让的东西。",
        "同一份扫描件压第二遍、第三遍，就是文档变得看不清、却依然太大的标准过程。",
        "加密 PDF 和交叉引用表损坏的文件可能根本载入不了；压缩不是修复工具。",
      ],
    },
    { kind: "h2", text: "按这个顺序试", id: "what-works" },
    {
      kind: "ol",
      items: [
        "先写下你要对付的那条线：「上传表单要求小于 2 MB」和「越小越好」会引出完全不同的选择，而且只有前者有停止点。",
        "如果文档必须保持可搜索，就用 Light，接受那几个百分点。不够就把文档拆成几卷，而不是把画质降掉。",
        "如果是只会在屏幕上读的扫描件，用 Balanced（150 DPI）。发送前把一页放大到 100% 对比一下，字还清楚就停在这一档。",
        "还是塞不进去，再用 Strong（110 DPI），并且检查最小的字，而不是最大的字。签名那一行是最先糊的地方。",
        "如果纸还在手上，直接按 150–200 DPI 灰度重扫一遍，而不是去后处理一份 600 DPI 的彩色扫描件。这是消除问题，而不是把问题压小。",
        "不管你选了哪一档，都打开结果搜一个你确定存在的词。搜不到，说明文档已经被栅格化，两份文件都要留着。",
      ],
    },
    {
      kind: "p",
      text: "老实的总结：能大幅变小的只有扫描件，而它变小是因为它的页面不再是页面，而变成了照片。其余文件只能省几个百分点。认出你手上是哪一种，整个决定就做完了。",
    },
  ],
};

export const whyCompressPdfBarelyShrinks: Localized<Guide> = { en, zh };
