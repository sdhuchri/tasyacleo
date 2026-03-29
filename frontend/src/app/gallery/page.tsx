"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { log } from "@/lib/logger";

const ALL_PHOTOS = [
  { id: 1, src: "/images/tasya/IMG_7559.jpeg", caption: "That smile got me", tag: "Favorite" },
  { id: 2, src: "/images/tasya/IMG_7560.jpeg", caption: "God made you beautiful", tag: "Beautiful" },
  { id: 3, src: "/images/tasya/IMG_7561.jpeg", caption: "You always shine, Sya", tag: "Favorite" },
  { id: 4, src: "/images/tasya/IMG_7562.jpeg", caption: "This is what beauty looks like", tag: "Beautiful" },
];

const PLACEHOLDERS = [
  { id: "p1", label: "First date", note: "needs to happen first" },
  { id: "p2", label: "Lany concert", note: "you said maybe" },
  { id: "p3", label: "Us, somewhere", note: "chapter not written yet" },
];

type GridItem =
  | { type: "photo"; data: typeof ALL_PHOTOS[0] }
  | { type: "placeholder"; data: typeof PLACEHOLDERS[0] };

function buildRandomGrid(photos: typeof ALL_PHOTOS): GridItem[] {
  const items: GridItem[] = photos.map(d => ({ type: "photo", data: d }));
  PLACEHOLDERS.forEach(p => {
    const pos = Math.floor(Math.random() * (items.length + 1));
    items.splice(pos, 0, { type: "placeholder", data: p });
  });
  return items;
}

const TAGS = ["All", "Favorite", "Beautiful", "Memories"];

function PlaceholderCard({ label, note }: { label: string; note: string }) {
  return (
    <div className="break-inside-avoid">
      <div className="relative overflow-hidden rounded-xl border border-dashed border-rose/30 bg-rose-pale/20 aspect-[3/4] flex flex-col items-center justify-center gap-3 p-6 text-center">
        {/* 404 icon */}
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 opacity-40">
          <rect x="6" y="10" width="36" height="28" rx="3" stroke="#C4847A" strokeWidth="1.4"/>
          <circle cx="17" cy="20" r="3" stroke="#C4847A" strokeWidth="1.2"/>
          <path d="M6 30 L16 22 L24 29 L32 22 L42 32" stroke="#C4847A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div>
          <p className="font-display italic text-rose text-xl leading-snug mb-1">{label}</p>
          <p className="text-xs text-muted tracking-wide">— {note} —</p>
        </div>
        <span className="absolute top-3 right-3 text-[9px] tracking-widest uppercase text-rose/40 font-medium">
          404
        </span>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [selected, setSelected] = useState<typeof ALL_PHOTOS[0] | null>(null);
  const [grid, setGrid] = useState<GridItem[]>(() => ALL_PHOTOS.map(d => ({ type: "photo", data: d })));

  useEffect(() => {
    setGrid(buildRandomGrid(ALL_PHOTOS));
    log("page.visit", "gallery");
  }, []);

  const filtered = activeTag === "All"
    ? grid
    : ALL_PHOTOS.filter((p) => p.tag === activeTag).map(d => ({ type: "photo" as const, data: d }));

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Gallery</p>
          <h1 className="heading-display text-6xl md:text-7xl text-charcoal">
            Moments<br />
            <span className="italic text-rose">with Tasya</span>
          </h1>
          <span className="divider mx-auto mt-6" />
        </motion.div>

        {/* Filter */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`text-xs tracking-widest uppercase px-5 py-2 rounded-full border transition-all duration-200 ${
                activeTag === tag
                  ? "bg-rose text-white border-rose"
                  : "border-border text-charcoal-light hover:border-rose hover:text-rose"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="columns-2 md:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((item, i) => (
              item.type === "placeholder" ? (
                <motion.div
                  key={item.data.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <PlaceholderCard label={item.data.label} note={item.data.note} />
                </motion.div>
              ) : (
                <motion.div
                  key={item.data.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => { setSelected(item.data); log("gallery.photo_viewed", item.data.caption); }}
                >
                  <div className="relative overflow-hidden rounded-xl bg-cream-dark">
                    <Image
                      src={item.data.src}
                      alt={item.data.caption}
                      width={400}
                      height={500}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-end p-4">
                      <p className="font-display italic text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.data.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom note */}
        {activeTag === "All" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-muted text-xs tracking-widest uppercase mt-16"
          >
            More frames waiting to be filled — with you.
          </motion.p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/85 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/4] bg-cream-dark">
                <Image src={selected.src} alt={selected.caption} fill className="object-cover" />
              </div>
              <div className="p-5 flex items-center justify-between">
                <p className="font-display italic text-charcoal">{selected.caption}</p>
                <button onClick={() => setSelected(null)} className="text-xs tracking-widest uppercase text-muted hover:text-charcoal transition-colors">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
