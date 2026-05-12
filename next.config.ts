import type { NextConfig } from "next";

const staticHeaders = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block framing (belt-and-suspenders alongside CSP frame-ancestors)
  { key: "X-Frame-Options", value: "DENY" },
  // Explicitly disable the deprecated XSS auditor (modern browsers ignore it;
  // old browsers with it enabled can introduce new XSS vectors)
  { key: "X-XSS-Protection", value: "0" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HSTS: 2 years, include subdomains, allow preload registration
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.153"],

  // Remove the X-Powered-By: Next.js header
  poweredByHeader: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: staticHeaders,
      },
    ];
  },
};

export default nextConfig;
