import React from 'react';
import { formatTime } from '../utils/gameUtils';

export default function WinScreen({ moves, time, onRestart, isNewBest, difficulty }) {
  return (
    <div className="win-overlay">
      <div className="win-card">
        <div className="win-burst">🎉</div>
        <h2 className="win-title">You Won!</h2>
        {isNewBest && (
          <div className="new-best-badge">🏆 New Best Score!</div>
        )}
        <p className="win-subtitle">Great memory on <strong>{difficulty}</strong> mode</p>
        <div className="win-stats">
          <div className="win-stat">
            <span className="win-stat-value mono">{moves}</span>
            <span className="win-stat-label">Moves</span>
          </div>
          <div className="win-divider" />
          <div className="win-stat">
            <span className="win-stat-value mono">{formatTime(time)}</span>
            <span className="win-stat-label">Time</span>
          </div>
        </div>
        <button className="btn-play-again" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}