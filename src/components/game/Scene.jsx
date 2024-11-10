import React, { useEffect } from 'react';
import { useGameState } from '../../context/GameContext';
import { useGameActions } from '../../hooks/useGameActions';
import { scenes } from '../../data/scenes';
import { Button } from '../ui/Button';
import { saveManager } from '../../utils/saveManager';

function Scene() {
  const gameState = useGameState();
  const { changeScene, updateHealth, addItem } = useGameActions();

  // Get current scene data
  const currentScene = scenes.find(
    scene => scene.id === gameState.gameProgress.currentScene
  );

  // auto-save
  useEffect(() => {
    saveManager.autoSave(gameState);
  }, [gameState]);

  // Handle player choice
  const handleChoice = (choice) => {
    // Apply effects
    if (choice.effect) {
      if (choice.effect.health) {
        updateHealth(choice.effect.health);
      }
      if (choice.effect.items) {
        choice.effect.items.forEach(itemId => addItem(itemId));
      }
    }
    // Change to next scene
    changeScene(choice.nextScene);
  };

  if (!currentScene) return null;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8 animate-fade-in">
      {/* Scene Title */}
      <h2 className="text-3xl font-bold text-wonderland-primary mb-4">
        {currentScene.title}
      </h2>
      
      {/* Scene Description */}
      <p className="text-lg text-purple-800 leading-relaxed mb-8">
        {currentScene.description}
      </p>

      {/* Choices */}
      <div className="space-y-4">
        {currentScene.choices.map((choice, index) => {
          const isDisabled = choice.requirements && !meetsRequirements(choice.requirements, gameState);
          
          return (
            <Button
              key={index}
              onClick={() => handleChoice(choice)}
              disabled={isDisabled}
              className={`w-full text-left p-4 transition-all duration-300
                         flex items-center justify-between group
                         ${isDisabled 
                           ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                           : 'bg-purple-50 hover:bg-purple-100 text-purple-800 hover:translate-x-1'
                         }`}
            >
              <span>{choice.text}</span>
              {!isDisabled && (
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

// Helper function to check if player meets choice requirements
function meetsRequirements(requirements, gameState) {
  if (!requirements) return true;
  
  if (requirements.health && gameState.player.health < requirements.health) {
    return false;
  }
  
  if (requirements.items) {
    const hasAllItems = requirements.items.every(
      itemId => gameState.player.inventory.includes(itemId)
    );
    if (!hasAllItems) return false;
  }
  
  return true;
}

export default Scene;