"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { DeskLayout } from "../config";
import { SURFACE } from "./objects/materials";

/**
 * Which objects are wired to which. These are what make the desk read as one
 * working setup rather than eight props placed near each other.
 */
const LINKS: Array<[from: string, to: string, bow: number]> = [
  ["desktop-applications", "website-development", 0.55],
  ["iot", "website-development", -0.4],
  ["ar-vr", "desktop-applications", 0.45],
  ["games-development", "desktop-applications", -0.5],
];

export function Cables({ layout }: { layout: DeskLayout }) {
  const curves = useMemo(() => {
    const at = (id: string) => layout.slots.find((slot) => slot.id === id);

    return LINKS.flatMap(([fromId, toId, bow]) => {
      const from = at(fromId);
      const to = at(toId);
      if (!from || !to) return [];

      const a = new THREE.Vector3(...from.position);
      const b = new THREE.Vector3(...to.position);

      // Bow the cable sideways so it curves around the desk instead of cutting
      // straight through whatever sits between the two objects.
      const mid = a.clone().lerp(b, 0.5);
      const perpendicular = new THREE.Vector3()
        .subVectors(b, a)
        .normalize()
        .cross(new THREE.Vector3(0, 1, 0))
        .multiplyScalar(bow);

      const curve = new THREE.CatmullRomCurve3([
        a.clone().setY(0.02),
        a
          .clone()
          .lerp(mid, 0.5)
          .add(perpendicular.clone().multiplyScalar(0.6))
          .setY(0.014),
        mid.add(perpendicular).setY(0.012),
        b
          .clone()
          .lerp(mid, 0.5)
          .add(perpendicular.clone().multiplyScalar(0.6))
          .setY(0.014),
        b.clone().setY(0.02),
      ]);

      return [new THREE.TubeGeometry(curve, 48, 0.011, 7, false)];
    });
  }, [layout]);

  // Geometries are rebuilt only when the layout changes, and disposed with it.
  return (
    <group>
      {curves.map((geometry) => (
        <mesh key={geometry.uuid} geometry={geometry}>
          <meshStandardMaterial {...SURFACE.rubber} />
        </mesh>
      ))}
    </group>
  );
}
