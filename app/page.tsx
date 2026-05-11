"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import GalaxyBackground from "@/components/GalaxyBackground";

// ── SVG Icons ──────────────────────────────────────────────────────────────────

function IconPhone() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11 19.79 19.79 0 01.46 2.38 2 2 0 012.45.5h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.14A16 16 0 0015.86 17.1l.91-.91a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      <line x1="17" y1="3" x2="21" y2="7"/>
      <line x1="21" y1="3" x2="17" y2="7"/>
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
      <line x1="2.5" y1="4.5" x2="5.5" y2="7.5"/>
    </svg>
  );
}

function IconLeads() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
      <line x1="19" y1="9" x2="23" y2="13"/>
      <line x1="23" y1="9" x2="19" y2="13"/>
    </svg>
  );
}

// ── Glow Word ─────────────────────────────────────────────────────────────────

function GlowWord({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <motion.span
      className="font-semibold text-foreground"
      animate={{
        textShadow: [
          "0 0 0px rgba(79,142,255,0)",
          "0 0 12px rgba(79,142,255,0.9), 0 0 24px rgba(79,142,255,0.4)",
          "0 0 0px rgba(79,142,255,0)",
        ],
        color: ["#f5f7ff", "#a8c8ff", "#f5f7ff"],
      }}
      transition={{ duration: 2.8, delay, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}

// ── Live Ticker ────────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  { biz: "Salon de înfrumusețare", city: "Cluj", time: "2 min" },
  { biz: "Cabinet stomatologic", city: "Timișoara", time: "7 min" },
  { biz: "Service auto", city: "Brașov", time: "14 min" },
  { biz: "Pensiune", city: "Sibiu", time: "21 min" },
  { biz: "Restaurant", city: "București", time: "28 min" },
  { biz: "Clinică veterinară", city: "Iași", time: "35 min" },
  { biz: "Frizerie", city: "Oradea", time: "47 min" },
];

function LiveTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % TICKER_ITEMS.length);
        setVisible(true);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const item = TICKER_ITEMS[index];

  return (
    <div className="flex items-center gap-2 text-sm min-w-0">
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
      <span
        style={{ transition: "opacity 0.3s", opacity: visible ? 1 : 0 }}
        className="text-foreground-muted truncate text-xs sm:text-sm"
      >
        <span className="text-foreground font-medium">{item.biz} din {item.city}</span>
        <span className="hidden sm:inline"> — analiză trimisă acum {item.time} în urmă</span>
      </span>
    </div>
  );
}

// ── Audit Mock Card (desktop only) ────────────────────────────────────────────

