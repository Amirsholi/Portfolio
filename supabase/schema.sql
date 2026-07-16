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
  currency text,
  payment_status text,
  refunded_amount integer,
  refunded_at timestamptz,
  delivery_status text,
  delivered_at timestamptz
);

alter table public.samplex_licenses add column if not exists checkout_id text unique;
alter table public.samplex_licenses add column if not exists product_id text;
alter table public.samplex_licenses add column if not exists customer_id text;
alter table public.samplex_licenses add column if not exists amount integer;
alter table public.samplex_licenses add column if not exists currency text;
alter table public.samplex_licenses add column if not exists payment_status text;
alter table public.samplex_licenses add column if not exists refunded_amount integer;
alter table public.samplex_licenses add column if not exists refunded_at timestamptz;
alter table public.samplex_licenses add column if not exists delivery_status text;
alter table public.samplex_licenses add column if not exists delivered_at timestamptz;

alter table public.samplex_licenses enable row level security;

revoke all on table public.samplex_licenses from anon, authenticated;

create table if not exists public.samplex_metrics (
  day date not null default current_date,
  event text not null check (event in ('demo_interest', 'checkout_interest')),
  count bigint not null default 0 check (count >= 0),
  primary key (day, event)
);

alter table public.samplex_metrics enable row level security;
revoke all on table public.samplex_metrics from anon, authenticated;

create or replace function public.increment_samplex_metric(metric_event text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if metric_event not in ('demo_interest', 'checkout_interest') then
    raise exception 'Unknown SampleX metric';
  end if;

  insert into public.samplex_metrics (day, event, count)
  values (current_date, metric_event, 1)
  on conflict (day, event)
  do update set count = samplex_metrics.count + 1;
end;
$$;

revoke all on function public.increment_samplex_metric(text) from public, anon, authenticated;
grant execute on function public.increment_samplex_metric(text) to service_role;
