create table if not exists public.game_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  save_data jsonb not null,
  save_version integer not null default 18,
  updated_at timestamptz not null default now()
);

alter table public.game_saves enable row level security;

drop policy if exists "Users can read own game save" on public.game_saves;
create policy "Users can read own game save"
on public.game_saves for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own game save" on public.game_saves;
create policy "Users can insert own game save"
on public.game_saves for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own game save" on public.game_saves;
create policy "Users can update own game save"
on public.game_saves for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own game save" on public.game_saves;
create policy "Users can delete own game save"
on public.game_saves for delete
using (auth.uid() = user_id);

create index if not exists game_saves_updated_at_idx on public.game_saves(updated_at desc);
