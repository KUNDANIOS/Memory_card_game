import React from 'react';
import { getBestScores, formatTime, DIFFICULTY_CONFIG } from '../utils/gameUtils';

export default function BestScores() {
  const scores = getBestScores();
  const hasAny = Object.keys(scores).length > 0;

  if (!hasAny) return null;

  return (
    <div className="best-scores">
      <h3 className="scores-title">Best Scores</h3>
      <div className="scores-grid">
        {Object.entries(DIFFICULTY_CONFIG).map(([key, val]) => {
          const s = scores[key];
          return (
            <div key={key} className="score-card">
              <span className="score-diff">{val.label}</span>
              {s ? (
                <div className="score-details">
                  <span className="mono">{s.moves} moves</span>
                  <span className="score-dot">·</span>
                  <span className="mono">{formatTime(s.time)}</span>
                </div>
              ) : (
                <span className="score-empty">Not played</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}