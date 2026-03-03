import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/cart",
        "/ru/cart",
        "/uz/cart",
        "/en/cart",
        "/login",
        "/ru/login",
        "/uz/login",
        "/en/login",
        "/wishlist",
        "/ru/wishlist",
        "/uz/wishlist",
        "/en/wishlist",
        "/404",
        "/ru/404",
        "/uz/404",
        "/en/404",
      ],
    },
    sitemap: "https://sahif.vercel.app/sitemap.xml",
  };
}
