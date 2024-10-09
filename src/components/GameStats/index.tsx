import './styles.scss';

import React, { useEffect, useState, useRef } from 'react';
import { useGameStore } from '@store/gameStore';

const GameStats: React.FC = () => {
  const { attempts, startTime, gameFinished } = useGameStore();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Referencja do przechowywania id timera

  useEffect(() => {
    if (!startTime) return;

    // Ustawienie i zapisanie identyfikatora timera do timerRef
    timerRef.current = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    // Czyszczenie timera po zakończeniu komponentu
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime]);

  useEffect(() => {
    // Zatrzymanie timera po zakończeniu gry
    if (gameFinished && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null; // Wyczyszczenie referencji timera
    }
  }, [gameFinished]);

  return (
    <div className="game-stats">
      <p>Attempts: {attempts}</p>
      <p>Time: {timeElapsed}s</p>
    </div>
  );
};

export default GameStats;
