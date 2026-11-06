import type { Block, Localized } from "@/content/types";

/**
 * Homepage long copy.
 *
 * Kept out of src/lib/dictionaries.ts on purpose (that file is UI chrome), and
 * rendered between the product grid and the waitlist form. `scripts/check-content.mjs`
 * requires ≥900 rendered words on the homepage, which is why the FAQ answers are
 * written as prose rather than one-liners.
 */
export type HomeSection = { id: string; heading: string; blocks: Block[] };

export type HomeContent = {
  sections: HomeSection[];
  faq: { heading: string; intro: string; items: { q: string; a: string }[] };
};

export const homeContent: Localized<HomeContent> = {
  en: {
    sections: [
      {
        id: "uses",
        heading: "What people use it for",
        blocks: [
          {
            kind: "p",
            text: "The tools are deliberately small, so most sessions last two minutes and end with a download. Four jobs come up far more often than the rest:",
          },
          {
            kind: "ul",
            items: [
              "Combining a stack of invoices or scanned receipts into one file before it goes to an accountant, instead of attaching eleven separate PDFs.",
              "Pulling three pages out of a 200-page contract for someone who only needs those three — without sending the other 197.",
              "Rotating and cropping a phone scan that came out sideways with a thumb in the corner, so the printed version looks like a document and not a photo of one.",
              "Turning a design export into images for a slide deck, or a folder of photos into one A4 PDF that a printer will accept.",
            ],
          },
          {
            kind: "p",
            text: "None of those jobs need an account, and none of them need the file to travel anywhere. That is the whole design constraint: if a chore can be finished on your own device, it should be, because then there is no upload, no queue and no copy of your document sitting on someone else's disk.",
          },
        ],
      },
      {
        id: "how",
        heading: "How it works",
        blocks: [
          {
            kind: "steps",
            items: [
              {
                title: "Open the tool you need",
                text: "Twelve tools live in Reeff.PDF. Every page loads straight into the interface — no sign-in wall, no “start free trial” step, no file dialog that opens before you can see what the tool does.",
              },
              {
                title: "Add your file",
                text: "The document is read into your browser's memory on your machine. There is no server component behind the tools, so there is nothing to upload to and no request that carries your file.",
              },
              {
                title: "Download the result",
                text: "Processing happens locally and the output is saved as a new file. Your original is never modified or replaced, which also means you can always start again from the same input.",
              },
            ],
          },
          {
            kind: "p",
            text: "The mechanics behind that — which library edits the page tree, which one renders pixels, and a four-step test you can run in DevTools to confirm no upload happens — are written out on the on-device page rather than summarised here.",
          },
        ],
      },
      {
        id: "tradeoffs",
        heading: "What Reeff is not",
        blocks: [
          {
            kind: "p",
            text: "There is no OCR, no cloud storage, no account and no batch automation, and those gaps are decisions rather than an unfinished roadmap. Scanned documents have no text layer, and making one needs a model far larger than the page you are reading; keeping a copy of your files would mean owning a liability and writing a privacy paragraph we would rather not have to write.",
          },
          {
            kind: "p",
            text: "If your job genuinely needs a server — extracting text from 5,000 scans, syncing a folder across devices, running a script over an archive — a server-side service is the right tool, and we will say so instead of pretending otherwise. What we will not do is bolt those features on quietly while still claiming that nothing ever leaves your device.",
          },
        ],
      },
    ],
    faq: {
      heading: "Questions people actually ask",
      intro: "Short answers, no marketing. Every one of them is checked against how the tools behave today.",
      items: [
        {
          q: "Is Reeff.PDF really free?",
          a: "Yes. All twelve tools are free and unlimited: no account, no watermark, no page cap and no file-size cap imposed by us. Tools that run in your browser cost us nothing per file, so there is no quota to protect.",
        },
        {
          q: "Are my files uploaded to a server?",
          a: "No. PDF processing happens inside your browser, and the tools have no server component. You can confirm it yourself: open DevTools, watch the Network tab while you process a file, and you will see no request whose body is your document.",
        },
        {
          q: "Do I need to create an account?",
          a: "No, and there is no account system to create. Nothing in the toolkit needs a login, so asking for an email address would only exist to build a list.",
        },
        {
          q: "Is there a file size limit?",
          a: "There is no cap from us. The real limit is your device's memory and your browser: a merge has to hold the finished document in memory before the download starts, and rendering a page to an image costs roughly 8 MB of bitmap for an A4 page at 150 DPI. Very large scans can therefore fail on a phone and succeed on a laptop.",
        },
        {
          q: "Does it work on a phone or tablet?",
          a: "Yes — same interface, same tools, nothing to install. Phones have less memory, so a 300-page scan that is fine on a laptop may run out of room on a phone. Lower the page count or move to a desktop for jobs that large.",
        },
        {
          q: "Why did compression barely shrink my file?",
          a: "Because most text PDFs are already compressed. The lossless level repacks the file structure, which typically saves a few percent, or a few hundred kilobytes on files made by older software. Shrinking a scan properly means re-encoding pages as images, which does make the file much smaller — and removes the text layer, so the document stops being searchable.",
        },
        {
          q: "Can Reeff read text out of a scanned PDF?",
          a: "No. OCR needs a model far bigger than the whole toolkit, and a small model produces text nobody trusts. If you need searchable text from a scan, use a dedicated OCR service; we would rather leave the gap visible than hide a poor implementation behind it.",
        },
        {
          q: "Do you keep a copy of my document?",
          a: "No copy exists, because the file never reaches us. The trade-off is that we cannot recover anything: if a tab crashes mid-job, or the output is overwritten, there is nothing on our side to restore. Keep your original until you have checked the result.",
        },
        {
          q: "Which browsers are supported?",
          a: "Current versions of Chrome, Edge, Firefox and Safari on desktop, and the same browsers on iOS and Android. Older browsers, and “desktop mode” on a phone, account for most reported problems — the tools rely on APIs those builds do not have.",
        },
        {
          q: "How is Reeff paid for?",
          a: "The local tools are free and unlimited; any future feature that needs a server — cloud OCR, invoice verification — is planned as pay-as-you-go rather than a metered free tier. Some pages on the toolkit carry advertising. There are no countdown timers, and no free feature gets quietly moved behind a payment.",
        },
      ],
    },
  },
  zh: {
    sections: [
      {
        id: "uses",
        heading: "大家拿它做什么",
        blocks: [
          {
            kind: "p",
            text: "这些工具刻意做得小，所以一次使用通常两分钟，并以一次下载结束。下面四件活儿出现的频率远高于其他：",
          },
          {
            kind: "ul",
            items: [
              "把一叠发票或扫描收据合成一个文件再交给会计，而不是发十一个单独的 PDF。",
              "从 200 页的合同里抽出三页，发给只需要那三页的人——不用把另外 197 页一起发过去。",
              "把拍歪了、边角还带着手指的手机扫描件转正、裁边，让打印出来像一份文件，而不是文件的照片。",
              "把设计导出的稿子转成图片放进幻灯片，或者把一文件夹照片做成打印机收得下的 A4 PDF。",
            ],
          },
          {
            kind: "p",
            text: "这些活儿都不需要账号，也不需要文件离开你的设备。这就是全部的设计约束：能在你自己设备上做完的杂活，就该在本地做完——没有上传、没有排队，也没有一份你的文档躺在别人的磁盘上。",
          },
        ],
      },
      {
        id: "how",
        heading: "它是怎么运作的",
        blocks: [
          {
            kind: "steps",
            items: [
              {
                title: "打开需要的工具",
                text: "Reeff.PDF 里有 12 个工具。每个页面直接进入界面——没有登录墙，没有「免费试用」这一步，也不会在你看见工具能做什么之前先弹出选文件窗口。",
              },
              {
                title: "加入你的文件",
                text: "文档被读进你本机的浏览器内存。这些工具背后没有服务端组件，所以没有可上传的地方，也没有任何一个请求携带着你的文件。",
              },
              {
                title: "下载结果",
                text: "处理在本机完成，输出另存为一个新文件。原文件永远不会被修改或覆盖，这也意味着你随时可以从同一份输入重来。",
              },
            ],
          },
          {
            kind: "p",
            text: "背后具体的机制——哪个库改页面树、哪个库负责渲染像素，以及一套在开发者工具里做的四步验证——写在「本地处理」那一页，而不是在这里概括。",
          },
        ],
      },
      {
        id: "tradeoffs",
        heading: "Reeff 不是什么",
        blocks: [
          {
            kind: "p",
            text: "这里没有 OCR、没有云存储、没有账号、也没有批量自动化，而且这些空缺是决定，不是没做完的路线图。扫描件本来就没有文字层，要造一个需要比你现在读的这一页大得多的模型；而替你保存文件意味着多一份责任，还要多写一段我们并不想写的隐私说明。",
          },
          {
            kind: "p",
            text: "如果你的活儿确实需要服务器——从 5,000 份扫描件里提取文字、把文件夹跨设备同步、对一整个档案跑脚本——那服务端服务才是对的工具，我们会直接这么说，而不是假装不是。我们不会做的是：悄悄把这些功能挂上去，同时继续在首页声称文件从不离开你的设备。",
          },
        ],
      },
    ],
    faq: {
      heading: "大家真正会问的问题",
      intro: "短答案，不讲营销。每一条都对着工具当前的实际行为核对过。",
      items: [
        {
          q: "Reeff.PDF 真的免费吗？",
          a: "真的。12 个工具全部免费、不限量：不用账号、不加水印、我们不设页数上限也不设体积上限。跑在浏览器里的工具不会给我们带来按次成本，所以没有需要守住的配额。",
        },
        {
          q: "我的文件会被上传到服务器吗？",
          a: "不会。PDF 处理发生在你的浏览器里，工具没有服务端组件。你可以自己确认：打开开发者工具，在处理文件时盯着 Network 面板，你不会看到任何请求体是你的文档。",
        },
        {
          q: "需要注册账号吗？",
          a: "不需要，也没有账号系统可以注册。工具集里没有任何功能需要登录，所以索取邮箱只会是为了攒一份名单。",
        },
        {
          q: "有文件体积限制吗？",
          a: "我们这边不设上限。真正的限制是你设备的内存和浏览器：合并必须在下载开始前把成品文档放进内存，而把一页渲染成图片，A4 在 150 DPI 下大约要占 8 MB 位图。所以同一份很大的扫描件，手机上会失败，笔记本上能成功。",
        },
        {
          q: "手机或平板上能用吗？",
          a: "能——同一套界面、同样的工具，什么都不用装。手机内存更少，所以笔记本上没问题的 300 页扫描件，在手机上可能放不下。这种体量的活儿就减少页数，或者换到电脑上做。",
        },
        {
          q: "为什么「压缩」几乎没让文件变小？",
          a: "因为大多数文字型 PDF 本身已经压缩过了。无损档只是重新打包文件结构，通常省几个百分点，对老软件生成的文件可能省几百 KB。要把扫描件真正压小，就得把页面重新编码成图片——文件会明显变小，但文字层会消失，文档不再能搜索。",
        },
        {
          q: "Reeff 能从扫描件里读出文字吗？",
          a: "不能。OCR 需要的模型比整套工具集大得多，而小模型产出的文字没人敢信。如果你需要扫描件可搜索，请用专门的 OCR 服务；我们宁愿把这个空缺明摆着，也不愿用一个糟糕的实现把它盖住。",
        },
        {
          q: "你们会保留我的文档副本吗？",
          a: "不存在副本，因为文件根本没有到我们这里。代价是我们什么也恢复不了：标签页中途崩溃、或者输出被覆盖，我们这边没有任何东西可以还原。核对结果之前，请保留你的原文件。",
        },
        {
          q: "支持哪些浏览器？",
          a: "桌面端 Chrome、Edge、Firefox、Safari 的当前版本，以及 iOS 和 Android 上的这些浏览器。旧版本浏览器，以及手机上开「桌面版网站」，是绝大多数反馈问题的来源——工具依赖的 API 那些构建里没有。",
        },
        {
          q: "Reeff 靠什么挣钱？",
          a: "本地工具免费且不限量；将来确实需要服务器的功能——云端 OCR、发票查验——按次付费，而不是「免费额度」那一套。工具站的部分页面带广告。我们不放假倒计时，也不会把免费功能悄悄挪到付费墙后面。",
        },
      ],
    },
  },
};
