import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Blog } from "@/types/blog";

// Response wrapper for Hono API
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  jsonLd?: object;
  error?: string;
}

// Query keys
export const blogKeys = {
  all: ["blogs"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  list: () => [...blogKeys.lists()] as const,
  details: () => [...blogKeys.all, "detail"] as const,
  detail: (id: number | string) => [...blogKeys.details(), id] as const,
};

// Helper to extract data from API response
function extractData<T>(response: T | ApiResponse<T>): T {
  if (
    response &&
    typeof response === "object" &&
    "success" in response &&
    "data" in response
  ) {
    const apiResponse = response as ApiResponse<T>;
    if (!apiResponse.success || !apiResponse.data) {
      throw new Error(apiResponse.error || "API request failed");
    }
    
    if (Array.isArray(apiResponse.data)) {
      return apiResponse.data as T;
    }
    
    // Handle objects
    return {
      ...apiResponse.data,
      ...(apiResponse.jsonLd && { jsonLd: apiResponse.jsonLd }),
    } as T & { jsonLd?: object };
  }
  // Direct response (Next.js API route format)
  return response as T & { jsonLd?: object };
}

// Fetch all blogs
export function useBlogs() {
  return useQuery({
    queryKey: blogKeys.list(),
    queryFn: async () => {
      const response = await apiClient.get<Blog[] | ApiResponse<Blog[]>>(
        "/blogs",
      );
      return extractData(response);
    },
  });
}

// Fetch single blog by ID
export function useBlog(id: number) {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<Blog | ApiResponse<Blog>>(
        `/blogs/${id}`,
      );
      return extractData(response);
    },
    enabled: !!id && id > 0,
  });
}

// Fetch single blog by slug
export function useBlogBySlug(slug: string) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: async () => {
      const response = await apiClient.get<Blog | ApiResponse<Blog>>(
        `/blogs/slug/${slug}`,
      );
      return extractData(response);
    },
    enabled: !!slug && slug.length > 0,
  });
}
