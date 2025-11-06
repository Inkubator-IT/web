"use client";

import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Share2,
  ThumbsUp,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { use } from "react";
import { useBlogBySlug } from "@/hooks/useBlogs";
import { renderTipTapContent } from "@/utils/renderTipTapContent";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const { data: blog, isLoading, error } = useBlogBySlug(slug);

  if (isLoading) {
    return (
      <div className="relative min-h-screen px-4 py-8 sm:px-8 sm:py-12 md:px-16 lg:px-22">
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="relative min-h-screen px-4 py-8 sm:px-8 sm:py-12 md:px-16 lg:px-22">
        <div className="mb-6 items-start sm:mb-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-white"
          >
            <ArrowLeft
              size={16}
              color="white"
              className="duration-300 group-hover:-translate-x-1"
            />
            Back
          </Link>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-red-400">Blog not found</p>
        </div>
      </div>
    );
  }

  if (!blog.thumbnail) {
    return (
      <div className="relative min-h-screen px-4 py-8 sm:px-8 sm:py-12 md:px-16 lg:px-22">
        <div className="mb-6 items-start sm:mb-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-white"
          >
            <ArrowLeft
              size={16}
              color="white"
              className="duration-300 group-hover:-translate-x-1"
            />
            Back
          </Link>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-red-400">Blog image is missing</p>
        </div>
      </div>
    );
  }

  const categoryName = blog.tag?.tag_name || "Uncategorized";
  const formattedDate = new Date(blog.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Get JSON-LD from API response
  const jsonLd = (blog as any).jsonLd;

  return (
    <>
      {/* Add JSON-LD Script Tag */}
      {jsonLd && (
        <Script
          id="blog-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      )}

      <div className="relative min-h-screen px-4 py-8 sm:px-8 sm:py-12 md:px-16 lg:px-22">
        {/* Back Button */}
        <div className="mb-6 items-start sm:mb-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-white"
          >
            <ArrowLeft
              size={16}
              color="white"
              className="duration-300 group-hover:-translate-x-1"
            />
            Back
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <div className="rounded-lg border border-white/20 bg-gradient-to-r from-[#7E67C1]/40 to-[#FFB051]/40 px-3 py-1 backdrop-blur-xl sm:px-4">
            <p className="text-xs text-white sm:text-sm">{categoryName}</p>
          </div>
          <h1 className="max-w-[520px] px-4 text-center text-2xl leading-tight font-bold text-white [text-shadow:_6px_2px_15px_rgba(255,255,255,0.8)] sm:text-3xl md:text-4xl">
            {blog.title}
          </h1>

          {/* Meta detail */}
          <div className="flex flex-row items-center justify-center gap-4 text-white sm:gap-8 md:gap-12">
            <div className="flex items-center gap-1">
              <User size={14} className="sm:h-4 sm:w-4" color="white" />
              <span className="text-xs font-extralight sm:text-sm">
                {blog.author}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays size={14} className="sm:h-4 sm:w-4" color="white" />
              <span className="text-xs font-extralight sm:text-sm">
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="sm:h-4 sm:w-4" color="white" />
              <span className="text-xs font-extralight sm:text-sm">
                {blog.time_read || "1"} Minutes Read
              </span>
            </div>
          </div>
        </div>

        {/* Func */}
        <div className="mt-8 flex flex-col sm:mt-10">
          <div className="flex items-center justify-end gap-2">
            <div className="flex gap-1">
              <button type="button">
                <ThumbsUp
                  size={14}
                  className="cursor-pointer sm:h-4 sm:w-4"
                  color="white"
                />
              </button>
              <span className="text-xs font-light text-white sm:text-sm">0</span>
            </div>
            <Share2 size={14} className="sm:h-4 sm:w-4" color="white" />
          </div>
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            width={1450}
            height={250}
            className="mt-4 h-auto w-full rounded-lg object-cover sm:mt-6"
          />
        </div>

        {/* Blog Content */}
        <div className="mt-8 max-w-none space-y-10 [word-spacing:0.1em] sm:mt-10">
          {renderTipTapContent(blog.content)}
        </div>
      </div>
    </>
  );
}