"use client";

import React from "react";
import { ServiceCard, ServiceCardProps } from "./components/service-card";
import Image from "next/image";

const OurServicesPage: React.FC = () => {
  const services: ServiceCardProps[] = [
    {
      icon: (
        <Image
          src="/our-services/icon/1.svg"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ),
      title: "Design Prototype",
      description:
        "Transform ideas into interactive prototypes that bring clarity, speed, and precision to your product development.",
      features: [
        "UI/UX Design",
        "Interactive Prototypes",
        "User Research",
        "App and Website",
      ],
      image: (
        <Image
          src="/our-services/image/1.png"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-24 h-24"
        />
      ),
    },
    {
      icon: (
        <Image
          src="/our-services/icon/2.svg"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-6 h-6 rounded-xl"
        />
      ),
      title: "Website Development",
      description:
        "Build modern, responsive, and scalable websites tailored to your business needs.",
      features: [
        "Responsive Design",
        "SEO Optimization",
        "CMS Integration",
        "E-commerce, Company Profile, etc",
      ],
      image: (
        <Image
          src="/our-services/image/2.png"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-32 h-24 rounded-xl"
        />
      ),
    },
    {
      icon: (
        <Image
          src="/our-services/icon/3.svg"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ),
      title: "Mobile Applications",
      description:
        "Deliver seamless mobile experiences with apps designed for performance and user engagement.",
      features: [
        "iOS & Android Apps",
        "Cross-Platform Development",
        "Performance Optimization",
        "Push Notifications",
      ],
      image: (
        <Image
          src="/our-services/image/3.png"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-32 h-24 rounded-xl"
        />
      ),
    },
    {
      icon: (
        <Image
          src="/our-services/icon/4.svg"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ),
      title: "Desktop Applications",
      description:
        "Create powerful, efficient, and secure desktop applications to support complex workflows.",
      features: [
        "Windows, macOS, Linux",
        "Custom Business Solutions",
        "High-Performance Systems",
        "Secure Data Handling",
      ],
      image: (
        <Image
          src="/our-services/image/4.png"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-32 h-24 rounded-xl"
        />
      ),
    },
    {
      icon: (
        <Image
          src="/our-services/icon/5.svg"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ),
      title: "AI/ML Solutions",
      description:
        "Unlock smarter decision-making with AI and machine learning solutions customized for your goals.",
      features: [
        "Predictive Analytics",
        "Natural Language Processing",
        "Computer Vision",
        "Recommendation Systems",
      ],
      image: (
        <Image
          src="/our-services/image/5.png"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-32 h-24"
        />
      ),
    },
    {
      icon: (
        <Image
          src="/our-services/icon/6.svg"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ),
      title: "AR/VR Solutions",
      description:
        "Enhance engagement through immersive AR/VR experiences that blend innovation with interactivity.",
      features: [
        "Augmented Reality Apps",
        "Virtual Reality Experiences",
        "3D Visualization",
        "Interactive Training",
      ],
      image: (
        <Image
          src="/our-services/image/6.png"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-32 h-24"
        />
      ),
    },
    {
      icon: (
        <Image
          src="/our-services/icon/7.svg"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ),
      title: "IoT Solutions",
      description:
        "Connect devices and systems with IoT solutions that improve efficiency and unlock new opportunities.",
      features: [
        "Smart Device Integration",
        "Real-Time Monitoring",
        "Data Analytics",
        "Automation Systems",
      ],
      image: (
        <Image
          src="/our-services/image/7.png"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-32 h-24 rounded-xl"
        />
      ),
    },
    {
      icon: (
        <Image
          src="/our-services/icon/8.svg"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ),
      title: "Games Development",
      description:
        "Design and develop engaging, interactive games that captivate users and inspire creativity.",
      features: [
        "Game Design & Development",
        "Basic Mobile Games",
        "One or Many Main Features",
      ],
      image: (
        <Image
          src="/our-services/image/8.png"
          alt="Palette Icon"
          width={24}
          height={24}
          className="w-24 h-24 rounded-xl"
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white ">
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-7xl md:text-8xl font-bold mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-white text-3xl leading-relaxed opacity-80">
            Explore our tailored IT solutions designed to empower businesses,
            optimize operations, and drive innovation through technology.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-10/12 mx-auto">
          {/* First 6 cards - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          {/* Last 2 cards - centered using flex */}
          <div className="flex flex-wrap justify-center gap-6">
            {services.slice(6, 8).map((service, index) => (
              <div
                key={index + 6}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-gradient-to-b from-black via-zinc-900 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to bring your{" "}
            <span className="bg-gradient-to-r from-[#ad96f1] to-[#FFB051] bg-clip-text text-transparent">
              ideas
            </span>{" "}
            to life? Let's turn your{" "}
            <span className="bg-gradient-to-r from-[#fc9c27] from-0% to-[#FFB051] to-85% bg-clip-text text-transparent">
              vision
            </span>
            <br />
            into impactful{" "}
            <span className="bg-gradient-to-r from-[#ac94f5] to-[#FFB051] bg-clip-text text-transparent">
              digital solutions
            </span>{" "}
            together.
          </h2>

          <button
            className="mt-4 px-12 py-5 bg-gradient-to-r from-purple-600/20 to-orange-500/20 border border-purple-500/50 rounded-sm text-white text-2xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 group"
            onClick={() => (window.location.href = "/contact")}
          >
            Start Your Project Today
            <span>
              <Image
                src="/our-services/image/star.png"
                alt="Arrow Right"
                width={16}
                height={16}
                className="w-6 h-6 inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default OurServicesPage;
