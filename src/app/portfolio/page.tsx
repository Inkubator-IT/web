"use client";

import { useState } from "react";
import { Search, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from "lucide-react";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { projects, featuredProjects } from "@/data/projects";

export default function PortfolioPage() {
  const [activeScope, setActiveScope] = useState("All");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const displayProjects = projects;
  const projectsPerPage = 6;
  const totalPages = Math.ceil(displayProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const paginatedProjects = displayProjects.slice(startIndex, startIndex + projectsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const projectsSection = document.getElementById("projects-section");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-[100px] font-semibold leading-tight md:leading-16 lg:leading-20 tracking-[-0.06em] bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text text-transparent mb-4 md:mb-6">
            Portfolio
          </h1>
          <p className="text-sm md:text-2xl text-white mb-6 md:mb-8 leading-relaxed md:leading-9 tracking-[-0.06em] px-4">
            Every project is a story of collaboration and Impact
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto overflow-hidden">
          <div className="flex gap-4 md:gap-6 animate-scroll-left">
            {[...featuredProjects, ...featuredProjects].map((project, index) => (
              <div key={`${project.id}-${index}`} className="flex-shrink-0 w-[280px] md:w-[432px]">
                <div className="relative w-full h-[175px] md:h-[270px] rounded-xl overflow-hidden group cursor-pointer">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects-section" className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1540px] mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-medium text-white tracking-[-0.06em] leading-tight md:leading-20">
              Featured Project
            </h2>
            <p className="text-sm md:text-xl lg:text-[26px] text-white/80 tracking-[-0.06em] leading-relaxed md:leading-7 mt-2">
              Showcasing our latest work and successful client partnerships
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8 md:mb-10">
            <div className="relative">
              <div className="w-full h-12 md:h-16 rounded-3xl md:rounded-4xl p-0.5 bg-gradient-to-r from-[#7E67C1] via-black to-[#FFB051] shadow-[0_0_20px_rgba(126,103,193,0.5),0_0_40px_rgba(255,176,81,0.3)]">
                <div className="w-full h-full rounded-3xl md:rounded-4xl bg-black flex items-center px-4 md:px-8">
                  <Search className="w-4 h-4 md:w-6 md:h-6 text-white mr-3 md:mr-4" />
                  <input
                    type="text"
                    placeholder="Search for project"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-white/60 text-sm md:text-lg outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[1280px] mx-auto mb-8 md:mb-10">
            <div className="flex relative mb-6 md:mb-10">
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-800"></div>

              {["All", "External", "Internal"].map((scope) => (
                <button
                  key={scope}
                  onClick={() => setActiveScope(scope)}
                  className={`flex-1 px-2 md:px-3 py-3 md:py-5 text-center font-semibold text-lg md:text-[30px] tracking-[-0.06em] leading-5 relative transition-colors duration-300 ${
                    activeScope === scope ? "text-white" : "text-white/50"
                  }`}>
                  {scope}
                  {activeScope === scope && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] md:h-[3px] bg-gradient-to-r from-[#7E67C1] to-[#FFB051]"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="max-w-[778px] mx-auto">
              <div className="h-[54px] md:h-[74px] rounded-xl p-0.5 bg-gradient-to-r from-[#7E67C1]/70 via-[#D2CEDD]/70 to-[#FFB051]/70">
                <div className="bg-black h-full w-full rounded-xl">
                  <div className="bg-[#FFB05140] h-full w-full rounded-xl backdrop-blur-[70px] shadow-[0px_1.2px_29.92px_0px_#FFB05140,inset_8px_8px_25px_0px_#7E67C166]">
                    <div className="flex h-full rounded-[10px] overflow-hidden">
                      {["all", "web", "app", "games", "ai"].map((category, index) => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`flex-1 flex items-center justify-center font-semibold text-base md:text-[28px] tracking-[-0.06em] leading-5 transition-all ${
                            index === 0 ? "rounded-l-[10px]" : ""
                          } ${index === 4 ? "rounded-r-[10px]" : "border-r-2 border-[#BABABA]"} ${
                            activeCategory === category
                              ? "text-white backdrop-blur-[70px] bg-black/50 shadow-[0px_1.2px_29.92px_0px_#FFB05140,inset_8px_8px_25px_0px_#7E67C166]"
                              : "text-[#777777] bg-black"
                          }`}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12 place-items-center px-2 md:px-0">
            {paginatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {paginatedProjects.length === 0 && (
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-400 text-sm md:text-lg">No projects found matching your criteria.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-1.5 md:gap-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl border-2 border-[#CFCFCF] bg-white/20 flex items-center justify-center text-white hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <ChevronsLeft className="w-5 h-5 md:w-7 md:h-7" />
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl border-2 border-[#CFCFCF] bg-white/20 flex items-center justify-center text-white hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-semibold text-lg md:text-2xl transition-all ${
                    currentPage === page
                      ? "bg-gradient-to-r from-[#7E67C1] to-[#FFB051]"
                      : "border-2 border-[#CFCFCF] bg-white/20 hover:bg-white/30"
                  }`}>
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl border-2 border-[#CFCFCF] bg-white/20 flex items-center justify-center text-white hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl border-2 border-[#CFCFCF] bg-white/20 flex items-center justify-center text-white hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <ChevronsRight className="w-5 h-5 md:w-7 md:h-7" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
