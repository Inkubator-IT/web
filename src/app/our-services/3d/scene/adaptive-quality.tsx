"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useCallback } from "react";

/**
 * Trades resolution for framerate when the device struggles.
 *
 * It deliberately only touches DPR. An earlier version dropped the whole
 * quality tier on decline, which tore out soft shadows and bloom part-way
 * through a session — the scene visibly darkened and its shadows turned blocky
 * while the user was looking at it. Rendering the same picture at fewer pixels
 * degrades gracefully; changing what the picture *is* does not.
 */
export function AdaptiveQuality({ min, max }: { min: number; max: number }) {
  const setDpr = useThree((state) => state.setDpr);

  const onDecline = useCallback(() => setDpr(min), [setDpr, min]);
  const onIncline = useCallback(() => setDpr(max), [setDpr, max]);

  return (
    <PerformanceMonitor
      onDecline={onDecline}
      onIncline={onIncline}
      onFallback={onDecline}
      flipflops={3}
    />
  );
}
