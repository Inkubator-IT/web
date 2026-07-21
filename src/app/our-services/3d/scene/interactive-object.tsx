"use client";

import { useFrame } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import type * as THREE from "three";
import {
  ANCHOR_HEIGHT,
  BRAND,
  HITBOX,
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
  const { activeId, proxiesRef } = useDesk();
  const Object3D = DESK_OBJECTS[slot.id];

  const content = useRef<THREE.Group>(null);
  const lift = useRef(0);
  const dim = useRef(0);

  const isHovered = activeId === slot.id;
  const anchorY = ANCHOR_HEIGHT[slot.id] ?? 0.3;
  const hitbox = HITBOX[slot.id];

  // Objects are assembled from many small meshes, so shadow casting is applied
  // once on mount by traversal rather than repeated on every primitive.
  const enableShadows = useCallback((group: THREE.Group | null) => {
    content.current = group;
    if (!group) return;
    group.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, []);

  // Register this object's pick proxy so HoverPicker can raycast against it.
  const registerProxy = useCallback(
    (mesh: THREE.Mesh | null) => {
      const proxies = proxiesRef.current;
      if (mesh) proxies.set(slot.id, mesh);
      else proxies.delete(slot.id);
    },
    [proxiesRef, slot.id],
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
    <group position={slot.position}>
      <group ref={enableShadows} rotation={[0, slot.rotationY, 0]}>
        <Object3D animate={animate} tier={tier} />
      </group>

      {/* Hover pick proxy: no material output, but still raycastable. */}
      {hitbox && (
        <mesh
          ref={registerProxy}
          position={hitbox.offset}
          userData={{ serviceId: slot.id }}
        >
          <boxGeometry args={hitbox.size} />
          <meshBasicMaterial visible={false} />
        </mesh>
      )}

      {/* Pool of light on the desk, only while hovered. Never raycast — an
          invisible disc this wide would steal hover from its neighbours. */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.006, 0]}
        raycast={() => null}
      >
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
