import { ArrowLeft, Star, Gift, Lock, Check, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import type { User } from '../App';

interface RewardsSystemProps {
  user: User;
  onBack: () => void;
}

// Level definitions with rewards
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
    color: 'from-amber-400 to-amber-600',
    starColor: 'text-amber-500',
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
    color: 'from-orange-400 to-orange-600',
    starColor: 'text-orange-500',
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
    color: 'from-rose-400 to-rose-600',
    starColor: 'text-rose-500',
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
    color: 'from-purple-400 to-purple-600',
    starColor: 'text-purple-500',
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
    color: 'from-emerald-400 to-emerald-600',
    starColor: 'text-emerald-500',
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
        {/* Current Status Card - Starbucks Style */}
        <div className={`bg-gradient-to-br ${currentLevel.color} rounded-2xl p-6 text-white shadow-lg`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {[...Array(currentLevel.level)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-white" />
                ))}
              </div>
              <h2 className="text-2xl font-bold">{currentLevel.name}</h2>
              <p className="text-white/80">Level {currentLevel.level}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{user.points}</div>
              <div className="text-white/80 text-sm">Total Points</div>
            </div>
          </div>

          {nextLevel && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{pointsInCurrentLevel} / {pointsNeededForNextLevel} points</span>
                <span>{pointsToNextLevel} to {nextLevel.name}</span>
              </div>
              <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Current & Next Reward */}
        <div className="grid grid-cols-2 gap-4">
          {/* Current Reward (Earned) */}
          <div className="bg-white rounded-xl border-2 border-green-500 overflow-hidden shadow-md">
            <div className="bg-green-500 text-white text-center py-1 text-sm font-medium">
              <Check className="w-4 h-4 inline mr-1" />
              Earned
            </div>
            <div className="p-4">
              <div className="aspect-square rounded-lg overflow-hidden mb-3">
                <img 
                  src={currentLevel.reward.image} 
                  alt={currentLevel.reward.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[#8B4513] font-semibold text-sm truncate">{currentLevel.reward.name}</h3>
              <p className="text-[#A0522D] text-xs">{currentLevel.reward.description}</p>
              <Button 
                className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white text-sm"
                size="sm"
              >
                <Gift className="w-4 h-4 mr-1" />
                Claim Reward
              </Button>
            </div>
          </div>

          {/* Next Reward (Locked) */}
          {nextLevel ? (
            <div className="bg-white rounded-xl border-2 border-[#DEB887] overflow-hidden shadow-md relative">
              <div className="bg-[#DEB887] text-[#8B4513] text-center py-1 text-sm font-medium">
                <Lock className="w-4 h-4 inline mr-1" />
                {pointsToNextLevel} pts to unlock
              </div>
              <div className="p-4">
                <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                  <img 
                    src={nextLevel.reward.image} 
                    alt={nextLevel.reward.name}
                    className="w-full h-full object-cover grayscale opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="text-[#8B4513] font-semibold text-sm truncate">{nextLevel.reward.name}</h3>
                <p className="text-[#A0522D] text-xs">{nextLevel.reward.description}</p>
                <div className="mt-3 text-center">
                  <span className="text-[#A0522D] text-sm">Level {nextLevel.level} reward</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl overflow-hidden shadow-md flex items-center justify-center p-4">
              <div className="text-center text-white">
                <Star className="w-12 h-12 mx-auto mb-2 fill-white" />
                <h3 className="font-bold">Max Level!</h3>
                <p className="text-sm text-white/80">You've reached the top!</p>
              </div>
            </div>
          )}
        </div>

        {/* All Levels Progress */}
        <div className="bg-white rounded-xl border border-[#DEB887] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#DEB887] bg-[#FFF8F0]">
            <h3 className="text-[#8B4513] font-semibold">Level Progress</h3>
          </div>
          <div className="p-4 space-y-4">
            {LEVELS.map((level, index) => {
              const isUnlocked = user.points >= level.minPoints;
              const isCurrent = index === currentLevelIndex;
              
              return (
                <div key={level.level} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isUnlocked 
                      ? `bg-gradient-to-br ${level.color} text-white` 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {isUnlocked ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${isUnlocked ? 'text-[#8B4513]' : 'text-gray-400'}`}>
                        {level.name}
                      </span>
                      {isCurrent && (
                        <span className="text-xs bg-[#FFE8D6] text-[#8B4513] px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#A0522D]">{level.minPoints} points</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img 
                      src={level.reward.image} 
                      alt={level.reward.name}
                      className={`w-10 h-10 rounded-lg object-cover ${!isUnlocked ? 'grayscale opacity-50' : ''}`}
                    />
                    <ChevronRight className={`w-4 h-4 ${isUnlocked ? 'text-[#8B4513]' : 'text-gray-300'}`} />
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

