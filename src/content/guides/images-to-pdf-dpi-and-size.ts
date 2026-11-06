import { SITE } from "@/content/site";
import type { Guide, Localized } from "@/content/types";

const en: Guide = {
  slug: "images-to-pdf-dpi-and-size",
  group: "convert",
  title: "Images to PDF: DPI, page size and the 2 MB email limit",
  description:
    "An image has no DPI until you place it on a page. The one formula that predicts whether your photos will look sharp when printed, how page size and fit change the answer, and how to hit an attachment limit without guessing.",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/image-to-pdf"],
  body: [
    {
      kind: "p",
      text: "Turning photos into a PDF looks like the simplest operation on the site: pick the images, pick a page size, press the button. The thing that goes wrong is quieter than an error message. The result opens fine, looks fine on screen, and prints at 90 DPI because the images were phone screenshots, or because “fit to page” stretched a 600-pixel-wide picture across 210 mm. One formula prevents the whole class of problem.",
    },
    { kind: "h2", text: "An image has no DPI until you place it", id: "no-dpi" },
    {
      kind: "p",
      text: "A JPEG on disk is a grid of pixels and nothing else. The DPI stored in its metadata is a printing hint that most software ignores. What decides sharpness is the number of pixels per inch of paper when the image has been placed and scaled:",
    },
    {
      kind: "callout",
      tone: "note",
      title: "The only formula you need",
      text: "Effective DPI = pixel width ÷ (placed width in millimetres ÷ 25.4). A 2000-pixel-wide photo placed across a 210 mm page: 210 ÷ 25.4 = 8.27 inches, and 2000 ÷ 8.27 ≈ 242 DPI. The same photo in a two-up layout at 105 mm width gives 484 DPI — the same file, twice the sharpness, because it covers half the paper.",
    },
    {
      kind: "table",
      caption: "Effective DPI of an image placed across the full width of an A4 page (210 mm). The right column is what the same image gives when printed at 100 × 150 mm instead.",
      head: ["Image width", "Across 210 mm (A4)", "At 100 mm"],
      rows: [
        ["800 px", "97 DPI — soft", "203 DPI"],
        ["1200 px", "145 DPI — acceptable on screen", "305 DPI"],
        ["2000 px", "242 DPI — fine for photos", "508 DPI"],
        ["3000 px", "363 DPI — more than print needs", "762 DPI"],
        ["4000 px (phone camera)", "484 DPI — wasteful", "1016 DPI"],
      ],
    },
    {
      kind: "p",
      text: "300 DPI is the print industry's target for photographs. Above roughly 400 DPI you are storing pixels the press cannot use, which is where “my PDF is 40 MB of holiday photos” comes from.",
    },
    { kind: "h2", text: "What the tool does to your files", id: "what-the-tool-does" },
    {
      kind: "p",
      text: "It does not resample, resize or re-compress your images. PNG and JPEG bytes are embedded exactly as they are, so a 12 MB photo stays a 12 MB photo inside the PDF and the file size is close to the sum of the inputs plus a small overhead. WebP is the one exception: the library cannot embed WebP directly, so those images are converted to PNG first, which usually makes them larger than the WebP you started with.",
    },
    {
      kind: "ul",
      items: [
        "Page size: “fit” makes each page exactly the size of its image (with the longest edge capped at A4's long edge, so a huge image does not create an enormous page), A4 and Letter put the image on a fixed sheet.",
        "Orientation: auto turns the page to match each image, which is what you want for a folder of mixed portrait and landscape photos.",
        "Margin: the white border in points, 1 pt = 1/72 inch. 28 pt ≈ 10 mm, which is a normal document margin.",
      ],
    },
    {
      kind: "figure",
      src: "/guides/images-to-pdf-dpi-and-size/01-page-size-and-fit.webp",
      alt: "The images-to-PDF tool with four photos queued, page size set to A4, orientation on auto and a 28 pt margin.",
      caption: "Order, page size, orientation and margin — the four settings that decide the output.",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "Hitting an attachment limit without guessing", id: "limits" },
    {
      kind: "p",
      text: "The PDF will weigh about as much as your images, because nothing is re-compressed: 20 photos of 3 MB give a 60 MB PDF. Gmail refuses attachments over 25 MB; Outlook's default limit is 20 MB; most web forms cap at 5–10 MB. If you are over, the lever is the images themselves, not this tool — there is no “compress” setting here, and adding one that silently degraded your photos would be worse than telling you the number.",
    },
    {
      kind: "table",
      caption: "Practical ways to get under a limit, in the order worth trying.",
      head: ["What to do", "Effect on the PDF"],
      rows: [
        ["Resize the images before adding them (2000 px on the long edge is enough for A4 at print quality)", "Usually the single biggest saving, and lossless for anything you view on screen"],
        ["Convert photos to greyscale when colour carries no information", "Roughly a third of the bytes for a JPEG"],
        ["Send fewer pages: split the document and send part one now", "Linear — half the pages, half the size"],
        ["Re-save a JPEG at quality 80 with an image editor", "Meaningful, but it is a re-encode: do it once, not twice"],
        ["Add the images and hope the tool shrinks them", "It will not. Nothing here re-encodes"],
      ],
    },
    { kind: "h2", text: "The order of operations", id: "order" },
    {
      kind: "steps",
      items: [
        {
          title: "Normalise the files first",
          text: "The tool accepts PNG, JPEG and WebP. An iPhone saves HEIC by default, which is not in that list — convert to JPEG before you start, or the upload will simply not accept the file.",
        },
        {
          title: "Decide the page size from the destination",
          text: "A PDF that will only be read on a phone: “fit” is fine and gives the largest image per page. A PDF that will be printed or filed with other documents: A4 or Letter, so it stacks with everything else.",
        },
        {
          title: "Sort in the tool, not in the folder",
          text: "Pages come out in the order of the queue. Drag the thumbnails into the right order before exporting; renaming twenty files to force an order is slower and easier to get wrong.",
        },
        {
          title: "Check the first and last page of the result",
          text: "Twenty-page documents are almost never wrong in the middle — they are wrong at the ends, where a photo was missed or added twice.",
        },
      ],
    },
    { kind: "h2", text: "Mistakes that come back as complaints", id: "mistakes" },
    {
      kind: "ul",
      items: [
        "Screenshots of text. A 96 DPI screenshot of a paragraph placed on A4 prints at about 110 DPI: readable on screen, fuzzy on paper, and it cannot be searched because those pixels are a picture of letters.",
        "Mixed orientations with a fixed page size. Ten portrait photos and one landscape photo on A4 pages leave the landscape one small, centred in a sea of white — use “fit”, or auto orientation.",
        "A margin added on top of the photo's own white border, which makes a double frame and shrinks the content.",
        "WebP input. It works, but the tool converts it to PNG to embed it, so a 200 KB WebP can become a 1.5 MB page inside the PDF.",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "“Fit” is not a page size",
      text: "Every page in “fit” mode gets the size of its own image, so a folder of mixed photos produces a document whose pages differ by a few millimetres. Print that and the driver will scale each page differently. If the file is going to a printer, choose A4 or Letter and let the images sit inside it.",
    },
    { kind: "h2", text: "Check the result in three steps", id: "check" },
    {
      kind: "ol",
      items: [
        "Count the pages against the number of images you added. A missing page here is always an image the tool could not decode.",
        "Zoom to 100 % on the largest image. If it looks soft at print size, no later step will fix it — go back to the source file and resize down from a larger original.",
        "Check the file size before you attach it, not after the email bounces.",
      ],
    },
    {
      kind: "p",
      text: "The formula, the page size and the queue order decide everything that happens in this tool. Once you know your image's pixel width and the width of paper it will occupy, the result is arithmetic — and a PDF built from correctly sized images is smaller, sharper and faster to make than any amount of post-processing.",
    },
  ],
};

const zh: Guide = {
  slug: "images-to-pdf-dpi-and-size",
  group: "convert",
  title: "图片转 PDF：DPI、页尺寸与 2 MB 附件上限",
  description:
    "图片在放到页面上之前没有 DPI。一个公式就能预测你的照片印出来清不清楚、页尺寸与「贴合」如何改变答案，以及怎么不靠猜就压到附件上限以内。",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/image-to-pdf"],
  body: [
    {
      kind: "p",
      text: "把照片变成 PDF 看上去是这个站上最简单的操作：选图、选页尺寸、按按钮。出事的方式比报错安静得多。结果打得开、屏幕上看着也行，印出来却是 90 DPI——因为那些图是手机截图，或者因为「贴合页面」把一张 600 像素宽的图拉满了 210 毫米。一个公式能挡掉这一整类问题。",
    },
    { kind: "h2", text: "图片在放到页面上之前没有 DPI", id: "no-dpi" },
    {
      kind: "p",
      text: "磁盘上的 JPEG 只是一格一格的像素，仅此而已。它元数据里存的 DPI 是一个打印提示，而大多数软件根本不看。决定清晰度的是图片被放置并缩放之后，每英寸纸面上有多少像素：",
    },
    {
      kind: "callout",
      tone: "note",
      title: "唯一需要的公式",
      text: "实际 DPI = 像素宽 ÷（放置宽度毫米数 ÷ 25.4）。一张 2000 像素宽的照片铺满 210 毫米页宽：210 ÷ 25.4 = 8.27 英寸，2000 ÷ 8.27 ≈ 242 DPI。同一张图放进双栏版式、宽度只有 105 毫米时是 484 DPI——同一个文件，清晰度翻倍，因为它只占一半的纸。",
    },
    {
      kind: "table",
      caption: "一张图铺满 A4 页宽（210 毫米）时的实际 DPI。右列是同一张图按 100 × 150 毫米印刷时的结果。",
      head: ["图片宽度", "铺满 210 毫米（A4）", "按 100 毫米"],
      rows: [
        ["800 px", "97 DPI——发虚", "203 DPI"],
        ["1200 px", "145 DPI——屏幕上可接受", "305 DPI"],
        ["2000 px", "242 DPI——照片够用", "508 DPI"],
        ["3000 px", "363 DPI——超过印刷所需", "762 DPI"],
        ["4000 px（手机拍摄）", "484 DPI——浪费", "1016 DPI"],
      ],
    },
    {
      kind: "p",
      text: "300 DPI 是印刷业对照片的目标值。超过大约 400 DPI，你存的像素机器用不上——「我的 PDF 里全是 40 MB 的度假照片」就是这么来的。",
    },
    { kind: "h2", text: "工具对你的文件做了什么", id: "what-the-tool-does" },
    {
      kind: "p",
      text: "它不重采样、不缩放、不重压缩你的图片。PNG 和 JPEG 的字节是原样嵌入的，所以一张 12 MB 的照片在 PDF 里还是 12 MB，文件体积接近各输入之和再加一点开销。WebP 是唯一的例外：这个库不能直接嵌入 WebP，所以这类图片会先被转成 PNG，而转出来的通常比你原来的 WebP 更大。",
    },
    {
      kind: "ul",
      items: [
        "页尺寸：「贴合」让每一页正好等于它那张图的尺寸（长边上限设成 A4 长边，避免超大图片生成巨型页面）；A4 与 Letter 则把图片放进固定的纸张。",
        "方向：自动会按每张图转向，一文件夹里有横有竖的照片时，这就是你要的。",
        "页边距：白边的点数，1 pt = 1/72 英寸。28 pt ≈ 10 毫米，是常见的文档边距。",
      ],
    },
    {
      kind: "figure",
      src: "/guides/images-to-pdf-dpi-and-size/01-page-size-and-fit.webp",
      alt: "图片转 PDF 工具里排好了四张照片，页尺寸设为 A4，方向为自动，页边距 28 pt。",
      caption: "顺序、页尺寸、方向、页边距——决定产物的四个设置。",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "不靠猜地压到附件上限以内", id: "limits" },
    {
      kind: "p",
      text: "这份 PDF 的体积大致等于你那些图片的体积，因为什么都不会被重压缩：20 张 3 MB 的照片就是 60 MB 的 PDF。Gmail 拒收超过 25 MB 的附件，Outlook 默认上限 20 MB，多数网页表单卡在 5–10 MB。超了的时候，杠杆在图片本身，不在这个工具——这里没有「压缩」档位，而加一个会偷偷降低照片质量的档位，比直接告诉你数字更糟。",
    },
    {
      kind: "table",
      caption: "压到上限以内的实用办法，按值得尝试的顺序。",
      head: ["怎么做", "对 PDF 的影响"],
      rows: [
        ["放进去之前先把图片缩小（长边 2000 像素足够 A4 印刷级）", "通常是省得最多的一步，而且对屏幕阅读是无损的"],
        ["色彩不承载信息时把照片转灰度", "JPEG 的体积大约只剩三分之一"],
        ["少发几页：拆开，先发第一部分", "线性——页数减半，体积减半"],
        ["用图片工具把 JPEG 以质量 80 另存一次", "有效，但那是一次重编码：只做一次，别做两次"],
        ["把图放进去，指望工具帮你压", "不会。这里什么都不重编码"],
      ],
    },
    { kind: "h2", text: "操作的顺序", id: "order" },
    {
      kind: "steps",
      items: [
        {
          title: "先把文件格式统一",
          text: "工具接受 PNG、JPEG 和 WebP。iPhone 默认存 HEIC，不在这个列表里——开始之前先转成 JPEG，否则上传那一步根本不会接受这个文件。",
        },
        {
          title: "按去处决定页尺寸",
          text: "只在手机上看：用「贴合」，每页的图像最大。要打印、要和别的文件归到一起：用 A4 或 Letter，它才能和其余文档叠在一起。",
        },
        {
          title: "在工具里排序，不要在文件夹里排",
          text: "页序就是队列顺序。导出前把缩略图拖到正确位置；为了强制排序去给二十个文件改名，更慢也更容易错。",
        },
        {
          title: "检查结果的第一页和最后一页",
          text: "二十页的文档很少错在中间——它错在两端，那里通常是漏了一张照片，或者同一张被加了两次。",
        },
      ],
    },
    { kind: "h2", text: "会变成投诉的几个错误", id: "mistakes" },
    {
      kind: "ul",
      items: [
        "文字的截图。一张 96 DPI 的段落截图放到 A4 上，实际约 110 DPI：屏幕上能读，纸上发虚，而且搜不到——那些像素只是字的图片。",
        "页尺寸固定却混着横竖。十张竖图加一张横图放进 A4，横的那张会小一号、被居中在一大片白里——用「贴合」，或者自动方向。",
        "照片自带白边，你又加了页边距，于是变成双框，内容还更小了。",
        "WebP 输入。能用，但工具要把它转成 PNG 才能嵌入，所以 200 KB 的 WebP 可能在 PDF 里变成 1.5 MB 的一页。",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "「贴合」不是一种页尺寸",
      text: "贴合模式下每一页都取它自己那张图的尺寸，所以一文件夹混合照片会生成一份页与页相差几毫米的文档。拿去打印，驱动会给每页不同的缩放。要交给打印机，就选 A4 或 Letter，让图片待在纸里。",
    },
    { kind: "h2", text: "三步验完", id: "check" },
    {
      kind: "ol",
      items: [
        "用页数对比你加进去的图片数。少一页，永远是工具解不了的那张图。",
        "把最大那张图放大到 100%。按印刷尺寸看已经发虚的话，后面任何一步都救不回来——回源文件，从更大的原图往下缩。",
        "在贴上邮件之前就检查文件大小，而不是等退信。",
      ],
    },
    {
      kind: "p",
      text: "公式、页尺寸和队列顺序决定了这个工具里发生的一切。一旦你知道图片像素宽和它将占多宽的纸，结果就是算术——而一份用正确尺寸的图片搭起来的 PDF，比任何后期处理做出来的都更小、更清楚、也更快做出来。",
    },
  ],
};

export const imagesToPdfDpiAndSize: Localized<Guide> = { en, zh };
