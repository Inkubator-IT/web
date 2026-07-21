"use client";

/** Placeholder shown while the 3D chunk downloads and the tier resolves. */
export function SceneLoader() {
  return (
    <output
      className="flex h-full w-full items-center justify-center"
      aria-label="Loading the interactive services desk"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
          <div className="animate-scene-loader h-full w-1/3 rounded-full bg-gradient-to-r from-[#7E67C1] to-[#FFB051]" />
        </div>
        <p className="text-xs font-light tracking-wide text-white/50">
          Preparing the desk…
        </p>
      </div>
    </output>
  );
}
