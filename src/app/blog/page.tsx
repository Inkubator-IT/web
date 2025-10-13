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
import { getAllBlogPosts } from "./[id]/blog-post";

// mock
const filterOptions = [
  { id: "trends", label: "Trends & Innovation" },
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
  { id: "design", label: "Design" },
  { id: "development", label: "Development" },
];

export default function Blog() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const allPosts = getAllBlogPosts();
  const blogPostPerPage = 4;
  const pageSlots = 5;

  // search func for filtering posts
  const filteredPosts = useMemo(() => {
    let filtered = allPosts;

    if (searchValue.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          post.snippet.toLowerCase().includes(searchValue.toLowerCase()) ||
          post.author.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    return filtered;
  }, [allPosts, searchValue]);

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
    <div className="relative px-4 sm:px-8 md:px-16 lg:px-22 py-8 sm:py-12 min-h-screen overflow-x-hidden">
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold word-spacing-tight bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text text-transparent p-2">
            Blog
          </h1>
          <p className="text-base sm:text-lg text-white font-light max-w-[700px] text-center px-2 sm:px-4">
            Discover articles and resources designed to inspire, educate, and
            guide businesses in embracing digital transformation.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-[calc(100vw-2rem)] sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mt-6 sm:mt-8">
            <SearchBar
              placeholder="Search for articles"
              value={searchValue}
              onChange={setSearchValue}
              filter={true}
              onFilterChange={setSelectedFilters}
              selectedFilters={selectedFilters}
              filterOptions={filterOptions}
            />
          </div>
        </div>

        {/* Blog Post */}
        <div className="flex flex-col gap-8 items-start w-full">
          {visiblePosts.map((blog) => (
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
          {visiblePosts.length === 0 && (
            <div className="flex items-center justify-center h-[100px] w-full">
              <p className="text-white/40">No result.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8 sm:mt-10 flex-wrap">
          {/* First/Previous buttons */}
          <button
            type="button"
            onClick={goFirst}
            disabled={!canPrev}
            className="sm:flex cursor-pointer p-2 sm:p-3 rounded-md border border-white/40 bg-white/10 text-white disabled:opacity-40 hover:bg-white/20"
            aria-label="First page"
            title="First page"
          >
            <ChevronsLeft size={16} color="white" />
          </button>
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            className="cursor-pointer p-2 sm:p-3 rounded-md border border-white/40 bg-white/10 text-white disabled:opacity-40 hover:bg-white/20"
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
                  className="px-2 sm:px-4 py-1 sm:py-2 tracking-wider rounded-md border border-white/40 bg-white/10 text-white select-none text-sm sm:text-base"
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
                    "py-1 sm:py-2 w-[32px] sm:w-[40px] text-center cursor-pointer rounded-md border border-white/40 text-white bg-white/10 font-semibold disabled:opacity-80 hover:bg-white/20 transition-all duration-500 text-sm sm:text-base",
                    active
                      ? "bg-gradient-to-r from-[#7E67C1]/40 to-[#FFB051]/40 border-none"
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
            className="cursor-pointer p-2 sm:p-3 rounded-md border border-white/40 bg-white/10 text-white disabled:opacity-40 hover:bg-white/20"
            aria-label="Next page"
            title="Next page"
          >
            <ChevronRight size={16} color="white" />
          </button>
          <button
            type="button"
            onClick={goLast}
            disabled={!canNext}
            className="sm:flex cursor-pointer p-2 sm:p-3 rounded-md border border-white/40 bg-white/10 text-white disabled:opacity-40 hover:bg-white/20"
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
