import React from 'react';
import { useGameState } from '../../context/GameContext';
import { Heart } from 'lucide-react';

function StatusBar() {
  const { player } = useGameState();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4
                    flex items-center justify-between">
      {/* Health */}
      <div className="flex items-center gap-2">
        <Heart className={`w-6 h-6 ${player.health > 50 ? 'text-red-500' : 'text-red-300'}`} />
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${player.health}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-700">
          {player.health}/100
        </span>
      </div>

      {/* Inventory count */}
      <div className="text-sm font-medium text-gray-700">
        Items: {player.inventory.length}
      </div>
    </div>
  );
}

export default StatusBar;