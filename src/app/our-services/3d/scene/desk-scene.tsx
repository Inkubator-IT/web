"use client";

import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { CAMERA_FOV, getLayout } from "../config";
import { useDesk } from "../store";
import { Cables } from "./cables";
import { CameraRig } from "./camera-rig";
import { Desk } from "./desk";
import { DeskObjects } from "./desk-objects";
import { Effects } from "./effects";
import { HoverPicker } from "./hover-picker";
import { LabelTracker } from "./label-tracker";
import { Lighting } from "./lighting";

export interface SceneProps {
  tier: "high" | "low";
  reducedMotion: boolean;
  pointer: React.RefObject<{ x: number; y: number }>;
  /** Hover picking pauses while the modal is open. */
  pickingEnabled: boolean;
}

/**
 * Everything that lives inside the Canvas. Layout is chosen from the canvas
 * aspect rather than a CSS breakpoint, so the desk reflows against the space it
 * actually has.
 */
export function DeskScene({
  tier,
  reducedMotion,
  pointer,
  pickingEnabled,
}: SceneProps) {
  const size = useThree((state) => state.size);
  const { selectedId } = useDesk();
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
        focusId={selectedId}
      />
      <Lighting tier={tier} />
      <Desk layout={layout} tier={tier} />
      <Cables layout={layout} />
      <DeskObjects layout={layout} animate={!reducedMotion} tier={tier} />
      <HoverPicker enabled={pickingEnabled} />
      <LabelTracker layout={layout} />
      {tier === "high" && <Effects />}
    </>
  );
}

export { CAMERA_FOV };
