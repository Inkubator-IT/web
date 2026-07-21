"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { ANCHOR_HEIGHT, type DeskLayout, HITBOX } from "../config";
import { useDesk } from "../store";

/**
 * Projects world anchors to screen space each frame and writes the result
 * straight to the overlay elements — the hover label and the keyboard hotspot
 * buttons. Doing this through React state would re-render the overlay at 60fps.
 */
export function LabelTracker({ layout }: { layout: DeskLayout }) {
  const { activeId, labelRef, hotspotsRef } = useDesk();
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const anchor = useMemo(() => new THREE.Vector3(), []);

  const projectPoint = (point: [number, number, number] | null) => {
    if (!point) return null;
    anchor.set(point[0], point[1], point[2]);
    anchor.project(camera);
    return {
      x: (anchor.x * 0.5 + 0.5) * size.width,
      y: (-anchor.y * 0.5 + 0.5) * size.height,
    };
  };

  /** The floating hotspot marker's position, where the label points. */
  const markerOf = (slotId: string): [number, number, number] | null => {
    const slot = layout.slots.find((candidate) => candidate.id === slotId);
    if (!slot) return null;
    return [
      slot.position[0],
      (ANCHOR_HEIGHT[slotId] ?? 0.3) + 0.09,
      slot.position[2],
    ];
  };

  /** The centre of the object's pick volume. */
  const centreOf = (
    slot: DeskLayout["slots"][number],
  ): [number, number, number] => {
    const box = HITBOX[slot.id];
    return [
      slot.position[0] + (box?.offset[0] ?? 0),
      slot.position[1] + (box?.offset[1] ?? 0.2),
      slot.position[2] + (box?.offset[2] ?? 0),
    ];
  };

  useFrame(() => {
    const label = labelRef.current;
    if (label && activeId) {
      const point = projectPoint(markerOf(activeId));
      if (point) {
        // Keep the panel clear of the canvas edges — objects near the left and
        // right of the desk would otherwise push their label out of view.
        const margin = 110;
        const x = Math.min(Math.max(point.x, margin), size.width - margin);
        label.style.transform = `translate3d(${x}px, ${point.y}px, 0)`;
      }
    }

    const hotspots = hotspotsRef.current;
    if (!hotspots) return;

    for (const slot of layout.slots) {
      const button = hotspots.querySelector<HTMLElement>(
        `[data-service-hotspot="${slot.id}"]`,
      );
      if (!button) continue;

      // Buttons track the object's centre of mass rather than the floating
      // hotspot marker, so a focus ring lands on the thing it describes.
      const point = projectPoint(centreOf(slot));
      if (point) {
        button.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`;
      }
    }
  });

  return null;
}
