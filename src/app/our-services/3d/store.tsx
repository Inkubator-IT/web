"use client";

import {
  createContext,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type * as THREE from "three";

interface DeskState {
  /**
   * What the pointer is over. Written only by HoverPicker, which raycasts the
   * scene — the DOM hotspot buttons deliberately don't touch it, or the two
   * would fight and cancel each other out every frame.
   */
  hoveredId: string | null;
  /** What the keyboard is on. Written only by the hotspot buttons. */
  focusedId: string | null;
  /** What the scene should actually highlight. Keyboard focus wins. */
  activeId: string | null;
  selectedId: string | null;
  setHovered: (id: string | null) => void;
  setFocused: (id: string | null) => void;
  setSelected: (id: string | null) => void;
  /**
   * A user activating a service. On touch there is no hover, so the first tap
   * previews the label and only the second opens the modal — otherwise touch
   * users would never see the label at all.
   */
  activate: (id: string, isTouch: boolean) => void;
  /**
   * The single hover label element. It is positioned imperatively from inside
   * the Canvas every frame — going through React state at 60fps would re-render
   * the whole overlay for what is one transform.
   */
  labelRef: RefObject<HTMLDivElement | null>;
  /** Container of the keyboard-focusable hotspot buttons, positioned the same way. */
  hotspotsRef: RefObject<HTMLDivElement | null>;
  /** Hover-pick proxies, registered by each object and read by HoverPicker. */
  proxiesRef: RefObject<Map<string, THREE.Object3D>>;
  /** False once the pointer leaves the canvas, so hover doesn't stick. */
  pointerInsideRef: RefObject<boolean>;
}

const DeskContext = createContext<DeskState | null>(null);

export function DeskProvider({ children }: { children: ReactNode }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const hotspotsRef = useRef<HTMLDivElement>(null);
  const touchPreview = useRef<string | null>(null);
  const proxiesRef = useRef<Map<string, THREE.Object3D>>(new Map());
  const pointerInsideRef = useRef(false);

  const activate = useCallback((id: string, isTouch: boolean) => {
    if (isTouch && touchPreview.current !== id) {
      touchPreview.current = id;
      setHoveredId(id);
      return;
    }
    touchPreview.current = null;
    setSelectedId(id);
  }, []);

  const value = useMemo<DeskState>(
    () => ({
      hoveredId,
      focusedId,
      activeId: focusedId ?? hoveredId,
      selectedId,
      setHovered: setHoveredId,
      setFocused: setFocusedId,
      setSelected: setSelectedId,
      activate,
      labelRef,
      hotspotsRef,
      proxiesRef,
      pointerInsideRef,
    }),
    [hoveredId, focusedId, selectedId, activate],
  );

  return <DeskContext.Provider value={value}>{children}</DeskContext.Provider>;
}

export function useDesk(): DeskState {
  const context = useContext(DeskContext);
  if (!context) throw new Error("useDesk must be used inside a DeskProvider");
  return context;
}
