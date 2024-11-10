import React from 'react';
import { useGameState } from '../../context/GameContext';
import { achievements } from '../../data/achievements';
import { Check } from 'lucide-react';

function AchievementsPanel({ onClose }) {
  const { gameProgress, player } = useGameState();
  const achievementsList = Object.values(achievements);

  // 检查成就是否完成
  const isAchievementComplete = (achievement) => {
    if (!achievement.requirements) return false;

    switch (true) {
      // 场景相关成就
      case !!achievement.requirements.scene:
        return gameProgress.visitedScenes.includes(achievement.requirements.scene);
      
      // 物品数量成就
      case achievement.requirements.type === 'count' && !!achievement.requirements.items:
        return Object.values(player.inventory).reduce((sum, amount) => sum + amount, 0) >= 
               achievement.requirements.items;
      
      // 场景数量成就
      case achievement.requirements.type === 'count' && !!achievement.requirements.scenes:
        return gameProgress.visitedScenes.length >= achievement.requirements.scenes;
      
      // 使用物品成就
      case !!achievement.requirements.item && achievement.requirements.action === 'use':
        return gameProgress.usedItems?.includes(achievement.requirements.item);
      
      default:
        return false;
    }
  };

  // 获取成就进度
  const getAchievementProgress = (achievement) => {
    if (!achievement.requirements) return null;

    switch (true) {
      case achievement.requirements.type === 'count' && !!achievement.requirements.items:
        const totalItems = Object.values(player.inventory).reduce((sum, amount) => sum + amount, 0);
        return `${totalItems}/${achievement.requirements.items}`;
      
      case achievement.requirements.type === 'count' && !!achievement.requirements.scenes:
        return `${gameProgress.visitedScenes.length}/${achievement.requirements.scenes}`;
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50
                    flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-800">
            Achievements
            <span className="ml-2 text-lg text-purple-600">
              ({gameProgress.unlockedAchievements.length}/{achievementsList.length})
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Achievements Grid */}
        <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {achievementsList.map((achievement) => {
            const isUnlocked = isAchievementComplete(achievement);
            const progress = getAchievementProgress(achievement);
            
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all
                          ${isUnlocked 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 bg-gray-50'
                          }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon and Check */}
                  <div className="relative">
                    <span className="text-2xl">{achievement.icon}</span>
                    {isUnlocked && (
                      <div className="absolute -top-2 -right-2 bg-green-500 
                                    rounded-full p-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Achievement Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-bold ${
                        isUnlocked ? 'text-purple-800' : 'text-gray-600'
                      }`}>
                        {achievement.name}
                      </h3>
                      {progress && (
                        <span className="text-sm text-gray-500">
                          {progress}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${
                      isUnlocked ? 'text-purple-600' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AchievementsPanel;