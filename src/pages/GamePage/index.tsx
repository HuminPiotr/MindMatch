import './styles.scss';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@store/gameStore';

import GameBoard from '@components/GameBoard';
import GameStats from '@components/GameStats';

const GamePage: React.FC = () => {
  const { gameFinished, resetGame } = useGameStore();
  const navigate = useNavigate();

  useEffect(() => {
    resetGame(); // Reset gry na początku
  }, [resetGame]);

  useEffect(() => {
    if (gameFinished) {
      navigate('/summary'); // Przeniesienie na stronę podsumowania po zakończeniu gry
    }
  }, [gameFinished, navigate]);

  return (
    <div className="game-page">
      <GameStats />
      <GameBoard />
    </div>
  );
};

export default GamePage;
