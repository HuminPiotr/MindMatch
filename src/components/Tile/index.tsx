import './styles.scss';
import React from 'react';

interface TileProps {
    tile: { id: number; image: string; revealed: boolean };
    onClick: () => void;
  }
  
  const Tile: React.FC<TileProps> = ({ tile, onClick }) => {
    return (
      <button
        className={`tile ${tile.revealed ? 'revealed' : ''}`}
        onClick={tile.revealed ? undefined : onClick}
      >
        {tile.revealed ? tile.image : null}
      </button>
    ); 
  };

export default Tile;
