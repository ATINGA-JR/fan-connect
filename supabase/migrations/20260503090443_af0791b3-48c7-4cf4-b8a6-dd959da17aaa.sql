
-- Roles enum + table
create type public.app_role as enum ('admin', 'moderator', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Roles are viewable by everyone"
  on public.user_roles for select using (true);

create policy "Admins can manage roles"
  on public.user_roles for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Profiles
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  location text,
  country text,
  date_of_birth date,
  favorite_league text,
  favorite_club text,
  favorite_player text,
  other_leagues text[] default '{}',
  other_clubs text[] default '{}',
  other_players text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = user_id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = user_id);

create policy "Users can delete their own profile"
  on public.profiles for delete using (auth.uid() = user_id);

-- updated_at trigger
create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

-- Auto-create profile on signup using metadata
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (
    user_id, username, display_name, country, date_of_birth,
    favorite_league, favorite_club, favorite_player,
    other_leagues, other_clubs, other_players
  ) values (
    new.id,
    new.raw_user_meta_data->>'username',
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name'),
    new.raw_user_meta_data->>'country',
    nullif(new.raw_user_meta_data->>'date_of_birth','')::date,
    new.raw_user_meta_data->>'favorite_league',
    new.raw_user_meta_data->>'favorite_club',
    new.raw_user_meta_data->>'favorite_player',
    coalesce((new.raw_user_meta_data->'other_leagues')::jsonb::text[]::text[], '{}'),
    coalesce((new.raw_user_meta_data->'other_clubs')::jsonb::text[]::text[], '{}'),
    coalesce((new.raw_user_meta_data->'other_players')::jsonb::text[]::text[], '{}')
  )
  on conflict (user_id) do nothing;

  insert into public.user_roles (user_id, role) values (new.id, 'user')
  on conflict do nothing;

  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
