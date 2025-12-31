import { Suspense } from "react";
import BlogPageClient from "./blog-page-client";
import BlogCardSkeleton from "@/components/blogs/blog-card-skeleton";
import { fetchBlogs, fetchTags } from "@/lib/api";

async function BlogContent() {
  await new Promise(resolve => setTimeout(resolve, 2000)); // delay
  const [blogs, tags] = await Promise.all([fetchBlogs(), fetchTags()]);
  return <BlogPageClient blogs={blogs} tags={tags} isLoading={false} />;
}

function BlogSkeleton() {
  return (
    <div className="relative min-h-screen overflow-x-hidden px-4 py-8 sm:px-8 sm:py-12 md:px-16 lg:px-22">
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="word-spacing-tight bg-linear-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text p-2 text-4xl font-semibold text-transparent sm:text-5xl md:text-6xl">
            Blog
          </h1>
          <p className="max-w-[700px] px-2 text-center text-base font-light text-white sm:px-4 sm:text-lg">
            Discover articles and resources designed to inspire, educate, and
            guide businesses in embracing digital transformation.
          </p>
        </div>
        <div className="mt-6 flex w-full flex-col items-start gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogContent />
    </Suspense>
  );
}
