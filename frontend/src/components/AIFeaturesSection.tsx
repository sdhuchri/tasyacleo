"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { DecorDiagonalLines, DecorCornerLines } from "./Decor";

const FEATURES = [
  {
    label: "01",
    title: "Love Letter",
    description: "Tell me what you feel, and AI will turn it into something beautiful — personal and sincere.",
    href: "/letter",
    cta: "Write a letter",
  },
  {
    label: "02",
    title: "Chat with Aura",
    description: "Your AI companion, always ready to listen, chat, or just be there when you need it.",
    href: "/chat",
    cta: "Start chatting",
  },
  {
    label: "03",
    title: "Zodiac & Persona",
    description: "Masukkan tanggal lahirmu, discover your personality card and daily affirmation.",
    href: "/zodiac",
    cta: "Find out",
  },
];

export default function AIFeaturesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-28 px-6 bg-cream-dark relative overflow-hidden">
      <DecorDiagonalLines />
      <DecorCornerLines position="top-right" opacity={0.25} />
      <DecorCornerLines position="bottom-left" opacity={0.25} />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Fitur</p>
          <h2 className="heading-display text-5xl md:text-6xl text-charcoal">
            Built<br />
            <span className="italic text-rose">for you</span>
          </h2>
          <span className="divider mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
            >
              <Link href={feat.href}>
                <div className="card p-8 hover-lift h-full group">
                  <span className="section-label text-[10px] text-sand mb-4 block">{feat.label}</span>
                  <h3 className="heading-display text-2xl text-charcoal mb-3 group-hover:text-rose transition-colors duration-200">
                    {feat.title}
                  </h3>
                  <p className="text-charcoal-light text-sm leading-relaxed mb-6">
                    {feat.description}
                  </p>
                  <span className="text-xs tracking-widest uppercase text-rose border-b border-rose/40 pb-0.5">
                    {feat.cta} →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
