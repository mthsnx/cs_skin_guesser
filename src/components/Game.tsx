import { useState, useEffect } from 'react';
import { getRandomSkin, calculateAccuracy, CS2Skin } from '../services/steamApi';
import { Trophy, DollarSign } from 'lucide-react';

type GuessResult = {
  correct: boolean;
  percentageOff: number;
  actualPrice: number;
};

export function Game() {
  const [currentSkin, setCurrentSkin] = useState<CS2Skin | null>(null);
  const [guessInput, setGuessInput] = useState('');
  const [result, setResult] = useState<GuessResult | null>(null);

  useEffect(() => {
    loadNewSkin();
  }, []);

  const loadNewSkin = () => {
    setCurrentSkin(getRandomSkin());
    setGuessInput('');
    setResult(null);
  };

  const handleGuess = () => {
    if (!currentSkin || !guessInput) return;

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
  };

  const handleNext = () => {
    loadNewSkin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-800/50 border-b border-slate-700 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl font-bold text-white">CS2 Skin Pricer</h1>
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
              </ul>
            </div>

            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4 text-center">
              <p className="text-slate-400 text-sm">Ad space available</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
