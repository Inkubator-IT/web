"use client";

import { ContactShadows, RoundedBox } from "@react-three/drei";
import { BRAND, type DeskLayout } from "../config";

const TOP_THICKNESS = 0.16;
/** Recessed rail under the top, which is what gives the slab its thickness. */
const APRON_HEIGHT = 0.3;
const APRON_INSET = 0.16;

/**
 * The desk: a thick chamfered top whose surface sits at y = 0, over a recessed
 * apron that reads as the slab's side profile.
 *
 * There are deliberately no legs and no floor. A floor plane fills the
 * background and reads as a wall behind the desk, which flattens the scene;
 * letting the slab sit against the page's own dark background keeps the depth.
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
      {/* Table top */}
      <RoundedBox
        args={[width, TOP_THICKNESS, depth]}
        radius={0.022}
        smoothness={4}
        position={[0, -TOP_THICKNESS / 2, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color={BRAND.deskTop}
          roughness={0.58}
          metalness={0.22}
        />
      </RoundedBox>

      {/* Bright chamfer catching the key light along the very edge of the top */}
      <RoundedBox
        args={[width - 0.012, 0.032, depth - 0.012]}
        radius={0.012}
        smoothness={3}
        position={[0, -TOP_THICKNESS + 0.016, 0]}
      >
        <meshStandardMaterial
          color="#3a3a46"
          roughness={0.28}
          metalness={0.7}
        />
      </RoundedBox>

      {/* Apron. Its faces point sideways so they catch far less light than the
          top — the colour is set close to the top's on purpose, because it
          still renders a clear step darker while staying off the background. */}
      <mesh position={[0, -TOP_THICKNESS - APRON_HEIGHT / 2, 0]}>
        <boxGeometry
          args={[width - APRON_INSET, APRON_HEIGHT, depth - APRON_INSET]}
        />
        <meshStandardMaterial
          color={BRAND.deskEdge}
          roughness={0.52}
          metalness={0.45}
        />
      </mesh>

      {/* Desk mat: a slightly lighter inset panel, lifted a hair to avoid
          z-fighting. This is the surface that catches the objects' shadows. */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.001, 0]}
        receiveShadow
        raycast={() => null}
      >
        <planeGeometry args={[width - 0.5, depth - 0.42]} />
        <meshStandardMaterial
          color={BRAND.deskPad}
          roughness={0.95}
          metalness={0}
        />
      </mesh>

      {/* Ambient contact darkening where objects meet the surface. The
          directional light does the real shadow work now, so this is only
          closing the gap underneath — it is kept at a low resolution on
          purpose, because it re-renders every frame and a large map here was
          costing more than the shadow map itself. */}
      <ContactShadows
        position={[0, 0.004, 0]}
        scale={Math.max(width, depth) * 1.3}
        resolution={512}
        blur={2.2}
        opacity={tier === "high" ? 0.45 : 0.72}
        far={0.5}
        frames={tier === "high" ? Infinity : 1}
        color="#000000"
      />
    </group>
  );
}
