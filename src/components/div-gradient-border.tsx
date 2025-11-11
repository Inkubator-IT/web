import React from "react";

interface GradientBorderDivProps {
  children: React.ReactNode;
  className?: string;
  gradientClassName?: string;
  contentClassName?: string;
}

export default function GradientBorderDiv({
  children,
  className = "",
  gradientClassName = "",
  contentClassName = "",
}: GradientBorderDivProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Gradient border layer */}
      <div
        className={`absolute inset-0 ${gradientClassName}`}
        style={{
          background:
            "linear-gradient(to bottom right, #AD99E7 0%, #FFBC6C 50%, #AD99E7 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      ></div>

      {/* Inner content layer */}
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </div>
  );
}
