import { Button } from './ui/button';
import { ChefHat, BookOpen, ShoppingBag, Settings } from 'lucide-react';
import logoImage from 'figma:asset/25e052c30c60417278690aee9375257caca59348.png';

interface MenuProps {
  userName: string;
  onMakeRecipe: () => void;
  onLearnRecipe: () => void;
  onBuyIngredients: () => void;
  onManageRecipes: () => void;
}

export function Menu({
  userName,
  onMakeRecipe,
  onLearnRecipe,
  onBuyIngredients,
  onManageRecipes,
}: MenuProps) {
  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
      {/* Status Bar Placeholder */}
      <div className="h-16 bg-white" />

      {/* Header */}
      <header className="bg-white px-4 py-4 border-b border-[#DEB887]">
        <div className="flex items-center gap-3">
          <img src={logoImage} alt="Logo" className="w-20 h-20 rounded-lg" />
          <div>
            <h1 className="text-[#8B4513] text-lg">Welcome! {userName}!</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-[#8B4513] text-2xl mb-2">Now You Want to:</h2>
          </div>

          <div className="space-y-4">
            <Button
              onClick={onMakeRecipe}
              className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white h-14 text-lg"
            >
              <ChefHat className="w-5 h-5 mr-2" />
              Make a recipe
            </Button>

            <Button
              onClick={onLearnRecipe}
              className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white h-14 text-lg"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Learn a recipe
            </Button>

            <Button
              onClick={onBuyIngredients}
              className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white h-14 text-lg"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Buy Ingredients
            </Button>

            <Button
              onClick={onManageRecipes}
              className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white h-14 text-lg"
            >
              <Settings className="w-5 h-5 mr-2" />
              Manage recipes
            </Button>
          </div>
        </div>
      </div>

      {/* Home Indicator Placeholder */}
      <div className="h-8 bg-white" />
    </div>
  );
}


