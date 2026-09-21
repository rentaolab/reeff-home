import type { NextConfig } from "next";

/**
 * Root brand site (reeff.app) — deliberately a separate app from the tool
 * subdomain: different content, different release cadence, and nothing here can
 * break pdf.reeff.app.
 *
 * The headers below are the cheap hardening we discussed earlier: refuse to be
 * embedded by third-party sites, which is the most realistic way a cloned or
 * iframed copy would quietly consume our Vercel bandwidth / edge-request quota.
 */
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
