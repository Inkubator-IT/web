import type { Project, ProjectFilters } from "@/types/project";
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
      cache: "no-store",
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
      cache: "no-store",
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
