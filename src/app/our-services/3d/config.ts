/**
 * Every tunable number for the desk scene lives here, so composition can be
 * adjusted without opening the individual object components.
 *
 * World convention: Y is up, the desk surface sits at y = 0, and the camera
 * looks down at the origin from +Z.
 */

export const BRAND = {
  purple: "#7E67C1",
  purpleBright: "#ad96f1",
  orange: "#FFB051",
  sand: "#FFCD94",
  /** Matches the page background so the canvas blends into the layout. */
  backdrop: "#0C0C0C",
  deskTop: "#1a1a1f",
  deskEdge: "#101014",
  deskPad: "#141419",
} as const;

/** Camera tilt away from straight-down, in degrees. 0 = pure top-down. */
export const CAMERA_TILT_DEG = 38;
export const CAMERA_TILT_DEG_PORTRAIT = 30;
export const CAMERA_FOV = 35;

/** Fraction of the frustum kept empty around the desk when fitting the camera. */
export const FIT_MARGIN = 0.14;

/** How far the camera drifts with the pointer, in world units. */
export const PARALLAX_RANGE = { x: 0.55, y: 0.3 };

export type ObjectSlot = {
  /** Matches a Service.id from ../data/services. */
  id: string;
  position: [number, number, number];
  /** Y-axis rotation in radians — a little variety reads as "actually used". */
  rotationY: number;
};

export type DeskLayout = {
  desk: { width: number; depth: number };
  tiltDeg: number;
  slots: ObjectSlot[];
};

/** Wide viewports: a real desk read left-to-right, three rows deep. */
const landscape: DeskLayout = {
  desk: { width: 5.4, depth: 3.4 },
  tiltDeg: CAMERA_TILT_DEG,
  slots: [
    { id: "ar-vr", position: [-1.8, 0, -1.0], rotationY: 0.22 },
    {
      id: "desktop-applications",
      position: [0.05, 0, -1.05],
      rotationY: -0.04,
    },
    { id: "iot", position: [1.85, 0, -0.95], rotationY: -0.3 },
    { id: "website-development", position: [-0.9, 0, 0.2], rotationY: 0.1 },
    { id: "ai-ml", position: [1.3, 0, 0.25], rotationY: -0.15 },
    { id: "design-prototype", position: [-1.9, 0, 1.15], rotationY: 0.34 },
    { id: "mobile-applications", position: [0.15, 0, 1.2], rotationY: -0.5 },
    { id: "games-development", position: [1.6, 0, 1.15], rotationY: -0.2 },
  ],
};

/** Narrow viewports: the same desk re-flowed into two columns of four. */
const portrait: DeskLayout = {
  desk: { width: 3.3, depth: 5.8 },
  tiltDeg: CAMERA_TILT_DEG_PORTRAIT,
  slots: [
    {
      id: "desktop-applications",
      position: [-0.78, 0, -2.05],
      rotationY: 0.06,
    },
    { id: "iot", position: [0.82, 0, -2.1], rotationY: -0.28 },
    { id: "website-development", position: [-0.8, 0, -0.75], rotationY: 0.12 },
    { id: "ar-vr", position: [0.82, 0, -0.7], rotationY: -0.25 },
    { id: "mobile-applications", position: [-0.8, 0, 0.6], rotationY: -0.4 },
    { id: "ai-ml", position: [0.82, 0, 0.62], rotationY: -0.12 },
    { id: "design-prototype", position: [-0.8, 0, 1.95], rotationY: 0.3 },
    { id: "games-development", position: [0.82, 0, 1.95], rotationY: -0.18 },
  ],
};

export const LAYOUTS = { landscape, portrait } as const;

export const getLayout = (aspect: number): DeskLayout =>
  aspect < 0.95 ? portrait : landscape;
