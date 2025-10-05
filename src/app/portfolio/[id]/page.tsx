"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import Image from "next/image";
import { use, useState } from "react";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="max-w-[1540px] mx-auto px-6 pb-24">
        <div className="py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="text-xl font-medium">Back</span>
          </button>
        </div>

        <div>
          <div>
            <div className="flex flex-row justify-center items-center">
              <div className="flex flex-col gap-4 w-1/2 mr-5">
                <div className="font-semibold leading-16">
                  <h1 className="text-5xl md:text-7xl">{project.title}</h1>
                  <p className="text-2xl">Institut Teknologi Bandung</p>
                </div>

                <div>
                  <p className="text-xl text-white/80 leading-7">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="w-1/2 flex justify-center">
                <div className="relative max-w-[700px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-contain rounded-xl"
                  />
                  <button 
                    className="absolute bottom-6 left-6 flex items-center gap-3 text-lg rounded-4xl px-4 py-2 bg-gradient-to-r from-[#7E67C1] to-[#FFB051] hover:scale-105 transition-transform shadow-[inset_2px_2px_10px_0px_rgba(255,255,255,0.7),inset_0px_0px_20px_0px_rgba(255,255,255,0.8)]"
                  >
                    Open Website
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mb-16">
              <Image
                src={"/portfolio/html.svg"}
                alt="HTML Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <Image
                src={"/portfolio/css.svg"}
                alt="CSS Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <Image
                src={"/portfolio/js.svg"}
                alt="JavaScript Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>

            <div className="space-y-4 mb-10">
              <h2 className="text-3xl font-semibold text-white">Preview</h2>
              
              <div className="relative">
                <div 
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4" 
                  id="preview-scroll"
                  onScroll={(e) => {
                    const container = e.currentTarget;
                    setCanScrollLeft(container.scrollLeft > 0);
                    setCanScrollRight(
                      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
                    );
                  }}
                >
                  {project.images.map((img, index) => (
                    <div key={index} className="flex-shrink-0 w-[432px] snap-center">
                      <div className="relative w-full h-[270px] rounded-xl overflow-hidden group cursor-pointer bg-gray-800">
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
                      const container = document.getElementById('preview-scroll');
                      if (container) container.scrollBy({ left: -450, behavior: 'smooth' });
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-white/80 backdrop-blur-sm text-black/80 p-3 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}
                
                {canScrollRight && (
                  <button
                    onClick={() => {
                      const container = document.getElementById('preview-scroll');
                      if (container) container.scrollBy({ left: 450, behavior: 'smooth' });
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-white/80 backdrop-blur-sm text-black/80 p-3 rounded-full transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <h3 className="text-2xl font-semibold text-white">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-6 py-4 rounded-3xl border-2 border-white/[0.12] bg-white/[0.02] text-transparent bg-clip-text bg-gradient-to-r from-[#FFB051] to-[#7E67C1] font-medium text-xl"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Testimonial</h3>
              <p className="text-white/60 text-lg">No review added yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
