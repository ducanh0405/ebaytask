import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

interface FlowArrowProps {
  direction?: 'right' | 'down';
  className?: string;
}

export function FlowArrow({ direction = 'right', className = '' }: FlowArrowProps) {
  const Icon = direction === 'right' ? ArrowRight : ArrowDown;
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="p-2 bg-gray-100 rounded-full">
        <Icon className="w-4 h-4 text-gray-600" />
      </div>
    </div>
  );
}