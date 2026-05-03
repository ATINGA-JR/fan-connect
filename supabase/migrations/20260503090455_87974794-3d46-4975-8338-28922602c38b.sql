
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.update_updated_at_column() from public, anon, authenticated;
-- has_role is intentionally callable by signed-in users so policies can reference it via RPC if needed,
-- but restrict to authenticated only (not anon).
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
