"use client";

import { Billboard } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";
import { BRAND } from "../config";

/**
 * The "this can be hovered" marker: a pulsing ring with a dot at its centre,
 * always facing the camera. Without it users have to guess which shapes on the
 * desk are interactive.
 */
export function Hotspot({
  active,
  animate,
}: {
  active: boolean;
  animate: boolean;
}) {
  const ring = useRef<THREE.Mesh>(null);
  const ringMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const dotMaterial = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state, delta) => {
    if (!ring.current || !ringMaterial.current || !dotMaterial.current) return;

    const t = animate ? state.clock.elapsedTime : 0;
    // A slow breath at rest; on hover the ring snaps open and holds steady.
    const breath = animate ? Math.sin(t * 2.1) * 0.5 + 0.5 : 0.5;
    const targetScale = active ? 1.55 : 0.85 + breath * 0.18;
    const targetRingOpacity = active ? 1 : 0.34 + breath * 0.26;
    const targetDotOpacity = active ? 1 : 0.55 + breath * 0.3;

    const damping = 1 - Math.exp(-9 * Math.min(delta, 0.1));
    const scale =
      ring.current.scale.x + (targetScale - ring.current.scale.x) * damping;
    ring.current.scale.setScalar(scale);

    ringMaterial.current.opacity +=
      (targetRingOpacity - ringMaterial.current.opacity) * damping;
    dotMaterial.current.opacity +=
      (targetDotOpacity - dotMaterial.current.opacity) * damping;
  });

  return (
    <Billboard>
      <mesh ref={ring}>
        <ringGeometry args={[0.052, 0.064, 32]} />
        <meshBasicMaterial
          ref={ringMaterial}
          color={active ? BRAND.orange : BRAND.purpleBright}
          transparent
          opacity={0.5}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <circleGeometry args={[0.019, 20]} />
        <meshBasicMaterial
          ref={dotMaterial}
          color={active ? BRAND.orange : BRAND.sand}
          transparent
          opacity={0.8}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </Billboard>
  );
}
