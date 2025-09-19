import React, { useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
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
  LogOut,
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

const availableIcons = {
  // Business Process
  Inbox: { icon: <Inbox className="w-5 h-5" />, name: 'Inbox' },
  FileText: { icon: <FileText className="w-5 h-5" />, name: 'Document' },
  Globe: { icon: <Globe className="w-5 h-5" />, name: 'Web' },
  MessageCircle: { icon: <MessageCircle className="w-5 h-5" />, name: 'Message' },
  Package: { icon: <Package className="w-5 h-5" />, name: 'Package' },
  Clock: { icon: <Clock className="w-5 h-5" />, name: 'Time' },
  
  // Status & Actions
  CheckCircle: { icon: <CheckCircle className="w-5 h-5" />, name: 'Success' },
  AlertCircle: { icon: <AlertCircle className="w-5 h-5" />, name: 'Alert' },
  Edit2: { icon: <Edit2 className="w-5 h-5" />, name: 'Edit' },
  Save: { icon: <Save className="w-5 h-5" />, name: 'Save' },
  Plus: { icon: <Plus className="w-5 h-5" />, name: 'Add' },
  
  // E-commerce
  ShoppingCart: { icon: <ShoppingCart className="w-5 h-5" />, name: 'Cart' },
  Tag: { icon: <Tag className="w-5 h-5" />, name: 'Price Tag' },
  Star: { icon: <Star className="w-5 h-5" />, name: 'Rating' },
  Truck: { icon: <Truck className="w-5 h-5" />, name: 'Shipping' },
  BarChart3: { icon: <BarChart3 className="w-5 h-5" />, name: 'Analytics' },
  
  // Tools & Settings
  Settings: { icon: <Settings className="w-5 h-5" />, name: 'Settings' },
  Wrench: { icon: <Wrench className="w-5 h-5" />, name: 'Tools' },
  Search: { icon: <Search className="w-5 h-5" />, name: 'Search' },
  Eye: { icon: <Eye className="w-5 h-5" />, name: 'View' },
  Target: { icon: <Target className="w-5 h-5" />, name: 'Target' },
  
  // Communication
  Phone: { icon: <Phone className="w-5 h-5" />, name: 'Phone' },
  Mail: { icon: <Mail className="w-5 h-5" />, name: 'Email' },
  Users: { icon: <Users className="w-5 h-5" />, name: 'Team' },
  User: { icon: <User className="w-5 h-5" />, name: 'User' },
  UserPlus: { icon: <UserPlus className="w-5 h-5" />, name: 'Add User' },
  
  // Locations & Objects
  MapPin: { icon: <MapPin className="w-5 h-5" />, name: 'Location' },
  Home: { icon: <Home className="w-5 h-5" />, name: 'Home' },
  Building: { icon: <Building className="w-5 h-5" />, name: 'Building' },
  Car: { icon: <Car className="w-5 h-5" />, name: 'Vehicle' },
  
  // Actions & States
  Heart: { icon: <Heart className="w-5 h-5" />, name: 'Favorite' },
  Bookmark: { icon: <Bookmark className="w-5 h-5" />, name: 'Bookmark' },
  Download: { icon: <Download className="w-5 h-5" />, name: 'Download' },
  Upload: { icon: <Upload className="w-5 h-5" />, name: 'Upload' },
  Share: { icon: <Share className="w-5 h-5" />, name: 'Share' },
  Copy: { icon: <Copy className="w-5 h-5" />, name: 'Copy' },
  
  // Management
  Archive: { icon: <Archive className="w-5 h-5" />, name: 'Archive' },
  Trash2: { icon: <Trash2 className="w-5 h-5" />, name: 'Delete' },
  Flag: { icon: <Flag className="w-5 h-5" />, name: 'Flag' },
  Bell: { icon: <Bell className="w-5 h-5" />, name: 'Notification' },
  History: { icon: <History className="w-5 h-5" />, name: 'History' },
  Calendar: { icon: <Calendar className="w-5 h-5" />, name: 'Calendar' },
  
  // Security
  Lock: { icon: <Lock className="w-5 h-5" />, name: 'Locked' },
  Unlock: { icon: <Unlock className="w-5 h-5" />, name: 'Unlocked' },
  Key: { icon: <Key className="w-5 h-5" />, name: 'Key' },
  Shield: { icon: <Shield className="w-5 h-5" />, name: 'Security' },
  
  // Creative & Media
  Camera: { icon: <Camera className="w-5 h-5" />, name: 'Camera' },
  Image: { icon: <Image className="w-5 h-5" />, name: 'Image' },
  Video: { icon: <Video className="w-5 h-5" />, name: 'Video' },
  Music: { icon: <Music className="w-5 h-5" />, name: 'Music' },
  
  // Technology
  Smartphone: { icon: <Smartphone className="w-5 h-5" />, name: 'Mobile' },
  Monitor: { icon: <Monitor className="w-5 h-5" />, name: 'Desktop' },
  Headphones: { icon: <Headphones className="w-5 h-5" />, name: 'Audio' },
  
  // Misc
  Coffee: { icon: <Coffee className="w-5 h-5" />, name: 'Coffee' },
  Gift: { icon: <Gift className="w-5 h-5" />, name: 'Gift' },
  Lightbulb: { icon: <Lightbulb className="w-5 h-5" />, name: 'Idea' },
  Zap: { icon: <Zap className="w-5 h-5" />, name: 'Energy' }
};

interface IconSelectorProps {
  selectedIcon: string;
  onIconSelect: (iconName: string) => void;
  color?: string;
}

export function IconSelector({ selectedIcon, onIconSelect, color = 'text-blue-600' }: IconSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconSelect = (iconName: string) => {
    onIconSelect(iconName);
    setIsOpen(false);
  };

  const currentIcon = availableIcons[selectedIcon as keyof typeof availableIcons];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2 h-auto hover:bg-gray-100">
          <div className={`${color}`}>
            {currentIcon ? currentIcon.icon : <Inbox className="w-5 h-5" />}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <h4 className="font-medium">Choose an icon</h4>
          <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
            {Object.entries(availableIcons).map(([key, { icon, name }]) => (
              <Button
                key={key}
                variant={selectedIcon === key ? "default" : "ghost"}
                size="sm"
                onClick={() => handleIconSelect(key)}
                className="p-2 h-auto flex flex-col items-center gap-1"
                title={name}
              >
                <div className={selectedIcon === key ? 'text-white' : color}>
                  {icon}
                </div>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}