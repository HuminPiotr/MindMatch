import './styles.scss';

import React from 'react';
import { useGameStore } from '@store/gameStore';

const GameHistory: React.FC = () => {
  const { gameHistory } = useGameStore();
  const lastGame = gameHistory.length > 0 ? gameHistory[gameHistory.length - 1] : null;

  return (
    <div className="game-history">
      <h2>Last Game Summary</h2>
      {lastGame ? (
        <div className="last-game-entry">
          <strong> {lastGame.nickname}</strong>
          <span>Attempts: {lastGame.attempts}</span>
          <span>Duration: {lastGame.duration}s</span>
          <span>Difficulty: {lastGame.difficulty}</span> {/* Dodanie poziomu trudności */}
          <span>Date: {lastGame.date}</span>
        </div>
      ) : (
        <p>No game has been played yet.</p>
      )}
    </div>
  );
};

export default GameHistory;
