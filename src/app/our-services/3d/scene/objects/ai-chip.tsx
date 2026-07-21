"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { BRAND } from "../../config";
import { Emissive, Surface } from "./materials";

/** AI/ML Solutions — a processor hovering over a pedestal, ringed by data motes. */
export function AiChip({
  animate = true,
  tier = "high",
}: {
  animate?: boolean;
  tier?: "high" | "low";
}) {
  const chip = useRef<THREE.Group>(null);
  const motes = useRef<THREE.InstancedMesh>(null);
  const scratch = useMemo(() => new THREE.Object3D(), []);
  const orbitCount = tier === "high" ? 14 : 7;

  // One instanced mesh for all the orbiting motes — 14 separate meshes would be
  // 14 draw calls for what is visually a single effect.
  const orbits = useMemo(
    () =>
      Array.from({ length: orbitCount }, (_, i) => ({
        radius: 0.13 + (i % 3) * 0.045,
        speed: 0.5 + (i % 4) * 0.22,
        phase: (i / orbitCount) * Math.PI * 2,
        height: 0.17 + Math.sin(i * 2.4) * 0.05,
        tilt: (i % 2 === 0 ? 1 : -1) * 0.35,
      })),
    [orbitCount],
  );

  useFrame((state) => {
    const t = animate ? state.clock.elapsedTime : 0;

    if (chip.current) {
      chip.current.rotation.y = t * 0.35;
      chip.current.position.y = 0.2 + Math.sin(t * 1.2) * 0.012;
    }

    const mesh = motes.current;
    if (!mesh) return;

    orbits.forEach((orbit, i) => {
      const angle = orbit.phase + t * orbit.speed;
      scratch.position.set(
        Math.cos(angle) * orbit.radius,
        orbit.height + Math.sin(angle * 2) * orbit.tilt * 0.12,
        Math.sin(angle) * orbit.radius,
      );
      scratch.scale.setScalar(0.6 + Math.sin(angle * 3) * 0.25);
      scratch.updateMatrix();
      mesh.setMatrixAt(i, scratch.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Pedestal */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.17, 0.2, 0.06, 32]} />
        <Surface kind="body" />
      </mesh>
      <mesh position={[0, 0.062, 0]}>
        <cylinderGeometry args={[0.145, 0.145, 0.006, 32]} />
        <Emissive color={BRAND.purple} power={1.3} />
      </mesh>
      {/* Column of light between pedestal and chip */}
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.035, 0.06, 0.13, 20, 1, true]} />
        <meshStandardMaterial
          color={BRAND.purpleBright}
          emissive={BRAND.purpleBright}
          emissiveIntensity={0.9}
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <group ref={chip} position={[0, 0.2, 0]}>
        <RoundedBox args={[0.19, 0.032, 0.19]} radius={0.008} smoothness={3}>
          <meshStandardMaterial
            color="#101018"
            roughness={0.32}
            metalness={0.72}
          />
        </RoundedBox>
        {/* Heatsink fins across the package */}
        {Array.from({ length: 7 }, (_, i) => {
          const x = -0.072 + i * 0.024;
          return (
            <mesh key={x.toFixed(3)} position={[x, 0.03, 0]}>
              <boxGeometry args={[0.008, 0.026, 0.15]} />
              <meshStandardMaterial
                color="#5a5a68"
                roughness={0.24}
                metalness={0.95}
              />
            </mesh>
          );
        })}

        {/* Die on top */}
        <mesh position={[0, 0.018, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.1, 0.1]} />
          <Emissive color={BRAND.orange} power={1.7} />
        </mesh>
        {/* Traces running out to the package edges */}
        {[0, 1, 2, 3].map((side) => (
          <mesh
            key={side}
            position={[0, 0.017, 0]}
            rotation={[-Math.PI / 2, 0, (side * Math.PI) / 2]}
          >
            <planeGeometry args={[0.016, 0.185]} />
            <Emissive color={BRAND.purpleBright} power={1.2} />
          </mesh>
        ))}
        {/* Contact pins around the package */}
        {Array.from({ length: 4 }, (_, side) =>
          Array.from({ length: 5 }, (_, i) => {
            const offset = -0.07 + i * 0.035;
            const angle = (side * Math.PI) / 2;
            return (
              <mesh
                key={`pin-${angle.toFixed(2)}-${offset.toFixed(3)}`}
                position={[
                  Math.cos(angle) * 0.103 - Math.sin(angle) * offset,
                  -0.004,
                  Math.sin(angle) * 0.103 + Math.cos(angle) * offset,
                ]}
                rotation={[0, angle, 0]}
              >
                <boxGeometry args={[0.022, 0.008, 0.012]} />
                <Surface kind="metal" />
              </mesh>
            );
          }),
        )}
      </group>

      <instancedMesh
        ref={motes}
        key={orbitCount}
        args={[undefined, undefined, orbitCount]}
        frustumCulled={false}
      >
        <sphereGeometry args={[0.014, 8, 8]} />
        <Emissive color={BRAND.sand} power={2.4} />
      </instancedMesh>
    </group>
  );
}
