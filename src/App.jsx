import React from 'react';
import './styles/global.css';
import { GameProvider } from './context/GameContext';
import GameContainer from './components/game/GameContainer';

function App() {
  return (
    <GameProvider>
      <div className="h-screen w-screen bg-gradient-to-b from-wonderland-background to-purple-100 
                      flex items-center justify-center overflow-hidden fixed inset-0">
        <GameContainer />
      </div>
    </GameProvider>
  );
}

export default App;