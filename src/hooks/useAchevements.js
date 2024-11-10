import { useCallback } from 'react';
import { useGameDispatch } from '../context/GameContext';
import { ACTIONS } from '../context/GameContext';
import { achievements } from '../data/achievements';

export function useAchievements() {
  const dispatch = useGameDispatch();

  const unlockAchievement = useCallback((achievementId) => {
    dispatch({
      type: ACTIONS.UNLOCK_ACHIEVEMENT,
      payload: { achievementId }
    });
  }, [dispatch]);

  const checkAchievements = useCallback((inventory, visitedScenes, usedItems, unlockedAchievements) => {
    Object.values(achievements).forEach(achievement => {
      if (unlockedAchievements.includes(achievement.id)) return;

      let isComplete = false;
      if (achievement.requirements) {
        switch (true) {
          case !!achievement.requirements.scene:
            isComplete = visitedScenes.includes(achievement.requirements.scene);
            break;

          case achievement.requirements.type === 'count' && !!achievement.requirements.items:
            const totalItems = Object.values(inventory)
              .reduce((sum, amount) => sum + amount, 0);
            isComplete = totalItems >= achievement.requirements.items;
            break;

          case achievement.requirements.type === 'count' && !!achievement.requirements.scenes:
            isComplete = visitedScenes.length >= achievement.requirements.scenes;
            break;

          case !!achievement.requirements.item && achievement.requirements.action === 'use':
            isComplete = usedItems?.includes(achievement.requirements.item);
            break;
        }
      }

      if (isComplete) {
        unlockAchievement(achievement.id);
      }
    });
  }, [unlockAchievement]);

  return {
    unlockAchievement,
    checkAchievements,
  };
}