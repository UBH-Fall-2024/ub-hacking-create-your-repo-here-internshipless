import React from 'react';
import { useGameState } from '../../context/GameContext';
import { useGameActions } from '../../hooks/useGameActions';
import { Coins } from 'lucide-react';
import { Button } from '../ui/Button';

const SHOP_ITEMS = [
  {
    id: 'health_potion',
    name: 'Health Potion',
    description: 'Restores 30 HP',
    price: 2,
    icon: '🧪'
  },
  // ...more items
];

function Shop({ onClose }) {
  const { player } = useGameState();
  const { addItem, spendGold } = useGameActions();

  const handlePurchase = (item) => {
    if (player.gold >= item.price) {
      spendGold(item.price);
      addItem(item.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50
                    flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-800">
            Shop
          </h2>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-medium text-yellow-600">
              {player.gold} Gold
            </span>
          </div>
        </div>

        {/* Shop Items */}
        <div className="grid gap-4">
          {SHOP_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg border border-gray-200 
                        flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-medium text-purple-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              
              <Button
                onClick={() => handlePurchase(item)}
                disabled={player.gold < item.price}
                className={`flex items-center gap-2 ${
                  player.gold < item.price
                    ? 'bg-gray-400'
                    : 'bg-yellow-500 hover:bg-yellow-600'
                }`}
              >
                <Coins className="w-4 h-4" />
                {item.price} Gold
              </Button>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-200"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Shop;