"use client";

import OptionGroup from "./OptionGroup";
import { EMPLOYEE_OPTIONS } from "@/lib/categories";
import type { FormState, FormAction } from "@/lib/formState";

export default function Step3({
  state,
  dispatch,
}: {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}) {
  return (
    <div className="w-full">
      <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
        Câți angajați gestionează clienții?
      </h2>
      <p className="text-foreground-muted mb-8">
        Inclusiv tu, dacă răspunzi la mesaje sau apeluri.
      </p>
      <OptionGroup
        options={EMPLOYEE_OPTIONS}
        value={state.angajati}
        onChange={(v) => dispatch({ type: "set", field: "angajati", value: v })}
      />
    </div>
  );
}
