import { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import type { Recipe } from '../App';

interface AIRecommendationProps {
  recipes: Recipe[];
  userName: string;
  onRecipeClick: (recipe: Recipe) => void;
}

const AI_RESPONSES = [
  {
    text: "Based on your love for Shanghai cuisine and recent activity, I recommend trying our Shanghai Soup Dumplings! The delicate skin and savory broth make it a perfect comfort food. 🥟",
    recipeId: '6',
    reason: "You've been exploring Chinese recipes lately"
  },
  {
    text: "I noticed you enjoyed the Butter Chicken! For a similar rich and creamy experience, try our Shanghai Braised Pork. The caramelized sauce is absolutely divine! 🍖",
    recipeId: '5',
    reason: "Based on your preference for rich, savory dishes"
  },
  {
    text: "Looking for something quick and delicious? Our Scallion Oil Noodles are perfect for a busy weeknight. Simple ingredients, maximum flavor! 🍜",
    recipeId: '7',
    reason: "Quick recipes matching your cooking style"
  },
  {
    text: "Since you loved the Street Tacos, you might enjoy our Homemade Dumplings! Both are perfect for sharing with friends and family. 🥟",
    recipeId: '1',
    reason: "You enjoy interactive, shareable dishes"
  },
];

export function AIRecommendation({ recipes, userName, onRecipeClick }: AIRecommendationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const fullText = AI_RESPONSES[currentResponse].text;
  const recommendedRecipeId = AI_RESPONSES[currentResponse].recipeId;
  const reason = AI_RESPONSES[currentResponse].reason;

  useEffect(() => {
    if (!showRecommendation) return;

    // Simulate TTFT (Time To First Token) with loading spinner
    setIsLoading(true);
    setDisplayedText('');
    
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setIsTyping(true);
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 30); // 30ms per character for smooth typing effect

      return () => clearInterval(typingInterval);
    }, 800 + Math.random() * 700); // Random delay between 800-1500ms to simulate real AI

    return () => clearTimeout(loadingTimeout);
  }, [fullText, showRecommendation, currentResponse]);

  const handleRefresh = () => {
    setCurrentResponse((prev) => (prev + 1) % AI_RESPONSES.length);
    setShowRecommendation(true);
  };

  const handleGetRecommendation = () => {
    setShowRecommendation(true);
  };

  const recommendedRecipe = recipes.find((r) => r.id === recommendedRecipeId);

  return (
    <div className="bg-gradient-to-br from-[#FFE8D6] via-[#FFF8F0] to-[#FFE8D6] rounded-lg p-4 border-2 border-[#DEB887] shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-[#8B4513] font-semibold">AI Chef Assistant</h3>
            <p className="text-[#A0522D] text-xs">Personalized for {userName}</p>
          </div>
        </div>
        {showRecommendation && (
          <Button
            onClick={handleRefresh}
            variant="ghost"
            size="sm"
            className="text-[#8B4513] hover:bg-[#FFE8D6]"
            disabled={isTyping || isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${(isTyping || isLoading) ? 'animate-spin' : ''}`} />
          </Button>
        )}
      </div>

      {!showRecommendation ? (
        <div className="text-center py-6">
          <p className="text-[#A0522D] mb-4">
            Get personalized recipe recommendations based on your preferences and cooking history
          </p>
          <Button
            onClick={handleGetRecommendation}
            className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Get AI Recommendation
          </Button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg p-4 mb-3 min-h-[100px] border border-[#DEB887] flex items-center">
            {isLoading ? (
              <div className="flex items-center gap-3 w-full justify-center">
                <div className="w-5 h-5 border-2 border-[#8B4513] border-t-transparent rounded-full animate-spin" />
                <span className="text-[#A0522D] text-sm">Analyzing your preferences...</span>
              </div>
            ) : (
              <p className="text-[#8B4513] leading-relaxed">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-2 h-4 bg-[#8B4513] ml-1 animate-pulse" />
                )}
              </p>
            )}
          </div>

          {!isTyping && !isLoading && recommendedRecipe && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center gap-2 text-[#A0522D] text-sm">
                <Sparkles className="w-3 h-3" />
                <span className="italic">{reason}</span>
              </div>
              
              <div
                onClick={() => onRecipeClick(recommendedRecipe)}
                className="bg-white rounded-lg overflow-hidden border border-[#DEB887] cursor-pointer hover:border-[#8B4513] hover:shadow-md transition-all"
              >
                <div className="flex gap-3 p-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={recommendedRecipe.image}
                      alt={recommendedRecipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#8B4513] font-semibold mb-1 truncate">
                      {recommendedRecipe.title}
                    </h4>
                    <p className="text-[#A0522D] text-sm mb-2">
                      by {recommendedRecipe.author}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#A0522D]">
                      <span>⭐ {recommendedRecipe.rating?.toFixed(1) || 'New'}</span>
                      <span>❤️ {recommendedRecipe.likes}</span>
                      <span>💬 {recommendedRecipe.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

