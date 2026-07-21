"use client";

import type { ComponentType } from "react";
import { AiChip } from "./ai-chip";
import { GameController } from "./game-controller";
import { IotBoard } from "./iot-board";
import { Laptop } from "./laptop";
import { Monitor } from "./monitor";
import { Sketchbook } from "./sketchbook";
import { Smartphone } from "./smartphone";
import { VrHeadset } from "./vr-headset";

export interface DeskObjectProps {
  /** False under prefers-reduced-motion — objects should hold still. */
  animate?: boolean;
}

/** Maps a Service.id from ../../data/services to the thing on the desk. */
export const DESK_OBJECTS: Record<string, ComponentType<DeskObjectProps>> = {
  "design-prototype": Sketchbook,
  "website-development": Laptop,
  "mobile-applications": Smartphone,
  "desktop-applications": Monitor,
  "ai-ml": AiChip,
  "ar-vr": VrHeadset,
  iot: IotBoard,
  "games-development": GameController,
};
