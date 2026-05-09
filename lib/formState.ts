import type { CategoryId } from "./categories";

export interface FormState {
  step: number; // 1..6
  // Pas 1
  tipAfacere: string;
  categorie: CategoryId | null;
  // Pas 2 (per categorie)
  volum: string;
  // Pas 3 (universal)
  angajati: string;
  // Pas 4 (per categorie)
  canalContact: string;
  // Pas 5 (per categorie)
  painPoints: string[];
  // Pas 6 (universal)
  prenume: string;
  numeBusiness: string;
  email: string;
}

export const INITIAL_STATE: FormState = {
  step: 1,
  tipAfacere: "",
  categorie: null,
  volum: "",
  angajati: "",
  canalContact: "",
  painPoints: [],
  prenume: "",
  numeBusiness: "",
  email: "",
};

export type FormAction =
  | { type: "set"; field: keyof FormState; value: any }
  | { type: "togglePainPoint"; value: string }
  | { type: "next" }
  | { type: "prev" }
  | { type: "goto"; step: number };

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "set":
      return { ...state, [action.field]: action.value };
    case "togglePainPoint": {
      const exists = state.painPoints.includes(action.value);
      return {
        ...state,
        painPoints: exists
          ? state.painPoints.filter((p) => p !== action.value)
          : [...state.painPoints, action.value],
      };
    }
    case "next":
      return { ...state, step: Math.min(6, state.step + 1) };
    case "prev":
      return { ...state, step: Math.max(1, state.step - 1) };
    case "goto":
      return { ...state, step: Math.max(1, Math.min(6, action.step)) };
    default:
      return state;
  }
}

export function isStepValid(state: FormState, step: number): boolean {
  switch (step) {
    case 1:
      return state.tipAfacere.trim().length > 1 && state.categorie !== null;
    case 2:
      return state.volum.length > 0;
    case 3:
      return state.angajati.length > 0;
    case 4:
      return state.canalContact.length > 0;
    case 5:
      return state.painPoints.length > 0;
    case 6:
      return (
        state.prenume.trim().length > 1 &&
        state.numeBusiness.trim().length > 1 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())
      );
    default:
      return false;
  }
}
