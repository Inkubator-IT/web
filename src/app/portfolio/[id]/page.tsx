"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import Image from "next/image";
import { use, useState } from "react";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div
      className="min-h-screen bg-black tracking-[-0.06em] leading-7 text-white"
      style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="max-w-[1540px] mx-auto px-4 md:px-6 pb-12 md:pb-24">
        <div className="py-6 md:py-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 hover:text-white/80 transition-colors">
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-lg md:text-xl font-medium">Back</span>
          </button>
        </div>

        <div>
          <div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-0">
              <div className="w-full md:w-1/2 md:hidden flex justify-center">
                <div className="relative w-full max-w-[500px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-contain rounded-xl md:rounded-2xl w-full"
                  />
                  <button className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-2 md:gap-3 text-sm md:text-lg rounded-full md:rounded-4xl px-4 py-2 bg-gradient-to-r from-[#7E67C1] to-[#FFB051] hover:scale-105 transition-transform shadow-[inset_2px_2px_10px_0px_rgba(255,255,255,0.7),inset_0px_0px_20px_0px_rgba(255,255,255,0.8)]">
                    Open Website
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full md:w-1/2 md:mr-5">
                <div className="font-semibold leading-tight md:leading-16">
                  <h1 className="text-3xl md:text-5xl lg:text-7xl">{project.title}</h1>
                  <p className="text-base md:text-2xl text-white/60 mt-1">Institut Teknologi Bandung</p>
                </div>

                <div>
                  <p className="text-sm md:text-xl text-white/80 leading-relaxed md:leading-7">{project.description}</p>
                </div>
              </div>

              <div className="hidden md:flex w-1/2 justify-center">
                <div className="relative max-w-[700px]">
                  <Image src={project.image} alt={project.title} width={600} height={400} className="object-contain rounded-xl" />
                  <button className="absolute bottom-6 left-6 flex items-center gap-3 text-lg rounded-4xl px-4 py-2 bg-gradient-to-r from-[#7E67C1] to-[#FFB051] hover:scale-105 transition-transform shadow-[inset_2px_2px_10px_0px_rgba(255,255,255,0.7),inset_0px_0px_20px_0px_rgba(255,255,255,0.8)]">
                    Open Website
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4 mb-10 md:mb-16 mt-6">
              <Image
                src={"/portfolio/html.svg"}
                alt="HTML Logo"
                width={40}
                height={40}
                className="object-contain w-8 h-8 md:w-10 md:h-10"
              />
              <Image
                src={"/portfolio/css.svg"}
                alt="CSS Logo"
                width={40}
                height={40}
                className="object-contain w-8 h-8 md:w-10 md:h-10"
              />
              <Image
                src={"/portfolio/js.svg"}
                alt="JavaScript Logo"
                width={40}
                height={40}
                className="object-contain w-8 h-8 md:w-10 md:h-10"
              />
            </div>

            <div className="space-y-4 mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-white">Preview</h2>

              <div className="relative">
                <div
                  className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
                  id="preview-scroll"
                  onScroll={(e) => {
                    const container = e.currentTarget;
                    setCanScrollLeft(container.scrollLeft > 0);
                    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
                  }}>
                  {project.images.map((img, index) => (
                    <div key={index} className="flex-shrink-0 w-[280px] md:w-[432px] snap-center">
                      <div className="relative w-full h-[175px] md:h-[270px] rounded-xl overflow-hidden group cursor-pointer bg-gray-800">
                        <img
                          src={img}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {canScrollLeft && (
                  <button
                    onClick={() => {
                      const container = document.getElementById("preview-scroll");
                      if (container) container.scrollBy({ left: -300, behavior: "smooth" });
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-white/80 backdrop-blur-sm text-black/80 p-2 md:p-3 rounded-full transition-all">
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                )}

                {canScrollRight && (
                  <button
                    onClick={() => {
                      const container = document.getElementById("preview-scroll");
                      if (container) container.scrollBy({ left: 300, behavior: "smooth" });
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-white/80 backdrop-blur-sm text-black/80 p-2 md:p-3 rounded-full transition-all">
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <h3 className="text-2xl md:text-3xl font-semibold text-white">Tags</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 md:px-6 md:py-4 rounded-full md:rounded-3xl font-medium text-sm md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFB051] to-[#7E67C1] border border-white/[0.12] bg-white/[0.02]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-white">Testimonial</h3>
              <p className="text-white/60 text-sm md:text-lg">No review added yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
