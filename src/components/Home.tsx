import { Trophy, Star, TrendingUp, Settings } from 'lucide-react';
import { RecipeCard } from './RecipeCard';
import { AIRecommendation } from './AIRecommendation';
import type { Recipe, User } from '../App';
import { Progress } from './ui/progress';

interface HomeProps {
  user: User;
  recipes: Recipe[];
  onLike: (recipeId: string) => void;
  onRecipeClick: (recipe: Recipe) => void;
  onComment?: (recipeId: string) => void;
  onShare?: (recipe: Recipe) => void;
  onSettingsClick?: () => void;
}

export function Home({ user, recipes, onLike, onRecipeClick, onComment, onShare, onSettingsClick }: HomeProps) {

  const pointsToSteak = 100;
  const progressPercentage = (user.points / pointsToSteak) * 100;

  return (
    <div className="max-w-lg mx-auto md:max-w-none md:w-full">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-3 sticky top-0 z-10 md:px-8 md:py-6 md:bg-gradient-to-r md:from-[#FFF8F0] md:to-white md:border-b-2">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-[#8B4513]">Eamin's Kitchen</h1>
            <p className="text-[#A0522D]">Discover recipes from home</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-[#FFE8D6] px-3 py-2 rounded-full">
              <Trophy className="w-5 h-5 text-[#8B4513]" />
              <span className="text-[#8B4513]">{user.points} pts</span>
            </div>
            {onSettingsClick && (
              <button
                onClick={onSettingsClick}
                className="p-2 text-[#8B4513] hover:bg-[#FFE8D6] rounded-full transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        
        {/* Reward Progress */}
        <div className="bg-[#FFF8F0] p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#8B4513]" />
              <span className="text-[#8B4513]">Free Steak Reward</span>
            </div>
            <span className="text-[#A0522D]">{pointsToSteak - user.points} pts to go!</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </header>

      {/* AI Recommendation */}
      <div className="mx-4 mt-3 md:mx-8 md:mt-6">
        <AIRecommendation
          recipes={recipes}
          userName={user.name}
          onRecipeClick={onRecipeClick}
        />
      </div>

      {/* Weekly Challenge */}
      <div className="mx-4 mt-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFDDB8] p-3 rounded-lg border border-[#DEB887] md:mx-8 md:mt-6 md:p-6 md:rounded-xl md:shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-[#8B4513]" />
          </div>
          <div className="flex-1">
            <h3 className="text-[#8B4513] mb-1">Weekly Challenge</h3>
            <p className="text-[#A0522D]">Upload 2 recipes this week to earn 10 bonus points!</p>
            <div className="mt-2 text-[#8B4513]">Progress: 1/2 recipes</div>
          </div>
        </div>
      </div>

      {/* Recipe Feed */}
      <div className="px-4 py-4 md:px-8 md:py-6">
        <h2 className="text-[#8B4513] mb-4 md:mb-6 md:text-2xl">Community Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} onClick={() => onRecipeClick(recipe)} className="cursor-pointer">
              <RecipeCard
                recipe={recipe}
                onLike={onLike}
                onComment={onComment}
                onShare={onShare}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
