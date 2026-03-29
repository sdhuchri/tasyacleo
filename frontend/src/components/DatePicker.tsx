"use client";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 80 }, (_, i) => currentYear - i);

interface Props {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
}

export default function DatePicker({ value, onChange }: Props) {
  const [year, month, day] = value ? value.split("-").map(Number) : [null, null, null];

  const update = (y: number | null, m: number | null, d: number | null) => {
    if (y && m && d) {
      const mm = String(m).padStart(2, "0");
      const dd = String(d).padStart(2, "0");
      onChange(`${y}-${mm}-${dd}`);
    } else {
      onChange("");
    }
  };

  const selectClass =
    "flex-1 bg-cream border border-border rounded-xl px-4 py-3.5 text-charcoal text-sm focus:outline-none focus:border-rose/50 transition-colors appearance-none cursor-pointer text-center";

  return (
    <div className="space-y-3">
      <p className="section-label text-center">Date of birth</p>
      <div className="flex gap-3">
        {/* Month */}
        <div className="relative flex-1">
          <select
            value={month ?? ""}
            onChange={(e) => update(year, Number(e.target.value) || null, day)}
            className={selectClass}
          >
            <option value="" disabled>Month</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={i + 1}>{m}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="#9C9491" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Day */}
        <div className="relative w-24">
          <select
            value={day ?? ""}
            onChange={(e) => update(year, month, Number(e.target.value) || null)}
            className={selectClass}
          >
            <option value="" disabled>Day</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="#9C9491" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Year */}
        <div className="relative w-28">
          <select
            value={year ?? ""}
            onChange={(e) => update(Number(e.target.value) || null, month, day)}
            className={selectClass}
          >
            <option value="" disabled>Year</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="#9C9491" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
