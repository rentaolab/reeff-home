import type { Localized, PageDoc } from "@/content/types";

/**
 * /changelog — dated, newest first, only things a visitor could have noticed.
 * Dates here mirror the real commit dates of both repos; do not backdate.
 */
export const changelogPage: Localized<PageDoc> = {
  en: {
    title: "Changelog",
    description: "What changed on reeff.app and pdf.reeff.app, with dates. Newest first.",
    updated: "2026-11-06",
    body: [
      {
        kind: "p",
        text: "Only changes a visitor could notice are listed here — no internal refactors. Dates are the day the change went live.",
      },
      {
        kind: "table",
        head: ["Date", "Change", "Where"],
        rows: [
          [
            "2026-11-06",
            "Added About, Contact, How-Reeff-keeps-your-PDF-on-your-device, Changelog and Roadmap pages. Started publishing written guides.",
            "reeff.app",
          ],
          [
            "2026-10-31",
            "Added Compress PDF (the twelfth tool), plus About and How it works pages and a “runs on your device” badge on every tool. The tool site reached 160 pages across ten languages.",
            "pdf.reeff.app",
          ],
          [
            "2026-10-30",
            "www now redirects permanently to the bare domain; old tool paths on the root redirect to the subdomain; unknown paths return a real 404 instead of a soft page.",
            "reeff.app",
          ],
          [
            "2026-10-21",
            "Published ads.txt on both domains and prepared AdSense placements. Every ad slot ships switched off and is enabled per-placement, not by default.",
            "both",
          ],
          [
            "2026-09-21",
            "Reeff.app launched: English and Chinese, privacy policy, terms, and a waitlist. Social preview image (1200×630) added.",
            "reeff.app",
          ],
        ],
      },
      {
        kind: "p",
        text: "The commit history behind each entry is public: github.com/rentaolab/reeff-home for this site, github.com/rentaolab/my-pdf-app for the toolkit.",
      },
    ],
  },
  zh: {
    title: "更新日志",
    description: "reeff.app 与 pdf.reeff.app 的改动记录，按日期倒序。",
    updated: "2026-11-06",
    body: [
      {
        kind: "p",
        text: "这里只记录访客能察觉的改动，内部重构不写。日期是改动上线的当天。",
      },
      {
        kind: "table",
        head: ["日期", "改动", "站点"],
        rows: [
          [
            "2026-11-06",
            "新增「关于」「联系我们」「Reeff 怎么让 PDF 留在你的设备上」「更新日志」「路线图」五个页面，并开始发布成体系的指南。",
            "reeff.app",
          ],
          [
            "2026-10-31",
            "新增「压缩 PDF」（第 12 个工具），以及「关于」「工作原理」两页；每个工具页加上「本机运行」徽章。工具站在十种语言下达到 160 页。",
            "pdf.reeff.app",
          ],
          [
            "2026-10-30",
            "www 永久跳转到裸域；根域上的旧工具路径跳转到子域；未知路径返回真正的 404，而不是软错误页。",
            "reeff.app",
          ],
          [
            "2026-10-21",
            "两个域上线 ads.txt，并准备好 AdSense 版位。所有广告位默认关闭，按版位逐个开启，不做默认展示。",
            "两个站点",
          ],
          [
            "2026-09-21",
            "reeff.app 上线：中英双语、隐私政策、使用条款与等待名单；补充社交预览图（1200×630）。",
            "reeff.app",
          ],
        ],
      },
      {
        kind: "p",
        text: "每条记录对应的提交历史都是公开的：本站在 github.com/rentaolab/reeff-home，工具集在 github.com/rentaolab/my-pdf-app。",
      },
    ],
  },
};
