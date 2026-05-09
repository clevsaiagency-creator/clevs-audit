# Clevs Audit AI Gratuit

Landing page + formular 6 pași + audit personalizat per prospect. Frontend pentru CTA-ul principal al Clevs AI Agency.

## Stack

- **Frontend:** Next.js 16 (App Router) + Tailwind 4 + framer-motion + canvas-confetti
- **Backend automatizare:** Make (webhook → Claude API → Supabase → Gmail)
- **Storage:** Supabase
- **Email delivery:** Gmail API (`clevs.ai.agency@gmail.com`)
- **Hosting:** Vercel

## Flow

```
Landing  →  Formular 6 pași  →  POST /api/submit  →  Supabase + Make webhook
                                                            ↓
                                                        Claude API (claude-sonnet-4-6)
                                                            ↓
                                                        Update Supabase (audit_content)
                                                            ↓
                                                        Gmail → email cu link
                                                            ↓
                                                        Pagina /audit/[id]  →  /api/track-open
```

## Setup

### 1. Install
```bash
npm install
```

### 2. Supabase
- Creează proiect nou la [supabase.com](https://supabase.com)
- Rulează `supabase/schema.sql` în SQL Editor
- Copiază `Project URL`, `Anon key`, `Service role key` din Settings → API

### 3. Make
- Citește `MAKE_SETUP.md`
- Construiește scenariul, copiază webhook URL

### 4. Env vars
```bash
cp .env.local.example .env.local
# editează cu valorile tale
```

Variabile necesare:
- `NEXT_PUBLIC_SUPABASE_URL` — URL Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon key (folosit doar pentru fallback client)
- `SUPABASE_SERVICE_KEY` — service role key (folosit în API routes server-side)
- `MAKE_WEBHOOK_URL` — webhook din Make
- `NEXT_PUBLIC_CALENDLY_URL` — link Calendly pentru discovery call
- `NEXT_PUBLIC_APP_URL` — URL public al app-ului (pentru linkuri în email)

### 5. Run
```bash
npm run dev
```

## Structură

```
app/
  page.tsx                    # Landing page
  audit/
    start/page.tsx            # Formular 6 pași
    multumire/page.tsx        # Pagina mulțumire (confetti)
    [id]/page.tsx             # Audit dinamic per prospect
  api/
    submit/route.ts           # Form submit → Supabase + Make
    track-open/route.ts       # Marchează opened_at când se vede auditul

components/
  GalaxyBackground.tsx        # Canvas animat fundal (stele, nebule, shooting stars)
  AuditTracker.tsx            # Client component care apelează /api/track-open
  form/
    ProgressBar.tsx
    OptionGroup.tsx           # Single/multi select reutilizabil
    Step1.tsx ... Step6.tsx

lib/
  categories.ts               # 8 categorii + ~95 tipuri afacere + întrebări per categorie
  formState.ts                # Reducer + validare
  supabase.ts                 # Service + public clients

prompts/
  system.md                   # System prompt master pentru Claude
  medical.md ... altele.md    # Context per categorie

supabase/
  schema.sql                  # Schema tabel audit_leads + RLS

email_template.html           # Template HTML pentru emailul trimis prin Gmail API (Make)
MAKE_SETUP.md                 # Instrucțiuni complete pentru construit scenariul Make
```

## Deploy

### Vercel
```bash
npx vercel
```

Sau via dashboard: import GitHub repo → set env vars → deploy.

### Domeniu
- Subdomeniu recomandat: `audit.clevs-ai.com`
- Setează în Vercel → Settings → Domains
- Update `NEXT_PUBLIC_APP_URL` în env vars

## Testing end-to-end

1. `npm run dev`
2. Click CTA → completează 6 pași → vezi pagina mulțumire
3. Verifică Supabase: row cu status `pending`
4. Make declanșează scenariul → status devine `generated` → apoi `sent`
5. Verifică Gmail că emailul ajunge
6. Click pe link → vezi pagina audit cu conținutul generat
7. Verifică Supabase: `opened_at` populat, status `opened`

Repetă pentru toate 8 categoriile cu date de test.

## Brand & contact

- Email: `clevs.ai.agency@gmail.com`
- Telefon: `0722 774 524`
- Sender name: Alex Nemeș
- Niciodată NU se menționează "AI" în textul de față cu prospect-ul
