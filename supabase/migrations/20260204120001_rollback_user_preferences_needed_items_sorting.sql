-- Rollback migration for 20260204120000_add_user_preferences_needed_items_sorting.sql

-- Drop CHECK constraints
ALTER TABLE public.user_preferences
  DROP CONSTRAINT IF EXISTS user_preferences_needed_items_sort_by_check,
  DROP CONSTRAINT IF EXISTS user_preferences_needed_items_sort_direction_check,
  DROP CONSTRAINT IF EXISTS user_preferences_needed_items_card_style_check;

-- Drop columns
ALTER TABLE public.user_preferences
  DROP COLUMN IF EXISTS needed_items_sort_by,
  DROP COLUMN IF EXISTS needed_items_sort_direction,
  DROP COLUMN IF EXISTS needed_items_hide_owned,
  DROP COLUMN IF EXISTS needed_items_card_style;
