import { SITE } from "@/content/site";
import type { Guide, Localized } from "@/content/types";

const en: Guide = {
  slug: "pdf-to-image-dpi-guide",
  group: "convert",
  title: "PDF to image: how much DPI you actually need, and which format to pick",
  description:
    "A PDF page is resolution-free until you turn it into pixels. What 72, 150 and 300 DPI mean in pixels for A4, why a text page should be PNG and a photo should be JPEG, and when WebP saves you a third of the bytes.",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/pdf-to-image"],
  body: [
    {
      kind: "p",
      text: "Converting a page to an image is the one operation where you have to choose a number that will be wrong in one direction or the other: too low and the text is mush, too high and you are shipping a 12 MB PNG of a page nobody will zoom into. The choice has three parts — resolution, format and how many pages — and all three can be decided from the destination rather than from taste.",
    },
    { kind: "h2", text: "Resolution: decide from where the image goes", id: "dpi" },
    {
      kind: "p",
      text: "PDF's own unit is 72 points per inch, so 72 DPI means “one pixel per point” — literally the page coordinates turned into pixels. Everything above that is a multiple: 144 DPI renders at 2×, 288 DPI at 4×, and the pixel count grows with the square of the factor.",
    },
    {
      kind: "table",
      caption: "A4 page size in pixels at the resolutions people actually use. Twice the DPI is four times the pixels, and roughly four times the file size for the same content.",
      head: ["DPI", "A4 in pixels", "Good for"],
      rows: [
        ["72", "595 × 842", "A thumbnail, or checking layout without detail"],
        ["96", "794 × 1123", "Slides and web previews — matches a typical screen's pixel density"],
        ["150", "1240 × 1754", "Reading on screen at 100 %, small prints, “high quality” meeting handouts"],
        ["200", "1654 × 2339", "Most office laser printing without a visible loss"],
        ["300", "2480 × 3508", "Commercial print, archival copies, anything a client may enlarge"],
      ],
    },
    {
      kind: "p",
      text: "For a slide deck or a chat message, 150 DPI is the practical ceiling: a 4K screen is 3840 pixels wide, so a 300 DPI A4 page shown full-screen is still being downscaled to a third of its pixels. For anything that will be printed or examined, 300 DPI is the target, and going beyond it only matters if the source page contains line art rather than text.",
    },
    { kind: "h2", text: "Format: PNG, JPEG or WebP", id: "format" },
    {
      kind: "table",
      caption: "The three formats the tool writes, and what each is for.",
      head: ["Format", "How it stores data", "Pick it when"],
      rows: [
        ["PNG", "Lossless, every pixel exact", "The page is text, a screenshot, a chart or a signature. Sharp edges stay sharp, and the file is bigger than JPEG."],
        ["JPEG", "Lossy, adjustable quality", "The page is a photo or a scan. Much smaller, and the artefacts hide in photographic detail instead of around letters."],
        ["WebP", "Lossy (or lossless) with better compression than JPEG", "The image goes on a website and you want a smaller file. Support is now broad, but older desktop software may refuse it."],
      ],
    },
    {
      kind: "p",
      text: "The mistake that produces ugly results is converting a text page to JPEG at a low quality: JPEG breaks the page into 8 × 8 blocks, and black text on white is exactly the pattern those blocks handle worst. You get grey halos around every letter and a file that is barely smaller than the PNG. Text wants PNG; photographs want JPEG.",
    },
    {
      kind: "figure",
      src: "/guides/pdf-to-image-dpi-guide/01-dpi-and-format.webp",
      alt: "The PDF-to-image tool with format set to PNG and 150 DPI, showing the resulting page dimensions and file size.",
      caption: "Format and DPI are the only two settings that matter; the page count comes from the document.",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "One page or the whole document", id: "pages" },
    {
      kind: "p",
      text: "Rendering happens one page at a time, so the page count does not raise the peak memory the way it does when a document is loaded whole — but it does multiply the output. A 300-page manual at 150 DPI as PNG is roughly 300 files and, for a text-heavy page, somewhere in the region of 200 KB to 1 MB each: a few hundred megabytes in one download. That is why the whole-document case arrives as a ZIP rather than as 300 separate downloads.",
    },
    {
      kind: "ul",
      items: [
        "Need one page for a slide? Render that page only, at 150 DPI.",
        "Need every page for an archive? Take the ZIP at 300 DPI and store it; do not re-render later when the original may be gone.",
        "Need a quick look at a 400-page file? 72 DPI and only the pages you care about.",
      ],
    },
    { kind: "h2", text: "Converting a scan does not add resolution", id: "no-new-detail" },
    {
      kind: "p",
      text: "If the page is a scan that was made at 200 DPI, rendering it at 300 DPI produces a bigger image with exactly the same amount of detail — the renderer interpolates, it cannot invent the pixels the scanner never captured. You get a 40 % larger file and no sharper edges. The useful ceiling for a scanned page is the resolution it was scanned at; for a born-digital page there is no such ceiling, because the text and vectors can be rendered at any resolution.",
    },
    {
      kind: "p",
      text: "How to tell which you have: zoom in on the page in a viewer. If the letters break into visible square pixels at 400 %, it is a scan and its resolution is fixed. If the letters stay smooth at any zoom, it is text and the renderer will produce genuine detail at 300 DPI.",
    },
    { kind: "h2", text: "Steps", id: "how" },
    {
      kind: "steps",
      items: [
        {
          title: "Pick the format from the content",
          text: "Text, charts, screenshots and signatures: PNG. Photographs and scanned pages: JPEG at quality 0.8 or above. Website delivery where you control the server: WebP.",
        },
        {
          title: "Pick the DPI from the destination",
          text: "Screen at 150, print at 300, thumbnail at 72. When in doubt, 150 is the number that almost never disappoints and rarely bloats the file.",
        },
        {
          title: "Export the pages you need",
          text: "A single page if that is the job; the ZIP if you need all of them. Rendering 300 pages to find out you needed one is a minute of your machine's time you do not get back.",
        },
        {
          title: "Check the first image before using the rest",
          text: "Open it at 100 %. If the edges of the text are ragged or the whites are grey, the format or the quality was wrong, and the other 299 pages have the same problem.",
        },
      ],
    },
    {
      kind: "callout",
      tone: "note",
      title: "What you see is what you get",
      text: "The renderer draws the page the way the viewer draws it: the same fonts, the same transparency, the same colours converted to sRGB. That means a page with a CMYK image will not look like the printed sheet — it will look like the screen version, because that is what a browser can produce. For colour-critical work, the print file is the PDF, not the image made from it.",
    },
    { kind: "h2", text: "Check the result", id: "check" },
    {
      kind: "ol",
      items: [
        "Check the pixel dimensions against the DPI you asked for: A4 at 150 DPI must be 1240 × 1754, and if it is not, the page size in the PDF is not A4.",
        "Zoom to 100 % on the smallest text. This is the only test that matters for a text page.",
        "Check one page from the middle of the document if you exported all of them — first and last pages are the ones the renderer is most likely to have got right.",
      ],
    },
    {
      kind: "p",
      text: "Two settings and a destination: that is the whole decision. The number that makes an image useless is a low DPI on a text page, and the number that makes it annoying is a high DPI nobody asked for — everything between those is a judgement you can now make with arithmetic instead of taste.",
    },
  ],
};

