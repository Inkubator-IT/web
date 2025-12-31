import { Suspense } from "react";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { fetchBlogBySlug, fetchBlogs } from "@/lib/api";
import { renderTipTapContent } from "@/utils/renderTipTapContent";
import { BlogActions } from "@/components/blogs/blog-actions";
import BlogDetailSkeleton from "@/components/blogs/blog-detail-skeleton";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const blogs = await fetchBlogs();
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

async function BlogDetailContent({ slug }: { slug: string }) {
  await new Promise(resolve => setTimeout(resolve, 2000)); // delay
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    notFound();
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

  const jsonLd = (blog as any).jsonLd;

  return (
    <>
      {jsonLd && (
        <Script
          id="blog-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      )}

      <div className="fixed inset-0 bg-black/8wqk0 -z-10" />

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

        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <div className="rounded-lg border border-white/20 bg-linear-to-r from-[#7E67C1]/40 to-[#FFB051]/40 px-3 py-1 backdrop-blur-xl sm:px-4">
            <p className="text-xs text-white sm:text-sm">{categoryName}</p>
          </div>
          <h1 className="max-w-[520px] px-4 text-center text-2xl leading-tight font-bold text-white [text-shadow:6px_2px_15px_rgba(255,255,255,0.8)] sm:text-3xl md:text-4xl">
            {blog.title}
          </h1>

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

        <div className="mt-8 flex flex-col sm:mt-10">
          <BlogActions blogId={blog.id} />
          <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg sm:mt-6">
            <ExportedImage
              src={blog.thumbnail}
              alt={blog.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
        </div>

        <div className="mt-8 max-w-none space-y-10 [word-spacing:0.1em] sm:mt-10">
          {renderTipTapContent(blog.content)}
        </div>
      </div>
    </>
  );
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<BlogDetailSkeleton />}>
      <BlogDetailContent slug={slug} />
    </Suspense>
  );
}
