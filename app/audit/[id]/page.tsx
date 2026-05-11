import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getServiceClient, type AuditContent } from "@/lib/supabase";
import { CATEGORIES, type CategoryId } from "@/lib/categories";
import GalaxyBackground from "@/components/GalaxyBackground";
import AuditTracker from "@/components/AuditTracker";

export const dynamic = "force-dynamic";

interface AuditRow {
  id: string;
  prenume: string;
  nume_business: string;
  email: string;
  tip_afacere: string;
  categorie: CategoryId;
  pain_points: string[];
  audit_content: AuditContent | null;
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

  // Status: dacă auditul nu e încă generat, arătăm un loading state
  const isPending = !audit.audit_content;

  return (
    <>
      <GalaxyBackground density={0.6} showShootingStars />
      <AuditTracker id={audit.id} />

      <main className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Clevs AI" width={110} height={36} style={{ objectFit: "contain" }} />
          </Link>
          <div className="text-xs sm:text-sm text-foreground-dim">
            Audit personalizat • {categoryConfig.label}
          </div>
        </header>

        {/* Hero personalizat */}
        <section className="w-full max-w-4xl mx-auto px-6 pt-12 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-strong bg-surface text-xs text-foreground-muted mb-6">
            {categoryConfig.emoji} Pregătit pentru {audit.nume_business}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4">
            Salut, {audit.prenume}.
            <br />
            <span className="bg-gradient-to-r from-accent via-blue-300 to-purple-400 bg-clip-text text-transparent">
              Iată ce am găsit pentru {audit.nume_business}.
            </span>
          </h1>

          <p className="text-lg text-foreground-muted">
            Analiză personalizată pentru {audit.tip_afacere.toLowerCase()}, generată din
            răspunsurile tale.
          </p>
        </section>

        {/* Content */}
        {isPending ? (
          <PendingState prenume={audit.prenume} />
        ) : (
          <AuditContentView
            content={audit.audit_content!}
            numeBusiness={audit.nume_business}
            calendlyUrl={calendlyUrl}
          />
        )}

        {/* Footer */}
        <footer className="w-full border-t border-border mt-20">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground-dim">
            <div>© {new Date().getFullYear()} Clevs AI Agency</div>
            <div className="flex items-center gap-6">
              <a
                href="mailto:clevs.ai.agency@gmail.com"
                className="hover:text-foreground transition"
              >
                clevs.ai.agency@gmail.com
              </a>
              <a href="tel:0722774524" className="hover:text-foreground transition">
                0722 774 524
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

function AuditContentView({
  content,
  numeBusiness,
  calendlyUrl,
}: {
  content: AuditContent;
  numeBusiness: string;
  calendlyUrl: string;
}) {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-8 space-y-12">
      {/* 1. Problema ta */}
      <Section
        num="01"
        title="Problema ta"
        body={content.problema}
      />

      {/* 2. Estimările tale */}
      <section className="card">
        <div className="text-accent font-mono text-xs mb-3">02 / ESTIMĂRILE TALE</div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Cât te costă, aproximativ</h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-border bg-background-elevated p-5">
            <div className="text-xs text-foreground-dim mb-2">⏰ Timp pierdut</div>
            <div className="text-foreground text-lg leading-snug">{content.estimari.timp}</div>
          </div>
          <div className="rounded-xl border border-border bg-background-elevated p-5">
            <div className="text-xs text-foreground-dim mb-2">💸 Bani pierduți</div>
            <div className="text-foreground text-lg leading-snug">{content.estimari.bani}</div>
          </div>
        </div>

        <p className="text-sm text-foreground-dim border-t border-border pt-4">
          <strong className="text-foreground-muted">Disclaimer:</strong> Aceste estimări sunt
          orientative, calculate pe baza răspunsurilor tale și a mediilor din industrie. Cifrele
          exacte pentru {numeBusiness} le calculăm împreună într-un call de 15 minute.
        </p>
      </section>

      {/* 3. Soluțiile potrivite + link mascat #1 */}
      <section>
        <div className="text-accent font-mono text-xs mb-3">03 / SOLUȚII PENTRU TINE</div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ce poți face concret</h2>
        <div className="grid gap-4">
          {content.solutii.map((s, i) => (
            <div key={i} className="card hover:border-border-strong transition">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center font-mono text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{s.titlu}</h3>
                  <p className="text-foreground-muted leading-relaxed">{s.descriere}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition text-sm inline-flex items-center gap-1"
          >
            Vezi cum implementăm pas cu pas →
          </a>
        </div>
      </section>

      {/* 4. Mini case study + link mascat #2 */}
      <section className="card border-accent/30 bg-accent/5">
        <div className="text-accent font-mono text-xs mb-3">04 / O POVESTE SCURTĂ</div>
        <p className="text-foreground text-lg leading-relaxed italic mb-4">
          {content.story}
        </p>
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover transition text-sm inline-flex items-center gap-1"
        >
          Vrei să vezi cum am rezolvat? →
        </a>
      </section>

      {/* 5. CTA + link mascat #3 */}
      <section className="text-center py-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
          {content.cta_text}
        </h2>
        <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
          15 minute, fără angajament. Îți arătăm un demo real și plecăm cu un plan concret —
          chiar dacă nu lucrăm împreună.
        </p>
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-lg group inline-flex"
        >
          Programează discovery call
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </section>

      {/* 6. Mulțumire + link mascat #4 */}
      <section className="card text-center">
        <div className="text-accent font-mono text-xs mb-3">06 / MULȚUMESC</div>
        <p className="text-foreground-muted leading-relaxed mb-4">{content.multumire}</p>
        <div className="text-sm">
          <span className="text-foreground-dim">— Alex Nemeș, Clevs AI Agency</span>
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-center gap-6 text-sm">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition"
          >
            Programează call
          </a>
          <a
            href="mailto:clevs.ai.agency@gmail.com"
            className="text-foreground-muted hover:text-foreground transition"
          >
            Scrie-mi direct
          </a>
        </div>
      </section>
    </div>
  );
}

function Section({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <section className="card">
      <div className="text-accent font-mono text-xs mb-3">{num} / {title.toUpperCase()}</div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>
      <p className="text-foreground-muted text-lg leading-relaxed whitespace-pre-line">{body}</p>
    </section>
  );
}
