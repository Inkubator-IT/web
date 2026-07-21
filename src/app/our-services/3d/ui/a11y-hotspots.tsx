"use client";

import { services } from "../../data/services";
import { useDesk } from "../store";

/**
 * A focusable button sitting on top of each object's hotspot marker.
 *
 * This is how the desk is reachable without a mouse: Tab walks the eight
 * services in order and Enter opens the same modal a click would. Positions are
 * written by HotspotTracker from inside the Canvas, so they follow the objects
 * as the camera drifts.
 */
export function A11yHotspots() {
  const { hotspotsRef, setHovered, setSelected } = useDesk();

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
          // Centring lives in the inline transform written by HotspotTracker,
          // since that would otherwise overwrite a Tailwind translate.
          className="pointer-events-auto absolute top-0 left-0 h-8 w-8 cursor-pointer rounded-full opacity-0 outline-none will-change-transform focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-[#FFB051]"
          onPointerEnter={() => setHovered(service.id)}
          onPointerLeave={() => setHovered(null)}
          onFocus={() => setHovered(service.id)}
          onBlur={() => setHovered(null)}
          onClick={() => setSelected(service.id)}
        />
      ))}
    </div>
  );
}
