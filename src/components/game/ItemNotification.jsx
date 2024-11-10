import React from 'react';
import { X } from 'lucide-react';

function ItemNotification({ item, onClose, id }) {
  console.log('ItemNotification render', item);
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 
                    bg-purple-600 text-white 
                    rounded-lg shadow-lg animate-slide-up
                    flex items-center gap-6 z-50
                    min-w-[300px] px-8 py-4">
      <div className="text-3xl">{item.icon}</div>
      <div className="flex flex-col gap-1">
        <div className="font-medium text-lg">Item Acquired!</div>
        <div className="text-base opacity-90">{item.name}</div>
      </div>
      <button 
        type="button"
        onClick={() => onClose(id)} 
        className="ml-auto p-2 hover:bg-purple-700 rounded-full
                   transition-colors duration-200"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default ItemNotification;