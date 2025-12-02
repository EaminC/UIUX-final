import { useState, useEffect } from 'react';
import { Onboarding } from './components/Onboarding';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { GoogleLogin } from './components/GoogleLogin';
import { AppleLogin } from './components/AppleLogin';
import { WeChatLogin } from './components/WeChatLogin';
import { Preferences } from './components/Preferences';
import { Menu } from './components/Menu';
import { Home } from './components/Home';
import { UploadRecipe } from './components/UploadRecipe';
import { Profile } from './components/Profile';
import { IngredientStore } from './components/IngredientStore';
import { Search } from './components/Search';
import { LearnRecipe } from './components/LearnRecipe';
import { ManageRecipes } from './components/ManageRecipes';
import { PhotoLibrary } from './components/PhotoLibrary';
import { RecipeDetail } from './components/RecipeDetail';
import { ProfileDetails } from './components/ProfileDetails';
import { Comments } from './components/Comments';
import { Settings } from './components/Settings';
import { Navigation } from './components/Navigation';
import xiaolongbaoImage from './assets/小笼包.jpeg';
import hongshaoRouImage from './assets/红烧肉.jpeg';
import congYouMianImage from './assets/葱油拌面.jpeg';
import yimingAvatar from './assets/Yiming.jpeg';
import cartoonAvatar from './assets/cartoon.jpg';

export type Screen =
  | 'login'
  | 'signup'
  | 'google-login'
  | 'apple-login'
  | 'wechat-login'
  | 'preferences'
  | 'menu'
  | 'onboarding'
  | 'home'
  | 'upload'
  | 'store'
  | 'profile'
  | 'search'
  | 'learn'
  | 'manage'
  | 'photo-library'
  | 'recipe-detail'
  | 'profile-details'
  | 'settings';

export interface Recipe {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  image: string;
  cuisine: string;
  ingredients: string[];
  steps: string[];
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
  rating?: number;
  userRating?: number;
  mealType?: 'breakfast' | 'lunch' | 'dinner';
  userId?: string;
  commentList?: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  text: string;
  timestamp: string;
  likes?: number;
  isLiked?: boolean;
}

