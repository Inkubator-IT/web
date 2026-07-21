"use client";

import type { DeskLayout } from "../config";
import { useDesk } from "../store";
import { InteractiveObject } from "./interactive-object";

/** Places each service's object in its slot and makes it respond to the pointer. */
export function DeskObjects({
  layout,
  animate,
}: {
  layout: DeskLayout;
  animate: boolean;
}) {
  const { hoveredId } = useDesk();

  return (
    <group>
      {layout.slots.map((slot, index) => (
        <InteractiveObject
          key={slot.id}
          slot={slot}
          phase={index * 1.31}
          animate={animate}
          anyHovered={hoveredId !== null}
        />
      ))}
    </group>
  );
}
