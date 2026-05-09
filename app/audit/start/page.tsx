"use client";

import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import GalaxyBackground from "@/components/GalaxyBackground";
import ProgressBar from "@/components/form/ProgressBar";
import Step1 from "@/components/form/Step1";
import Step2 from "@/components/form/Step2";
import Step3 from "@/components/form/Step3";
import Step4 from "@/components/form/Step4";
import Step5 from "@/components/form/Step5";
import Step6 from "@/components/form/Step6";
import { formReducer, INITIAL_STATE, isStepValid } from "@/lib/formState";

export default function AuditStartPage() {
  const router = useRouter();
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = isStepValid(state, state.step);
  const isLastStep = state.step === 6;

  const handleNext = async () => {
    if (!valid) return;
    if (!isLastStep) {
      dispatch({ type: "next" });
      return;
    }

    // Submit
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipAfacere: state.tipAfacere,
          categorie: state.categorie,
          volum: state.volum,
          angajati: state.angajati,
          canalContact: state.canalContact,
          painPoints: state.painPoints,
          prenume: state.prenume.trim(),
          numeBusiness: state.numeBusiness.trim(),
          email: state.email.trim().toLowerCase(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Eroare ${res.status}`);
      }

      router.push("/audit/multumire");
    } catch (e) {
      setError(e instanceof Error ? e.message : "A apărut o eroare. Încearcă din nou.");
      setSubmitting(false);
    }
  };

  const handlePrev = () => {
    if (state.step > 1) dispatch({ type: "prev" });
  };

  return (
    <>
      <GalaxyBackground density={0.5} showShootingStars={false} />

      <main className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-bold text-background">
              C
            </div>
            <span className="font-semibold text-lg">Clevs AI</span>
          </Link>
          <Link href="/" className="text-sm text-foreground-muted hover:text-foreground transition">
            ← Ieși din audit
          </Link>
        </header>

        {/* Progress */}
        <div className="pt-6 pb-12">
          <ProgressBar step={state.step} />
        </div>

        {/* Form content */}
        <div className="flex-1 flex flex-col items-center px-6 pb-12">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {state.step === 1 && <Step1 state={state} dispatch={dispatch} />}
                {state.step === 2 && <Step2 state={state} dispatch={dispatch} />}
                {state.step === 3 && <Step3 state={state} dispatch={dispatch} />}
                {state.step === 4 && <Step4 state={state} dispatch={dispatch} />}
                {state.step === 5 && <Step5 state={state} dispatch={dispatch} />}
                {state.step === 6 && <Step6 state={state} dispatch={dispatch} />}
              </motion.div>
            </AnimatePresence>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between gap-4">
              {state.step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={submitting}
                  className="btn-secondary"
                >
                  ← Înapoi
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={!valid || submitting}
                className="btn-primary group"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                    Se trimite...
                  </span>
                ) : isLastStep ? (
                  <>
                    Trimite analiza
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </>
                ) : (
                  <>
                    Mai departe
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
