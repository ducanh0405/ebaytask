import React, { useState, useEffect } from 'react';
import { EditableProcessStep } from './components/EditableProcessStep';
import { EditableBranchPath } from './components/EditableBranchPath';
import { FlowArrow } from './components/FlowArrow';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { 
  Inbox, 
  FileText, 
  Globe, 
  MessageCircle, 
  Package, 
  Clock,
  CheckCircle,
  AlertCircle,
  Edit2,
  Save,
  Users,
  Plus,
  History,
  Camera,
  Settings,
  Target,
  ShoppingCart,
  Truck,
  BarChart3,
  Calendar,
  Star,
  Tag,
  Zap,
  Shield,
  Wrench,
  Search,
  Eye,
  Phone,
  Mail,
  MapPin,
  Home,
  Building,
  Car,
  Heart,
  Bookmark,
  Download,
  Upload,
  Share,
  Copy,
  Trash2,
  Archive,
  Flag,
  Bell,
  Lock,
  Unlock,
  Key,
  User,
  UserPlus,
  Coffee,
  Gift,
  Lightbulb,
  Smartphone,
  Monitor,
  Headphones,
  Image,
  Video,
  Music,
  PlayCircle,
  PauseCircle,
  StopCircle
} from 'lucide-react';
import { projectId, publicAnonKey } from './utils/supabase/info';

interface ProcessStepData {
  id: string;
  title: string;
  steps: string[];
  color: string;
  iconName: string;
}

interface BranchPathData {
  id: string;
  title: string;
  status: 'SOLD' | 'UNSOLD';
  steps: string[];
  color: string;
  iconName: string;
}

interface ProcessData {
  title: string;
  subtitle: string;
  mainSteps: ProcessStepData[];
  branchPaths: BranchPathData[];
  lastModified?: string;
  modifiedBy?: string;
}

const iconMap = {
  // Business Process
  Inbox: <Inbox className="w-5 h-5 text-blue-600" />,
  FileText: <FileText className="w-5 h-5 text-purple-600" />,
  Globe: <Globe className="w-5 h-5 text-green-600" />,
  MessageCircle: <MessageCircle className="w-5 h-5 text-orange-600" />,
  Package: <Package className="w-5 h-5 text-green-600" />,
  Clock: <Clock className="w-5 h-5 text-orange-600" />,
  
  // Status & Actions
  CheckCircle: <CheckCircle className="w-5 h-5 text-green-600" />,
  AlertCircle: <AlertCircle className="w-5 h-5 text-orange-600" />,
  Edit2: <Edit2 className="w-5 h-5 text-blue-600" />,
  Save: <Save className="w-5 h-5 text-green-600" />,
  Plus: <Plus className="w-5 h-5 text-blue-600" />,
  
  // E-commerce
  ShoppingCart: <ShoppingCart className="w-5 h-5 text-blue-600" />,
  Tag: <Tag className="w-5 h-5 text-purple-600" />,
  Star: <Star className="w-5 h-5 text-yellow-600" />,
  Truck: <Truck className="w-5 h-5 text-blue-600" />,
  BarChart3: <BarChart3 className="w-5 h-5 text-green-600" />,
  
  // Tools & Settings
  Settings: <Settings className="w-5 h-5 text-gray-600" />,
  Wrench: <Wrench className="w-5 h-5 text-gray-600" />,
  Search: <Search className="w-5 h-5 text-blue-600" />,
  Eye: <Eye className="w-5 h-5 text-blue-600" />,
  Target: <Target className="w-5 h-5 text-red-600" />,
  
  // Communication
  Phone: <Phone className="w-5 h-5 text-green-600" />,
  Mail: <Mail className="w-5 h-5 text-blue-600" />,
  Users: <Users className="w-5 h-5 text-blue-600" />,
  User: <User className="w-5 h-5 text-blue-600" />,
  UserPlus: <UserPlus className="w-5 h-5 text-blue-600" />,
  
  // Locations & Objects
  MapPin: <MapPin className="w-5 h-5 text-red-600" />,
  Home: <Home className="w-5 h-5 text-blue-600" />,
  Building: <Building className="w-5 h-5 text-gray-600" />,
  Car: <Car className="w-5 h-5 text-blue-600" />,
  
  // Actions & States
  Heart: <Heart className="w-5 h-5 text-red-600" />,
  Bookmark: <Bookmark className="w-5 h-5 text-blue-600" />,
  Download: <Download className="w-5 h-5 text-green-600" />,
  Upload: <Upload className="w-5 h-5 text-blue-600" />,
  Share: <Share className="w-5 h-5 text-blue-600" />,
  Copy: <Copy className="w-5 h-5 text-blue-600" />,
  
  // Management
  Archive: <Archive className="w-5 h-5 text-gray-600" />,
  Trash2: <Trash2 className="w-5 h-5 text-red-600" />,
  Flag: <Flag className="w-5 h-5 text-red-600" />,
  Bell: <Bell className="w-5 h-5 text-blue-600" />,
  History: <History className="w-5 h-5 text-gray-600" />,
  Calendar: <Calendar className="w-5 h-5 text-blue-600" />,
  
  // Security
  Lock: <Lock className="w-5 h-5 text-red-600" />,
  Unlock: <Unlock className="w-5 h-5 text-green-600" />,
  Key: <Key className="w-5 h-5 text-yellow-600" />,
  Shield: <Shield className="w-5 h-5 text-blue-600" />,
  
  // Creative & Media
  Camera: <Camera className="w-5 h-5 text-purple-600" />,
  Image: <Image className="w-5 h-5 text-purple-600" />,
  Video: <Video className="w-5 h-5 text-red-600" />,
  Music: <Music className="w-5 h-5 text-purple-600" />,
  
  // Technology
  Smartphone: <Smartphone className="w-5 h-5 text-blue-600" />,
  Monitor: <Monitor className="w-5 h-5 text-blue-600" />,
  Headphones: <Headphones className="w-5 h-5 text-blue-600" />,
  
  // Misc
  Coffee: <Coffee className="w-5 h-5 text-amber-600" />,
  Gift: <Gift className="w-5 h-5 text-red-600" />,
  Lightbulb: <Lightbulb className="w-5 h-5 text-yellow-600" />,
  Zap: <Zap className="w-5 h-5 text-yellow-600" />
};

export default function App() {
  const [processData, setProcessData] = useState<ProcessData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [tempSubtitle, setTempSubtitle] = useState('');
  const [userName, setUserName] = useState('Anonymous User');

  useEffect(() => {
    loadProcessData();
  }, []);

  const loadProcessData = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-11fde674/process`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProcessData(data);
        setTempTitle(data.title);
        setTempSubtitle(data.subtitle);
      }
    } catch (error) {
      console.error('Load process data error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProcessData = async (data: ProcessData) => {
    setIsSaving(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-11fde674/process`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          ...data,
          user: userName
        })
      });

      if (response.ok) {
        const result = await response.json();
        setProcessData(result.data);
      } else {
        console.error('Save failed:', await response.text());
      }
    } catch (error) {
      console.error('Save process data error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStepUpdate = (updatedStep: ProcessStepData) => {
    if (!processData) return;

    const newData = {
      ...processData,
      mainSteps: processData.mainSteps.map(step => 
        step.id === updatedStep.id ? updatedStep : step
      )
    };
    
    setProcessData(newData);
    saveProcessData(newData);
  };

  const handleBranchUpdate = (updatedBranch: BranchPathData) => {
    if (!processData) return;

    const newData = {
      ...processData,
      branchPaths: processData.branchPaths.map(branch => 
        branch.id === updatedBranch.id ? updatedBranch : branch
      )
    };
    
    setProcessData(newData);
    saveProcessData(newData);
  };

  const handleTitleSave = () => {
    if (!processData) return;

    const newData = {
      ...processData,
      title: tempTitle,
      subtitle: tempSubtitle
    };
    
    setProcessData(newData);
    saveProcessData(newData);
    setEditingTitle(false);
  };

  const addMainStep = () => {
    if (!processData) return;

    const newStep: ProcessStepData = {
      id: Date.now().toString(),
      title: "New Process Step",
      steps: ["Add step details here"],
      color: "border-l-blue-500",
      iconName: "Inbox"
    };

    const newData = {
      ...processData,
      mainSteps: [...processData.mainSteps, newStep]
    };
    
    setProcessData(newData);
    saveProcessData(newData);
  };

  const addBranchPath = () => {
    if (!processData) return;

    const newBranch: BranchPathData = {
      id: Date.now().toString(),
      title: "New Branch Path",
      status: "SOLD" as const,
      steps: ["Add step details here"],
      color: "border-l-green-600",
      iconName: "Package"
    };

    const newData = {
      ...processData,
      branchPaths: [...processData.branchPaths, newBranch]
    };
    
    setProcessData(newData);
    saveProcessData(newData);
  };

  const deleteMainStep = (stepId: string) => {
    if (!processData) return;

    const newData = {
      ...processData,
      mainSteps: processData.mainSteps.filter(step => step.id !== stepId)
    };
    
    setProcessData(newData);
    saveProcessData(newData);
  };

  const deleteBranchPath = (branchId: string) => {
    if (!processData) return;

    const newData = {
      ...processData,
      branchPaths: processData.branchPaths.filter(branch => branch.id !== branchId)
    };
    
    setProcessData(newData);
    saveProcessData(newData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading process data...</p>
        </div>
      </div>
    );
  }

  if (!processData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Failed to load process data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            {editingTitle ? (
              <div className="space-y-2">
                <Input
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  className="text-3xl font-bold text-center"
                  placeholder="Process title"
                />
                <Input
                  value={tempSubtitle}
                  onChange={(e) => setTempSubtitle(e.target.value)}
                  className="text-lg text-center"
                  placeholder="Subtitle"
                />
                <div className="flex justify-center gap-2">
                  <Button onClick={handleTitleSave} size="sm">
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingTitle(false);
                      setTempTitle(processData.title);
                      setTempSubtitle(processData.subtitle);
                    }} 
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {processData.title}
                  </h1>
                  {isEditMode && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingTitle(true)}
                      className="p-1"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <p className="text-lg text-gray-600">{processData.subtitle}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {processData.lastModified && (
              <div className="text-sm text-gray-500 text-right">
                <p>Last modified: {new Date(processData.lastModified).toLocaleString()}</p>
                {processData.modifiedBy && <p>By: {processData.modifiedBy}</p>}
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <Input
                  type="text"
                  placeholder="Your name (optional)"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value || 'Anonymous User')}
                  className="w-40"
                />
              </div>

              <Button
                variant={isEditMode ? "default" : "outline"}
                onClick={() => setIsEditMode(!isEditMode)}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                {isEditMode ? 'View Mode' : 'Edit Mode'}
              </Button>
            </div>
          </div>
        </div>

        {isSaving && (
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
            Saving changes...
          </div>
        )}

        {/* Main Process Flow */}
        <div className="space-y-6 mb-12">
          {processData.mainSteps.map((step, index) => (
            <div key={step.id}>
              <EditableProcessStep
                stepData={step}
                icon={iconMap[step.iconName as keyof typeof iconMap] || iconMap.Inbox}
                isEditMode={isEditMode}
                onUpdate={handleStepUpdate}
                onDelete={processData.mainSteps.length > 1 ? () => deleteMainStep(step.id) : undefined}
              />
              {index < processData.mainSteps.length - 1 && (
                <FlowArrow direction="down" className="my-4" />
              )}
            </div>
          ))}

          {isEditMode && (
            <div className="flex justify-center">
              <Button onClick={addMainStep} variant="outline" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Process Step
              </Button>
            </div>
          )}
        </div>

        {/* Decision Point */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-dashed border-gray-300">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-lg">SOLD</span>
              <span className="text-gray-400">or</span>
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <span className="font-semibold text-lg">UNSOLD</span>
            </div>
          </div>
        </div>

        {/* Branch Paths */}
        <div className="grid md:grid-cols-2 gap-6">
          {processData.branchPaths.map((path) => (
            <EditableBranchPath
              key={path.id}
              pathData={path}
              icon={iconMap[path.iconName as keyof typeof iconMap] || iconMap.Package}
              isEditMode={isEditMode}
              onUpdate={handleBranchUpdate}
              onDelete={processData.branchPaths.length > 1 ? () => deleteBranchPath(path.id) : undefined}
            />
          ))}
        </div>

        {isEditMode && (
          <div className="flex justify-center mt-6">
            <Button onClick={addBranchPath} variant="outline" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Branch Path
            </Button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            {isEditMode ? (
              <>
                <Badge variant="secondary" className="mr-2">Edit Mode</Badge>
                Anyone can edit • Changes are automatically saved • Click icons to change them
              </>
            ) : (
              'Collaborative process editor • Toggle Edit Mode to make changes and customize icons'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}