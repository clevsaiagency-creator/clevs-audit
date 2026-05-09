"use client";

import OptionGroup from "./OptionGroup";
import { CATEGORIES } from "@/lib/categories";
import type { FormState, FormAction } from "@/lib/formState";

export default function Step5({
  state,
  dispatch,
}: {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}) {
  const cat = state.categorie ? CATEGORIES[state.categorie] : CATEGORIES.altele;

  return (
    <div className="w-full">
      <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
        {cat.step5.question}
      </h2>
      <p className="text-foreground-muted mb-8">
        Bifează tot ce ți se aplică. Cel puțin una.
      </p>
      <OptionGroup
        options={cat.step5.options}
        value={state.painPoints}
        onChange={(v) => dispatch({ type: "togglePainPoint", value: v })}
        multiSelect
      />
    </div>
  );
}
