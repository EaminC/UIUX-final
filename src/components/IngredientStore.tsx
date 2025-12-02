import { useState } from 'react';
import { ExternalLink, MapPin, Tag, ChefHat, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Recipe } from '../App';

interface Product {
  id: string;
  name: string;
  store: string;
  price: string;
  discount?: string;
  image: string;
  category: string;
  link: string;
  relatedRecipeIds?: string[]; // Link to recipes that use this ingredient
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Asian Spice Variety Pack',
    store: 'Amazon',
    price: '$12.99',
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1730595442402-0feffe7833c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZXMlMjBoZXJicyUyMGNvb2tpbmd8ZW58MXx8fHwxNzY0NjQ1NDg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Spices',
    link: 'https://amazon.com/spices',
    relatedRecipeIds: ['5', '6', '7'], // Shanghai dishes
  },
  {
    id: '2',
    name: 'Fresh Produce Bundle',
    store: "Trader Joe's",
    price: '$8.99',
    image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzY0NTkyMTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Vegetables',
    link: 'https://traderjoes.com/produce',
    relatedRecipeIds: ['1', '2'], // Dumplings, Butter Chicken
  },
  {
    id: '3',
    name: 'Authentic Asian Sauces Set',
    store: 'Amazon',
    price: '$15.99',
    discount: '15% OFF',
    image: 'https://images.unsplash.com/photo-1760104051489-a8030f560159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGdyb2NlcnklMjBzdG9yZSUyMGluZ3JlZGllbnRzfGVufDF8fHx8MTc2NDY0NTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Sauces',
    link: 'https://amazon.com/asian-sauces',
    relatedRecipeIds: ['5', '7'], // Braised Pork, Scallion Noodles
  },
];

const nearbyStores = [
  { name: "Trader Joe's", distance: '0.8 mi', address: '123 Main St, Chicago, IL' },
  { name: 'H Mart', distance: '1.2 mi', address: '456 Oak Ave, Chicago, IL' },
  { name: 'Whole Foods', distance: '1.5 mi', address: '789 Elm St, Chicago, IL' },
];

interface IngredientStoreProps {
  onStoreClick?: (storeName: string, address: string) => void;
  onRecipeClick?: (recipe: Recipe) => void;
  recipes?: Recipe[];
}

export function IngredientStore({ onStoreClick, onRecipeClick, recipes = [] }: IngredientStoreProps) {
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  const toggleExpand = (productId: string) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  const getRelatedRecipes = (recipeIds: string[]) => {
    return recipes.filter(r => recipeIds.includes(r.id));
  };

  return (
    <div className="max-w-lg mx-auto md:max-w-none md:w-full">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-4 sticky top-0 z-10 md:px-8 md:py-6 md:bg-gradient-to-r md:from-[#FFF8F0] md:to-white md:border-b-2">
        <h1 className="text-[#8B4513] md:text-2xl">Ingredient Store</h1>
        <p className="text-[#A0522D]">Find authentic ingredients nearby</p>
      </header>

      <div className="p-4 space-y-6 md:px-8 md:py-6 md:space-y-8">
        {/* Nearby Stores */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-[#8B4513]" />
            <h2 className="text-[#8B4513]">Stores Near You</h2>
          </div>

          <div className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
            {nearbyStores.map((store, index) => (
              <div
                key={index}
                onClick={() => {
                  if (onStoreClick) {
                    onStoreClick(store.name, store.address);
                  }
                }}
                className="bg-white p-4 rounded-lg border border-[#DEB887] hover:border-[#8B4513] transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-[#8B4513] mb-1">{store.name}</h3>
                    <p className="text-[#A0522D]">{store.address}</p>
                  </div>
                  <Badge className="bg-[#FFE8D6] text-[#8B4513] hover:bg-[#FFE8D6]">
                    {store.distance}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Products */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-[#8B4513]" />
            <h2 className="text-[#8B4513]">Recommended Deals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden border border-[#DEB887] hover:border-[#8B4513] transition-colors"
              >
                <div className="flex gap-4 p-4">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <Badge className="bg-[#FFE8D6] text-[#8B4513] hover:bg-[#FFE8D6] w-fit mb-2">
                      {product.category}
                    </Badge>
                    <h3 className="text-[#8B4513] mb-1">{product.name}</h3>
                    <p className="text-[#A0522D] mb-2">{product.store}</p>

                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-[#8B4513]">{product.price}</span>
                      {product.discount && (
                        <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
                          {product.discount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 space-y-2">
                  <Button
                    className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
                    onClick={() => {
                      if (product.link && product.link !== '#') {
                        window.open(product.link, '_blank');
                      } else {
                        alert(`Product: ${product.name}\nStore: ${product.store}\nPrice: ${product.price}`);
                      }
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Deal
                  </Button>
                  {product.relatedRecipeIds && product.relatedRecipeIds.length > 0 && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full border-[#8B4513] text-[#8B4513] hover:bg-[#FFE8D6]"
                        onClick={() => toggleExpand(product.id)}
                      >
                        <ChefHat className="w-4 h-4 mr-2" />
                        {product.relatedRecipeIds.length} Recipe{product.relatedRecipeIds.length > 1 ? 's' : ''}
                        {expandedProductId === product.id ? (
                          <ChevronUp className="w-4 h-4 ml-auto" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-auto" />
                        )}
                      </Button>
                      
                      {/* Expandable Recipe List */}
                      {expandedProductId === product.id && (
                        <div className="mt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                          {getRelatedRecipes(product.relatedRecipeIds).map((recipe) => (
                            <div
                              key={recipe.id}
                              onClick={() => onRecipeClick?.(recipe)}
                              className="flex items-center gap-3 p-2 bg-[#FFF8F0] rounded-lg border border-[#DEB887] hover:border-[#8B4513] cursor-pointer transition-all hover:shadow-sm"
                            >
                              <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-[#8B4513] font-medium text-sm truncate">{recipe.title}</p>
                                <p className="text-[#A0522D] text-xs">{recipe.cuisine}</p>
                              </div>
                            </div>
                          ))}
                          {getRelatedRecipes(product.relatedRecipeIds).length === 0 && (
                            <p className="text-[#A0522D] text-sm text-center py-2">No recipes found</p>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Recommendations */}
        <div className="bg-gradient-to-r from-[#FFE8D6] to-[#FFDDB8] p-4 rounded-lg border border-[#DEB887]">
          <h3 className="text-[#8B4513] mb-2">💡 Community Tips</h3>
          <p className="text-[#A0522D]">
            "I found authentic Sichuan peppercorns at H Mart! Perfect for mapo tofu." - Wei Z.
          </p>
        </div>
      </div>
    </div>
  );
}
