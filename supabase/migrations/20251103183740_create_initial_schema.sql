/*
  # Initial Schema for CS2 Skin Price Guessing Game

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `email` (text)
      - `is_subscribed` (boolean) - Premium subscription status
      - `subscription_expires_at` (timestamptz) - When subscription ends
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `daily_guesses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `guess_date` (date) - The date of the guess
      - `guess_count` (integer) - Number of guesses made today
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `guess_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `skin_name` (text) - Name of the CS2 skin
      - `actual_price` (decimal) - Real price from Steam
      - `guessed_price` (decimal) - User's guess
      - `percentage_off` (decimal) - How far off they were
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  is_subscribed boolean DEFAULT false,
  subscription_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS daily_guesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  guess_date date DEFAULT CURRENT_DATE,
  guess_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, guess_date)
);

ALTER TABLE daily_guesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own daily guesses"
  ON daily_guesses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily guesses"
  ON daily_guesses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily guesses"
  ON daily_guesses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS guess_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  skin_name text NOT NULL,
  actual_price decimal(10,2) NOT NULL,
  guessed_price decimal(10,2) NOT NULL,
  percentage_off decimal(5,2),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE guess_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own guess history"
  ON guess_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own guess history"
  ON guess_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_daily_guesses_user_date ON daily_guesses(user_id, guess_date);
CREATE INDEX IF NOT EXISTS idx_guess_history_user ON guess_history(user_id, created_at DESC);