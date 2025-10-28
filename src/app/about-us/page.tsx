import GradientBorderDiv from "@/components/div-gradient-border";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main className="relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5">
      <Image
        src="/assets/about-us/Wave.png"
        alt="wave"
        width={2000}
        height={2000}
        className="absolute top-[100px] left-0 w-full scale-110 md:top-[200px]"
      />
      {/* Our Vision */}
      <section className="my-[80px] flex w-full max-w-[1200px] flex-col items-center justify-center md:my-[160px]">
        <div className="rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xs md:text-xl">
          <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
            OUR VISION
          </span>
        </div>
        <span className="text- xl bg-gradient-to-r from-white/20 via-white to-white/20 bg-clip-text p-3 text-center text-transparent italic md:text-5xl">
          “The formation of an IT community as a platform for the professional
          actualization of HMIF members”
        </span>
      </section>

      {/* OUR MISSION */}
      <section className="md:mb-[16 0px] mb-[80px] flex w-full max-w-[1400px] flex-col items-center justify-center gap-6 md:gap-12">
        <div className="rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xs md:text-xl">
          <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
            OUR MISSION
          </span>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-6 md:gap-12">
          <GradientBorderDiv className="w-full rounded-full p-2 md:w-[45%] md:px-8 md:py-4">
            <p className="text-base font-light text-white md:text-2xl">
              Form and develop a community based on informatics knowledge
            </p>
          </GradientBorderDiv>
          <GradientBorderDiv className="w-full rounded-full p-2 md:w-[45%] md:px-8 md:py-4">
            <p className="text-base font-light text-white md:text-2xl">
              Channel and develop the potential of IT Incubator members through
              learning and self-actualization
            </p>
          </GradientBorderDiv>
          <GradientBorderDiv className="w-full rounded-full p-2 md:w-[45%] md:px-8 md:py-4">
            <p className="text-base font-light text-white md:text-2xl">
              Motivate members’ interest to innovate as a form of informatics
              knowledge development
            </p>
          </GradientBorderDiv>
          <GradientBorderDiv className="w-full rounded-full p-2 md:w-[45%] md:px-8 md:py-4">
            <p className="text-base font-light text-white md:text-2xl">
              Support the operation of HMIF by obtaining funding sources through
              project work
            </p>
          </GradientBorderDiv>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="relative my-[160px] flex w-full max-w-[1200px] flex-col items-center justify-center gap-6 md:my-[320px] md:gap-12">
        <Image
          src="/assets/about-us/techstack_ellipse.png"
          alt="techstack ellipse"
          width={2000}
          height={2000}
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
        />
        <div className="z-10 rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xs md:text-xl">
          <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
            OUR STORY
          </span>
        </div>
        <span className="z-10 text-center text-2xl text-white drop-shadow-white md:text-4xl">
          InkubatorIT was founded under{" "}
          <span className="inline-block rounded-full border border-white/12 bg-white/12 px-6 py-1 text-xs whitespace-nowrap md:text-xl">
            <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
              <span className="text-white">💻 </span>
              HMIF ITB
            </span>
          </span>{" "}
          as a hub for students passionate about software development. What
          started as a student initiative has grown into a{" "}
          <span className="inline-block rounded-full border border-white/12 bg-white/12 px-6 py-1 text-xs whitespace-nowrap md:text-xl">
            <span className="bg-gradient-to-r from-[#AD99E7] to-[#BBE4F6] bg-clip-text text-transparent">
              <span className="text-white">👨🏻‍💻 </span>
              Trusted Partner
            </span>
          </span>{" "}
          for businesses and institutions, delivering impactful digital
          solutions.
        </span>
      </section>
    </main>
  );
};

export default page;
