import './styles.scss';

import React, { useEffect } from 'react';
import { useGameStore } from '@store/gameStore';

import Tile from '@components/Tile';

const GameBoard: React.FC = () => {
  const { tiles, revealTile, resetGame } = useGameStore();

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="game-board">
      {tiles.map((tile) => (
        <Tile key={tile.id} tile={tile} onClick={() => revealTile(tile.id)} />
      ))}
    </div>
  );
};

export default GameBoard;
