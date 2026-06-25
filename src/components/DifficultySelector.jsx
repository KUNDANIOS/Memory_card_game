import React from 'react';
import { DIFFICULTY_CONFIG } from '../utils/gameUtils';

export default function DifficultySelector({ current, onChange }) {
  return (
    <div className="difficulty-selector">
      <span className="diff-label">Difficulty</span>
      <div className="diff-buttons">
        {Object.entries(DIFFICULTY_CONFIG).map(([key, val]) => (
          <button
            key={key}
            className={`diff-btn ${current === key ? 'active' : ''}`}
            onClick={() => onChange(key)}
          >
            {val.label}
            <span className="diff-grid">{val.grid}</span>
          </button>
        ))}
      </div>
    </div>
  );
}