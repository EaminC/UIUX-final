import { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Recipe } from '../App';

interface ManageRecipesProps {
  userRecipes: Recipe[];
  onBack: () => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipeId: string) => void;
  onView: (recipe: Recipe) => void;
}

export function ManageRecipes({
  userRecipes,
  onBack,
  onEdit,
  onDelete,
  onView,
}: ManageRecipesProps) {
  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-[#A0522D]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[#8B4513] text-xl">Manage Recipes</h1>
        </div>
      </header>

      {/* Recipe List */}
      <div className="p-4">
        {userRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#A0522D] mb-4">You haven't uploaded any recipes yet</p>
            <Button
              onClick={onBack}
              className="bg-[#8B4513] hover:bg-[#A0522D] text-white"
            >
              Create Your First Recipe
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {userRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#DEB887]"
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
                    <div className="text-[#A0522D] text-sm mb-3">
                      {recipe.likes} likes • {recipe.comments} comments
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onView(recipe)}
                        className="border-[#DEB887] text-[#8B4513] hover:bg-[#FFE8D6]"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(recipe)}
                        className="border-[#DEB887] text-[#8B4513] hover:bg-[#FFE8D6]"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(recipe.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



