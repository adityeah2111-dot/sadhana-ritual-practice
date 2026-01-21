import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  full_name: string | null;
  date_of_birth: string | null;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null;
  avatar_url: string | null;
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

    // Cast to Profile - additional fields will be null if not in DB yet
    setProfile(data as Profile | null);
    setLoading(false);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return null;

    try {
      // Try to update first (most common case - profile exists)
      const { data: updateData, error: updateError } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .select()
        .maybeSingle();

      if (updateError) {
        console.error('Error updating profile:', updateError);
        return null;
      }

      // If update succeeded (returned data), we're done
      if (updateData) {
        setProfile(updateData as Profile);
        return updateData;
      }

      // If no data returned (profile doesn't exist), try insert
      const { data: insertData, error: insertError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          ...updates,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating profile:', insertError);
        return null;
      }

      setProfile(insertData as Profile);
      return insertData;
    } catch (err) {
      console.error('Unexpected error in updateProfile:', err);
      return null;
    }
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
