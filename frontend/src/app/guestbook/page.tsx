"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { log } from "@/lib/logger";

const ALL_VERSES = [
  { text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", source: "1 Corinthians 13:4" },
  { text: "And now these three remain: faith, hope and love. But the greatest of these is love.", source: "1 Corinthians 13:13" },
  { text: "Love never fails. But where there are prophecies, they will cease; where there are tongues, they will be stilled.", source: "1 Corinthians 13:8" },
  { text: "We love because he first loved us.", source: "1 John 4:19" },
  { text: "Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God.", source: "1 John 4:7" },
  { text: "God is love. Whoever lives in love lives in God, and God in them.", source: "1 John 4:16" },
  { text: "I have loved you with an everlasting love; I have drawn you with unfailing kindness.", source: "Jeremiah 31:3" },
  { text: "You are altogether beautiful, my darling; there is no flaw in you.", source: "Song of Solomon 4:7" },
  { text: "I am my beloved's and my beloved is mine.", source: "Song of Solomon 6:3" },
  { text: "Place me like a seal over your heart, like a seal on your arm; for love is as strong as death.", source: "Song of Solomon 8:6" },
  { text: "How beautiful you are, my darling! Oh, how beautiful!", source: "Song of Solomon 1:15" },
  { text: "Above all, love each other deeply, because love covers over a multitude of sins.", source: "1 Peter 4:8" },
  { text: "Beloved, I pray that you may prosper in all things and be in health, just as your soul prospers.", source: "3 John 1:2" },
  { text: "There is no fear in love. But perfect love drives out fear.", source: "1 John 4:18" },
  { text: "Two are better than one, because they have a good return for their labor.", source: "Ecclesiastes 4:9" },
  { text: "A friend loves at all times, and a brother is born for a time of adversity.", source: "Proverbs 17:17" },
  { text: "Whoever finds a wife finds what is good and receives favor from the Lord.", source: "Proverbs 18:22" },
  { text: "The Lord God said, it is not good for the man to be alone. I will make a helper suitable for him.", source: "Genesis 2:18" },
  { text: "Be completely humble and gentle; be patient, bearing with one another in love.", source: "Ephesians 4:2" },
  { text: "Husbands, love your wives, just as Christ loved the church and gave himself up for her.", source: "Ephesians 5:25" },
  { text: "Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart.", source: "Proverbs 3:3" },
  { text: "Many waters cannot quench love; rivers cannot sweep it away.", source: "Song of Solomon 8:7" },
  { text: "How delightful is your love, my bride! How much more pleasing is your love than wine.", source: "Song of Solomon 4:10" },
  { text: "The Lord appeared to him from far away. I have loved you with an everlasting love.", source: "Jeremiah 31:3" },
  { text: "See what great love the Father has lavished on us, that we should be called children of God!", source: "1 John 3:1" },
  { text: "Pursue love, and earnestly desire the spiritual gifts.", source: "1 Corinthians 14:1" },
  { text: "And over all these virtues put on love, which binds them all together in perfect unity.", source: "Colossians 3:14" },
  { text: "Let all that you do be done in love.", source: "1 Corinthians 16:14" },
  { text: "Love does no harm to a neighbor. Therefore love is the fulfillment of the law.", source: "Romans 13:10" },
  { text: "In love he predestined us for adoption to sonship through Jesus Christ — to the praise of his glorious grace.", source: "Ephesians 1:4–5" },
];

const DISPLAY_COUNT = 5;

function getRandomVerses() {
  const shuffled = [...ALL_VERSES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, DISPLAY_COUNT);
}

const INTENTIONS_KEY = "tasyacleo_intentions";

interface Intention {
  id: string;
  text: string;
  date: string;
}

export default function GuestbookPage() {
  const [intentions, setIntentions] = useState<Intention[]>([]);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [verses, setVerses] = useState(ALL_VERSES.slice(0, DISPLAY_COUNT));

  useEffect(() => {
    setVerses(getRandomVerses());
    log("page.visit", "devotion");
  }, []);
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(INTENTIONS_KEY);
      if (stored) setIntentions(JSON.parse(stored));
    } catch {}
  }, []);

  const handleSubmit = () => {
    if (!input.trim()) return;
    const newItem: Intention = {
      id: Date.now().toString(),
      text: input.trim(),
      date: new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }),
    };
    const updated = [newItem, ...intentions];
    setIntentions(updated);
    try { localStorage.setItem(INTENTIONS_KEY, JSON.stringify(updated)); } catch {}
    setInput("");
    log("prayer.saved", input.trim());
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Devotion</p>
          <h1 className="heading-display text-5xl md:text-6xl text-charcoal">
            Word &amp;<br />
            <span className="italic text-rose">Grace</span>
          </h1>
          <span className="divider mx-auto mt-6" />
          <p className="text-charcoal-light text-sm mt-6 leading-relaxed max-w-sm mx-auto">
            Words that remind us — we never walk alone.
          </p>
        </motion.div>

        {/* Scripture cards */}
        <div className="space-y-5 mb-8">
          {verses.map((b, i) => (
            <motion.div
              key={b.source + i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="card p-8"
            >
              <p className="font-display italic text-lg text-charcoal leading-relaxed mb-4">
                &ldquo;{b.text}&rdquo;
              </p>
              <span className="divider mb-3" />
              <p className="section-label text-[10px] text-muted">{b.source}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-16">
          <button
            onClick={() => setVerses(getRandomVerses())}
            className="text-xs text-muted tracking-widest uppercase hover:text-rose transition-colors border-b border-transparent hover:border-rose/40 pb-0.5"
          >
            Show more verses
          </button>
        </div>

        {/* Personal intention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card p-10 mb-10"
        >
          <p className="section-label mb-4">Prayer Intention</p>
          <h2 className="heading-display text-3xl text-charcoal italic mb-2">What are you praying for?</h2>
          <p className="text-charcoal-light text-sm mb-8">
            Write your prayer or intention for today. Saved here, just for you.
          </p>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Lord, today I pray for..."
            rows={4}
            className="w-full bg-cream border border-border rounded-xl px-5 py-4 text-charcoal placeholder:text-muted text-sm leading-relaxed resize-none focus:outline-none focus:border-rose/40 transition-colors mb-5"
          />

          {submitted && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-rose text-center mb-4">
              Your prayer has been saved. Amen.
            </motion.p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="w-full py-4 bg-rose text-white text-xs tracking-widest uppercase rounded-full hover:bg-rose/90 transition-colors disabled:opacity-40"
          >
            Save Prayer
          </button>
        </motion.div>

        {/* Saved intentions */}
        {intentions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label mb-6">Your Intentions</p>
            <div className="space-y-4">
              {intentions.map((item) => (
                <div key={item.id} className="card p-6">
                  <p className="font-display italic text-charcoal leading-relaxed">
                    &ldquo;{item.text}&rdquo;
                  </p>
                  <p className="text-muted text-xs mt-3">{item.date}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
