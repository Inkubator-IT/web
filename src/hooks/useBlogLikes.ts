import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { getUserIdentifier } from "@/utils/userIdentifier";
import { blogKeys } from "./useBlogs";

interface LikeInfo {
  count: number;
  liked: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

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
    return apiResponse.data;
  }
  return response as T;
}

export function useBlogLikes(blogId: number) {
  const queryClient = useQueryClient();
  const userIdentifier = typeof window !== "undefined" ? getUserIdentifier() : '';

  const { data: likeInfo, isLoading, error } = useQuery({
    queryKey: [...blogKeys.detail(blogId), "likes"],
    queryFn: async () => {
      if (!userIdentifier) {
        return { count: 0, liked: false };
      }
      
      try {
        const response = await apiClient.get<LikeInfo | ApiResponse<LikeInfo>>(
          `/blogs/${blogId}/likes`,
          {
            headers: {
              "X-User-Identifier": userIdentifier,
            },
          },
        );
        return extractData(response);
      } catch (error) {
        console.error("Error fetching like info:", error);
        return { count: 0, liked: false };
      } 
    },
    enabled: !!blogId && blogId > 0,
    retry: 1,
  });

  const toggleLikeMutation = useMutation({
    mutationFn: async () => {
      if (!userIdentifier) {
        throw new Error("User identifier is required");
      }

      const response = await apiClient.post<LikeInfo | ApiResponse<LikeInfo>>(
        `/blogs/${blogId}/likes`,
        { user_identifier: userIdentifier },
        {
          headers: {
            "X-User-Identifier": userIdentifier,
          },
        },
      );
      return extractData(response);
    },
    onMutate: async () => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [...blogKeys.detail(blogId), "likes"],
      });

      const previousLikeInfo = queryClient.getQueryData<LikeInfo>([
        ...blogKeys.detail(blogId),
        "likes",
      ]);

      if (previousLikeInfo) {
        queryClient.setQueryData<LikeInfo>(
          [...blogKeys.detail(blogId), "likes"],
          {
            count: previousLikeInfo.liked
              ? previousLikeInfo.count - 1
              : previousLikeInfo.count + 1,
            liked: !previousLikeInfo.liked,
          },
        );
      } else {
        queryClient.setQueryData<LikeInfo>(
          [...blogKeys.detail(blogId), "likes"],
          {
            count: 1,
            liked: true,
          },
        );
      }

      return { previousLikeInfo };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousLikeInfo) {
        queryClient.setQueryData<LikeInfo>(
          [...blogKeys.detail(blogId), "likes"],
          context.previousLikeInfo,
        );
      }
    },
    onSettled: () => {
      // Refetch
      queryClient.invalidateQueries({
        queryKey: [...blogKeys.detail(blogId), "likes"],
      });
    },
  });

  return {
    likeCount: likeInfo?.count ?? 0,
    isLiked: likeInfo?.liked ?? false,
    isLoading,
    toggleLike: () => {
      if (!userIdentifier) {
        console.warn("Cannot like: user identifier not available");
        return;
      } 
      toggleLikeMutation.mutate();
    },
    isToggling: toggleLikeMutation.isPending,
    error: error || toggleLikeMutation.error,
  };
}
