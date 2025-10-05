import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  image: React.ReactNode;
  gradient?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  features,
  image,
}) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-6 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 h-full flex flex-col"
      style={{
        border: "1px solid transparent",
        background:
          "linear-gradient(#111111, #111111) padding-box, linear-gradient(135deg, #7E67C1, #FFB051) border-box",
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-zinc-800 to-zinc-700 rounded-xl flex items-center justify-center border border-zinc-600/50"
          style={{
            border: "1px solid transparent",
            background:
              "linear-gradient(#1c1c1c, #1c1c1c) padding-box, linear-gradient(135deg, #7E67C1, #FFB051) border-box",
          }}
        >
          {icon}
        </div>
        <h3 className="text-2xl font-semibold text-white mt-2">{title}</h3>
      </div>

      <p className="text-white opacity-80 text-2xl mb-6 leading-relaxed">
        {description}
      </p>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-white text-xl">
            <CheckCircle2 className="w-6 h-6 text-[#FFCD94] flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-4 right-0 w-20 h-20 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        {image}
      </div>
    </div>
  );
};
