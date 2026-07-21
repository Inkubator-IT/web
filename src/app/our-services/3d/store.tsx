"use client";

import {
  createContext,
  type ReactNode,
  type RefObject,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

interface DeskState {
  hoveredId: string | null;
  selectedId: string | null;
  setHovered: (id: string | null) => void;
  setSelected: (id: string | null) => void;
  /**
   * The single hover label element. It is positioned imperatively from inside
   * the Canvas every frame — going through React state at 60fps would re-render
   * the whole overlay for what is one transform.
   */
  labelRef: RefObject<HTMLDivElement | null>;
  /** Container of the keyboard-focusable hotspot buttons, positioned the same way. */
  hotspotsRef: RefObject<HTMLDivElement | null>;
}

const DeskContext = createContext<DeskState | null>(null);

export function DeskProvider({ children }: { children: ReactNode }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const hotspotsRef = useRef<HTMLDivElement>(null);

  const value = useMemo<DeskState>(
    () => ({
      hoveredId,
      selectedId,
      setHovered: setHoveredId,
      setSelected: setSelectedId,
      labelRef,
      hotspotsRef,
    }),
    [hoveredId, selectedId],
  );

  return <DeskContext.Provider value={value}>{children}</DeskContext.Provider>;
}

export function useDesk(): DeskState {
  const context = useContext(DeskContext);
  if (!context) throw new Error("useDesk must be used inside a DeskProvider");
  return context;
}
