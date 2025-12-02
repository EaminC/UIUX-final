import { useState } from 'react';
import { Button } from './ui/button';
import { ChefHat } from 'lucide-react';

interface PreferencesProps {
  onComplete: (preferences: string[]) => void;
  onSkip: () => void;
}

const preferenceOptions = [
  'Mediterranean',
  'Asian',
  'Vegan',
  'Dessert',
  'Snacks',
  'Italian',
  'Mexican',
  'Indian',
  'Chinese',
  'Japanese',
  'French',
  'American',
];

export function Preferences({ onComplete, onSkip }: PreferencesProps) {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const togglePreference = (pref: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleContinue = () => {
    onComplete(selectedPreferences);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
      {/* Status Bar Placeholder */}
      <div className="h-16 bg-white" />

      {/* Header */}
      <header className="bg-white px-4 py-4 border-b border-[#DEB887]">
        <div className="flex items-center gap-3">
          <ChefHat className="w-8 h-8 text-[#8B4513]" />
          <h1 className="text-[#8B4513] text-lg">Eamin's Kitchen</h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-[#8B4513] text-2xl mb-2">How you like it?</h2>
            <p className="text-[#A0522D]">Select your favorite cuisines and food types</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {preferenceOptions.map((pref) => {
              const isSelected = selectedPreferences.includes(pref);
              return (
                <button
                  key={pref}
                  onClick={() => togglePreference(pref)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'bg-[#8B4513] text-white border-[#8B4513]'
                      : 'bg-white text-[#8B4513] border-[#DEB887] hover:border-[#8B4513]'
                  }`}
                >
                  {pref}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleContinue}
              disabled={selectedPreferences.length === 0}
              className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
            >
              Continue
            </Button>
            <Button
              onClick={onSkip}
              variant="ghost"
              className="w-full text-[#A0522D] hover:text-[#8B4513]"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>

      {/* Home Indicator Placeholder */}
      <div className="h-8 bg-white" />
    </div>
  );
}



