import { useState } from 'react';
import { Camera, X, Plus, Trash2, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface UploadRecipeProps {
  onComplete: (points: number) => void;
  onCancel: () => void;
}

// Preset food photos for Beta AI generation
const PRESET_FOOD_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80',
    title: 'Japanese Ramen',
    cuisine: 'Japanese',
    mealType: 'lunch' as const,
    ingredients: ['Ramen noodles', 'Pork belly', 'Soft-boiled egg', 'Green onions', 'Nori seaweed', 'Miso paste', 'Chicken broth'],
    steps: ['Prepare rich chicken broth with miso paste', 'Cook ramen noodles according to package', 'Slice and sear pork belly until crispy', 'Soft-boil eggs for 6-7 minutes', 'Assemble bowl with noodles, broth, and toppings', 'Garnish with green onions and nori']
  },
  {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    title: 'Margherita Pizza',
    cuisine: 'Italian',
    mealType: 'dinner' as const,
    ingredients: ['Pizza dough', 'San Marzano tomatoes', 'Fresh mozzarella', 'Fresh basil', 'Olive oil', 'Sea salt', 'Garlic'],
    steps: ['Stretch pizza dough into a round shape', 'Spread crushed tomatoes evenly', 'Add torn mozzarella pieces', 'Drizzle with olive oil', 'Bake at 450°F for 12-15 minutes', 'Top with fresh basil leaves']
  },
  {
    url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    title: 'Thai Green Curry',
    cuisine: 'Thai',
    mealType: 'dinner' as const,
    ingredients: ['Chicken breast', 'Green curry paste', 'Coconut milk', 'Thai basil', 'Bamboo shoots', 'Bell peppers', 'Fish sauce', 'Palm sugar'],
    steps: ['Heat coconut cream and fry curry paste until fragrant', 'Add chicken and cook until white', 'Pour in remaining coconut milk', 'Add vegetables and simmer', 'Season with fish sauce and palm sugar', 'Garnish with Thai basil']
  },
  {
    url: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&q=80',
    title: 'French Croissant',
    cuisine: 'French',
    mealType: 'breakfast' as const,
    ingredients: ['All-purpose flour', 'Butter', 'Milk', 'Sugar', 'Salt', 'Active dry yeast', 'Egg wash'],
    steps: ['Make dough and let it rest overnight', 'Laminate dough with butter layers', 'Fold and roll multiple times', 'Cut into triangles and roll into crescents', 'Proof until doubled in size', 'Brush with egg wash and bake at 375°F']
  },
  {
    url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
    title: 'Korean Bibimbap',
    cuisine: 'Korean',
    mealType: 'lunch' as const,
    ingredients: ['Rice', 'Beef bulgogi', 'Spinach', 'Bean sprouts', 'Carrots', 'Zucchini', 'Fried egg', 'Gochujang sauce', 'Sesame oil'],
    steps: ['Cook rice and keep warm', 'Marinate and cook beef bulgogi', 'Blanch and season vegetables separately', 'Arrange rice in bowl', 'Top with vegetables and beef in sections', 'Add fried egg and gochujang sauce']
  },
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    title: 'Mediterranean Salad',
    cuisine: 'Mediterranean',
    mealType: 'lunch' as const,
    ingredients: ['Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Feta cheese', 'Kalamata olives', 'Red onion', 'Olive oil', 'Lemon juice'],
    steps: ['Wash and dry all vegetables', 'Chop vegetables into bite-sized pieces', 'Crumble feta cheese', 'Combine all ingredients in a large bowl', 'Whisk olive oil and lemon juice', 'Toss salad with dressing just before serving']
  },
  {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    title: 'Classic Burger',
    cuisine: 'American',
    mealType: 'dinner' as const,
    ingredients: ['Ground beef', 'Burger buns', 'Cheddar cheese', 'Lettuce', 'Tomato', 'Onion', 'Pickles', 'Special sauce'],
    steps: ['Form beef into patties and season with salt and pepper', 'Grill patties for 4-5 minutes per side', 'Add cheese in last minute to melt', 'Toast burger buns on the grill', 'Assemble with lettuce, tomato, onion', 'Top with pickles and special sauce']
  }
];

