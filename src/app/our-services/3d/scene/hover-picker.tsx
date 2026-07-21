"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";
import { useDesk } from "../store";

/**
 * Resolves what the pointer is over, once per frame, for the whole scene.
 *
 * The alternative — per-object onPointerOver/onPointerOut — fires once per
 * child mesh, so dragging the cursor across a single object emits a stream of
 * leave/enter pairs and the hover visibly flickers. Picking centrally against
 * one convex proxy per object makes the result deterministic: exactly one
 * object is hovered, and it only changes when the pointer really crosses into
 * a different one.
 */
export function HoverPicker({ enabled }: { enabled: boolean }) {
  const { hoveredId, focusedId, setHovered, proxiesRef, pointerInsideRef } =
    useDesk();
  const raycaster = useThree((state) => state.raycaster);
  const camera = useThree((state) => state.camera);
  const pointer = useThree((state) => state.pointer);
  const candidates = useRef<THREE.Object3D[]>([]);

  useFrame(() => {
    // While a hotspot button holds keyboard focus, that is the authority —
    // otherwise this would clear the highlight the moment the user tabbed to it.
    if (focusedId !== null) return;

    if (!enabled || !pointerInsideRef.current) {
      if (hoveredId !== null) setHovered(null);
      return;
    }

    // Reused array — this runs every frame.
    candidates.current.length = 0;
    for (const proxy of proxiesRef.current.values()) {
      candidates.current.push(proxy);
    }
    if (candidates.current.length === 0) return;

    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(candidates.current, false)[0];
    const id = (hit?.object.userData.serviceId as string | undefined) ?? null;

    if (id !== hoveredId) setHovered(id);
  });

  return null;
}
