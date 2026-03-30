import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "*/cart",
          "*/wishlist",
          "*/profile",
          "*/login",
          "*/admin",

          "/*?search=*",
          "/*&search=*",

          "/api/",
          "/_next/",
          "/static/",

          "*/reset",
          "*/reset/*", 
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
