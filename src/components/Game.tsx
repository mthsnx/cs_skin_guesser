import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useGuessLimit } from '../hooks/useGuessLimit';
import { getRandomSkin, calculateAccuracy, CS2Skin } from '../services/steamApi';
import { supabase } from '../lib/supabase';
import { Trophy, TrendingUp, LogOut, Crown, DollarSign } from 'lucide-react';

type GuessResult = {
  correct: boolean;
  percentageOff: number;
  actualPrice: number;
};

export function Game() {
  const { user, signOut, profile } = useAuth();
  const { guessesRemaining, isSubscribed, hasGuessesLeft, incrementGuessCount } = useGuessLimit();
  const [currentSkin, setCurrentSkin] = useState<CS2Skin | null>(null);
  const [guessInput, setGuessInput] = useState('');
  const [result, setResult] = useState<GuessResult | null>(null);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  useEffect(() => {
    loadNewSkin();
  }, []);

  const loadNewSkin = () => {
    setCurrentSkin(getRandomSkin());
    setGuessInput('');
    setResult(null);
  };

  const handleGuess = async () => {
    if (!currentSkin || !guessInput || !user) return;

    if (!hasGuessesLeft) {
      setShowSubscribeModal(true);
      return;
    }

    const guessedPrice = parseFloat(guessInput);
    if (isNaN(guessedPrice) || guessedPrice <= 0) {
      alert('Please enter a valid price');
      return;
    }

    const percentageOff = calculateAccuracy(guessedPrice, currentSkin.price);
    const correct = percentageOff <= 10;

    setResult({
      correct,
      percentageOff,
      actualPrice: currentSkin.price,
    });

    await supabase.from('guess_history').insert({
      user_id: user.id,
      skin_name: currentSkin.name,
      actual_price: currentSkin.price,
      guessed_price: guessedPrice,
      percentage_off: percentageOff,
    });

    await incrementGuessCount();
  };

  const handleNext = () => {
    loadNewSkin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-800/50 border-b border-slate-700 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl font-bold text-white">CS2 Skin Pricer</h1>
          </div>
          <div className="flex items-center gap-4">
            {isSubscribed ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                <Crown className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Premium</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">{guessesRemaining} guesses left</span>
              </div>
            )}
            <span className="text-slate-300">{user?.email}</span>
            <button
              onClick={signOut}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-6 text-center">
          <p className="text-yellow-200 text-sm">
            Ad space available - Contact for advertising opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
              {currentSkin && (
                <>
                  <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    {currentSkin.name}
                  </h2>

                  <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-8 mb-8 flex items-center justify-center">
                    <img
                      src={currentSkin.image}
                      alt={currentSkin.name}
                      className="max-w-full h-auto max-h-96 object-contain drop-shadow-2xl"
                    />
                  </div>

                  {!result ? (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="guess" className="block text-lg font-medium text-slate-300 mb-3">
                          What's your price guess?
                        </label>
                        <div className="flex gap-3">
                          <div className="relative flex-1">
                            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              id="guess"
                              type="number"
                              step="0.01"
                              value={guessInput}
                              onChange={(e) => setGuessInput(e.target.value)}
                              placeholder="0.00"
                              className="w-full pl-12 pr-4 py-4 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-lg placeholder-slate-400"
                            />
                          </div>
                          <button
                            onClick={handleGuess}
                            disabled={!guessInput}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-lg"
                          >
                            Guess
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div
                        className={`p-6 rounded-xl border-2 ${
                          result.correct
                            ? 'bg-green-900/30 border-green-500'
                            : 'bg-red-900/30 border-red-500'
                        }`}
                      >
                        <h3
                          className={`text-2xl font-bold mb-3 ${
                            result.correct ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {result.correct ? 'Great guess!' : 'Not quite!'}
                        </h3>
                        <p className="text-white text-lg mb-2">
                          Actual price: <span className="font-bold">${result.actualPrice.toFixed(2)}</span>
                        </p>
                        <p className="text-slate-300">
                          You were off by <span className="font-bold">{result.percentageOff}%</span>
                        </p>
                      </div>

                      <button
                        onClick={handleNext}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-lg"
                      >
                        Next Skin
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">How to Play</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">1.</span>
                  <span>Look at the CS2 skin image and name</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">2.</span>
                  <span>Guess the current market price</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">3.</span>
                  <span>Get within 10% to win the round</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">4.</span>
                  <span>Free users get 5 guesses per day</span>
                </li>
              </ul>
            </div>

            {!isSubscribed && (
              <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl p-6 border-2 border-yellow-400 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">Go Premium!</h3>
                </div>
                <ul className="space-y-2 text-white mb-4">
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Unlimited guesses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>No ads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Exclusive skins</span>
                  </li>
                </ul>
                <button
                  onClick={() => setShowSubscribeModal(true)}
                  className="w-full py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Subscribe Now - $4.99/mo
                </button>
              </div>
            )}

            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4 text-center">
              <p className="text-slate-400 text-sm">Ad space available</p>
            </div>
          </div>
        </div>
      </div>

      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Subscribe to Premium</h2>
            <p className="text-slate-300 mb-6">
              {hasGuessesLeft
                ? 'Upgrade to premium for unlimited guesses and ad-free experience!'
                : "You've used all your free guesses today. Subscribe to keep playing!"}
            </p>
            <div className="bg-slate-700 rounded-lg p-4 mb-6">
              <div className="text-3xl font-bold text-white mb-2">$4.99/month</div>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Unlimited daily guesses</li>
                <li>✓ Ad-free experience</li>
                <li>✓ Access to rare skins</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
            <p className="text-yellow-200 bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3 mb-4 text-sm">
              To enable payments, you need to set up Stripe. Contact support for integration details.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubscribeModal(false)}
                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
              >
                Maybe Later
              </button>
              <button
                onClick={() => alert('Stripe integration required. Add your Stripe publishable key to proceed.')}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
