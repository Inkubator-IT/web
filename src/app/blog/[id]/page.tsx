// 'use client';

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
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostById } from "./blog-post";
import ContentRenderer from "./content-renderer";

// import { useState } from 'react';

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  // const [likeCount, setLikeCount] = useState(0);
  const resolvedParams = await params;
  const blog = getBlogPostById(resolvedParams.id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="relative px-4 sm:px-8 md:px-16 lg:px-22 min-h-screen py-8 sm:py-12">
      {/* Back Button */}
      <div className="items-start mb-6 sm:mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white group"
        >
          <ArrowLeft
            size={16}
            color="white"
            className="group-hover:-translate-x-1 duration-300"
          />
          Back
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="backdrop-blur-xl bg-gradient-to-r from-[#7E67C1]/40 to-[#FFB051]/40 rounded-lg border border-white/20 px-3 sm:px-4 py-1">
          <p className="text-white text-xs sm:text-sm">{blog.category}</p>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center max-w-[520px] text-white leading-tight [text-shadow:_6px_2px_15px_rgba(255,255,255,0.8)] px-4">
          {blog.title}
        </h1>

        {/* Meta detail */}
        <div className="flex flex-row justify-center items-center gap-4 sm:gap-8 md:gap-12 text-white">
          <div className="flex gap-1 items-center">
            <User size={14} className="sm:w-4 sm:h-4" color="white" />
            <span className="text-xs sm:text-sm font-extralight">
              {blog.author}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <CalendarDays size={14} className="sm:w-4 sm:h-4" color="white" />
            <span className="text-xs sm:text-sm font-extralight">
              {blog.date}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <Clock size={14} className="sm:w-4 sm:h-4" color="white" />
            <span className="text-xs sm:text-sm font-extralight">
              {blog.timeRead}
            </span>
          </div>
        </div>
      </div>

      {/* Func */}
      <div className="flex flex-col mt-8 sm:mt-10">
        <div className="flex gap-2 justify-end items-center">
          <div className="flex gap-1">
            <button type="button">
              <ThumbsUp
                size={14}
                className="cursor-pointer sm:w-4 sm:h-4"
                color="white"
              />
            </button>
            <span className="text-white font-light text-xs sm:text-sm">0</span>
          </div>
          <Share2 size={14} className="sm:w-4 sm:h-4" color="white" />
        </div>
        <Image
          src={blog.image || "https://placehold.co/1450x400"}
          alt={blog.title}
          width={1450}
          height={250}
          className="mt-4 sm:mt-6 rounded-lg w-full h-auto object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="mt-8 sm:mt-10 max-w-none [word-spacing:0.1em]">
        <ContentRenderer content={blog.content} />
      </div>
    </div>
  );
}
