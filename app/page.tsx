"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GalaxyBackground from "@/components/GalaxyBackground";

export default function LandingPage() {
  return (
    <>
      <GalaxyBackground />

      <main className="relative z-10 flex flex-col items-center w-full">
        {/* Header */}
        <header className="w-full max-w-6xl px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-bold text-background">
              C
            </div>
            <span className="font-semibold text-lg">Clevs AI</span>
          </Link>
          <nav className="text-sm text-foreground-muted hidden sm:flex items-center gap-6">
            <a href="#cum-functioneaza" className="hover:text-foreground transition">
              Cum funcționează
            </a>
            <a href="#de-ce-conteaza" className="hover:text-foreground transition">
              De ce contează
            </a>
            <Link href="/audit/start" className="text-accent hover:text-accent-hover transition">
              Începe audit →
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <section className="w-full max-w-5xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-strong bg-surface text-sm text-foreground-muted mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Audit gratuit • 2 minute • personalizat
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              Cât pierde afacerea ta
              <br />
              <span className="bg-gradient-to-r from-accent via-blue-300 to-purple-400 bg-clip-text text-transparent">
                în fiecare lună fără să știi?
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              Răspunde la 6 întrebări scurte. Primești pe email o analiză personalizată cu
              estimări concrete și soluții pe nevoia ta. Fără bla-bla.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/audit/start" className="btn-primary text-base sm:text-lg group">
                Vreau analiza gratuită
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a href="#cum-functioneaza" className="btn-secondary text-base">
                Cum funcționează
              </a>
            </div>

            <p className="text-sm text-foreground-dim mt-8">
              ✓ Fără card • ✓ Fără reclame ulterioare • ✓ Răspuns în maxim 5 minute
            </p>
          </motion.div>

          {/* Video placeholder — drop /public/hero.mp4 to activate */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-border-strong bg-surface backdrop-blur-sm group">
              {/* Înlocuiește cu <video> când ai fișierul */}
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/hero-poster.jpg"
              >
                <source src="/hero.mp4" type="video/mp4" />
              </video>
              {/* Fallback / placeholder vizibil până ai videoul */}
              <div className="absolute inset-0 flex items-center justify-center text-foreground-dim text-sm bg-gradient-to-br from-accent/10 to-purple-500/10 pointer-events-none [video:not([poster])~&]:hidden">
                <div className="text-center">
                  <div className="text-5xl mb-3 opacity-30">▶</div>
                  <div>Spațiu video hero (1 min)</div>
                  <div className="text-xs mt-1 opacity-60">/public/hero.mp4</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* De ce contează */}
        <section id="de-ce-conteaza" className="w-full max-w-5xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Majoritatea afacerilor pierd bani{" "}
              <span className="text-accent">fără să-și dea seama</span>
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              Apeluri ratate. Lead-uri uitate. Întrebări repetate. Programări care nu se prezintă.
              Toate astea costă mai mult decât crezi.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                emoji: "📞",
                title: "Apeluri pierdute",
                desc: "Fiecare apel neridicat = un client mers la concurență. Singur nu poți răspunde mereu.",
              },
              {
                emoji: "⏰",
                title: "Timp irosit",
                desc: "Răspunzi la aceleași întrebări de 100 de ori pe săptămână. Timp pe care l-ai putea folosi pentru clienți reali.",
              },
              {
                emoji: "💸",
                title: "Lead-uri reci",
                desc: "Persoane care au întrebat de preț și au dispărut. Nu le mai contactează nimeni vreodată.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card hover:border-border-strong transition"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Cum funcționează */}
        <section id="cum-functioneaza" className="w-full max-w-5xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Cum funcționează auditul
            </h2>
            <p className="text-foreground-muted text-lg">3 pași simpli, 0 angajament.</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            {[
              {
                step: "01",
                title: "Răspunzi la 6 întrebări",
                desc: "Tip afacere, volum, canale, situații cunoscute. 2 minute, fără înregistrare.",
              },
              {
                step: "02",
                title: "Generăm analiza",
                desc: "Primești pe email o analiză cu estimări concrete și soluții pentru tine.",
              },
              {
                step: "03",
                title: "Decizi tu",
                desc: "Ai analiza, e a ta. Dacă vrei să implementăm împreună, programezi un call de 15 min.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card relative"
              >
                <div className="text-accent font-mono text-sm mb-3">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="w-full max-w-3xl px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
              Hai să vedem cât poți recupera.
            </h2>
            <p className="text-foreground-muted text-lg mb-10">
              Durează 2 minute. Iese gratis. Nu te costă nimic să afli.
            </p>
            <Link href="/audit/start" className="btn-primary text-lg group">
              Vreau analiza gratuită
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-border mt-12">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground-dim">
            <div>© {new Date().getFullYear()} Clevs AI Agency</div>
            <div className="flex items-center gap-6">
              <a
                href="mailto:clevs.ai.agency@gmail.com"
                className="hover:text-foreground transition"
              >
                clevs.ai.agency@gmail.com
              </a>
              <a href="tel:0722774524" className="hover:text-foreground transition">
                0722 774 524
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
