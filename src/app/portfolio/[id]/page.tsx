import { ArrowLeft, ExternalLink } from "lucide-react";
import { fetchProjectById } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageCarousel from "./image-carousel";

export async function generateStaticParams() {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch projects for static params");
      return [];
    }

    const result = await response.json();
    const projects = result.data || [];

    return projects.map((project: { id: number }) => ({
      id: project.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await fetchProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div
      className="min-h-screen bg-black leading-7 tracking-[-0.06em] text-white"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1540px] px-4 pb-12 md:px-6 md:pb-24">
        <div className="py-6 md:py-8">
          <Link
            href="/portfolio"
            className="flex items-center gap-2 transition-colors hover:text-white/80"
          >
            <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
            <span className="text-lg font-medium md:text-xl">Back</span>
          </Link>
        </div>

        <div>
          <div>
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-0">
              <div className="flex w-full justify-center md:hidden md:w-1/2">
                <div className="relative w-full max-w-[500px]">
                  <Image
                    src={project.thumbnail || "/portfolio/image.png"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full rounded-xl object-contain md:rounded-2xl"
                  />
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7E67C1] to-[#FFB051] px-4 py-2 text-sm shadow-[inset_2px_2px_10px_0px_rgba(255,255,255,0.7),inset_0px_0px_20px_0px_rgba(255,255,255,0.8)] transition-transform hover:scale-105 md:bottom-6 md:left-6 md:gap-3 md:rounded-4xl md:text-lg"
                    >
                      Open Website
                      <ExternalLink className="h-4 w-4 md:h-5 md:w-5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 md:mr-5 md:w-1/2">
                <div className="leading-tight font-semibold md:leading-16">
                  <h1 className="text-3xl md:text-5xl lg:text-7xl">
                    {project.title}
                  </h1>
                  <p className="mt-1 text-base text-white/60 md:text-2xl">
                    {project.owner}
                  </p>
                </div>

                <div>
                  <p className="text-sm leading-relaxed text-white/80 md:text-xl md:leading-7">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="hidden w-1/2 justify-center md:flex">
                <div className="relative max-w-[700px]">
                  <Image
                    src={project.thumbnail || "/portfolio/image.png"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="rounded-xl object-contain"
                  />
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-6 left-6 flex items-center gap-3 rounded-4xl bg-gradient-to-r from-[#7E67C1] to-[#FFB051] px-4 py-2 text-lg shadow-[inset_2px_2px_10px_0px_rgba(255,255,255,0.7),inset_0px_0px_20px_0px_rgba(255,255,255,0.8)] transition-transform hover:scale-105"
                    >
                      Open Website
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Tech Stack Icons */}
            {project.tech_stacks && project.tech_stacks.length > 0 && (
              <div className="mt-6 mb-10 flex gap-3 md:mb-16 md:gap-4">
                {project.tech_stacks.map((techStack) => (
                  <div key={techStack.tech_stack_id} className="group relative">
                    <Image
                      src={techStack.icon_url || "/portfolio/default-tech.svg"}
                      alt={techStack.tech_stack_name}
                      width={40}
                      height={40}
                      className="h-8 w-8 object-contain transition-transform group-hover:scale-110 md:h-10 md:w-10"
                    />
                    <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-black/90 px-3 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {techStack.tech_stack_name}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <ImageCarousel images={project.images} />

            <div className="mb-10 space-y-4">
              <h3 className="text-2xl font-semibold text-white md:text-3xl">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <span className="rounded-full border border-white/[0.12] bg-white/[0.02] bg-gradient-to-r from-[#FFB051] to-[#7E67C1] bg-clip-text px-4 py-2 text-sm font-medium text-transparent md:rounded-3xl md:px-6 md:py-4 md:text-xl">
                  {project.category
                    ? project.category.charAt(0).toUpperCase() +
                      project.category.slice(1)
                    : ""}
                </span>
                <span className="rounded-full border border-white/[0.12] bg-white/[0.02] bg-gradient-to-r from-[#FFB051] to-[#7E67C1] bg-clip-text px-4 py-2 text-sm font-medium text-transparent md:rounded-3xl md:px-6 md:py-4 md:text-xl">
                  {project.scope
                    ? project.scope.charAt(0).toUpperCase() +
                      project.scope.slice(1)
                    : ""}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white md:text-3xl">
                Testimonial
              </h3>
              <p className="text-sm text-white/60 md:text-lg">
                {project.testimonial || "No review added yet."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
