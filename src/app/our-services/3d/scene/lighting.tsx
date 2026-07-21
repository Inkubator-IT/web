"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { BRAND } from "../config";

/**
 * All lighting is generated in-scene.
 *
 * `Environment` normally streams an HDRI from a CDN; this page is a static
 * export, so the environment map is instead baked once from the Lightformers
 * below. Nothing here touches the network.
 */
export function Lighting({ tier }: { tier: "high" | "low" }) {
  return (
    <>
      <ambientLight intensity={0.35} />

      {/* Key light, warm, from the upper right — casts the contact shadows. */}
      <directionalLight
        position={[3.5, 6, 2.5]}
        intensity={1.5}
        color="#fff3e2"
      />
      {/* Cool fill from the opposite side so shadowed faces keep some colour. */}
      <directionalLight
        position={[-4, 3, -2]}
        intensity={0.55}
        color={BRAND.purple}
      />

      <Environment
        resolution={tier === "high" ? 256 : 128}
        frames={1}
        background={false}
      >
        <color attach="background" args={[BRAND.backdrop]} />

        {/* Broad softbox overhead — the main source of the surface sheen. */}
        <Lightformer
          form="rect"
          intensity={2.2}
          position={[0, 6, 1]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[10, 8, 1]}
          color="#ffffff"
        />
        {/* Brand rims: purple along one edge, orange along the other. */}
        <Lightformer
          form="rect"
          intensity={3.5}
          position={[-5, 2.5, 1]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[8, 3, 1]}
          color={BRAND.purple}
        />
        <Lightformer
          form="rect"
          intensity={3}
          position={[5, 2.5, -1]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[8, 3, 1]}
          color={BRAND.orange}
        />
        <Lightformer
          form="circle"
          intensity={1.6}
          position={[0, 3, -6]}
          scale={5}
          color={BRAND.purpleBright}
        />
      </Environment>
    </>
  );
}
