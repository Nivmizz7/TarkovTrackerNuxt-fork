ALTER TABLE public.user_system
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;
