import type { Metadata } from "next";
import GradientBorderDiv from "@/components/div-gradient-border";
import ExportedImage from "next-image-export-optimizer";
import React from "react";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Inkubator IT's vision, mission, and story. Founded under HMIF ITB, we're a trusted partner for businesses seeking digital solutions with integrity, collaboration, and activeness.",
  openGraph: {
    title: `About Us | ${SITE_CONFIG.name}`,
    description:
      "Learn about Inkubator IT's vision, mission, and story. Founded under HMIF ITB, we're a trusted partner for businesses seeking digital solutions.",
  },
};

const DIVISIONS = [
  {
    id: "ceo",
    label: "CEO Office",
    labelGradient: "bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C]",
    description: "Setting the strategic vision and connecting ideas to drive real impact.",
    icon: "/assets/about-us/ceo.png",
    iconAlt: "CEO Office Icon",
    members: [
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
    ],
  },
  {
    id: "hrd",
    label: "Human Resources Development",
    labelGradient: "bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C]",
    description: "Empowering talents to reach their full potential through learning and a supportive community.",
    icon: "/assets/about-us/hrd.png",
    iconAlt: "HRD Icon",
    members: [
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    labelGradient: "bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C]",
    description: "Ensuring financial health through strategic budgeting, forecasting, and strict compliance.",
    icon: "/assets/about-us/finance.png",
    iconAlt: "Finance Icon",
    members: [
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
    ],
  },
  {
    id: "technology",
    label: "Technology",
    labelGradient: "bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C]",
    description: "Transforming ideas into reality through smart solutions and robust system management.",
    icon: "/assets/about-us/technology.png",
    iconAlt: "Technology Icon",
    members: [
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
    ],
  },
  {
    id: "growth",
    label: "Growth Office",
    labelGradient: "bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C]",
    description: "Turning potential into impact through strategic partnerships and collaborative growth.",
    icon: "/assets/about-us/growth-office.png",
    iconAlt: "Growth Office Icon",
    members: [
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
    ],
  },
  {
    id: "operational",
    label: "Operational",
    labelGradient: "bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C]",
    description: "Delivering end-to-end IT projects by seamlessly bridging clients and development teams.",
    icon: "/assets/about-us/operational.png",
    iconAlt: "Operational Icon",
    members: [
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
      { name: "Naomi Tanjung", role: "Executive Officer", photo: "/assets/about-us/placeholder.jpg" },
    ],
  },
];

const page = () => {
  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5">
      {/* Our Vision */}
      <section className="my-[80px] flex w-full flex-col items-center justify-center md:my-[160px] md:w-[75%]">
        <div className="rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xs md:text-xl">
          <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
            OUR VISION
          </span>
        </div>
        <span className="bg-gradient-to-r from-white/20 via-white to-white/20 bg-clip-text p-3 text-center text-2xl text-transparent italic sm:text-3xl md:text-4xl">
          "The formation of an IT community as a platform for the professional
          actualization of HMIF members"
        </span>
      </section>

      {/* OUR MISSION */}
      <section className="md:mb-[16 0px] mb-[80px] flex w-full flex-col items-center justify-center gap-6 md:w-[75%] md:gap-12">
        <div className="rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xs md:text-xl">
          <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
            OUR MISSION
          </span>
        </div>
        <div className="flex w-full flex-wrap items-stretch justify-center gap-6 md:gap-12">
          <GradientBorderDiv
            className={`flex w-full items-center justify-center overflow-hidden rounded-xl p-[1px] md:w-[45%] md:rounded-full md:p-[2px]`}
            gradientClassName="p-[2px] md:rounded-full rounded-[14px]"
            contentClassName="flex items-center justify-center w-full h-full px-6 md:px-12 py-3 md:py-6 backdrop-blur-sm md:rounded-full rounded-[14px]"
          >
            <p className="text-center text-base font-light text-white md:text-xl">
              Form and develop a community based on informatics knowledge
            </p>
          </GradientBorderDiv>
          <GradientBorderDiv
            className={`flex w-full items-center justify-center overflow-hidden rounded-xl p-[1px] md:w-[45%] md:rounded-full md:p-[2px]`}
            gradientClassName="p-[2px] md:rounded-full rounded-[14px]"
            contentClassName="flex items-center justify-center w-full h-full px-6 md:px-12 py-3 md:py-6 backdrop-blur-sm md:rounded-full rounded-[14px]"
          >
            <p className="text-center text-base font-light text-white md:text-xl">
              Channel and develop the potential of IT Incubator members through
              learning and self-actualization
            </p>
          </GradientBorderDiv>
          <GradientBorderDiv
            className={`flex w-full items-center justify-center overflow-hidden rounded-xl p-[1px] md:w-[45%] md:rounded-full md:p-[2px]`}
            gradientClassName="p-[2px] md:rounded-full rounded-[14px]"
            contentClassName="flex items-center justify-center w-full h-full px-6 md:px-12 py-3 md:py-6 backdrop-blur-sm md:rounded-full rounded-[14px]"
          >
            <p className="text-center text-base font-light text-white md:text-xl">
              Motivate members' interest to innovate as a form of informatics
              knowledge development
            </p>
          </GradientBorderDiv>
          <GradientBorderDiv
            className={`flex w-full items-center justify-center overflow-hidden rounded-xl p-[1px] md:w-[45%] md:rounded-full md:p-[2px]`}
            gradientClassName="p-[2px] md:rounded-full rounded-[14px]"
            contentClassName="flex items-center justify-center w-full h-full px-6 md:px-12 py-3 md:py-6 backdrop-blur-sm md:rounded-full rounded-[14px]"
          >
            <p className="text-center text-base font-light text-white md:text-xl">
              Support the operation of HMIF by obtaining funding sources through
              project work
            </p>
          </GradientBorderDiv>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="relative my-[130px] flex w-full flex-col items-center justify-center gap-6 md:my-[300px] md:w-[75%] md:gap-12">
        <ExportedImage
          src="/assets/about-us/techstack_ellipse.png"
          alt="techstack ellipse"
          width={2000}
          height={2000}
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 scale-180 md:scale-100"
        />
        <div className="z-10 rounded-full border border-white/12 bg-[#171717] px-6 py-1 text-xs md:text-xl">
          <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFBC6C] bg-clip-text text-transparent">
            OUR STORY
          </span>
        </div>
        <span className="z-10 text-center text-2xl leading-9 text-white drop-shadow-white md:text-3xl md:leading-12">
          InkubatorIT was founded under{" "}
          <span className="inline-block rounded-full border border-white/12 bg-white/12 px-6 py-1 text-xs whitespace-nowrap md:text-xl">
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

      {/* CORE VALUES */}
      <section className="md:mb-[16 0px] mb-[80px] flex w-full flex-col items-center justify-center gap-6 md:w-[75%] md:gap-12">
        <span className="bg-gradient-to-r from-white/20 via-white to-white/20 bg-clip-text p-3 text-center text-2xl text-transparent sm:text-4xl md:text-5xl">
          We Believe In Three Core Values
        </span>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12">
          <GradientBorderDiv
            className={`md:w-[45%]md:p-[2px] flex w-full items-center justify-center overflow-hidden rounded-sm p-[1px]`}
            gradientClassName="p-[2px] rounded-[14px]"
            contentClassName="flex items-center flex-col justify-center w-full h-full md:p-12 p-6 backdrop-blur-sm rounded-[14px] gap-3 md:gap-6"
          >
            <p className="text-center text-base font-bold text-white md:text-2xl">
              Integrity
            </p>
            <p className="text-center text-base font-light text-white md:text-xl">
              Forming and developing a community based on informatics science.
            </p>
          </GradientBorderDiv>
          <GradientBorderDiv
            className={`md:w-[45%]md:p-[2px] flex w-full items-center justify-center overflow-hidden rounded-sm p-[1px]`}
            gradientClassName="p-[2px] rounded-[14px]"
            contentClassName="flex items-center flex-col justify-center w-full h-full md:p-12 p-6 backdrop-blur-sm rounded-[14px] gap-3 md:gap-6"
          >
            <p className="text-center text-base font-bold text-white md:text-2xl">
              Collaboration
            </p>
            <p className="text-center text-base font-light text-white md:text-xl">
              Bulding solutions together with clients and teammates.
            </p>
          </GradientBorderDiv>
          <GradientBorderDiv
            className={`md:w-[45%]md:p-[2px] flex w-full items-center justify-center overflow-hidden rounded-sm p-[1px]`}
            gradientClassName="p-[2px] rounded-[14px]"
            contentClassName="flex items-center flex-col justify-center w-full h-full md:p-12 p-6 backdrop-blur-sm rounded-[14px] gap-3 md:gap-6"
          >
            <p className="text-center text-base font-bold text-white md:text-2xl">
              Activeness
            </p>
            <p className="text-center text-base font-light text-white md:text-xl">
              Constantly learning, innovating, and adapting to new tech trends.
            </p>
          </GradientBorderDiv>
        </div>
      </section>

      {/* ORGANIGRAM */}
      <section className="mb-[80px] flex w-full flex-col items-center justify-center gap-6 md:w-[75%] md:gap-12">
        <span className="bg-gradient-to-r from-white/20 via-white to-white/20 bg-clip-text p-3 text-center text-2xl text-transparent sm:text-4xl md:text-5xl">
          Key Business Divisions
        </span>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {DIVISIONS.map((division) => (
            <GradientBorderDiv
              key={division.id}
              className="flex w-full items-center justify-center overflow-hidden rounded-sm p-[1px]"
              gradientClassName="p-[2px] rounded-[14px]"
              contentClassName="flex flex-col w-full h-full p-6 backdrop-blur-sm rounded-[14px] gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-3">
                  <span
                    className={`inline-block self-start rounded-md bg-gradient-to-r px-3 py-1 text-base font-bold text-white md:text-xl ${division.labelGradient}`}
                  >
                    {division.label}
                  </span>
                  <p className="text-base font-light leading-relaxed text-white/60 md:text-xl">
                    {division.description}
                  </p>
                </div>
                <ExportedImage
                  src={division.icon}
                  alt={division.iconAlt}
                  width={64}
                  height={64}
                  className="h-14 w-14 flex-shrink-0 opacity-80"
                />
              </div>

              <div className="h-px w-full bg-white/10" />

              <div className="flex flex-col gap-3">
                {division.members.map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <ExportedImage
                      src={member.photo}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 flex-shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-base font-semibold leading-tight text-white md:text-xl">
                        {member.name}
                      </span>
                      <span className="text-base font-light text-white/50 md:text-xl">{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GradientBorderDiv>
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;