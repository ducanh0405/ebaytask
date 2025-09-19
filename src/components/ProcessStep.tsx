import React, { useState } from 'react';
import { Card } from './ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ProcessStepProps {
  title: string;
  subtitle?: string;
  steps: string[];
  color: string;
  icon: React.ReactNode;
  isExpanded?: boolean;
}

export function ProcessStep({ title, subtitle, steps, color, icon, isExpanded = true }: ProcessStepProps) {
  const [expanded, setExpanded] = useState(isExpanded);

  return (
    <Card className={`p-6 transition-all duration-300 hover:shadow-lg border-l-4 ${color}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>
      
      {expanded && (
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">{step}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}