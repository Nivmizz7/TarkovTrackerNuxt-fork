-- Add hide_completed_map_objectives column for Issue #99
-- This setting allows users to hide tasks from map view when all objectives on that map are complete
ALTER TABLE public.user_preferences
  ADD COLUMN IF NOT EXISTS hide_completed_map_objectives BOOLEAN DEFAULT FALSE;