function AuditMockCard() {
  return (
    <div className="relative">
      <div style={{ position: "absolute", inset: 0, background: "rgba(79,142,255,0.18)", filter: "blur(60px)", borderRadius: "24px", transform: "scale(0.9)" }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        style={{ position: "relative", background: "#0a0f2a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}
      >
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "#4f8eff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11, color: "#050818" }}>C</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#f5f7ff" }}>Audit personalizat</span>
          </div>
          <span style={{ fontSize: 11, color: "#4ade80", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            generat
          </span>
        </div>
        <div style={{ padding: "20px" }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, color: "#6c7299", fontFamily: "monospace", marginBottom: 4, letterSpacing: "0.08em" }}>PENTRU</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#f5f7ff" }}>Cristina Beauty Studio</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: "#4f8eff", fontFamily: "monospace", marginBottom: 8, letterSpacing: "0.08em" }}>01 / PROBLEMA TA</div>
            <p style={{ fontSize: 13, color: "#b4bce0", lineHeight: 1.6, margin: 0 }}>
              Cristina, am înțeles că pierzi clienți care sună și nu prind pe nimeni. Fiecare apel neridicat înseamnă o programare pierdută...
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, color: "#6c7299", marginBottom: 6 }}>⏰ Timp pierdut</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#f5f7ff" }}>~10 ore/săpt.</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, color: "#6c7299", marginBottom: 6 }}>💸 Cost estimat</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#4f8eff" }}>~2.100 RON/lună</div>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px", position: "relative", overflow: "hidden" }}>
            <div style={{ fontSize: 10, color: "#4f8eff", fontFamily: "monospace", marginBottom: 10, letterSpacing: "0.08em" }}>03 / SOLUȚII PENTRU TINE</div>
            <div style={{ filter: "blur(4px)", userSelect: "none" }}>
              <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 6, marginBottom: 8, width: "80%" }} />
              <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 6, marginBottom: 8, width: "100%" }} />
              <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 6, width: "65%" }} />
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Link href="/audit/start" style={{ background: "#4f8eff", color: "#050818", fontWeight: 600, fontSize: 12, padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>
                Completează formularul →
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Mobile Hero Card ──────────────────────────────────────────────────────────

function MobileAuditPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="relative mt-8 rounded-2xl overflow-hidden"
      style={{ background: "#0a0f2a", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(79,142,255,0.1)", filter: "blur(30px)", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ position: "relative", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 20, height: 20, borderRadius: 5, background: "#4f8eff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 10, color: "#050818" }}>C</div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#f5f7ff" }}>Audit personalizat</span>
        </div>
        <span style={{ fontSize: 10, color: "#4ade80", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          generat
        </span>
      </div>

      <div style={{ position: "relative", padding: "14px 16px" }}>
        {/* Pentru */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 9, color: "#6c7299", fontFamily: "monospace", marginBottom: 3, letterSpacing: "0.08em" }}>PENTRU</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#f5f7ff" }}>Cristina Beauty Studio</div>
        </div>

        {/* 01 / Problema ta */}
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
          <div style={{ fontSize: 9, color: "#4f8eff", fontFamily: "monospace", marginBottom: 6, letterSpacing: "0.08em" }}>01 / PROBLEMA TA</div>
          <p style={{ fontSize: 12, color: "#b4bce0", lineHeight: 1.6, margin: 0 }}>
            Cristina, am înțeles că pierzi clienți care sună și nu prind pe nimeni. Fiecare apel neridicat înseamnă o programare pierdută...
          </p>
        </div>

        {/* Metrici */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 9, color: "#6c7299", marginBottom: 4 }}>⏰ Timp pierdut</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f5f7ff" }}>~10h/săpt.</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 9, color: "#6c7299", marginBottom: 4 }}>💸 Cost lunar</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#4f8eff" }}>~2.100 RON</div>
          </div>
        </div>

        {/* Soluții blur + CTA */}
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px 14px", position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: 9, color: "#4f8eff", fontFamily: "monospace", marginBottom: 8, letterSpacing: "0.07em" }}>03 / SOLUȚII PENTRU TINE</div>
          <div style={{ filter: "blur(3px)", userSelect: "none" }}>
            <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, width: "75%", marginBottom: 6 }} />
            <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, width: "90%", marginBottom: 6 }} />
            <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, width: "60%" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Link href="/audit/start" style={{ background: "#4f8eff", color: "#050818", fontWeight: 600, fontSize: 11, padding: "7px 14px", borderRadius: 8, textDecoration: "none" }}>
              Completează formularul →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Pain Points ────────────────────────────────────────────────────────────────

const PAINS = [
  { icon: <IconPhone />, title: "Apeluri neridicate", desc: "Fiecare apel neridicat = un client dus direct la concurență. Nu se mai întorc.", stat: "~30%", statLabel: "din apeluri rămân fără răspuns" },
  { icon: <IconClock />, title: "Întrebări repetitive", desc: "\"Cât costă?\", \"Aveți loc joi?\" — de 20 de ori pe zi, manual.", stat: "8–12h", statLabel: "pierdute pe săptămână" },
  { icon: <IconLeads />, title: "No-show la programări", desc: "20% din programări nu se prezintă. Slot gol, bani pierduți, nimeni n-a dat un reminder.", stat: "1 din 5", statLabel: "programări = loc gol" },
  { icon: <IconLeads />, title: "Lead-uri fără follow-up", desc: "Au întrebat de preț, au dispărut. Nimeni nu i-a mai sunat. Banii ăia au mers la altcineva.", stat: "60%", statLabel: "din lead-uri mor fără răspuns" },
  { icon: <IconPhone />, title: "Coș abandonat", desc: "Clienți care au ajuns pe site, au ales, și au plecat fără să cumpere. Fără niciun mesaj după.", stat: "70%", statLabel: "din vizitatori pleacă fără să cumpere" },
  { icon: <IconClock />, title: "Clienți inactivi", desc: "Clienți care au mai cumpărat dar au dispărut. Nu i-a contactat nimeni să-i aducă înapoi.", stat: "3×", statLabel: "mai ieftin să reactivezi vs să aduci nou" },
];

