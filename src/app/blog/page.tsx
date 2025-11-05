"use client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useMemo, useState } from "react";
import BlogCard from "@/components/blogs/blog-card";
import SearchBar from "@/components/search-bar";
import { cn } from "@/lib/utils";
import { useBlogs } from "@/hooks/useBlogs";
import { useTags } from "@/hooks/useTags";

const generateSnippet = (content: any, maxLength: number = 200): string => {
  try {
    // Handle TipTap JSON format
    if (content && typeof content === "object" && "type" in content && content.type === "doc") {
      // Extract text from TipTap JSON
      const extractText = (node: any): string => {
        if (node.text) return node.text;
        if (node.content && Array.isArray(node.content)) {
          return node.content.map(extractText).join(" ");
        }
        return "";
      };
      
      const plainText = content.content
        ? content.content.map(extractText).join(" ").trim()
        : "";
      
      return plainText.length > maxLength
        ? `${plainText.substring(0, maxLength)}...`
        : plainText;
    }
    
    if (Array.isArray(content)) {
      const plainText = content
        .filter((block) => block.type === "paragraph")
        .map((block) => block.text)
        .join(" ");
      return plainText.length > maxLength
        ? `${plainText.substring(0, maxLength)}...`
        : plainText;
    }
    
    // Fallback for string content
    if (typeof content === "string") {
      return content.length > maxLength
        ? `${content.substring(0, maxLength)}...`
        : content;
    }
    
    return "";
  } catch {
    return "";
  }
};

export default function Blog() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { data: blogs = [], isLoading: blogsLoading, error: blogsError } = useBlogs();
  const { data: tags = [], isLoading: tagsLoading, error: tagsError } = useTags();

  const isLoading = blogsLoading || tagsLoading;
  const error = blogsError || tagsError;

  const blogPostPerPage = 4;
  const pageSlots = 5;

  // Convert blogs to display format
  const allPosts = useMemo(() => {
    return blogs.map((blog) => ({
      id: blog.slug, // Use slug as ID for routing
      title: blog.title,
      snippet: blog.excerpt || generateSnippet(blog.content),
      category: blog.tag?.tag_name || "Uncategorized",
      tagId: blog.tag?.tag_id?.toString() || "",
      author: blog.author,
      date: new Date(blog.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      timeRead: blog.time_read || "1",
      image: blog.thumbnail || "/preview.png",
    }));
  }, [blogs]);

  // search func for filtering posts
  const filteredPosts = useMemo(() => {
    let filtered = allPosts;

    // Filter by selected tags
    if (selectedFilters.length > 0) {
      filtered = filtered.filter((post) =>
        selectedFilters.includes(post.tagId)
      );
    }

    // Filter by search value
    if (searchValue.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          post.snippet.toLowerCase().includes(searchValue.toLowerCase()) ||
          post.author.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    return filtered;
  }, [allPosts, searchValue, selectedFilters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / blogPostPerPage),
  );

  const visiblePosts = useMemo(() => {
    const start = (currentPage - 1) * blogPostPerPage;
    return filteredPosts.slice(start, start + blogPostPerPage);
  }, [filteredPosts, currentPage]);

  type PageItem = number | "...";
  const getPaginationItems = (current: number, total: number): PageItem[] => {
    if (total <= pageSlots) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
      return [1, 2, 3, "...", total];
    }

    if (current >= total - 2) {
      return [1, "...", total - 2, total - 1, total];
    }

    return [current - 1, current, current + 1, "...", total];
  };

  const pageItems = getPaginationItems(currentPage, totalPages);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const goFirst = () => setCurrentPage(1);
  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goLast = () => setCurrentPage(totalPages);

  return (
    <div className="relative min-h-screen overflow-x-hidden px-4 py-8 sm:px-8 sm:py-12 md:px-16 lg:px-22">
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="word-spacing-tight bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text p-2 text-4xl font-semibold text-transparent sm:text-5xl md:text-6xl">
            Blog
          </h1>
          <p className="max-w-[700px] px-2 text-center text-base font-light text-white sm:px-4 sm:text-lg">
            Discover articles and resources designed to inspire, educate, and
            guide businesses in embracing digital transformation.
          </p>

          {/* Search Bar */}
          <div className="mt-6 w-full max-w-[calc(100vw-2rem)] sm:mt-8 sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
            <SearchBar
              placeholder="Search for articles"
              value={searchValue}
              onChange={setSearchValue}
              filter={true}
              onFilterChange={setSelectedFilters}
              selectedFilters={selectedFilters}
              filterOptions={tags?.map((tag) => ({
                id: tag.tag_id.toString(),
                label: tag.tag_name,
              }))}
            />
          </div>
        </div>

        {/* Blog Post */}
        <div className="flex w-full flex-col items-start gap-8">
          {isLoading && (
            <div className="flex w-full items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
            </div>
          )}
          {error && (
            <div className="flex h-[100px] w-full items-center justify-center">
              <p className="text-red-400">
                Failed to load blogs. Please try again later.
              </p>
            </div>
          )}
          {!isLoading &&
            !error &&
            visiblePosts.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                snippet={blog.snippet}
                category={blog.category}
                author={blog.author}
                date={blog.date}
                timeRead={blog.timeRead}
                image={blog.image}
              />
            ))}
          {!isLoading && !error && visiblePosts.length === 0 && (
            <div className="flex h-[100px] w-full items-center justify-center">
              <p className="text-white/40">No result.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-1 sm:mt-10 sm:gap-2">
          {/* First/Previous buttons */}
          <button
            type="button"
            onClick={goFirst}
            disabled={!canPrev}
            className="cursor-pointer rounded-md border border-white/40 bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-40 sm:flex sm:p-3"
            aria-label="First page"
            title="First page"
          >
            <ChevronsLeft size={16} color="white" />
          </button>
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            className="cursor-pointer rounded-md border border-white/40 bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-40 sm:p-3"
            aria-label="Previous page"
            title="Previous page"
          >
            <ChevronLeft size={16} color="white" />
          </button>

          {/* Page numbers */}
          {pageItems.map((item) => {
            if (item === "...") {
              return (
                <span
                  key={item}
                  className="rounded-md border border-white/40 bg-white/10 px-2 py-1 text-sm tracking-wider text-white select-none sm:px-4 sm:py-2 sm:text-base"
                >
                  ...
                </span>
              );
            } else {
              const active = item === currentPage;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCurrentPage(item)}
                  disabled={active}
                  className={cn(
                    "w-[32px] cursor-pointer rounded-md border border-white/40 bg-white/10 py-1 text-center text-sm font-semibold text-white transition-all duration-500 hover:bg-white/20 disabled:opacity-80 sm:w-[40px] sm:py-2 sm:text-base",
                    active
                      ? "border-none bg-gradient-to-r from-[#7E67C1]/40 to-[#FFB051]/40"
                      : "",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item}
                </button>
              );
            }
          })}

          {/* Next/Last buttons */}
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            className="cursor-pointer rounded-md border border-white/40 bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-40 sm:p-3"
            aria-label="Next page"
            title="Next page"
          >
            <ChevronRight size={16} color="white" />
          </button>
          <button
            type="button"
            onClick={goLast}
            disabled={!canNext}
            className="cursor-pointer rounded-md border border-white/40 bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-40 sm:flex sm:p-3"
            aria-label="Last page"
            title="Last page"
          >
            <ChevronsRight size={16} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
