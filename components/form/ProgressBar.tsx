"use client";

import { motion } from "framer-motion";

const STEP_LABELS = [
  "Tip afacere",
  "Volum",
  "Angajați",
  "Canale",
  "Situații",
  "Contact",
];

export default function ProgressBar({ step }: { step: number }) {
  const percent = ((step - 1) / 5) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-medium">
        <span className="text-foreground-muted">
          Pasul <span className="text-foreground">{step}</span> din 6
        </span>
        <span className="text-accent font-mono">{Math.round(((step) / 6) * 100)}%</span>
      </div>
      <div className="relative h-2 rounded-full bg-surface overflow-hidden border border-border">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent to-purple-400 rounded-full"
          initial={false}
          animate={{ width: `${(step / 6) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="hidden sm:flex items-center justify-between mt-3 text-xs text-foreground-dim">
        {STEP_LABELS.map((label, i) => (
          <div
            key={label}
            className={`transition-colors ${
              i + 1 <= step ? "text-foreground-muted" : "text-foreground-dim"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
