import { ArrowLeft, Bell, Moon, Globe, Shield, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useState } from 'react';

interface SettingsProps {
  userName: string;
  onBack: () => void;
  onLogout: () => void;
}

export function Settings({ userName, onBack, onLogout }: SettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  return (
    <div className="min-h-screen bg-[#FFF8F0] md:max-w-none md:w-full md:px-4 md:py-2">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-[#A0522D]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[#8B4513] text-lg">Settings</h1>
        </div>
      </header>

      <div className="p-4 space-y-6 md:px-6 md:py-4 md:max-w-2xl md:mx-auto">
        {/* User Info Section */}
        <div className="bg-white rounded-lg p-4 border border-[#DEB887]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#FFE8D6] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-[#8B4513]" />
            </div>
            <div>
              <div className="text-[#8B4513] font-semibold">{userName}</div>
              <div className="text-[#A0522D] text-sm">Account Settings</div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg p-4 border border-[#DEB887]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#8B4513]" />
              <div>
                <Label htmlFor="notifications" className="text-[#8B4513] font-medium">
                  Notifications
                </Label>
                <p className="text-[#A0522D] text-sm">Receive push notifications</p>
              </div>
            </div>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-lg p-4 border border-[#DEB887]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-[#8B4513]" />
              <div>
                <Label htmlFor="dark-mode" className="text-[#8B4513] font-medium">
                  Dark Mode
                </Label>
                <p className="text-[#A0522D] text-sm">Switch to dark theme</p>
              </div>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white rounded-lg p-4 border border-[#DEB887]">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-[#8B4513]" />
            <div className="flex-1">
              <Label htmlFor="language" className="text-[#8B4513] font-medium">
                Language
              </Label>
              <p className="text-[#A0522D] text-sm mb-2">Select your preferred language</p>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-[#DEB887] rounded-md text-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              >
                <option value="English">English</option>
                <option value="中文">中文</option>
                <option value="Español">Español</option>
                <option value="Français">Français</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-lg p-4 border border-[#DEB887]">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#8B4513]" />
            <div className="flex-1">
              <div className="text-[#8B4513] font-medium mb-1">Privacy & Security</div>
              <p className="text-[#A0522D] text-sm mb-3">Manage your privacy settings</p>
              <Button
                variant="outline"
                className="w-full border-[#DEB887] text-[#8B4513] hover:bg-[#FFE8D6]"
              >
                View Privacy Policy
              </Button>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="pt-4">
          <Button
            onClick={onLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log Out
          </Button>
        </div>

        {/* App Version */}
        <div className="text-center text-[#A0522D] text-sm pt-4">
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}

