-- Add missing profile fields for complete user data
-- This migration adds: full_name, date_of_birth, gender, avatar_url, and bio

-- Add new columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS streak_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_sessions INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_minutes INTEGER DEFAULT 0;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

-- Add a function to calculate user stats
CREATE OR REPLACE FUNCTION public.update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- When a session is completed, update user stats
  IF NEW.completed_at IS NOT NULL AND OLD.completed_at IS NULL THEN
    UPDATE public.profiles
    SET 
      total_sessions = total_sessions + 1,
      total_minutes = total_minutes + COALESCE(NEW.duration_seconds / 60, 0),
      updated_at = now()
    WHERE user_id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to auto-update stats when sessions are completed
DROP TRIGGER IF EXISTS update_stats_on_session_complete ON public.sessions;
CREATE TRIGGER update_stats_on_session_complete
AFTER UPDATE ON public.sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_user_stats();

-- Create a function to calculate current streak
CREATE OR REPLACE FUNCTION public.calculate_streak(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  current_streak INTEGER := 0;
  check_date DATE;
BEGIN
  -- Start from today and work backwards
  check_date := CURRENT_DATE;
  
  LOOP
    -- Check if there's a completed session on this date
    IF NOT EXISTS (
      SELECT 1 FROM public.sessions
      WHERE user_id = p_user_id
        AND DATE(completed_at AT TIME ZONE 'UTC') = check_date
        AND completed_at IS NOT NULL
    ) THEN
      -- No session on this date, streak broken
      EXIT;
    END IF;
    
    -- Increment streak and check previous day
    current_streak := current_streak + 1;
    check_date := check_date - INTERVAL '1 day';
    
    -- Prevent infinite loops (max 1000 days)
    IF current_streak > 1000 THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN current_streak;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create a helper view for user dashboard stats
CREATE OR REPLACE VIEW public.user_dashboard_stats AS
SELECT 
  p.user_id,
  p.full_name,
  p.display_name,
  p.avatar_url,
  p.total_sessions,
  p.total_minutes,
  public.calculate_streak(p.user_id) as current_streak,
  (
    SELECT COUNT(*)
    FROM public.sessions s
    WHERE s.user_id = p.user_id
      AND s.completed_at IS NOT NULL
      AND DATE(s.completed_at) >= CURRENT_DATE - INTERVAL '7 days'
  ) as sessions_this_week,
  (
    SELECT SUM(duration_seconds) / 60
    FROM public.sessions s
    WHERE s.user_id = p.user_id
      AND s.completed_at IS NOT NULL
      AND DATE(s.completed_at) >= CURRENT_DATE - INTERVAL '7 days'
  ) as minutes_this_week,
  (
    SELECT MAX(completed_at)
    FROM public.sessions s
    WHERE s.user_id = p.user_id
      AND s.completed_at IS NOT NULL
  ) as last_practice_date
FROM public.profiles p;

-- Grant access to the view
GRANT SELECT ON public.user_dashboard_stats TO authenticated;

-- Add RLS policy for the view
ALTER VIEW public.user_dashboard_stats SET (security_invoker = on);

-- Comment on columns for documentation
COMMENT ON COLUMN public.profiles.full_name IS 'User''s full legal name';
COMMENT ON COLUMN public.profiles.date_of_birth IS 'User''s date of birth for age verification';
COMMENT ON COLUMN public.profiles.gender IS 'User''s gender identity';
COMMENT ON COLUMN public.profiles.avatar_url IS 'URL to user''s profile picture in Supabase Storage';
COMMENT ON COLUMN public.profiles.bio IS 'User''s bio/description (max 500 chars)';
COMMENT ON COLUMN public.profiles.streak_count IS 'Current consecutive days streak (calculated)';
COMMENT ON COLUMN public.profiles.total_sessions IS 'Total number of completed practice sessions';
COMMENT ON COLUMN public.profiles.total_minutes IS 'Total minutes of practice logged';
