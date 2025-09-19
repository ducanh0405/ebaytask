import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { IconSelector } from './IconSelector';
import { Edit2, Save, X, Plus, Trash2 } from 'lucide-react';

interface BranchPathData {
  id: string;
  title: string;
  status: 'SOLD' | 'UNSOLD';
  steps: string[];
  color: string;
  iconName: string;
}

interface EditableBranchPathProps {
  pathData: BranchPathData;
  icon: React.ReactNode;
  isEditMode: boolean;
  onUpdate: (pathData: BranchPathData) => void;
  onDelete?: () => void;
}

export function EditableBranchPath({ 
  pathData, 
  icon, 
  isEditMode,
  onUpdate,
  onDelete
}: EditableBranchPathProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<BranchPathData>(pathData);

  const statusColor = pathData.status === 'SOLD' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(pathData);
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
    <Card className={`p-6 transition-all duration-300 hover:shadow-lg border-l-4 ${pathData.color}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-blue-50 rounded-lg">
            {isEditing ? (
              <IconSelector
                selectedIcon={editData.iconName}
                onIconSelect={(iconName) => setEditData({ ...editData, iconName })}
                color={pathData.status === 'SOLD' ? 'text-green-600' : 'text-orange-600'}
              />
            ) : (
              icon
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="font-semibold"
                  placeholder="Branch title"
                />
                <Select
                  value={editData.status}
                  onValueChange={(value: 'SOLD' | 'UNSOLD') => 
                    setEditData({ ...editData, status: value })
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SOLD">SOLD</SelectItem>
                    <SelectItem value="UNSOLD">UNSOLD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-gray-900">{pathData.title}</h3>
                <Badge className={`${statusColor} mt-1`}>
                  {pathData.status}
                </Badge>
              </div>
            )}
          </div>
        </div>
        
        {isEditMode && (
          <div className="flex items-center gap-2">
            {!isEditing ? (
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
            ) : (
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
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        {(isEditing ? editData.steps : pathData.steps).map((step, index) => (
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
    </Card>
  );
}