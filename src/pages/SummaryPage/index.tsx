
import './styles.scss';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import Leaderboard from '@components/Leaderboard';
import GameHistory from '@components/GameHistory';

const SummaryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNewGame = () => {
    navigate('/'); // Przeniesienie do strony głównej, aby rozpocząć nową grę
  };

  return (
    <div className="summary-page">
      <Leaderboard />
      <div className="right">
        <GameHistory />
        <button className="new-game-button" onClick={handleNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;
