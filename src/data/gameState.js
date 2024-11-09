// Game state interface and initial state
export const initialGameState = {
    player: {
      health: 100,
      inventory: [],
      skills: [],
      achievements: []
    },
    
    gameProgress: {
      currentScene: 'rabbit_hole',
      visitedScenes: [],
      unlockedAchievements: [],
      timeElapsed: 0
    },
    
    statistics: {
      choicesMade: 0,
      itemsCollected: 0,
      healthLost: 0
    }
  }
  
  // Game state types
  export const GAME_ACTIONS = {
    MOVE_TO_SCENE: 'MOVE_TO_SCENE',
    COLLECT_ITEM: 'COLLECT_ITEM',
    USE_ITEM: 'USE_ITEM',
    UPDATE_HEALTH: 'UPDATE_HEALTH',
    UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
    LEARN_SKILL: 'LEARN_SKILL'
  }