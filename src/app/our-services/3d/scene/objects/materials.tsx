"use client";

import { BRAND } from "../../config";

/**
 * Shared material presets. Keeping every object on the same handful of
 * surfaces is what makes a procedurally-built scene read as one set of props
 * rather than eight unrelated models.
 */
export const SURFACE = {
  /** Matte dark plastic — most housings. */
  body: { color: "#26262d", roughness: 0.52, metalness: 0.3 },
  /** Deeper shade for undersides and recesses. */
  bodyDark: { color: "#14141a", roughness: 0.7, metalness: 0.2 },
  /** Brushed metal for stands, hinges, and trim. */
  metal: { color: "#4a4a56", roughness: 0.28, metalness: 0.9 },
  /** Paper, page, and label surfaces. Kept off pure white so it doesn't
      out-shout the lit screens in a scene this dark. */
  paper: { color: "#b9b3ab", roughness: 0.94, metalness: 0 },
  /** Rubberised grips and cable jackets. */
  rubber: { color: "#1b1b20", roughness: 0.95, metalness: 0.05 },
  /** Circuit board substrate. */
  board: { color: "#1e2438", roughness: 0.6, metalness: 0.25 },
} as const;

type SurfaceKey = keyof typeof SURFACE;

export function Surface({ kind }: { kind: SurfaceKey }) {
  return <meshStandardMaterial {...SURFACE[kind]} />;
}

/** A lit display or indicator. `power` scales how hard it glows. */
export function Emissive({
  color = BRAND.purple,
  power = 1.1,
  base = "#0b0b12",
}: {
  color?: string;
  power?: number;
  base?: string;
}) {
  return (
    <meshStandardMaterial
      color={base}
      emissive={color}
      emissiveIntensity={power}
      roughness={0.25}
      metalness={0}
      toneMapped={false}
    />
  );
}
