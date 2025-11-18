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
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-iit.svg"
            alt="InkubatorIT"
            width={40}
            height={40}
            className="h-[30px] w-auto md:h-[60px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 rounded-xl border border-white/20 bg-white/10 px-10 py-3 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text font-bold text-transparent"
                    : "text-white/80 hover:bg-gradient-to-r hover:from-[#7E67C1] hover:to-[#FFB051] hover:bg-clip-text hover:font-bold hover:text-transparent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          key="/contact"
          href="/contact"
          className="hidden items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#564292] to-[#A77741] px-8 py-4 text-base text-white/80 transition-colors duration-200 hover:text-white md:flex"
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
          className="fixed inset-0 top-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] transform bg-[#0C0C0C]/95 backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center px-6 py-6">
          {/* Nav links */}
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-center text-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#7E67C1] to-[#FFB051] bg-clip-text font-bold text-transparent"
                      : "text-white/80 hover:bg-gradient-to-r hover:from-[#7E67C1] hover:to-[#FFB051] hover:bg-clip-text hover:font-bold hover:text-transparent"
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
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#564292] to-[#A77741] px-4 py-2 text-xl text-white/80 transition-colors duration-200 hover:text-white"
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
