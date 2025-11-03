import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const FREE_GUESSES_PER_DAY = 5;

export function useGuessLimit() {
  const { user, profile } = useAuth();
  const [guessesRemaining, setGuessesRemaining] = useState(0);
  const [loading, setLoading] = useState(true);

  const checkGuessLimit = async () => {
    if (!user) {
      setGuessesRemaining(0);
      setLoading(false);
      return;
    }

    if (profile?.is_subscribed) {
      setGuessesRemaining(Infinity);
      setLoading(false);
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('daily_guesses')
      .select('guess_count')
      .eq('user_id', user.id)
      .eq('guess_date', today)
      .maybeSingle();

    if (error) {
      console.error('Error checking guess limit:', error);
      setGuessesRemaining(0);
      setLoading(false);
      return;
    }

    const currentGuesses = data?.guess_count || 0;
    setGuessesRemaining(Math.max(0, FREE_GUESSES_PER_DAY - currentGuesses));
    setLoading(false);
  };

  const incrementGuessCount = async () => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];

    const { data: existing } = await supabase
      .from('daily_guesses')
      .select('id, guess_count')
      .eq('user_id', user.id)
      .eq('guess_date', today)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('daily_guesses')
        .update({
          guess_count: existing.guess_count + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);
    } else {
      await supabase
        .from('daily_guesses')
        .insert({
          user_id: user.id,
          guess_date: today,
          guess_count: 1,
        });
    }

    await checkGuessLimit();
  };

  useEffect(() => {
    checkGuessLimit();
  }, [user, profile?.is_subscribed]);

  return {
    guessesRemaining,
    loading,
    incrementGuessCount,
    isSubscribed: profile?.is_subscribed || false,
    hasGuessesLeft: profile?.is_subscribed || guessesRemaining > 0,
  };
}
