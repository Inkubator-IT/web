"use client";

import { services } from "../../data/services";
import { useDesk } from "../store";

/**
 * A focusable button per object, tracking that object's on-screen centre.
 *
 * These are keyboard affordances only — `pointer-events-none` keeps the mouse
 * and touch going straight through to the canvas, so HoverPicker stays the
 * single authority on what the pointer is over. A button that also swallowed
 * pointer events would fight the picker every frame. Buttons remain fully
 * focusable and clickable via Tab and Enter regardless.
 */
export function A11yHotspots() {
  const { hotspotsRef, setFocused, activate } = useDesk();

  return (
    <div
      ref={hotspotsRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {services.map((service) => (
        <button
          key={service.id}
          type="button"
          data-service-hotspot={service.id}
          aria-label={`${service.title} — open details`}
          className="pointer-events-none absolute top-0 left-0 h-11 w-11 rounded-full opacity-0 outline-none will-change-transform focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-[#FFB051]"
          onFocus={() => setFocused(service.id)}
          onBlur={() => setFocused(null)}
          onClick={() => activate(service.id, false)}
        />
      ))}
    </div>
  );
}
