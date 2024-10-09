import './styles.scss';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@store/gameStore';

const HomePage: React.FC = () => {
  const [nicknameInput, setNicknameInput] = useState('');
  const [difficulty, setDifficultyInput] = useState<'easy' | 'medium' | 'hard'>('easy'); // Dodanie stanu dla poziomu trudności
  const navigate = useNavigate();
  const setNickname = useGameStore((state) => state.setNickname);
  const setDifficulty = useGameStore((state) => state.setDifficulty);
  const resetGame = useGameStore((state) => state.resetGame);

  const handleStartGame = () => {
    if (nicknameInput.trim()) {
      setNickname(nicknameInput);
      setDifficulty(difficulty); // Ustawienie poziomu trudności w stanie globalnym
      resetGame(); // Resetowanie gry na początek
      navigate('/game'); // Przeniesienie użytkownika na stronę gry
    } else {
      alert('Please enter your nickname!');
    }
  };

  return (
    <div className="home-page">
      <h1>MindMatch 🔗</h1>
      <input
        type="text"
        placeholder="Enter your nickname"
        value={nicknameInput}
        onChange={(e) => setNicknameInput(e.target.value)}
      />
      <h3>Select level</h3>
      <select
        value={difficulty}
        onChange={(e) => setDifficultyInput(e.target.value as 'easy' | 'medium' | 'hard')}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default HomePage;
