"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";
import { BRAND } from "../../config";
import { Emissive, Surface } from "./materials";

const W = 0.54;
const D = 0.38;

/** IoT Solutions — a microcontroller board with a sensor module wired to it. */
export function IotBoard({ animate = true }: { animate?: boolean }) {
  const heartbeat = useRef<THREE.MeshStandardMaterial>(null);

  // A status LED that actually blinks does more for "this thing is alive"
  // than any amount of extra geometry.
  useFrame((state) => {
    if (!animate || !heartbeat.current) return;
    const t = state.clock.elapsedTime;
    const pulse = Math.sin(t * 3.4) * 0.5 + 0.5;
    heartbeat.current.emissiveIntensity = 0.35 + pulse * 2.6;
  });

  return (
    <group>
      {/* PCB */}
      <RoundedBox
        args={[W, 0.018, D]}
        radius={0.008}
        smoothness={3}
        position={[0, 0.022, 0]}
      >
        <Surface kind="board" />
      </RoundedBox>

      {/* Standoffs */}
      {[
        [-W / 2 + 0.04, -D / 2 + 0.04],
        [W / 2 - 0.04, -D / 2 + 0.04],
        [-W / 2 + 0.04, D / 2 - 0.04],
        [W / 2 - 0.04, D / 2 - 0.04],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.007, z]}>
          <cylinderGeometry args={[0.014, 0.014, 0.014, 12]} />
          <Surface kind="metal" />
        </mesh>
      ))}

      {/* Main SoC */}
      <RoundedBox
        args={[0.16, 0.024, 0.16]}
        radius={0.006}
        smoothness={2}
        position={[-0.08, 0.043, 0.02]}
      >
        <meshStandardMaterial color="#0f0f14" roughness={0.4} metalness={0.5} />
      </RoundedBox>

      {/* Shielded radio can */}
      <RoundedBox
        args={[0.13, 0.02, 0.1]}
        radius={0.005}
        smoothness={2}
        position={[0.14, 0.041, -0.09]}
      >
        <Surface kind="metal" />
      </RoundedBox>

      {/* Pin headers down both long edges */}
      {[-1, 1].map((side) =>
        Array.from({ length: 10 }, (_, i) => {
          const x = -W / 2 + 0.07 + i * 0.045;
          const z = side * (D / 2 - 0.035);
          return (
            <mesh
              key={`header-${x.toFixed(3)}-${z.toFixed(3)}`}
              position={[x, 0.042, z]}
            >
              <boxGeometry args={[0.012, 0.022, 0.012]} />
              <meshStandardMaterial
                color="#c9a227"
                roughness={0.3}
                metalness={0.9}
              />
            </mesh>
          );
        }),
      )}

      {/* Electrolytic capacitors */}
      {[
        [-0.2, -0.11],
        [-0.15, -0.12],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.052, z]}>
          <cylinderGeometry args={[0.018, 0.018, 0.042, 14]} />
          <meshStandardMaterial
            color="#2b2b38"
            roughness={0.35}
            metalness={0.75}
          />
        </mesh>
      ))}

      {/* Surface-mount resistors scattered across the board */}
      {[
        [0.02, 0.12],
        [0.06, 0.13],
        [0.1, 0.12],
        [-0.02, -0.14],
        [0.02, -0.14],
        [0.2, -0.02],
        [0.22, 0.02],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.034, z]}>
          <boxGeometry args={[0.018, 0.008, 0.01]} />
          <meshStandardMaterial
            color="#3d3020"
            roughness={0.6}
            metalness={0.4}
          />
        </mesh>
      ))}

      {/* Crystal oscillator */}
      <mesh position={[-0.19, 0.038, 0.05]}>
        <boxGeometry args={[0.05, 0.016, 0.026]} />
        <meshStandardMaterial
          color="#6a6a78"
          roughness={0.25}
          metalness={0.95}
        />
      </mesh>

      {/* USB port */}
      <mesh position={[-W / 2 + 0.02, 0.04, 0.09]}>
        <boxGeometry args={[0.05, 0.026, 0.06]} />
        <Surface kind="metal" />
      </mesh>

      {/* Status LEDs — one steady, one blinking */}
      <mesh position={[0.19, 0.033, 0.09]}>
        <cylinderGeometry args={[0.011, 0.011, 0.008, 12]} />
        <Emissive color={BRAND.purpleBright} power={1.6} />
      </mesh>
      <mesh position={[0.19, 0.033, 0.13]}>
        <cylinderGeometry args={[0.011, 0.011, 0.008, 12]} />
        <meshStandardMaterial
          ref={heartbeat}
          color="#0b0b12"
          emissive={BRAND.orange}
          emissiveIntensity={1.4}
          toneMapped={false}
          roughness={0.25}
        />
      </mesh>

      {/* Sensor module sitting alongside, on its own little board */}
      <group position={[0.12, 0, 0.24]} rotation={[0, -0.35, 0]}>
        <RoundedBox
          args={[0.18, 0.014, 0.12]}
          radius={0.006}
          position={[0, 0.02, 0]}
        >
          <Surface kind="board" />
        </RoundedBox>
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.035, 0.038, 0.036, 20]} />
          <Surface kind="bodyDark" />
        </mesh>
        <mesh position={[0, 0.064, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.004, 20]} />
          <Emissive color={BRAND.purple} power={1.8} />
        </mesh>
      </group>
    </group>
  );
}
