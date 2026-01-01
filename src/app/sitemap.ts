import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";
import { fetchBlogs } from "@/lib/api";
import { fetchProjects } from "@/lib/api";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/our-services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  let dynamicBlogPages: MetadataRoute.Sitemap = [];
  try {
    const blogs = await fetchBlogs();
    dynamicBlogPages = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updated_at || blog.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  let dynamicPortfolioPages: MetadataRoute.Sitemap = [];
  try {
    const projects = await fetchProjects();
    dynamicPortfolioPages = projects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.id}`,
      lastModified: new Date(project.updated_at || project.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching projects for sitemap:", error);
  }

  return [...staticPages, ...dynamicBlogPages, ...dynamicPortfolioPages];
}
