"use client";

import { RoundedBox } from "@react-three/drei";
import { BRAND } from "../../config";
import { Emissive, Surface } from "./materials";

const W = 0.3;
const L = 0.62;

/** Mobile Applications — a phone face-up on the desk, screen awake. */
export function Smartphone() {
  return (
    <group>
      <RoundedBox
        args={[W, 0.022, L]}
        radius={0.01}
        smoothness={5}
        position={[0, 0.011, 0]}
      >
        <Surface kind="body" />
      </RoundedBox>

      {/* Screen */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0232, 0]}>
        <planeGeometry args={[W - 0.028, L - 0.03]} />
        <Emissive color={BRAND.purple} power={0.55} />
      </mesh>

      {/* App UI: status bar, hero card, list rows, tab bar */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.0242, -L / 2 + 0.07]}
      >
        <planeGeometry args={[W - 0.07, 0.028]} />
        <Emissive color={BRAND.orange} power={1.6} />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.0242, -L / 2 + 0.17]}
      >
        <planeGeometry args={[W - 0.06, 0.12]} />
        <Emissive color={BRAND.purpleBright} power={1.2} />
      </mesh>
      {[0, 1, 2].map((row) => (
        <mesh
          key={row}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.0242, -L / 2 + 0.3 + row * 0.075]}
        >
          <planeGeometry args={[W - 0.06, 0.05]} />
          <Emissive color={BRAND.purpleBright} power={0.55} />
        </mesh>
      ))}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.0242, L / 2 - 0.05]}
      >
        <planeGeometry args={[W - 0.05, 0.035]} />
        <Emissive color={BRAND.sand} power={1} />
      </mesh>

      {/* Camera bump on the back edge, just visible from above */}
      <RoundedBox
        args={[0.075, 0.008, 0.075]}
        radius={0.0035}
        smoothness={4}
        position={[-W / 2 + 0.07, 0.0005, -L / 2 + 0.07]}
      >
        <Surface kind="metal" />
      </RoundedBox>
    </group>
  );
}
