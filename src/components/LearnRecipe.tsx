import { useState } from 'react';
import { ArrowLeft, Clock, Users, ChefHat } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import type { Recipe } from '../App';

interface LearnRecipeProps {
  recipes: Recipe[];
  onBack: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export function LearnRecipe({ recipes, onBack, onSelectRecipe }: LearnRecipeProps) {
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');

  const cuisines = ['All', ...Array.from(new Set(recipes.map((r) => r.cuisine)))];

  const filteredRecipes =
    selectedCuisine === 'All'
      ? recipes
      : recipes.filter((r) => r.cuisine === selectedCuisine);

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="text-[#A0522D]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[#8B4513] text-xl">Learn a Recipe</h1>
        </div>

        {/* Cuisine Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(cuisine)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCuisine === cuisine
                  ? 'bg-[#8B4513] text-white'
                  : 'bg-[#FFE8D6] text-[#8B4513]'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </header>

      {/* Recipe List */}
      <div className="p-4 space-y-4">
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-[#DEB887] mx-auto mb-4" />
            <p className="text-[#A0522D]">No recipes found in this category</p>
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#DEB887] cursor-pointer hover:border-[#8B4513] transition-colors"
            >
              <div className="flex gap-4 p-4">
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#8B4513] mb-2">{recipe.title}</h3>
                  <Badge className="bg-[#FFE8D6] text-[#8B4513] hover:bg-[#FFE8D6] mb-2">
                    {recipe.cuisine}
                  </Badge>
                  <div className="flex items-center gap-4 text-[#A0522D] text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>30 min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>4 servings</span>
                    </div>
                  </div>
                  <div className="mt-2 text-[#A0522D] text-sm">
                    {recipe.ingredients.slice(0, 3).join(', ')}...
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}



