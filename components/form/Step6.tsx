"use client";

import { motion } from "framer-motion";
import type { FormState, FormAction } from "@/lib/formState";

export default function Step6({
  state,
  dispatch,
}: {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}) {
  return (
    <div className="w-full">
      <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
        Aproape gata. Unde îți trimitem analiza?
      </h2>
      <p className="text-foreground-muted mb-8">
        În maxim 5 minute primești pe email rezultatul. Nu spam, promitem.
      </p>

      <div className="grid gap-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-sm text-foreground-muted mb-2">Prenumele tău</label>
          <input
            type="text"
            value={state.prenume}
            onChange={(e) => dispatch({ type: "set", field: "prenume", value: e.target.value })}
            placeholder="ex: Andrei"
            className="input-base"
            autoComplete="given-name"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <label className="block text-sm text-foreground-muted mb-2">Numele afacerii</label>
          <input
            type="text"
            value={state.numeBusiness}
            onChange={(e) =>
              dispatch({ type: "set", field: "numeBusiness", value: e.target.value })
            }
            placeholder="ex: Clinica Smile"
            className="input-base"
            autoComplete="organization"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <label className="block text-sm text-foreground-muted mb-2">Email</label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => dispatch({ type: "set", field: "email", value: e.target.value })}
            placeholder="andrei@clinica.ro"
            className="input-base"
            autoComplete="email"
            inputMode="email"
          />
        </motion.div>

        <p className="text-xs text-foreground-dim mt-2">
          Datele tale rămân la noi. Le folosim doar să-ți trimitem analiza și, eventual, să te
          contactăm dacă ai întrebări.
        </p>
      </div>
    </div>
  );
}