const zh: Guide = {
  slug: "pdf-to-image-dpi-guide",
  group: "convert",
  title: "PDF 转图片：到底需要多少 DPI，以及该选哪种格式",
  description:
    "PDF 页面在变成像素之前是没有分辨率的。72、150、300 DPI 对 A4 意味着多少像素，为什么文字页该用 PNG、照片该用 JPEG，以及 WebP 什么时候能帮你省下三分之一。",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/pdf-to-image"],
  body: [
    {
      kind: "p",
      text: "把一页转成图片，是唯一一个你必须选一个「总会错在某个方向」的数字的操作：低了文字是糊的，高了你会为一张没人会放大的页面发出 12 MB 的 PNG。这个选择有三部分——分辨率、格式、多少页——而三部分都能按去处决定，不用靠审美。",
    },
    { kind: "h2", text: "分辨率：按图片的去处决定", id: "dpi" },
    {
      kind: "p",
      text: "PDF 自己的单位是每英寸 72 点，所以 72 DPI 就是「一个点一个像素」——字面意义上把页面坐标变成像素。再往上都是倍数：144 DPI 是 2 倍，288 DPI 是 4 倍，而像素数按倍数的平方增长。",
    },
    {
      kind: "table",
      caption: "人们真正在用的几档分辨率下，A4 的像素尺寸。DPI 翻倍就是像素四倍，同样内容下文件也大约四倍。",
      head: ["DPI", "A4 像素尺寸", "适合用来"],
      rows: [
        ["72", "595 × 842", "缩略图，或者只想看清版式、不要细节"],
        ["96", "794 × 1123", "幻灯片与网页预览——和常见屏幕的像素密度相当"],
        ["150", "1240 × 1754", "屏幕上 100% 阅读、小幅面打印、「高清」会议材料"],
        ["200", "1654 × 2339", "多数办公激光打印，看不出损失"],
        ["300", "2480 × 3508", "商业印刷、存档、任何客户可能放大的东西"],
      ],
    },
    {
      kind: "p",
      text: "做幻灯片或者发聊天，150 DPI 就是实际上限：4K 屏宽 3840 像素，一张 300 DPI 的 A4 满屏显示时仍会被缩到三分之一的像素。要印刷、可能被细看的，目标是 300 DPI；再往上只有原页面里含线条稿而不是文字时才有意义。",
    },
    { kind: "h2", text: "格式：PNG、JPEG 还是 WebP", id: "format" },
    {
      kind: "table",
      caption: "工具能写出的三种格式，以及各自该用在哪。",
      head: ["格式", "怎么存数据", "什么时候选它"],
      rows: [
        ["PNG", "无损，每个像素都精确", "页面是文字、截图、图表或签名。锐利的边缘保持锐利，代价是比 JPEG 大。"],
        ["JPEG", "有损，质量可调", "页面是照片或扫描件。小得多，而且噪块藏在照片细节里，而不是绕在字母周围。"],
        ["WebP", "有损（或无损），压缩率比 JPEG 好", "图片要放到网站上，你想让文件更小。支持面已经很广，但较老的桌面软件可能不认。"],
      ],
    },
    {
      kind: "p",
      text: "把文字页转成低质量 JPEG，是产出难看结果的标准做法：JPEG 把页面切成 8 × 8 的块，而白底黑字正是这种块最处理不好的图案。你会得到每个字母周围的灰雾，以及一个并不比 PNG 小多少的文件。文字要 PNG，照片要 JPEG。",
    },
    {
      kind: "figure",
      src: "/guides/pdf-to-image-dpi-guide/01-dpi-and-format.webp",
      alt: "PDF 转图片工具里格式选为 PNG、分辨率 150 DPI，显示结果页面的尺寸与文件大小。",
      caption: "只有格式和 DPI 两个设置需要你决定；页数由文档本身决定。",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "一页，还是整份", id: "pages" },
    {
      kind: "p",
      text: "渲染是一页一页做的，所以页数不会像「整份载入」那样抬高内存峰值——但它会成倍放大产出。一份 300 页的手册按 150 DPI 输出 PNG 大约是 300 个文件，文字较密的页面每个在 200 KB 到 1 MB 之间：一次下载就是几百 MB。这也是整份导出会打成一个 ZIP、而不是给你 300 个下载的原因。",
    },
    {
      kind: "ul",
      items: [
        "只要一页放进幻灯片？只渲染那一页，150 DPI。",
        "每一页都要存档？按 300 DPI 取那个 ZIP 存好；不要等到原件可能已经没了的时候再回来重渲。",
        "只想快速看一眼 400 页的文件？72 DPI，而且只取你在意的那些页。",
      ],
    },
    { kind: "h2", text: "转换扫描件不会增加分辨率", id: "no-new-detail" },
    {
      kind: "p",
      text: "如果这一页是 200 DPI 的扫描件，按 300 DPI 渲染出来只是一张更大的图，细节和原来一模一样——渲染器会插值，但它变不出扫描仪当初没采到的像素。你得到一个大了 40% 的文件，边缘并没有更锐。扫描件有用的上限就是它被扫描时的分辨率；而原生数字页面没有这个上限，因为文字和矢量可以用任何分辨率渲染。",
    },
    {
      kind: "p",
      text: "怎么分辨这两种：在阅读器里把页面放大。如果字母在 400% 时碎成可见的方形像素，那就是扫描件，分辨率已经固定。如果字母在任何放大倍数下都平滑，那就是文字，渲染器真的能在 300 DPI 下产出细节。",
    },
    { kind: "h2", text: "操作步骤", id: "how" },
    {
      kind: "steps",
      items: [
        {
          title: "按内容选格式",
          text: "文字、图表、截图、签名：PNG。照片和扫描页：质量 0.8 以上的 JPEG。要放到你自己能控制服务器上的网站：WebP。",
        },
        {
          title: "按去处选 DPI",
          text: "屏幕 150，印刷 300，缩略图 72。拿不准的时候，150 是那个几乎不会让人失望、也很少把文件撑大的数字。",
        },
        {
          title: "只导出你需要的页",
          text: "只要一页就导一页；全都要才取 ZIP。渲染了 300 页才发现只需要其中一页，那几分钟是你机器的时间，拿不回来。",
        },
        {
          title: "先用第一张验收",
          text: "放大到 100% 打开。如果文字边缘毛糙、白底发灰，那是格式或质量选错了——而另外 299 页有一模一样的问题。",
        },
      ],
    },
    {
      kind: "callout",
      tone: "note",
      title: "所见即所得，也只是所见",
      text: "渲染器画页面的方式，就是阅读器画页面的方式：同样的字体、同样的透明度、同样被转成 sRGB 的颜色。这意味着含 CMYK 图片的页面不会长得像印出来的那张纸——它会像屏幕版，因为那是浏览器能产出的东西。对颜色敏感的工作，印刷文件是那份 PDF，不是从它转出来的图片。",
    },
    { kind: "h2", text: "验收结果", id: "check" },
    {
      kind: "ol",
      items: [
        "把像素尺寸和你要求的 DPI 对一下：A4 在 150 DPI 必须是 1240 × 1754；不是的话，说明 PDF 里那页就不是 A4。",
        "把最小的字放大到 100%。对文字页来说，这是唯一真正重要的测试。",
        "如果是整份导出，抽查中间的一页——第一页和最后一页恰恰是渲染器最不容易出错的地方。",
      ],
    },
    {
      kind: "p",
      text: "两个设置加一个去处，整个决定就完了。让图片变得没用的数字，是文字页上的低 DPI；让图片变得碍事的数字，是没人要求的高 DPI——两者之间的全部空间，现在你可以用算术判断，而不是用审美。",
    },
  ],
};

export const pdfToImageDpiGuide: Localized<Guide> = { en, zh };
