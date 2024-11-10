import React, { createContext, useContext, useReducer } from 'react';
import { initialGameState } from '../data/gameState';
import { items } from '../data/items';

// Create context
const GameContext = createContext(null);
const GameDispatchContext = createContext(null);

// Action types
export const ACTIONS = {
  START_GAME: 'START_GAME',
  CHANGE_SCENE: 'CHANGE_SCENE',
  ADD_ITEM: 'ADD_ITEM',
  USE_ITEM: 'USE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_HEALTH: 'UPDATE_HEALTH',
  ADD_SKILL: 'ADD_SKILL',
  LOAD_GAME_STATE: 'LOAD_GAME_STATE',
  UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
  ADD_GOLD: 'ADD_GOLD',
  SPEND_GOLD: 'SPEND_GOLD',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_EFFECT: 'SET_EFFECT'
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

      case ACTIONS.ADD_ITEM: {
        const item = items[action.payload.itemId];
        const currentInventory = { ...state.player.inventory };
        
        if (item.stackable) {
          const currentAmount = currentInventory[action.payload.itemId] || 0;
          const newAmount = Math.min(
            currentAmount + (action.payload.amount || 1),
            item.maxStack
          );
          currentInventory[action.payload.itemId] = newAmount;
        } else {
          currentInventory[action.payload.itemId] = 1;
        }
  
        return {
          ...state,
          player: {
            ...state.player,
            inventory: currentInventory
          }
        };
      }

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

      case ACTIONS.USE_ITEM: {
        const item = items[action.payload.itemId];
        if (!item) return state;
  
        // apply item effects
        const newState = { ...state };
        const currentInventory = { ...state.player.inventory };
        
        if (item.effects) {
          // Health effects
          if (item.effects.health) {
            newState.player.health = Math.min(
              100,
              Math.max(0, state.player.health + item.effects.health)
            );
          }
          
          // Skill effects
          if (item.effects.skills) {
            newState.player.skills = [
              ...new Set([...state.player.skills, ...item.effects.skills])
            ];
          }
        }
  
        // If consumable, remove from inventory
        if (item.consumable) {
          if(currentInventory[action.payload.itemId] > 1) {
            currentInventory[action.payload.itemId] -= 1;
          } else {
            delete currentInventory[action.payload.itemId];
          }
        }
  
        newState.player.inventory = currentInventory;
        return newState;
      }
  
      case ACTIONS.REMOVE_ITEM:
        return {
          ...state,
          player: {
            ...state.player,
            inventory: state.player.inventory.filter(
              id => id !== action.payload.itemId
            )
          }
        };

        case ACTIONS.UNLOCK_ACHIEVEMENT: {
          if (state.gameProgress.unlockedAchievements.includes(action.payload.achievementId)) {
            return state;
          }
          
          return {
            ...state,
            gameProgress: {
              ...state.gameProgress,
              unlockedAchievements: [
                ...state.gameProgress.unlockedAchievements,
                action.payload.achievementId
              ]
            }
          };
        }

        case ACTIONS.ADD_GOLD:
          return {
            ...state,
            player: {
              ...state.player,
              gold: state.player.gold + action.payload.amount
            }
          };
    
        case ACTIONS.SPEND_GOLD:
          if (state.player.gold < action.payload.amount) {
            return state; // 金币不足
          }
          return {
            ...state,
            player: {
              ...state.player,
              gold: state.player.gold - action.payload.amount
            }
          };

        case ACTIONS.ADD_NOTIFICATION:
          return {
            ...state,
            notifications: [...state.notifications, action.payload]
          };

        case ACTIONS.REMOVE_NOTIFICATION:
          return {
            ...state,
              notifications: state.notifications.filter(
                notification => notification.id !== action.payload.id
              )
          };

          case ACTIONS.SET_EFFECT:
            return {
              ...state,
              player: {
                ...state.player,
                effects: {
                  ...state.player.effects,
                  [action.payload.effectName]: {
                    type: action.payload.effectType,
                    endTime: action.payload.endTime
                  }
                }
              }
            };
        
    default:
      return state;
  }
}

// Provider component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const getState = () => state;

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