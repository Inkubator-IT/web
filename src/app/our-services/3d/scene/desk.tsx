"use client";

import { ContactShadows, RoundedBox } from "@react-three/drei";
import { BRAND, type DeskLayout } from "../config";

const TOP_THICKNESS = 0.14;

/**
 * The desk itself: a rounded slab whose top face sits exactly at y = 0, an
 * inset mat to break up the surface, and blurred contact shadows standing in
 * for real-time shadow maps.
 */
export function Desk({
  layout,
  tier,
}: {
  layout: DeskLayout;
  tier: "high" | "low";
}) {
  const { width, depth } = layout.desk;

  return (
    <group>
      <RoundedBox
        args={[width, TOP_THICKNESS, depth]}
        radius={0.035}
        smoothness={4}
        position={[0, -TOP_THICKNESS / 2, 0]}
        castShadow={false}
        receiveShadow={false}
      >
        <meshStandardMaterial
          color={BRAND.deskTop}
          roughness={0.62}
          metalness={0.18}
        />
      </RoundedBox>

      {/* Thin lip just under the top edge — reads as a chamfer from above. */}
      <RoundedBox
        args={[width - 0.06, 0.1, depth - 0.06]}
        radius={0.03}
        smoothness={3}
        position={[0, -TOP_THICKNESS - 0.04, 0]}
      >
        <meshStandardMaterial
          color={BRAND.deskEdge}
          roughness={0.85}
          metalness={0.05}
        />
      </RoundedBox>

      {/* Desk mat: a slightly darker inset panel, lifted a hair to avoid z-fighting. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[width - 0.5, depth - 0.42]} />
        <meshStandardMaterial
          color={BRAND.deskPad}
          roughness={0.95}
          metalness={0}
        />
      </mesh>

      <ContactShadows
        position={[0, 0.004, 0]}
        scale={Math.max(width, depth) * 1.3}
        resolution={tier === "high" ? 1024 : 512}
        blur={2.4}
        opacity={0.7}
        far={1.2}
        frames={tier === "high" ? Infinity : 1}
        color="#000000"
      />
    </group>
  );
}
