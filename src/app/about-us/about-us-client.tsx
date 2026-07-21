"use client";

import GradientBorderDiv from "@/components/div-gradient-border";
import ExportedImage from "next-image-export-optimizer";
import { motion, useScroll, useTransform } from "motion/react";
import type { UseScrollOptions } from "motion/react";
import { useRef, type ReactNode } from "react";

const MISSION_ITEMS = [
  "Form and develop a community based on informatics knowledge",
  "Channel and develop the potential of IT Incubator members through learning and self-actualization",
  "Motivate members' interest to innovate as a form of informatics knowledge development",
  "Support the operation of HMIF by obtaining funding sources through project work",
] as const;

const CORE_VALUES = [
  {
    title: "Integrity",
    desc: "Forming and developing a community based on informatics science.",
  },
  {
    title: "Collaboration",
    desc: "Bulding solutions together with clients and teammates.",
  },
  {
    title: "Activeness",
    desc: "Constantly learning, innovating, and adapting to new tech trends.",
  },
] as const;

type ScrollOffsetProp = NonNullable<UseScrollOptions["offset"]>;

// Ties a section's reveal to scroll position instead of a one-shot trigger, so it scrubs both ways with the scrollbar.
function ScrollReveal({
  children,
  className = "",
  offset = ["start 92%", "start 45%"],
}: {
  children: ReactNode;
  className?: string;
  offset?: [string, string];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ScrollOffsetProp,
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const grayscale = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const filter = useTransform(
    [blurPx, grayscale],
    ([b, g]) => `blur(${b}px) grayscale(${g})`,
  );

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y,
        scale,
        filter,
        willChange: "transform, opacity, filter",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// A connector line that only exists in the gap above a section's title, growing as you scroll toward it — the line
// reaching the checkpoint dot is the same scroll progress that unblurs the title, so the two feel causally linked.
function SectionCheckpoint({
  children,
  offset = ["start 88%", "start 42%"],
}: {
  children: ReactNode;
  offset?: [string, string];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ScrollOffsetProp,
  });

  const fillScale = useTransform(scrollYProgress, [0.05, 1], [0, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
  const dotScale = useTransform(scrollYProgress, [0.7, 1], [0.3, 1]);
  const dotGlow = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  const headingOpacity = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.55, 1], [36, 0]);
  const headingBlur = useTransform(scrollYProgress, [0.55, 1], [16, 0]);
  const headingGray = useTransform(scrollYProgress, [0.55, 1], [1, 0]);
  const headingFilter = useTransform(
    [headingBlur, headingGray],
    ([b, g]) => `blur(${b}px) grayscale(${g})`,
  );

  return (
    <div ref={ref} className="flex w-full flex-col items-center">
      <div className="relative h-16 w-px md:h-28">
        <div className="absolute inset-0 bg-white/8" />
        <motion.div
          className="absolute inset-x-0 top-0 h-full origin-top"
          style={{
            scaleY: fillScale,
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,176,81,0.05), #FFB051)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
            willChange: "transform",
          }}
        />
      </div>
      <motion.div
        className="relative h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB051]"
        style={{ opacity: dotOpacity, scale: dotScale }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute -inset-1.5 rounded-full bg-[#FFB051] blur-[6px]"
          style={{ opacity: dotGlow }}
        />
      </motion.div>
      <motion.div
        style={{
          opacity: headingOpacity,
          y: headingY,
          filter: headingFilter,
          willChange: "transform, opacity, filter",
        }}
        className="mt-4 flex w-full flex-col items-center md:mt-6"
      >
        {children}
      </motion.div>
    </div>
  );
}

function StoryParallaxBackdrop({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.7, 0.7, 0],
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate, opacity, willChange: "transform, opacity" }}
      className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
    >
      <ExportedImage
        src={src}
        alt={alt}
        width={2000}
        height={2000}
        className="scale-180 md:scale-100"
      />
    </motion.div>
  );
}

