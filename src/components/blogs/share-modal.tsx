"use client";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareModalProps {
  trigger: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function ShareModal({
  trigger,
  className,
  title = "Share this blog",
  description = "Copy the link below to share the blog",
}: ShareModalProps) {
  const [open, setOpen] = useState(false);

  const shareUrl = typeof window === "undefined" ? "" : window.location.href;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
      setOpen(false);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("inline-flex", className)}
      >
        {trigger}
      </button>

      {open && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-xl border border-white/15 bg-[#0C0C0C] p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-3 text-xl text-white/60 transition hover:text-white"
              aria-label="Close share dialog"
            >
              <X size={16} color="currentColor" />
            </button>

            <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
            <p className="mb-4 text-sm text-white/60">{description}</p>

            <div className="flex gap-2">
              <input
                value={shareUrl}
                readOnly
                className="h-10 flex-1 rounded-md border border-white/15 bg-transparent px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#7E67C1]/40"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="h-10 rounded-md bg-linear-to-r from-[#7E67C1]/20 to-[#FFB051]/20 px-4 text-sm font-semibold text-white transition hover:bg-[#7E67C1]/20"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}
