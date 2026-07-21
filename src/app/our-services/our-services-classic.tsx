"use client";

import ExportedImage from "next-image-export-optimizer";
import type React from "react";
import { ServiceCard } from "./components/service-card";
import { ServicesCta } from "./components/services-cta";
import { services } from "./data/services";

/**
 * The original card-grid presentation of the services page.
 *
 * Kept intact so `page.tsx` can switch back to it at any time — see the MODE
 * constant there.
 */
const OurServicesClassic: React.FC = () => {
  const cards = services.map((service) => ({
    ...service,
    icon: (
      <ExportedImage
        src={service.icon.src}
        alt={service.icon.alt}
        width={24}
        height={24}
        className={service.icon.className}
      />
    ),
    image: (
      <ExportedImage
        src={service.image.src}
        alt={service.image.alt}
        width={24}
        height={24}
        className={service.image.className}
      />
    ),
  }));

  return (
    <div className="min-h-screen text-white">
      <section className="px-4 pt-4 pb-12 md:px-6 md:pt-12 md:pb-16">
        <div className="mx-auto w-full text-center md:w-[75%]">
          <h1 className="mb-6 text-4xl leading-tight font-semibold sm:text-5xl md:text-6xl">
            Our{" "}
            <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-base leading-relaxed font-light opacity-80 sm:text-lg">
            Explore our tailored IT solutions designed to empower businesses,
            optimize operations, and drive innovation through technology.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:pb-12">
        <div className="mx-auto w-full md:w-[75%]">
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {cards.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {cards.slice(6, 8).map((service) => (
              <div
                key={service.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesCta />
    </div>
  );
};

export default OurServicesClassic;
