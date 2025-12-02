import { Award, ChefHat, Star, Trophy, TrendingUp } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import type { User } from '../App';

interface ProfileProps {
  user: User;
  recipes: import('../App').Recipe[];
  onRecipeClick: (recipeId: string) => void;
  onNavigateToDetails?: (tab: 'recipes' | 'likes' | 'points') => void;
}


const achievements = [
  {
    title: 'First Recipe',
    description: 'Uploaded your first recipe',
    icon: ChefHat,
    earned: true,
  },
  {
    title: 'Early Adopter',
    description: 'Joined the community early',
    icon: Star,
    earned: true,
  },
  {
    title: 'Popular Chef',
    description: 'Get 100 total likes',
    icon: TrendingUp,
    earned: false,
    progress: 75,
  },
  {
    title: 'Recipe Master',
    description: 'Upload 10 recipes',
    icon: Award,
    earned: false,
    progress: 30,
  },
];

export function Profile({ user, recipes, onRecipeClick, onNavigateToDetails }: ProfileProps) {
  const pointsToSteak = 100;
  const progressPercentage = (user.points / pointsToSteak) * 100;

  return (
    <div className="max-w-lg mx-auto md:max-w-none md:w-full">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-4 md:px-8 md:py-6 md:bg-gradient-to-r md:from-[#FFF8F0] md:to-white md:border-b-2">
        <h1 className="text-[#8B4513] md:text-2xl">Profile</h1>
      </header>

      <div className="p-4 space-y-6 md:p-8 md:space-y-8">
        {/* User Info */}
        <div className="bg-white rounded-lg p-6 border border-[#DEB887] md:p-8 md:rounded-xl md:shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-[#8B4513] mb-1">{user.name}</h2>
              <p className="text-[#A0522D] mb-3">From {user.country}</p>
              <div className="flex gap-2">
                {user.badges.map((badge, index) => (
                  <Badge key={index} className="bg-[#FFE8D6] text-[#8B4513] hover:bg-[#FFE8D6]">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#DEB887]">
            <button
              onClick={() => {
                if (onNavigateToDetails) {
                  onNavigateToDetails('recipes');
                } else {
                  window.dispatchEvent(new CustomEvent('profile-navigate', { detail: 'recipes' }));
                }
              }}
              className="text-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="text-[#8B4513] text-2xl mb-1">{user.recipesUploaded}</div>
              <div className="text-[#A0522D]">Recipes</div>
            </button>
            <button
              onClick={() => {
                if (onNavigateToDetails) {
                  onNavigateToDetails('points');
                } else {
                  window.dispatchEvent(new CustomEvent('profile-navigate', { detail: 'points' }));
                }
              }}
              className="text-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="text-[#8B4513] text-2xl mb-1">{user.points}</div>
              <div className="text-[#A0522D]">Points</div>
            </button>
            <button
              onClick={() => {
                if (onNavigateToDetails) {
                  onNavigateToDetails('likes');
                } else {
                  window.dispatchEvent(new CustomEvent('profile-navigate', { detail: 'likes' }));
                }
              }}
              className="text-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="text-[#8B4513] text-2xl mb-1">
                {recipes.reduce((sum, r) => sum + (r.isLiked ? 1 : 0), 0)}
              </div>
              <div className="text-[#A0522D]">Likes</div>
            </button>
          </div>
        </div>

        {/* Reward Progress */}
        <div className="bg-gradient-to-r from-[#FFE8D6] to-[#FFDDB8] rounded-lg p-6 border border-[#DEB887] md:p-8 md:rounded-xl md:shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-[#8B4513]" />
            </div>
            <div>
              <h3 className="text-[#8B4513]">Free Premium Steak</h3>
              <p className="text-[#A0522D]">{pointsToSteak - user.points} points to go!</p>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-[#8B4513] mb-4">Achievements</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-4 border ${
                    achievement.earned
                      ? 'border-[#8B4513] bg-[#FFF8F0]'
                      : 'border-[#DEB887]'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                      achievement.earned ? 'bg-[#FFE8D6]' : 'bg-gray-100'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        achievement.earned ? 'text-[#8B4513]' : 'text-gray-400'
                      }`}
                    />
                  </div>
                  <h3
                    className={`mb-1 ${
                      achievement.earned ? 'text-[#8B4513]' : 'text-gray-600'
                    }`}
                  >
                    {achievement.title}
                  </h3>
                  <p className="text-[#A0522D]">{achievement.description}</p>
                  {!achievement.earned && achievement.progress && (
                    <div className="mt-3">
                      <Progress value={achievement.progress} className="h-2" />
                      <div className="text-[#A0522D] text-right mt-1">
                        {achievement.progress}%
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* My Recipes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#8B4513]">My Recipes</h2>
            {recipes.length > 0 && (
              <button
                onClick={() => {
                  if (onNavigateToDetails) {
                    onNavigateToDetails('recipes');
                  } else {
                    window.dispatchEvent(new CustomEvent('profile-navigate', { detail: 'recipes' }));
                  }
                }}
                className="text-[#A0522D] text-sm hover:text-[#8B4513]"
              >
                View All
              </button>
            )}
          </div>
          {recipes.length === 0 ? (
            <div className="text-center py-8 text-[#A0522D]">
              <p>You haven't uploaded any recipes yet.</p>
              <p className="text-sm mt-2">Start sharing your favorite dishes!</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
              {recipes.slice(0, 6).map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => onRecipeClick(recipe.id)}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-2">
                    <div className="text-white text-xs truncate">{recipe.title}</div>
                    <div className="text-white text-xs">♥ {recipe.likes}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
