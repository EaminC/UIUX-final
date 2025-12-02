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

interface RelatedProduct {
  name: string;
  store: string;
  price: string;
  url: string;
  image: string;
  discount?: string;
}

interface AIRecommendation {
  recipeText: string;
  recipeId: string;
  reason: string;
  relatedProduct: RelatedProduct;
  productReason: string;
}

// Each recommendation includes both a recipe AND a related product
const AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    recipeText: "Based on your love for Shanghai cuisine, I recommend trying our Shanghai Soup Dumplings! The delicate skin and savory broth make it a perfect comfort food. 🥟",
    recipeId: '6',
    reason: "You've been exploring Chinese recipes lately",
    relatedProduct: {
      name: 'Bamboo Steamer Set (10 inch)',
      store: 'Amazon',
      price: '$24.99',
      discount: '30% OFF',
      url: 'https://amazon.com/bamboo-steamer',
      image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80'
    },
    productReason: "Essential tool for making perfect soup dumplings"
  },
  {
    recipeText: "I noticed you enjoyed rich, savory dishes! Try our Shanghai Braised Pork - the caramelized sauce is absolutely divine! 🍖",
    recipeId: '5',
    reason: "Based on your preference for rich, savory dishes",
    relatedProduct: {
      name: 'Shaoxing Cooking Wine (750ml)',
      store: 'H Mart',
      price: '$6.99',
      discount: '15% OFF',
      url: 'https://hmart.com/shaoxing-wine',
      image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=400&q=80'
    },
    productReason: "Key ingredient for authentic braised pork flavor"
  },
  {
    recipeText: "Looking for something quick? Our Scallion Oil Noodles are perfect for a busy weeknight. Simple ingredients, maximum flavor! 🍜",
    recipeId: '7',
    reason: "Quick recipes matching your cooking style",
    relatedProduct: {
      name: 'Premium Light Soy Sauce (1L)',
      store: 'Amazon',
      price: '$7.99',
      discount: '20% OFF',
      url: 'https://amazon.com/soy-sauce',
      image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=400&q=80'
    },
    productReason: "The secret to perfect scallion oil noodles"
  },
  {
    recipeText: "Since you enjoy interactive dishes, try our Homemade Dumplings! Perfect for sharing with friends and family. 🥟",
    recipeId: '1',
    reason: "You enjoy interactive, shareable dishes",
    relatedProduct: {
      name: 'Dumpling Wrappers (Round)',
      store: 'H Mart',
      price: '$3.99',
      url: 'https://hmart.com/wrappers',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'
    },
    productReason: "Fresh wrappers for the best dumpling texture"
  },
];

export function AIRecommendation({ recipes, userName, onRecipeClick }: AIRecommendationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showRecipeCard, setShowRecipeCard] = useState(false);
  const [showProductCard, setShowProductCard] = useState(false);

  const currentRec = AI_RECOMMENDATIONS[currentIndex];
  const fullText = currentRec.recipeText;
  const recommendedRecipe = recipes.find((r) => r.id === currentRec.recipeId);

  useEffect(() => {
    if (!showRecommendation) return;

    // Reset card visibility
    setShowRecipeCard(false);
    setShowProductCard(false);
    
    // Simulate TTFT (Time To First Token) with loading spinner
    setIsLoading(true);
    setDisplayedText('');
    
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setIsTyping(true);
      
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, charIndex));
          charIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
          // Show recipe card after typing finishes
          setTimeout(() => {
            setShowRecipeCard(true);
            // Show product card 500ms after recipe card
            setTimeout(() => {
              setShowProductCard(true);
            }, 500);
          }, 300);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    }, 800 + Math.random() * 700);

    return () => clearTimeout(loadingTimeout);
  }, [fullText, showRecommendation, currentIndex]);

  const handleRefresh = () => {
    setShowRecipeCard(false);
    setShowProductCard(false);
    setCurrentIndex((prev) => (prev + 1) % AI_RECOMMENDATIONS.length);
    setShowRecommendation(true);
  };

  const handleGetRecommendation = () => {
    setShowRecommendation(true);
  };

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
            className="bg-[#8B4513] hover:bg-[#6B3410] text-white shadow-md"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Get AI Recommendation
          </Button>
        </div>
      ) : (
        <>
          {/* AI Text Response */}
          <div className="bg-white rounded-lg p-4 mb-3 min-h-[80px] border border-[#DEB887] flex items-center">
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

          {/* Recipe + Product Cards - appear sequentially */}
          <div className="space-y-3">
            
            {/* Recipe Card - appears first */}
            {showRecipeCard && recommendedRecipe && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 text-[#A0522D] text-sm mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span className="italic">{currentRec.reason}</span>
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
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-[#FFE8D6] text-[#8B4513] hover:bg-[#FFE8D6] text-xs">Recipe</Badge>
                      </div>
                      <h4 className="text-[#8B4513] font-semibold mb-1 truncate">
                        {recommendedRecipe.title}
                      </h4>
                      <p className="text-[#A0522D] text-sm mb-1">
                        by {recommendedRecipe.author}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[#A0522D]">
                        <span>⭐ {recommendedRecipe.rating?.toFixed(1) || 'New'}</span>
                        <span>❤️ {recommendedRecipe.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Related Product Card - appears after recipe */}
            {showProductCard && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 text-[#A0522D] text-sm mb-2">
                  <ShoppingCart className="w-3 h-3" />
                  <span className="italic">{currentRec.productReason}</span>
                </div>
                <div
                  onClick={() => window.open(currentRec.relatedProduct.url, '_blank')}
                  className="bg-white rounded-lg overflow-hidden border border-green-200 cursor-pointer hover:border-green-500 hover:shadow-md transition-all"
                >
                  <div className="flex gap-3 p-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={currentRec.relatedProduct.image}
                        alt={currentRec.relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Related Product
                        </Badge>
                        {currentRec.relatedProduct.discount && (
                          <Badge className="bg-red-100 text-red-600 hover:bg-red-100 text-xs">
                            {currentRec.relatedProduct.discount}
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-[#8B4513] font-semibold text-sm truncate">
                        {currentRec.relatedProduct.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[#A0522D] text-xs">{currentRec.relatedProduct.store}</span>
                          <span className="text-[#8B4513] font-bold text-sm">{currentRec.relatedProduct.price}</span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white text-xs h-7 px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(currentRec.relatedProduct.url, '_blank');
                          }}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Shop
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
