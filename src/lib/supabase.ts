import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  is_subscribed: boolean;
  subscription_expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type DailyGuess = {
  id: string;
  user_id: string;
  guess_date: string;
  guess_count: number;
  created_at: string;
  updated_at: string;
};

export type GuessHistory = {
  id: string;
  user_id: string;
  skin_name: string;
  actual_price: number;
  guessed_price: number;
  percentage_off: number;
  created_at: string;
};
