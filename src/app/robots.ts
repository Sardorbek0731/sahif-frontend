import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/login", "/wishlist"],
    },
    sitemap: "https://sahif.vercel.app/sitemap.xml",
  };
}
