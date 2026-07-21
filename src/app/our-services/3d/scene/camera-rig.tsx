"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { type DeskLayout, FIT_MARGIN, PARALLAX_RANGE } from "../config";

/** Highest point we care about keeping in frame — the tallest desk object. */
const CONTENT_HEIGHT = 0.75;

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

  const corners: THREE.Vector3[] = [];
  for (const x of [-halfW, halfW]) {
    for (const z of [-halfD, halfD]) {
      for (const y of [0, CONTENT_HEIGHT]) {
        corners.push(new THREE.Vector3(x, y, z));
      }
    }
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
  /** Pointer position in -1..1, or null when the pointer has left the canvas. */
  pointer: React.RefObject<{ x: number; y: number }>;
  enableParallax: boolean;
}

export function CameraRig({ layout, pointer, enableParallax }: CameraRigProps) {
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

  const current = useRef(home.clone());

  // Snap on the first frame and whenever the framing changes, so a resize never
  // shows a half-cropped desk mid-tween.
  useEffect(() => {
    current.current.copy(home);
    camera.position.copy(home);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [home, camera]);

  useFrame((_, delta) => {
    const damping = 1 - Math.exp(-4 * Math.min(delta, 0.1));

    const targetX = enableParallax
      ? home.x + pointer.current.x * PARALLAX_RANGE.x
      : home.x;
    const targetY = enableParallax
      ? home.y + pointer.current.y * PARALLAX_RANGE.y
      : home.y;

    current.current.x += (targetX - current.current.x) * damping;
    current.current.y += (targetY - current.current.y) * damping;
    current.current.z = home.z;

    camera.position.copy(current.current);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
