import React, { useState } from 'react';
import { useGameState } from '../../context/GameContext';
import { items } from '../../data/items';
import { Package } from 'lucide-react';

function InventoryBar() {
  const { player } = useGameState();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId === selectedItem ? null : itemId);
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

                  {/* Item Details (shown when selected) */}
                  {isSelected && (
                    <div className="absolute left-0 top-full mt-2 p-4 
                                  bg-white rounded-lg shadow-xl z-10
                                  w-48 text-sm">
                      <h4 className="font-bold text-purple-800 mb-2">
                        {item.name}
                      </h4>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                      {item.usable && (
                        <div className="mt-2 text-purple-600 text-xs">
                          Click to use
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryBar;