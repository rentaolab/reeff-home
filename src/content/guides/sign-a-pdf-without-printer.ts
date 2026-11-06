import { SITE } from "@/content/site";
import type { Guide, Localized } from "@/content/types";

const en: Guide = {
  slug: "sign-a-pdf-without-printer",
  group: "organize",
  title: "Signing a PDF without a printer — and what your signature really is afterwards",
  description:
    "Print, sign, scan is a three-step tax on one page. Here is the local-only way to put your signature on a PDF, why the result is a picture rather than a digital signature, and how to size it so it looks like you signed it.",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/edit-pdf"],
  body: [
    {
      kind: "p",
      text: "Somebody sends a one-page agreement as a PDF and asks you to sign it. The traditional answer is print, sign, scan, mail back — three devices and a detour through paper for one page that never needed to exist on paper. The local answer is to draw or place your signature on the page directly. What follows is how that works, and, more importantly, what the result actually is: a picture of a signature, not a digital signature, and the difference matters the day someone questions the file.",
    },
    { kind: "h2", text: "Four things people call “signing a PDF”", id: "four-ways" },
    {
      kind: "table",
      caption: "They produce very different artefacts. Only the last one can be checked by software.",
      head: ["How you sign", "What the file ends up containing", "Can a reader verify it"],
      rows: [
        ["Type your name in a script font", "Text drawn on the page — searchable, and obviously typed", "No"],
        ["Photograph your signature on paper, place the image", "Pixels pasted over the page", "No"],
        ["Draw with a finger or a stylus in the tool", "Pixels, at the resolution of the canvas you drew on", "No"],
        ["Certificate-based digital signature", "A cryptographic hash of the file, signed with your key", "Yes — the viewer shows who signed and whether the bytes changed"],
      ],
    },
    {
      kind: "p",
      text: "The first three are what almost everyone means by “signing a PDF”, and they are perfectly normal for a lease renewal, a consent form or an invoice acknowledgement — the recipient wants to see your mark on the document and file it. The fourth is what you need when the signature has to prove that the file has not been altered since. No drawing tool can do the fourth: it requires a certificate, a trust chain and a signature dictionary, and it is what dedicated e-signature services sell.",
    },
    { kind: "h2", text: "How the editor writes onto the page", id: "how-it-writes" },
    {
      kind: "p",
      text: "The editor works as a layer over the rendered page: you drop text, an image or a drawn line onto a transparent canvas for each page, and when you export, that canvas is flattened into the PDF as an image covering the page. The original page stays underneath, untouched — its text is still text, its images are still images — but everything you added becomes pixels at that page's resolution.",
    },
    {
      kind: "p",
      text: "Two consequences follow. Your added signature or date will not be searchable, so a search for your own name will not find the page you signed. And the file grows: a full-page transparent PNG for every edited page, plus the original content. Adding a signature to one page of a 40-page document is cheap; editing all 40 is not.",
    },
    {
      kind: "figure",
      src: "/guides/sign-a-pdf-without-printer/01-signature-placed.webp",
      alt: "A signature image placed on the signature line of a one-page agreement in the PDF editor, with its size being adjusted.",
      caption: "Placing the signature as an image, scaled to the line rather than to the page.",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "Getting a signature image worth using", id: "capture" },
    {
      kind: "steps",
      items: [
        {
          title: "Sign white paper, in black, larger than life",
          text: "Plain unlined paper, a black gel or fountain pen, and a signature about twice the size you would normally write. A big, high-contrast original survives shrinking far better than a small one, and the physical size is irrelevant once you have the image.",
        },
        {
          title: "Fill the frame, straight on, with even light",
          text: "Photograph or scan the signature so it fills most of the picture, from directly above, without a shadow across it. A phone flash from one side creates a gradient that is very hard to clean up later.",
        },
        {
          title: "Crop to the ink, not to the paper",
          text: "Crop tight around the signature with a few millimetres of white margin. Everything you leave in the picture has to be placed inside the signature line later, and white paper around the ink is what makes the result look pasted-on.",
        },
        {
          title: "Raise the contrast, remove the paper",
          text: "If your editor or phone can convert to black and white or raise contrast, do that before placing. A grey rectangle behind a signature is the visual signature of a bad PDF signature.",
        },
      ],
    },
    { kind: "h2", text: "Sizing it so it looks signed, not stamped", id: "sizing" },
    {
      kind: "p",
      text: "A handwritten signature on a form is usually 40–60 mm wide and 12–20 mm tall, sitting on a line drawn for it. Place it much larger and it reads as a logo; much smaller and it reads as a thumbnail someone dropped in. The signature line itself is your guide: the ink should sit on the line and touch it, not float above it, and it should not extend past the end of the line.",
    },
    {
      kind: "figure",
      src: "/guides/sign-a-pdf-without-printer/02-sizing.webp",
      alt: "The same signature placed at three sizes on a signature line, showing the middle one sitting on the line at a realistic scale.",
      caption: "Too large reads as a stamp, too small reads as a thumbnail, on the line reads as a signature.",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "What this signature cannot do", id: "limits" },
    {
      kind: "ul",
      items: [
        "It cannot prove the file was not changed afterwards. The signature is part of the page content, so it edits exactly like any other content.",
        "It carries no identity claim: nothing in the file says who made those pixels beyond what you typed next to them.",
        "It cannot be checked by software. A viewer will not report “signed by …”, and a certificate-based workflow will not accept it as one.",
        "It is reusable. Once the image exists, anybody holding the file can copy the pixels onto another page — which is why a signed copy should never circulate as your only control.",
        "For a document where the signature must be verifiable — a contract with a jurisdiction that requires it, an official filing — use a certificate-based e-signature service and keep this method for the everyday paperwork.",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "Keep the unsigned original, and say what you sent",
      text: "Save the untouched PDF alongside the signed one. If the recipient later asks whether the page was altered, the unsigned original is the only evidence you have. And when you email a signed copy, describe it as a signed scan rather than “digitally signed” — precision here prevents a conversation you do not want to have.",
    },
    { kind: "h2", text: "Check before you send", id: "check" },
    {
      kind: "ol",
      items: [
        "Open the signed file in a different viewer from the one you edited in. Overlay placement is the thing most likely to be renderer-dependent.",
        "Zoom to 100 % on the signature: it should look like ink, not like a compressed thumbnail with a grey box around it.",
        "Check the file size against what you started with. A jump from 400 KB to 4 MB means a full-page image was baked in, which is usually a page-sized overlay rather than your signature.",
        "Search for your name. If you typed it into the editor it will not be found, and knowing that now is better than discovering it in an audit.",
      ],
    },
    {
      kind: "p",
      text: "The whole point of signing locally is that the document never leaves your machine to be printed, photographed and re-uploaded. Getting a signature onto a page takes a minute; the difference between a picture of a signature and a verifiable digital signature is the part worth understanding before you press export.",
    },
  ],
};

const zh: Guide = {
  slug: "sign-a-pdf-without-printer",
  group: "organize",
  title: "没有打印机也能签字——以及签完之后你手上到底是什么",
  description:
    "打印、签字、扫描，是为一页纸交的三道税。这里是纯本机的签名办法、为什么结果是「一张签名的图片」而不是数字签名，以及怎么把尺寸调得像真的签上去的。",
  author: SITE.author,
  published: "2026-11-06",
  updated: "2026-11-06",
  tools: ["/edit-pdf"],
  body: [
    {
      kind: "p",
      text: "对方发来一页 PDF 协议，让你签。传统答案是打印、签字、扫描、寄回去——为了一页本来不需要上纸的东西，动用三台设备并绕道纸面。本机的答案是直接在你的页面上写下或贴上签名。下面是具体做法，以及更重要的一件事：结果到底是什么——一张签名的图片，不是数字签名；而这个区别会在有人质疑这份文件的那天变得重要。",
    },
    { kind: "h2", text: "四种都叫「给 PDF 签名」的做法", id: "four-ways" },
    {
      kind: "table",
      caption: "它们产出的东西差别很大。只有最后一种能被软件验证。",
      head: ["你怎么签", "文件里最终多了什么", "阅读器能验证吗"],
      rows: [
        ["用花体字把名字打上去", "页面上绘制的文字——可搜索，而且一看就是打出来的", "不能"],
        ["纸签后拍照，把图片贴上去", "盖在页面上的像素", "不能"],
        ["用手指或手写笔在工具里画", "像素，分辨率等于你画的那块画布", "不能"],
        ["基于证书的数字签名", "整份文件的密码学哈希，用你的密钥签过", "能——阅读器会显示谁签的、字节有没有被改过"],
      ],
    },
    {
      kind: "p",
      text: "前三种是几乎所有人说的「给 PDF 签名」，在续租、知情同意书、发票确认这类场合完全正常——对方要的是看到你的签名并归档。第四种才是「签名必须能证明文件此后没被改动过」时你需要的东西。任何绘图工具都做不到第四种：它需要证书、信任链和签名字典，这也是专门的电子签名服务在卖的东西。",
    },
    { kind: "h2", text: "编辑器是怎么写到页面上的", id: "how-it-writes" },
    {
      kind: "p",
      text: "编辑器是在渲染好的页面上盖一层：你把文字、图片或画出来的线条放到每页那张透明画布上，导出时这张画布被烘焙进 PDF，成为覆盖整页的一张图片。原来的页面还在下面、没有被动过——它的文字还是文字、图片还是图片——但你加上去的一切都变成了该页分辨率下的像素。",
    },
    {
      kind: "p",
      text: "由此有两个后果。你加上的签名或日期不可搜索，搜自己的名字找不到你签的那一页。文件也会变大：每个编辑过的页面都多了一张整页透明 PNG，再加上原有内容。给 40 页里的一页加签名很便宜，把 40 页全编辑一遍不便宜。",
    },
    {
      kind: "figure",
      src: "/guides/sign-a-pdf-without-printer/01-signature-placed.webp",
      alt: "在 PDF 编辑器里把签名图片放到一页协议的签名线上，并调整其大小。",
      caption: "把签名当图片放上去，按签名线缩放，而不是按页面缩放。",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "怎么得到一张能用的签名图", id: "capture" },
    {
      kind: "steps",
      items: [
        {
          title: "在白纸上用黑笔签，签得比你平时大",
          text: "没有横线的白纸、黑色中性笔或钢笔，签名写到平时的两倍大。一个大而高对比的原稿，缩小之后比小原稿耐看太多；一旦变成图片，物理尺寸就不重要了。",
        },
        {
          title: "填满画面，正对着拍，光要匀",
          text: "拍照或扫描时让签名占画面的大部分，镜头正对纸面，不要有影子横过签名。手机闪光灯从侧面打过去会造出一道渐变，后期极难处理干净。",
        },
        {
          title: "裁到笔迹，不要留一张纸",
          text: "贴着签名裁，四周只留几毫米白边。你留在画面里的东西，最后都得塞进签名线里；而笔迹周围那片白纸，正是「看起来像贴上去的」的来源。",
        },
        {
          title: "提高对比，把纸变成白",
          text: "如果你的编辑器或手机能转黑白、能拉对比，就在放上去之前做。签名背后留一个灰方块，是糟糕的 PDF 签名最典型的视觉特征。",
        },
      ],
    },
    { kind: "h2", text: "尺寸调到像签的，不像盖的", id: "sizing" },
    {
      kind: "p",
      text: "表单上的手写签名通常是 40–60 毫米宽、12–20 毫米高，落在那道为它画的线上。放得太大就是 logo，放得太小就是谁随手拖进来的缩略图。签名线本身就是参考：笔迹应该压在线上、碰到线，而不是浮在线的上方，也不该越过线的末端。",
    },
    {
      kind: "figure",
      src: "/guides/sign-a-pdf-without-printer/02-sizing.webp",
      alt: "同一个签名在签名线上按三种尺寸放置，中间那一个压在线上的尺寸最自然。",
      caption: "太大像盖的，太小像缩略图，压在线上才像签名。",
      width: 1280,
      height: 720,
    },
    { kind: "h2", text: "这种签名做不到什么", id: "limits" },
    {
      kind: "ul",
      items: [
        "它不能证明文件此后没被改过。签名就是页面内容的一部分，别人编辑它，和你编辑任何内容一样容易。",
        "它不携带任何身份声明：除了你在旁边打的字，文件里没有任何东西说明这些像素是谁的。",
        "它不能被软件验证。阅读器不会报「已由某某签名」，基于证书的流程也不会把它当成一次签名。",
        "它可以被重复使用。图片一旦存在，任何拿到文件的人都能把这些像素复制到另一页——所以一份已签名的副本，不该是你唯一的控制手段。",
        "如果这份文件的签名必须是可验证的——管辖地有明确要求的合同、官方申报材料——请用基于证书的电子签名服务，把这种方法留给日常文书。",
      ],
    },
    {
      kind: "callout",
      tone: "warn",
      title: "留着没签的原件，并且说清你发的是什么",
      text: "把没动过的 PDF 和签好的那份存在一起。如果对方日后质疑这一页有没有被改，未签名的原件是你唯一的证据。发签名副本时，请把它说成「签字扫描件」，而不是「数字签名」——这一点精确，能避免一场你并不想进行的对话。",
    },
    { kind: "h2", text: "发送前检查", id: "check" },
    {
      kind: "ol",
      items: [
        "用另一个阅读器打开签好的文件，而不是你编辑时用的那个。覆盖层的位置最容易因渲染器不同而跑位。",
        "把签名放大到 100%：它应该像墨迹，而不是像一张带灰框的压缩缩略图。",
        "对比文件大小。从 400 KB 变成 4 MB，说明有一张整页图片被烘进去了，那通常是整页覆盖层，而不是你的签名。",
        "搜一下你的名字。如果你是在编辑器里打上去的，就搜不到；现在知道，好过在审计时才发现。",
      ],
    },
    {
      kind: "p",
      text: "在本机签名的全部意义是：文件不必离开你的电脑，去被打印、拍照、再上传。把签名放到页面上花一分钟就够了；而「一张签名的图片」和「可验证的数字签名」之间的差别，是按下导出之前值得弄懂的部分。",
    },
  ],
};

export const signAPdfWithoutPrinter: Localized<Guide> = { en, zh };
