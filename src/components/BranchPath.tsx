import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface BranchPathProps {
  title: string;
  status: 'SOLD' | 'UNSOLD';
  steps: string[];
  color: string;
  icon: React.ReactNode;
}

export function BranchPath({ title, status, steps, color, icon }: BranchPathProps) {
  const statusColor = status === 'SOLD' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';
  
  return (
    <Card className={`p-6 transition-all duration-300 hover:shadow-lg border-l-4 ${color}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <Badge className={`${statusColor} mt-1`}>
              {status}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
            <span className="text-gray-700">{step}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}