"use client";

import ExportedImage from "next-image-export-optimizer";
import type React from "react";

/**
 * Closing call-to-action, shared by the classic grid and the 3D desk experience.
 */
export const ServicesCta: React.FC = () => (
  <section className="px-4 py-8 sm:px-6 md:py-12 md:mb-10">
    <div className="mx-auto w-full text-center md:w-[75%]">
      <h2 className="mb-4 text-xl leading-snug font-bold sm:text-2xl md:text-3xl md:leading-tight lg:text-4xl">
        Ready to bring your{" "}
        <span className="bg-gradient-to-r from-[#ad96f1] to-[#FFB051] bg-clip-text text-transparent">
          ideas
        </span>{" "}
        to life? Let's turn your{" "}
        <span className="bg-gradient-to-r from-[#fc9c27] from-0% to-[#FFB051] to-85% bg-clip-text text-transparent">
          vision
        </span>
        <br className="hidden sm:block" />
        into impactful{" "}
        <span className="bg-gradient-to-r from-[#ac94f5] to-[#FFB051] bg-clip-text text-transparent">
          digital solutions
        </span>{" "}
        together.
      </h2>

      <button
        type="button"
        className="group mt-4 rounded-sm border border-purple-500/50 bg-gradient-to-r from-purple-600/20 to-orange-500/20 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 sm:mt-6 sm:px-8 sm:py-4 sm:text-base md:px-12 md:py-5 md:text-lg lg:text-xl"
        onClick={() => {
          window.location.href = "/contact";
        }}
      >
        Start Your Project Today
        <span>
          <ExportedImage
            src="/our-services/image/star.png"
            alt="Arrow Right"
            width={16}
            height={16}
            className="ml-2 inline-block h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1 sm:h-6 sm:w-6"
          />
        </span>
      </button>
    </div>
  </section>
);
