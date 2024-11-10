import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

function StatusEffect({ type, timeLeft }) {
  const icons = {
    grow: <ArrowUpCircle className="text-purple-500 w-5 h-5" />,
    shrink: <ArrowDownCircle className="text-pink-500 w-5 h-5" />
  };

  const labels = {
    grow: 'Enlarged',
    shrink: 'Shrunk'
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full
                    backdrop-blur-sm border border-white/20">
      {icons[type]}
      <span className="text-sm font-medium">
        {labels[type]}
      </span>
      <span className="text-xs text-white/80">
        {Math.ceil(timeLeft)}
      </span>
    </div>
  );
}

export default StatusEffect;