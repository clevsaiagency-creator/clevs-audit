import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getServiceClient, type AuditContent as AuditContentType } from "@/lib/supabase";
import { CATEGORIES, type CategoryId } from "@/lib/categories";
import GalaxyBackground from "@/components/GalaxyBackground";
import AuditTracker from "@/components/AuditTracker";
import AuditContent from "@/components/AuditContent";

export const dynamic = "force-dynamic";

interface AuditRow {
  id: string;
  prenume: string;
  nume_business: string;
  email: string;
  tip_afacere: string;
  categorie: CategoryId;
  pain_points: string[];
  audit_content: AuditContentType | null;
  status: string;
}

async function loadAudit(id: string): Promise<AuditRow | null> {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("audit_leads")
      .select(
        "id, prenume, nume_business, email, tip_afacere, categorie, pain_points, audit_content, status"
      )
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return data as AuditRow;
  } catch (e) {
    console.error("loadAudit error:", e);
    return null;
  }
}

export default async function AuditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const audit = await loadAudit(id);

  if (!audit) notFound();

  const categoryConfig = CATEGORIES[audit.categorie];
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://cal.com/clevsai.agency/30min";

  const isPending = !audit.audit_content;

  return (
    <>
      <GalaxyBackground density={0.6} showShootingStars />
      <AuditTracker id={audit.id} />

      <main className="relative z-10 min-h-screen flex flex-col">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Clevs AI"
              width={130}
              height={37}
              style={{ objectFit: "contain", mixBlendMode: "lighten" }}
            />
          </Link>
          <a
            href="https://clevs-ai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-accent hover:text-accent-hover transition flex items-center gap-1"
          >
            clevs-ai.com
            <span className="text-xs opacity-70">↗</span>
          </a>
        </header>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-strong bg-surface text-xs text-foreground-muted mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {categoryConfig.emoji} Audit generat pentru {audit.nume_business}
          </div>

          {/* Titlu */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-4">
            Salut, {audit.prenume}.
            <br />
            <span className="bg-gradient-to-r from-accent via-blue-300 to-purple-400 bg-clip-text text-transparent">
              Iată ce am găsit.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-foreground-muted mb-8">
            Analiză personalizată pentru{" "}
            <span className="text-foreground font-medium">{audit.tip_afacere.toLowerCase()}</span>,
            generată din răspunsurile tale.
          </p>

        </section>

        {/* ── Content ─────────────────────────────────────────────────── */}
        {isPending ? (
          <PendingState prenume={audit.prenume} />
        ) : (
          <AuditContent
            content={audit.audit_content!}
            numeBusiness={audit.nume_business}
            prenume={audit.prenume}
            calendlyUrl={calendlyUrl}
          />
        )}

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <footer className="w-full border-t border-border mt-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground-dim">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Clevs AI"
                width={90}
                height={26}
                style={{ objectFit: "contain", mixBlendMode: "lighten" }}
              />
              <span>© {new Date().getFullYear()}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <a href="https://clevs-ai.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">
                clevs-ai.com
              </a>
              <a href="mailto:clevs.contact@gmail.com" className="hover:text-foreground transition">
                clevs.contact@gmail.com
              </a>
              <a href="tel:0724863448" className="hover:text-foreground transition">
                0724 863 448
              </a>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}

function PendingState({ prenume }: { prenume: string }) {
  return (
    <section className="w-full max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="card">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-accent border-t-transparent animate-spin" />
        <h2 className="text-2xl font-semibold mb-3">{prenume}, analiza ta e pe drum!</h2>
        <p className="text-foreground-muted mb-2">
          Pregătim raportul personalizat. Durează cel mult câteva minute.
        </p>
        <p className="text-sm text-foreground-dim">
          Reîmprospătează pagina în 2-3 minute sau întoarce-te după ce primești emailul.
        </p>
      </div>
    </section>
  );
}
