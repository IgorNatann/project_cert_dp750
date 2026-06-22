-- DeltaQuest — schema de sincronização (Supabase)
-- Rode este SQL no SQL Editor do seu projeto Supabase.
--
-- Autenticação: o app usa login por e-mail e senha (Supabase Auth, signInWithPassword).
-- Em Authentication > Providers, mantenha o provedor "Email" habilitado.
-- A opção "Confirm email" decide se é preciso confirmar o e-mail antes do 1º login:
--   - desativada -> entra direto após criar a conta (mais simples para uso pessoal);
--   - ativada    -> configure "Site URL" e "Redirect URLs" (ex.: http://localhost:5173
--                   e a URL de produção na Vercel) para o link de confirmação voltar ao app.

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
