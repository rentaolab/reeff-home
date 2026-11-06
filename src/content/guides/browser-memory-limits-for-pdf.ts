import { SITE } from "@/content/site";
import type { Guide, Localized } from "@/content/types";

const en: Guide = {
  slug: "browser-memory-limits-for-pdf",
  group: "privacy",
  title: "How large a PDF a browser can handle — and how to measure your own limit",
  description:
    "There is no universal page limit, because the limit is your machine. The three things that actually run out, the estimate you can do in your head, and a five-minute measurement instead of a made-up benchmark.",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/compress-pdf", "/pdf-to-image"],
  body: [
    {
      kind: "p",
      text: "“How big a PDF can this handle?” is a reasonable question with an unreasonable answer: it depends on the file, the operation and your machine, and any specific number printed on a page would be wrong for most readers. What can be given honestly is the model — the three resources that run out, in the order they run out — plus a five-minute measurement you can run on your own hardware. That is what this guide does, and it deliberately contains no benchmark table, because we have not measured your computer.",
    },
    { kind: "h2", text: "The three things that run out", id: "what-runs-out" },
    {
      kind: "ol",
      items: [
        "Memory for the file itself. A local tool holds the source bytes, then the rebuilt document, then the output you download. Peak usage is a multiple of the file size — for a page-copy operation, expect roughly twice the source, plus the output.",
        "Memory for one rendered page. Rasterising a page needs a canvas of width × height × 4 bytes. A4 at 150 DPI is about 8.7 MB, at 300 DPI about 34.8 MB, per page, while that page is being drawn.",
        "The tab's own ceiling. Browsers put a per-tab limit on the JavaScript heap and on how much a canvas may allocate; on a 64-bit desktop that ceiling is typically a few gigabytes, and on a phone it is far lower. When it is hit, the tab does not report an error — it disappears.",
      ],
    },
    {
      kind: "p",
      text: "The order matters. A 200-page text PDF of 4 MB costs almost nothing in memory and every page renders in milliseconds. A 12-page scan of 180 MB costs 180 MB before anything is drawn, and then 35 MB per page at 300 DPI on top. That is why “how many pages” is the wrong question and “how many megabytes, and what is inside them” is the right one.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "The estimate you can do in your head",
      text: "Peak memory ≈ (source size × 2) + (output size) + (largest page bitmap). For a 100 MB scan rendered at 150 DPI: 200 MB + ~100 MB + 9 MB ≈ 310 MB. If your browser already has 1.5 GB of tabs open and your machine has 8 GB of RAM, that number is fine — and on a 3 GB tablet it is not.",
    },
    {
      kind: "figure",
      src: "/guides/browser-memory-limits-for-pdf/01-memory-measurement.webp",
      alt: "A browser's own task manager showing the memory of one tab before, during and after converting a 100 MB PDF.",
      caption: "The browser's own task manager is the measurement that matters — not a published benchmark.",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "Measuring your own limit in five minutes", id: "measure" },
    {
      kind: "steps",
      items: [
        {
          title: "Write down what your machine has free",
          text: "On Windows, Task Manager's Performance tab; on macOS, Activity Monitor's Memory tab. Record the free memory before you start — that number, not the total RAM, is what the browser can actually use.",
        },
        {
          title: "Open the browser's own task manager",
          text: "Chrome and Edge: Shift + Esc. Firefox: the about:processes page. Safari: the per-process list in Activity Monitor. Find the tab you are about to use and note its memory now, so the delta has a baseline.",
        },
        {
          title: "Run the operation and watch the peak",
          text: "Start the conversion, keep the task manager visible, and note the highest number before it drops back. That peak is your answer, and it is specific to this file on this machine. Repeat with a file twice the size to see whether the growth is linear — for page-copy operations it usually is.",
        },
        {
          title: "Confirm nothing left your machine",
          text: "Open DevTools, Network tab, then run the conversion again. There should be no request carrying the file: no POST with megabytes of body, no upload progress. If you see one, the tool is not local, whatever the page says.",
        },
      ],
    },
    { kind: "h2", text: "What a failure actually looks like", id: "failures" },
    {
      kind: "ul",
      items: [
        "The tab vanishes to a “Aw, Snap” or “This page is having a problem” screen. The renderer process was killed for exceeding memory; nothing was saved.",
        "The operation hangs at 99 % and the tab becomes unresponsive. Sometimes it recovers, sometimes the OS swaps and the whole machine crawls.",
        "An error like “failed to read the file” or a canvas that comes back blank. On mobile browsers the per-tab limits are tight enough that this happens well before the desktop equivalent.",
        "A result that is mysteriously small but opens fine with missing pages — the worst failure, because it looks like success. Always count the pages.",
      ],
    },
    { kind: "h2", text: "Three worked examples", id: "examples" },
    {
      kind: "table",
      caption: "The same estimate applied to three files. These are arithmetic on the model above, not measurements — the point is the shape, and your own numbers will follow it.",
      head: ["File", "Operation", "Peak estimate", "What it shows"],
      rows: [
        ["4 MB text PDF, 200 pages", "Merged with two others", "Well under 50 MB", "Page count is irrelevant. Text documents are cheap whatever their length."],
        ["180 MB scan, 12 pages", "Compressed to 150 DPI", "≈ 360 MB source and output, + 9 MB per page drawn", "The megabytes dominate, not the pages. Twelve pages can be harder than two hundred."],
        ["60 MB scan, 300 pages", "Converted to images at 300 DPI", "≈ 120 MB, plus 35 MB while any single page is being drawn", "Rendering peaks per page, so the page count costs time rather than memory — but the ZIP it produces costs disk."],
      ],
    },
    {
      kind: "p",
      text: "Two different curves come out of that table. For operations that copy pages — merge, split, delete, extract, rotate — memory tracks the file size, so a big PDF is expensive however few pages it has. For operations that draw pixels — compress, PDF to image, and the previews in the editor — memory tracks resolution × page area, so the same document becomes four times more expensive when you double the DPI. Knowing which curve you are on tells you which lever to pull before the tab dies.",
    },
    { kind: "h2", text: "When the file is bigger than your machine", id: "mitigations" },
    {
      kind: "ol",
      items: [
        "Split the job. Extract the pages you need from the original, or process the document in parts and merge afterwards — the second pass is cheaper than the first crash.",
        "Lower the resolution. At 150 DPI a page costs 8.7 MB instead of 34.8 MB; for a 300-page scan that is the difference between finishing and not.",
        "Close what you are not using. A browser with thirty tabs is already using the memory your conversion needs, and the tab that dies is usually the one doing the work.",
        "Move to a machine with more RAM. It is the honest answer: the constraint is local, so the fix is local too.",
      ],
    },
    {
      kind: "callout",
      tone: "note",
      title: "This is the trade, stated plainly",
      text: "Processing locally means the ceiling is your hardware instead of a server's queue. A cloud converter will happily accept a 500 MB file — because it is uploaded, processed somewhere else and sent back, which is exactly what this site exists to avoid. Knowing your own limit is the price of not handing the document to somebody else.",
    },
    {
      kind: "p",
      text: "So: no benchmark table, no invented “works up to 250 MB”. Three resources, one estimate, and a five-minute measurement that gives you a real number for your machine — which is the only number that would ever have applied to you.",
    },
  ],
};

