"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  ANCHOR_HEIGHT,
  type DeskLayout,
  FIT_MARGIN,
  PARALLAX_RANGE,
} from "../config";

/** Highest point we care about keeping in frame — the tallest desk object. */
const CONTENT_HEIGHT = 1.0;
/** Depth of top + apron, so the desk's thickness stays in frame. */
const APRON_BOTTOM = 0.46;

/**
 * Finds the camera distance at which the whole desk (plus the headroom the
 * objects occupy) sits inside the frustum with a margin.
 *
 * Projected size shrinks monotonically with distance, so a binary search is
 * both exact and cheap — and unlike a hand-derived formula it stays correct at
 * any aspect ratio, which is what keeps the desk uncropped from 360px to 2560px.
 */
function fitDistance(
  layout: DeskLayout,
  aspect: number,
  fov: number,
  direction: THREE.Vector3,
): number {
  const probe = new THREE.PerspectiveCamera(fov, aspect, 0.1, 200);
  const halfW = layout.desk.width / 2;
  const halfD = layout.desk.depth / 2;

  // The desk surface, plus headroom only along the back edge — that is where
  // the tall objects live. Claiming full height at all four corners would
  // reserve empty space the scene never occupies and shrink the desk in frame.
  // The front edge reaches down to the bottom of the apron so the slab's
  // thickness stays in shot; the legs below it are allowed to run off frame,
  // the way a desk shot from above naturally would.
  const corners: THREE.Vector3[] = [];
  for (const x of [-halfW, halfW]) {
    corners.push(new THREE.Vector3(x, 0, halfD));
    corners.push(new THREE.Vector3(x, -APRON_BOTTOM, halfD));
    corners.push(new THREE.Vector3(x, 0, -halfD));
    corners.push(new THREE.Vector3(x, CONTENT_HEIGHT, -halfD));
  }

  const overflowAt = (distance: number) => {
    probe.position.copy(direction).multiplyScalar(distance);
    probe.lookAt(0, 0, 0);
    probe.updateMatrixWorld(true);
    probe.updateProjectionMatrix();

    let worst = 0;
    for (const corner of corners) {
      const ndc = corner.clone().project(probe);
      worst = Math.max(worst, Math.abs(ndc.x), Math.abs(ndc.y));
    }
    return worst;
  };

  const limit = 1 - FIT_MARGIN;
  let tooClose = 0.5;
  let farEnough = 80;
  for (let i = 0; i < 36; i++) {
    const mid = (tooClose + farEnough) / 2;
    if (overflowAt(mid) > limit) tooClose = mid;
    else farEnough = mid;
  }
  return farEnough;
}

interface CameraRigProps {
  layout: DeskLayout;
  /** Pointer position in -1..1, recentred when the pointer leaves the canvas. */
  pointer: React.RefObject<{ x: number; y: number }>;
  enableParallax: boolean;
  /** Service id to move in on, or null to sit at the resting framing. */
  focusId: string | null;
}

export function CameraRig({
  layout,
  pointer,
  enableParallax,
  focusId,
}: CameraRigProps) {
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;
  const size = useThree((state) => state.size);
  const aspect = size.width / size.height;

  const direction = useMemo(() => {
    const tilt = THREE.MathUtils.degToRad(layout.tiltDeg);
    return new THREE.Vector3(0, Math.cos(tilt), Math.sin(tilt)).normalize();
  }, [layout.tiltDeg]);

  const home = useMemo(() => {
    const distance = fitDistance(layout, aspect, camera.fov, direction);
    return direction.clone().multiplyScalar(distance);
  }, [layout, aspect, camera.fov, direction]);

  /** Where the camera moves to, and what it looks at, when an object is opened. */
  const focus = useMemo(() => {
    if (!focusId) return null;
    const slot = layout.slots.find((candidate) => candidate.id === focusId);
    if (!slot) return null;

    const lookAt = new THREE.Vector3(
      slot.position[0],
      (ANCHOR_HEIGHT[focusId] ?? 0.3) * 0.45,
      slot.position[2],
    );

    // Sit closer along the same viewing axis, so moving in reads as a dolly
    // rather than a cut to a different angle.
    const distance = home.length() * 0.42;

    // On wide viewports the modal sits centred, so aim off to one side to park
    // the object beside it instead of directly behind it. Narrow viewports have
    // no room either way, so they stay centred.
    if (aspect >= 1.2) {
      const halfWidth =
        Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance * aspect;
      lookAt.x += halfWidth * 0.52;
    }

    const position = lookAt
      .clone()
      .add(direction.clone().multiplyScalar(distance));

    return { position, lookAt };
  }, [focusId, layout, direction, home, aspect, camera.fov]);

  const current = useRef(home.clone());
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));

  // Snap on the first frame and whenever the framing changes, so a resize never
  // shows a half-cropped desk mid-tween.
  useEffect(() => {
    current.current.copy(home);
    camera.position.copy(home);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [home, camera]);

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.1);
    // Moving in is a deliberate, slower move than the parallax drift.
    const damping = 1 - Math.exp(-(focus ? 3.2 : 4) * step);

    const base = focus ? focus.position : home;
    const parallax = enableParallax && !focus;

    const targetX = parallax
      ? base.x + pointer.current.x * PARALLAX_RANGE.x
      : base.x;
    const targetY = parallax
      ? base.y + pointer.current.y * PARALLAX_RANGE.y
      : base.y;

    current.current.x += (targetX - current.current.x) * damping;
    current.current.y += (targetY - current.current.y) * damping;
    current.current.z += (base.z - current.current.z) * damping;

    const goal = focus ? focus.lookAt : ORIGIN;
    lookTarget.current.lerp(goal, damping);

    camera.position.copy(current.current);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

const ORIGIN = new THREE.Vector3(0, 0, 0);
