"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import GalaxyBackground from "@/components/GalaxyBackground";

export default function MultumirePage() {
  useEffect(() => {
    // Confetti — explozie inițială + valuri scurte
    const fire = (origin: { x: number; y: number }, particleCount: number) => {
      confetti({
        particleCount,
        spread: 80,
        startVelocity: 35,
        origin,
        colors: ["#4f8eff", "#a78bfa", "#ffffff", "#fbbf24", "#34d399"],
        scalar: 1.1,
        ticks: 200,
      });
    };

    // Burst central
    fire({ x: 0.5, y: 0.5 }, 120);

    // Margini după 200ms
    setTimeout(() => fire({ x: 0.2, y: 0.55 }, 60), 200);
    setTimeout(() => fire({ x: 0.8, y: 0.55 }, 60), 350);
    // Final
    setTimeout(() => fire({ x: 0.5, y: 0.45 }, 80), 700);
  }, []);

  return (
    <>
      <GalaxyBackground density={0.7} showShootingStars />

      <main className="relative z-10 min-h-screen flex flex-col items-center">
        <header className="w-full max-w-6xl px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Clevs AI"
              width={130}
              height={37}
              style={{ objectFit: "contain", mixBlendMode: "lighten" }}
            />
          </Link>
        </header>

        <section className="flex-1 flex items-center justify-center px-6 pb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* Big check */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center shadow-[0_0_60px_var(--accent-glow)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-12 h-12 text-background"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.1]"
            >
              Te felicit! Ești cu un pas{" "}
              <span className="bg-gradient-to-r from-accent via-blue-300 to-purple-400 bg-clip-text text-transparent">
                înaintea a 87% din afaceri
              </span>{" "}
              din România.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-lg sm:text-xl text-foreground-muted mb-10 max-w-xl mx-auto"
            >
              În maxim 5 minute primești pe email analiza personalizată pentru afacerea ta.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="card text-left max-w-md mx-auto mb-10"
            >
              <div className="text-sm text-foreground-muted mb-4">Ce urmează:</div>
              <div className="space-y-4">
                {[
                  { num: "1", text: "Analizăm răspunsurile tale" },
                  { num: "2", text: "Pregătim estimări și soluții personalizate" },
                  { num: "3", text: "Primești emailul cu raportul în max 5 min" },
                ].map((item, i) => (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-surface border border-border-strong flex items-center justify-center text-xs font-mono text-accent">
                      {item.num}
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="text-sm text-foreground-dim"
            >
              Nu vezi emailul în 5 minute? Verifică la{" "}
              <span className="text-foreground-muted">Spam</span> sau{" "}
              <span className="text-foreground-muted">Promotions</span>. Dacă tot nu apare,
              scrie-ne la{" "}
              <a
                href="mailto:clevs.contact@gmail.com"
                className="text-accent hover:text-accent-hover transition"
              >
                clevs.contact@gmail.com
              </a>
              .
            </motion.p>
          </motion.div>
        </section>
      </main>
    </>
  );
}
