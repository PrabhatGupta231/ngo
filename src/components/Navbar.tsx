"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav shadow-sm py-3"
          : "bg-white/90 md:bg-transparent py-4 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-secondary group-hover:text-primary transition-colors duration-200">
                SewaPrith
              </span>
              <span className="block text-[10px] font-semibold text-primary tracking-widest uppercase">
                Foundation
              </span>
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
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    isActive
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
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-secondary">SewaPrith</span>
                    <span className="block text-[9px] font-semibold text-primary uppercase">Foundation</span>
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
                      className={`text-base font-bold py-2 px-3 rounded-lg transition-colors ${
                        isActive
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
