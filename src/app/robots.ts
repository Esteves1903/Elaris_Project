import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/client-area/", "/client-login/"],
      },
    ],
    sitemap: "https://helarys.com/sitemap.xml",
  };
}
