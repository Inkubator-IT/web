"use client";

import { useDesk } from "../store";

/**
 * The label that pops up next to a hovered object.
 *
 * There is exactly one of these for the whole scene rather than one per object:
 * its position is written straight to `style.transform` by LabelTracker every
 * frame, so hovering never mounts or unmounts DOM.
 */
export function HoverLabel({ title }: { title: string | null }) {
  const { labelRef } = useDesk();
  const visible = Boolean(title);

  return (
    <div
      ref={labelRef}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 z-10 will-change-transform"
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-full transition-all duration-300 ease-out ${
          visible
            ? "translate-y-[-100%] opacity-100"
            : "translate-y-[-80%] opacity-0"
        }`}
      >
        <div
          className="relative rounded-lg px-3.5 py-2 whitespace-nowrap backdrop-blur-sm"
          style={{
            border: "1px solid transparent",
            background:
              "linear-gradient(#111111f2, #111111f2) padding-box, linear-gradient(135deg, #7E67C1, #FFB051) border-box",
          }}
        >
          {/* Masked reveal: the text slides up from behind the panel edge. */}
          <span className="block overflow-hidden">
            <span
              className={`block text-sm font-semibold tracking-tight text-white transition-transform duration-300 ease-out ${
                visible ? "translate-y-0" : "translate-y-full"
              }`}
            >
              {title ?? ""}
            </span>
          </span>
          <span className="mt-0.5 block text-[10px] font-light tracking-wide text-white/45">
            Click to explore
          </span>

          {/* Stem pointing down at the object */}
          <span
            className="absolute -bottom-[5px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
            style={{
              background: "#111111f2",
              borderRight: "1px solid #FFB051",
              borderBottom: "1px solid #FFB051",
            }}
          />
        </div>
      </div>
    </div>
  );
}
