create table if not exists public.samplex_licenses (
  id text primary key,
  kind text not null check (kind in ('permanent', 'promo', 'credits')),
  credits integer check (credits is null or credits > 0),
  email text,
  note text,
  token text not null unique,
  status text not null default 'active' check (status in ('active', 'revoked', 'replaced')),
  issued_at timestamptz not null default now(),
  issued_by text not null,
  payment_id text unique,
  checkout_id text unique,
  product_id text,
  customer_id text,
  amount integer,
  currency text
);

alter table public.samplex_licenses add column if not exists checkout_id text unique;
alter table public.samplex_licenses add column if not exists product_id text;
alter table public.samplex_licenses add column if not exists customer_id text;
alter table public.samplex_licenses add column if not exists amount integer;
alter table public.samplex_licenses add column if not exists currency text;

alter table public.samplex_licenses enable row level security;

revoke all on table public.samplex_licenses from anon, authenticated;
