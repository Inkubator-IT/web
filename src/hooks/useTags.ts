import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Tag } from "@/types/blog";

// Response wrapper for Hono API
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

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
    
    return apiResponse.data as T;
  }
  return response as T;
}

// Query keys
const tagKeys = {
  all: ["tags"] as const,
  lists: () => [...tagKeys.all, "list"] as const,
};

// Fetch all tags
export function useTags() {
  return useQuery({
    queryKey: tagKeys.lists(),
    queryFn: async () => {
      const response = await apiClient.get<Tag[] | ApiResponse<Tag[]>>(
        "/tags",
      );
      return extractData(response);
    },
  });
}