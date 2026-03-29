"use client";
import { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { log } from "@/lib/logger";

const SECRET_PASSWORD = "march16";
const BAGI_CODE = "02179400";

function BagiBagiCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BAGI_CODE);
    setCopied(true);
    log("code.copied", "BagiBagi code");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card p-8">
      <p className="section-label text-center mb-3">A little something for you</p>
      <p className="text-charcoal-light text-sm text-center leading-relaxed mb-6">
        Open <span className="text-charcoal font-medium">myBCA</span> → <span className="text-charcoal font-medium">BagiBagi</span> → paste this code.
      </p>

      <div className="flex items-center gap-3 bg-cream border border-border rounded-xl px-5 py-4">
        <p className="font-display italic text-2xl text-charcoal tracking-widest flex-1 text-center">
          {BAGI_CODE}
        </p>
        <button
          onClick={handleCopy}
          className="shrink-0 w-9 h-9 rounded-full bg-rose/10 hover:bg-rose/20 flex items-center justify-center transition-colors"
        >
          {copied
            ? <Check size={15} className="text-rose" />
            : <Copy size={15} className="text-rose" />
          }
        </button>
      </div>

      {copied && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-rose text-center mt-3 tracking-wide"
        >
          Copied to clipboard
        </motion.p>
      )}
    </div>
  );
}

export default function SecretPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => { log("page.visit", "secret"); }, []);

  const handleUnlock = () => {
    if (password === SECRET_PASSWORD) {
      setUnlocked(true);
      log("secret.unlocked");
    } else {
      setError(true);
      log("secret.wrong_password", password);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="lock"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="card p-12 text-center"
            >
              <p className="section-label mb-6">Secret Page</p>
              <h1 className="heading-display text-5xl text-charcoal italic mb-3">
                For the eyes<br />that were meant to find this
              </h1>
              <span className="divider mx-auto mb-6" />
              <p className="text-muted text-xs tracking-wide mb-10">
                Hint: the day it all started.
              </p>

              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  className={`w-full bg-cream border rounded-xl px-5 py-4 text-charcoal text-center tracking-widest focus:outline-none transition-colors ${
                    error ? "border-red-300" : "border-border focus:border-rose/50"
                  }`}
                />
                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 text-center">
                    Wrong password.
                  </motion.p>
                )}
                <button
                  onClick={handleUnlock}
                  className="w-full py-4 bg-rose text-white text-xs tracking-widest uppercase rounded-full hover:bg-rose/90 transition-colors"
                >
                  Unlock
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="card p-12 text-center">
                <p className="section-label mb-4">You found it</p>
                <h2 className="heading-display text-4xl italic text-rose mb-6">Hey, Tasya</h2>
                <span className="divider mx-auto mb-8" />
                <div className="text-charcoal-light leading-loose space-y-4 text-[15px] text-left">
                  <p>
                    If you're reading this, it means you're the kind of person who gets curious —
                    and that's one of the things I like about you.
                  </p>
                  <p>
                    This wasn&apos;t made because you asked for it. But because something about you
                    makes me want to do small things that might make you smile.
                  </p>
                  <p>
                    You once said <span className="font-display italic text-rose">&ldquo;biasa aja&rdquo;</span> —
                    but there is nothing ordinary about you, Tasya.
                  </p>
                  <p className="font-display italic text-xl text-center text-charcoal pt-4">
                    With sincerity,<br />
                    <span className="text-rose">Sury</span>
                  </p>
                </div>
              </div>

              {/* BagiBagi code */}
              <BagiBagiCard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
