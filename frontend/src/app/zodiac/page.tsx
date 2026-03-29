"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GeneratingStatus from "@/components/GeneratingStatus";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { log } from "@/lib/logger";

const ZODIAC_MESSAGES = [
  "Reading the stars...",
  "Consulting the cosmos...",
  "Decoding your sign...",
  "Almost there...",
];

interface ZodiacResult {
  sign: string; element: string; emoji: string;
  personality: string; strengths: string[];
  affirmation: string; color: string; luckToday: string;
}

export default function ZodiacPage() {
  const [birthdate, setBirthdate] = useState("");
  const [result, setResult] = useState<ZodiacResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { log("page.visit", "zodiac"); }, []);

  const handleGenerate = async () => {
    if (!birthdate) return;
    setLoading(true);
    try {
      const res = await fetch("/api/zodiac", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthdate }),
      });
      const data = await res.json();
      setResult(data);
      log("zodiac.checked", `${data.sign} — ${birthdate}`);
    } catch {
      setResult({
        sign: "Pisces", element: "Water", emoji: "♓",
        personality: "A soul of deep feeling and sharp intuition. You love wholeheartedly and always show up for the people who matter to you.",
        strengths: ["Determined", "Loyal", "Intuitive", "Courageous"],
        affirmation: "Today I welcome all the good the universe has prepared for me — because I know I deserve it.",
        color: "Deep Rose & Dusty Mauve",
        luckToday: "Your energy is strong today. Trust your first instinct.",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <p className="section-label mb-4">Zodiac & Persona</p>
          <h1 className="heading-display text-5xl md:text-6xl text-charcoal">
            Your stars<br />
            <span className="italic text-rose">have a story</span>
          </h1>
          <span className="divider mx-auto mt-6" />
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card p-10 text-center space-y-8">
              <p className="heading-display italic text-2xl text-charcoal-light">When were you born?</p>
              <DatePicker
                selected={birthdate ? new Date(birthdate) : null}
                onChange={(date) => setBirthdate(date ? date.toISOString().split("T")[0] : "")}
                dateFormat="MMMM d, yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()}
                placeholderText="Select your birthday"
                className="w-full bg-cream border border-border rounded-xl px-5 py-4 text-charcoal text-sm text-center focus:outline-none focus:border-rose/50 transition-colors cursor-pointer"
                wrapperClassName="w-full"
                calendarClassName="tasya-calendar"
              />
              <button
                onClick={handleGenerate}
                disabled={!birthdate || loading}
                className="w-full py-4 bg-rose text-white text-xs tracking-widest uppercase rounded-full hover:bg-rose/90 transition-colors disabled:opacity-40"
              >
                {loading ? "Reading..." : "Reveal My Persona"}
              </button>
              {loading && <GeneratingStatus messages={ZODIAC_MESSAGES} />}
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">

              {/* Sign header card */}
              <div className="card p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-rose/40 to-transparent" />
                <p className="section-label mb-3">{result.element}</p>
                <h2 className="heading-display text-6xl text-charcoal mb-1">{result.sign}</h2>
                <p className="text-muted text-xs tracking-widest uppercase mb-8">{result.emoji} · {result.color}</p>
                <span className="divider mx-auto mb-8" />
                <p className="text-charcoal-light text-sm leading-relaxed">{result.personality}</p>

                {/* Strengths */}
                <div className="grid grid-cols-2 gap-2 mt-8">
                  {result.strengths.map((s) => (
                    <div key={s} className="border border-border rounded-lg py-2.5 px-3 text-charcoal-light text-xs tracking-wider uppercase">
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Affirmation */}
              <div className="card p-8">
                <p className="section-label mb-4 text-center">Daily Affirmation</p>
                <p className="font-display italic text-xl text-charcoal text-center leading-relaxed">
                  &ldquo;{result.affirmation}&rdquo;
                </p>
              </div>

              {/* Today's energy */}
              <div className="card p-7 flex gap-5 items-start">
                <div className="w-px self-stretch bg-rose/30 shrink-0" />
                <div>
                  <p className="section-label mb-2">Today&apos;s Energy</p>
                  <p className="text-charcoal-light text-sm leading-relaxed">{result.luckToday}</p>
                </div>
              </div>

              <button
                onClick={() => { setResult(null); setBirthdate(""); }}
                className="w-full py-3.5 border border-border text-charcoal-light text-xs tracking-widest uppercase rounded-full hover:border-charcoal transition-colors"
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
