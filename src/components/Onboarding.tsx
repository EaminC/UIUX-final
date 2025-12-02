import { useState } from 'react';
import { ChefHat, Camera, Trophy, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import logoImage from 'figma:asset/25e052c30c60417278690aee9375257caca59348.png';

interface OnboardingProps {
  onComplete: (userName: string, country: string) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [country, setCountry] = useState('');

  const features = [
    {
      icon: Camera,
      title: 'Share Your Recipes',
      description: 'Upload photos and share your favorite dishes from home',
    },
    {
      icon: Trophy,
      title: 'Earn Rewards',
      description: 'Get points for every recipe and redeem them for prizes',
    },
    {
      icon: Users,
      title: 'Connect with Others',
      description: 'Meet international students who love cooking',
    },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(userName, country);
    }
  };

  const handleSkip = () => {
    onComplete(userName || 'Guest', country || 'International');
  };

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFE8D6] flex flex-col items-center justify-center p-6">
        <img src={logoImage} alt="Eamin's Kitchen" className="w-48 h-48 mb-8" />
        <h1 className="text-[#8B4513] text-center mb-4">Welcome to Eamin's Kitchen</h1>
        <p className="text-[#A0522D] text-center mb-8 max-w-md">
          A community for international students to share, explore, and celebrate food from home
        </p>
        <Button
          onClick={handleNext}
          className="bg-[#8B4513] hover:bg-[#A0522D] text-white px-8"
        >
          Get Started
        </Button>
      </div>
    );
  }

  if (step >= 1 && step <= 3) {
    const feature = features[step - 1];
    const Icon = feature.icon;

    return (
      <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-between p-6 py-12">
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 w-16 rounded-full ${
                i === step ? 'bg-[#8B4513]' : 'bg-[#DEB887]'
              }`}
            />
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-32 h-32 bg-[#FFE8D6] rounded-full flex items-center justify-center mb-6">
            <Icon className="w-16 h-16 text-[#8B4513]" />
          </div>
          <h2 className="text-[#8B4513] text-center mb-4">{feature.title}</h2>
          <p className="text-[#A0522D] text-center max-w-sm">{feature.description}</p>
        </div>

        <div className="w-full space-y-3">
          <Button
            onClick={handleNext}
            className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
          >
            {step === 3 ? 'Continue' : 'Next'}
          </Button>
          <Button
            onClick={handleSkip}
            variant="ghost"
            className="w-full text-[#A0522D]"
          >
            Skip
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center mb-8">
          <ChefHat className="w-16 h-16 text-[#8B4513] mx-auto mb-4" />
          <h2 className="text-[#8B4513] mb-2">Let's personalize your experience</h2>
          <p className="text-[#A0522D]">Tell us a bit about yourself</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-[#8B4513]">
              Your Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 border-[#DEB887] focus:border-[#8B4513]"
            />
          </div>

          <div>
            <Label htmlFor="country" className="text-[#8B4513]">
              Home Country
            </Label>
            <Input
              id="country"
              placeholder="e.g., China, India, Mexico"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 border-[#DEB887] focus:border-[#8B4513]"
            />
          </div>
        </div>

        <Button
          onClick={handleNext}
          disabled={!userName || !country}
          className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
        >
          Start Cooking!
        </Button>
      </div>
    </div>
  );
}
