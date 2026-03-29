"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { DecorWaves } from "./Decor";
import { Coffee, Camera, Music2, CloudRain, Moon, Compass } from "lucide-react";

const MOMENTS = [
  {
    date: "March 16",
    title: "First Message",
    quote: "hi tasyaaa, u're so gorgeous",
    note: "Just like that — one simple message that started everything.",
  },
  {
    date: "March 17",
    title: "Lany Concert",
    quote: "lany date yukk, aku yg beliin tiketnya",
    note: "There's always a reason to invite you somewhere.",
  },
  {
    date: "March 27",
    title: "First Real Conversation",
    quote: "for me u jauh dari kata 'biasa aja'",
    note: "You said biasa aja. I never agreed.",
  },
  {
    date: "March 28",
    title: "Waited for Your Live",
    quote: "i tungguin wkwk... tp u cantik kok tetep",
    note: "Two hours waiting — not a single second wasted.",
  },
  {
    date: "March 28",
    title: "This Moment",
    quote: "lemme build u something, besok i show u",
    note: "And here it is. A small place, made just for you.",
  },
];

function StoryItem({ moment, index }: { moment: typeof MOMENTS[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`flex gap-6 md:gap-12 items-start ${isLeft ? "flex-row" : "flex-row-reverse"} mb-12`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <p className="section-label mb-2">{moment.date}</p>
        <h3 className="heading-display text-2xl text-charcoal mb-2">{moment.title}</h3>
        <p className="font-display italic text-rose text-lg mb-2 leading-relaxed">
          &ldquo;{moment.quote}&rdquo;
        </p>
        <p className="text-charcoal-light text-sm leading-relaxed">{moment.note}</p>
      </div>

      {/* Timeline dot */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div className="w-3 h-3 rounded-full bg-rose ring-4 ring-rose-pale" />
        {index < MOMENTS.length - 1 && <div className="w-px flex-1 bg-border mt-2 min-h-[60px]" />}
      </div>

      {/* Empty side */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

const FUTURE_MOMENTS = [
  { title: "First Date",           note: "Somewhere nice. Just the two of us.",              icon: Coffee    },
  { title: "First Photo Together", note: "The one we'll always look back on.",               icon: Camera    },
  { title: "Lany Concert",         note: "You said maybe. I'm holding on to that.",          icon: Music2    },
  { title: "Rainy Day",            note: "Same umbrella, different excuse to be close.",     icon: CloudRain },
  { title: "Late Night Talks",     note: "The kind where you lose track of time.",           icon: Moon      },
  { title: "Somewhere New",        note: "Doesn't matter where — as long as you're there.", icon: Compass   },
];

export default function OurStory() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [futureRef, futureInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-28 px-6 bg-cream-dark relative overflow-hidden">
      <DecorWaves />
      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="section-label mb-4">Our Story</p>
          <h2 className="heading-display text-5xl md:text-6xl text-charcoal">
            From the start<br />
            <span className="italic text-rose">until now</span>
          </h2>
          <span className="divider mx-auto mt-6" />
        </motion.div>

        <div>
          {MOMENTS.map((moment, i) => (
            <StoryItem key={moment.date + i} moment={moment} index={i} />
          ))}
        </div>

        {/* Future moments */}
        <motion.div
          ref={futureRef}
          initial={{ opacity: 0, y: 20 }}
          animate={futureInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <span className="divider mx-auto mb-8" />
          <p className="section-label mb-3">What&apos;s next</p>
          <h3 className="heading-display text-3xl md:text-4xl text-charcoal mb-2">
            Moments waiting<br />
            <span className="italic text-rose">to be made</span>
          </h3>
          <p className="text-charcoal-light text-sm mt-4 mb-12 max-w-xs mx-auto leading-relaxed">
            These pages are still blank — want to fill them with me?
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {FUTURE_MOMENTS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={futureInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="card p-6 text-center hover-lift group"
              >
                <div className="flex justify-center mb-4">
                  <item.icon size={32} strokeWidth={1.2} className="text-rose/60 group-hover:text-rose transition-colors duration-200" />
                </div>
                <p className="text-sm font-medium text-charcoal tracking-wide mb-1">{item.title}</p>
                <p className="text-muted text-xs leading-relaxed">{item.note}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
