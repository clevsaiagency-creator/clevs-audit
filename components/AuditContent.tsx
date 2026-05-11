"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import type { AuditContent } from "@/lib/supabase";

const PHONE_WA = "40724863448";
const PHONE_DISPLAY = "0724 863 448";
const EMAIL = "clevs.contact@gmail.com";

// ── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return value;
}

// ── Animated Section Wrapper ──────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Section Label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="text-accent font-mono text-xs tracking-widest mb-3 flex items-center gap-2">
      <span className="w-1 h-4 rounded-full bg-accent inline-block" />
      {children}
    </div>
  );
}

// ── Metric Card cu count-up ───────────────────────────────────────────────────

function MetricCard({
  emoji,
  label,
  value,
  color = "text-foreground",
  delay = 0,
}: {
  emoji: string;
  label: string;
  value: string;
  color?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const numericMatch = value.match(/\d[\d.,]*/);
  const numericPart = numericMatch ? parseFloat(numericMatch[0].replace(",", ".")) : 0;
  const prefix = numericMatch ? value.slice(0, numericMatch.index) : "";
  const suffix = numericMatch
    ? value.slice((numericMatch.index ?? 0) + numericMatch[0].length)
    : value;

  const isLargeNum = numericPart > 100;
  const countedValue = useCountUp(numericPart, isLargeNum ? 1600 : 1200, inView);

  const displayValue = numericPart > 0
    ? `${prefix}${isLargeNum ? countedValue.toLocaleString("ro-RO") : countedValue}${suffix}`
    : value;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl p-6 overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at top left, rgba(79,142,255,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div className="text-2xl mb-3">{emoji}</div>
      <div className="text-xs text-foreground-dim mb-2 font-mono tracking-wide">{label}</div>
      <div className={`text-3xl sm:text-4xl font-bold leading-tight ${color}`}>{displayValue}</div>
    </motion.div>
  );
}

// ── Pulsing Step Number ───────────────────────────────────────────────────────

function StepBadge({ num }: { num: string }) {
  return (
    <motion.div
      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm"
      animate={{
        boxShadow: [
          "0 0 0px rgba(79,142,255,0)",
          "0 0 14px rgba(79,142,255,0.7), 0 0 28px rgba(79,142,255,0.25)",
          "0 0 0px rgba(79,142,255,0)",
        ],
        borderColor: ["rgba(79,142,255,0.25)", "rgba(79,142,255,0.9)", "rgba(79,142,255,0.25)"],
      }}
      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
      style={{
        background: "#0a0f2a",
        border: "1px solid rgba(79,142,255,0.3)",
        color: "#4f8eff",
      }}
    >
      {num}
    </motion.div>
  );
}

// ── Sticky Mobile CTA ─────────────────────────────────────────────────────────

function StickyCTA({ calendlyUrl }: { calendlyUrl: string }) {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setHidden(!entry.isIntersecting),
      { threshold: 0.3 }
    );
    const ctaEl = document.getElementById("cta-principal");
    if (ctaEl) obs.observe(ctaEl);
    return () => obs.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-4"
      style={{ background: "linear-gradient(to top, #050818 60%, transparent 100%)" }}
    >
      <a
        href={calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full justify-center text-sm"
      >
        Programează 15 min gratuit →
      </a>
    </motion.div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export default function AuditContent({
  content,
  numeBusiness,
  prenume,
  calendlyUrl,
}: {
  content: AuditContent;
  numeBusiness: string;
  prenume: string;
  calendlyUrl: string;
}) {
  return (
    <>
      <StickyCTA calendlyUrl={calendlyUrl} />

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pb-32 sm:pb-16 space-y-10">

        {/* ── 01 / Problema ta ─────────────────────────────────────────── */}
        <FadeIn>
          <div
            className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderLeft: "3px solid #4f8eff",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 200,
                height: 200,
                background: "radial-gradient(circle, rgba(79,142,255,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <SectionLabel>01 / PROBLEMA TA</SectionLabel>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Ce am înțeles din situația ta</h2>
            <p className="text-foreground-muted text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {content.problema}
            </p>
          </div>
        </FadeIn>

        {/* ── 02 / Estimările ──────────────────────────────────────────── */}
        <FadeIn delay={0.05}>
          <div>
            <SectionLabel>02 / ESTIMĂRILE TALE</SectionLabel>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Cât costă, în cifre</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <MetricCard
                emoji="⏰"
                label="TIMP PIERDUT"
                value={content.estimari.timp}
                delay={0}
              />
              <MetricCard
                emoji="💸"
                label="BANI PIERDUȚI LUNAR"
                value={content.estimari.bani}
                color="text-accent"
                delay={0.1}
              />
            </div>
            <div
              className="rounded-xl px-5 py-4 text-sm text-foreground-dim"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <strong className="text-foreground-muted">Disclaimer:</strong> Estimările sunt orientative,
              calculate pe baza răspunsurilor tale și a mediilor din industrie. Cifrele exacte pentru{" "}
              {numeBusiness} le calculăm împreună într-un call de 15 minute.
            </div>
          </div>
        </FadeIn>

        {/* ── 03 / Soluții ─────────────────────────────────────────────── */}
        <FadeIn delay={0.05}>
          <div>
            <SectionLabel>03 / SOLUȚII PENTRU TINE</SectionLabel>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Ce poți face concret</h2>
            <div className="space-y-4">
              {content.solutii.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl p-5 sm:p-6 flex items-start gap-4 group hover:border-border-strong transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <StepBadge num={`0${i + 1}`} />
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-2 text-foreground">{s.titlu}</h3>
                    <p className="text-foreground-muted text-sm sm:text-base leading-relaxed">{s.descriere}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent hover:text-accent-hover transition text-sm font-medium"
              >
                Hai să implementăm asta împreună
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </FadeIn>

        {/* ── 04 / Poveste ─────────────────────────────────────────────── */}
        <FadeIn delay={0.05}>
          <div
            className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
            style={{
              background: "rgba(79,142,255,0.04)",
              border: "1px solid rgba(79,142,255,0.15)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -20,
                left: 24,
                fontSize: 120,
                lineHeight: 1,
                color: "rgba(79,142,255,0.08)",
                fontFamily: "Georgia, serif",
                fontWeight: 700,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              "
            </div>
            <div style={{ position: "relative" }}>
              <SectionLabel>04 / O POVESTE SCURTĂ</SectionLabel>
              <p className="text-foreground text-base sm:text-lg leading-relaxed italic mb-5">
                {content.story}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "rgba(79,142,255,0.15)", color: "#4f8eff" }}
                >
                  A
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Alex Nemeș</div>
                  <div className="text-xs text-foreground-dim">Clevs AI Agency</div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── 05 / CTA Principal ───────────────────────────────────────── */}
        <FadeIn delay={0.05}>
          <div
            id="cta-principal"
            className="rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(79,142,255,0.08) 0%, rgba(140,80,255,0.06) 100%)",
              border: "1px solid rgba(79,142,255,0.2)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at center top, rgba(79,142,255,0.12) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative" }}>
              <SectionLabel>05 / PASUL URMĂTOR</SectionLabel>
              <h2 className="text-2xl sm:text-4xl font-bold mb-3 leading-tight">
                {content.cta_text
                  .replace(/\d+\s*de\s*minute/gi, "15 minute")
                  .replace(/\d+\s*minute/gi, "15 minute")}
              </h2>
              <p className="text-foreground-muted text-base sm:text-lg mb-8 max-w-md mx-auto">
                15 minute, fără angajament. Îți arătăm un demo real și plecăm cu un plan
                concret — chiar dacă nu lucrăm împreună.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base group inline-flex"
                >
                  Programează 15 min gratuit
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href={`https://wa.me/${PHONE_WA}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 hover:bg-green-500/10"
                  style={{ border: "1px solid rgba(37,211,102,0.35)", color: "#25d366" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp direct
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-foreground-dim">
                <span>✓ Fără contract</span>
                <span>✓ Fără presiune</span>
                <span>✓ Demo real</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── 06 / Mulțumire ───────────────────────────────────────────── */}
        <FadeIn delay={0.05}>
          <div
            className="rounded-2xl p-6 sm:p-8 text-center"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <SectionLabel>06 / MULȚUMESC</SectionLabel>
            <p className="text-foreground-muted leading-relaxed mb-6 text-base max-w-lg mx-auto">
              {content.multumire}
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ background: "rgba(79,142,255,0.15)", color: "#4f8eff" }}
              >
                A
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground text-sm">Alex Nemeș</div>
                <div className="text-xs text-foreground-dim">Clevs AI Agency</div>
              </div>
            </div>
            {/* Website buton */}
            <a
              href="https://clevs-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/5 mb-1"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#b4bce0" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
              </svg>
              clevs-ai.com
              <span className="text-foreground-dim text-xs">↗</span>
            </a>

            <div
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover transition font-medium"
              >
                Programează call
              </a>
              <a
                href={`https://wa.me/${PHONE_WA}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-muted hover:text-foreground transition"
              >
                WhatsApp — {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="text-foreground-muted hover:text-foreground transition"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </FadeIn>

      </div>
    </>
  );
}
