"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/letter", label: "Letter" },
  { href: "/chat", label: "Chat" },
  { href: "/guestbook", label: "Devotion" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-400",
        scrolled ? "bg-cream/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      )}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display italic text-xl text-charcoal tracking-wide">
          Tasya
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs tracking-widest uppercase text-charcoal-light hover:text-rose transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/secret"
            className="text-xs tracking-widest uppercase text-rose border border-rose/40 px-4 py-1.5 rounded-full hover:bg-rose hover:text-white transition-all duration-200"
          >
            Secret
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-charcoal" aria-label="Menu">
          <div className="space-y-1.5 w-5">
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} className="block h-px bg-charcoal w-full origin-center" />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="block h-px bg-charcoal w-full" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} className="block h-px bg-charcoal w-full origin-center" />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream border-t border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-xs tracking-widest uppercase text-charcoal-light hover:text-rose transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/secret" onClick={() => setOpen(false)} className="text-xs tracking-widest uppercase text-rose">
                Secret
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
