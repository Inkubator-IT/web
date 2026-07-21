"use client";

import { RoundedBox } from "@react-three/drei";
import { BRAND } from "../../config";
import { Emissive, Surface } from "./materials";

const PANEL_W = 1.16;
const PANEL_H = 0.66;

/** Desktop Applications — a monitor on a stand with a tower beside it. */
export function Monitor() {
  return (
    <group>
      {/* Stand: weighted foot, neck, then the panel tilted back a touch */}
      <mesh position={[0, 0.012, 0.08]}>
        <cylinderGeometry args={[0.2, 0.25, 0.024, 40]} />
        <Surface kind="metal" />
      </mesh>
      <mesh position={[0, 0.026, 0.08]}>
        <cylinderGeometry args={[0.15, 0.17, 0.008, 40]} />
        <meshStandardMaterial color="#22222a" roughness={0.5} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.11, 0.05]} rotation={[0.12, 0, 0]}>
        <boxGeometry args={[0.075, 0.2, 0.045]} />
        <Surface kind="metal" />
      </mesh>
      {/* Cable pass-through slot in the neck */}
      <mesh position={[0, 0.115, 0.032]} rotation={[0.12, 0, 0]}>
        <planeGeometry args={[0.03, 0.06]} />
        <meshStandardMaterial color="#0a0a0e" roughness={0.9} />
      </mesh>

      <group position={[0, 0.2 + PANEL_H / 2, 0]} rotation={[-0.1, 0, 0]}>
        <RoundedBox
          args={[PANEL_W, PANEL_H, 0.04]}
          radius={0.014}
          smoothness={4}
        >
          <Surface kind="body" />
        </RoundedBox>

        {/* Bezel then panel */}
        <mesh position={[0, 0, 0.0206]}>
          <planeGeometry args={[PANEL_W - 0.022, PANEL_H - 0.022]} />
          <meshStandardMaterial
            color="#08080c"
            roughness={0.32}
            metalness={0.45}
          />
        </mesh>
        <mesh position={[0, 0.012, 0.0212]}>
          <planeGeometry args={[PANEL_W - 0.06, PANEL_H - 0.075]} />
          <Emissive color={BRAND.purple} power={0.4} />
        </mesh>

        {/* An IDE-ish window: title bar, sidebar tree, code lines, status bar */}
        <mesh position={[0, 0.256, 0.0222]}>
          <planeGeometry args={[PANEL_W - 0.06, 0.04]} />
          <Emissive color={BRAND.orange} power={1.4} />
        </mesh>
        <mesh position={[-0.42, 0.05, 0.0222]}>
          <planeGeometry args={[0.22, 0.37]} />
          <Emissive color="#2a2a3c" power={0.8} />
        </mesh>
        {[0.19, 0.13, 0.07, 0.01, -0.05, -0.11].map((y, i) => (
          <mesh key={y} position={[-0.42 - (i % 2) * 0.02, y, 0.0228]}>
            <planeGeometry args={[0.15 - (i % 3) * 0.03, 0.016]} />
            <Emissive color={BRAND.purpleBright} power={1.1} />
          </mesh>
        ))}
        {/* Code lines of varying length */}
        {[0.2, 0.155, 0.11, 0.065, 0.02, -0.025, -0.07, -0.115].map((y, i) => (
          <mesh
            key={y}
            position={[0.1 - (0.62 - (0.24 + (i % 4) * 0.12)) / 2, y, 0.0228]}
          >
            <planeGeometry args={[0.24 + (i % 4) * 0.12, 0.017]} />
            <Emissive
              color={i % 3 === 0 ? BRAND.sand : BRAND.purpleBright}
              power={i % 3 === 0 ? 1.1 : 0.7}
            />
          </mesh>
        ))}
        <mesh position={[0, -0.24, 0.0222]}>
          <planeGeometry args={[PANEL_W - 0.06, 0.032]} />
          <Emissive color={BRAND.sand} power={0.85} />
        </mesh>

        {/* Power LED under the bezel */}
        <mesh position={[0.48, -0.305, 0.0215]}>
          <circleGeometry args={[0.008, 12]} />
          <Emissive color={BRAND.orange} power={2.6} />
        </mesh>
      </group>

      {/* Tower */}
      <group position={[0.86, 0, -0.06]} rotation={[0, -0.28, 0]}>
        <RoundedBox
          args={[0.25, 0.48, 0.45]}
          radius={0.016}
          smoothness={3}
          position={[0, 0.24, 0]}
        >
          <Surface kind="body" />
        </RoundedBox>

        {/* Tempered side panel showing a lit interior */}
        <mesh position={[-0.126, 0.24, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.38, 0.4]} />
          <meshStandardMaterial
            color="#0d0d16"
            roughness={0.12}
            metalness={0.55}
            transparent
            opacity={0.92}
          />
        </mesh>
        <mesh position={[-0.129, 0.3, 0.06]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.16, 0.03]} />
          <Emissive color={BRAND.purpleBright} power={1.6} />
        </mesh>
        <mesh position={[-0.129, 0.17, -0.02]} rotation={[0, -Math.PI / 2, 0]}>
          <circleGeometry args={[0.055, 24]} />
          <Emissive color={BRAND.purple} power={1.2} />
        </mesh>

        {/* Front intake mesh and I/O */}
        {[0.36, 0.3, 0.24, 0.18].map((y) => (
          <mesh key={y} position={[0.126, y, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.3, 0.022]} />
            <Emissive color={BRAND.purple} power={0.55} />
          </mesh>
        ))}
        <mesh position={[0.126, 0.09, 0.13]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.016, 16]} />
          <Emissive color={BRAND.orange} power={2.4} />
        </mesh>
        <mesh position={[0.126, 0.09, 0.06]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.05, 0.022]} />
          <meshStandardMaterial color="#0a0a0e" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
