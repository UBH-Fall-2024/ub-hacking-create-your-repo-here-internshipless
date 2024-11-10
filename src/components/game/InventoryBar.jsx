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

function InventoryBar() {
  const { player } = useGameState();
  const { useItem, removeItem } = useGameActions();
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

  return (
    <div className="mt-4">
      {/* Inventory Header */}
      <div className="flex items-center gap-2 mb-2">
        <Package className="w-5 h-5 text-purple-500" />
        <h3 className="text-lg font-medium text-purple-800">
          Inventory ({player.inventory.length})
        </h3>
      </div>

      {/* Inventory Grid */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4">
        {player.inventory.length === 0 ? (
          <div className="text-center text-gray-500 py-2">
            No items collected yet
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {player.inventory.map(itemId => {
              const item = items[itemId];
              const isSelected = selectedItem === itemId;

              return (
                <div
                  key={itemId}
                  onClick={() => handleItemClick(itemId)}
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
                              handleUseItem(itemId);
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
  );
}

export default InventoryBar;