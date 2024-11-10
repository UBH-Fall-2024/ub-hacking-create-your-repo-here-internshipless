import React, { createContext, useContext, useReducer } from 'react';
import { initialGameState } from '../data/gameState';

// Create context
const GameContext = createContext(null);
const GameDispatchContext = createContext(null);

// Action types
export const ACTIONS = {
  START_GAME: 'START_GAME',
  CHANGE_SCENE: 'CHANGE_SCENE',
  ADD_ITEM: 'ADD_ITEM',
  USE_ITEM: 'USE_ITEM',
  UPDATE_HEALTH: 'UPDATE_HEALTH',
  UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
  ADD_SKILL: 'ADD_SKILL',
  LOAD_GAME_STATE: 'LOAD_GAME_STATE'
};

// Game reducer
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_GAME:
      return {
        ...initialGameState,
        gameProgress: {
          ...initialGameState.gameProgress,
          startTime: Date.now()
        }
      };

    case ACTIONS.CHANGE_SCENE:
      return {
        ...state,
        gameProgress: {
          ...state.gameProgress,
          currentScene: action.payload.sceneId,
          visitedScenes: [...state.gameProgress.visitedScenes, action.payload.sceneId]
        },
        statistics: {
          ...state.statistics,
          choicesMade: state.statistics.choicesMade + 1
        }
      };

    case ACTIONS.ADD_ITEM:
      return {
        ...state,
        player: {
          ...state.player,
          inventory: [...state.player.inventory, action.payload.itemId]
        },
        statistics: {
          ...state.statistics,
          itemsCollected: state.statistics.itemsCollected + 1
        }
      };

    case ACTIONS.USE_ITEM:
      return {
        ...state,
        player: {
          ...state.player,
          inventory: state.player.inventory.filter(id => id !== action.payload.itemId)
        }
      };

    case ACTIONS.UPDATE_HEALTH:
      const newHealth = Math.max(0, Math.min(100, state.player.health + action.payload.amount));
      return {
        ...state,
        player: {
          ...state.player,
          health: newHealth
        },
        statistics: {
          ...state.statistics,
          healthLost: action.payload.amount < 0 
            ? state.statistics.healthLost - action.payload.amount 
            : state.statistics.healthLost
        }
      };

      case ACTIONS.LOAD_GAME_STATE:
      return {
        ...action.payload.gameState,
        gameProgress: {
          ...action.payload.gameState.gameProgress,
          lastLoaded: Date.now()
        }
      };
    default:
      return state;
  }
}

// Provider component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

// Custom hooks for using game state and dispatch
export function useGameState() {
  const context = useContext(GameContext);
  if (context === null) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}

export function useGameDispatch() {
  const context = useContext(GameDispatchContext);
  if (context === null) {
    throw new Error('useGameDispatch must be used within a GameProvider');
  }
  return context;
}