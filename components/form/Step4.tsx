"use client";

import OptionGroup from "./OptionGroup";
import { CATEGORIES } from "@/lib/categories";
import type { FormState, FormAction } from "@/lib/formState";

export default function Step4({
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
        {cat.step4.question}
      </h2>
      <p className="text-foreground-muted mb-8">
        Alege canalul principal pe care vine cea mai mare parte a interacțiunilor.
      </p>
      <OptionGroup
        options={cat.step4.options}
        value={state.canalContact}
        onChange={(v) => dispatch({ type: "set", field: "canalContact", value: v })}
      />
    </div>
  );
}
