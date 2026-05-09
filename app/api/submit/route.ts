import { NextResponse, type NextRequest } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { CATEGORIES, type CategoryId } from "@/lib/categories";

const VALID_CATEGORIES: CategoryId[] = [
  "medical",
  "horeca",
  "beauty",
  "comert",
  "servicii",
  "auto",
  "educatie",
  "altele",
];

interface SubmitPayload {
  tipAfacere: string;
  categorie: CategoryId | null;
  volum: string;
  angajati: string;
  canalContact: string;
  painPoints: string[];
  prenume: string;
  numeBusiness: string;
  email: string;
}

function validate(p: Partial<SubmitPayload>): string | null {
  if (!p.tipAfacere || typeof p.tipAfacere !== "string" || p.tipAfacere.trim().length < 2) {
    return "Tip afacere invalid";
  }
  if (!p.categorie || !VALID_CATEGORIES.includes(p.categorie as CategoryId)) {
    return "Categorie invalidă";
  }
  if (!p.volum || typeof p.volum !== "string") return "Volum invalid";
  if (!p.angajati || typeof p.angajati !== "string") return "Angajați invalid";
  if (!p.canalContact || typeof p.canalContact !== "string") return "Canal invalid";
  if (!Array.isArray(p.painPoints) || p.painPoints.length === 0) {
    return "Selectează cel puțin o situație";
  }
  if (!p.prenume || typeof p.prenume !== "string" || p.prenume.trim().length < 2) {
    return "Prenume invalid";
  }
  if (
    !p.numeBusiness ||
    typeof p.numeBusiness !== "string" ||
    p.numeBusiness.trim().length < 2
  ) {
    return "Numele afacerii invalid";
  }
  if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
    return "Email invalid";
  }
  return null;
}

export async function POST(request: NextRequest) {
  let payload: Partial<SubmitPayload>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload invalid" }, { status: 400 });
  }

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const data = payload as SubmitPayload;
  const categorieLabel = CATEGORIES[data.categorie!].label;

  // 1. Insert în Supabase
  let leadId: string;
  try {
    const supabase = getServiceClient();
    const { data: inserted, error } = await supabase
      .from("audit_leads")
      .insert({
        prenume: data.prenume,
        nume_business: data.numeBusiness,
        email: data.email,
        tip_afacere: data.tipAfacere,
        categorie: data.categorie,
        volum: data.volum,
        angajati: data.angajati,
        canal_contact: data.canalContact,
        pain_points: data.painPoints,
        status: "pending",
      })
      .select("id")
      .single();

    if (error || !inserted) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Nu am putut salva. Încearcă din nou." },
        { status: 500 }
      );
    }
    leadId = inserted.id;
  } catch (e) {
    console.error("Supabase client error:", e);
    return NextResponse.json(
      { error: "Eroare server. Încearcă din nou." },
      { status: 500 }
    );
  }

  // 2. POST către Make webhook (fire-and-forget cu best-effort logging)
  const makeUrl = process.env.MAKE_WEBHOOK_URL;
  if (makeUrl) {
    try {
      const webhookRes = await fetch(makeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: leadId,
          prenume: data.prenume,
          nume_business: data.numeBusiness,
          email: data.email,
          tip_afacere: data.tipAfacere,
          categorie: data.categorie,
          categorie_label: categorieLabel,
          volum: data.volum,
          angajati: data.angajati,
          canal_contact: data.canalContact,
          pain_points: data.painPoints,
          audit_url: `${process.env.NEXT_PUBLIC_APP_URL || ""}/audit/${leadId}`,
        }),
      });

      if (!webhookRes.ok) {
        console.error("Make webhook returned non-OK:", webhookRes.status);
      }
    } catch (e) {
      // Nu blocăm response-ul către user dacă webhook-ul a eșuat
      // Make poate fi rerulat manual din Supabase pentru lead-urile pending
      console.error("Make webhook failed:", e);
    }
  } else {
    console.warn("MAKE_WEBHOOK_URL not configured — lead saved but no email will be sent");
  }

  return NextResponse.json({ ok: true, id: leadId });
}
