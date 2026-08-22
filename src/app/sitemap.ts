import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sewaprith-ngo.vercel.app";

  const staticPages = [
    "",
    "/about",
    "/campaigns",
    "/gallery",
    "/donate",
    "/volunteer",
    "/contact",
    "/updates",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/updates/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
