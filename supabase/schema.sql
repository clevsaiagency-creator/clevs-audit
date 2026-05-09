-- Audit AI Gratuit — Schema Supabase
-- Run în Supabase SQL Editor

-- Enum pentru categorii
do $$ begin
  create type audit_category as enum (
    'medical',
    'horeca',
    'beauty',
    'comert',
    'servicii',
    'auto',
    'educatie',
    'altele'
  );
exception
  when duplicate_object then null;
end $$;

-- Enum pentru status
do $$ begin
  create type audit_status as enum (
    'pending',
    'generated',
    'sent',
    'opened',
    'failed'
  );
exception
  when duplicate_object then null;
end $$;

-- Tabel principal
create table if not exists public.audit_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  opened_at timestamptz,

  -- Date contact
  prenume text not null,
  nume_business text not null,
  email text not null,

  -- Răspunsuri formular
  tip_afacere text not null,
  categorie audit_category not null,
  volum text not null,
  angajati text not null,
  canal_contact text not null,
  pain_points text[] not null default '{}',

  -- Generat de Make/Claude
  audit_content jsonb,

  status audit_status not null default 'pending',

  -- Erori (pentru debugging Make)
  error_message text
);

-- Index pe email pentru căutări
create index if not exists audit_leads_email_idx on public.audit_leads (email);
create index if not exists audit_leads_status_idx on public.audit_leads (status);
create index if not exists audit_leads_created_at_idx on public.audit_leads (created_at desc);

-- RLS — strict, nimeni nu citește public
alter table public.audit_leads enable row level security;

-- Doar service role scrie/citește (folosit din API routes Next.js)
-- Anon key NU are acces — pagina /audit/[id] folosește service client server-side
drop policy if exists "service_role_all" on public.audit_leads;
create policy "service_role_all" on public.audit_leads
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Comments pentru documentație
comment on table public.audit_leads is 'Lead-uri din formularul de audit AI gratuit';
comment on column public.audit_leads.audit_content is 'JSON cu textul personalizat generat de Claude API: { problema, estimari: { timp, bani }, solutii: [{titlu, descriere}], story, cta_text, multumire }';
comment on column public.audit_leads.status is 'pending → generated → sent → opened. failed = eroare în Make/Claude';
