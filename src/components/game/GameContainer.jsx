import React, { useEffect } from 'react';
import { useGameState } from '../../context/GameContext';
import { useGameActions } from '../../hooks/useGameActions';
import { Button } from '../ui/Button';
import { Clock, Heart, Book, Save, Home } from 'lucide-react';
import Scene from './Scene';
import StatusBar from './StatusBar';
import DeathScreen from './DeathScreen';
import { useState } from 'react';
import SaveLoadMenu from './SaveLoadMenu';
import { saveManager } from '../../utils/saveManager';
import InventoryBar from './InventoryBar';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50
                  flex items-center justify-center animate-fade-in">
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4">
      <h3 className="text-xl font-bold text-red-600 mb-4">Warning!</h3>
      <p className="text-lg text-gray-700 mb-6">
        {message}
      </p>
      <div className="flex gap-4 justify-end">
        <Button
          onClick={onCancel}
          variant="outline"
          className="border-gray-200 hover:bg-gray-50 px-6"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          className="bg-red-500 hover:bg-red-600 px-6"
        >
          Exit
        </Button>
      </div>
    </div>
  </div>
);

function GameContainer() {
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const gameState = useGameState();
  const { startGame } = useGameActions();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleSaveAndExit = () => {
    setShowSaveMenu(true);
  };
  const handleExitClick = () => {
    setShowExitConfirm(true);
  };
  const confirmExit = () => {
    const saveSuccess = saveManager.saveGame(gameState, 'exit_save');
    if (saveSuccess) {
      window.location.reload();
    }else {
      window.location.reload();
    }
  };

  // 检查玩家是否死亡
  const isDead = gameState.player.health <= 0;

  // 如果游戏未开始，显示标题界面
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
            onClick={startGame}
            className="w-full h-14 text-lg bg-violet-500 hover:bg-violet-600
                       transition-all duration-300 animate-fade-in delay-300
                       shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Clock className="mr-2 h-5 w-5" />
            Start Adventure
          </Button>
          {/* Save/Load button */}
          <Button
            onClick={() => setShowSaveMenu(true)}
            className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700"
          >
            <Save className="h-5 w-5" />
          </Button>

          {/* Save/Load menu */}
          {showSaveMenu && (
            <SaveLoadMenu onClose={() => setShowSaveMenu(false)} />
          )}
          
          {/* Other buttons... */}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl p-4 relative">
      {isDead && <DeathScreen />}
      
      {showSaveMenu && (
        <SaveLoadMenu onClose={() => setShowSaveMenu(false)} />
      )}

      {/* exit confirm */}
      {showExitConfirm && (
        <ConfirmDialog
          message="Are you sure you want to exit? Your progress will be automatically saved."
          onConfirm={confirmExit}
          onCancel={() => setShowExitConfirm(false)}
        />
      )}

      <div className={`transition-all duration-500 
                    ${isDead ? 'opacity-50 pointer-events-none blur-sm' : ''}`}>
        <div className="flex justify-end gap-2 mb-4">
          <Button
            onClick={() => setShowSaveMenu(true)}
            className="bg-purple-600 hover:bg-purple-700 transition-all
                      shadow-lg hover:shadow-xl"
            title="Save/Load Game"
          >
            <Save className="h-5 w-5" />
          </Button>

          <Button
            onClick={handleExitClick}
            className="bg-red-500 hover:bg-red-600 transition-all
                      shadow-lg hover:shadow-xl"
            title="Save & Exit"
          >
            <Home className="h-5 w-5" />
          </Button>
        </div>

        <StatusBar />
        <div className="mt-4">
          <Scene />
        </div>
        <InventoryBar />
      </div>
    </div>
  );
}

export default GameContainer;