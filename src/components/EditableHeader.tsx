import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Edit2, Save, X } from 'lucide-react';

interface EditableHeaderProps {
  title: string;
  subtitle: string;
  isEditMode: boolean;
  onUpdate: (title: string, subtitle: string) => void;
}

export function EditableHeader({ title, subtitle, isEditMode, onUpdate }: EditableHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editSubtitle, setEditSubtitle] = useState(subtitle);

  const handleSave = () => {
    onUpdate(editTitle, editSubtitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditSubtitle(subtitle);
    setIsEditing(false);
  };

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-4 mb-2">
        {isEditing ? (
          <div className="flex-1 max-w-4xl">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-center text-3xl font-bold mb-2"
            />
          </div>
        ) : (
          <h1 className="text-3xl font-bold text-gray-900">
            {title}
          </h1>
        )}
        
        {isEditMode && (
          <div className="flex gap-1">
            {!isEditing ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            ) : (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  className="h-8 w-8 p-0 text-green-600"
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="h-8 w-8 p-0 text-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {isEditing ? (
        <Input
          value={editSubtitle}
          onChange={(e) => setEditSubtitle(e.target.value)}
          className="text-center text-lg max-w-md mx-auto"
        />
      ) : (
        <p className="text-lg text-gray-600">{subtitle}</p>
      )}
    </div>
  );
}