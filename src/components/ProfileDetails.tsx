import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, TrendingUp, Award } from 'lucide-react';
import { Button } from './ui/button';
import type { Recipe, User } from '../App';

interface ProfileDetailsProps {
  user: User;
  allRecipes: Recipe[];
  likedRecipes: Recipe[];
  initialTab?: 'recipes' | 'likes' | 'points';
  onBack: () => void;
  onRecipeClick: (recipeId: string) => void;
}

export function ProfileDetails({
  user,
  allRecipes,
  likedRecipes,
  initialTab = 'recipes',
  onBack,
  onRecipeClick,
}: ProfileDetailsProps) {
  const [activeTab, setActiveTab] = useState<'recipes' | 'likes' | 'points'>(initialTab);

  // Update tab when initialTab changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const userRecipes = allRecipes.filter((r) => r.author === user.name);
  const totalLikes = allRecipes
    .filter((r) => r.author === user.name)
    .reduce((sum, r) => sum + r.likes, 0);

  const pointsHistory = [
    { date: '2024-01-15', points: 15, reason: 'Uploaded recipe: Homemade Dumplings' },
    { date: '2024-01-10', points: 15, reason: 'Uploaded recipe: Mapo Tofu' },
    { date: '2024-01-05', points: 15, reason: 'Uploaded recipe: Scallion Pancakes' },
  ];

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#FFF8F0] md:max-w-none md:w-full md:px-4 md:py-2">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-[#A0522D]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[#8B4513] text-lg">
            {activeTab === 'recipes'
              ? 'My Recipes'
              : activeTab === 'likes'
              ? 'My Likes'
              : 'Points History'}
          </h1>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-[#DEB887] px-4">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('recipes')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'recipes'
                ? 'border-[#8B4513] text-[#8B4513]'
                : 'border-transparent text-[#A0522D]'
            }`}
          >
            My Recipes
          </button>
          <button
            onClick={() => setActiveTab('likes')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'likes'
                ? 'border-[#8B4513] text-[#8B4513]'
                : 'border-transparent text-[#A0522D]'
            }`}
          >
            My Likes
          </button>
          <button
            onClick={() => setActiveTab('points')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'points'
                ? 'border-[#8B4513] text-[#8B4513]'
                : 'border-transparent text-[#A0522D]'
            }`}
          >
            Points
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:px-6 md:py-4">
            {activeTab === 'recipes' && (
          <div>
            {userRecipes.length === 0 ? (
              <div className="text-center py-12 text-[#A0522D]">
                <p>You haven't uploaded any recipes yet.</p>
                <Button
                  onClick={onBack}
                  className="mt-4 bg-[#8B4513] hover:bg-[#A0522D] text-white"
                >
                  Create Your First Recipe
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {userRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => onRecipeClick(recipe.id)}
                    className="bg-white rounded-lg overflow-hidden border border-[#DEB887] cursor-pointer hover:border-[#8B4513] transition-colors"
                  >
                    <div className="aspect-square">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-[#8B4513] text-sm mb-1 truncate">{recipe.title}</h3>
                      <div className="flex items-center gap-2 text-[#A0522D] text-xs">
                        <Heart className="w-3 h-3" />
                        <span>{recipe.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'likes' && (
          <div>
            {likedRecipes.length === 0 ? (
              <div className="text-center py-12 text-[#A0522D]">
                <Heart className="w-16 h-16 text-[#DEB887] mx-auto mb-4" />
                <p>You haven't liked any recipes yet.</p>
                <p className="text-sm mt-2">Start exploring and like recipes you enjoy!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {likedRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => onRecipeClick(recipe.id)}
                    className="bg-white rounded-lg overflow-hidden border border-[#DEB887] cursor-pointer hover:border-[#8B4513] transition-colors"
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
                        <h3 className="text-[#8B4513] mb-1">{recipe.title}</h3>
                        <p className="text-[#A0522D] text-sm mb-2">by {recipe.author}</p>
                        <div className="flex items-center gap-2 text-[#A0522D] text-sm">
                          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                          <span>{recipe.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'points' && (
          <div>
            <div className="bg-gradient-to-r from-[#FFE8D6] to-[#FFDDB8] rounded-lg p-6 border border-[#DEB887] mb-6">
              <div className="text-center">
                <div className="text-[#8B4513] text-4xl mb-2">{user.points}</div>
                <div className="text-[#A0522D]">Total Points</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-[#8B4513] mb-4">Points History</h3>
              {pointsHistory.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 border border-[#DEB887]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#8B4513]" />
                      <span className="text-[#8B4513] font-semibold">+{item.points} pts</span>
                    </div>
                    <span className="text-[#A0522D] text-sm">{item.date}</span>
                  </div>
                  <p className="text-[#A0522D] text-sm">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

