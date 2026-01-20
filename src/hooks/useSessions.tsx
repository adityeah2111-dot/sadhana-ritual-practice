import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Session {
  id: string;
  user_id: string;
  started_at: string;
  completed_at: string | null;
  duration_seconds: number | null;
  created_at: string;
}

interface SessionStats {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
}

export const useSessions = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [stats, setStats] = useState<SessionStats>({
    totalSessions: 0,
    totalMinutes: 0,
    currentStreak: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeSession, setActiveSession] = useState<Session | null>(null);

  const fetchSessions = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('started_at', { ascending: false });

    if (error) {
      console.error('Error fetching sessions:', error);
      return;
    }

    setSessions(data || []);
    calculateStats(data || []);

    // Check for active session (started but not completed)
    const active = data?.find((s) => s.started_at && !s.completed_at);
    setActiveSession(active || null);
    setLoading(false);
  };

  const calculateStats = (sessionData: Session[]) => {
    const completedSessions = sessionData.filter((s) => s.completed_at);
    const totalSessions = completedSessions.length;
    const totalMinutes = completedSessions.reduce(
      (acc, s) => acc + (s.duration_seconds || 0) / 60,
      0
    );

    // Calculate streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sessionDates = completedSessions
      .map((s) => {
        const date = new Date(s.completed_at!);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      })
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => b - a);

    let streak = 0;
    const oneDay = 24 * 60 * 60 * 1000;

    for (let i = 0; i < sessionDates.length; i++) {
      const expectedDate = today.getTime() - i * oneDay;
      if (sessionDates[i] === expectedDate) {
        streak++;
      } else if (i === 0 && sessionDates[i] === expectedDate - oneDay) {
        // If no session today but yesterday, still count the streak
        continue;
      } else {
        break;
      }
    }

    setStats({
      totalSessions,
      totalMinutes: Math.round(totalMinutes),
      currentStreak: streak,
    });
  };

  const startSession = async () => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('sessions')
      .insert({
        user_id: user.id,
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error starting session:', error);
      return null;
    }

    setActiveSession(data);
    return data;
  };

  const completeSession = async (durationSeconds: number) => {
    if (!user || !activeSession) return null;

    const { data, error } = await supabase
      .from('sessions')
      .update({
        completed_at: new Date().toISOString(),
        duration_seconds: durationSeconds,
      })
      .eq('id', activeSession.id)
      .select()
      .single();

    if (error) {
      console.error('Error completing session:', error);
      return null;
    }

    setActiveSession(null);
    await fetchSessions();
    return data;
  };

  const cancelSession = async () => {
    if (!activeSession) return;

    await supabase.from('sessions').delete().eq('id', activeSession.id);
    setActiveSession(null);
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  return {
    sessions,
    stats,
    loading,
    activeSession,
    startSession,
    completeSession,
    cancelSession,
    refetch: fetchSessions,
  };
};
