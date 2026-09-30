import React from 'react';
import { ScreenType } from '../types';
import { NavLink } from '../utils/navigation';

interface BottomNavProps {
  activeScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  onQuickCall?: () => void;
  cartCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onSelectScreen,
  onQuickCall,
  cartCount = 0
}) => {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 left-0 right-0 w-full z-40 pb-safe bg-[#f6fbf5]/95 backdrop-blur-xl shadow-[0_-4px_16px_rgba(31,36,33,0.06)] border-t border-[#dfe4df]/60"
      aria-label="Main Navigation"
    >
      <div className="w-full max-w-7xl mx-auto flex justify-around md:justify-center md:gap-6 lg:gap-8 items-center h-16 px-1 sm:px-6">
        {/* 1. Home */}
        <NavLink
          to="home"
          onNavigate={onSelectScreen}
          aria-current={activeScreen === 'home' ? 'page' : undefined}
          className={`flex-1 md:flex-initial flex flex-col md:flex-row items-center justify-center md:gap-2 h-full md:h-11 md:px-5 md:rounded-full min-w-[44px] transition-all cursor-pointer ${
            activeScreen === 'home'
              ? 'text-[#9f3e07] font-bold md:bg-[#ffdbcd]'
              : 'text-[#57423a] hover:text-[#181d1a] md:hover:bg-[#ebefea]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: activeScreen === 'home' ? "'FILL' 1" : "'FILL' 0" }}
          >
            local_fire_department
          </span>
          <span className="text-[11px] md:text-xs font-semibold mt-0.5 md:mt-0">Home</span>
        </NavLink>

        {/* 2. Menu */}
        <NavLink
          to="menu"
          onNavigate={onSelectScreen}
          aria-current={activeScreen === 'menu' ? 'page' : undefined}
          className={`flex-1 md:flex-initial flex flex-col md:flex-row items-center justify-center md:gap-2 h-full md:h-11 md:px-5 md:rounded-full min-w-[44px] transition-all cursor-pointer relative ${
            activeScreen === 'menu'
              ? 'text-[#9f3e07] font-bold md:bg-[#ffdbcd]'
              : 'text-[#57423a] hover:text-[#181d1a] md:hover:bg-[#ebefea]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: activeScreen === 'menu' ? "'FILL' 1" : "'FILL' 0" }}
          >
            restaurant_menu
          </span>
          <span className="text-[11px] md:text-xs font-semibold mt-0.5 md:mt-0">Menu</span>
        </NavLink>

        {/* 3. Order & Dine */}
        <NavLink
          to="order-and-dine"
          onNavigate={onSelectScreen}
          aria-current={activeScreen === 'order-and-dine' ? 'page' : undefined}
          className={`flex-1 md:flex-initial flex flex-col md:flex-row items-center justify-center md:gap-2 h-full md:h-11 md:px-5 md:rounded-full min-w-[44px] transition-all cursor-pointer relative ${
            activeScreen === 'order-and-dine'
              ? 'text-[#9f3e07] font-bold md:bg-[#ffdbcd]'
              : 'text-[#57423a] hover:text-[#181d1a] md:hover:bg-[#ebefea]'
          }`}
        >
          <div className="relative">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: activeScreen === 'order-and-dine' ? "'FILL' 1" : "'FILL' 0" }}
            >
              table_restaurant
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#9f3e07] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] md:text-xs font-semibold mt-0.5 md:mt-0">Order &amp; Dine</span>
        </NavLink>

        {/* 4. Location */}
        <NavLink
          to="location-and-hours"
          onNavigate={onSelectScreen}
          aria-current={activeScreen === 'location-and-hours' ? 'page' : undefined}
          className={`flex-1 md:flex-initial flex flex-col md:flex-row items-center justify-center md:gap-2 h-full md:h-11 md:px-5 md:rounded-full min-w-[44px] transition-all cursor-pointer ${
            activeScreen === 'location-and-hours'
              ? 'text-[#9f3e07] font-bold md:bg-[#ffdbcd]'
              : 'text-[#57423a] hover:text-[#181d1a] md:hover:bg-[#ebefea]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: activeScreen === 'location-and-hours' ? "'FILL' 1" : "'FILL' 0" }}
          >
            distance
          </span>
          <span className="text-[11px] md:text-xs font-semibold mt-0.5 md:mt-0">Location</span>
        </NavLink>

        {/* 5. Rooms */}
        <NavLink
          to="rooms"
          onNavigate={onSelectScreen}
          aria-current={activeScreen === 'rooms' ? 'page' : undefined}
          className={`flex-1 md:flex-initial flex flex-col md:flex-row items-center justify-center md:gap-2 h-full md:h-11 md:px-5 md:rounded-full min-w-[44px] transition-all cursor-pointer ${
            activeScreen === 'rooms'
              ? 'text-[#9f3e07] font-bold md:bg-[#ffdbcd]'
              : 'text-[#57423a] hover:text-[#181d1a] md:hover:bg-[#ebefea]'
          }`}
          aria-label="Hotel Rooms & Suites"
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: activeScreen === 'rooms' ? "'FILL' 1" : "'FILL' 0" }}
          >
            hotel
          </span>
          <span className="text-[11px] md:text-xs font-semibold mt-0.5 md:mt-0">Rooms</span>
        </NavLink>
      </div>
    </nav>
  );
};
