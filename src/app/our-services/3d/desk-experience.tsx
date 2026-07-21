"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import { ServicesCta } from "../components/services-cta";
import OurServicesClassic from "../our-services-classic";
import { CAMERA_FOV } from "./config";
import { useQualityTier } from "./hooks/use-quality-tier";
import { DeskScene } from "./scene/desk-scene";
import { SceneLoader } from "./ui/loader";

export default function DeskExperience() {
  const profile = useQualityTier();
  const stageRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  // Rendering is paused whenever the canvas is off-screen or the tab is hidden;
  // an idle 3D scene should not cost the user battery.
  const [visible, setVisible] = useState(true);
  const [degraded, setDegraded] = useState(false);

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

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  }, []);

  const handlePointerLeave = useCallback(() => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  }, []);

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

  const tier = degraded ? "low" : profile.tier;

  return (
    <div className="min-h-screen text-white">
      <Hero />

      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative h-[56vh] max-h-[760px] min-h-[380px] w-full md:h-[60vh]"
      >
        <Canvas
          dpr={profile.dpr}
          frameloop={visible ? "always" : "never"}
          camera={{ fov: CAMERA_FOV, near: 0.1, far: 120 }}
          gl={{
            antialias: tier === "high",
            powerPreference: "high-performance",
          }}
        >
          <PerformanceMonitor
            onDecline={() => setDegraded(true)}
            flipflops={2}
          />
          <DeskScene
            tier={tier}
            reducedMotion={profile.reducedMotion}
            pointer={pointer}
          />
        </Canvas>
      </div>

      <ServicesCta />
    </div>
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
