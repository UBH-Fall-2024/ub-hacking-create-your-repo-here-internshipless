import React, { useState } from 'react';
import { useGameState } from '../../context/GameContext';
import { useGameActions } from '../../hooks/useGameActions';
import { items } from '../../data/items';
import { Package, X } from 'lucide-react';
import { Button } from '../ui/Button';

const EffectToast = ({ message, onClose }) => (
    <div className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 
                    rounded-lg shadow-lg animate-fade-in flex items-center gap-2">
      <span>{message}</span>
      <button onClick={onClose} className="hover:opacity-80">
        <X size={16} />
      </button>
    </div>
  );

function InventoryBar({ onClose }) {
  const { player } = useGameState();
  const { useItem } = useGameActions();
  const [selectedItem, setSelectedItem] = useState(null);
  const [effectMessage, setEffectMessage] = useState(null);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId === selectedItem ? null : itemId);
  };

  const handleUseItem = (itemId) => {
    const item = items[itemId];
    if (!item) return;

    useItem(itemId);

    // display effect message
    let message = `Used ${item.name}`;
    if (item.effects?.health) {
      message += ` (Health ${item.effects.health > 0 ? '+' : ''}${item.effects.health})`;
    }
    setEffectMessage(message);

    // close item details
    setSelectedItem(null);
    setTimeout(() => setEffectMessage(null), 3000);
  };

  const inventoryItems = Object.keys(player.inventory).map(itemId => ({
    id: itemId,
    amount: player.inventory[itemId],
    ...items[itemId]
  }));
  

  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50
                    flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6">
        {/* 替换原来的 Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-medium text-purple-800">
              Inventory ({inventoryItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

      {/* Inventory Grid */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4">
        {player.inventory.length === 0 ? (
          <div className="text-center text-gray-500 py-2">
            No items collected yet
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {inventoryItems.map((item) => {
                const isSelected = selectedItem === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative p-4 rounded-lg cursor-pointer
                             transition-all duration-300 
                             ${isSelected 
                               ? 'bg-purple-100 ring-2 ring-purple-500' 
                               : 'bg-purple-50 hover:bg-purple-100'
                             }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{item.icon || '📦'}</div>
                    <div className="text-sm font-medium text-purple-800">
                      {item.name}
                    </div>
                  </div>
                {/* Stacked items */}
                {item.amount > 1 && (
                      <div className="absolute top-1 right-1 bg-purple-600 
                                    text-white text-xs rounded-full w-5 h-5 
                                    flex items-center justify-center">
                        {item.amount}
                      </div>
                    )}
                  {/* Item Details */}
                  {isSelected && (
                    <div className="absolute left-0 top-full mt-2 p-4 
                                  bg-white rounded-lg shadow-xl z-10
                                  w-64 text-sm">
                      <h4 className="font-bold text-purple-800 mb-2">
                        {item.name}
                      </h4>
                      <p className="text-gray-600 mb-4">
                        {item.description}
                      </p>
                      {/* Effects info */}
                      {item.effects && (
                        <div className="mb-4 text-sm">
                          <div className="font-medium text-purple-700">Effects:</div>
                          <ul className="list-disc list-inside text-gray-600">
                            {item.effects.health && (
                              <li>Health: {item.effects.health > 0 ? '+' : ''}{item.effects.health}</li>
                            )}
                            {item.effects.skills && (
                              <li>Skills: {item.effects.skills.join(', ')}</li>
                            )}
                          </ul>
                        </div>
                      )}
                      {/* Action buttons */}
                      <div className="flex gap-2">
                        {item.usable && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUseItem(item.id);
                            }}
                            className="flex-1 bg-purple-600 hover:bg-purple-700"
                          >
                            Use
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Effect Toast */}
      {effectMessage && (
        <EffectToast 
          message={effectMessage} 
          onClose={() => setEffectMessage(null)} 
        />
      )}
      </div>
    </div>
  );
}

export default InventoryBar;