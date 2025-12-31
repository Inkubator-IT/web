"use client";

import { motion } from "motion/react";
import { BriefcaseBusiness, Sparkles } from "lucide-react";
import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import GradientBorderDiv from "@/components/div-gradient-border";

interface ProjectShowcaseItem {
  id: number | string;
  image: string;
  title: string;
  description: string;
}

interface HomePageClientProps {
  projectShowcase: ProjectShowcaseItem[];
}

const BRANDS_AND_PARTNERS = [
  { id: 1, image: "/assets/landing/brands/pertamina.png", title: "Pertamina" },
  { id: 2, image: "/assets/landing/brands/harisenin.svg", title: "Harisenin" },
  { id: 3, image: "/assets/landing/brands/bi.svg", title: "Bi" },
  { id: 4, image: "/assets/landing/brands/paragon.svg", title: "Paragon" },
  {
    id: 5,
    image: "/assets/landing/brands/sinar_dunia.svg",
    title: "Sinar Dunia",
  },
  { id: 6, image: "/assets/landing/brands/serenic.svg", title: "Serenic" },
  { id: 7, image: "/assets/landing/brands/tiga_roda.svg", title: "Tiga Roda" },
  { id: 8, image: "/assets/landing/brands/99.png", title: "99" },
  { id: 9, image: "/assets/landing/brands/radya.svg", title: "Radya" },
  { id: 10, image: "/assets/landing/brands/imk.svg", title: "Imk" },
  { id: 11, image: "/assets/landing/brands/aiesec.svg", title: "Aiesec" },
] as const;

const SERVICES = [
  {
    id: 1,
    title: "Website Development",
    desc: "Company profiles, e-commerce, competition platforms, and more.",
    image: "/assets/landing/services/webdev.svg",
  },
  {
    id: 2,
    title: "Mobile Apps",
    desc: "From prototypes to full-featured Android/iOS apps.",
    image: "/assets/landing/services/mobapps.svg",
  },
  {
    id: 4,
    title: "Custom Solutions",
    desc: "Games, AI/ML, AR/VR, and prototypes powered by modern technology.",
    image: "/assets/landing/services/custsol.svg",
  },
  {
    id: 5,
    title: "AI-Powered Innovation",
    desc: "Harness the power of AI to simplify processes, uncover patterns, and accelerate decision-making.",
    image: "/assets/landing/services/ai.svg",
  },
];

const FALLBACK_SHOWCASE: ProjectShowcaseItem[] = [
  {
    id: "fallback-1",
    image: "/assets/landing/project_highlights.png",
    title: "Shadcn Landing Page",
    description:
      "Sebuah landing page modern yang dibangun dengan Shadcn UI dan React. Fokus pada kecepatan, konsistensi desain, serta pengalaman pengguna yang sederhana namun elegan.",
  },
  {
    id: "fallback-2",
    image: "/logo-iit.png",
    title: "Project 2",
    description: "Sample description for project 2.",
  },
  {
    id: "fallback-3",
    image: "/assets/landing/project_highlights.png",
    title: "Project 3",
    description: "Sample description for project 3.",
  },
];

