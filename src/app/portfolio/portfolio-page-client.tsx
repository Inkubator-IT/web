"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import ProjectCard from "@/components/portfolio/ProjectCard";
import type { Project } from "@/types/project";

interface PortfolioPageClientProps {
  projects: Project[];
}

const scopeOptions = ["All", "External", "Internal"] as const;
const categoryOptions = ["all", "web", "app", "games", "ai"] as const;

export default function PortfolioPageClient({
  projects,
}: PortfolioPageClientProps) {
  const [activeScope, setActiveScope] =
    useState<(typeof scopeOptions)[number]>("All");
  const [activeCategory, setActiveCategory] =
    useState<(typeof categoryOptions)[number]>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 6;

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    [projects],
  );

  const displayProjects = useMemo(() => {
    return projects.filter((project) => {
      if (
        activeScope !== "All" &&
        project.scope.toLowerCase() !== activeScope.toLowerCase()
      ) {
        return false;
      }

      if (
        activeCategory !== "all" &&
        project.category.toLowerCase() !== activeCategory.toLowerCase()
      ) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const haystack =
          `${project.title} ${project.description} ${project.owner}`.toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [projects, activeScope, activeCategory, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(displayProjects.length / projectsPerPage),
  );

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    return displayProjects.slice(startIndex, startIndex + projectsPerPage);
  }, [displayProjects, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const projectsSection = document.getElementById("projects-section");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeScope, activeCategory, searchQuery]);

  return (
    <div
      className="min-h-screen bg-black"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <section className="relative px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text text-4xl leading-tight font-semibold tracking-[-0.06em] text-transparent md:mb-6 md:text-6xl md:leading-16 lg:text-[100px] lg:leading-20">
            Portfolio
          </h1>
          <p className="mb-6 px-4 text-sm leading-relaxed tracking-[-0.06em] text-white md:mb-8 md:text-2xl md:leading-9">
            Every project is a story of collaboration and Impact
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div
          className="mx-auto overflow-hidden"
          onMouseEnter={(e) => {
            const scrollElement = e.currentTarget.querySelector(".animate-scroll-left");
            if (scrollElement && scrollElement instanceof HTMLElement) {
              scrollElement.style.animationPlayState = "paused";
            }
          }}
          onMouseLeave={(e) => {
            const scrollElement = e.currentTarget.querySelector(".animate-scroll-left");
            if (scrollElement && scrollElement instanceof HTMLElement) {
              scrollElement.style.animationPlayState = "running";
            }
          }}
        >
          {featuredProjects.length === 0 ? (
            <div className="text-center text-white/70">
              No featured projects yet.
            </div>
          ) : (
            <div className="animate-scroll-left flex gap-4 md:gap-6">
              {[...featuredProjects, ...featuredProjects].map(
                (project, index) => (
                  <div
                    key={`${project.id}-${index}`}
                    className="w-[280px] flex-shrink-0 md:w-[432px]"
                  >
                    <Link href={`/portfolio/${project.id}`}>
                      <div className="group relative h-[175px] w-full cursor-pointer overflow-hidden rounded-xl md:h-[270px]">
                        <img
                          src={project.thumbnail || "/portfolio/image.png"}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </Link>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </section>

      <section
        id="projects-section"
        className="px-4 py-8 sm:px-6 md:py-12 lg:px-8"
      >
        <div className="mx-auto max-w-[1540px]">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="text-2xl leading-tight font-medium tracking-[-0.06em] text-white md:text-4xl md:leading-20 lg:text-6xl">
              Featured Project
            </h2>
            <p className="mt-2 text-sm leading-relaxed tracking-[-0.06em] text-white/80 md:text-xl md:leading-7 lg:text-[26px]">
              Showcasing our latest work and successful client partnerships
            </p>
          </div>

          <div className="mx-auto mb-8 max-w-4xl md:mb-10">
            <div className="relative">
              <div className="h-12 w-full rounded-3xl bg-gradient-to-r from-[#7E67C1] via-black to-[#FFB051] p-0.5 shadow-[0_0_20px_rgba(126,103,193,0.5),0_0_40px_rgba(255,176,81,0.3)] md:h-16 md:rounded-4xl">
                <div className="flex h-full w-full items-center rounded-3xl bg-black px-4 md:rounded-4xl md:px-8">
                  <Search className="mr-3 h-4 w-4 text-white md:mr-4 md:h-6 md:w-6" />
                  <input
                    type="text"
                    placeholder="Search for project"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/60 outline-none md:text-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mb-8 max-w-[1280px] md:mb-10">
            <div className="relative mb-6 flex md:mb-10">
              <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-gray-800"></div>

              {scopeOptions.map((scope) => (
                <button
                  key={scope}
                  onClick={() => setActiveScope(scope)}
                  className={`relative flex-1 px-2 py-3 text-center text-lg leading-5 font-semibold tracking-[-0.06em] transition-colors duration-300 md:px-3 md:py-5 md:text-[30px] ${
                    activeScope === scope ? "text-white" : "text-white/50"
                  }`}
                >
                  {scope}
                  {activeScope === scope && (
                    <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#7E67C1] to-[#FFB051] md:h-[3px]"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="mx-auto max-w-[778px]">
              <div className="h-[54px] rounded-xl bg-gradient-to-r from-[#7E67C1]/70 via-[#D2CEDD]/70 to-[#FFB051]/70 p-0.5 md:h-[74px]">
                <div className="h-full w-full rounded-xl bg-black">
                  <div className="h-full w-full rounded-xl bg-[#FFB05140] shadow-[0px_1.2px_29.92px_0px_#FFB05140,inset_8px_8px_25px_0px_#7E67C166] backdrop-blur-[70px]">
                    <div className="flex h-full overflow-hidden rounded-[10px]">
                      {categoryOptions.map((category, index) => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`flex flex-1 items-center justify-center text-base leading-5 font-semibold tracking-[-0.06em] transition-all md:text-[28px] ${
                            index === 0 ? "rounded-l-[10px]" : ""
                          } ${
                            index === categoryOptions.length - 1
                              ? "rounded-r-[10px]"
                              : "border-r-2 border-[#BABABA]"
                          } ${
                            activeCategory === category
                              ? "bg-black/50 text-white shadow-[0px_1.2px_29.92px_0px_#FFB05140,inset_8px_8px_25px_0px_#7E67C166] backdrop-blur-[70px]"
                              : "bg-black text-[#777777]"
                          }`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 place-items-center gap-4 px-2 md:mb-12 md:gap-6 md:px-0 lg:grid-cols-2 lg:gap-8">
            {paginatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {paginatedProjects.length === 0 && (
            <div className="py-8 text-center text-white/60 md:py-12">
              No projects found matching your criteria.
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 md:gap-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#CFCFCF] bg-white/20 text-white transition-all hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50 md:h-14 md:w-14 md:rounded-2xl"
              >
                <ChevronsLeft className="h-5 w-5 md:h-7 md:w-7" />
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#CFCFCF] bg-white/20 text-white transition-all hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50 md:h-14 md:w-14 md:rounded-2xl"
              >
                <ChevronLeft className="h-5 w-5 md:h-7 md:w-7" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-semibold text-white transition-all md:h-14 md:w-14 md:rounded-2xl md:text-2xl ${
                      currentPage === page
                        ? "bg-gradient-to-r from-[#7E67C1] to-[#FFB051]"
                        : "border-2 border-[#CFCFCF] bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#CFCFCF] bg-white/20 text-white transition-all hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50 md:h-14 md:w-14 md:rounded-2xl"
              >
                <ChevronRight className="h-5 w-5 md:h-7 md:w-7" />
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#CFCFCF] bg-white/20 text-white transition-all hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50 md:h-14 md:w-14 md:rounded-2xl"
              >
                <ChevronsRight className="h-5 w-5 md:h-7 md:w-7" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
