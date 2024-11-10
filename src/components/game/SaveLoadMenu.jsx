import React, { useState } from 'react';
import { useGameState } from '../../context/GameContext';
import { useGameActions } from '../../hooks/useGameActions';
import { saveManager } from '../../utils/saveManager';
import { Button } from '../ui/Button';
import { Save, Download, Trash2, X } from 'lucide-react';

function SaveLoadMenu({ onClose }) {
  const gameState = useGameState();
  const { loadGameState } = useGameActions();
  const [saves, setSaves] = useState(saveManager.getAllSaves());

  const handleLoad = (save) => {
    try {
      if (save && save.gameState) {
        loadGameState(save.gameState);
        onClose();
      }
    } catch (error) {
      console.error('Failed to load save:', error);
    }
  };

  const handleDelete = (slotId) => {
    saveManager.deleteSave(slotId);
    setSaves(saveManager.getAllSaves());
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50
                    flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-800">
            Save / Load Game
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="hover:bg-purple-50"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <Button
          onClick={() => {
            const slotId = `save_${Date.now()}`;
            saveManager.saveGame(gameState, slotId);
            setSaves(saveManager.getAllSaves());
          }}
          className="w-full mb-6 bg-purple-600 hover:bg-purple-700"
        >
          <Save className="mr-2 h-5 w-5" />
          Create New Save
        </Button>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {saves.map((save) => (
            <div
              key={save.slotId}
              className="bg-purple-50 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <div className="font-medium text-purple-800">
                  Scene: {save.gameState.gameProgress.currentScene}
                </div>
                <div className="text-sm text-purple-600">
                  {new Date(save.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleLoad(save)}
                  variant="outline"
                  className="hover:bg-purple-100 transition-colors px-4 py-2"
                  title="Load Save"
                >
                  <Download className="h-5 w-5" />
                </Button>
                <Button
                  onClick={() => handleDelete(save.slotId)}
                  variant="outline"
                  className="hover:bg-red-100 text-red-500 hover:text-red-600 
                           border-red-200 px-4 py-2"
                  title="Delete Save"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
          {saves.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No saves found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SaveLoadMenu;