-- Enable Realtime on user_progress table for team sync
-- This allows teammates to receive real-time updates when other team members update their progress

-- Add user_progress table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_progress;;
