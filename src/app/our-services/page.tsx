import type React from "react";
import DeskExperience from "./3d/desk-experience-lazy";
import OurServicesClassic from "./our-services-classic";

/**
 * Presentation mode for this page.
 *
 *   "3d"      — interactive 3D desk experience
 *   "classic" — the original static card grid
 *
 * Flip this single constant to switch. Both modes render the same content from
 * `data/services.ts`, so there is nothing to keep in sync.
 */
const MODE: "3d" | "classic" = "3d";

const OurServicesPage: React.FC = () =>
  MODE === "3d" ? <DeskExperience /> : <OurServicesClassic />;

export default OurServicesPage;
