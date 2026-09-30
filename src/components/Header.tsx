import React, { useState } from 'react';
import { ScreenType } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { SocialMediaBar } from './SocialIcons';
import { NavLink } from '../utils/navigation';

interface HeaderProps {
  activeScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenCallModal: () => void;
  onOpenProfileModal: () => void;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  onOpenCallModal,
  onOpenProfileModal,
  onNavigateHome
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const screenTitles: Record<ScreenType, string> = {
    'home': 'Home',
    'menu': 'Menu',
    'order-and-dine': 'Order & Dine',
    'location-and-hours': 'Location & Hours',
    'rooms': 'Rooms & Suites',
    'about': 'About Us',
    'contact': 'Contact Us',
    'services': 'Our Services'
  };

  const navLinks: { screen: ScreenType; label: string; icon: string }[] = [
    { screen: 'home', label: 'Home', icon: 'home' },
    { screen: 'menu', label: 'Menu', icon: 'restaurant_menu' },
    { screen: 'rooms', label: 'Rooms', icon: 'hotel' },
    { screen: 'services', label: 'Services', icon: 'room_service' },
    { screen: 'about', label: 'About', icon: 'info' },
    { screen: 'contact', label: 'Contact', icon: 'contact_support' }
  ];

  const handleNavClick = (screen: ScreenType) => {
    onNavigate(screen);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 left-0 right-0 w-full z-40 bg-[#f6fbf5]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(31,36,33,0.06)] pt-safe border-b border-[#dfe4df]/60">
        {/* Responsive Header Container */}
        <div className="w-full max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 md:gap-6">
          {/* Brand & Identity Zone */}
          <NavLink
            to="home"
            onNavigate={onNavigate}
            className="flex items-center gap-2.5 sm:gap-3 min-w-0 text-left active:opacity-80 transition-opacity cursor-pointer group shrink-0"
            aria-label="Go to Home"
          >
            <img
              alt="Paradise Grill Logo"
              className="h-8 sm:h-9 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
              src={RESTAURANT_INFO.images.logo}
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-semibold text-base sm:text-lg text-[#181d1a] truncate tracking-tight">
                  {RESTAURANT_INFO.name}
                </span>
                <span className="text-xs text-[#57423a] font-normal hidden xs:inline">
                  · {RESTAURANT_INFO.city}
                </span>
                <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#36684c]/10 text-[#36684c] text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#36684c]"></span>
                  Overlooking Gilgit River
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#57423a]">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#ffdbcd] text-[#360f00] font-bold text-[10px]">
                  <span
                    className="material-symbols-outlined text-[12px] mr-0.5 text-[#9f3e07]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  {RESTAURANT_INFO.rating}
                </span>
                <span className="text-[11px] text-[#57423a] truncate font-medium">
                  {screenTitles[activeScreen]}
                </span>
              </div>
            </div>
          </NavLink>

          {/* Desktop/Tablet Navigation Links (visible on md+) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Desktop Navigation">
            {navLinks.map(nl => (
              <NavLink
                key={nl.screen}
                to={nl.screen}
                onNavigate={handleNavClick}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeScreen === nl.screen
                    ? 'bg-[#ffdbcd] text-[#9f3e07] font-bold'
                    : 'text-[#57423a] hover:text-[#181d1a] hover:bg-[#ebefea]'
                }`}
              >
                {nl.label}
              </NavLink>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Call Action */}
            <button
              onClick={onOpenCallModal}
              aria-label="Call Paradise Grill Desk"
              className="h-9 sm:h-10 px-3 sm:px-3.5 rounded-full bg-[#c05621] text-white flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#9f3e07] transition-all active:scale-95 cursor-pointer text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span className="hidden sm:inline">Call Desk</span>
            </button>

            {/* Guest Profile & Lounge */}
            <button
              onClick={onOpenProfileModal}
              aria-label="Guest Profile & Orders"
              className="h-9 sm:h-10 px-2 sm:px-3 rounded-full bg-[#ebefea] hover:bg-[#dfe4df] text-[#181d1a] border border-[#dfe4df] flex items-center justify-center gap-1.5 shrink-0 active:scale-95 transition-transform cursor-pointer text-xs font-semibold"
            >
              <span className="w-5 h-5 rounded-full bg-[#9f3e07] text-white flex items-center justify-center text-[10px]">
                <span className="material-symbols-outlined text-[13px]">person</span>
              </span>
              <span className="hidden lg:inline">Guest Lounge</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-[#ebefea] text-[#181d1a] flex items-center justify-center border border-[#dfe4df] active:bg-[#dfe4df] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 pt-16 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#f6fbf5] border-b border-[#dfe4df] p-4 shadow-xl space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(nl => (
                <NavLink
                  key={nl.screen}
                  to={nl.screen}
                  onNavigate={handleNavClick}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeScreen === nl.screen
                      ? 'bg-[#ffdbcd] text-[#9f3e07] font-bold border border-[#9f3e07]/40'
                      : 'bg-white text-[#181d1a] border border-[#dfe4df]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#9f3e07]">{nl.icon}</span>
                  <span>{nl.label}</span>
                </NavLink>
              ))}
            </div>

            <div className="pt-2 border-t border-[#dfe4df] flex items-center justify-between">
              <span className="text-xs text-[#57423a] font-medium">Follow us on Social:</span>
              <SocialMediaBar className="flex items-center gap-2" iconSize="w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
