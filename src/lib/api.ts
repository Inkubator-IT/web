import type { Project, ProjectFilters } from "@/types/project";
import type { Blog } from "@/types/blog";
import type { ApiResponse } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProjects(
  filters?: ProjectFilters,
): Promise<Project[]> {
  try {
    const params = new URLSearchParams();

    if (filters?.scope) {
      params.append("scope", filters.scope);
    }

    if (filters?.category) {
      params.append("category", filters.category);
    }

    if (filters?.featured !== undefined) {
      params.append("featured", filters.featured.toString());
    }

    if (filters?.search) {
      params.append("search", filters.search);
    }

    const url = `${API_BASE_URL}/api/projects${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const result: ApiResponse<Project[]> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to fetch projects");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function fetchProjectById(
  id: string | number,
): Promise<Project | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch project");
    }

    const result: ApiResponse<Project> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || "Project not found");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const result: ApiResponse<Blog[]> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to fetch blogs");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function fetchBlogBySlug(
  slug: string,
): Promise<(Blog & { jsonLd?: object }) | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs/slug/${slug}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog");
    }

    const result: ApiResponse<Blog> & { jsonLd?: object } =
      await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || "Blog not found");
    }

    return {
      ...result.data,
      ...(result.jsonLd && { jsonLd: result.jsonLd }),
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}
