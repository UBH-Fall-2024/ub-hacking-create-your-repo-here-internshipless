import React from 'react';
import { useGameActions } from '../../hooks/useGameActions';
import { Button } from '../ui/Button';
import { RotateCcw, Home } from 'lucide-react';

function DeathScreen() {
  const { startGame } = useGameActions();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50
                    flex items-center justify-center animate-fade-in">
      <div className="max-w-md w-full p-8 bg-white/10 backdrop-blur-md rounded-lg
                      shadow-2xl text-center animate-death-screen">
        <h2 className="text-6xl font-bold text-red-500 mb-4 animate-pulse">
          Game Over
        </h2>
        
        <p className="text-xl text-white/90 mb-8 leading-relaxed">
          Your journey in Wonderland has come to an end...
        </p>
        
        <div className="space-y-4">
          <Button
            onClick={() => startGame()}
            className="w-full h-14 bg-red-500 hover:bg-red-600
                      transition-all duration-300 group"
          >
            <RotateCcw className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </Button>
          
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="w-full h-14 border-white/50 text-white
                      hover:bg-white/10 transition-all duration-300"
          >
            <Home className="mr-2 h-5 w-5" />
            Return to Title
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeathScreen;