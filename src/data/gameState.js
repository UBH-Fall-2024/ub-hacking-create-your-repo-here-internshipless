// Game state interface and initial state
export const initialGameState = {
    player: {
      health: 100,
      inventory: [],
      skills: [],
      achievements: [],
      gold: 0,
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
    },
    notifications: []
  }
  