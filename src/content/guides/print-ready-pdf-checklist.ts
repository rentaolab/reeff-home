import { SITE } from "@/content/site";
import type { Guide, Localized } from "@/content/types";

const en: Guide = {
  slug: "print-ready-pdf-checklist",
  group: "print",
  title: "A print-ready PDF checklist you can actually run before sending the file",
  description:
    "Most files are rejected by a printer for five reasons, and every one of them is visible on screen. Page size, bleed, resolution, fonts and margins — plus why cropping a PDF is not the same as resizing it.",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/crop-pdf", "/compress-pdf"],
  body: [
    {
      kind: "p",
      text: "“Can you send it print-ready?” is the point where a design job turns into an argument, because the phrase hides a specification. In practice, five things decide whether a print shop accepts a PDF without a phone call: the page size, the bleed, the image resolution, the fonts, and whether anything important sits inside the area the press cannot reach. All five can be checked on screen, in a few minutes, before the file leaves your machine.",
    },
    { kind: "h2", text: "The five reasons a file comes back", id: "reasons" },
    {
      kind: "ol",
      items: [
        "Wrong page size. The document is A4 and the job is on 210 × 280 mm stock, or the order is 8 pages on a sheet and the PDF is 9.",
        "No bleed. The background colour stops exactly at the trim line, so a 0.5 mm cutting tolerance leaves a white hairline on every edge.",
        "Resolution too low. A logo pasted from a website is 96 DPI; at 300 DPI print size it becomes visibly soft on a 1200 DPI press.",
        "Fonts not embedded, or substituted. The PDF says “uses Helvetica” and the shop's machine does not have your version of it, so the spacing quietly changes.",
        "Content inside the non-printable margin. A footer 2 mm from the edge of the sheet lands in the gripper area and gets clipped.",
      ],
    },
    {
      kind: "p",
      text: "Crop marks, colour space and transparency flattening are the things a professional prepress operator checks next, and they matter — but they only become relevant once those five are right. A file with 96 DPI images cannot be rescued by adding crop marks.",
    },
    { kind: "h2", text: "Cropping is not resizing", id: "crop-not-resize" },
    {
      kind: "p",
      text: "This is the most misunderstood operation in the whole format. A PDF page has a MediaBox — the full physical sheet — and an optional CropBox, which is the rectangle the viewer and the printer are told to show. Cropping in a PDF tool usually does exactly one thing: it writes a smaller CropBox. No pixel is resampled, no content is deleted, and the file size stays roughly the same.",
    },
    {
      kind: "table",
      caption: "What a crop changes, and what it only hides.",
      head: ["", "After cropping a page"],
      rows: [
        ["What the reader sees", "Only the area inside the new CropBox."],
        ["What the file still contains", "Every page, every object, every pixel of the original MediaBox area."],
        ["Physical page size after printing", "The new CropBox — so the crop does change the printed size, but not the resolution."],
        ["File size", "Almost unchanged. Nothing was re-encoded, so nothing was removed."],
        ["Resolution of the remaining content", "Unchanged. Cropping 20 % of a page does not make the rest sharper."],
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Cropping is not redaction",
      text: "A name hidden by a CropBox is still in the file. Anybody can open the PDF in a viewer that shows the full MediaBox, or reset the CropBox, and read it. If the goal is to remove information — a client name, an account number, a signature — crop is the wrong tool and always has been; the content has to be deleted before the file is produced.",
    },
    {
      kind: "figure",
      src: "/guides/print-ready-pdf-checklist/01-crop-vs-size.webp",
      alt: "A page shown before and after cropping, with the file size unchanged and the document properties showing a smaller CropBox.",
      caption: "Same file before and after a crop: the visible area shrinks, the bytes behind it do not.",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "Resolution: what the press actually needs", id: "resolution" },
    {
      kind: "p",
      text: "The printer will ask for “300 DPI images”, which is shorthand for: at the size the image is placed on the page, it should provide about 300 pixels per inch. A 2000-pixel-wide photo placed across a 210 mm page is 2000 ÷ 8.27 inches ≈ 242 DPI — acceptable. The same photo placed across a 420 mm spread is 121 DPI — visible. What matters is never the image's native size in pixels, it is pixels divided by the inches it occupies.",
    },
    {
      kind: "table",
      caption: "Rules of thumb that hold up in practice.",
      head: ["Content", "Target resolution at print size"],
      rows: [
        ["Photographs", "300 DPI"],
        ["Text as vector or embedded font", "Not resolution-bound — it stays sharp at any size"],
        ["Line art, logos, barcodes", "600–1200 DPI, or vector"],
        ["A screenshot pasted into a layout", "96 DPI as captured: only usable at roughly a third of its pixel width"],
        ["Anything only ever read on screen", "96–150 DPI is plenty"],
      ],
    },
    { kind: "h2", text: "Margins and the area the press cannot reach", id: "margins" },
    {
      kind: "p",
      text: "Every printer has a non-printable border: the sheet has to be held while it is being printed, so the outermost few millimetres are unreachable. Most office laser printers cannot print within roughly 4–5 mm of the edge, many inkjets need about 3 mm, and a professional press needs trim marks and a 3 mm bleed instead. Anything you place inside that border is either clipped or forces the whole page to be scaled down by the driver.",
    },
    {
      kind: "ul",
      items: [
        "Keep text at least 8–10 mm from the trim edge of any page a person will read; 5 mm is the technical minimum, not a design decision.",
        "For an image or background that must reach the edge, extend it 3 mm past the trim line. That extension is the bleed, and it is what the guillotine cuts into.",
        "If your document has a 3 mm white border all round and you print it on a printer with a 5 mm non-printable area, the driver silently scales the page to 94 %. The result is not what you laid out.",
      ],
    },
    { kind: "h2", text: "The five-minute checklist", id: "checklist" },
    {
      kind: "steps",
      items: [
        {
          title: "Page size and orientation",
          text: "Open document properties: every page should be the same size and the size should be the one you ordered. Mixed A4/Letter inside one file is the single most common cause of “it printed at 97 %”.",
        },
        {
          title: "Page count, blanks and order",
          text: "Count the pages against the specification, and scroll through the thumbnails looking for an accidental blank page — photocopiers love producing one, and it shifts every later page by one in a duplex job.",
        },
        {
          title: "Fonts",
          text: "In the document properties, look for “fonts” and confirm none of them says “not embedded”. If one does, export again from the source application with embedding switched on; there is no reliable way to embed a missing font afterwards.",
        },
        {
          title: "Images",
          text: "Zoom to 100 % on the largest image on the page. If it is visibly soft at print size on screen, it will be soft on paper. This is where a pasted web logo shows itself.",
        },
        {
          title: "Margins and bleed",
          text: "Use the viewer's ruler or a temporary guide: nothing important within 5 mm of the edge, and any full-bleed element either present with 3 mm of overhang or clearly meant to be printed with a white border.",
        },
      ],
    },
    { kind: "h2", text: "When you cannot print a proof", id: "no-proof" },
    {
      kind: "ul",
      items: [
        "Print to PDF instead of to paper, then open the result and check its page size: if the virtual printer rescaled the page, the box size will have changed.",
        "Check the file in a viewer's “actual size” mode against a ruler on screen — a 210 mm wide page must measure 210 mm at 100 % zoom.",
        "Ask the shop which size, bleed and colour profile they want, in writing, before you export. The answer takes one message and saves the round trip.",
      ],
    },
    {
      kind: "p",
      text: "None of this requires a prepress department. It requires ten minutes and the willingness to look at the numbers in the document properties rather than at the page on the screen, because the file that prints correctly is the one whose boxes, resolution and margins were checked — not the one that looked right on a monitor at 60 % zoom.",
    },
  ],
};

const zh: Guide = {
  slug: "print-ready-pdf-checklist",
  group: "print",
  title: "一份真的能在交稿前跑完的印刷预检清单",
  description:
    "文件被印厂退回，九成是五个原因，而每一个都能在屏幕上查出来：页尺寸、出血、分辨率、字体和页边距——以及为什么裁剪 PDF 不等于改变尺寸。",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/crop-pdf", "/compress-pdf"],
  body: [
    {
      kind: "p",
      text: "「能不能给我可印刷的文件？」是设计活儿变成争执的那一刻，因为这句话藏着一整份规格书。实际操作中，决定印厂会不会打来电话的是五件事：页尺寸、出血、图片分辨率、字体，以及有没有把重要内容放在机器够不到的地方。这五件事全都能在屏幕上查完，只要几分钟，而且是在文件离开你电脑之前。",
    },
    { kind: "h2", text: "文件被退回的五个原因", id: "reasons" },
    {
      kind: "ol",
      items: [
        "页尺寸不对。文档是 A4，活儿却要 210 × 280 毫米的纸；或者订单是一张纸 8 页，PDF 里是 9 页。",
        "没有出血。底色正好停在裁切线上，于是 0.5 毫米的裁切误差会在每一边留下一条白线。",
        "分辨率太低。从网页上存下来的 logo 是 96 DPI，按 300 DPI 的尺寸印出来，在 1200 DPI 的机器上明显发虚。",
        "字体没嵌入，或被替换。PDF 里写着「使用 Helvetica」，印厂的机器没有你这个版本，字距就悄悄变了。",
        "内容落在不可印刷的边距里。离纸边 2 毫米的页脚正好在叼纸区，直接被切掉。",
      ],
    },
    {
      kind: "p",
      text: "裁切标记、色彩空间和透明度拼合是专业印前接下来才查的事，它们很重要——但只有在这五件对了之后才轮到它们。一份图只有 96 DPI 的文件，加上裁切标记也救不回来。",
    },
    { kind: "h2", text: "裁剪不是缩放", id: "crop-not-resize" },
    {
      kind: "p",
      text: "这是整个格式里最容易被误解的操作。PDF 页面有一个 MediaBox——整张纸的物理范围；还有一个可选的 CropBox——告诉阅读器和打印机该显示哪一块矩形。在 PDF 工具里裁剪，通常只做一件事：写一个更小的 CropBox。没有像素被重采样，没有内容被删除，文件体积也几乎不变。",
    },
    {
      kind: "table",
      caption: "裁剪改了什么，又只是藏了什么。",
      head: ["", "裁剪一页之后"],
      rows: [
        ["读者看到什么", "只有新 CropBox 内的区域。"],
        ["文件里还有什么", "每一页、每个对象、原来 MediaBox 范围内的每一个像素都还在。"],
        ["打印出来的实际页尺寸", "新的 CropBox——所以裁剪确实会改变打印尺寸，但不改变分辨率。"],
        ["文件体积", "几乎不变。没有重编码，所以什么也没被拿掉。"],
        ["剩下内容的分辨率", "不变。裁掉一页的 20% 并不会让其余部分变清晰。"],
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "裁剪不是涂抹遮盖",
      text: "被 CropBox 挡住的名字仍然在文件里。任何人用能显示完整 MediaBox 的阅读器打开，或者把 CropBox 重置，都能读到它。如果目标是删掉信息——客户姓名、账号、签名——裁剪从来就是错的工具；内容必须在生成文件之前就被去掉。",
    },
    {
      kind: "figure",
      src: "/guides/print-ready-pdf-checklist/01-crop-vs-size.webp",
      alt: "同一页在裁剪前后的对比，文件体积不变，文档属性显示 CropBox 变小了。",
      caption: "裁剪前后的同一个文件：可见区域小了，它背后的字节没少。",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "分辨率：机器真正需要多少", id: "resolution" },
    {
      kind: "p",
      text: "印厂会说「图片要 300 DPI」，这句话的意思是：按这张图在版面里被放到的尺寸算，它应该提供每英寸约 300 个像素。一张 2000 像素宽的图铺满 210 毫米页宽，就是 2000 ÷ 8.27 英寸 ≈ 242 DPI，可以接受；同一张图铺满 420 毫米的跨页，就是 121 DPI，肉眼可见。真正决定一切的从来不是图片的原生像素数，而是像素除以它占了多少英寸。",
    },
    {
      kind: "table",
      caption: "在实践中站得住的几个经验值。",
      head: ["内容", "按印刷尺寸的目标分辨率"],
      rows: [
        ["照片", "300 DPI"],
        ["矢量或嵌入字体的文字", "不受分辨率限制——放多大都清晰"],
        ["线条稿、logo、条码", "600–1200 DPI，或直接矢量"],
        ["贴进版面的截图", "截下来时就是 96 DPI：只能按大约三分之一的像素宽度使用"],
        ["只在屏幕上读的东西", "96–150 DPI 足够"],
      ],
    },
    { kind: "h2", text: "页边距与机器够不到的区域", id: "margins" },
    {
      kind: "p",
      text: "每台印刷设备都有一圈不可印刷的边：印刷时纸必须被叼住或压住，最外面那几毫米是够不到的。多数办公激光机在离边 4–5 毫米以内印不出来，很多喷墨机需要 3 毫米，而专业印刷机要的是裁切标记加 3 毫米出血。你把东西放进这圈边里，结果要么被切掉，要么整页被驱动悄悄缩小。",
    },
    {
      kind: "ul",
      items: [
        "任何要给人读的页面，文字离裁切边至少留 8–10 毫米；5 毫米是技术下限，不是设计决定。",
        "要贴到边的图片或底色，向外多铺 3 毫米。多出来的那 3 毫米就是出血，是切刀吃进去的部分。",
        "文档四周本来有 3 毫米白边，却拿给一台不可印刷区 5 毫米的机器打印，驱动会把整页悄悄缩到 94%。出来的东西不是你排的。",
      ],
    },
    { kind: "h2", text: "五分钟清单", id: "checklist" },
    {
      kind: "steps",
      items: [
        {
          title: "页尺寸与方向",
          text: "打开文档属性：每一页都该是同一个尺寸，而且是你下单的尺寸。一份文件里混着 A4 和 Letter，是「怎么印成了 97%」最常见的起因。",
        },
        {
          title: "页数、空白页与顺序",
          text: "按规格核对页数，再快速扫一遍缩略图看有没有多出的空白页——复印机特别爱生成这种页面，而双面打印时它会让之后每一页都串位。",
        },
        {
          title: "字体",
          text: "在文档属性里找字体列表，确认没有一项写着「未嵌入」。有的话，回源程序重新导出并打开字体嵌入；事后把缺失的字体嵌进去没有可靠办法。",
        },
        {
          title: "图片",
          text: "在页面上把最大的那张图放大到 100%。如果它在屏幕上按印刷尺寸看就已经发虚，纸上一定也虚。贴进来的网页 logo 就是在这里露馅的。",
        },
        {
          title: "页边距与出血",
          text: "用阅读器的标尺或临时辅助线量：离边 5 毫米内不放重要内容；任何满版元素要么带 3 毫米出血，要么明确就是要留白边印刷。",
        },
      ],
    },
    { kind: "h2", text: "没法打纸样的时候", id: "no-proof" },
    {
      kind: "ul",
      items: [
        "用「打印到 PDF」代替打印到纸，然后打开结果检查页尺寸：虚拟打印机如果缩放了，框的尺寸会变。",
        "用阅读器的「实际大小」模式对着屏幕上的尺子量——210 毫米宽的页，在 100% 下必须量出 210 毫米。",
        "导出之前直接问印厂要什么尺寸、多少出血、哪个色彩配置，并且让对方用文字回你。一条消息能省掉一次返工。",
      ],
    },
    {
      kind: "p",
      text: "这一套不需要印前部门，只需要十分钟，以及愿意去看文档属性里的数字而不是屏幕上那张纸——因为能印对的文件，是框、分辨率、页边距都被查过的文件，而不是在 60% 缩放下看着顺眼的文件。",
    },
  ],
};

export const printReadyPdfChecklist: Localized<Guide> = { en, zh };
