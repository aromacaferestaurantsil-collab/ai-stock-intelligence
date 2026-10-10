-- AI Stock Intelligence initial schema. Personal data is protected by RLS.
create extension if not exists pgcrypto;
create table if not exists public.instruments (
 id uuid primary key default gen_random_uuid(), symbol text not null, name text not null,
 market text not null check (market in ('IN','US')), exchange text,
 asset_type text not null check (asset_type in ('equity','etf','mutual_fund','commodity','future','index')),
 category text not null default 'other', currency text not null check (currency in ('INR','USD')),
 provider_symbol text, is_active boolean not null default true, created_at timestamptz not null default now(),
 unique (market,symbol,exchange)
);
create table if not exists public.watchlists (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 name text not null, created_at timestamptz not null default now()
);
create table if not exists public.watchlist_items (
 id uuid primary key default gen_random_uuid(), watchlist_id uuid not null references public.watchlists(id) on delete cascade,
 instrument_id uuid not null references public.instruments(id) on delete cascade, created_at timestamptz not null default now(),
 unique (watchlist_id,instrument_id)
);
create table if not exists public.user_preferences (
 user_id uuid primary key references auth.users(id) on delete cascade,
 preferred_market text not null default 'BOTH' check (preferred_market in ('IN','US','BOTH')),
 preferred_currency text not null default 'INR' check (preferred_currency in ('INR','USD')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.portfolio_accounts (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 name text not null, base_currency text not null default 'INR' check (base_currency in ('INR','USD')),
 created_at timestamptz not null default now()
);
create table if not exists public.portfolio_transactions (
 id uuid primary key default gen_random_uuid(), account_id uuid not null references public.portfolio_accounts(id) on delete cascade,
 instrument_id uuid not null references public.instruments(id), transaction_type text not null check (transaction_type in ('BUY','SELL')),
 quantity numeric(24,8) not null check (quantity > 0), unit_price numeric(24,8) not null check (unit_price >= 0),
 fees numeric(24,8) not null default 0 check (fees >= 0), currency text not null check (currency in ('INR','USD')),
 transacted_at timestamptz not null, created_at timestamptz not null default now()
);
create table if not exists public.user_alerts (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 instrument_id uuid not null references public.instruments(id) on delete cascade,
 alert_type text not null check (alert_type in ('PRICE_ABOVE','PRICE_BELOW','PCT_CHANGE','FUNDAMENTAL_SCORE','TECHNICAL_SCORE')),
 threshold numeric(24,8) not null, is_enabled boolean not null default true,
 last_triggered_at timestamptz, created_at timestamptz not null default now()
);
create index if not exists instruments_market_category_idx on public.instruments(market,category);
create index if not exists watchlists_user_id_idx on public.watchlists(user_id);
create index if not exists portfolio_accounts_user_id_idx on public.portfolio_accounts(user_id);
create index if not exists portfolio_transactions_account_date_idx on public.portfolio_transactions(account_id,transacted_at);
create index if not exists user_alerts_user_enabled_idx on public.user_alerts(user_id,is_enabled);
alter table public.instruments enable row level security;
alter table public.watchlists enable row level security;
alter table public.watchlist_items enable row level security;
alter table public.user_preferences enable row level security;
alter table public.portfolio_accounts enable row level security;
alter table public.portfolio_transactions enable row level security;
alter table public.user_alerts enable row level security;
create policy "authenticated users read active instruments" on public.instruments for select to authenticated using (is_active=true);
create policy "users manage own watchlists" on public.watchlists for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "users manage own watchlist items" on public.watchlist_items for all using (exists(select 1 from public.watchlists w where w.id=watchlist_id and w.user_id=auth.uid())) with check (exists(select 1 from public.watchlists w where w.id=watchlist_id and w.user_id=auth.uid()));
create policy "users manage own preferences" on public.user_preferences for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "users manage own portfolio accounts" on public.portfolio_accounts for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "users manage transactions in own accounts" on public.portfolio_transactions for all using (exists(select 1 from public.portfolio_accounts a where a.id=account_id and a.user_id=auth.uid())) with check (exists(select 1 from public.portfolio_accounts a where a.id=account_id and a.user_id=auth.uid()));
create policy "users manage own alerts" on public.user_alerts for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
