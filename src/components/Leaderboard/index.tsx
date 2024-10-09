import './styles.scss';

import React from 'react';
import { useGameStore } from '@store/gameStore';

const Leaderboard: React.FC = () => {
  const { gameHistory } = useGameStore();

  // Filtrowanie historii dla każdego poziomu trudności
  const easyGames = gameHistory.filter((game) => game.difficulty === 'easy').slice(0, 5);
  const mediumGames = gameHistory.filter((game) => game.difficulty === 'medium').slice(0, 5);
  const hardGames = gameHistory.filter((game) => game.difficulty === 'hard').slice(0, 5);

  return (
    <div className="leaderboard">
      <h1>👑</h1>
      <h2>Leaderboard - Easy</h2>
      <ul>
        {easyGames.length === 0 ? (
          <p>No games played yet on Easy difficulty.</p>
        ) : (
          easyGames.map((entry, index) => (
            <li key={index} className="game-entry">
              <span>#{index + 1}</span>
              <strong>{entry.nickname}</strong>
              <span>Attempts: {entry.attempts}</span>
              <span>Duration: {entry.duration}s</span>
            </li>
          ))
        )}
      </ul>

      <h2>Leaderboard - Medium</h2>
      <ul>
        {mediumGames.length === 0 ? (
          <p>No games played yet on Medium difficulty.</p>
        ) : (
          mediumGames.map((entry, index) => (
            <li key={index} className="game-entry">
              <span>#{index + 1}</span>
              <strong>{entry.nickname}</strong>
              <span>Attempts: {entry.attempts}</span>
              <span>Duration: {entry.duration}s</span>
            </li>
          ))
        )}
      </ul>

      <h2>Leaderboard - Hard</h2>
      <ul>
        {hardGames.length === 0 ? (
          <p>No games played yet on Hard difficulty.</p>
        ) : (
          hardGames.map((entry, index) => (
            <li key={index} className="game-entry">
              <span>#{index + 1}</span>
              <strong>{entry.nickname}</strong>
              <span>Attempts: {entry.attempts}</span>
              <span>Duration: {entry.duration}s</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
