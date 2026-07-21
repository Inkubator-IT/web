"use client";

import type { DeskLayout } from "../config";
import { DESK_OBJECTS } from "./objects";

/** Places each service's object in its slot for the current layout. */
export function DeskObjects({
  layout,
  animate,
}: {
  layout: DeskLayout;
  animate: boolean;
}) {
  return (
    <group>
      {layout.slots.map((slot) => {
        const Object3D = DESK_OBJECTS[slot.id];
        if (!Object3D) return null;

        return (
          <group
            key={slot.id}
            position={slot.position}
            rotation={[0, slot.rotationY, 0]}
          >
            <Object3D animate={animate} />
          </group>
        );
      })}
    </group>
  );
}
