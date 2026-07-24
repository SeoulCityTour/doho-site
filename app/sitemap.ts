import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dohoent.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/project", "/contact", "/terms", "/privacy"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}