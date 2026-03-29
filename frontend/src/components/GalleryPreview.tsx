"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";

const PHOTOS = [
  { id: 1, src: "/images/tasya/IMG_7559.jpeg", caption: "That smile got me" },
  { id: 2, src: "/images/tasya/IMG_7560.jpeg", caption: "God made you beautiful" },
  { id: 3, src: "/images/tasya/IMG_7561.jpeg", caption: "You always shine, Sya" },
  { id: 4, src: "/images/tasya/IMG_7562.jpeg", caption: "This is what beauty looks like" },
];

export default function GalleryPreview() {
  const [selected, setSelected] = useState<typeof PHOTOS[0] | null>(null);
  const [displayed, setDisplayed] = useState(PHOTOS.slice(0, 3));
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const shuffled = [...PHOTOS].sort(() => Math.random() - 0.5);
    setDisplayed(shuffled.slice(0, 3));
  }, []);

  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Gallery</p>
          <h2 className="heading-display text-5xl md:text-6xl text-charcoal">
            Every photo<br />
            <span className="italic text-rose">is a memory</span>
          </h2>
          <span className="divider mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {displayed.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative aspect-[3/4] overflow-hidden rounded-xl bg-cream-dark cursor-pointer group"
              onClick={() => setSelected(photo)}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/25 transition-colors duration-300 flex items-end p-4">
                <p className="font-display italic text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/gallery"
            className="text-xs tracking-widest uppercase text-rose border-b border-rose/40 pb-0.5 hover:border-rose transition-colors duration-200"
          >
            View all photos
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/80 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl overflow-hidden max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/4] bg-cream-dark">
                <Image src={selected.src} alt={selected.caption} fill className="object-cover" />
              </div>
              <div className="p-5 flex items-center justify-between">
                <p className="font-display italic text-charcoal">{selected.caption}</p>
                <button onClick={() => setSelected(null)} className="text-muted hover:text-charcoal transition-colors text-sm">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
