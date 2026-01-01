import React from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = "Submitting your inquiry...",
}) => {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4 p-8 bg-[#201C1D] rounded-xl border border-[#7E67C1]/30">
        {/* Gradient Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#7E67C1] border-r-[#BBE4F6] animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-[#7E67C1] border-l-[#BBE4F6] animate-spin animation-delay-150" />
        </div>

        {/* Loading Message */}
        <p className="text-white text-lg font-medium bg-gradient-to-r from-[#7E67C1] to-[#BBE4F6] bg-clip-text text-transparent">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
