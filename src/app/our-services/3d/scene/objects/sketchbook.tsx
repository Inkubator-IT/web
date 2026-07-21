"use client";

import { RoundedBox } from "@react-three/drei";
import { BRAND } from "../../config";
import { Emissive, Surface } from "./materials";

const PAGE_W = 0.42;
const PAGE_L = 0.56;

/** Design Prototype — an open sketchbook with wireframes, and a pen. */
export function Sketchbook() {
  return (
    <group>
      {/* Cover under both pages */}
      <RoundedBox
        args={[PAGE_W * 2 + 0.05, 0.016, PAGE_L + 0.04]}
        radius={0.008}
        smoothness={3}
        position={[0, 0.008, 0]}
      >
        <meshStandardMaterial
          color="#2a2333"
          roughness={0.85}
          metalness={0.1}
        />
      </RoundedBox>

      {[-1, 1].map((side) => (
        <group key={side} position={[(side * (PAGE_W + 0.02)) / 2, 0, 0]}>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.0175 + side * 0.0008, 0]}
          >
            <planeGeometry args={[PAGE_W, PAGE_L]} />
            <Surface kind="paper" />
          </mesh>
        </group>
      ))}

      {/* Left page: a stacked wireframe sketch */}
      <group position={[-(PAGE_W + 0.02) / 2, 0.019, 0]}>
        <Sketch y={-0.19} w={PAGE_W - 0.1} h={0.05} tone={BRAND.purple} />
        <Sketch y={-0.06} w={PAGE_W - 0.1} h={0.14} tone={BRAND.purple} />
        <Sketch
          y={0.08}
          w={(PAGE_W - 0.13) / 2}
          h={0.08}
          x={-0.08}
          tone={BRAND.purple}
        />
        <Sketch
          y={0.08}
          w={(PAGE_W - 0.13) / 2}
          h={0.08}
          x={0.08}
          tone={BRAND.purple}
        />
        <Sketch y={0.2} w={PAGE_W - 0.16} h={0.04} tone={BRAND.orange} />
      </group>

      {/* Right page: a flow of small linked boxes */}
      <group position={[(PAGE_W + 0.02) / 2, 0.019, 0]}>
        {[-0.18, -0.02, 0.14].map((y, i) => (
          <Sketch
            key={y}
            y={y}
            w={PAGE_W - 0.16}
            h={0.07}
            tone={i === 1 ? BRAND.orange : BRAND.purple}
          />
        ))}
        <Sketch y={-0.1} w={0.006} h={0.06} tone={BRAND.purple} />
        <Sketch y={0.06} w={0.006} h={0.06} tone={BRAND.purple} />
      </group>

      {/* Spiral binding down the centre */}
      {Array.from({ length: 13 }, (_, i) => {
        const z = -PAGE_L / 2 + 0.03 + i * ((PAGE_L - 0.06) / 12);
        return (
          <mesh
            key={z.toFixed(3)}
            position={[0, 0.024, z]}
            rotation={[0, 0, 0]}
          >
            <torusGeometry args={[0.014, 0.0035, 8, 20, Math.PI * 1.5]} />
            <meshStandardMaterial
              color="#8a8a96"
              roughness={0.3}
              metalness={0.92}
            />
          </mesh>
        );
      })}

      {/* Stacked page edges, so the book has thickness rather than one sheet */}
      {[-1, 1].map((side) =>
        [0.0135, 0.0115].map((y) => (
          <mesh
            key={`${side}-${y}`}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[(side * (PAGE_W + 0.02)) / 2 + side * 0.004, y, 0.004]}
          >
            <planeGeometry args={[PAGE_W, PAGE_L]} />
            <meshStandardMaterial
              color="#9a948c"
              roughness={0.95}
              metalness={0}
            />
          </mesh>
        )),
      )}

      {/* Pen resting across the lower edge */}
      <group
        position={[0.12, 0.028, PAGE_L / 2 + 0.05]}
        rotation={[0, 0.42, 0]}
      >
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.44, 16]} />
          <meshStandardMaterial
            color="#2b2b33"
            roughness={0.35}
            metalness={0.6}
          />
        </mesh>
        <mesh position={[-0.24, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.012, 0.06, 16]} />
          <Surface kind="metal" />
        </mesh>
        <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.0132, 0.0132, 0.1, 16]} />
          <Emissive color={BRAND.orange} power={0.8} />
        </mesh>
      </group>
    </group>
  );
}

/** A single ink block on a page. */
function Sketch({
  y,
  w,
  h,
  x = 0,
  tone,
}: {
  y: number;
  w: number;
  h: number;
  x?: number;
  tone: string;
}) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, y]}>
      <planeGeometry args={[w, h]} />
      <meshStandardMaterial color={tone} roughness={0.9} metalness={0} />
    </mesh>
  );
}
