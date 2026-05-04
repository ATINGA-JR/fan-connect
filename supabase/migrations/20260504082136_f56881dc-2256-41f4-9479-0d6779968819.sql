create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    user_id,
    username,
    display_name,
    country,
    date_of_birth,
    favorite_league,
    favorite_club,
    favorite_player,
    other_leagues,
    other_clubs,
    other_players
  ) values (
    new.id,
    new.raw_user_meta_data->>'username',
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name'),
    new.raw_user_meta_data->>'country',
    nullif(new.raw_user_meta_data->>'date_of_birth', '')::date,
    new.raw_user_meta_data->>'favorite_league',
    new.raw_user_meta_data->>'favorite_club',
    new.raw_user_meta_data->>'favorite_player',
    coalesce(array(select jsonb_array_elements_text(coalesce(new.raw_user_meta_data->'other_leagues', '[]'::jsonb))), '{}'::text[]),
    coalesce(array(select jsonb_array_elements_text(coalesce(new.raw_user_meta_data->'other_clubs', '[]'::jsonb))), '{}'::text[]),
    coalesce(array(select jsonb_array_elements_text(coalesce(new.raw_user_meta_data->'other_players', '[]'::jsonb))), '{}'::text[])
  )
  on conflict (user_id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, 'user')
  on conflict do nothing;

  return new;
end;
$$;