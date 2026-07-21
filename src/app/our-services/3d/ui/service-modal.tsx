"use client";

import { CheckCircle2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useRef } from "react";
import type { Service } from "../../data/services";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Detail panel for a service, opened by clicking its object on the desk. */
export function ServiceModal({
  service,
  onClose,
  reducedMotion,
}: {
  service: Service | null;
  onClose: () => void;
  reducedMotion: boolean;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!service) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog, then keep Tab inside it.
    const focusFirst = window.setTimeout(() => {
      panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;

      const items = Array.from(
        panel.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      restoreFocusTo.current?.focus?.();
    };
  }, [service, onClose]);

  const duration = reducedMotion ? 0.12 : 0.42;

  return (
    <AnimatePresence>
      {service && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            // Light enough that the object the camera moved to stays readable
            // beside the panel on wide screens.
            className="absolute inset-0 bg-black/55 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration * 0.7 }}
            onClick={onClose}
          />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className="relative flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-2xl"
            style={{
              border: "1px solid transparent",
              background:
                "linear-gradient(#0f0f0f, #0f0f0f) padding-box, linear-gradient(135deg, #7E67C1, #FFB051) border-box",
            }}
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.86, y: 28 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.92, y: 16 }
            }
            transition={
              reducedMotion
                ? { duration }
                : { type: "spring", stiffness: 260, damping: 26, mass: 0.9 }
            }
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-[#FFB051] focus-visible:outline-none"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-y-auto p-6 sm:p-8">
              <Stagger index={0} reducedMotion={reducedMotion}>
                <div className="mb-5 flex items-center gap-4 pr-8">
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{
                      border: "1px solid transparent",
                      background:
                        "linear-gradient(#1c1c1c, #1c1c1c) padding-box, linear-gradient(135deg, #7E67C1, #FFB051) border-box",
                    }}
                  >
                    <ExportedImage
                      src={service.icon.src}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </div>
                  <h2
                    id="service-modal-title"
                    className="text-2xl font-semibold text-white sm:text-3xl"
                  >
                    {service.title}
                  </h2>
                </div>
              </Stagger>

              <Stagger index={1} reducedMotion={reducedMotion}>
                <p className="mb-6 text-base leading-relaxed text-gray-200 opacity-80">
                  {service.description}
                </p>
              </Stagger>

              <ul className="mb-8 space-y-3">
                {service.features.map((feature, index) => (
                  <Stagger
                    key={feature}
                    index={2 + index}
                    reducedMotion={reducedMotion}
                  >
                    <li className="flex items-start gap-3 text-sm text-white sm:text-base">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#FFCD94]" />
                      <span>{feature}</span>
                    </li>
                  </Stagger>
                ))}
              </ul>

              <Stagger
                index={2 + service.features.length}
                reducedMotion={reducedMotion}
              >
                <Link
                  href={`/portfolio?category=${service.category}`}
                  className="inline-flex items-center gap-2 rounded-sm border border-purple-500/50 bg-gradient-to-r from-purple-600/20 to-orange-500/20 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 focus-visible:ring-2 focus-visible:ring-[#FFB051] focus-visible:outline-none sm:text-base"
                >
                  See related work
                </Link>
              </Stagger>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** Reveals modal content one row at a time. */
function Stagger({
  index,
  reducedMotion,
  children,
}: {
  index: number;
  reducedMotion: boolean;
  children: React.ReactNode;
}) {
  if (reducedMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 + index * 0.055, duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}