export interface User {
  name: string;
  country: string;
  avatar: string;
  points: number;
  recipesUploaded: number;
  badges: string[];
}

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Homemade Dumplings',
    author: 'Wei Zhang',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1651399436026-3ca4088b3d6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwZHVtcGxpbmdzJTIwZm9vZHxlbnwxfHx8fDE3NjQ2Mzg3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'Chinese',
    ingredients: ['Ground pork', 'Cabbage', 'Dumpling wrappers', 'Soy sauce', 'Ginger'],
    steps: ['Mix filling', 'Wrap dumplings', 'Boil or pan-fry', 'Serve with dipping sauce'],
    likes: 245,
    comments: 32,
    rating: 4.5,
    timestamp: '2 hours ago',
    isLiked: false,
    mealType: 'dinner',
  },
  {
    id: '5',
    title: 'Shanghai Braised Pork (红烧肉)',
    author: 'Yiming Cheng',
    authorAvatar: yimingAvatar,
    image: hongshaoRouImage,
    cuisine: 'Shanghai',
    ingredients: ['Pork belly', 'Rock sugar', 'Soy sauce', 'Shaoxing wine', 'Star anise', 'Ginger', 'Green onions'],
    steps: ['Cut pork into cubes', 'Blanch pork', 'Caramelize sugar', 'Braise with soy sauce and wine', 'Simmer until tender'],
    likes: 156,
    comments: 18,
    rating: 4.8,
    timestamp: '3 hours ago',
    isLiked: false,
    mealType: 'dinner',
    userId: 'yiming',
  },
  {
    id: '6',
    title: 'Shanghai Soup Dumplings (小笼包)',
    author: 'Yiming Cheng',
    authorAvatar: yimingAvatar,
    image: xiaolongbaoImage,
    cuisine: 'Shanghai',
    ingredients: ['Pork', 'Gelatin broth', 'Dumpling wrappers', 'Ginger', 'Soy sauce', 'Sesame oil'],
    steps: ['Prepare gelatin broth', 'Mix pork filling', 'Wrap dumplings carefully', 'Steam for 8-10 minutes', 'Serve hot with vinegar'],
    likes: 289,
    comments: 42,
    rating: 4.9,
    timestamp: '1 day ago',
    isLiked: true,
    mealType: 'lunch',
    userId: 'yiming',
  },
  {
    id: '7',
    title: 'Scallion Oil Noodles (葱油拌面)',
    author: 'Yiming Cheng',
    authorAvatar: yimingAvatar,
    image: congYouMianImage,
    cuisine: 'Shanghai',
    ingredients: ['Fresh noodles', 'Scallions', 'Vegetable oil', 'Soy sauce', 'Sugar'],
    steps: ['Cook noodles', 'Fry scallions in oil until crispy', 'Mix soy sauce and sugar', 'Toss noodles with scallion oil', 'Serve immediately'],
    likes: 198,
    comments: 27,
    rating: 4.6,
    timestamp: '2 days ago',
    isLiked: false,
    mealType: 'lunch',
    userId: 'yiming',
  },
  {
    id: '2',
    title: 'Butter Chicken (मक्खन मुर्ग)',
    author: 'Priya Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1690915475414-9aaecfd3ba74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdXJyeSUyMGRpc2h8ZW58MXx8fHwxNzY0NTUwNDMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'Indian',
    ingredients: ['Chicken', 'Butter', 'Cream', 'Tomatoes', 'Garam masala'],
    steps: ['Marinate chicken', 'Cook in butter', 'Add cream sauce', 'Simmer until done'],
    likes: 189,
    comments: 24,
    rating: 4.7,
    timestamp: '5 hours ago',
    isLiked: true,
    mealType: 'dinner',
  },
  {
    id: '3',
    title: 'Street Tacos',
    author: 'Carlos Rodriguez',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1688845465690-e5ea24774fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjBmb29kfGVufDF8fHx8MTc2NDYwOTk2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'Mexican',
    ingredients: ['Corn tortillas', 'Beef', 'Cilantro', 'Onion', 'Lime'],
    steps: ['Season and cook meat', 'Warm tortillas', 'Assemble tacos', 'Top with cilantro and onion'],
    likes: 312,
    comments: 41,
    rating: 4.3,
    timestamp: '1 day ago',
    isLiked: false,
    mealType: 'lunch',
  },
  {
    id: '4',
    title: 'Carbonara Pasta',
    author: 'Marco Bianchi',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1739417083034-4e9118f487be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjBkaXNofGVufDF8fHx8MTc2NDU4NTgwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    cuisine: 'Italian',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Pecorino cheese', 'Black pepper'],
    steps: ['Cook pasta', 'Fry pancetta', 'Mix eggs and cheese', 'Combine with pasta'],
    likes: 267,
    comments: 35,
    rating: 4.6,
    timestamp: '1 day ago',
    isLiked: true,
    mealType: 'dinner',
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [hasSelectedPreferences, setHasSelectedPreferences] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [profileDetailTab, setProfileDetailTab] = useState<'recipes' | 'likes' | 'points'>('recipes');
  const [user, setUser] = useState<User>({
    name: 'Yiming Cheng',
    country: 'China',
    avatar: yimingAvatar,
    points: 45,
    recipesUploaded: 3,
    badges: ['First Recipe', 'Early Adopter', 'Shanghai Chef'],
  });

  // Authentication handlers
  const handleLogin = (email: string, password: string) => {
    // In real app, this would validate credentials
    setIsAuthenticated(true);
    setCurrentScreen('menu');
  };

  const handleSignup = (data: import('./components/Signup').SignupData) => {
    // In real app, this would create user account
    setUser({ ...user, name: data.username });
    setIsAuthenticated(true);
    setCurrentScreen('preferences');
  };

  const handleGoogleLogin = async () => {
    // Use Google Sign-In button or fallback to account selection
    // Since OAuth client is not configured, we'll use the account selection screen
    setCurrentScreen('google-login');
  };

  const handleGoogleAccountSelect = (account: { name: string; email: string }) => {
    setUser({ ...user, name: account.name });
    setIsAuthenticated(true);
    setCurrentScreen('menu');
  };

  const handleAppleLogin = async () => {
    // Show account selection screen
    setCurrentScreen('apple-login');
  };

  const handleAppleAccountSelect = (account: { name: string; email: string }) => {
    setUser({ ...user, name: account.name });
    setIsAuthenticated(true);
    setCurrentScreen('menu');
  };

  const handleWeChatLogin = () => {
    // Show account selection screen
    setCurrentScreen('wechat-login');
  };

  const handleWeChatAccountSelect = (account: { name: string; email: string }) => {
    setUser({ ...user, name: account.name });
    setIsAuthenticated(true);
    setCurrentScreen('menu');
  };

  const handlePreferencesComplete = (preferences: string[]) => {
    setHasSelectedPreferences(true);
    setCurrentScreen('menu');
  };

  const handlePreferencesSkip = () => {
    setHasSelectedPreferences(true);
    setCurrentScreen('menu');
  };

  // Navigation handlers
  const handleCompleteOnboarding = (userName: string, country: string) => {
    setUser({ ...user, name: userName, country });
    setHasCompletedOnboarding(true);
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleRecipeUpload = (points: number) => {
    setUser({
      ...user,
      points: user.points + points,
      recipesUploaded: user.recipesUploaded + 1,
    });
    setCurrentScreen('home');
  };

  const handleLike = (recipeId: string) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              isLiked: !recipe.isLiked,
              likes: recipe.isLiked ? recipe.likes - 1 : recipe.likes + 1,
            }
          : recipe
      )
    );
  };

  const handleRate = (recipeId: string, rating: number) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, rating, userRating: rating } : recipe
      )
    );
  };

  const handleComment = (recipeId: string) => {
    // Show comment dialog or navigate to comment section
    const recipe = recipes.find((r) => r.id === recipeId);
    if (recipe) {
      setSelectedRecipe(recipe);
      setCurrentScreen('recipe-detail');
      // Scroll to comments section (would be implemented in RecipeDetail)
    }
  };

  const handleShare = (recipe: Recipe) => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Check out this recipe: ${recipe.title}`,
        url: window.location.href,
      }).catch(() => {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${recipe.title} - ${window.location.href}`);
        alert('Recipe link copied to clipboard!');
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${recipe.title} - ${window.location.href}`);
      alert('Recipe link copied to clipboard!');
    }
  };

  const handleStoreClick = (storeName: string, address: string) => {
    // Open maps with store location
    const query = encodeURIComponent(`${storeName} ${address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleProfileRecipeClick = (recipeId: string) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (recipe) {
      setSelectedRecipe(recipe);
      setCurrentScreen('recipe-detail');
    }
  };

  const userRecipes = recipes.filter((r) => r.author === user.name);
  const likedRecipes = recipes.filter((r) => r.isLiked);

  const handleAddComment = (recipeId: string, text: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: user.name,
      authorAvatar: user.avatar,
      text,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
    };
    setComments((prev) => ({
      ...prev,
      [recipeId]: [...(prev[recipeId] || []), newComment],
    }));
    // Update recipe comment count
    setRecipes(
      recipes.map((r) =>
        r.id === recipeId ? { ...r, comments: r.comments + 1 } : r
      )
    );
  };

  const handleLikeComment = (commentId: string) => {
    if (!selectedRecipe) return;
    setComments((prev) => {
      const recipeComments = prev[selectedRecipe.id] || [];
      return {
        ...prev,
        [selectedRecipe.id]: recipeComments.map((c) =>
          c.id === commentId
            ? {
                ...c,
                isLiked: !c.isLiked,
                likes: (c.likes || 0) + (c.isLiked ? -1 : 1),
              }
            : c
        ),
      };
    });
  };

  // Listen for profile navigation events
  useEffect(() => {
    const handleProfileNavigate = (e: CustomEvent) => {
      const tab = e.detail as 'recipes' | 'likes' | 'points';
      setProfileDetailTab(tab);
      setCurrentScreen('profile-details');
    };

    window.addEventListener('profile-navigate', handleProfileNavigate as EventListener);
    return () => {
      window.removeEventListener('profile-navigate', handleProfileNavigate as EventListener);
    };
  }, []);

  // Render authentication screens
  if (!isAuthenticated) {
    if (currentScreen === 'login') {
      return (
        <Login
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentScreen('signup')}
          onGoogleLogin={handleGoogleLogin}
          onAppleLogin={handleAppleLogin}
          onWeChatLogin={handleWeChatLogin}
        />
      );
    }
    if (currentScreen === 'signup') {
      return (
        <Signup
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentScreen('login')}
        />
      );
    }
    if (currentScreen === 'google-login') {
      return (
        <GoogleLogin
          onSelectAccount={handleGoogleAccountSelect}
          onUseAnotherAccount={() => setCurrentScreen('login')}
          onCancel={() => setCurrentScreen('login')}
        />
      );
    }
    if (currentScreen === 'apple-login') {
      return (
        <AppleLogin
          onSelectAccount={handleAppleAccountSelect}
          onUseAnotherAccount={() => setCurrentScreen('login')}
          onCancel={() => setCurrentScreen('login')}
        />
      );
    }
    if (currentScreen === 'wechat-login') {
      return (
        <WeChatLogin
          onSelectAccount={handleWeChatAccountSelect}
          onUseAnotherAccount={() => setCurrentScreen('login')}
          onCancel={() => setCurrentScreen('login')}
        />
      );
    }
  }

  // Render preferences screen
  if (isAuthenticated && !hasSelectedPreferences && currentScreen === 'preferences') {
    return (
      <Preferences
        onComplete={handlePreferencesComplete}
        onSkip={handlePreferencesSkip}
      />
    );
  }

  // Render menu screen
  if (isAuthenticated && currentScreen === 'menu') {
    return (
      <Menu
        userName={user.name}
        onMakeRecipe={() => setCurrentScreen('upload')}
        onLearnRecipe={() => setCurrentScreen('learn')}
        onBuyIngredients={() => setCurrentScreen('store')}
        onManageRecipes={() => setCurrentScreen('manage')}
      />
    );
  }

  // Render profile details
  if (currentScreen === 'profile-details') {
    return (
      <ProfileDetails
        user={user}
        allRecipes={recipes}
        likedRecipes={likedRecipes}
        initialTab={profileDetailTab}
        onBack={() => setCurrentScreen('profile')}
        onRecipeClick={handleProfileRecipeClick}
      />
    );
  }

  // Render recipe detail
  if (currentScreen === 'recipe-detail' && selectedRecipe) {
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        comments={comments[selectedRecipe.id] || []}
        currentUser={user}
        onBack={() => setCurrentScreen('home')}
        onLike={handleLike}
        onRate={handleRate}
        onComment={handleComment}
        onShare={handleShare}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
      />
    );
  }

  // Render main app screens
  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-20 md:pb-0 md:bg-gray-50">
      {/* Desktop container wrapper */}
      <div className="max-w-6xl mx-auto md:min-h-screen md:flex md:bg-white md:shadow-md md:my-2 md:rounded-xl overflow-hidden md:max-h-[calc(100vh-1rem)]">
        {/* Main content area */}
        <div className="flex-1 md:overflow-y-auto md:min-w-0">
      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={handleCompleteOnboarding} />
      )}
      {currentScreen === 'home' && (
        <Home
          user={user}
          recipes={recipes}
          onLike={handleLike}
          onRecipeClick={(recipe) => {
            setSelectedRecipe(recipe);
            setCurrentScreen('recipe-detail');
          }}
          onComment={handleComment}
          onShare={handleShare}
          onSettingsClick={() => setCurrentScreen('settings')}
        />
      )}
      {currentScreen === 'settings' && (
        <Settings
          userName={user.name}
          onBack={() => setCurrentScreen('home')}
          onLogout={() => {
            setIsAuthenticated(false);
            setCurrentScreen('login');
          }}
        />
      )}
      {currentScreen === 'upload' && (
        <UploadRecipe
          onComplete={handleRecipeUpload}
          onCancel={() => setCurrentScreen('menu')}
        />
      )}
      {currentScreen === 'store' && (
        <IngredientStore onStoreClick={handleStoreClick} />
      )}
      {currentScreen === 'profile' && (
        <Profile
          user={user}
          recipes={userRecipes}
          onRecipeClick={handleProfileRecipeClick}
          onNavigateToDetails={(tab) => {
            setProfileDetailTab(tab);
            setCurrentScreen('profile-details');
          }}
        />
      )}
      {currentScreen === 'search' && (
        <Search
          recipes={recipes}
          onLike={handleLike}
          onBack={() => setCurrentScreen('home')}
          onRecipeClick={(recipe) => {
            setSelectedRecipe(recipe);
            setCurrentScreen('recipe-detail');
          }}
          onComment={handleComment}
          onShare={handleShare}
        />
      )}
      {currentScreen === 'learn' && (
        <LearnRecipe
          recipes={recipes}
          onBack={() => setCurrentScreen('menu')}
          onSelectRecipe={(recipe) => {
            setSelectedRecipe(recipe);
            setCurrentScreen('recipe-detail');
          }}
        />
      )}
      {currentScreen === 'manage' && (
        <ManageRecipes
          userRecipes={userRecipes}
          onBack={() => setCurrentScreen('menu')}
          onEdit={(recipe) => {
            setSelectedRecipe(recipe);
            setCurrentScreen('upload');
          }}
          onDelete={(recipeId) => {
            setRecipes(recipes.filter((r) => r.id !== recipeId));
          }}
          onView={(recipe) => {
            setSelectedRecipe(recipe);
            setCurrentScreen('recipe-detail');
          }}
        />
      )}
      {currentScreen === 'photo-library' && (
        <PhotoLibrary
          onSelect={(photos) => {
            // Handle photo selection
            setCurrentScreen('upload');
          }}
          onCancel={() => setCurrentScreen('upload')}
        />
      )}

      {currentScreen !== 'onboarding' &&
        currentScreen !== 'login' &&
        currentScreen !== 'signup' &&
        currentScreen !== 'google-login' &&
        currentScreen !== 'apple-login' &&
        currentScreen !== 'wechat-login' &&
        currentScreen !== 'preferences' &&
        currentScreen !== 'menu' &&
        currentScreen !== 'recipe-detail' &&
        currentScreen !== 'photo-library' &&
        currentScreen !== 'settings' && (
      <Navigation currentScreen={currentScreen} onNavigate={handleNavigate} />
        )}
        </div>
      </div>
    </div>
  );
}
