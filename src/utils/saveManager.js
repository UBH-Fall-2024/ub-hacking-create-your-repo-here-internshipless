// Save/Load game data utilities
const SAVE_KEY = 'wonderland_save';
const AUTO_SAVE_KEY = 'wonderland_auto_save';

export const saveManager = {
    saveGame: (gameState, slotId = 'main') => {
      try {
        const saveData = {
          gameState: {
            ...gameState,
            gameProgress: {
              ...gameState.gameProgress,
              savedAt: Date.now()
            }
          },
          timestamp: Date.now(),
          slotId
        };
        localStorage.setItem(`${SAVE_KEY}_${slotId}`, JSON.stringify(saveData));
        return true;
      } catch (error) {
        console.error('Save failed:', error);
        return false;
      }
    },

  // Load game state
  loadGame: (slotId = 'main') => {
    try {
      const saveData = localStorage.getItem(`${SAVE_KEY}_${slotId}`);
      if (!saveData) return null;
      return JSON.parse(saveData);
    } catch (error) {
      console.error('Load failed:', error);
      return null;
    }
  },

  // Auto save
  autoSave: (gameState) => {
    try {
      const saveData = {
        gameState,
        timestamp: Date.now(),
        version: '1.0.0'
      };
      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(saveData));
    } catch (error) {
      console.error('Auto save failed:', error);
    }
  },

  // Load auto save
  loadAutoSave: () => {
    try {
      const saveData = localStorage.getItem(AUTO_SAVE_KEY);
      if (!saveData) return null;
      return JSON.parse(saveData);
    } catch (error) {
      console.error('Load auto save failed:', error);
      return null;
    }
  },

  // Get all save slots
  getAllSaves: () => {
    try {
      const saves = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(SAVE_KEY)) {
          const save = JSON.parse(localStorage.getItem(key));
          saves.push(save);
        }
      }
      return saves.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Get saves failed:', error);
      return [];
    }
  },

  // Delete save
  deleteSave: (slotId) => {
    try {
      localStorage.removeItem(`${SAVE_KEY}_${slotId}`);
      return true;
    } catch (error) {
      console.error('Delete save failed:', error);
      return false;
    }
  }
};