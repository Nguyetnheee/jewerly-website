
-- 1. Remove broad authenticated SELECT on coupons; only staff can read directly.
DROP POLICY IF EXISTS "Authenticated read active coupons" ON public.coupons;

-- 2. Revoke EXECUTE on trigger-only SECURITY DEFINER functions from PUBLIC/authenticated.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, authenticated, anon;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, authenticated, anon;
