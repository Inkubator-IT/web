"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <nav className="fixed top-6 z-50 w-full px-3 md:top-12 md:px-12">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between rounded-2xl bg-white/5 p-4 backdrop-blur-md md:px-8 md:py-4">
        {/* Logo */}
        <div className="flex h-[30px] w-auto items-center rounded-xl bg-black/0 p-2 md:h-[60px]">
          {" "}
          {/* rada jelek sih kalo ad bg buat logo, naikin opacity kalau perlu aj*/}
          <Link href="/" className="h-full w-auto">
            <Image
              src="/logo-iit.svg"
              alt="InkubatorIT"
              width={40}
              height={40}
              className="h-full w-auto object-contain"
            />
          </Link>
        </div>

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
          // Corrected bg-linier to bg-gradient
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

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] transform bg-[#0C0C0C] shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center px-6 py-6">
          {/* Nav links */}
          <div className="flex flex-col space-y-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-center text-2xl transition-all duration-300 ${
                    isActive
                      ? "font-bold text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Contact button in mobile */}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#564292] to-[#A77741] px-4 py-3 text-xl text-white transition-transform active:scale-95"
            >
              Let's Collaborate <SendHorizontal height={15} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
