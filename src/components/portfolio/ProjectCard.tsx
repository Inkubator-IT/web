"use client";

import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

interface Project {
  id: string | number;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
}

// Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="absolute inset-0 z-20 flex-shrink-0 overflow-hidden">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
    </div>
  );
}

// Device Mockup Wrapper for standardized thumbnails
function DeviceMockupWrapper({
  children,
  deviceType = "laptop",
}: {
  children: React.ReactNode;
  deviceType?: "laptop" | "phone" | "tablet";
}) {
  if (deviceType === "phone") {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className="relative rounded-3xl border-[10px] border-gray-900 bg-gray-950 shadow-2xl"
          style={{ width: "55%", height: "90%", aspectRatio: "9/16" }}
        >
          <div className="absolute top-2 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-gray-950" />
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
            {children}
          </div>
        </div>
      </div>
    );
  } else if (deviceType === "tablet") {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="relative h-[88%] w-[85%] overflow-hidden rounded-2xl border-[12px] border-gray-800 bg-gray-950 shadow-lg">
          {children}
        </div>
      </div>
    );
  }

  // Default Laptop
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="relative h-[85%] w-[90%] overflow-hidden rounded-t-xl border-t-4 border-r-4 border-l-4 border-gray-800 bg-gray-950 shadow-lg">
        {children}
      </div>
      <div className="absolute bottom-0 left-1/2 h-1.5 w-2/3 -translate-x-1/2 rounded-b-sm bg-gray-800" />
    </div>
  );
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
   const [isLoading, setIsLoading] = useState(true);

   // Handle null or missing thumbnail
   const thumbnail = project.thumbnail || "/portfolio/image.png";

   const getDeviceType = () => {
     const category = project.category.toLowerCase();
     if (category === "app" || category === "mobile") return "phone";
     if (category === "games") return "laptop";
     return "laptop";
   };

  return (
    <Link
      href={`/portfolio/${project.id}`}
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:scale-[1.02]",
        "h-auto w-full max-w-4xl rounded-2xl md:h-[579px] md:rounded-3xl",
        "border border-white/[0.4] bg-white/[0.1] backdrop-blur",
        "flex cursor-pointer flex-col",
        className
      )}
    >
      <div className="relative h-[180px] w-full flex-shrink-0 overflow-hidden bg-gray-950 md:h-[240px] lg:h-[339px]">
        {/* Skeleton Loader */}
        {isLoading && <SkeletonLoader />}

        {/* Device Mockup Wrapper */}
        <div className={cn("relative h-full w-full", isLoading ? "invisible" : "visible")}>
          <DeviceMockupWrapper deviceType={getDeviceType()}>
            <ExportedImage
              src={thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              priority={false}
              onLoad={() => setIsLoading(false)}
            />
          </DeviceMockupWrapper>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 right-2 z-10 md:top-4 md:right-4">
          <div className="rounded-[40px] bg-gradient-to-r from-[#7E67C1]/70 via-[#D2CEDD]/70 to-[#FFB051]/70 p-[2px] md:p-[3px]">
            <div className="flex items-center rounded-[37px] bg-gradient-to-r from-[#D2CEDD]/40 via-[#201C1D]/40 to-[#201C1D]/40 px-3 py-0.5 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-xl md:px-4 md:py-1">
              <span className="text-sm font-semibold whitespace-nowrap text-white md:text-xl lg:text-2xl">
                {project.category.toUpperCase() === "AI" ? "AI" : project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-auto flex-1 flex-col gap-2 px-4 pt-4 pb-4 backdrop-blur md:gap-3 md:px-6 md:pt-6 md:pb-0">
        <h3 className="line-clamp-1 text-xl leading-tight font-semibold tracking-tight text-white md:text-2xl lg:text-3xl">
          {project.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed tracking-tight text-white md:line-clamp-4 md:text-lg lg:text-xl font-extralight">
          {project.description}
        </p>
      </div>
    </Link>
  );
}