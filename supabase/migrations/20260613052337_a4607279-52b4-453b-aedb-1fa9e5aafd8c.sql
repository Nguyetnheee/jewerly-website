
-- Set search_path on helper trigger function
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- Lock down security-definer functions: only authenticated may call has_role/is_staff (used in RLS)
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
revoke execute on function public.is_staff(uuid) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;
grant execute on function public.is_staff(uuid) to authenticated, service_role;

-- handle_new_user is a trigger only — no one should call it directly
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- Tighten public ticket insert: require non-empty name/email/message and (if logged in) match user_id
drop policy if exists "Anyone create ticket" on public.support_tickets;
create policy "Anyone create ticket" on public.support_tickets for insert to anon, authenticated
  with check (
    length(coalesce(name,'')) between 1 and 120
    and length(coalesce(email,'')) between 3 and 200
    and length(coalesce(message,'')) between 1 and 4000
    and (user_id is null or user_id = auth.uid())
  );