// ── Animated Step Number ──────────────────────────────────────────────────────

function PulsingStep({ num, stepIndex }: { num: string; stepIndex: number }) {
  const delay = stepIndex * 1.5;
  const cycle = 5.5;
  return (
    <motion.div
      className="w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-lg mb-6 relative z-10"
      animate={{
        boxShadow: ["0 0 0px rgba(79,142,255,0)", "0 0 18px rgba(79,142,255,0.8), 0 0 36px rgba(79,142,255,0.35)", "0 0 0px rgba(79,142,255,0)"],
        borderColor: ["rgba(79,142,255,0.25)", "rgba(79,142,255,1)", "rgba(79,142,255,0.25)"],
        color: ["#4f8eff", "#c0deff", "#4f8eff"],
      }}
      transition={{ duration: 0.9, delay, repeat: Infinity, repeatDelay: cycle - 0.9, ease: "easeInOut" }}
      style={{ background: "#0a0f2a", border: "1px solid rgba(79,142,255,0.25)" }}
    >
      {num}
    </motion.div>
  );
}

// ── Steps ──────────────────────────────────────────────────────────────────────

const STEPS = [
  { num: "01", title: "Răspunzi la 6 întrebări", desc: "Tip afacere, volum, situații concrete. 2 minute, fără cont, fără card." },
  { num: "02", title: "Primești analiza pe email", desc: "Sistemul nostru generează un raport complet personalizat. Ajunge în max 5 minute." },
  { num: "03", title: "Decizi tu ce urmează", desc: "Analiza e a ta. Dacă vrei implementare, rezervi un call de 15 min. Fără presiune." },
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <>
      <GalaxyBackground density={0.5} showShootingStars />

      <main className="relative z-10 flex flex-col items-center w-full overflow-x-hidden">

        {/* HEADER */}
        <header className="w-full max-w-6xl px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Clevs AI" width={28} height={28} style={{ objectFit: "contain", mixBlendMode: "lighten" }} />
            <span className="font-semibold text-lg">Clevs AI</span>
          </Link>
          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-8 text-sm">
            <a href="#de-ce-conteaza" className="text-foreground-muted hover:text-foreground transition">De ce contează</a>
            <a href="#cum-functioneaza" className="text-foreground-muted hover:text-foreground transition">Cum funcționează</a>
            <Link href="/audit/start" className="text-accent hover:text-accent-hover font-medium transition">Audit gratuit →</Link>
          </nav>
          {/* Mobile CTA */}
          <Link
            href="/audit/start"
            className="sm:hidden text-xs font-semibold text-accent px-3 py-2 rounded-lg transition"
            style={{ border: "1px solid rgba(79,142,255,0.35)", background: "rgba(79,142,255,0.08)" }}
          >
            Audit gratuit →
          </Link>
        </header>

        {/* HERO */}
        <section className="w-full max-w-6xl px-4 sm:px-6 pt-8 sm:pt-16 pb-12 sm:pb-20 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-strong bg-surface text-xs text-foreground-muted mb-6 sm:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Audit gratuit · 2 minute · personalizat
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.04] mb-5 sm:mb-6">
              Unde pierde
              <br />
              <span className="bg-gradient-to-r from-accent via-blue-300 to-purple-400 bg-clip-text text-transparent">
                afacerea ta?
              </span>
            </h1>

            <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mb-7 sm:mb-8 max-w-lg">
              6 întrebări. Afli unde pierzi <GlowWord delay={0}>bani</GlowWord> și{" "}
              <GlowWord delay={0.7}>timp</GlowWord> — plus cât poți{" "}
              <GlowWord delay={1.4}>recupera</GlowWord> și ce{" "}
              <GlowWord delay={2.1}>soluții</GlowWord> AI ți se potrivesc.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-10">
              <Link href="/audit/start" className="btn-primary text-base group">
                Vreau analiza gratuită
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a href="#cum-functioneaza" className="btn-secondary text-base">Cum funcționează</a>
            </div>

            <div className="flex items-center gap-4 sm:gap-5 text-xs text-foreground-dim">
              <span>✓ Fără card</span>
              <span>✓ Fără spam</span>
              <span>✓ Răspuns în 5 min</span>
            </div>

            {/* Mobile: audit preview card sub butoane */}
            <div className="lg:hidden">
              <MobileAuditPreview />
            </div>
          </motion.div>

          {/* Desktop: mock card */}
          <div className="hidden lg:block">
            <AuditMockCard />
          </div>
        </section>

        {/* LIVE TICKER */}
        <div className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <LiveTicker />
            <div className="hidden sm:flex items-center gap-2 text-xs text-foreground-dim flex-shrink-0">
              <span className="font-semibold text-foreground">47</span> de afaceri analizate săptămâna aceasta
            </div>
            {/* Mobile: compact stat */}
            <div className="sm:hidden flex items-center gap-1 text-xs text-foreground-dim flex-shrink-0">
              <span className="font-semibold text-foreground">47</span> analizate
            </div>
          </div>
        </div>

        {/* PAIN SECTION */}
        <section id="de-ce-conteaza" className="w-full py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12"
          >
            <div className="text-accent font-mono text-xs tracking-widest mb-4">DE CE CONTEAZĂ</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-2xl">
              Găurile pe unde
              <br />se scurg banii.
            </h2>
          </motion.div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            {/* Responsive grid — inline style removed, folosim className + CSS */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pain-grid">
              {PAINS.map((pain, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="card pain-card hover:border-border-strong transition-all duration-300"
                >
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-accent mb-3 sm:mb-4" style={{ background: "rgba(79,142,255,0.1)", border: "1px solid rgba(79,142,255,0.2)" }}>
                    {pain.icon}
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">{pain.stat}</div>
                  <div className="text-[10px] sm:text-xs text-foreground-dim mb-2 sm:mb-4 leading-tight">{pain.statLabel}</div>
                  <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">{pain.title}</h3>
                  <p className="text-foreground-muted text-xs sm:text-sm leading-relaxed hidden sm:block">{pain.desc}</p>
                  <p className="text-foreground-muted text-[11px] leading-snug sm:hidden">{pain.desc.split(".")[0]}.</p>
                </motion.div>
              ))}
            </div>

            {/* Fade gradient */}
            <div className="pain-fade absolute bottom-0 left-0 right-0 pointer-events-none" style={{ background: "linear-gradient(to top, #050818 30%, rgba(5,8,24,0.7) 65%, transparent 100%)" }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-6 px-4"
          >
            <Link
              href="/audit/start"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent border px-6 py-3 rounded-xl hover:bg-accent/10 transition"
              style={{ borderColor: "rgba(79,142,255,0.3)" }}
            >
              Află pe unde ți se scurg banii
              <span>→</span>
            </Link>
            <p className="text-xs text-foreground-dim mt-3">2 minute · gratis · personalizat pe afacerea ta</p>
          </motion.div>
        </section>

        {/* HOW IT WORKS */}
        <section id="cum-functioneaza" className="w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-14"
          >
            <div className="text-accent font-mono text-xs tracking-widest mb-4">CUM FUNCȚIONEAZĂ</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">3 pași.</h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 relative">
            {/* Desktop: connector line orizontal */}
            <div className="hidden sm:block absolute" style={{ top: 28, left: "18%", right: "18%", height: 1, background: "rgba(79,142,255,0.12)", overflow: "hidden" }}>
              <motion.div
                style={{ position: "absolute", top: 0, left: 0, width: 80, height: "100%", background: "linear-gradient(to right, transparent, rgba(79,142,255,0.9), transparent)" }}
                animate={{ x: ["-80px", "calc(100% + 80px)"] }}
                transition={{ duration: 3, delay: 0.4, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
              />
            </div>

            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                {/* Mobile: connector vertical între pași */}
                {i > 0 && (
                  <div className="sm:hidden flex justify-start mb-4 ml-7" style={{ height: 32, width: 1, background: "rgba(79,142,255,0.15)", position: "relative", overflow: "hidden" }}>
                    <motion.div
                      style={{ position: "absolute", top: 0, left: 0, right: 0, height: 16, background: "linear-gradient(to bottom, rgba(79,142,255,0.8), transparent)" }}
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{ duration: 1.2, delay: i * 1.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                    />
                  </div>
                )}
                <PulsingStep num={step.num} stepIndex={i} />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-foreground-muted text-sm sm:text-base leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AUDIT PREVIEW */}
        <section className="w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="text-accent font-mono text-xs tracking-widest mb-4">CE PRIMEȘTI</div>
            <h2 className="text-2xl sm:text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Nu un PDF generic. O analiză reală.</h2>
            <p className="text-foreground-muted text-sm sm:text-base max-w-xl mx-auto">
              Personalizată pe tipul tău de afacere, pe volumul tău, pe situațiile pe care le-ai selectat.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative max-w-3xl mx-auto"
          >
            <div style={{ position: "absolute", inset: 0, background: "rgba(79,142,255,0.08)", filter: "blur(60px)", borderRadius: 24 }} />
            <div style={{ position: "relative", background: "#0a0f2a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, overflow: "hidden" }}>
              {/* Browser chrome */}
              <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#070c1f", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(239,68,68,0.5)" }} />
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(234,179,8,0.5)" }} />
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(34,197,94,0.5)" }} />
                <div className="hidden sm:block" style={{ marginLeft: 10, flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "3px 10px", fontSize: 10, color: "#6c7299", textAlign: "center" }}>
                  clevs-audit.vercel.app/audit/...
                </div>
              </div>

              {/* Content — responsive padding */}
              <div className="p-5 sm:p-8">
                <div style={{ fontSize: 11, color: "#6c7299", marginBottom: 6 }}>Audit pentru Cristina Beauty Studio</div>
                <div className="text-lg sm:text-2xl font-bold mb-5" style={{ color: "#f5f7ff" }}>Salut, Cristina. Iată ce am găsit.</div>

                {/* Responsive: 1 col mobile, 2 col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "01 / Problema ta", text: "Pierzi clienți care sună și nu prind pe nimeni. Fiecare apel neridicat costă mai mult decât crezi..." },
                    { label: "02 / Estimările tale", text: "~10h/săptămână pierdute · ~2.100 RON/lună în oportunități ratate." },
                    { label: "03 / Soluții concrete", text: "3 sisteme fără jargon tehnic, implementate în max 2 săptămâni la tine." },
                    { label: "04 / Pasul următor", text: "Un call de 15 minute ca să vedem ce se poate face exact la tine." },
                  ].map((item, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontSize: 10, color: "#4f8eff", fontFamily: "monospace", marginBottom: 6, letterSpacing: "0.07em" }}>{item.label}</div>
                      <p style={{ fontSize: 13, color: "#b4bce0", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 18, textAlign: "center" }}>
                  <div style={{ display: "inline-block", background: "#4f8eff", color: "#050818", fontWeight: 600, padding: "10px 22px", borderRadius: 10, fontSize: 13, opacity: 0.85 }}>
                    Programează discovery call →
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA FINAL */}
        <section className="w-full max-w-4xl px-4 sm:px-6 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div style={{ position: "absolute", inset: 0, background: "rgba(79,142,255,0.06)", filter: "blur(60px)", borderRadius: "50%" }} />
              <div className="relative card py-10 px-5 sm:py-16 sm:px-8" style={{ borderColor: "rgba(79,142,255,0.2)" }}>
                <div className="text-accent font-mono text-xs tracking-widest mb-5 sm:mb-6">PASUL URMĂTOR</div>
                <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                  Hai să vedem cât{" "}
                  <br />
                  <span className="bg-gradient-to-r from-accent to-blue-300 bg-clip-text text-transparent">
                    poți recupera.
                  </span>
                </h2>
                <p className="text-foreground-muted text-base sm:text-lg mb-8 sm:mb-10 max-w-lg mx-auto">
                  2 minute. Gratis. Analiza ajunge pe email în maxim 5 minute de la completare.
                </p>
                <Link href="/audit/start" className="btn-primary text-base sm:text-lg group inline-flex">
                  Vreau analiza gratuită
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-foreground-dim">
                  <span>✓ Fără înregistrare</span>
                  <span>✓ Fără card</span>
                  <span>✓ Fără reclame ulterioare</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="w-full" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground-dim">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Clevs AI" width={24} height={24} style={{ objectFit: "contain", mixBlendMode: "lighten" }} />
              <span>© {new Date().getFullYear()} Clevs AI Agency</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <a href="mailto:clevs.ai.agency@gmail.com" className="hover:text-foreground transition">clevs.ai.agency@gmail.com</a>
              <a href="tel:0722774524" className="hover:text-foreground transition">0722 774 524</a>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
