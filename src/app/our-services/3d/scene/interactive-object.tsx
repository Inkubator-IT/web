"use client";

import { type ThreeEvent, useFrame } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import type * as THREE from "three";
import {
  ANCHOR_HEIGHT,
  BRAND,
  HOVER_LIFT,
  HOVER_SCALE,
  HOVER_TILT,
  type ObjectSlot,
} from "../config";
import { useDesk } from "../store";
import { Hotspot } from "./hotspot";
import { DESK_OBJECTS } from "./objects";

/** Fades a subtree towards the background. Base values are cached per material. */
function applyDim(root: THREE.Object3D, amount: number) {
  root.traverse((node) => {
    const material = (node as THREE.Mesh).material as
      | THREE.MeshStandardMaterial
      | undefined;
    if (!material || Array.isArray(material) || !material.color) return;

    if (!material.userData.baseColor) {
      material.userData.baseColor = material.color.clone();
      material.userData.baseEmissive = material.emissiveIntensity ?? 1;
    }

    material.color
      .copy(material.userData.baseColor)
      .multiplyScalar(1 - amount * 0.6);

    if (material.emissive) {
      material.emissiveIntensity =
        material.userData.baseEmissive * (1 - amount * 0.75);
    }
  });
}

interface InteractiveObjectProps {
  slot: ObjectSlot;
  /** Phase offset so the objects don't all breathe in unison. */
  phase: number;
  animate: boolean;
  tier: "high" | "low";
  anyHovered: boolean;
}

export function InteractiveObject({
  slot,
  phase,
  animate,
  tier,
  anyHovered,
}: InteractiveObjectProps) {
  const { hoveredId, setHovered, activate } = useDesk();
  const Object3D = DESK_OBJECTS[slot.id];

  const content = useRef<THREE.Group>(null);
  const lift = useRef(0);
  const dim = useRef(0);

  const isHovered = hoveredId === slot.id;
  const anchorY = ANCHOR_HEIGHT[slot.id] ?? 0.3;

  const handleOver = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setHovered(slot.id);
      document.body.style.cursor = "pointer";
    },
    [setHovered, slot.id],
  );

  const handleOut = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setHovered(null);
      document.body.style.cursor = "";
    },
    [setHovered],
  );

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      const pointerType = (event.nativeEvent as PointerEvent).pointerType;
      activate(slot.id, pointerType === "touch");
    },
    [activate, slot.id],
  );

  useFrame((state, delta) => {
    const group = content.current;
    if (!group) return;

    const t = state.clock.elapsedTime;
    // Asymmetric easing: quick to acknowledge the pointer, slower to let go.
    const rate = isHovered ? 14 : 8;
    const damping = 1 - Math.exp(-rate * Math.min(delta, 0.1));

    lift.current += ((isHovered ? 1 : 0) - lift.current) * damping;

    const float = animate ? Math.sin(t * 0.9 + phase) * 0.006 : 0;
    group.position.y = float + lift.current * HOVER_LIFT;
    group.rotation.x = -lift.current * HOVER_TILT;
    group.rotation.z = lift.current * HOVER_TILT * 0.35;
    group.scale.setScalar(1 + lift.current * (HOVER_SCALE - 1));

    const dimTarget = anyHovered && !isHovered ? 1 : 0;
    if (Math.abs(dim.current - dimTarget) > 0.002) {
      dim.current += (dimTarget - dim.current) * damping;
      applyDim(group, dim.current);
    }
  });

  if (!Object3D) return null;

  return (
    // <group> is a three.js object, not DOM; the rule misfires because R3F augments JSX.IntrinsicElements. Keyboard access comes from A11yHotspots.
    // biome-ignore lint/a11y/noStaticElementInteractions: not a DOM element
    <group
      position={slot.position}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onClick={handleClick}
    >
      <group ref={content} rotation={[0, slot.rotationY, 0]}>
        <Object3D animate={animate} tier={tier} />
      </group>

      {/* Pool of light on the desk, only while hovered */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
        <circleGeometry args={[0.42, 32]} />
        <meshBasicMaterial
          color={BRAND.orange}
          transparent
          opacity={isHovered ? 0.11 : 0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <group position={[0, anchorY, 0]}>
        <Hotspot active={isHovered} animate={animate} />
      </group>
    </group>
  );
}
