"use client";

import { useEffect, useState } from "react";

export type QualityTier =
  /** Full experience. */
  | "high"
  /** Same scene, fewer pixels and fewer moving parts. */
  | "low"
  /** No WebGL — caller should render the classic grid instead. */
  | "none";

export interface QualityProfile {
  tier: QualityTier;
  /** Honour the OS "reduce motion" setting: no float, no parallax. */
  reducedMotion: boolean;
  /** Device pixel ratio clamp handed to the R3F canvas. */
  dpr: [number, number];
}

const supportsWebGL = (): boolean => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
};

/**
 * Decides how much scene the current device should get. Resolves on the client
 * only — `null` means "still deciding", so callers can hold the loader.
 */
export function useQualityTier(): QualityProfile | null {
  const [profile, setProfile] = useState<QualityProfile | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resolve = () => {
      if (!supportsWebGL()) {
        setProfile({ tier: "none", reducedMotion: true, dpr: [1, 1] });
        return;
      }

      const reducedMotion = motionQuery.matches;
      // Coarse pointer or a narrow viewport both point at a phone; either way
      // the budget is tighter than on a laptop.
      const constrained =
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768 ||
        (navigator.hardwareConcurrency ?? 8) <= 4;

      setProfile({
        tier: constrained ? "low" : "high",
        reducedMotion,
        dpr: constrained ? [1, 1.5] : [1, 1.75],
      });
    };

    resolve();
    motionQuery.addEventListener("change", resolve);
    return () => motionQuery.removeEventListener("change", resolve);
  }, []);

  return profile;
}
