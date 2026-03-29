"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GeneratingStatus from "@/components/GeneratingStatus";
import { log } from "@/lib/logger";

const LETTER_MESSAGES = [
  "Finding the right words...",
  "Putting feelings into sentences...",
  "Making it personal...",
  "Almost done...",
];

const MOODS = [
  { label: "Missing you" },
  { label: "Happy" },
  { label: "Longing" },
  { label: "In awe" },
  { label: "Full of love" },
  { label: "Grateful" },
];

export default function LetterPage() {
  const [mood, setMood] = useState("");
  const [message, setMessage] = useState("");
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "letter">("form");

  useEffect(() => { log("page.visit", "letter"); }, []);

  const handleGenerate = async () => {
    if (!mood) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, message }),
      });
      const data = await res.json();
      setLetter(data.letter);
      setStep("letter");
      log("letter.generated", `Mood: ${mood}`);
    } catch {
      setLetter(
        `Tasya,\n\nI don't know if you realize it, but there's something about you that stays with me. Not in an overwhelming way — just quietly, like a thought I keep coming back to.\n\nFeeling ${mood.toLowerCase()}, I figured the least I could do is be honest. You're the kind of person who makes ordinary moments feel worth paying attention to.\n\nI'm not sure where this goes. But I know I'd rather say something than say nothing.\n\nFor what it's worth,`
      );
      setStep("letter");
      log("letter.generated", `Mood: ${mood} (fallback)`);
    }
    setLoading(false);
  };

  const reset = () => { setStep("form"); setMood(""); setMessage(""); setLetter(""); };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <p className="section-label mb-4">AI Love Letter</p>
          <h1 className="heading-display text-5xl md:text-6xl text-charcoal">
            A letter<br />
            <span className="italic text-rose">for you</span>
          </h1>
          <span className="divider mx-auto mt-6" />
        </motion.div>

        <AnimatePresence mode="wait">
          {step === "form" ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              {/* Mood */}
              <div className="card p-8">
                <p className="section-label mb-5">How are you feeling?</p>
                <div className="grid grid-cols-3 gap-2">
                  {MOODS.map((m) => (
                    <button
                      key={m.label}
                      onClick={() => setMood(m.label)}
                      className={`py-3 px-2 rounded-lg border text-sm transition-all duration-200 ${
                        mood === m.label
                          ? "border-rose bg-rose-pale text-rose"
                          : "border-border text-charcoal-light hover:border-rose/50"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional context */}
              <div className="card p-8">
                <p className="section-label mb-4">Add context (optional)</p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me a little more about what you feel..."
                  rows={4}
                  className="w-full bg-cream text-charcoal placeholder:text-muted text-sm leading-relaxed resize-none focus:outline-none"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!mood || loading}
                className="w-full py-4 bg-rose text-white text-xs tracking-widest uppercase rounded-full hover:bg-rose/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Writing..." : "Generate Letter"}
              </button>
              {loading && <GeneratingStatus messages={LETTER_MESSAGES} />}
            </motion.div>
          ) : (
            <motion.div key="letter" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
              {/* Letter card */}
              <div className="card p-10 relative">
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-rose/40 to-transparent rounded-t-2xl" />
                <p className="font-display italic text-2xl text-rose mb-6 text-center">For Tasya</p>
                <p className="text-charcoal-light leading-loose text-[15px] whitespace-pre-line">{letter}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={reset} className="flex-1 py-3.5 border border-border text-charcoal-light text-xs tracking-widest uppercase rounded-full hover:border-charcoal transition-colors">
                  Write again
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(letter)}
                  className="flex-1 py-3.5 bg-rose text-white text-xs tracking-widest uppercase rounded-full hover:bg-rose/90 transition-colors"
                >
                  Copy
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
