import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/projects", "/contact"];
  const projects = getProjects().map(({ slug }) => `/projects/${slug}`);

  return [...pages, ...projects].map((path) => ({
    url: new URL(path, site.url).toString(),
  }));
}
