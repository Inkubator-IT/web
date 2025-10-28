import React from "react";

interface GradientBorderDivProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientBorderDiv({
  children,
  className = "",
}: GradientBorderDivProps) {
  return (
    <div
      className={`relative rounded-xl bg-white/2 backdrop-blur-sm ${className}`}
      style={{
        position: "relative",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "12px",
        display: "inline-block",
      }}
    >
      <div
        className="scale-y-[calc(100%+1px)] rounded-[14px] p-[1px] md:scale-y-100 md:p-[2px]"
        style={{
          content: '""',
          position: "absolute",
          zIndex: -1,
          inset: "0px",
          background:
            "linear-gradient(to bottom right, #AD99E7 0%, #FFBC6C 50%, #AD99E7 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
}
