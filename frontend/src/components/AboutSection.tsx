"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { DecorBlobs, DecorRadiate } from "./Decor";

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <DecorBlobs variant="both" />
      <DecorRadiate />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="section-label mb-8">Hello, Tasya</p>

          <p className="heading-display italic text-3xl md:text-4xl text-charcoal leading-snug mb-8">
            &ldquo;You look insanely beautiful —<br />
            <span className="text-rose">and you said biasa aja.&rdquo;</span>
          </p>

          <span className="divider mx-auto mb-8" />

          <p className="text-charcoal-light font-light leading-loose max-w-xl mx-auto">
            This wasn't made for a special occasion —
            kamu sendiri yang sudah jadi alasannya.
            Every detail here was chosen carefully, because you deserve nothing less
            than the best, Tasya.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
