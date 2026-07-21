"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import type { DeskLayout } from "../config";

/**
 * Which objects are wired to which, and how far the run bows sideways.
 * These are what make the desk read as one working setup rather than eight
 * props placed near each other.
 */
const LINKS: Array<[from: string, to: string, bow: number]> = [
  ["desktop-applications", "website-development", 0.55],
  ["iot", "website-development", -0.4],
  ["ar-vr", "desktop-applications", 0.45],
  ["games-development", "desktop-applications", -0.5],
];

/** Cable lies on the desk at this height; slack lifts it slightly between. */
const REST_Y = 0.014;

interface Cable {
  tube: THREE.TubeGeometry;
  ends: Array<{ position: THREE.Vector3; quaternion: THREE.Quaternion }>;
}

export function Cables({ layout }: { layout: DeskLayout }) {
  const cables = useMemo<Cable[]>(() => {
    const at = (id: string) => layout.slots.find((slot) => slot.id === id);
    const up = new THREE.Vector3(0, 1, 0);

    return LINKS.flatMap(([fromId, toId, bow]) => {
      const from = at(fromId);
      const to = at(toId);
      if (!from || !to) return [];

      const a = new THREE.Vector3(...from.position).setY(REST_Y);
      const b = new THREE.Vector3(...to.position).setY(REST_Y);

      const along = new THREE.Vector3().subVectors(b, a);
      const perpendicular = along
        .clone()
        .normalize()
        .cross(up)
        .multiplyScalar(bow);

      // Bow the run sideways so it curves around whatever sits between the two
      // objects, and let it rise and fall a little along the way: a cable that
      // is perfectly flat and perfectly straight reads as a drawn line.
      const points: THREE.Vector3[] = [];
      const STEPS = 6;
      for (let i = 0; i <= STEPS; i++) {
        const t = i / STEPS;
        const point = a.clone().lerp(b, t);
        // Sideways bow peaks in the middle of the run.
        point.addScaledVector(perpendicular, Math.sin(t * Math.PI));
        // Slack: the cable lifts off the surface between its anchored ends.
        point.y = REST_Y + Math.sin(t * Math.PI) * 0.016;
        // A slow secondary wobble so no two segments are identical.
        point.addScaledVector(
          perpendicular.clone().normalize(),
          Math.sin(t * Math.PI * 2.3) * 0.045,
        );
        points.push(point);
      }

      const curve = new THREE.CatmullRomCurve3(
        points,
        false,
        "catmullrom",
        0.4,
      );
      const tube = new THREE.TubeGeometry(curve, 110, 0.0125, 14, false);

      // Connector shells, oriented along the cable so it plugs in rather than
      // vanishing into the object.
      const ends = [0, 1].map((t) => {
        const position = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          up,
          tangent,
        );
        return { position, quaternion };
      });

      return [{ tube, ends }];
    });
  }, [layout]);

  // These are built by hand rather than by JSX, so R3F will not dispose them
  // for us when the layout changes or the scene unmounts.
  useEffect(
    () => () => {
      for (const cable of cables) cable.tube.dispose();
    },
    [cables],
  );

  return (
    <group>
      {cables.map((cable) => (
        <group key={cable.tube.uuid}>
          {/* Deliberately not a shadow caster: the tube is ~2 texels across
              in the shadow map, which can only ever alias. Its contact with the
              desk is covered by ContactShadows instead. */}
          <mesh geometry={cable.tube} receiveShadow>
            <meshStandardMaterial
              color="#1e1e24"
              roughness={0.42}
              metalness={0.3}
            />
          </mesh>

          {cable.ends.map((end) => (
            <group
              key={`${end.position.x.toFixed(3)}-${end.position.z.toFixed(3)}`}
              position={end.position}
              quaternion={end.quaternion}
            >
              <mesh>
                <cylinderGeometry args={[0.021, 0.021, 0.055, 14]} />
                <meshStandardMaterial
                  color="#2a2a33"
                  roughness={0.35}
                  metalness={0.55}
                />
              </mesh>
              <mesh position={[0, 0.036, 0]}>
                <cylinderGeometry args={[0.014, 0.014, 0.03, 12]} />
                <meshStandardMaterial
                  color="#8f8f9e"
                  roughness={0.22}
                  metalness={0.95}
                />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}
