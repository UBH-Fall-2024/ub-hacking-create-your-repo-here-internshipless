import React from 'react';
import { X, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

function EffectNotification({ message, effectType, onClose }) {
  const effectStyles = {
    grow: {
      bg: 'bg-purple-600',
      icon: <ArrowUpCircle className="w-6 h-6" />,
      hover: 'hover:bg-purple-700'
    },
    shrink: {
      bg: 'bg-pink-600',
      icon: <ArrowDownCircle className="w-6 h-6" />,
      hover: 'hover:bg-pink-700'
    }
  };

  const style = effectStyles[effectType] || effectStyles.grow;

  return (
    <div className={`${style.bg} text-white 
                    rounded-lg shadow-lg animate-slide-up
                    flex items-center gap-6
                    min-w-[300px] px-8 py-4`}>
      <div className="text-3xl animate-bounce">
        {style.icon}
      </div>
      <div className="flex flex-col gap-1 flex-grow">
        <div className="font-medium text-lg">Status Effect!</div>
        <div className="text-base opacity-90">{message}</div>
      </div>
      <button 
        onClick={onClose}
        className={`p-2 rounded-full transition-colors ${style.hover}`}
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default EffectNotification;