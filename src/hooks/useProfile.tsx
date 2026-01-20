import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  practice_time: string | null;
  timezone: string | null;
  onboarding_completed: boolean | null;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
    }

    setProfile(data);
    setLoading(false);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) return null;

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return null;
    }

    setProfile(data);
    return data;
  };

  const completeOnboarding = async (practiceTime: string, timezone: string, displayName?: string) => {
    if (!user) return null;

    const updates = {
      practice_time: practiceTime,
      timezone,
      display_name: displayName || null,
      onboarding_completed: true,
    };

    return updateProfile(updates);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    updateProfile,
    completeOnboarding,
    refetch: fetchProfile,
  };
};
