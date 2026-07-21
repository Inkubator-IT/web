"use client";

import { RoundedBox } from "@react-three/drei";
import { BRAND } from "../../config";
import { Emissive, Surface } from "./materials";

const PANEL_W = 1.16;
const PANEL_H = 0.66;

/** Desktop Applications — a monitor on a stand with a small tower beside it. */
export function Monitor() {
  return (
    <group>
      {/* Stand: foot, neck, then the panel tilted back a touch */}
      <mesh position={[0, 0.012, 0.08]}>
        <cylinderGeometry args={[0.22, 0.25, 0.024, 32]} />
        <Surface kind="metal" />
      </mesh>
      <mesh position={[0, 0.11, 0.05]} rotation={[0.12, 0, 0]}>
        <boxGeometry args={[0.08, 0.2, 0.05]} />
        <Surface kind="metal" />
      </mesh>

      <group position={[0, 0.2 + PANEL_H / 2, 0]} rotation={[-0.1, 0, 0]}>
        <RoundedBox
          args={[PANEL_W, PANEL_H, 0.038]}
          radius={0.014}
          smoothness={3}
        >
          <Surface kind="body" />
        </RoundedBox>

        <mesh position={[0, 0.005, 0.021]}>
          <planeGeometry args={[PANEL_W - 0.05, PANEL_H - 0.07]} />
          <Emissive color={BRAND.purple} power={0.45} />
        </mesh>

        {/* An application window: title bar, sidebar, content */}
        <mesh position={[0, 0.25, 0.023]}>
          <planeGeometry args={[PANEL_W - 0.12, 0.045]} />
          <Emissive color={BRAND.orange} power={1.4} />
        </mesh>
        <mesh position={[-0.42, 0.06, 0.023]}>
          <planeGeometry args={[0.24, 0.35]} />
          <Emissive color={BRAND.purpleBright} power={1.1} />
        </mesh>
        <mesh position={[0.13, 0.12, 0.023]}>
          <planeGeometry args={[0.62, 0.11]} />
          <Emissive color={BRAND.purpleBright} power={0.7} />
        </mesh>
        <mesh position={[0.13, -0.05, 0.023]}>
          <planeGeometry args={[0.62, 0.18]} />
          <Emissive color={BRAND.purpleBright} power={0.45} />
        </mesh>
        <mesh position={[0, -0.24, 0.023]}>
          <planeGeometry args={[PANEL_W - 0.12, 0.05]} />
          <Emissive color={BRAND.sand} power={0.9} />
        </mesh>
      </group>

      {/* Tower */}
      <group position={[0.86, 0, -0.06]} rotation={[0, -0.28, 0]}>
        <RoundedBox
          args={[0.24, 0.46, 0.44]}
          radius={0.016}
          smoothness={3}
          position={[0, 0.23, 0]}
        >
          <Surface kind="body" />
        </RoundedBox>
        {/* Vent slot and power light */}
        <mesh position={[0.121, 0.3, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.3, 0.11]} />
          <Emissive color={BRAND.purple} power={0.9} />
        </mesh>
        <mesh position={[0.121, 0.1, 0.12]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.017, 16]} />
          <Emissive color={BRAND.orange} power={2.4} />
        </mesh>
      </group>
    </group>
  );
}
