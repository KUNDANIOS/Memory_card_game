import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import Header from './components/Header';
import WinScreen from './components/WinScreen';
import DifficultySelector from './components/DifficultySelector';
import BestScores from './components/BestScores';
import useGameLogic from './hooks/useGameLogic';

export default function App() {
  const [difficulty, setDifficulty] = useState('medium');
  const { cards, moves, time, isWon, isNewBest, handleCardClick, restart, config } = useGameLogic(difficulty);

  const handleDifficultyChange = (newDiff) => {
    setDifficulty(newDiff);
  };

  useEffect(() => {
    restart();
  }, [difficulty]);

  return (
    <div className="app">
      <Header moves={moves} time={time} onRestart={restart} difficulty={difficulty} />
      <main className="main">
        <DifficultySelector current={difficulty} onChange={handleDifficultyChange} />
        <Board cards={cards} onCardClick={handleCardClick} cols={config.cols} />
        <BestScores />
      </main>
      {isWon && (
        <WinScreen
          moves={moves}
          time={time}
          onRestart={restart}
          isNewBest={isNewBest}
          difficulty={difficulty}
        />
      )}
    </div>
  );
}