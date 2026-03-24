import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/*/cart",
          "/*/login",
          "/*/wishlist",
          "/*?search=*",
          "/*&search=*",
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
