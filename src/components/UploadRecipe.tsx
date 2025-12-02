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

export function UploadRecipe({ onComplete, onCancel }: UploadRecipeProps) {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<string>('');
  const [title, setTitle] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | ''>('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<string[]>(['']);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handlePhotoProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
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
          Step {step} of 4
        </div>
      </header>

      <div className="p-4">
        {/* Step 1: Photo and Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[#8B4513] mb-4">Let's start with a photo</h3>
              
              {photo ? (
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={photo} alt="Recipe" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setPhoto('')}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg"
                  >
                    <X className="w-5 h-5 text-[#8B4513]" />
                  </button>
                </div>
              ) : (
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

            {isProcessing ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#8B4513]">Wait a minute, photo processing...</p>
              </div>
            ) : (
            <Button
                onClick={() => {
                  handlePhotoProcessing();
                  setTimeout(() => setStep(2), 2000);
                }}
              disabled={!canProceedToStep2}
              className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
            >
              Next: Add Ingredients
            </Button>
            )}
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
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="flex-1 bg-[#8B4513] hover:bg-[#A0522D] text-white"
              >
                Submit Recipe
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
