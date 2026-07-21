"use client";

import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { CAMERA_FOV, getLayout } from "../config";
import { Cables } from "./cables";
import { CameraRig } from "./camera-rig";
import { Desk } from "./desk";
import { DeskObjects } from "./desk-objects";
import { Lighting } from "./lighting";

export interface SceneProps {
  tier: "high" | "low";
  reducedMotion: boolean;
  pointer: React.RefObject<{ x: number; y: number }>;
}

/**
 * Everything that lives inside the Canvas. Layout is chosen from the canvas
 * aspect rather than a CSS breakpoint, so the desk reflows against the space it
 * actually has.
 */
export function DeskScene({ tier, reducedMotion, pointer }: SceneProps) {
  const size = useThree((state) => state.size);
  const layout = useMemo(
    () => getLayout(size.width / size.height),
    [size.width, size.height],
  );

  return (
    <>
      <CameraRig
        layout={layout}
        pointer={pointer}
        enableParallax={!reducedMotion}
      />
      <Lighting tier={tier} />
      <Desk layout={layout} tier={tier} />
      <Cables layout={layout} />
      <DeskObjects layout={layout} animate={!reducedMotion} />
    </>
  );
}

export { CAMERA_FOV };
