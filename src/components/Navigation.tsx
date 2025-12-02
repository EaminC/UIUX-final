import { Home, Plus, ShoppingBag, User, Search } from 'lucide-react';
import type { Screen } from '../App';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'search' as Screen, icon: Search, label: 'Search' },
    { id: 'upload' as Screen, icon: Plus, label: 'Upload', isCenter: true },
    { id: 'store' as Screen, icon: ShoppingBag, label: 'Store' },
    { id: 'profile' as Screen, icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#DEB887] shadow-lg md:relative md:border-t-0 md:border-r md:shadow-none md:w-16 md:h-full md:flex md:flex-col md:justify-start md:pt-2 md:bg-[#FFF8F0]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4 md:flex-col md:justify-start md:gap-2 md:max-w-none md:mx-0 md:h-auto md:px-0 md:w-full md:pt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          const isCenter = 'isCenter' in item && item.isCenter;

          // Special styling for center Upload button
          if (isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center justify-center flex-1 h-full transition-all md:flex-1 md:w-full md:py-2 md:px-1 md:rounded-lg md:hover:bg-[#FFE8D6] md:mb-1 -mt-4 md:mt-0"
                title={item.label}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white transition-transform hover:scale-110 ${
                  isActive 
                    ? 'bg-[#8B4513]' 
                    : 'bg-gradient-to-br from-[#8B4513] to-[#A0522D]'
                }`}>
                  <Icon className="w-7 h-7 text-white stroke-[3]" />
                </div>
                <span className={`text-xs mt-1 font-bold md:hidden ${
                  isActive ? 'text-[#8B4513]' : 'text-[#A0522D]'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full transition-colors md:flex-1 md:w-full md:py-2 md:px-1 md:rounded-lg md:hover:bg-[#FFE8D6] md:mb-1"
              title={item.label}
            >
              <Icon
                className={`w-6 h-6 mb-1 md:mb-1 md:w-5 md:h-5 ${
                  isActive ? 'text-[#8B4513]' : 'text-[#A0522D]'
                }`}
              />
              <span
                className={`text-xs md:hidden ${
                  isActive ? 'text-[#8B4513] font-semibold' : 'text-[#A0522D]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}