const zh: Guide = {
  slug: "browser-memory-limits-for-pdf",
  group: "privacy",
  title: "浏览器能处理多大的 PDF——以及怎么量出你自己那条线",
  description:
    "没有通用的页数上限，因为上限就是你这台机器。真正会耗尽的三种资源、一个心算就够的估算，以及一次五分钟就能在自己设备上做完的测量，而不是编一个基准。",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/compress-pdf", "/pdf-to-image"],
  body: [
    {
      kind: "p",
      text: "「这个能处理多大的 PDF？」是个合理的问题，却只有不讲道理的答案：取决于文件、取决于操作、取决于你的机器；任何印在网页上的具体数字，对大多数读者都会是错的。能诚实给出的，是那个模型——会耗尽的三种资源，以及它们耗尽的顺序——再外加一次你在自己硬件上五分钟就能做完的测量。这篇就做这件事，并且刻意不提供基准表，因为我们没有测过你的电脑。",
    },
    { kind: "h2", text: "真正会耗尽的三样东西", id: "what-runs-out" },
    {
      kind: "ol",
      items: [
        "文件本身占的内存。本机工具要先拿住源字节，再构建新文档，再产出你要下载的成品。峰值常常是文件体积的几倍——页复制类操作请按「源文件的约两倍，加上产物体积」估算。",
        "渲染单页占的内存。栅格化一页需要一块「宽 × 高 × 4 字节」的画布。A4 在 150 DPI 约 8.7 MB，300 DPI 约 34.8 MB——每一页，在它被绘制的那段时间里。",
        "标签页自己的天花板。浏览器对每标签的 JS 堆和 canvas 可分配量都设了限；64 位桌面上这个上限通常是几 GB，手机上低得多。撞上去的时候，标签页不会报错——它会直接消失。",
      ],
    },
    {
      kind: "p",
      text: "顺序很重要。一份 4 MB、200 页的文字型 PDF 几乎不占内存，每页渲染都是毫秒级。一份 180 MB、12 页的扫描件，在什么都没画之前就先花掉 180 MB，然后每页再叠上 300 DPI 的 35 MB。这就是为什么「多少页」是错误的问题，而「多少 MB、里面装的是什么」才是对的问题。",
    },
    {
      kind: "callout",
      tone: "note",
      title: "一个心算就够的估算",
      text: "峰值内存 ≈（源文件 × 2）+（产物体积）+（最大单页位图）。一份 100 MB 的扫描件按 150 DPI 渲染：200 MB + 约 100 MB + 9 MB ≈ 310 MB。如果你的浏览器已经开着 1.5 GB 的标签页，机器有 8 GB 内存，这个数没问题；在一台 3 GB 的平板上，就有问题。",
    },
    {
      kind: "figure",
      src: "/guides/browser-memory-limits-for-pdf/01-memory-measurement.webp",
      alt: "浏览器自带的任务管理器，显示某个标签页在转换 100 MB PDF 之前、之中、之后的内存占用。",
      caption: "浏览器自带的任务管理器才是真正有意义的测量——不是谁公布的基准。",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "五分钟量出你自己那条线", id: "measure" },
    {
      kind: "steps",
      items: [
        {
          title: "先记下机器还剩多少可用内存",
          text: "Windows 看任务管理器的「性能」页，macOS 看活动监视器的「内存」页。开始之前把可用量记下来——浏览器真正能用的是这个数，不是总内存。",
        },
        {
          title: "打开浏览器自带的任务管理器",
          text: "Chrome 和 Edge：Shift + Esc。Firefox：about:processes 页面。Safari：活动监视器里的进程列表。找到你马上要用的那个标签页，先记下它现在的内存，差值才有基准。",
        },
        {
          title: "跑一次操作，盯住峰值",
          text: "开始转换，让任务管理器一直开着，记下它回落之前的最高值。那个峰值就是你的答案，而且只针对这份文件、这台机器。再拿一份两倍大的文件重复一次，看增长是不是线性的——页复制类操作通常是。",
        },
        {
          title: "确认没有东西离开你的机器",
          text: "打开开发者工具的 Network 面板，再跑一次转换。不应该出现携带这个文件的请求：没有带着几 MB 请求体的 POST，没有上传进度。如果出现了，那这个工具就不是本机的，不管页面怎么写。",
        },
      ],
    },
    { kind: "h2", text: "失败到底长什么样", id: "failures" },
    {
      kind: "ul",
      items: [
        "标签页变成「噢，崩溃了」或「此页面出现问题」。渲染进程因超内存被杀了，什么都没保存下来。",
        "进度卡在 99%，标签页不再响应。有时会恢复，有时系统开始换页，整台机器跟着变慢。",
        "报出「无法读取文件」这类错误，或者 canvas 返回一片空白。移动端浏览器每标签的上限很紧，桌面版还早的时候它就已经到了。",
        "产物莫名地小，却能正常打开——只是少了几页。这是最糟的失败，因为它看起来像成功。永远要数页数。",
      ],
    },
    { kind: "h2", text: "三个算例", id: "examples" },
    {
      kind: "table",
      caption: "同一个估算用在三份文件上。这些是按上面那个模型算出来的，不是测量值——重点在形状，你自己的数字会跟着这个形状走。",
      head: ["文件", "操作", "峰值估算", "它说明了什么"],
      rows: [
        ["4 MB 文字型 PDF，200 页", "再和另外两份合并", "远低于 50 MB", "页数无关紧要。文字型文档不管多长都很便宜。"],
        ["180 MB 扫描件，12 页", "压缩到 150 DPI", "源与产物约 360 MB，再加每页绘制时的 9 MB", "占主导的是 MB，不是页数。十二页可以比两百页更吃力。"],
        ["60 MB 扫描件，300 页", "全部按 300 DPI 转成图片", "约 120 MB，加上任意单页绘制时的 35 MB", "渲染是按页出现峰值的，所以页数耗的是时间不是内存——但它产出的 ZIP 会耗磁盘。"],
      ],
    },
    {
      kind: "p",
      text: "这张表给出两条不同的曲线。复制页面的操作——合并、拆分、删除、提取、旋转——内存跟着文件体积走，所以一份大 PDF 不管页数多少都很贵。画像素的操作——压缩、PDF 转图片，以及编辑器里的预览——内存跟着「分辨率 × 页面面积」走，所以同一份文档在 DPI 翻倍时会贵四倍。先知道自己站在哪条曲线上，才知道在标签页倒下之前该拉哪根杆。",
    },
    { kind: "h2", text: "当文件大于你的机器", id: "mitigations" },
    {
      kind: "ol",
      items: [
        "把活儿拆开。先从原件里提取需要的页，或者分几段处理之后再合并——第二遍永远比第一次崩溃便宜。",
        "降分辨率。150 DPI 时一页占 8.7 MB，而不是 34.8 MB；对一份 300 页的扫描件，这是做完与做不完的差别。",
        "关掉用不上的东西。开着三十个标签页的浏览器已经在用你这次转换需要的内存，而先死的往往是干活的那个标签。",
        "换一台内存更大的机器。这是老实的答案：限制在本地，解法也在本地。",
      ],
    },
    {
      kind: "callout",
      tone: "note",
      title: "这就是那个取舍，说清楚",
      text: "本机处理意味着天花板是你的硬件，而不是服务器的队列。云端转换器会很乐意接受 500 MB 的文件——因为它被上传、在别处处理、再送回来，而这正是本站要避开的事。知道自己的上限，就是不用把文件交给别人的代价。",
    },
    {
      kind: "p",
      text: "所以：没有基准表，没有编出来的「最大支持 250 MB」。三种资源、一个估算，以及一次五分钟就能给你自己机器真实数字的测量——而那才是唯一本来会适用于你的数字。",
    },
  ],
};

export const browserMemoryLimitsForPdf: Localized<Guide> = { en, zh };
