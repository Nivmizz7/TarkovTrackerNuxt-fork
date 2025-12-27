ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can read audit logs" ON public.admin_audit_log;
CREATE POLICY "Admins can read audit logs"
  ON public.admin_audit_log
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.user_system
      WHERE user_system.user_id = (select auth.uid())
        AND user_system.is_admin = true
    )
  );

-- Revoke insert from anon and authenticated roles to prevent client-side inserts
REVOKE INSERT ON public.admin_audit_log FROM anon, authenticated;

-- Only service_role (used by edge functions) can insert audit logs
GRANT INSERT ON public.admin_audit_log TO service_role;
