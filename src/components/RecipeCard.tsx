import { Heart, MessageCircle, Share2 } from 'lucide-react';
import type { Recipe } from '../App';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface RecipeCardProps {
  recipe: Recipe;
  onLike: (recipeId: string) => void;
  onComment?: (recipeId: string) => void;
  onShare?: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, onLike, onComment, onShare }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#DEB887] hover:shadow-md transition-shadow">
      {/* Author Header */}
      <div className="flex items-center gap-3 p-4">
        <Avatar>
          <AvatarImage src={recipe.authorAvatar} alt={recipe.author} />
          <AvatarFallback>{recipe.author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="text-[#8B4513]">{recipe.author}</div>
          <div className="text-[#A0522D]">{recipe.timestamp}</div>
        </div>
        <Badge className="bg-[#FFE8D6] text-[#8B4513] hover:bg-[#FFE8D6]">
          {recipe.cuisine}
        </Badge>
      </div>

      {/* Recipe Image */}
      <div className="relative aspect-square">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Recipe Info */}
      <div className="p-4">
        <h3 className="text-[#8B4513] mb-2">{recipe.title}</h3>
        
        <div className="flex items-center gap-4 text-[#A0522D] mb-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(recipe.id);
            }}
            className="flex items-center gap-1 hover:text-[#8B4513] transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                recipe.isLiked ? 'fill-red-500 text-red-500' : ''
              }`}
            />
            <span>{recipe.likes}</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onComment) onComment(recipe.id);
            }}
            className="flex items-center gap-1 hover:text-[#8B4513] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{recipe.comments}</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onShare) onShare(recipe);
            }}
            className="flex items-center gap-1 hover:text-[#8B4513] transition-colors ml-auto"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Ingredients Preview */}
        <div className="text-[#A0522D]">
          <span>Key ingredients: </span>
          {recipe.ingredients.slice(0, 3).join(', ')}
          {recipe.ingredients.length > 3 && '...'}
        </div>
      </div>
    </div>
  );
}
