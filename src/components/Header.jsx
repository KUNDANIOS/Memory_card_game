import React from 'react';
import { formatTime } from '../utils/gameUtils';

export default function Header({ moves, time, onRestart, difficulty }) {
  return (
    <header className="game-header">
      <div className="header-brand">
        <span className="brand-icon">🧩</span>
        <h1 className="brand-title">Memory</h1>
      </div>
      <div className="stats-row">
        <div className="stat-chip">
          <span className="stat-label">Moves</span>
          <span className="stat-value mono">{moves}</span>
        </div>
        <div className="stat-chip">
          <span className="stat-label">Time</span>
          <span className="stat-value mono">{formatTime(time)}</span>
        </div>
        <div className="stat-chip difficulty-chip">
          <span className="stat-label">Level</span>
          <span className="stat-value">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
        </div>
      </div>
      <button className="btn-restart" onClick={onRestart} aria-label="Restart game">
        ↺ Restart
      </button>
    </header>
  );
}