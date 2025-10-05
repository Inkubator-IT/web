"use client";

import { BriefcaseBusiness, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Easily changeable project data
const PROJECTS = [
  {
    id: 1,
    image: "/assets/landing/project_highlights.png",
    title: "Shadcn Landing Page",
    description:
      "Sebuah landing page modern yang dibangun dengan Shadcn UI dan React. Fokus pada kecepatan, konsistensi desain, serta pengalaman pengguna yang sederhana namun elegan.",
  },
  {
    id: 2,
    image: "/assets/landing/project_highlights.png",
    title: "Project 2",
    description: "desc 2",
  },
  {
    id: 3,
    image: "/assets/landing/project_highlights.png",
    title: "Project 3",
    description: "desc 3",
  },
];

function App() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const handlePrev = () => {
    setActiveProjectIndex((prev) =>
      prev === 0 ? PROJECTS.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveProjectIndex((prev) =>
      prev === PROJECTS.length - 1 ? 0 : prev + 1,
    );
  };

  const handleDotClick = (index: number) => {
    setActiveProjectIndex(index);
  };

  const currentProject = PROJECTS[activeProjectIndex];
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0C0C0C] py-[50px]">
      {/*Hero Section*/}
      <section className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-[48px] px-5 py-[50px] md:gap-[96px]">
        <div className="flex w-full flex-col items-center justify-center gap-[24px] md:gap-[48px]">
          <div className="flex w-fit flex-col">
            <p className="text-xs font-medium text-white italic md:text-xl">
              InkubatorIT’s Present
            </p>
            <div className="mt-2 h-[1px] bg-gradient-to-r from-white/0 via-white to-white/0"></div>
          </div>
          <h1 className="bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text text-center text-2xl font-semibold text-transparent md:text-7xl">
            Trusted Digital Solutions by ITB’s Brightest Tech Talents
          </h1>
          <p className="text-center text-base font-normal text-white/80 md:text-2xl">
            We build high-quality software with integrity, collaboration, and
            innovation. From websites to mobile apps and beyond, Inkubator IT
            helps turn your ideas into impactful digital products.
          </p>
        </div>
        <div className="flex w-fit flex-row items-center justify-center gap-3 md:gap-6">
          <Link
            href="/" //change later
            className="z-10 flex flex-row items-center gap-4 rounded-[6px] border border-white/12 bg-white/2 px-2 py-1 text-xs text-white duration-200 hover:bg-white/20 md:rounded-[12px] md:px-5 md:py-3 md:text-2xl"
          >
            See Our Portfolio{" "}
            <BriefcaseBusiness className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
          <Link
            href="/" //change later
            className="z-10 rounded-[6px] bg-[#121212CC] px-2 py-1 text-xs transition-colors duration-200 hover:bg-[#1A1A1ACC] md:rounded-[12px] md:px-5 md:py-3 md:text-2xl"
          >
            <span className="flex flex-row items-center gap-4 bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text text-transparent">
              Start Your Project{" "}
              <Sparkles className="h-4 w-4 text-[#FFBC6C] md:h-5 md:w-5" />
            </span>
          </Link>
        </div>
      </section>

      {/*Project Highlights Section*/}
      <section className="relative flex w-full flex-col items-center justify-center gap-9 px-5 md:gap-[60px]">
        <Image
          src="/assets/landing/techstack_ellipse.png"
          alt="techstack ellipse"
          width={2000}
          height={2000}
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-3/5 scale-140 sm:scale-120"
        />
        <Image
          src={currentProject.image}
          alt={currentProject.title}
          width={2000}
          height={2000}
          className="relative z-10 transition-opacity duration-300"
        />
        <div className="flex flex-col gap-6 md:gap-[40px]">
          <p className="text-center text-base font-medium text-white/48 md:text-2xl">
            PROJECT SHOWCASE
          </p>
          <div className="flex w-full max-w-[1200px] flex-row items-center justify-between gap-5 md:gap-10">
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              className="flex aspect-square h-[40px] shrink-0 items-center justify-center rounded-full bg-white/4 text-base text-white transition-colors duration-200 hover:bg-white/20 md:h-[70px] md:w-[70px] md:p-0 md:text-2xl"
            >
              ←
            </button>
            <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
              <p className="text-center text-2xl font-medium text-white uppercase md:text-6xl">
                {currentProject.title}
              </p>
              <p className="text-center text-xs text-white/60 md:text-[20px]">
                {currentProject.description}
              </p>
            </div>
            <button
              onClick={handleNext}
              aria-label="Next project"
              className="flex aspect-square h-[40px] shrink-0 items-center justify-center rounded-full bg-white/4 text-base text-white transition-colors duration-200 hover:bg-white/20 md:h-[70px] md:w-[70px] md:p-0 md:text-2xl"
            >
              →
            </button>
          </div>
          {/* Dot indicators */}
          <div className="flex flex-row items-center justify-center gap-2 md:gap-3">
            {PROJECTS.map((project, index) => (
              <button
                key={project.id}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to project ${index + 1}`}
                className={`h-2 w-2 rounded-full transition-all duration-300 md:h-3 md:w-3 ${
                  index === activeProjectIndex
                    ? "w-8 bg-white"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
