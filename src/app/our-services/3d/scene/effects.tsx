"use client";

import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

/**
 * Post-processing, desktop only.
 *
 * Bloom is what makes the emissive screens, LEDs and hotspots read as light
 * sources rather than as flat bright rectangles — it is doing most of the work
 * of making a procedurally-built scene look finished. The threshold is set
 * above the lit surfaces so only genuinely emissive material blooms.
 */
export function Effects() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.85}
        luminanceThreshold={0.65}
        luminanceSmoothing={0.3}
        mipmapBlur
        radius={0.62}
      />
      <Vignette offset={0.36} darkness={0.38} eskil={false} />
    </EffectComposer>
  );
}
