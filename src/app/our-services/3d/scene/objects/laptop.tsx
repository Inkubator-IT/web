"use client";

import { RoundedBox } from "@react-three/drei";
import { BRAND } from "../../config";
import { Emissive, Surface } from "./materials";

const W = 0.98;
const D = 0.68;

/** Website Development — an open laptop showing a wireframe. */
export function Laptop() {
  return (
    <group>
      {/* Base */}
      <RoundedBox
        args={[W, 0.032, D]}
        radius={0.012}
        smoothness={3}
        position={[0, 0.016, 0]}
      >
        <Surface kind="body" />
      </RoundedBox>

      {/* Keyboard well */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.033, 0.03]}>
        <planeGeometry args={[W - 0.14, D - 0.28]} />
        <Surface kind="bodyDark" />
      </mesh>
      {/* Trackpad */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.034, D / 2 - 0.13]}>
        <planeGeometry args={[0.26, 0.16]} />
        <meshStandardMaterial color="#2f2f38" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* Lid: built extending along +Y, so this angle is the lean back from
          upright rather than the opening angle from the base. */}
      <group position={[0, 0.03, -D / 2 + 0.02]} rotation={[-0.28, 0, 0]}>
        <RoundedBox
          args={[W, 0.6, 0.022]}
          radius={0.009}
          smoothness={3}
          position={[0, 0.3, 0]}
        >
          <Surface kind="body" />
        </RoundedBox>

        {/* Display */}
        <mesh position={[0, 0.3, 0.013]}>
          <planeGeometry args={[W - 0.06, 0.54]} />
          <Emissive color={BRAND.purple} power={0.5} />
        </mesh>

        {/* Wireframe blocks on the display — reads as a layout in progress */}
        <mesh position={[0, 0.5, 0.015]}>
          <planeGeometry args={[W - 0.12, 0.05]} />
          <Emissive color={BRAND.orange} power={1.5} />
        </mesh>
        <mesh position={[-0.26, 0.36, 0.015]}>
          <planeGeometry args={[0.36, 0.16]} />
          <Emissive color={BRAND.purpleBright} power={1.2} />
        </mesh>
        <mesh position={[0.16, 0.36, 0.015]}>
          <planeGeometry args={[0.4, 0.16]} />
          <Emissive color={BRAND.purpleBright} power={0.8} />
        </mesh>
        <mesh position={[0, 0.16, 0.015]}>
          <planeGeometry args={[W - 0.12, 0.1]} />
          <Emissive color={BRAND.purpleBright} power={0.6} />
        </mesh>
      </group>
    </group>
  );
}
