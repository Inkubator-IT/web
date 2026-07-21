"use client";

import { RoundedBox } from "@react-three/drei";
import { BRAND } from "../../config";
import { Emissive, Surface } from "./materials";

/** Games Development — a gamepad, seen from above. */
export function GameController() {
  return (
    <group position={[0, 0.06, 0]}>
      {/* Central body */}
      <RoundedBox args={[0.36, 0.09, 0.22]} radius={0.042} smoothness={5}>
        <Surface kind="body" />
      </RoundedBox>

      {/* Grips, swept back and down */}
      {[-1, 1].map((side) => (
        <group
          key={side}
          position={[side * 0.19, -0.012, 0.08]}
          rotation={[0.42, side * -0.32, side * 0.24]}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.048, 0.17, 6, 14]} />
            <Surface kind="rubber" />
          </mesh>
        </group>
      ))}

      {/* Shoulder bumpers */}
      {[-1, 1].map((side) => (
        <RoundedBox
          key={side}
          args={[0.1, 0.045, 0.05]}
          radius={0.018}
          smoothness={4}
          position={[side * 0.14, 0.03, -0.11]}
        >
          <Surface kind="bodyDark" />
        </RoundedBox>
      ))}

      {/* Thumbsticks */}
      {[-0.1, 0.1].map((x) => (
        <group key={x} position={[x, 0.045, 0.045]}>
          <mesh>
            <cylinderGeometry args={[0.032, 0.036, 0.022, 20]} />
            <Surface kind="bodyDark" />
          </mesh>
          <mesh position={[0, 0.018, 0]}>
            <cylinderGeometry args={[0.026, 0.022, 0.02, 20]} />
            <Surface kind="rubber" />
          </mesh>
        </group>
      ))}

      {/* D-pad */}
      <group position={[-0.1, 0.048, -0.045]}>
        <mesh>
          <boxGeometry args={[0.075, 0.014, 0.022]} />
          <Surface kind="bodyDark" />
        </mesh>
        <mesh>
          <boxGeometry args={[0.022, 0.014, 0.075]} />
          <Surface kind="bodyDark" />
        </mesh>
      </group>

      {/* Face buttons, lit in the brand palette */}
      {[
        { pos: [0.1, 0.048, -0.078] as const, tone: BRAND.orange },
        { pos: [0.138, 0.048, -0.045] as const, tone: BRAND.sand },
        { pos: [0.062, 0.048, -0.045] as const, tone: BRAND.purpleBright },
        { pos: [0.1, 0.048, -0.012] as const, tone: BRAND.purple },
      ].map(({ pos, tone }) => (
        <mesh key={`${pos[0]}-${pos[2]}`} position={pos}>
          <cylinderGeometry args={[0.017, 0.017, 0.012, 16]} />
          <Emissive color={tone} power={1.5} />
        </mesh>
      ))}

      {/* Home light strip */}
      <mesh position={[0, 0.046, -0.032]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.06, 0.012]} />
        <Emissive color={BRAND.purpleBright} power={2} />
      </mesh>
    </group>
  );
}
