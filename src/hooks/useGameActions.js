import { useCallback } from 'react';
import { useGameDispatch } from '../context/GameContext';
import { ACTIONS } from '../context/GameContext';
import { scenes } from '../data/scenes';
import { items } from '../data/items';

export function useGameActions() {
  const dispatch = useGameDispatch();

  const startGame = useCallback(() => {
    dispatch({ type: ACTIONS.START_GAME });
    dispatch({ type: ACTIONS.CHANGE_SCENE, payload: { sceneId: 'rabbit_hole' } });
  }, [dispatch]);

  const changeScene = useCallback((sceneId) => {
    const targetScene = scenes.find(scene => scene.id === sceneId);
    if (!targetScene) {
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
    addNotification(itemId);
  }, [dispatch]);

  const updateHealth = useCallback((amount) => {
    dispatch({
      type: ACTIONS.UPDATE_HEALTH,
      payload: { amount }
    });
  }, [dispatch]);

  const localGameState = useCallback((savedState) => {
    dispatch({
      type: ACTIONS.LOAD_GAME_STATE,
      payload: { gameState:savedState }
    });
  }, [dispatch]);

  const useItem = useCallback((itemId) => {
    dispatch({
      type: ACTIONS.USE_ITEM,
      payload: { itemId }
    });
  }, [dispatch]);

  const removeItem = useCallback((itemId) => {
    dispatch({
      type: ACTIONS.REMOVE_ITEM,
      payload: { itemId }
    });
  }, [dispatch]);

  const unlockAchievement = useCallback((achievementId) => {
    dispatch({
      type: ACTIONS.UNLOCK_ACHIEVEMENT,
      payload: { achievementId }
    });
  }, [dispatch]);

  const addGold = useCallback((amount) => {
    dispatch({
      type: ACTIONS.ADD_GOLD,
      payload: { amount }
    });
  }, [dispatch]);

  const spendGold = useCallback((amount) => {
    dispatch({
      type: ACTIONS.SPEND_GOLD,
      payload: { amount }
    });
  }, [dispatch]);

  const addNotification = useCallback((itemId) => {
    const notificationId = Date.now() + Math.random();
    console.log('addNotification', notificationId);
    dispatch({
      type: ACTIONS.ADD_NOTIFICATION,
      payload: { id: notificationId, itemId }
    });

    setTimeout(() => {
      dispatch({
        type: ACTIONS.REMOVE_NOTIFICATION,
        payload: { id: notificationId }
      });
    },3000);
  }, [dispatch]);

  const removeNotification = useCallback((id) => {
    console.log('Dispatching remove notification for id:', id);
    dispatch({
      type: ACTIONS.REMOVE_NOTIFICATION,
      payload: { id }
    });
  }, [dispatch]);

  const loadGameState = useCallback((savedState) => {
    dispatch({
      type: ACTIONS.LOAD_GAME_STATE,
      payload: { gameState: savedState }
    });
  }, [dispatch]);

  return {
    startGame,
    changeScene,
    addItem,
    updateHealth,
    localGameState,
    useItem,
    removeItem,
    unlockAchievement,
    addGold,
    spendGold,
    addNotification,
    removeNotification,
    loadGameState,
  };
}