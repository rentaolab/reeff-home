import type { Localized, PageDoc } from "@/content/types";

/**
 * /why-local — the page that answers "how do we know nothing is uploaded?".
 *
 * Everything here is checkable against the tool repo (rentaolab/my-pdf-app):
 * `pdf-lib` for structure, `pdfjs-dist` for rasterising, the worker copied into
 * our own origin by `scripts/sync-pdf-worker.mjs`. Do not add benchmark numbers
 * that were not measured on a named device — the arithmetic is labelled as such.
 */
export const whyLocalPage: Localized<PageDoc> = {
  en: {
    title: "How Reeff keeps your PDF on your device",
    description:
      "What actually runs in the browser: pdf-lib for the page tree, pdf.js for rendering, and a four-step check you can run yourself to confirm no upload happens.",
    updated: "2026-11-06",
    body: [
      {
        kind: "p",
        text: "“Files never leave your device” is easy to print on a landing page and hard to disprove from the outside. This page is the long version: which library does which job, what the browser downloads while you work, where the approach breaks down, and how to verify all of it yourself in about ninety seconds.",
      },
      { kind: "h2", text: "Two libraries, two very different jobs", id: "libraries" },
      {
        kind: "p",
        text: "Almost every PDF tool on Reeff.PDF is one of two kinds of work. Mixing them up is the usual reason a “free PDF tool” quietly destroys your text layer.",
      },
      {
        kind: "table",
        caption: "What each tool actually does to the file",
        head: ["Job", "Library", "What happens to the file"],
        rows: [
          [
            "Merge, split, rotate, delete, extract, reorder, crop",
            "pdf-lib",
            "Rewrites the page tree and page boxes. Page content streams are copied as they are — never decoded, never re-encoded — so fonts, links and selectable text survive.",
          ],
          [
            "PDF to image; the “balanced” and “strong” compression levels",
            "pdf.js",
            "Renders each page onto a canvas at a chosen DPI, then exports that canvas as JPEG or PNG. This is the only path that turns text into pixels.",
          ],
          [
            "Text boxes, signatures, annotations",
            "fabric.js + pdf-lib",
            "Elements are drawn on an editor canvas, then written into the PDF as an overlay. The original page stays untouched underneath.",
          ],
          [
            "“Light” compression",
            "pdf-lib",
            "Repacks the file with object streams and leaves the metadata alone. It cannot shrink image data, so the saving is small by design.",
          ],
        ],
      },
      {
        kind: "p",
        text: "The distinction matters when you judge a result. If a merge produced a 40 MB file from two 20 MB files, no data was lost — the pages were copied. If a “compress” made a scan tiny and the text is no longer selectable, the pages were rasterised and the text layer is gone. Both are legitimate outcomes; only one of them is right for your document.",
      },
      { kind: "h2", text: "What the browser downloads while you work", id: "downloads" },
      {
        kind: "p",
        text: "The page itself, the interface code, and — only if the tool needs to render a page — the pdf.js library, which is loaded on demand rather than on page load. The pdf.js worker is served from pdf.reeff.app itself, not from a public CDN: the file is copied into the build next to the rest of the site, which removes a third-party dependency that could otherwise leave a tool hanging behind a blocked request.",
      },
      {
        kind: "p",
        text: "None of those requests contain your document. Your file is read with the browser's File API into memory on your machine, and the output is handed back as a local blob that the browser turns into a download. There is no endpoint to POST to: the tools have no server component at all.",
      },
      { kind: "h2", text: "Verify it yourself", id: "verify" },
      {
        kind: "steps",
        items: [
          {
            title: "Open the tool with DevTools visible",
            text: "Press F12 (or ⌥⌘I on a Mac), switch to the Network tab, and tick “Preserve log”. Leave the filter on “All” so nothing is hidden from you.",
          },
          {
            title: "Clear the list, then process a file",
            text: "Click the clear button, choose a PDF, and run the tool as you normally would.",
          },
          {
            title: "Read the request list",
            text: "You will see page assets, the worker when rendering is involved, and your file appearing as a local blob. There is no multipart/form-data POST and no request whose body is your PDF.",
          },
          {
            title: "Cut the connection and repeat",
            text: "Once the page has loaded, turn off Wi-Fi and run the tool again. It still finishes. A tool that uploads cannot do that.",
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "The one exception, stated plainly",
        text: "Future features that need a server — cloud OCR, invoice verification — will be labelled on the button and explained before you click. If a page ever uploads something without saying so, that is a bug worth reporting.",
      },
      { kind: "h2", text: "Where the local approach stops", id: "limits" },
      {
        kind: "ul",
        items: [
          "Memory is the real ceiling, and it tracks pixels rather than megabytes. By arithmetic, one A4 page rendered at 150 DPI is about 1240 × 1754 pixels, roughly 8 MB of bitmap in memory before it becomes a JPEG. Tools that render one page at a time stay near that figure; a job that needs every page in memory at once will not.",
          "Scanned documents have no text layer. Selecting, searching or extracting text from them needs OCR, which needs a model far larger than a page of JavaScript — so we do not offer it rather than offer a bad version of it.",
          "A merge has to hold the finished document in memory before the download starts. Four hundred pages is comfortable; a two-gigabyte archive is not, on any browser.",
          "Nothing syncs between devices, because there is no account and no history. That is the trade: no sync, and nothing to leak.",
        ],
      },
      { kind: "h2", text: "Why we built it this way", id: "why" },
      {
        kind: "p",
        text: "A server-side converter has a bandwidth bill, a storage decision and a queue, and it forces a privacy-policy paragraph that says “we delete your file after an hour”. A browser-side tool has none of those. It is also faster on a bad connection, because the file never travels.",
      },
      {
        kind: "p",
        text: "The cost is that we cannot help you after the fact: if a tab crashes, there is no copy on our side to restore. That is why every tool leaves your original file untouched and only ever produces a new download.",
      },
    ],
  },
  zh: {
    title: "Reeff 怎么让 PDF 留在你的设备上",
    description:
      "浏览器里到底跑的是什么：pdf-lib 改页面结构、pdf.js 负责渲染，以及一套你自己就能做的四步验证，确认没有上传发生。",
    updated: "2026-11-06",
    body: [
      {
        kind: "p",
        text: "「文件从不离开你的设备」这句话很容易印在落地页上，却很难从外部证伪。这一页给的是长版本：哪个库负责哪件事、你在操作时浏览器到底下载了什么、这个方案在哪里失效，以及怎么用一分半钟自己验证全部结论。",
      },
      { kind: "h2", text: "两个库，两件完全不同的事", id: "libraries" },
      {
        kind: "p",
        text: "Reeff.PDF 上的工具几乎都属两类工作之一。把它们混为一谈，正是「免费 PDF 工具」悄悄毁掉你文字层的常见原因。",
      },
      {
        kind: "table",
        caption: "每个工具到底对文件做了什么",
        head: ["操作", "使用的库", "对文件做了什么"],
        rows: [
          [
            "合并、拆分、旋转、删除、提取、重排、裁剪",
            "pdf-lib",
            "改写页面树与页面框。页面内容流原样复制——不解码、不重编码——所以字体、链接与可选中文字都会保留。",
          ],
          [
            "PDF 转图片；压缩的「平衡」「强力」档",
            "pdf.js",
            "按选定 DPI 把每页渲染到 canvas，再把 canvas 导出成 JPEG 或 PNG。这是唯一会把文字变成像素的路径。",
          ],
          [
            "文字框、签名、批注",
            "fabric.js + pdf-lib",
            "元素先画在编辑器的 canvas 上，再作为叠加层写进 PDF。原始页面在下面完全不动。",
          ],
          [
            "「轻度」压缩",
            "pdf-lib",
            "用对象流重新打包文件，并保持元数据不动。它无法压缩图像数据，所以节省幅度天生就小。",
          ],
        ],
      },
      {
        kind: "p",
        text: "判断结果时这个区别很关键。两份 20 MB 的文件合并出 40 MB，并没有丢数据——页面是被复制的。如果「压缩」把扫描件压得很小、但文字再也选不中，那说明页面被光栅化了、文字层没了。两种都是合理结果，只是只有一种适合你手上的文件。",
      },
      { kind: "h2", text: "你操作时浏览器下载了什么", id: "downloads" },
      {
        kind: "p",
        text: "页面本身、界面代码，以及——只有需要渲染页面时——按需加载（而不是随页面加载）的 pdf.js。pdf.js 的 worker 由 pdf.reeff.app 自己提供，而不是公共 CDN：这个文件在构建时被复制到站点里，从而去掉了一个第三方依赖，避免工具卡在一个被拦截的请求上。",
      },
      {
        kind: "p",
        text: "这些请求里都不含你的文档。你的文件通过浏览器的 File API 读进本机内存，输出以本地 blob 交还给你，由浏览器自己变成下载。没有可 POST 的端点：这些工具根本没有服务端组件。",
      },
      { kind: "h2", text: "自己验证一遍", id: "verify" },
      {
        kind: "steps",
        items: [
          {
            title: "开着开发者工具打开工具页",
            text: "按 F12（Mac 上是 ⌥⌘I），切到 Network 面板，勾上「Preserve log」。过滤器留在「All」，不要在观感上给自己省事。",
          },
          {
            title: "清空列表，然后处理一个文件",
            text: "点一下清除按钮，选一份 PDF，像平常一样把工具跑完。",
          },
          {
            title: "看请求列表",
            text: "你会看到页面资源、需要渲染时出现的 worker，以及以本地 blob 形式出现的你的文件。没有 multipart/form-data 的 POST，也没有任何请求的请求体是你的 PDF。",
          },
          {
            title: "断网再跑一次",
            text: "页面加载完之后关掉 Wi-Fi，再跑一遍工具，它照样能完成。会上传的工具做不到这一点。",
          },
        ],
      },
      {
        kind: "callout",
        tone: "warn",
        title: "唯一的例外，写在这里",
        text: "将来需要服务器的功能——云端 OCR、发票查验——会在按钮上标注，并在你点击之前解释清楚。如果哪个页面偷偷上传了东西，那就是一个值得反馈的 Bug。",
      },
      { kind: "h2", text: "本地方案的边界在哪", id: "limits" },
      {
        kind: "ul",
        items: [
          "真正的天花板是内存，而且它跟像素有关，跟兆字节无关。算一下：一页 A4 在 150 DPI 下约 1240 × 1754 像素，在变成 JPEG 之前大约要占 8 MB 位图。一次只渲染一页的工具会稳定在这个量级；需要把全部页面同时放在内存里的任务就不行。",
          "扫描件没有文字层。要选中、搜索或提取文字就需要 OCR，而 OCR 模型远比一页 JavaScript 大——所以我们不提供，而不是提供一个很差的版本。",
          "合并必须在下载开始前把成品文档放进内存。四百页很轻松，两个 G 的包在任何浏览器上都不行。",
          "设备之间不同步，因为没有账号也没有历史。这就是取舍：没有同步，也就没有东西可以泄露。",
        ],
      },
      { kind: "h2", text: "为什么这样做", id: "why" },
      {
        kind: "p",
        text: "服务端转换器有带宽账单、有「文件存哪」的决策、有一个队列，还被迫要在隐私政策里写一段「我们在一小时后删除你的文件」。浏览器端工具这些都没有。网络差的时候它也更快，因为文件根本没有走网络。",
      },
      {
        kind: "p",
        text: "代价是我们事后帮不了你：标签页崩了，我们这边没有副本可以恢复。所以每个工具都保持你的原文件不动，只产出一个新的下载。",
      },
    ],
  },
};
