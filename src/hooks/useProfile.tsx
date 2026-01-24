import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Profile {
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
  const queryClient = useQueryClient();

  // Unique key for the profile query
  const queryKey = ['profile', user?.id];

  const { data: profile, isLoading: loading, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      return data as Profile | null;
    },
    enabled: !!user,
    // Don't refetch on window focus to prevent unnecessary DB calls, mostly for cost saving
    refetchOnWindowFocus: false,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      if (!user) throw new Error('No user logged in');

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
          throw updateError;
        }

        // If update succeeded (returned data), we're done
        if (updateData) {
          return updateData as Profile;
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
          throw insertError;
        }

        return insertData as Profile;
      } catch (err) {
        console.error('Unexpected error in updateProfile:', err);
        throw err;
      }
    },
    onSuccess: (data) => {
      // Update the cache immediately
      queryClient.setQueryData(queryKey, data);
    },
  });

  // Wrapper for updateProfile to match previous API (returning null on error)
  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      return await updateProfileMutation.mutateAsync(updates);
    } catch (error) {
      return null;
    }
  };

  const completeOnboarding = async (practiceTime: string, timezone: string, displayName?: string) => {
    const updates = {
      practice_time: practiceTime,
      timezone,
      display_name: displayName || null,
      onboarding_completed: true,
    };

    return updateProfile(updates);
  };

  return {
    profile: profile ?? null,
    loading,
    updateProfile,
    completeOnboarding,
    refetch,
  };
};
