import { useState, useEffect, useRef, useCallback } from 'react';
import { generateCards, DIFFICULTY_CONFIG, saveBestScore } from '../utils/gameUtils';

export default function useGameLogic(difficulty) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const [cards, setCards] = useState(() => generateCards(config.pairs));
  const [flippedIds, setFlippedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleCardClick = useCallback((id) => {
    if (isChecking || isWon) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched || flippedIds.includes(id)) return;

    if (!isRunning) setIsRunning(true);

    const newFlipped = [...flippedIds, id];
    setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c));
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves(m => m + 1);
      const [firstId, secondId] = newFlipped;
      const first = cards.find(c => c.id === firstId);
      const second = cards.find(c => c.id === id);

      if (first.symbol === second.symbol) {
        setCards(prev =>
          prev.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          )
        );
        setFlippedIds([]);
        setIsChecking(false);

        const totalMatched = cards.filter(c => c.isMatched).length + 2;
        if (totalMatched === cards.length) {
          setIsRunning(false);
          setIsWon(true);
          const newBest = saveBestScore(difficulty, moves + 1, time);
          setIsNewBest(newBest);
        }
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedIds([]);
          setIsChecking(false);
        }, 900);
      }
    }
  }, [cards, flippedIds, isChecking, isRunning, isWon, moves, time, difficulty]);

  const restart = useCallback(() => {
    clearInterval(timerRef.current);
    const fresh = generateCards(DIFFICULTY_CONFIG[difficulty].pairs);
    setCards(fresh);
    setFlippedIds([]);
    setMoves(0);
    setTime(0);
    setIsRunning(false);
    setIsWon(false);
    setIsNewBest(false);
    setIsChecking(false);
  }, [difficulty]);

  return { cards, moves, time, isWon, isNewBest, handleCardClick, restart, config };
}