export default function HomePageClient({
  projectShowcase,
}: HomePageClientProps) {
  const showcaseItems = useMemo(() => {
    return projectShowcase.length > 0 ? projectShowcase : FALLBACK_SHOWCASE;
  }, [projectShowcase]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: showcaseItems.length - 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(
    showcaseItems.length > 0 ? showcaseItems.length - 1 : 0,
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const intervalId = setInterval(() => {
      if (emblaApi.canScrollPrev()) {
        emblaApi.scrollPrev();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Keep selectedIndex in bounds just in case
  useEffect(() => {
    if (showcaseItems.length > 0) {
      setSelectedIndex((current) =>
        Math.min(current, Math.max(0, showcaseItems.length - 1)),
      );
    }
  }, [showcaseItems.length]);

  const currentProject =
    showcaseItems[selectedIndex] ?? showcaseItems[showcaseItems.length - 1] ?? showcaseItems[0];

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-[50px]">
      <section className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-[48px] px-5 py-[50px] md:gap-[96px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex w-full flex-col items-center justify-center gap-[24px] md:gap-[48px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex w-fit flex-col"
          >
            <p className="text-xs font-medium text-white italic md:text-xl">
              InkubatorIT&apos;s Present
            </p>
            <div className="mt-2 h-[1px] bg-gradient-to-r from-white/0 via-white to-white/0"></div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text text-center text-2xl font-semibold text-transparent md:text-6xl"
          >
            Trusted Digital Solutions by ITB&apos;s Brightest Tech Talents
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center text-base font-normal text-white/80 md:text-2xl"
          >
            We build high-quality software with integrity, collaboration, and
            innovation. From websites to mobile apps and beyond, Inkubator IT
            helps turn your ideas into impactful digital products.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex w-fit flex-row items-center justify-center gap-3 md:gap-6"
        >
          <Link
            href="/portfolio"
            className="z-10 flex flex-row items-center gap-4 rounded-[6px] border border-white/12 bg-white/2 px-2 py-1 text-xs text-white duration-200 hover:bg-white/20 md:rounded-[12px] md:px-5 md:py-3 md:text-2xl"
          >
            See Our Portfolio{" "}
            <BriefcaseBusiness className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
          <Link
            href="/contact"
            className="z-10 rounded-[6px] bg-[#121212CC] px-2 py-1 text-xs transition-colors duration-200 hover:bg-[#1A1A1ACC] md:rounded-[12px] md:px-5 md:py-3 md:text-2xl"
          >
            <span className="flex flex-row items-center gap-4 bg-linear-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text text-transparent">
              Start Your Project{" "}
              <Sparkles className="h-4 w-4 text-[#FFBC6C] md:h-5 md:w-5" />
            </span>
          </Link>
        </motion.div>
      </section>

      <section className="relative flex h-[500px] w-full max-w-[1600px] flex-col items-center justify-center px-5 md:h-[1200px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <ExportedImage
            src="/assets/landing/techstack_ellipse.png"
            alt="techstack ellipse"
            width={2000}
            height={2000}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[90px] scale-170 sm:scale-150 md:-translate-y-[200px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex w-full shrink-0 justify-center overflow-hidden"
        >
          <div className="flex w-full shrink-0 justify-center overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {showcaseItems.map((project) => (
                <div
                  key={project.id}
                  className="flex min-w-0 flex-[0_0_100%] justify-center"
                >
                  <ExportedImage
                    src={project.image}
                    alt={project.title}
                    width={2000}
                    height={2000}
                    className="relative z-10 h-auto max-h-[400px] w-full object-contain md:max-h-[800px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="z-10 flex w-full flex-1 flex-col items-center justify-center gap-6 px-0 md:gap-[40px] md:px-20">
          <p className="text-center text-base font-medium text-white/48 md:text-2xl">
            PROJECT SHOWCASE
          </p>
          <div className="flex w-full max-w-[1600px] flex-row items-center justify-between gap-5 px-0 md:gap-10 md:px-20">
            {showcaseItems.length > 1 && (
              <button
                onClick={scrollPrev}
                aria-label="Previous project"
                className="flex aspect-square h-[40px] shrink-0 items-center justify-center rounded-full bg-white/4 text-base text-white transition-colors duration-200 hover:bg-white/20 md:h-[70px] md:w-[70px] md:p-0 md:text-2xl"
              >
                ←
              </button>
            )}
            <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
              <p className="text-center text-2xl font-medium text-white uppercase md:text-6xl">
                {currentProject.title}
              </p>
              <p className="text-center text-xs text-white/60 md:text-[20px]">
                {currentProject.description}
              </p>
            </div>
            {showcaseItems.length > 1 && (
              <button
                onClick={scrollNext}
                aria-label="Next project"
                className="flex aspect-square h-[40px] shrink-0 items-center justify-center rounded-full bg-white/4 text-base text-white transition-colors duration-200 hover:bg-white/20 md:h-[70px] md:w-[70px] md:p-0 md:text-2xl"
              >
                →
              </button>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-2 md:gap-3">
            {showcaseItems.map((project, index) => (
              <button
                key={project.id}
                onClick={() => scrollTo(index)}
                aria-label={`Go to project ${index + 1}`}
                className={`h-2 w-2 rounded-full transition-all duration-300 md:h-3 md:w-3 ${
                  index === selectedIndex
                    ? "w-8 bg-white"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-[80px] flex w-full max-w-[1200px] flex-col items-center justify-center px-5 md:mt-[160px]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-base text-white/60 md:text-2xl"
        >
          BUILDING TRUST WITH REMARKABLE BRANDS AND PARTNERS
        </motion.p>
        <div className="mt-6 w-full">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="mx-auto flex flex-wrap items-center justify-center gap-6 px-4"
          >
            {BRANDS_AND_PARTNERS.map((brand) => (
              <motion.div
                key={brand.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  show: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.1 }}
                className="flex h-10 items-center justify-center p-2 md:h-18 md:p-3"
              >
                <ExportedImage
                  src={brand.image}
                  alt={brand.title}
                  width={1000}
                  height={1000}
                  className="h-full w-auto object-contain opacity-90 grayscale-[10%] hover:opacity-100"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mt-[80px] flex w-full max-w-[1600px] flex-col items-center justify-center gap-20 px-5 md:mt-[160px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex w-full flex-col items-center justify-center gap-5 px-0 md:gap-14 md:px-30"
        >
          <div className="rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xs md:text-xl">
            <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
              OUR SERVICES
            </span>
          </div>
          <span className="bg-gradient-to-r from-white/20 via-white to-white/20 bg-clip-text p-3 text-center text-3xl text-transparent md:text-6xl">
            Complete Digital Solutions for Your Project
          </span>
          <p className="px-0 text-center text-sm text-white/80 md:px-25 md:text-2xl">
            We provide tailored software development services to help your
            projects succeed, whether you’re a startup, business, or
            organization.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="mx-auto flex w-full flex-wrap items-center justify-center gap-6"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5 }}
              className={`${service.id % 2 == 0 ? "w-full md:w-[40%]" : "w-full md:w-[55%]"}`}
            >
              <GradientBorderDiv
                className="overflow-hidden rounded-xl p-[1px] w-full"
                gradientClassName="p-[2px] rounded-[14px]"
                contentClassName="p-2 backdrop-blur-sm rounded-[14px]"
              >
                <div
                  className={`${service.id % 2 != 0 ? "absolute top-0 left-0 hidden h-[150px] w-[150px] -translate-1/2 -translate-y-1/2 rounded-full border border-white/12 md:block" : ""}`}
                ></div>
                <div
                  className={`${service.id % 2 != 0 ? "absolute top-0 left-0 hidden h-[200px] w-[200px] -translate-1/2 -translate-y-1/2 rounded-full border border-white/12 md:block" : ""}`}
                ></div>
                <div
                  className={`${service.id % 2 == 0 ? "absolute top-0 left-0 hidden h-[170px] w-[170px] -translate-1/2 -translate-y-1/2 rounded-lg border border-white/12 md:block" : ""}`}
                ></div>
                <div
                  className={`${service.id % 2 == 0 ? "absolute right-0 bottom-0 hidden h-[250px] w-[250px] translate-1/2 translate-y-1/2 rounded-lg border border-white/12 md:block" : ""}`}
                ></div>
                <div className="flex h-[120px] w-full items-center justify-between gap-4 md:h-[200px]">
                  <div className="flex h-full flex-1 flex-col justify-start md:justify-end">
                    <span className="bg-gradient-to-r from-white to-white/20 bg-clip-text text-xl text-transparent md:text-3xl">
                      {service.title}
                    </span>
                    <p className="text-xs text-white/60 md:text-lg">
                      {service.desc}
                    </p>
                  </div>
                  <div className="flex h-full w-[30%] shrink-0 items-center justify-center">
                    <ExportedImage
                      src={service.image}
                      alt={service.title}
                      width={2000}
                      height={2000}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </GradientBorderDiv>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/*How We Work Section*/}
      <section className="relative mt-[80px] flex w-full max-w-[1600px] flex-col items-center justify-center gap-20 px-5 md:mt-[160px]">
        <motion.div
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute top-1/2 left-0 z-0 hidden h-full -translate-x-[45%] -translate-y-1/2 scale-200 md:block"
        >
          <ExportedImage
            src="/assets/landing/Bubble.svg"
            alt="bubble"
            width={2000}
            height={2000}
            className="h-full w-auto"
          />
        </motion.div>
        <motion.div
          animate={{
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute top-1/2 right-0 z-0 hidden h-full translate-x-[45%] -translate-y-1/2 scale-200 md:block"
        >
          <ExportedImage
            src="/assets/landing/Bubble.svg"
            alt="bubble"
            width={2000}
            height={2000}
            className="h-full w-auto"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex w-full flex-col items-center justify-center gap-5 px-0 md:gap-14 md:px-30 lg:px-50"
        >
          <div className="rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xs md:text-xl">
            <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
              HOW WE WORK
            </span>
          </div>
          <span className="bg-gradient-to-r from-white/20 via-white to-white/20 bg-clip-text p-3 text-center text-3xl text-transparent md:text-6xl">
            Building Together, Step by Step
          </span>
          <p className="text-center text-sm text-white/80 md:text-2xl">
            We make project development transparent and efficient, breaking down
            complex work into simple, reliable steps.
          </p>
        </motion.div>
        {/*DESKTOP*/}
        <div className="hidden w-full flex-col items-center justify-center md:block">
          <div className="relative w-full px-20">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0 h-[2px] -translate-y-[3px] blur-md origin-left"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0) 0%, #AD99E7 20%, #FFB051 80%, rgba(255,255,255,0) 100%)",
              }}
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="relative h-[2px] w-full origin-left"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0) 0%, #AD99E7 20%, #FFB051 80%, rgba(255,255,255,0) 100%)",
              }}
            />
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
            className="grid grid-cols-4"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="relative flex translate-x-1/2 flex-col items-center justify-center p-10"
            >
              <div className="absolute top-0 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#AD99E7] to-white"></div>
              <div className="my-5 shrink-0 rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xl">
                <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
                  STEP 1
                </span>
              </div>
              <div className="flex-1 flex-col items-center justify-center">
                <p className="text-center text-3xl text-[#D9D9D9]">
                  Discover & Analysis
                </p>
                <p className="text-center text-xl text-white/80">
                  We listen to your needs and goals
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="relative flex translate-x-1/2 flex-col items-center justify-center p-10"
            >
              <div className="absolute top-0 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#AD99E7] to-[#FFBC6C]"></div>
              <div className="my-5 shrink-0 rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xl">
                <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
                  STEP 2
                </span>
              </div>
              <div className="flex-1 flex-col items-center justify-center">
                <p className="text-center text-3xl text-[#D9D9D9]">
                  Design & Development
                </p>
                <p className="text-center text-xl text-white/80">
                  Delivering solutions with the right tech stack
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="relative flex translate-x-1/2 flex-col items-center justify-center p-10"
            >
              <div className="absolute top-0 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#FFBC6C] to-white"></div>
              <div className="my-5 shrink-0 rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xl">
                <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
                  STEP 3
                </span>
              </div>
              <div className="flex-1 flex-col items-center justify-center">
                <p className="text-center text-3xl text-[#D9D9D9]">
                  Testing & Launch
                </p>
                <p className="text-center text-xl text-white/80">
                  Regular demos, feedback, and time delivery
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        {/*MOBILE*/}
        <div className="relative block w-full flex-col items-center justify-center md:hidden">
          <div className="absolute top-0 bottom-0 left-1/2 w-[3px] -translate-x-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute inset-0 blur-md origin-top"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #AD99E7 20%, #FFB051 80%, rgba(255,255,255,0) 100%)",
              }}
            />
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 origin-top"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #AD99E7 20%, #FFB051 80%, rgba(255,255,255,0) 100%)",
              }}
            />
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
            className="relative grid grid-rows-3"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
              }}
              className="relative flex w-[50%] flex-col items-center justify-center justify-self-start pr-5"
            >
              <div className="absolute top-1/2 right-0 h-5 w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#AD99E7] to-white"></div>
              <div className="mb-5 rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xl">
                <span className="bg-gradient-to-b from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
                  STEP 1
                </span>
              </div>
              <p className="text-center text-xl text-[#D9D9D9]">
                Discover & Analysis
              </p>
              <p className="text-center text-sm text-white/80">
                We listen to your needs and goals
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                show: { opacity: 1, x: 0 },
              }}
              className="relative flex w-[50%] flex-col items-center justify-center justify-self-end pl-5"
            >
              <div className="absolute top-1/2 left-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#AD99E7] to-[#FFBC6C]"></div>
              <div className="mb-5 rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xl">
                <span className="bg-gradient-to-b from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
                  STEP 2
                </span>
              </div>
              <p className="text-center text-xl text-[#D9D9D9]">
                Design & Development
              </p>
              <p className="text-center text-sm text-white/80">
                Delivering solutions with the right tech stack
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
              }}
              className="relative flex w-[50%] flex-col items-center justify-center justify-self-start pr-5"
            >
              <div className="absolute top-1/2 right-0 h-5 w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#FFBC6C] to-white"></div>
              <div className="mb-5 rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xl">
                <span className="bg-gradient-to-b from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
                  STEP 3
                </span>
              </div>
              <p className="text-center text-xl text-[#D9D9D9]">
                Testing & Launch
              </p>
              <p className="text-center text-sm text-white/80">
                Regular demos, feedback, and time delivery
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/*Who We Are Section*/}
      <section className="relative mt-[80px] flex w-full flex-col items-center justify-center gap-20 px-5 md:mt-[160px]">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 opacity-50"
        >
          <ExportedImage
            src="/assets/landing/Bubble.svg"
            alt="bubble"
            width={2000}
            height={2000}
            className="w-full h-auto"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xs md:text-xl"
        >
          <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
            WHO WE ARE
          </span>
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-xl leading-12 text-white drop-shadow-white md:text-3xl"
        >
          We make{" "}
          <span className="inline-block rounded-full border border-white/12 bg-white/12 px-6 py-1 text-xs whitespace-nowrap md:text-xl">
            <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
              <span className="text-white">💻 </span>
              Project Development
            </span>
          </span>{" "}
          transparent and efficient. InkubatorIT is the professionalism
          department under HMIF ITB, where the best{" "}
          <span className="inline-block rounded-full border border-white/12 bg-white/12 px-6 py-1 text-xs whitespace-nowrap md:text-xl">
            <span className="bg-gradient-to-r from-[#AD99E7] to-[#BBE4F6] bg-clip-text text-transparent">
              <span className="text-white">👨🏻‍💻 </span>
              Informatics Talent
            </span>
          </span>{" "}
          create digital solutions that{" "}
          <span className="inline-block rounded-full border border-white/12 bg-white/12 px-6 py-1 text-xs whitespace-nowrap md:text-xl">
            <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
              Make an Impact
              <span className="text-white"> ✨</span>
            </span>
          </span>{" "}
          , breaking down complex work into simple, reliable steps.
        </motion.span>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-[1000px]"
        >
          <ExportedImage
            src="/assets/landing/who_we_are.png"
            alt="who we are img"
            width={2000}
            height={2000}
            className="w-full h-auto object-contain"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="flex w-full flex-wrap items-center justify-center gap-5 md:gap-20"
        >
          {[
            { label: "Years of Experience", value: "13+", color: "#FFB051" },
            { label: "Loyal Clients", value: "20+", color: "#AD99E7" },
            { label: "Tech Stacks Mastered", value: "25+", color: "#FFB051" },
            { label: "Average Rating", value: "4.72/5", color: "#AD99E7" },
            {
              label: "Digitals Project Delivered",
              value: "226+",
              color: "#FFB051",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="flex max-w-[100px] flex-col items-center justify-center md:max-w-[200px]"
            >
              <span className="relative inline-block">
                <span
                  className="absolute inset-0 bg-white bg-clip-text text-3xl text-transparent blur-sm md:text-5xl"
                  aria-hidden="true"
                >
                  {stat.value}
                </span>
                <span
                  className="relative bg-gradient-to-r from-white bg-clip-text text-3xl text-transparent md:text-5xl"
                  style={{
                    backgroundImage: `linear-gradient(to right, white, ${stat.color})`,
                  }}
                >
                  {stat.value}
                </span>
              </span>
              <p className="text-center text-sm text-white italic md:text-2xl">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/*What Our Clients Say Section*/}
      <section className="mt-[80px] flex w-full flex-col items-center justify-center gap-20 px-5 md:mt-[160px]">
        <div className="flex w-full items-center justify-start gap-5 md:gap-10">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[200px] flex-1 bg-gradient-to-r from-white to-white/60 bg-clip-text text-xl text-transparent md:max-w-[500px] md:text-6xl"
          >
            What Our Clients Say
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex max-w-[500px] flex-col items-start justify-center gap-4"
          >
            <div className="rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xs md:text-xl">
              <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
                TESTIMONIALS
              </span>
            </div>
            <p className="max-w-[200px] text-xs text-white md:max-w-none md:text-2xl">
              Don’t just take our word for it, hear what our clients say about
              working with us.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full overflow-hidden"
        >
          <ExportedImage
            src={"/assets/landing/Testimonials.svg"}
            alt="testimonial img"
            width={2000}
            height={2000}
            className="w-full min-w-[500px] -translate-y-[50px] scale-125 object-contain"
          />
        </motion.div>
      </section>

      {/*Last Section*/}
      <section className="relative my-[80px] flex w-full flex-col items-center justify-center gap-5 px-5 md:my-[160px] md:gap-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 scale-150 md:scale-100"
        >
          <ExportedImage
            src="/assets/landing/Bubble.svg"
            alt="bubble"
            width={2000}
            height={2000}
            className="w-full h-auto"
          />
        </motion.div>
        <div className="flex w-full justify-center px-10">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-[2px] w-full max-w-[500px]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0) 0%, #AD99E7 20%, #FFB051 80%, rgba(255,255,255,0) 100%)",
            }}
          />
        </div>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text p-4 text-center text-2xl font-semibold text-transparent md:text-6xl"
        >
          Ready to Bring Your Ideas to Life?
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center text-base text-white md:text-3xl"
        >
          Let’s turn your vision into reality with the right digital solutions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Link href="/contact" className="rounded-full">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="my-10 flex flex-row items-center gap-4 rounded-full bg-gradient-to-r from-[#564292] to-[#A77741] px-5 py-2 text-xl text-white md:my-15 md:px-10 md:py-4 md:text-4xl shadow-lg hover:shadow-purple-500/20 transition-shadow"
            >
              Let’s Collaborate{" "}
              <Sparkles className="h-4 w-4 text-white md:h-10 md:w-10" />
            </motion.span>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
