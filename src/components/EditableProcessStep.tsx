import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { IconSelector } from './IconSelector';
import { ChevronDown, ChevronUp, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';

interface ProcessStepData {
  id: string;
  title: string;
  steps: string[];
  color: string;
  iconName: string;
}

interface EditableProcessStepProps {
  stepData: ProcessStepData;
  icon: React.ReactNode;
  isExpanded?: boolean;
  isEditMode: boolean;
  onUpdate: (stepData: ProcessStepData) => void;
  onDelete?: () => void;
}

export function EditableProcessStep({ 
  stepData, 
  icon, 
  isExpanded = true, 
  isEditMode,
  onUpdate,
  onDelete
}: EditableProcessStepProps) {
  const [expanded, setExpanded] = useState(isExpanded);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<ProcessStepData>(stepData);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(stepData);
    setIsEditing(false);
  };

  const addStep = () => {
    setEditData({
      ...editData,
      steps: [...editData.steps, "New step"]
    });
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...editData.steps];
    newSteps[index] = value;
    setEditData({
      ...editData,
      steps: newSteps
    });
  };

  const deleteStep = (index: number) => {
    const newSteps = editData.steps.filter((_, i) => i !== index);
    setEditData({
      ...editData,
      steps: newSteps
    });
  };

  return (
    <Card className={`p-6 transition-all duration-300 hover:shadow-lg border-l-4 ${stepData.color}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-blue-50 rounded-lg">
            {isEditing ? (
              <IconSelector
                selectedIcon={editData.iconName}
                onIconSelect={(iconName) => setEditData({ ...editData, iconName })}
                color="text-blue-600"
              />
            ) : (
              icon
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="font-semibold"
                placeholder="Step title"
              />
            ) : (
              <h3 className="font-semibold text-gray-900">{stepData.title}</h3>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isEditMode && !isEditing && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="p-1 h-8 w-8"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDelete}
                  className="p-1 h-8 w-8 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </>
          )}
          
          {isEditing && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className="p-1 h-8 w-8 text-green-600 hover:text-green-700"
              >
                <Save className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="p-1 h-8 w-8 text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          )}
          
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
      </div>
      
      {expanded && (
        <div className="space-y-2">
          {(isEditing ? editData.steps : stepData.steps).map((step, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              {isEditing ? (
                <div className="flex-1 flex items-center gap-2">
                  <Textarea
                    value={step}
                    onChange={(e) => updateStep(index, e.target.value)}
                    className="text-sm min-h-[60px] resize-none"
                    placeholder="Step description"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteStep(index)}
                    className="p-1 h-8 w-8 text-red-600 hover:text-red-700 flex-shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <span className="text-sm text-gray-700 flex-1">{step}</span>
              )}
            </div>
          ))}
          
          {isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={addStep}
              className="mt-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Step
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}