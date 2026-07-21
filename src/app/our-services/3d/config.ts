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
  /** The slab's side. These faces point sideways and so catch far less light
      than the top — the base colour is set well above the top's to compensate,
      landing it just a step darker than the surface once lit. */
  deskEdge: "#34343e",
  deskPad: "#232630",
} as const;

/** Camera tilt away from straight-down, in degrees. 0 = pure top-down. */
export const CAMERA_TILT_DEG = 38;
export const CAMERA_TILT_DEG_PORTRAIT = 30;
export const CAMERA_FOV = 35;

/** Fraction of the frustum kept empty around the desk when fitting the camera. */
export const FIT_MARGIN = 0.045;

/** How far the camera drifts with the pointer, in world units. */
export const PARALLAX_RANGE = { x: 0.55, y: 0.3 };

/**
 * Height above the desk at which each object's hotspot and label sit — roughly
 * "just above the tallest part", so the marker never buries itself in geometry.
 */
export const ANCHOR_HEIGHT: Record<string, number> = {
  "design-prototype": 0.14,
  "website-development": 0.72,
  "mobile-applications": 0.12,
  "desktop-applications": 1.0,
  "ai-ml": 0.44,
  "ar-vr": 0.36,
  iot: 0.2,
  "games-development": 0.2,
};

/**
 * Invisible convex box used for hover picking, per service.
 *
 * Raycasting the real geometry is both expensive and unreliable — an object
 * made of a dozen meshes produces a stream of enter/leave events as the pointer
 * crosses between its own parts. One generous box per object makes hover
 * deterministic and gives a forgiving target.
 *
 * `size` is [width, height, depth]; `offset` shifts it from the slot origin.
 */
export const HITBOX: Record<
  string,
  { size: [number, number, number]; offset: [number, number, number] }
> = {
  "design-prototype": { size: [1.05, 0.24, 0.78], offset: [0, 0.1, 0.04] },
  "website-development": { size: [1.06, 0.72, 0.84], offset: [0, 0.34, -0.06] },
  "mobile-applications": { size: [0.46, 0.2, 0.74], offset: [0, 0.08, 0] },
  // Wide enough to cover both the monitor and the tower beside it.
  "desktop-applications": { size: [1.8, 1.0, 0.66], offset: [0.22, 0.48, 0] },
  "ai-ml": { size: [0.56, 0.5, 0.56], offset: [0, 0.22, 0] },
  "ar-vr": { size: [0.64, 0.46, 0.82], offset: [0, 0.16, -0.06] },
  iot: { size: [0.76, 0.3, 0.82], offset: [0.02, 0.12, 0.06] },
  "games-development": { size: [0.56, 0.28, 0.44], offset: [0, 0.1, 0.02] },
};

/** Hover motion: how far an object lifts, and how much it leans. */
export const HOVER_LIFT = 0.075;
export const HOVER_TILT = 0.06;
export const HOVER_SCALE = 1.045;

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
