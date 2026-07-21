"use client";

import { RoundedBox } from "@react-three/drei";
import { BRAND } from "../../config";
import { Emissive, Surface } from "./materials";

/** AR/VR Solutions — a headset resting on the desk, lenses facing up-forward. */
export function VrHeadset() {
  return (
    <group position={[0, 0.13, 0]} rotation={[-0.34, 0, 0]}>
      {/* Visor shell */}
      <RoundedBox args={[0.52, 0.25, 0.26]} radius={0.075} smoothness={5}>
        <Surface kind="body" />
      </RoundedBox>

      {/* Glossy front face */}
      <RoundedBox
        args={[0.46, 0.2, 0.03]}
        radius={0.014}
        smoothness={5}
        position={[0, 0.005, 0.135]}
      >
        <meshStandardMaterial
          color="#0e0e14"
          roughness={0.16}
          metalness={0.7}
        />
      </RoundedBox>

      {/* Tracking lights */}
      {[-0.16, 0.16].map((x) => (
        <mesh key={x} position={[x, 0.005, 0.152]}>
          <circleGeometry args={[0.022, 20]} />
          <Emissive color={BRAND.purpleBright} power={2.2} />
        </mesh>
      ))}
      <mesh position={[0, -0.07, 0.152]}>
        <planeGeometry args={[0.2, 0.012]} />
        <Emissive color={BRAND.orange} power={1.8} />
      </mesh>

      {/* Lens cups on the wearer's side */}
      {[-0.115, 0.115].map((x) => (
        <mesh key={x} position={[x, 0, -0.132]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.085, 0.03, 24]} />
          <Surface kind="rubber" />
        </mesh>
      ))}

      {/* Face cushion */}
      <RoundedBox
        args={[0.42, 0.19, 0.05]}
        radius={0.022}
        smoothness={4}
        position={[0, -0.01, -0.15]}
      >
        <Surface kind="rubber" />
      </RoundedBox>

      {/* Head strap, arcing back over the desk */}
      <mesh position={[0, 0.02, -0.32]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.022, 10, 28, Math.PI * 1.15]} />
        <Surface kind="rubber" />
      </mesh>
    </group>
  );
}
