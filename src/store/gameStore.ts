import { create } from 'zustand';

interface Tile {
  id: number;
  image: string;
  revealed: boolean;
}

interface GameHistory {
  attempts: number;
  duration: number;
  date: string;
  nickname: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GameState {
  tiles: Tile[];
  revealedTiles: number[];
  matchedPairs: number;
  attempts: number;
  startTime: number | null;
  difficulty: 'easy' | 'medium' | 'hard';
  gameFinished: boolean;
  gameHistory: GameHistory[];
  nickname: string;
  setNickname: (nickname: string) => void;
  revealTile: (id: number) => void;
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  resetGame: () => void;
  saveGameHistory: () => void;
  loadGameHistory: () => void;
}

const IMAGES = [
  '🗿',
  '💿',
  '📡',
  '🦠',
  '🪬',
  '🔮',
  '🧸',
  '💫',
]; // Przykładowa lista obrazków

function shuffleArray(array: Tile[]) {
  return array.sort(() => Math.random() - 0.5);
}

function generateTiles(difficulty: 'easy' | 'medium' | 'hard'): Tile[] {
  let numPairs;
  switch (difficulty) {
    case 'easy':
      numPairs = 4;
      break;
    case 'medium':
      numPairs = 6;
      break;
    case 'hard':
      numPairs = 8;
      break;
    default:
      numPairs = 4;
  }

  const selectedImages = IMAGES.slice(0, numPairs);
  const tilePairs = selectedImages.flatMap((image, index) => [
    { id: index * 2, image, revealed: false },
    { id: index * 2 + 1, image, revealed: false },
  ]);

  return shuffleArray(tilePairs);
}

function checkTilesMatch(tiles: Tile[], revealedTiles: number[]): boolean {
  const [firstTile, secondTile] = revealedTiles.map((tileId) => 
    tiles.find((tile) => tile.id === tileId)!
  );
  return firstTile.image === secondTile.image;
}

export const useGameStore = create<GameState>((set) => ({
  tiles: [],
  revealedTiles: [],
  matchedPairs: 0,
  attempts: 0,
  startTime: null,
  difficulty: 'easy',
  gameFinished: false,
  gameHistory: JSON.parse(localStorage.getItem('gameHistory') || '[]'),
  nickname: '',

  setNickname: (nickname) => set(() => ({ nickname })),

  revealTile: (id) => set((state) => {
    if (state.revealedTiles.length >= 2) {
      return {}; // Ignoruj kliknięcia, jeśli już dwa kafelki są odkryte
    }

    const newRevealedTiles = [...state.revealedTiles, id];
    let newTiles = [...state.tiles];

    if (newRevealedTiles.length === 2) {
      const match = checkTilesMatch(newTiles, newRevealedTiles);

      if (match) {
        newTiles = newTiles.map((tile) =>
          newRevealedTiles.includes(tile.id) ? { ...tile, revealed: true } : tile
        );

        const gameFinished = state.matchedPairs + 1 === newTiles.length / 2;

        if (gameFinished) {
          setTimeout(() => {
            set((state) => {
              state.saveGameHistory(); // Wywołanie `saveGameHistory` po zakończeniu gry
              return {};
            });
          }, 100);
        }

        return {
          tiles: newTiles,
          revealedTiles: [],
          matchedPairs: state.matchedPairs + 1,
          attempts: state.attempts + 1,
          gameFinished,
        };
      } else {
        setTimeout(() => {
          set((state) => ({
            tiles: state.tiles.map((tile) =>
              newRevealedTiles.includes(tile.id) ? { ...tile, revealed: false } : tile
            ),
            revealedTiles: [],
          }));
        }, 1000);
      }
    }

    newTiles = newTiles.map((tile) =>
      tile.id === id ? { ...tile, revealed: true } : tile
    );

    return {
      tiles: newTiles,
      revealedTiles: newRevealedTiles,
      attempts: state.attempts + 1,
    };
  }),

  setDifficulty: (difficulty) => set(() => ({ difficulty })),

  resetGame: () => set((state) => ({
    tiles: generateTiles(state.difficulty),
    revealedTiles: [],
    matchedPairs: 0,
    attempts: 0,
    startTime: Date.now(),
    gameFinished: false,
  })),

  saveGameHistory: () => set((state) => {
    if (state.gameFinished && state.startTime) {
      const duration = Math.floor((Date.now() - state.startTime) / 1000);
      const newHistoryEntry: GameHistory = {
        attempts: state.attempts,
        duration: duration,
        date: new Date().toLocaleString(),
        nickname: state.nickname || 'Unknown Player',
        difficulty: state.difficulty,
      };
      const updatedHistory = [...state.gameHistory, newHistoryEntry];
      localStorage.setItem('gameHistory', JSON.stringify(updatedHistory));
      console.log('Saving game history:', newHistoryEntry); // Log do debugowania
      return { gameHistory: updatedHistory };
    }
    return {};
  }),

  loadGameHistory: () => set(() => {
    const history = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    console.log('Loading game history:', history); // Log do debugowania
    return {
      gameHistory: history,
    };
  }),
}));