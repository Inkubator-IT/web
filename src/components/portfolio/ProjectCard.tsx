import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.id}`}
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:scale-[1.02]",
        "h-auto w-full max-w-4xl rounded-2xl md:h-[579px] md:rounded-3xl",
        "border border-white/[0.4] bg-white/[0.1] backdrop-blur",
        "flex cursor-pointer flex-col",
        className,
      )}
    >
      <div className="relative h-[180px] w-full flex-shrink-0 overflow-hidden md:h-[240px] lg:h-[339px]">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        />

        <div className="absolute top-2 right-2 z-10 md:top-4 md:right-4">
          <div className="rounded-[40px] bg-gradient-to-r from-[#7E67C1]/70 via-[#D2CEDD]/70 to-[#FFB051]/70 p-[2px] md:p-[3px]">
            <div className="flex items-center rounded-[37px] bg-gradient-to-r from-[#D2CEDD]/40 via-[#201C1D]/40 to-[#201C1D]/40 px-3 py-0.5 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-xl md:px-4 md:py-1">
              <span className="text-sm font-semibold whitespace-nowrap text-white md:text-xl lg:text-2xl">
                {project.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-auto flex-1 flex-col gap-2 px-4 pt-4 pb-4 backdrop-blur md:gap-3 md:px-6 md:pt-6 md:pb-0">
        <h3 className="line-clamp-1 text-lg leading-tight font-bold tracking-tight text-white md:text-2xl lg:text-5xl">
          {project.title}
        </h3>

        <p className="line-clamp-3 text-xs leading-relaxed tracking-tight text-white/90 md:line-clamp-4 md:text-sm lg:text-xl">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