export function UploadRecipe({ onComplete, onCancel }: UploadRecipeProps) {
  const [step, setStep] = useState(0); // Start at 0 for mode selection
  const [useBetaMode, setUseBetaMode] = useState(false);
  const [showPhotoSelector, setShowPhotoSelector] = useState(false);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number | null>(null);
  const [photo, setPhoto] = useState<string>('');
  const [title, setTitle] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | ''>('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<string[]>(['']);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setShowCelebration(true);
    setTimeout(() => {
      onComplete(15); // Award 15 points
    }, 2000);
  };

  const canProceedToStep2 = photo && title && cuisine && mealType;
  const canProceedToStep3 = ingredients.some(i => i.trim());
  const canSubmit = steps.some(s => s.trim());

  // AI generation animation helper
  const runAIGeneration = (photoUrl: string, recipe: typeof PRESET_FOOD_PHOTOS[0]) => {
    setPhoto(photoUrl);
    setShowPhotoSelector(false);
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate progressive AI analysis with multiple stages
    const stages = [
      { progress: 15, delay: 400 },
      { progress: 35, delay: 800 },
      { progress: 55, delay: 1200 },
      { progress: 75, delay: 1800 },
      { progress: 90, delay: 2400 },
      { progress: 100, delay: 3000 },
    ];
    
    stages.forEach(({ progress, delay }) => {
      setTimeout(() => setGenerationProgress(progress), delay);
    });
    
    // Complete after 3.5 seconds
    setTimeout(() => {
      // Auto-fill all fields based on recipe
      setTitle(recipe.title);
      setCuisine(recipe.cuisine);
      setMealType(recipe.mealType);
      setIngredients(recipe.ingredients);
      setSteps(recipe.steps);
      
      setIsGenerating(false);
      setGenerationProgress(0);
      setStep(4); // Skip directly to review step (no manual input needed)
    }, 3500);
  };

  const handleSelectPresetPhoto = (index: number) => {
    setSelectedPresetIndex(index);
    const selectedRecipe = PRESET_FOOD_PHOTOS[index];
    runAIGeneration(selectedRecipe.url, selectedRecipe);
  };

  // Handle local photo upload in Beta mode - always generates 红烧肉 recipe
  const handleBetaLocalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoUrl = reader.result as string;
        // Use 红烧肉 (Braised Pork) as the default AI-generated recipe for local uploads
        const defaultRecipe = {
          url: photoUrl,
          title: 'Homestyle Braised Pork (红烧肉)',
          cuisine: 'Chinese',
          mealType: 'dinner' as const,
          ingredients: ['Pork belly 500g', 'Rock sugar 30g', 'Light soy sauce 2 tbsp', 'Dark soy sauce 1 tbsp', 'Shaoxing wine 2 tbsp', 'Ginger slices', 'Star anise 2 pcs', 'Cinnamon stick', 'Green onions'],
          steps: [
            'Cut pork belly into 3cm cubes, blanch in boiling water for 3 minutes',
            'Heat wok with oil, add rock sugar and melt until caramelized',
            'Add pork cubes and stir-fry until evenly coated with caramel',
            'Add ginger, star anise, cinnamon, and green onions',
            'Pour in soy sauces and Shaoxing wine, add hot water to cover',
            'Bring to boil, then simmer on low heat for 1.5 hours until tender',
            'Turn up heat to reduce sauce until thick and glossy'
          ]
        };
        runAIGeneration(photoUrl, defaultRecipe);
      };
      reader.readAsDataURL(file);
    }
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-[#FFE8D6] to-[#FFDDB8] rounded-full flex items-center justify-center mb-6 mx-auto animate-bounce">
            <Sparkles className="w-16 h-16 text-[#8B4513]" />
          </div>
          <h2 className="text-[#8B4513] mb-4">Recipe Uploaded! 🎉</h2>
          <div className="text-[#A0522D] mb-2">You earned 15 points!</div>
          <div className="text-[#8B4513] text-4xl">+15 pts</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button onClick={onCancel} className="text-[#A0522D]">
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-[#8B4513]">Upload Recipe</h2>
          <div className="w-6" />
        </div>
        
        {/* Progress Steps */}
        {step > 0 && (
          <>
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    i === step
                      ? 'bg-[#8B4513]'
                      : i < step
                      ? 'bg-[#A0522D]'
                      : 'bg-[#DEB887]'
                  }`}
                />
              ))}
            </div>
            <div className="text-center mt-2 text-[#A0522D]">
              {useBetaMode && step === 4 ? 'AI Generated - Review' : `Step ${step} of 4`}
            </div>
          </>
        )}
      </header>

      <div className="p-4">
        {/* Step 0: Mode Selection */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-[#8B4513] mb-2">Choose Upload Mode</h3>
              <p className="text-[#A0522D]">How would you like to create your recipe?</p>
            </div>

            {/* Manual Mode */}
            <button
              onClick={() => {
                setUseBetaMode(false);
                setStep(1);
              }}
              className="w-full p-6 bg-white border-2 border-[#DEB887] rounded-lg hover:border-[#8B4513] transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFE8D6] rounded-full flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6 text-[#8B4513]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#8B4513] font-semibold mb-2">Manual Upload</h4>
                  <p className="text-[#A0522D] text-sm">
                    Upload your photo and fill in recipe details step by step
                  </p>
                </div>
              </div>
            </button>

            {/* Beta AI Mode */}
            <button
              onClick={() => {
                setUseBetaMode(true);
                setStep(1);
              }}
              className="w-full p-6 bg-gradient-to-br from-[#FFE8D6] to-[#FFDDB8] border-2 border-[#8B4513] rounded-lg hover:shadow-lg transition-all text-left relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 bg-[#8B4513] text-white text-xs px-2 py-1 rounded-full">
                BETA
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#8B4513] font-semibold mb-2">AI Auto-Generate ✨</h4>
                  <p className="text-[#A0522D] text-sm">
                    Select a food photo and let AI generate the complete recipe
                  </p>
                  <p className="text-[#8B4513] text-xs mt-2 italic">
                    Choose from preset photos for demo stability
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Step 1: Photo and Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[#8B4513] mb-4">
                {useBetaMode ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Select a photo for AI analysis
                  </span>
                ) : (
                  "Let's start with a photo"
                )}
              </h3>
              
              {/* AI Generation Loading - inline */}
              {isGenerating && (
                <div className="bg-white rounded-lg p-6 border-2 border-[#8B4513] text-center">
                  <div className="w-12 h-12 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <h4 className="text-[#8B4513] mb-1 text-sm font-semibold">
                    {generationProgress < 30 && "Analyzing image..."}
                    {generationProgress >= 30 && generationProgress < 60 && "Identifying ingredients..."}
                    {generationProgress >= 60 && generationProgress < 90 && "Generating recipe steps..."}
                    {generationProgress >= 90 && "Finalizing recipe..."}
                  </h4>
                  <p className="text-[#A0522D] text-xs mb-3">AI is working its magic ✨</p>
                  <div className="w-full bg-[#FFE8D6] rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] h-full rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                  <p className="text-[#A0522D] text-xs mt-1">{generationProgress}%</p>
                </div>
              )}

              {/* Photo display or selector */}
              {!isGenerating && photo ? (
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={photo} alt="Recipe" className="w-full h-full object-cover" />
                  {useBetaMode && (
                    <div className="absolute top-2 left-2 bg-[#8B4513] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      BETA
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setPhoto('');
                      setSelectedPresetIndex(null);
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg"
                  >
                    <X className="w-5 h-5 text-[#8B4513]" />
                  </button>
                </div>
              ) : !isGenerating && useBetaMode ? (
                <div className="space-y-3">
                  {/* Collapsed state - click to expand */}
                  {!showPhotoSelector ? (
                    <div className="space-y-3">
                      {/* Preset photos option */}
                      <button
                        onClick={() => setShowPhotoSelector(true)}
                        className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-[#FFE8D6] to-[#FFDDB8] border-2 border-[#8B4513] rounded-lg hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <span className="text-[#8B4513] font-semibold block">Choose from Photo Library</span>
                            <span className="text-[#A0522D] text-xs">7 preset dishes available</span>
                          </div>
                        </div>
                        <div className="text-[#8B4513]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* Local upload option */}
                      <label className="flex items-center justify-between w-full p-4 bg-white border-2 border-[#DEB887] rounded-lg hover:border-[#8B4513] hover:shadow-md transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#FFE8D6] rounded-full flex items-center justify-center">
                            <Camera className="w-5 h-5 text-[#8B4513]" />
                          </div>
                          <div className="text-left">
                            <span className="text-[#8B4513] font-semibold block">Upload from Device</span>
                            <span className="text-[#A0522D] text-xs">Take or select a photo</span>
                          </div>
                        </div>
                        <div className="text-[#A0522D]">
                          <Plus className="w-5 h-5" />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBetaLocalUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    /* Expanded state - show photo grid */
                    <div className="bg-white border-2 border-[#8B4513] rounded-lg overflow-hidden">
                      <button
                        onClick={() => setShowPhotoSelector(false)}
                        className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-[#FFE8D6] to-[#FFDDB8] border-b border-[#DEB887]"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#8B4513]" />
                          <span className="text-[#8B4513] font-semibold text-sm">Select a Dish</span>
                        </div>
                        <svg className="w-5 h-5 text-[#8B4513]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <div className="p-3 grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                        {PRESET_FOOD_PHOTOS.map((preset, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectPresetPhoto(index)}
                            className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#DEB887] hover:border-[#8B4513] transition-all hover:shadow-md group"
                          >
                            <img 
                              src={preset.url} 
                              alt={preset.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-1">
                              <span className="text-white text-xs font-medium leading-tight">{preset.title}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : !isGenerating && (
                <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-[#DEB887] rounded-lg cursor-pointer hover:border-[#8B4513] transition-colors bg-white">
                  <Camera className="w-16 h-16 text-[#A0522D] mb-4" />
                  <span className="text-[#8B4513] mb-2">Take or upload a photo</span>
                  <span className="text-[#A0522D]">Show us your delicious dish!</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div>
              <Label htmlFor="title" className="text-[#8B4513]">
                Recipe Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., Grandma's Dumplings"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 border-[#DEB887] focus:border-[#8B4513]"
              />
            </div>

            <div>
              <Label htmlFor="cuisine" className="text-[#8B4513]">
                Cuisine Type
              </Label>
              <Input
                id="cuisine"
                placeholder="e.g., Chinese, Indian, Mexican"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="mt-1 border-[#DEB887] focus:border-[#8B4513]"
              />
            </div>

            <div>
              <Label className="text-[#8B4513] mb-2 block">
                What's cooking good looking?
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {(['breakfast', 'lunch', 'dinner'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setMealType(type)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      mealType === type
                        ? 'bg-[#8B4513] text-white border-[#8B4513]'
                        : 'bg-white text-[#8B4513] border-[#DEB887] hover:border-[#8B4513]'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!canProceedToStep2}
              className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
            >
              Next: Add Ingredients
            </Button>
          </div>
        )}

        {/* Step 2: Ingredients */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[#8B4513] mb-2">What ingredients do you need?</h3>
              <p className="text-[#A0522D] mb-4">List all the ingredients for your recipe</p>

              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Ingredient ${index + 1}`}
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      className="flex-1 border-[#DEB887] focus:border-[#8B4513]"
                    />
                    {ingredients.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                        className="border-[#DEB887] text-[#A0522D] hover:text-[#8B4513]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addIngredient}
                  className="w-full border-[#DEB887] text-[#8B4513] hover:bg-[#FFE8D6]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 border-[#DEB887] text-[#8B4513]"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!canProceedToStep3}
                className="flex-1 bg-[#8B4513] hover:bg-[#A0522D] text-white"
              >
                Next: Add Steps
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Cooking Steps */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[#8B4513] mb-2">How do you make it?</h3>
              <p className="text-[#A0522D] mb-4">Describe the cooking steps</p>

              <div className="space-y-3">
                {steps.map((stepText, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="w-8 h-8 bg-[#FFE8D6] rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                      <span className="text-[#8B4513]">{index + 1}</span>
                    </div>
                    <Textarea
                      placeholder={`Step ${index + 1}`}
                      value={stepText}
                      onChange={(e) => updateStep(index, e.target.value)}
                      className="flex-1 border-[#DEB887] focus:border-[#8B4513] min-h-[80px]"
                    />
                    {steps.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeStep(index)}
                        className="border-[#DEB887] text-[#A0522D] hover:text-[#8B4513] mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addStep}
                  className="w-full border-[#DEB887] text-[#8B4513] hover:bg-[#FFE8D6]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1 border-[#DEB887] text-[#8B4513]"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                disabled={!canSubmit}
                className="flex-1 bg-[#8B4513] hover:bg-[#A0522D] text-white"
              >
                Next: Review
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Review and Submit */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[#8B4513] mb-4">
                {useBetaMode ? '✨ AI Generated Recipe' : 'Review Your Recipe'}
              </h3>
              {useBetaMode && (
                <div className="bg-gradient-to-r from-[#FFE8D6] to-[#FFDDB8] border border-[#8B4513] rounded-lg p-3 mb-4">
                  <p className="text-[#8B4513] text-sm">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    This recipe was automatically generated by AI. You can edit any field before submitting.
                  </p>
                </div>
              )}

              {/* Photo Preview */}
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img src={photo} alt={title} className="w-full h-full object-cover" />
              </div>

              {/* Basic Info */}
              <div className="bg-white rounded-lg p-4 border border-[#DEB887] mb-4">
                <h4 className="text-[#8B4513] font-semibold text-xl mb-2">{title}</h4>
                <div className="flex gap-4 text-[#A0522D] text-sm">
                  <span>🍽️ {cuisine}</span>
                  <span>⏰ {mealType}</span>
                </div>
              </div>

              {/* Ingredients */}
              <div className="bg-white rounded-lg p-4 border border-[#DEB887] mb-4">
                <h5 className="text-[#8B4513] font-semibold mb-3">Ingredients</h5>
                <ul className="space-y-2">
                  {ingredients.filter(i => i.trim()).map((ingredient, index) => (
                    <li key={index} className="text-[#A0522D] flex items-start gap-2">
                      <span className="text-[#8B4513]">•</span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="bg-white rounded-lg p-4 border border-[#DEB887]">
                <h5 className="text-[#8B4513] font-semibold mb-3">Cooking Steps</h5>
                <ol className="space-y-3">
                  {steps.filter(s => s.trim()).map((stepText, index) => (
                    <li key={index} className="text-[#A0522D] flex gap-3">
                      <span className="w-6 h-6 bg-[#FFE8D6] rounded-full flex items-center justify-center text-[#8B4513] text-sm flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="flex-1">{stepText}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex gap-3">
              {!useBetaMode && (
                <Button
                  variant="outline"
                  onClick={() => setStep(3)}
                  className="flex-1 border-[#DEB887] text-[#8B4513]"
                >
                  Back to Edit
                </Button>
              )}
              <Button
                onClick={handleSubmit}
                className={`${useBetaMode ? 'w-full' : 'flex-1'} bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#22c55e] text-white shadow-lg border-0`}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Submit Recipe
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
