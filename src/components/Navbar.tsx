"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Campaigns", href: "/campaigns" },
  { name: "Gallery", href: "/gallery" },
  { name: "Updates", href: "/updates" },
  { name: "Volunteer", href: "/volunteer" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? "glass-nav shadow-sm py-2"
        : "bg-white/95 md:bg-transparent py-2 border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[88px]">
          {/* Logo */}
          <Link href="/" className="flex items-center group ml-14">
            <div className="h-[105px] w-[180px] overflow-hidden flex items-center justify-center pt-3">
              <Image
                src="/logo.png"
                alt="SewaPrith Foundation"
                width={200}
                height={100}
                className="h-[70px] w-auto object-contain scale-[1.25] group-hover:scale-[1.3] transition-transform duration-200 drop-shadow-sm"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors duration-200 ${isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-secondary/80 hover:text-primary"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/donate"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold text-white bg-accent-coral hover:bg-accent-coral-hover transition-colors shadow-lg shadow-accent-coral/20 hover:scale-105 active:scale-95 duration-200"
            >
              Donate Now
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-secondary/80 hover:text-primary hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <div className="h-[60px] w-[150px] overflow-hidden flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="SewaPrith Foundation"
                      width={180}
                      height={90}
                      className="h-[100px] w-auto object-contain scale-[1.25]"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-secondary/80 hover:text-primary hover:bg-slate-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4 flex-grow">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-bold py-2 px-3 rounded-lg transition-colors ${isActive
                        ? "text-white bg-primary"
                        : "text-secondary/80 hover:text-primary hover:bg-slate-50"
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-slate-100">
                <Link
                  href="/donate"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center py-3 rounded-full text-base font-bold text-white bg-accent-coral hover:bg-accent-coral-hover transition-colors shadow-lg shadow-accent-coral/20"
                >
                  Donate Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
