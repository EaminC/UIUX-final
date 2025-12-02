import { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, ExternalLink, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Recipe } from '../App';

interface AIRecommendationProps {
  recipes: Recipe[];
  userName: string;
  onRecipeClick: (recipe: Recipe) => void;
}

interface ProductRecommendation {
  name: string;
  store: string;
  price: string;
  url: string;
  image: string;
  discount?: string;
}

type AIResponse = {
  text: string;
  reason: string;
  type: 'recipe';
  recipeId: string;
} | {
  text: string;
  reason: string;
  type: 'product';
  product: ProductRecommendation;
};

const AI_RESPONSES: AIResponse[] = [
  {
    text: "Based on your love for Shanghai cuisine and recent activity, I recommend trying our Shanghai Soup Dumplings! The delicate skin and savory broth make it a perfect comfort food. 🥟",
    recipeId: '6',
    type: 'recipe',
    reason: "You've been exploring Chinese recipes lately"
  },
  {
    text: "I found a great deal for you! This Shaoxing Cooking Wine is essential for authentic Chinese cooking. It's on sale at H Mart and perfect for your braised pork recipe! 🍶",
    type: 'product',
    product: {
      name: 'Shaoxing Cooking Wine (750ml)',
      store: 'H Mart',
      price: '$6.99',
      discount: '15% OFF',
      url: 'https://hmart.com/shaoxing-wine',
      image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=400&q=80'
    },
    reason: "Essential ingredient for your favorite Shanghai dishes"
  },
  {
    text: "I noticed you enjoyed the Butter Chicken! For a similar rich and creamy experience, try our Shanghai Braised Pork. The caramelized sauce is absolutely divine! 🍖",
    recipeId: '5',
    type: 'recipe',
    reason: "Based on your preference for rich, savory dishes"
  },
  {
    text: "Stock up on this premium Soy Sauce! It's the secret to authentic Asian flavors. Amazon has it at a great price right now. 🥢",
    type: 'product',
    product: {
      name: 'Kikkoman Soy Sauce (1L)',
      store: 'Amazon',
      price: '$7.99',
      discount: '20% OFF',
      url: 'https://amazon.com/soy-sauce',
      image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=400&q=80'
    },
    reason: "Top-rated ingredient in your saved recipes"
  },
  {
    text: "Looking for something quick and delicious? Our Scallion Oil Noodles are perfect for a busy weeknight. Simple ingredients, maximum flavor! 🍜",
    recipeId: '7',
    type: 'recipe',
    reason: "Quick recipes matching your cooking style"
  },
  {
    text: "Perfect for your dumpling adventures! These bamboo steamers are highly rated and on sale. A must-have for authentic soup dumplings! 🎋",
    type: 'product',
    product: {
      name: 'Bamboo Steamer Set (10 inch)',
      store: 'Amazon',
      price: '$24.99',
      discount: '30% OFF',
      url: 'https://amazon.com/bamboo-steamer',
      image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80'
    },
    reason: "Perfect tool for your soup dumpling recipe"
  },
  {
    text: "Since you loved the Street Tacos, you might enjoy our Homemade Dumplings! Both are perfect for sharing with friends and family. 🥟",
    recipeId: '1',
    type: 'recipe',
    reason: "You enjoy interactive, shareable dishes"
  },
];

export function AIRecommendation({ recipes, userName, onRecipeClick }: AIRecommendationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Start with a random response to mix recipes and products
  const [currentResponse, setCurrentResponse] = useState(() => Math.floor(Math.random() * AI_RESPONSES.length));
  const [showRecommendation, setShowRecommendation] = useState(false);

  const currentAIResponse = AI_RESPONSES[currentResponse];
  const fullText = currentAIResponse.text;
  const reason = currentAIResponse.reason;
  const isRecipeRecommendation = currentAIResponse.type === 'recipe';
  const recommendedRecipeId = isRecipeRecommendation ? currentAIResponse.recipeId : null;
  const recommendedProduct = !isRecipeRecommendation ? currentAIResponse.product : null;

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

          {!isTyping && !isLoading && (recommendedRecipe || recommendedProduct) && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center gap-2 text-[#A0522D] text-sm">
                {isRecipeRecommendation ? (
                  <Sparkles className="w-3 h-3" />
                ) : (
                  <ShoppingCart className="w-3 h-3" />
                )}
                <span className="italic">{reason}</span>
              </div>
              
              {/* Recipe Recommendation Card */}
              {isRecipeRecommendation && recommendedRecipe && (
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
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-[#FFE8D6] text-[#8B4513] hover:bg-[#FFE8D6] text-xs">Recipe</Badge>
                      </div>
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
              )}

              {/* Product Recommendation Card */}
              {!isRecipeRecommendation && recommendedProduct && (
                <div
                  onClick={() => window.open(recommendedProduct.url, '_blank')}
                  className="bg-white rounded-lg overflow-hidden border border-[#DEB887] cursor-pointer hover:border-[#8B4513] hover:shadow-md transition-all"
                >
                  <div className="flex gap-3 p-3">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={recommendedProduct.image}
                        alt={recommendedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Product
                        </Badge>
                        {recommendedProduct.discount && (
                          <Badge className="bg-red-100 text-red-600 hover:bg-red-100 text-xs">
                            {recommendedProduct.discount}
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-[#8B4513] font-semibold mb-1 truncate">
                        {recommendedProduct.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#A0522D] text-sm">{recommendedProduct.store}</p>
                          <p className="text-[#8B4513] font-bold">{recommendedProduct.price}</p>
                        </div>
                        <Button
                          size="sm"
                          className="bg-[#8B4513] hover:bg-[#A0522D] text-white text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(recommendedProduct.url, '_blank');
                          }}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Shop
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

