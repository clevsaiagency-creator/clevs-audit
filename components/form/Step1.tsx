"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  searchBusinessTypes,
  findCategoryForText,
  CATEGORIES,
  type BusinessType,
} from "@/lib/categories";
import type { FormState, FormAction } from "@/lib/formState";

export default function Step1({
  state,
  dispatch,
}: {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}) {
  const [suggestions, setSuggestions] = useState<BusinessType[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (value: string) => {
    dispatch({ type: "set", field: "tipAfacere", value });
    const cat = findCategoryForText(value);
    dispatch({ type: "set", field: "categorie", value: cat });

    const results = searchBusinessTypes(value, 8);
    setSuggestions(results);
    setShowSuggestions(results.length > 0);
    setHighlighted(0);
  };

  const selectSuggestion = (bt: BusinessType) => {
    dispatch({ type: "set", field: "tipAfacere", value: bt.label });
    dispatch({ type: "set", field: "categorie", value: bt.category });
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(suggestions.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(0, h - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectSuggestion(suggestions[highlighted]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const detectedCategory = state.categorie ? CATEGORIES[state.categorie] : null;

  return (
    <div className="w-full">
      <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
        Ce fel de afacere ai?
      </h2>
      <p className="text-foreground-muted mb-8">
        Scrie tipul tău de afacere. O să adaptăm întrebările pe specificul tău.
      </p>

      <div ref={containerRef} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={state.tipAfacere}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => state.tipAfacere && setShowSuggestions(suggestions.length > 0)}
          onKeyDown={handleKeyDown}
          placeholder="ex: clinică dentară, restaurant, salon..."
          className="input-base text-lg"
          autoComplete="off"
          spellCheck={false}
        />

        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-full mt-2 z-20 bg-background-elevated border border-border-strong rounded-xl overflow-hidden shadow-2xl"
            >
              {suggestions.map((bt, i) => (
                <button
                  key={bt.label}
                  type="button"
                  onMouseEnter={() => setHighlighted(i)}
                  onClick={() => selectSuggestion(bt)}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                    i === highlighted ? "bg-surface-hover" : "hover:bg-surface"
                  }`}
                >
                  <span className="text-foreground">{bt.label}</span>
                  <span className="text-xs text-foreground-dim flex items-center gap-1">
                    {CATEGORIES[bt.category].emoji} {CATEGORIES[bt.category].label}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {detectedCategory && state.tipAfacere.length > 1 && !showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border text-sm text-foreground-muted"
          >
            <span>{detectedCategory.emoji}</span>
            <span>
              Categoria: <span className="text-foreground font-medium">{detectedCategory.label}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
