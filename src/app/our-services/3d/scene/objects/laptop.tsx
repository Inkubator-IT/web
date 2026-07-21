"use client";

import { RoundedBox } from "@react-three/drei";
import { useMemo } from "react";
import { BRAND } from "../../config";
import { Emissive, Surface } from "./materials";

const W = 0.98;
const D = 0.68;
const KEY_COLS = 14;
const KEY_ROWS = 5;

/** Website Development — an open laptop showing a wireframe in progress. */
export function Laptop() {
  // Individual keycaps: the single detail that most separates "a box with a
  // dark rectangle on it" from something that reads as a laptop.
  const keys = useMemo(() => {
    const keyW = 0.049;
    const keyD = 0.038;
    const startX = -((KEY_COLS - 1) * keyW) / 2;
    const startZ = -0.055;
    const out: Array<{ x: number; z: number; w: number }> = [];

    for (let row = 0; row < KEY_ROWS; row++) {
      for (let col = 0; col < KEY_COLS; col++) {
        // Stagger the bottom row into a spacebar plus modifiers.
        if (row === KEY_ROWS - 1) {
          if (col > 3 && col < 10) continue;
        }
        out.push({ x: startX + col * keyW, z: startZ + row * keyD, w: keyW });
      }
    }
    out.push({ x: 0, z: startZ + (KEY_ROWS - 1) * keyD, w: keyW * 5.6 });
    return out;
  }, []);

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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0325, 0.03]}>
        <planeGeometry args={[W - 0.1, D - 0.24]} />
        <Surface kind="bodyDark" />
      </mesh>

      {/* Keycaps */}
      {keys.map((key) => (
        <mesh
          key={`${key.x.toFixed(3)}-${key.z.toFixed(3)}-${key.w.toFixed(3)}`}
          position={[key.x, 0.037, key.z + 0.03]}
        >
          <boxGeometry args={[key.w * 0.82, 0.008, 0.03]} />
          <meshStandardMaterial
            color="#2c2c35"
            roughness={0.66}
            metalness={0.25}
          />
        </mesh>
      ))}

      {/* Trackpad */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.0335, D / 2 - 0.11]}
      >
        <planeGeometry args={[0.28, 0.17]} />
        <meshStandardMaterial
          color="#31313b"
          roughness={0.34}
          metalness={0.5}
        />
      </mesh>

      {/* Speaker grilles either side of the keyboard */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[side * (W / 2 - 0.055), 0.0332, -0.13]}
        >
          <planeGeometry args={[0.06, 0.16]} />
          <meshStandardMaterial
            color="#1a1a20"
            roughness={0.9}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* Ports along the left edge */}
      {[-0.1, 0, 0.1].map((z) => (
        <mesh key={z} position={[-W / 2 + 0.002, 0.017, z]}>
          <boxGeometry args={[0.012, 0.011, 0.05]} />
          <meshStandardMaterial color="#0c0c10" roughness={0.8} />
        </mesh>
      ))}

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

        {/* Bezel, then the panel inset into it */}
        <mesh position={[0, 0.3, 0.0122]}>
          <planeGeometry args={[W - 0.03, 0.575]} />
          <meshStandardMaterial
            color="#0a0a0e"
            roughness={0.35}
            metalness={0.4}
          />
        </mesh>
        <mesh position={[0, 0.305, 0.013]}>
          <planeGeometry args={[W - 0.075, 0.525]} />
          <Emissive color={BRAND.purple} power={0.42} />
        </mesh>

        {/* Browser chrome: traffic lights, address bar */}
        <mesh position={[0, 0.545, 0.0142]}>
          <planeGeometry args={[W - 0.075, 0.042]} />
          <Emissive color="#2b2b3d" power={0.5} />
        </mesh>
        {[-0.42, -0.395, -0.37].map((x) => (
          <mesh key={x} position={[x, 0.545, 0.0148]}>
            <circleGeometry args={[0.007, 12]} />
            <Emissive color={BRAND.orange} power={1.8} />
          </mesh>
        ))}
        <mesh position={[0.04, 0.545, 0.0148]}>
          <planeGeometry args={[0.62, 0.02]} />
          <Emissive color={BRAND.purpleBright} power={0.9} />
        </mesh>

        {/* The wireframe being built: hero, two columns, a row of cards */}
        <mesh position={[0, 0.48, 0.0146]}>
          <planeGeometry args={[W - 0.12, 0.052]} />
          <Emissive color={BRAND.orange} power={1.5} />
        </mesh>
        <mesh position={[-0.245, 0.375, 0.0146]}>
          <planeGeometry args={[0.36, 0.14]} />
          <Emissive color={BRAND.purpleBright} power={1.25} />
        </mesh>
        <mesh position={[0.185, 0.375, 0.0146]}>
          <planeGeometry args={[0.44, 0.14]} />
          <Emissive color={BRAND.purpleBright} power={0.8} />
        </mesh>
        {[-0.29, 0, 0.29].map((x) => (
          <mesh key={x} position={[x, 0.245, 0.0146]}>
            <planeGeometry args={[0.26, 0.08]} />
            <Emissive color={BRAND.purpleBright} power={0.55} />
          </mesh>
        ))}
        <mesh position={[0, 0.145, 0.0146]}>
          <planeGeometry args={[W - 0.12, 0.03]} />
          <Emissive color={BRAND.sand} power={0.75} />
        </mesh>

        {/* Webcam dot above the panel */}
        <mesh position={[0, 0.582, 0.0146]}>
          <circleGeometry args={[0.006, 12]} />
          <meshStandardMaterial
            color="#05050a"
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>

        {/* Hinge barrel */}
        <mesh position={[0, 0.005, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.016, 0.016, W - 0.12, 16]} />
          <Surface kind="metal" />
        </mesh>
      </group>
    </group>
  );
}
