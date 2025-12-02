import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, MessageCircle, Share2, Star, Clock, Users, ExternalLink, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { StarRating } from './StarRating';
import { Comments } from './Comments';
import type { Recipe, Comment, User } from '../App';

interface RecipeDetailProps {
  recipe: Recipe;
  comments: Comment[];
  currentUser: User;
  onBack: () => void;
  onLike: (recipeId: string) => void;
  onRate: (recipeId: string, rating: number) => void;
  onComment?: (recipeId: string) => void;
  onShare?: (recipe: Recipe) => void;
  onAddComment: (recipeId: string, text: string) => void;
  onLikeComment: (commentId: string) => void;
}

export function RecipeDetail({
  recipe,
  comments,
  currentUser,
  onBack,
  onLike,
  onRate,
  onComment,
  onShare,
  onAddComment,
  onLikeComment,
}: RecipeDetailProps) {
  const [userRating, setUserRating] = useState(recipe.userRating || 0);

  // Sync userRating when recipe changes
  useEffect(() => {
    setUserRating(recipe.userRating || 0);
  }, [recipe.userRating]);

  const handleRate = (rating: number) => {
    setUserRating(rating);
    onRate(recipe.id, rating);
  };

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#FFF8F0] md:max-w-none md:w-full">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-4 sticky top-0 z-10 md:px-8 md:py-6 md:bg-gradient-to-r md:from-[#FFF8F0] md:to-white md:border-b-2">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-[#A0522D]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[#8B4513] text-lg">Recipe Details</h1>
        </div>
      </header>

      <div className="pb-20">
        {/* Recipe Image */}
        <div className="relative aspect-square">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Recipe Info */}
        <div className="p-4 space-y-6 md:p-6 md:max-w-3xl md:mx-auto">
          {/* Author Header */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={recipe.authorAvatar} alt={recipe.author} />
              <AvatarFallback>{recipe.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-[#8B4513] font-semibold">{recipe.author}</div>
              <div className="text-[#A0522D] text-sm">{recipe.timestamp}</div>
            </div>
            <Badge className="bg-[#FFE8D6] text-[#8B4513] hover:bg-[#FFE8D6]">
              {recipe.cuisine}
            </Badge>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-[#8B4513] text-2xl mb-2">{recipe.title}</h2>
            <div className="flex items-center gap-4 text-[#A0522D]">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>30 min</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>4 servings</span>
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <div className="bg-white rounded-lg p-4 border border-[#DEB887]">
            <h3 className="text-[#8B4513] mb-3">Rate this dish!</h3>
            <div className="flex items-center gap-3">
              <StarRating rating={userRating} onRate={handleRate} size="lg" />
              {userRating > 0 && (
                <span className="text-[#8B4513] font-semibold">{userRating}/5</span>
              )}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-[#8B4513] text-xl mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2 text-[#A0522D]">
                  <span className="text-[#8B4513] mt-1">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cooking Steps */}
          <div>
            <h3 className="text-[#8B4513] text-xl mb-3">Instructions</h3>
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <div className="w-8 h-8 bg-[#FFE8D6] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#8B4513] font-semibold">{index + 1}</span>
                  </div>
                  <p className="text-[#A0522D] flex-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Product Links */}
          {recipe.productLinks && recipe.productLinks.length > 0 && (
            <div>
              <h3 className="text-[#8B4513] text-xl mb-3 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Shop Ingredients
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipe.productLinks.map((product, index) => (
                  <a
                    key={index}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white p-3 rounded-lg border border-[#DEB887] hover:border-[#8B4513] hover:shadow-md transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[#8B4513] font-medium text-sm truncate">{product.name}</div>
                      <div className="text-[#A0522D] text-xs flex items-center gap-2">
                        <span>{product.store}</span>
                        <span>•</span>
                        <span className="font-semibold text-green-600">{product.price}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#8B4513] ml-2 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#DEB887]">
            <button
              onClick={() => onLike(recipe.id)}
              className="flex items-center gap-2 text-[#A0522D] hover:text-[#8B4513] transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  recipe.isLiked ? 'fill-red-500 text-red-500' : ''
                }`}
              />
              <span>{recipe.likes}</span>
            </button>

            <button
              onClick={() => {
                setTimeout(() => {
                  const commentsSection = document.getElementById('comments-section');
                  if (commentsSection) {
                    commentsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="flex items-center gap-2 text-[#A0522D] hover:text-[#8B4513] transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              <span>{recipe.comments}</span>
            </button>

            <button
              onClick={() => {
                if (onShare) onShare(recipe);
              }}
              className="flex items-center gap-2 text-[#A0522D] hover:text-[#8B4513] transition-colors ml-auto"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          {/* Comments Section */}
          <div className="pt-6 border-t border-[#DEB887]">
            <Comments
              recipeId={recipe.id}
              comments={comments}
              currentUserName={currentUser.name}
              currentUserAvatar={currentUser.avatar}
              onAddComment={onAddComment}
              onLikeComment={onLikeComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

