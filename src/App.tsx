import React from 'react';

import { Routes, Route } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import GamePage from '@pages/GamePage';
import SummaryPage from '@pages/SummaryPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/summary" element={<SummaryPage />} />
    </Routes>
  );
};

export default App;
