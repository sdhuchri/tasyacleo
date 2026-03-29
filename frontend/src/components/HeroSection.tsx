"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { DecorCornerLines } from "./Decor";
import { log } from "@/lib/logger";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export default function HeroSection() {
  useEffect(() => { log("page.visit", "home"); }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(44,40,40,0.04) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(44,40,40,0.03) 0%, transparent 65%)" }} />
      </div>
      <DecorCornerLines position="top-left" opacity={0.22} />
      <DecorCornerLines position="bottom-right" opacity={0.22} />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.p {...fade(0.1)} className="section-label mb-8">
          Made with love, just for you
        </motion.p>

        <motion.h1 {...fade(0.25)} className="heading-display text-7xl md:text-9xl text-charcoal mb-6">
          Tasya
          <br />
          <span className="italic text-rose">Cleo Bella</span>
        </motion.h1>

        <motion.span {...fade(0.4)} className="divider mx-auto mb-8" />

        <motion.p {...fade(0.5)} className="text-charcoal-light text-base font-light max-w-sm mx-auto leading-relaxed">
          Someone who, without even trying, makes every day feel a little more meaningful.
        </motion.p>

        <motion.div {...fade(0.65)} className="flex items-center justify-center gap-4 mt-12 mb-24">
          <Link
            href="/gallery"
            className="px-8 py-3 bg-rose text-white text-xs tracking-widest uppercase rounded-full hover:bg-rose/90 transition-colors duration-200"
          >
            Gallery
          </Link>
          <Link
            href="/letter"
            className="px-8 py-3 border border-charcoal/20 text-charcoal text-xs tracking-widest uppercase rounded-full hover:border-rose hover:text-rose transition-all duration-200"
          >
            Letter
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        {...fade(1)}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="section-label text-[10px]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-rose/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
