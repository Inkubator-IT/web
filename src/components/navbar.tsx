"use client";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import { Menu, X, SendHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/about-us", label: "About Us" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/our-services", label: "Our Services" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 z-50 w-full px-3 md:top-12 md:px-12"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between rounded-2xl bg-white/5 p-4 backdrop-blur-md md:px-8 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <ExportedImage
            src="/logo-iit.svg"
            alt="InkubatorIT"
            width={40}
            height={40}
            className="h-[30px] w-auto md:h-[60px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 rounded-xl border border-white/20 bg-black/40 px-10 py-3 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex flex-col items-center justify-center"
              >
                <span
                  className={`text-base transition-colors duration-300 ${
                    isActive
                      ? "font-medium text-white"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </span>

                <span
                  className={`absolute -bottom-1 h-[2px] w-full rounded-full bg-gradient-to-r from-[#7E67C1] to-[#FFB051] transition-all duration-300 ${
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <Link
          key="/contact"
          href="/contact"
          className="hidden items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#564292] to-[#A77741] px-8 py-4 text-base text-white/90 transition-all duration-200 hover:scale-105 hover:text-white hover:shadow-lg hover:shadow-purple-500/20 md:flex"
        >
          Let’s Collaborate <SendHorizontal height={15} />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {/* Mobile Navigation Overlay */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Navigation Sidebar */}
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full w-[280px] bg-[#0C0C0C] shadow-2xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center px-6 py-6">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>
              {/* Nav links */}
              <div className="flex flex-col space-y-8">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block text-center text-2xl transition-all duration-300 ${
                          isActive
                            ? "font-bold text-white"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Contact button in mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#564292] to-[#A77741] px-4 py-3 text-xl text-white transition-transform active:scale-95"
                  >
                    Let's Collaborate <SendHorizontal height={15} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
