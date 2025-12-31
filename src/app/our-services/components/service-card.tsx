import React from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { categoryOptions } from "@/app/portfolio/portfolio-page-client";

export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  image: React.ReactNode;
  gradient?: string;
  category?: (typeof categoryOptions)[number];
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  features,
  image,
  category,
}) => {
  return (
    <Link
      href={`/portfolio?category=${category}`}
      className="group relative overflow-hidden  rounded-xl p-4 sm:p-6 md:p-8 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 h-full flex flex-col bg-gradient-to-br from-zinc-900 to-zinc-800"
      style={{
        border: "1px solid transparent",
        background:
          "linear-gradient(#111111, #111111) padding-box, linear-gradient(135deg, #7E67C1, #FFB051) border-box",
      }}
    >
      <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div
          className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-zinc-800 to-zinc-700 rounded-lg sm:rounded-xl flex items-center justify-center border border-zinc-600/50"
          style={{
            border: "1px solid transparent",
            background:
              "linear-gradient(#1c1c1c, #1c1c1c) padding-box, linear-gradient(135deg, #7E67C1, #FFB051) border-box",
          }}
        >
          {icon}
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mt-1 sm:mt-2">
          {title}
        </h3>
      </div>

      <p className="text-gray-200 opacity-80 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 leading-relaxed">
        {description}
      </p>

      <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-2 sm:gap-3 text-white text-sm sm:text-base md:text-lg"
          >
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#FFCD94] flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="absolute right-0 bottom-4 md:bottom-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
        {image}
      </div>
    </Link>
  );
};
