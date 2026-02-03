ALTER TABLE public.user_preferences
  ADD COLUMN IF NOT EXISTS hideout_require_station_levels BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS hideout_require_skill_levels BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS hideout_require_trader_loyalty BOOLEAN DEFAULT TRUE;