export default function AboutUsClient() {
  return (
    <main className="relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5">
      {/* Our Vision */}
      <section className="flex w-full flex-col items-center justify-center pt-16 pb-16 md:w-[75%] md:pt-24 md:pb-24">
        <SectionCheckpoint offset={["start 95%", "start 55%"]}>
          <div className="rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xs font-medium tracking-wider md:text-sm">
            <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
              OUR VISION
            </span>
          </div>
        </SectionCheckpoint>
        <ScrollReveal className="flex w-full flex-col items-center">
          <span className="bg-gradient-to-r from-white/30 via-white to-white/30 bg-clip-text p-3 text-center text-2xl text-transparent italic sm:text-3xl md:text-4xl">
            &ldquo;The formation of an IT community as a platform for the
            professional actualization of HMIF members&rdquo;
          </span>
        </ScrollReveal>
      </section>

      {/* OUR MISSION */}
      <section className="flex w-full flex-col items-center justify-center gap-6 pb-16 md:w-[75%] md:gap-12 md:pb-24">
        <SectionCheckpoint>
          <div className="rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xs font-medium tracking-wider md:text-sm">
            <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
              OUR MISSION
            </span>
          </div>
        </SectionCheckpoint>
        <div className="flex w-full flex-wrap items-stretch justify-center gap-6 md:gap-12">
          {MISSION_ITEMS.map((item, index) => (
            <ScrollReveal
              key={item}
              className="w-full md:w-[45%]"
              offset={["start 95%", `start ${62 - index * 4}%`]}
            >
              <GradientBorderDiv
                className="flex w-full items-center justify-center overflow-hidden rounded-xl p-[1px] md:rounded-full md:p-[2px]"
                gradientClassName="p-[2px] md:rounded-full rounded-[14px]"
                contentClassName="flex items-center justify-center w-full h-full px-6 md:px-12 py-3 md:py-6 backdrop-blur-sm md:rounded-full rounded-[14px]"
              >
                <p className="text-center text-base font-light text-white md:text-xl">
                  {item}
                </p>
              </GradientBorderDiv>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="relative flex w-full flex-col items-center justify-center gap-6 pb-24 md:w-[75%] md:gap-12 md:pb-40">
        <StoryParallaxBackdrop
          src="/assets/about-us/techstack_ellipse.png"
          alt="techstack ellipse"
        />
        <SectionCheckpoint>
          <div className="rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xs font-medium tracking-wider md:text-sm">
            <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
              OUR STORY
            </span>
          </div>
        </SectionCheckpoint>
        <ScrollReveal className="z-10 flex w-full flex-col items-center gap-6 md:gap-12">
          <span className="text-center text-2xl leading-8 text-white drop-shadow-white md:text-3xl md:leading-10">
            InkubatorIT was founded under{" "}
            <span className="inline-block rounded-full border border-white/12 bg-white/12 px-6 py-1 text-xs font-semibold whitespace-nowrap shadow-inner shadow-white/60 md:text-xl">
              <span className="flex items-center gap-2 bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
                <ExportedImage
                  src="/assets/about-us/hmif.png"
                  alt="HMIF ITB"
                  width={20}
                  height={20}
                  className="inline-block"
                />
                HMIF ITB
              </span>
            </span>{" "}
            as a hub for students passionate about software development. What
            started as a student initiative has grown into a{" "}
            <span className="inline-block rounded-full border border-white/12 bg-white/12 px-6 py-1 text-xs font-semibold whitespace-nowrap shadow-inner shadow-white/60 md:text-xl">
              <span className="bg-gradient-to-r from-[#AD99E7] to-[#BBE4F6] bg-clip-text text-transparent">
                <span className="text-white">👨🏻‍💻 </span>
                Trusted Partner
              </span>
            </span>{" "}
            for businesses and institutions, delivering impactful digital
            solutions.
          </span>
        </ScrollReveal>
      </section>

      {/* CORE VALUES */}
      <section className="flex w-full flex-col items-center justify-center gap-6 pb-16 md:w-[75%] md:gap-12 md:pb-24">
        <SectionCheckpoint>
          <span className="bg-gradient-to-r from-white/30 via-white to-white/30 bg-clip-text p-3 text-center text-2xl font-medium text-transparent sm:text-4xl md:text-5xl">
            We Believe In Three Core Values
          </span>
        </SectionCheckpoint>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12">
          {CORE_VALUES.map((value, index) => (
            <ScrollReveal
              key={value.title}
              offset={["start 95%", `start ${58 - index * 6}%`]}
            >
              <GradientBorderDiv
                className="flex w-full items-center justify-center overflow-hidden rounded-sm p-[1px] md:p-[2px]"
                gradientClassName="p-[2px] rounded-[14px]"
                contentClassName="flex items-center flex-col justify-center w-full h-full md:p-12 p-6 backdrop-blur-sm rounded-[14px] gap-3 md:gap-6"
              >
                <p className="text-center text-xl font-semibold text-white md:text-2xl">
                  {value.title}
                </p>
                <p className="text-center text-base font-light text-white/80 md:text-xl">
                  {value.desc}
                </p>
              </GradientBorderDiv>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
