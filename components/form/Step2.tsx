"use client";

import OptionGroup from "./OptionGroup";
import { CATEGORIES } from "@/lib/categories";
import type { FormState, FormAction } from "@/lib/formState";

export default function Step2({
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
        {cat.step2.question}
      </h2>
      <p className="text-foreground-muted mb-8">
        Estimativ. Nu trebuie să fie exact.
      </p>
      <OptionGroup
        options={cat.step2.options}
        value={state.volum}
        onChange={(v) => dispatch({ type: "set", field: "volum", value: v })}
      />
    </div>
  );
}
