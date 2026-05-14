create table if not exists sticker_history (
  id           uuid        primary key default gen_random_uuid(),
  collection_id uuid        not null references collections(id) on delete cascade,
  sticker_code text        not null,
  sticker_name text        not null,
  action       text        not null check (action in ('added', 'removed')),
  actor        text        not null check (actor in ('me', 'brother')),
  created_at   timestamptz not null default now()
);

alter table sticker_history enable row level security;

create policy "public access sticker_history"
  on sticker_history for all
  using (true)
  with check (true);
