import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/*", "/api/*", "/_next/*", "/files/*", "/signin", "/signup"],
    },
    sitemap: "https://www.광탈페.com/sitemap.xml",
  };
}
