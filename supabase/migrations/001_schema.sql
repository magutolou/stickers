-- Seleções (catálogo estático)
create table if not exists teams (
  id    text primary key,
  name  text not null,
  "group" text not null
);

-- Figurinhas (catálogo estático)
create table if not exists stickers (
  id          text primary key,
  team_id     text not null references teams(id),
  number      integer not null,
  player_name text not null,
  is_special  boolean not null default false
);

-- Coleção compartilhada
create table if not exists collections (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  owner_token   uuid not null unique default gen_random_uuid(),
  partner_token uuid not null unique default gen_random_uuid()
);

-- Posse das figurinhas por coleção
create table if not exists collection_stickers (
  collection_id    uuid not null references collections(id) on delete cascade,
  sticker_id       text not null references stickers(id),
  owned            boolean not null default false,
  quantity_me      integer not null default 0,
  quantity_brother integer not null default 0,
  primary key (collection_id, sticker_id)
);

-- Ativar Realtime na tabela principal
alter publication supabase_realtime add table collection_stickers;

-- Row Level Security (acesso via anon key — sem autenticação)
alter table collections enable row level security;
alter table collection_stickers enable row level security;
alter table teams enable row level security;
alter table stickers enable row level security;

-- Qualquer um pode ler o catálogo
create policy "public read teams" on teams for select using (true);
create policy "public read stickers" on stickers for select using (true);

-- Qualquer um pode criar uma coleção
create policy "public insert collections" on collections for insert with check (true);

-- Acesso à coleção via token (sem auth, usando anon key)
create policy "public read collections" on collections for select using (true);
create policy "public read collection_stickers" on collection_stickers for select using (true);
create policy "public write collection_stickers" on collection_stickers
  for all using (true) with check (true);
