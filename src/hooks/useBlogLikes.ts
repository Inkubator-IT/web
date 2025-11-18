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
  const userIdentifier = getUserIdentifier();

  const { data: likeInfo, isLoading } = useQuery({
    queryKey: [...blogKeys.detail(blogId), "likes"],
    queryFn: async () => {
      const response = await apiClient.get<LikeInfo | ApiResponse<LikeInfo>>(
        `/blogs/${blogId}/likes`,
        {
          headers: {
            "X-User-Identifier": userIdentifier,
          },
        },
      );
      return extractData(response);
    },
    enabled: !!blogId && blogId > 0 && !!userIdentifier,
  });

  const toggleLikeMutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post<LikeInfo | ApiResponse<LikeInfo>>(
        `/blogs/${blogId}/likes`,
        { userIdentifier: userIdentifier },
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
      queryClient.invalidateQueries({
        queryKey: blogKeys.detail(blogId),
      });
    },
  });

  return {
    likeCount: likeInfo?.count ?? 0,
    isLiked: likeInfo?.liked ?? false,
    isLoading,
    toggleLike: toggleLikeMutation.mutate,
    isToggling: toggleLikeMutation.isPending,
  };
}
