import { ArrowLeft, Star, Gift, Lock, Check, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import type { User } from '../App';

interface RewardsSystemProps {
  user: User;
  onBack: () => void;
}

// Level definitions with rewards - using darker, more contrasting colors
const LEVELS = [
  {
    level: 1,
    name: 'Home Cook',
    minPoints: 0,
    maxPoints: 50,
    reward: {
      name: 'Recipe Starter Kit',
      description: 'Basic spice collection',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
    },
    color: 'from-[#8B6914] to-[#B8860B]',
    bgColor: 'bg-gradient-to-br from-[#8B6914] to-[#B8860B]',
  },
  {
    level: 2,
    name: 'Aspiring Chef',
    minPoints: 50,
    maxPoints: 150,
    reward: {
      name: 'Grain-Fed Ribeye Steak',
      description: 'Premium 12oz USDA Prime',
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80',
    },
    color: 'from-[#5D3A1A] to-[#8B4513]',
    bgColor: 'bg-gradient-to-br from-[#5D3A1A] to-[#8B4513]',
  },
  {
    level: 3,
    name: 'Kitchen Master',
    minPoints: 150,
    maxPoints: 300,
    reward: {
      name: 'Fresh Atlantic Salmon',
      description: 'Wild-caught 1lb fillet',
      image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&q=80',
    },
    color: 'from-[#9B2335] to-[#C41E3A]',
    bgColor: 'bg-gradient-to-br from-[#9B2335] to-[#C41E3A]',
  },
  {
    level: 4,
    name: 'Culinary Artist',
    minPoints: 300,
    maxPoints: 500,
    reward: {
      name: 'Japanese Wagyu A5',
      description: 'Authentic Miyazaki beef',
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80',
    },
    color: 'from-[#4B0082] to-[#6B238E]',
    bgColor: 'bg-gradient-to-br from-[#4B0082] to-[#6B238E]',
  },
  {
    level: 5,
    name: 'Master Chef',
    minPoints: 500,
    maxPoints: 1000,
    reward: {
      name: 'Premium Kitchen Set',
      description: 'Professional cookware bundle',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    },
    color: 'from-[#1B5E20] to-[#2E7D32]',
    bgColor: 'bg-gradient-to-br from-[#1B5E20] to-[#2E7D32]',
  },
];

// Points history mock data
const POINTS_HISTORY = [
  { action: 'Uploaded "Shanghai Braised Pork"', points: 15, date: '2 hours ago' },
  { action: 'Recipe liked by 5 users', points: 5, date: '1 day ago' },
  { action: 'Completed daily login', points: 2, date: '1 day ago' },
  { action: 'Uploaded "Soup Dumplings"', points: 15, date: '3 days ago' },
  { action: 'First recipe bonus', points: 10, date: '1 week ago' },
];

export function RewardsSystem({ user, onBack }: RewardsSystemProps) {
  // Calculate current level
  const getCurrentLevel = () => {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (user.points >= LEVELS[i].minPoints) {
        return i;
      }
    }
    return 0;
  };

  const currentLevelIndex = getCurrentLevel();
  const currentLevel = LEVELS[currentLevelIndex];
  const nextLevel = LEVELS[currentLevelIndex + 1];
  
  // Calculate progress to next level
  const pointsInCurrentLevel = user.points - currentLevel.minPoints;
  const pointsNeededForNextLevel = nextLevel 
    ? nextLevel.minPoints - currentLevel.minPoints 
    : currentLevel.maxPoints - currentLevel.minPoints;
  const progressPercent = Math.min((pointsInCurrentLevel / pointsNeededForNextLevel) * 100, 100);
  const pointsToNextLevel = nextLevel ? nextLevel.minPoints - user.points : 0;

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#FFF8F0] md:max-w-2xl">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-[#A0522D]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-[#8B4513] text-lg font-semibold">Rewards & Levels</h1>
            <p className="text-[#A0522D] text-sm">Earn points, unlock rewards!</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Current Status Card - Starbucks Style with dark theme */}
        <div className={`bg-gradient-to-br ${currentLevel.color} rounded-2xl p-6 text-white shadow-xl border-2 border-black/20`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {[...Array(currentLevel.level)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                ))}
              </div>
              <h2 className="text-2xl font-bold drop-shadow-md">{currentLevel.name}</h2>
              <p className="text-white/90">Level {currentLevel.level}</p>
            </div>
            <div className="text-right bg-black/20 rounded-lg px-4 py-2">
              <div className="text-3xl font-bold text-[#FFD700]">{user.points}</div>
              <div className="text-white/90 text-sm">Total Points</div>
            </div>
          </div>

          {nextLevel && (
            <div className="space-y-2 bg-black/20 rounded-lg p-3">
              <div className="flex justify-between text-sm text-white/90">
                <span>{pointsInCurrentLevel} / {pointsNeededForNextLevel} points</span>
                <span className="text-[#FFD700]">{pointsToNextLevel} to {nextLevel.name}</span>
              </div>
              <div className="h-4 bg-black/30 rounded-full overflow-hidden border border-white/20">
                <div 
                  className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Current & Next Reward */}
        <div className="grid grid-cols-2 gap-4">
          {/* Current Reward (Earned) */}
          <div className="bg-white rounded-xl border-3 border-[#228B22] overflow-hidden shadow-lg">
            <div className="bg-[#228B22] text-white text-center py-2 text-sm font-bold">
              <Check className="w-4 h-4 inline mr-1" />
              EARNED
            </div>
            <div className="p-4">
              <div className="aspect-square rounded-lg overflow-hidden mb-3 border-2 border-[#228B22] shadow-md">
                <img 
                  src={currentLevel.reward.image} 
                  alt={currentLevel.reward.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[#8B4513] font-bold text-sm truncate">{currentLevel.reward.name}</h3>
              <p className="text-[#A0522D] text-xs">{currentLevel.reward.description}</p>
              <Button 
                className="w-full mt-3 bg-[#228B22] hover:bg-[#1B6B1B] text-white text-sm font-bold shadow-md"
                size="sm"
              >
                <Gift className="w-4 h-4 mr-1" />
                Claim Reward
              </Button>
            </div>
          </div>

          {/* Next Reward (Locked) */}
          {nextLevel ? (
            <div className="bg-white rounded-xl border-3 border-[#8B4513] overflow-hidden shadow-lg relative">
              <div className="bg-[#8B4513] text-white text-center py-2 text-sm font-bold">
                <Lock className="w-4 h-4 inline mr-1" />
                {pointsToNextLevel} pts to unlock
              </div>
              <div className="p-4">
                <div className="aspect-square rounded-lg overflow-hidden mb-3 relative border-2 border-gray-300">
                  <img 
                    src={nextLevel.reward.image} 
                    alt={nextLevel.reward.name}
                    className="w-full h-full object-cover grayscale opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="w-14 h-14 bg-[#8B4513] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <Lock className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="text-gray-500 font-bold text-sm truncate">{nextLevel.reward.name}</h3>
                <p className="text-gray-400 text-xs">{nextLevel.reward.description}</p>
                <div className="mt-3 text-center bg-[#FFF8F0] rounded-lg py-2 border border-[#DEB887]">
                  <span className="text-[#8B4513] text-sm font-medium">Level {nextLevel.level} reward</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#B8860B] to-[#8B6914] rounded-xl overflow-hidden shadow-lg flex items-center justify-center p-4 border-2 border-[#FFD700]">
              <div className="text-center text-white">
                <Star className="w-12 h-12 mx-auto mb-2 fill-[#FFD700] text-[#FFD700]" />
                <h3 className="font-bold text-lg">Max Level!</h3>
                <p className="text-sm text-white/80">You've reached the top!</p>
              </div>
            </div>
          )}
        </div>

        {/* All Levels Progress */}
        <div className="bg-white rounded-xl border-2 border-[#8B4513] overflow-hidden shadow-lg">
          <div className="px-4 py-3 border-b-2 border-[#8B4513] bg-[#8B4513]">
            <h3 className="text-white font-bold">Level Progress</h3>
          </div>
          <div className="p-4 space-y-4">
            {LEVELS.map((level, index) => {
              const isUnlocked = user.points >= level.minPoints;
              const isCurrent = index === currentLevelIndex;
              
              return (
                <div key={level.level} className={`flex items-center gap-3 p-2 rounded-lg ${isCurrent ? 'bg-[#FFE8D6] border border-[#8B4513]' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                    isUnlocked 
                      ? `bg-gradient-to-br ${level.color} text-white border-2 border-white` 
                      : 'bg-gray-300 text-gray-500 border-2 border-gray-400'
                  }`}>
                    {isUnlocked ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${isUnlocked ? 'text-[#8B4513]' : 'text-gray-400'}`}>
                        {level.name}
                      </span>
                      {isCurrent && (
                        <span className="text-xs bg-[#8B4513] text-white px-2 py-0.5 rounded-full font-bold">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#A0522D] font-medium">{level.minPoints} points</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img 
                      src={level.reward.image} 
                      alt={level.reward.name}
                      className={`w-12 h-12 rounded-lg object-cover border-2 shadow-sm ${isUnlocked ? 'border-[#8B4513]' : 'grayscale opacity-50 border-gray-300'}`}
                    />
                    <ChevronRight className={`w-5 h-5 ${isUnlocked ? 'text-[#8B4513]' : 'text-gray-300'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Points History */}
        <div className="bg-white rounded-xl border border-[#DEB887] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DEB887] bg-[#FFF8F0]">
            <h3 className="text-[#8B4513] font-semibold">Points History</h3>
          </div>
          <div className="divide-y divide-[#DEB887]">
            {POINTS_HISTORY.map((item, index) => (
              <div key={index} className="px-4 py-3 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-[#8B4513] text-sm truncate">{item.action}</p>
                  <p className="text-[#A0522D] text-xs">{item.date}</p>
                </div>
                <span className="text-green-600 font-semibold ml-2">+{item.points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to Earn Points */}
        <div className="bg-gradient-to-r from-[#FFE8D6] to-[#FFDDB8] rounded-xl p-4 border border-[#DEB887]">
          <h3 className="text-[#8B4513] font-semibold mb-3">💡 How to Earn Points</h3>
          <ul className="space-y-2 text-[#A0522D] text-sm">
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#8B4513] font-bold text-xs">15</span>
              Upload a new recipe
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#8B4513] font-bold text-xs">5</span>
              Get 5 likes on your recipe
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#8B4513] font-bold text-xs">2</span>
              Daily login bonus
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#8B4513] font-bold text-xs">3</span>
              Leave a helpful comment
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

