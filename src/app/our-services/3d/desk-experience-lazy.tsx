"use client";

import dynamic from "next/dynamic";
import { SceneLoader } from "./ui/loader";

/**
 * Client-side boundary for the 3D scene.
 *
 * `ssr: false` is required, not merely an optimisation: this project builds
 * with `output: "export"`, so anything touching WebGL must stay out of the
 * prerender. It also keeps three.js in its own lazily-loaded chunk, leaving
 * every other route's bundle untouched. `next/dynamic` only accepts
 * `ssr: false` inside a Client Component, which is why this wrapper exists.
 */
const DeskExperience = dynamic(() => import("./desk-experience"), {
  ssr: false,
  loading: () => (
    <div className="h-[70vh] min-h-[420px]">
      <SceneLoader />
    </div>
  ),
});

export default DeskExperience;
