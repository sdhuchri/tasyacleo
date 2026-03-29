"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { DecorRings } from "./Decor";

const SPECIAL_DAYS = [
  { month: 4,  day: 3,  label: "Good Friday",      question: "Want to spend Good Friday together?" },
  { month: 4,  day: 5,  label: "Easter Sunday",     question: "Spend Easter Sunday with me?" },
  { month: 5,  day: 14, label: "Ascension Day",     question: "Let's make this day meaningful — together." },
  { month: 8,  day: 17, label: "Independence Day",  question: "17 Agustus, want to celebrate it together?" },
  { month: 12, day: 25, label: "Christmas",         question: "Spend Christmas with me this year?" },
];

function getNextSpecialDay() {
  const now = new Date();
  const year = now.getFullYear();
  const candidates = SPECIAL_DAYS.flatMap((d) => [
    { date: new Date(year, d.month - 1, d.day), label: d.label, question: d.question },
    { date: new Date(year + 1, d.month - 1, d.day), label: d.label, question: d.question },
  ]).filter((d) => d.date.getTime() > now.getTime());
  candidates.sort((a, b) => a.date.getTime() - b.date.getTime());
  return candidates[0];
}

function useCountdown(target: Date) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setDone(true); return; }
      setDone(false);
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return { t, done };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="heading-display text-5xl md:text-6xl text-charcoal tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <p className="section-label text-[10px] mt-2">{label}</p>
    </div>
  );
}

export default function CountdownSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { date, label, question } = useMemo(() => getNextSpecialDay(), []);
  const { t, done } = useCountdown(date);

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <DecorRings />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-4">There&apos;s a special day coming</p>

          <h2 className="heading-display text-4xl md:text-5xl text-charcoal mb-1">
            {label}
          </h2>
          <p className="text-muted text-sm mb-3">
            {date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <p className="font-display italic text-rose text-xl mb-12">{question}</p>

          {done ? (
            <p className="heading-display italic text-3xl text-rose">Happy {label}, Tasya!</p>
          ) : (
            <div className="flex items-center justify-center gap-8 md:gap-12">
              <TimeUnit value={t.days} label="Days" />
              <span className="heading-display text-3xl text-sand mb-4">·</span>
              <TimeUnit value={t.hours} label="Hours" />
              <span className="heading-display text-3xl text-sand mb-4">·</span>
              <TimeUnit value={t.minutes} label="Minutes" />
              <span className="heading-display text-3xl text-sand mb-4">·</span>
              <TimeUnit value={t.seconds} label="Seconds" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
