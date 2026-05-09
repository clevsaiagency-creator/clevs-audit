import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_URL");
}

/**
 * Server-side client cu service role — folosit doar în API routes.
 * Are full access, NU expune cheia în client.
 */
export function getServiceClient() {
  if (!supabaseServiceKey) {
    throw new Error("Missing env: SUPABASE_SERVICE_KEY");
  }
  return createClient(supabaseUrl!, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Client-side cu anon key — folosit în componente client (limitat de RLS).
 */
export function getPublicClient() {
  if (!supabaseAnonKey) {
    throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return createClient(supabaseUrl!, supabaseAnonKey);
}

export type AuditStatus = "pending" | "generated" | "sent" | "opened" | "failed";

export interface AuditLead {
  id: string;
  created_at: string;
  opened_at: string | null;
  prenume: string;
  nume_business: string;
  email: string;
  tip_afacere: string;
  categorie: string;
  volum: string;
  angajati: string;
  canal_contact: string;
  pain_points: string[];
  audit_content: AuditContent | null;
  status: AuditStatus;
}

export interface AuditContent {
  problema: string;
  estimari: {
    timp: string;
    bani: string;
  };
  solutii: Array<{
    titlu: string;
    descriere: string;
  }>;
  story: string;
  cta_text: string;
  multumire: string;
}
