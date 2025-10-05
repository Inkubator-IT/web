import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
	  project: Project;
	  className?: string;
}

interface Project {
		id: string;
		title: string;
		description: string;
		category: string;
		image: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link 
      href={`/portfolio/${project.id}`}
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:scale-[1.02]",
        "w-full max-w-4xl h-auto md:h-[579px] rounded-3xl",
        "bg-white/[0.1] border border-white/[0.4] backdrop-blur",
        "flex flex-col cursor-pointer",
        className
      )}
    >
      <div className="relative w-full h-[240px] md:h-[339px] overflow-hidden flex-shrink-0">
        <Image 
          src={project.image} 
          alt={project.title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        />
        
        <div className="absolute top-4 right-4 z-10">
          <div className="rounded-[40px] p-[3px] bg-gradient-to-r from-[#7E67C1]/70 via-[#D2CEDD]/70 to-[#FFB051]/70">
            <div className="rounded-[37px] py-1 px-4 backdrop-blur-xl bg-gradient-to-r from-[#D2CEDD]/40 via-[#201C1D]/40 to-[#201C1D]/40 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] flex items-center">
              <span className="font-semibold text-xl md:text-2xl text-white whitespace-nowrap">
                {project.category}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 h-auto pt-6 px-6 backdrop-blur flex flex-col gap-3">
        <h3 className="font-bold text-white text-2xl md:text-5xl leading-tight tracking-tight line-clamp-1">
          {project.title}
        </h3>

        <p className="text-white/90 text-sm md:text-xl leading-relaxed tracking-tight line-clamp-4">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
