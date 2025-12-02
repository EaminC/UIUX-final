import { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { Input } from './ui/input';
import { RecipeCard } from './RecipeCard';
import type { Recipe } from '../App';

interface SearchProps {
  recipes: Recipe[];
  onLike: (recipeId: string) => void;
  onBack: () => void;
  onRecipeClick?: (recipe: Recipe) => void;
  onComment?: (recipeId: string) => void;
  onShare?: (recipe: Recipe) => void;
}

export function Search({ recipes, onLike, onBack, onRecipeClick, onComment, onShare }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredRecipes(recipes);
      return;
    }

    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.cuisine.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(query.toLowerCase())) ||
        recipe.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#FFF8F0] md:max-w-none md:w-full md:px-4 md:py-2">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-[#A0522D]">
            <X className="w-6 h-6" />
          </button>
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search recipes, ingredients, cuisines..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pr-10 border-[#DEB887] focus:border-[#8B4513]"
            />
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A0522D]" />
          </div>
        </div>
      </header>

      {/* Search Results */}
      <div className="p-4 md:px-6 md:py-4">
        {searchQuery && (
          <div className="mb-4 text-[#A0522D]">
            Found {filteredRecipes.length} result{filteredRecipes.length !== 1 ? 's' : ''}
          </div>
        )}

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-[#DEB887] mx-auto mb-4" />
            <p className="text-[#A0522D]">
              {searchQuery ? 'No recipes found. Try a different search term.' : 'Start searching for recipes...'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 lg:gap-5">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => {
                  if (onRecipeClick) onRecipeClick(recipe);
                }}
                className="cursor-pointer"
              >
                <RecipeCard
                  recipe={recipe}
                  onLike={onLike}
                  onComment={onComment}
                  onShare={onShare}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

