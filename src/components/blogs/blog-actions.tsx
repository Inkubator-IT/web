"use client";

import { Share2, ThumbsUp } from "lucide-react";
import { useBlogLikes } from "@/hooks/useBlogLikes";
import { cn } from "@/lib/utils";
import { ShareModal } from "@/components/blogs/share-modal";

interface BlogActionsProps {
  blogId: number;
}

export function BlogActions({ blogId }: BlogActionsProps) {
  const { likeCount, isLiked, toggleLike, isToggling } = useBlogLikes(blogId);

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => toggleLike()}
          disabled={isToggling}
          className={cn(
            "flex items-center gap-1 transition-all duration-300",
            isLiked ? "text-[#ffb051]" : "text-white hover:text-[ffb051]",
            isToggling && "opacity-50 cursor-not-allowed",
          )}
        >
          <ThumbsUp
            size={14}
            className={cn(
              "cursor-pointer sm:h-4 sm:w-4 transition-transform",
              isLiked && "fill-current",
            )}
            color="currentColor"
          />
        </button>
        <span className="text-xs font-light text-white sm:text-sm">
          {isNaN(likeCount) ? 0 : likeCount}
        </span>
      </div>
      <ShareModal
        trigger={
          <span className="rounded-md p-2 text-white transition hover:bg-white/10">
            <Share2 size={14} className="sm:h-4 sm:w-4" />
          </span>
        }
      />
    </div>
  );
}
