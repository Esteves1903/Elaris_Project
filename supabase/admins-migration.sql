-- ================================================================
-- 1. Tabela de admins separada
-- ================================================================
create table if not exists public.admins (
  id            uuid primary key default gen_random_uuid(),
  auth_user_id  uuid not null references auth.users(id) on delete cascade,
  email         text not null,
  name          text,
  created_at    timestamptz not null default now()
);

-- ================================================================
-- 2. Preencher com os utilizadores de admin já criados
-- ================================================================
insert into public.admins (auth_user_id, email, name)
select
  id,
  email,
  case email
    when 'joaomouta@helarys.com'      then 'João Mouta'
    when 'josemario@helarys.com'      then 'José Mário'
    when 'diogomagalhaes@helarys.com' then 'Diogo Magalhães'
  end
from auth.users
where email in (
  'joaomouta@helarys.com',
  'josemario@helarys.com',
  'diogomagalhaes@helarys.com'
);

-- ================================================================
-- 3. RLS — tabela admins (só admins podem ver)
-- ================================================================
alter table public.admins enable row level security;

create policy "admins_read_admins" on public.admins
  for select using (
    auth.uid() in (select auth_user_id from public.admins)
  );

-- ================================================================
-- 4. RLS — tabela clients
-- ================================================================
alter table public.clients enable row level security;

create policy "client_reads_own" on public.clients
  for select using (auth.uid() = auth_user_id);

create policy "admin_reads_clients" on public.clients
  for select using (
    auth.uid() in (select auth_user_id from public.admins)
  );

-- ================================================================
-- 5. RLS — tabela projects
-- ================================================================
alter table public.projects enable row level security;

create policy "client_reads_own_project" on public.projects
  for select using (
    client_id in (
      select id from public.clients where auth_user_id = auth.uid()
    )
  );

create policy "admin_reads_projects" on public.projects
  for select using (
    auth.uid() in (select auth_user_id from public.admins)
  );

-- ================================================================
-- 6. RLS — tabela messages
-- ================================================================
alter table public.messages enable row level security;

create policy "client_reads_own_messages" on public.messages
  for select using (
    project_id in (
      select p.id from public.projects p
      join public.clients c on c.id = p.client_id
      where c.auth_user_id = auth.uid()
    )
  );

create policy "admin_reads_messages" on public.messages
  for select using (
    auth.uid() in (select auth_user_id from public.admins)
  );
