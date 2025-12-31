"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ExportedImage from "next-image-export-optimizer";

interface ImageCarouselProps {
  images: string[] | null;
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  return (
    <div className="mb-10 space-y-4">
      <h2 className="text-2xl font-semibold text-white md:text-3xl">Preview</h2>

      <div className="relative">
        <div
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:gap-6"
          id="preview-scroll"
          onScroll={(e) => {
            const container = e.currentTarget;
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(
              container.scrollLeft <
                container.scrollWidth - container.clientWidth - 10,
            );
          }}
        >
          {images && images.length > 0 ? (
            images.map((img, index) => (
              <div
                key={index}
                className="w-[280px] flex-shrink-0 snap-center md:w-[432px]"
              >
                <div className="group relative h-[175px] w-full cursor-pointer overflow-hidden rounded-xl bg-gray-800 md:h-[270px]">
                  <ExportedImage
                    src={img}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 280px, 432px"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="w-[280px] flex-shrink-0 snap-center md:w-[432px]">
              <div className="relative flex h-[175px] w-full items-center justify-center overflow-hidden rounded-xl bg-gray-800 md:h-[270px]">
                <p className="text-white/60">No preview images available</p>
              </div>
            </div>
          )}
        </div>

        {canScrollLeft && (
          <button
            onClick={() => {
              const container = document.getElementById("preview-scroll");
              if (container)
                container.scrollBy({ left: -300, behavior: "smooth" });
            }}
            className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-white p-2 text-black/80 backdrop-blur-sm transition-all hover:bg-white/80 md:p-3"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => {
              const container = document.getElementById("preview-scroll");
              if (container)
                container.scrollBy({ left: 300, behavior: "smooth" });
            }}
            className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-white p-2 text-black/80 backdrop-blur-sm transition-all hover:bg-white/80 md:p-3"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        )}
      </div>
    </div>
  );
}
