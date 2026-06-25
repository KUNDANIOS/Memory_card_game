export const DIFFICULTY_CONFIG = {
  easy: { pairs: 6, grid: '3x4', label: 'Easy', cols: 3 },
  medium: { pairs: 8, grid: '4x4', label: 'Medium', cols: 4 },
  hard: { pairs: 10, grid: '4x5', label: 'Hard', cols: 5 },
};

export const CARD_SYMBOLS = [
  '🦋', '🌙', '⚡', '🔮', '🌊', '🎯',
  '🦄', '🌸', '🎲', '🔥', '💎', '🎪',
  '🌈', '🎭', '🧩', '🚀', '🎸', '🌺',
  '🦊', '🧿',
];

export function generateCards(pairs) {
  const symbols = CARD_SYMBOLS.slice(0, pairs);
  const doubled = [...symbols, ...symbols];
  return doubled
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false,
    }));
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function getBestScores() {
  try {
    return JSON.parse(localStorage.getItem('memoryBestScores')) || {};
  } catch {
    return {};
  }
}

export function saveBestScore(difficulty, moves, time) {
  const scores = getBestScores();
  const current = scores[difficulty];
  const isBetter =
    !current ||
    moves < current.moves ||
    (moves === current.moves && time < current.time);

  if (isBetter) {
    scores[difficulty] = { moves, time };
    localStorage.setItem('memoryBestScores', JSON.stringify(scores));
    return true;
  }
  return false;
}