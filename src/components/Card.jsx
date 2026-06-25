import React from 'react';

export default function Card({ card, onClick }) {
  const { isFlipped, isMatched, symbol } = card;
  const revealed = isFlipped || isMatched;

  return (
    <div
      className={`card-wrapper ${revealed ? 'revealed' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={() => onClick(card.id)}
      role="button"
      aria-label={revealed ? `Card: ${symbol}` : 'Hidden card'}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(card.id)}
    >
      <div className="card-inner">
        <div className="card-back">
          <span className="card-back-pattern">✦</span>
        </div>
        <div className="card-front">
          <span className="card-symbol">{symbol}</span>
        </div>
      </div>
    </div>
  );
}