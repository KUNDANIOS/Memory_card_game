import React from 'react';
import Card from './Card';

export default function Board({ cards, onCardClick, cols }) {
  return (
    <div
      className="board"
      style={{ '--cols': cols }}
    >
      {cards.map(card => (
        <Card key={card.id} card={card} onClick={onCardClick} />
      ))}
    </div>
  );
}