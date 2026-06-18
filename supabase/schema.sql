-- DeltaQuest — schema de sincronização (Supabase)
-- Rode este SQL no SQL Editor do seu projeto Supabase.
--
-- Depois, em Authentication > URL Configuration, garanta que "Site URL" e as
-- "Redirect URLs" incluem a origem do app (ex.: http://localhost:5173 em dev
-- e a URL de produção na Vercel) — necessário para o magic link redirecionar de volta.

create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

-- Cada usuário só enxerga/edita a própria linha.
drop policy if exists "progress_select_own" on public.progress;
create policy "progress_select_own" on public.progress
  for select using (auth.uid() = user_id);

drop policy if exists "progress_insert_own" on public.progress;
create policy "progress_insert_own" on public.progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.progress;
create policy "progress_update_own" on public.progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- (Opcional) Sincronização ao vivo entre dispositivos via Realtime.
-- Habilite em Database > Replication, ou rode:
-- alter publication supabase_realtime add table public.progress;
