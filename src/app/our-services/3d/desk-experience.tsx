"use client";

import { Canvas } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import { ServicesCta } from "../components/services-cta";
import { services } from "../data/services";
import OurServicesClassic from "../our-services-classic";
import { CAMERA_FOV } from "./config";
import { type QualityProfile, useQualityTier } from "./hooks/use-quality-tier";
import { AdaptiveQuality } from "./scene/adaptive-quality";
import { DeskScene } from "./scene/desk-scene";
import { DeskProvider, useDesk } from "./store";
import { A11yHotspots } from "./ui/a11y-hotspots";
import { HoverLabel } from "./ui/hover-label";
import { SceneLoader } from "./ui/loader";
import { ServiceModal } from "./ui/service-modal";

export default function DeskExperience() {
  const profile = useQualityTier();

  if (!profile) {
    return (
      <div className="min-h-screen text-white">
        <Hero />
        <div className="h-[60vh] min-h-[380px]">
          <SceneLoader />
        </div>
      </div>
    );
  }

  // No WebGL at all — fall back to the presentation this page has always had.
  if (profile.tier === "none") return <OurServicesClassic />;
  const renderable: RenderableProfile = { ...profile, tier: profile.tier };

  return (
    <DeskProvider>
      <div className="min-h-screen text-white">
        <Hero />
        <Stage profile={renderable} />
        <ServicesCta />
        <SelectedModal reducedMotion={profile.reducedMotion} />
      </div>
    </DeskProvider>
  );
}

/** The "none" tier never reaches here — DeskExperience returns the grid instead. */
type RenderableProfile = QualityProfile & { tier: "high" | "low" };

function Stage({ profile }: { profile: RenderableProfile }) {
  const { activeId, selectedId, activate, pointerInsideRef } = useDesk();
  const stageRef = useRef<HTMLDivElement>(null);
  const parallax = useRef({ x: 0, y: 0 });
  const lastPointerType = useRef<string>("mouse");

  // Rendering is paused whenever the canvas is off-screen or the tab is hidden;
  // an idle 3D scene should not cost the user battery.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(stage);

    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      const rect = event.currentTarget.getBoundingClientRect();
      parallax.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      parallax.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointerInsideRef.current = true;
    },
    [pointerInsideRef],
  );

  const handlePointerLeave = useCallback(() => {
    parallax.current.x = 0;
    parallax.current.y = 0;
    pointerInsideRef.current = false;
  }, [pointerInsideRef]);

  // Clicks are handled here rather than per object: HoverPicker already knows
  // exactly what is under the pointer, so this stays consistent with the hover.
  const handleClick = useCallback(() => {
    if (!activeId) return;
    activate(activeId, lastPointerType.current === "touch");
  }, [activeId, activate]);

  // Fixed for the session. Runtime pressure is absorbed by DPR alone, so the
  // scene never changes its appearance while someone is looking at it.
  const tier = profile.tier;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: the accessible controls are the A11yHotspots buttons layered on top
    // biome-ignore lint/a11y/useKeyWithClickEvents: same
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={(event) => {
        lastPointerType.current = event.pointerType;
      }}
      onClick={handleClick}
      style={{ cursor: activeId ? "pointer" : "default" }}
      className="relative h-[58vh] max-h-[1000px] min-h-[380px] w-full md:h-[70vh] lg:h-[76vh]"
    >
      <Canvas
        dpr={profile.dpr}
        shadows={tier === "high" ? "soft" : false}
        frameloop={visible ? "always" : "never"}
        camera={{ fov: CAMERA_FOV, near: 0.1, far: 120 }}
        gl={{
          antialias: tier === "high",
          powerPreference: "high-performance",
        }}
      >
        <AdaptiveQuality min={profile.dpr[0]} max={profile.dpr[1]} />
        <DeskScene
          tier={tier}
          reducedMotion={profile.reducedMotion}
          pointer={parallax}
          pickingEnabled={selectedId === null}
        />
      </Canvas>

      <A11yHotspots />
      <HoveredLabel />
    </div>
  );
}

/** Resolves the hovered id to its service title for the overlay label. */
function HoveredLabel() {
  const { activeId } = useDesk();
  const title = services.find((service) => service.id === activeId)?.title;
  return <HoverLabel title={title ?? null} />;
}

/** Resolves the selected id to its service and hands it to the modal. */
function SelectedModal({ reducedMotion }: { reducedMotion: boolean }) {
  const { selectedId, setSelected, setHovered, setFocused } = useDesk();
  const service = services.find((item) => item.id === selectedId) ?? null;

  return (
    <ServiceModal
      service={service}
      reducedMotion={reducedMotion}
      onClose={() => {
        setSelected(null);
        setHovered(null);
        setFocused(null);
      }}
    />
  );
}

function Hero() {
  return (
    <section className="px-4 pt-2 pb-4 md:px-6 md:pt-6 md:pb-5">
      <div className="mx-auto w-full text-center md:w-[75%]">
        <h1 className="mb-4 text-4xl leading-tight font-semibold sm:text-5xl md:text-6xl">
          Our{" "}
          <span className="bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text text-transparent">
            Services
          </span>
        </h1>
        <p className="text-base leading-relaxed font-light opacity-80 sm:text-lg">
          Explore our tailored IT solutions designed to empower businesses,
          optimize operations, and drive innovation through technology.
        </p>
      </div>
    </section>
  );
}
