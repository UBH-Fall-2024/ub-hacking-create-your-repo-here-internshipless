import React from 'react';
import { useGameState } from '../../context/GameContext';
import { useGameActions } from '../../hooks/useGameActions';
import { Button } from '../ui/Button';
import { Clock, Heart, Book } from 'lucide-react';

function GameContainer() {
  const gameState = useGameState();
  const { startGame } = useGameActions();

  const handleStartGame = () => {
    startGame();
  };

  // If game hasn't started, show title screen
  if (!gameState.gameProgress.startTime) {
    return (
      <div className="w-full max-w-xl px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-wonderland-primary 
                         mb-6 animate-fade-in drop-shadow-lg">
            Alice's Wonderland
          </h1>
          <p className="text-lg text-purple-700 animate-fade-in delay-200
                        mb-12 leading-relaxed max-w-md mx-auto">
            Embark on a magical journey and explore unknown adventures in this
            mysterious wonderland
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
          <Button 
            onClick={handleStartGame}
            className="w-full h-14 text-lg bg-violet-500 hover:bg-violet-600
                       transition-all duration-300 animate-fade-in delay-300
                       shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Clock className="mr-2 h-5 w-5" />
            Start Adventure
          </Button>
          
          {/* Other buttons... */}
        </div>
      </div>
    );
  }

  // Game has started, show current scene
  return (
    <div>
      {/* Game content will be implemented next */}
    </div>
  );
}

export default GameContainer;