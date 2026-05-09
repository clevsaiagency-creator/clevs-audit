# Make Scenario — Audit AI Gratuit

Acest fișier descrie **scenariul Make** care preia submit-ul din Vercel, generează auditul cu Claude, salvează în Supabase și trimite emailul. Setup pas cu pas pentru când construiești scenariul în Make UI.

---

## Payload primit de webhook

Make primește din Vercel (`/api/submit/route.ts`) un POST cu acest JSON:

```json
{
  "lead_id": "uuid-string",
  "prenume": "Andrei",
  "nume_business": "Clinica Smile",
  "email": "andrei@clinica.ro",
  "tip_afacere": "Clinică dentară",
  "categorie": "medical",
  "categorie_label": "Medical",
  "volum": "50-100",
  "angajati": "3-5 angajați",
  "canal_contact": "Telefon",
  "pain_points": [
    "Pierd apeluri când sunt cu pacientul",
    "Pacienți care nu se prezintă la programare (no-show)"
  ],
  "audit_url": "https://audit.clevs-ai.com/audit/uuid-string"
}
```

---

## Module Make (în ordine)

### 1. **Webhooks → Custom webhook**
- Generează URL → pune-l în `.env.local` ca `MAKE_WEBHOOK_URL`
- Set "Get request schema" și trimite un test din formular ca să Make învețe structura

### 2. **Anthropic → Create a message** (sau HTTP module dacă nu există conector)
- **Model:** `claude-sonnet-4-6`
- **Max tokens:** `2000`
- **System message:** conținutul din `prompts/system.md` + conținutul fișierului categorie (ales pe baza `{{categorie}}`)
  - Folosește un router Make (Switch) pe `{{categorie}}` cu 8 ramuri (medical/horeca/beauty/comert/servicii/auto/educatie/altele)
  - SAU concatenează în Make folosind funcția `switch()`
- **User message:**
  ```
  Date lead:
  - Prenume: {{prenume}}
  - Nume business: {{nume_business}}
  - Tip afacere: {{tip_afacere}}
  - Categorie: {{categorie_label}}
  - Volum interacțiuni: {{volum}}
  - Angajați: {{angajati}}
  - Canal contact principal: {{canal_contact}}
  - Situații cunoscute (pain points selectate):
  {{pain_points}}

  Generează auditul personalizat ca JSON, urmând system prompt-ul. Returnează DOAR JSON-ul, fără text suplimentar.
  ```

### 3. **JSON → Parse JSON**
- Input: răspunsul Claude (`{{2.content[].text}}`)
- Schema: vezi mai jos

### 4. **Supabase → Update row**
- **Tabel:** `audit_leads`
- **Filtru:** `id = {{1.lead_id}}`
- **Câmpuri:**
  - `audit_content` = JSON parse-uit (întreg obiectul)
  - `status` = `generated`

### 5. **Gmail → Send email**
- **From:** `clevs.ai.agency@gmail.com`
- **To:** `{{1.email}}`
- **Subject:** `{{1.prenume}}, am pregătit auditul pentru {{1.nume_business}}`
- **Body (HTML):** vezi `email_template.html` (Pas 10)
- **Variabile inserate în template:**
  - `{{prenume}}`
  - `{{nume_business}}`
  - `{{audit_url}}`

### 6. **Supabase → Update row** (final)
- **Filtru:** `id = {{1.lead_id}}`
- **Câmpuri:**
  - `status` = `sent`

### Error handler (atașat la fiecare module)
- **Supabase → Update row**
  - `status` = `failed`
  - `error_message` = `{{error.message}}`

---

## Schema JSON pentru parse (Module 3)

```json
{
  "type": "object",
  "properties": {
    "problema": { "type": "string" },
    "estimari": {
      "type": "object",
      "properties": {
        "timp": { "type": "string" },
        "bani": { "type": "string" }
      },
      "required": ["timp", "bani"]
    },
    "solutii": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "titlu": { "type": "string" },
          "descriere": { "type": "string" }
        },
        "required": ["titlu", "descriere"]
      }
    },
    "story": { "type": "string" },
    "cta_text": { "type": "string" },
    "multumire": { "type": "string" }
  },
  "required": ["problema", "estimari", "solutii", "story", "cta_text", "multumire"]
}
```

---

## Variabile de configurat în Make

În `Connections` setezi:
- **Anthropic API key** — din console.anthropic.com
- **Supabase connection** — URL + Service Role Key (din Supabase Dashboard → Settings → API)
- **Gmail OAuth** — autorizezi `clevs.ai.agency@gmail.com`

---

## Test scenario

1. Deschide formularul `/audit/start` local sau pe Vercel
2. Completează 6 pași cu date de test
3. Verifică în Supabase că row-ul există cu status `pending`
4. Make ar trebui să se declanșeze automat → execution log în Make
5. Verifică Gmail că emailul ajunge
6. Click pe link → vezi pagina audit cu conținutul generat
7. Verifică Supabase: `status = opened`, `opened_at` populat

---

## Backup scenariu

După ce funcționează, **export blueprint din Make UI** (Scenarios → ⋯ → Export blueprint) și salvează ca `make_scenario_blueprint.json` în acest folder pentru recovery.
