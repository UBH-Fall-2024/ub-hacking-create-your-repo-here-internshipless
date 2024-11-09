import { useCallback } from 'react';
import { useGameDispatch } from '../context/GameContext';
import { ACTIONS } from '../context/GameContext';
import { scenes } from '../data/scenes';
import { items } from '../data/items';

export function useGameActions() {
  const dispatch = useGameDispatch();

  const startGame = useCallback(() => {
    dispatch({ type: ACTIONS.START_GAME });
  }, [dispatch]);

  const changeScene = useCallback((sceneId) => {
    if (!scenes[sceneId]) {
      console.error(`Scene ${sceneId} not found`);
      return;
    }
    
    dispatch({ 
      type: ACTIONS.CHANGE_SCENE, 
      payload: { sceneId } 
    });
  }, [dispatch]);

  const addItem = useCallback((itemId) => {
    if (!items[itemId]) {
      console.error(`Item ${itemId} not found`);
      return;
    }

    dispatch({
      type: ACTIONS.ADD_ITEM,
      payload: { itemId }
    });
  }, [dispatch]);

  const updateHealth = useCallback((amount) => {
    dispatch({
      type: ACTIONS.UPDATE_HEALTH,
      payload: { amount }
    });
  }, [dispatch]);

  return {
    startGame,
    changeScene,
    addItem,
    updateHealth
  };
}