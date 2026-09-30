import React from 'react';
import { RESTAURANT_INFO, MENU_ITEMS } from '../../data/restaurantData';
import { ScreenType } from '../../types';
import { NavLink } from '../../utils/navigation';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenDishDrawer: (itemTitle: string) => void;
  onOpenCallModal: () => void;
  onShare: () => void;
  onSelectDiningMode?: (mode: 'reserve' | 'pickup' | 'delivery') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenDishDrawer,
  onOpenCallModal,
  onShare,
  onSelectDiningMode
}) => {
  // 4 Karakoram Specialties for the home feed
  const specialties = [
    MENU_ITEMS.find(m => m.id === 'karahi-mutton-gb') || MENU_ITEMS[1],
    MENU_ITEMS.find(m => m.id === 'platter-chapli-seekh') || MENU_ITEMS[6],
    MENU_ITEMS.find(m => m.id === 'trout-sajji-combo') || MENU_ITEMS[4],
    MENU_ITEMS.find(m => m.id === 'karakoram-chai-naan') || MENU_ITEMS[9]
  ];

  return (
    <div className="flex flex-col w-full pb-12 max-w-7xl mx-auto">
      {/* 1. Immersive Riverfront Hero Card */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-2 pb-1">
        <div className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden shadow-md group">
          <img
            alt="Paradise Hotel & Restaurant terrace overlooking Gilgit River and Karakoram peaks"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={RESTAURANT_INFO.images.heroRiverside}
          />
          {/* Gradient Scrim for readable warm typography */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c322e]/95 via-[#2c322e]/40 to-transparent"></div>

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f6fbf5]/90 backdrop-blur-md text-[#181d1a] font-semibold text-[11px] sm:text-xs shadow-sm pointer-events-auto">
              <span
                className="material-symbols-outlined text-[14px] text-[#36684c]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                water
              </span>
              Outdoor Riverfront Seating
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#9f3e07]/95 text-white font-semibold text-[11px] sm:text-xs shadow-sm pointer-events-auto">
              <span className="material-symbols-outlined text-[13px]">schedule</span>
              Open until 11:30 PM
            </span>
          </div>

          {/* Bottom Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col gap-1 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ffdbcd] text-[#360f00] text-[11px] font-bold">
                <span
                  className="material-symbols-outlined text-[13px] mr-0.5 text-[#9f3e07]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                {RESTAURANT_INFO.rating}
              </span>
              <span className="text-white/90 text-xs sm:text-sm font-medium">
                1,001 Google reviews · Gilgit-Baltistan
              </span>
            </div>
            <h2 className="font-headline-lg-mobile sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
              Feast by the Glacial River
            </h2>
            <p className="text-xs sm:text-sm text-white/85 line-clamp-2 leading-relaxed">
              Smoked embers, tender mountain mutton karahi, and fresh tandoori bread against the Karakoram skyline.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Essential Advisory & Vital Badges */}
      <section className="px-4 sm:px-6 lg:px-8 py-1.5">
        <div className="bg-[#f0f5f0] rounded-xl p-3 sm:p-4 flex items-center justify-between gap-2 border border-[#dfe4df]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#ffdbc9] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#984501] text-[18px]">payments</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-semibold text-[#181d1a] truncate">Cash Only Accepted</span>
              <span className="text-[11px] sm:text-xs text-[#57423a] truncate">ATM nearby at Sonikot Chowk (300m)</span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#b8efcc] text-[#002111] text-[11px] sm:text-xs font-bold">
              <span className="material-symbols-outlined text-[13px] mr-1 text-[#36684c]">check_circle</span>
              Dine-in Open
            </span>
          </div>
        </div>
      </section>

      {/* 3. Quick Action Grid (Tactile Touch Buttons) */}
      <section className="px-4 sm:px-6 lg:px-8 pt-2 pb-1.5">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-sm sm:text-base text-[#181d1a]">Guest Utilities</span>
          <span className="text-[11px] sm:text-xs text-[#57423a]">Tap to connect</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {/* 1. Fast Call */}
          <button
            onClick={onOpenCallModal}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#ebefea] hover:bg-[#e5e9e4] active:scale-95 transition-all text-center border border-[#dfe4df]/60 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#9f3e07] text-white flex items-center justify-center mb-1 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">call</span>
            </div>
            <span className="text-xs font-semibold text-[#181d1a]">Call Us</span>
            <span className="text-[10px] text-[#57423a]">{RESTAURANT_INFO.phone}</span>
          </button>

          {/* 2. Directions */}
          <NavLink
            to="location-and-hours"
            onNavigate={onNavigate}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#ebefea] hover:bg-[#e5e9e4] active:scale-95 transition-all text-center border border-[#dfe4df]/60 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#36684c] text-white flex items-center justify-center mb-1 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">directions</span>
            </div>
            <span className="text-xs font-semibold text-[#181d1a]">Directions</span>
            <span className="text-[10px] text-[#57423a]">River View Rd</span>
          </NavLink>

          {/* 3. Full Menu */}
          <NavLink
            to="menu"
            onNavigate={onNavigate}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#ebefea] hover:bg-[#e5e9e4] active:scale-95 transition-all text-center border border-[#dfe4df]/60 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#b75d1d] text-white flex items-center justify-center mb-1 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
            </div>
            <span className="text-xs font-semibold text-[#181d1a]">Full Menu</span>
            <span className="text-[10px] text-[#57423a]">BBQ &amp; Karahi</span>
          </NavLink>

          {/* 4. Order Pickup */}
          <NavLink
            to="order-and-dine"
            onNavigate={(screen) => {
              if (onSelectDiningMode) onSelectDiningMode('pickup');
              onNavigate(screen);
            }}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#ebefea] hover:bg-[#e5e9e4] active:scale-95 transition-all text-center border border-[#dfe4df]/60 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#dfe4df] text-[#9f3e07] flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-[20px]">takeout_dining</span>
            </div>
            <span className="text-xs font-semibold text-[#181d1a]">Order Pickup</span>
            <span className="text-[10px] text-[#57423a]">Hot in 25m</span>
          </NavLink>

          {/* 5. Delivery */}
          <NavLink
            to="order-and-dine"
            onNavigate={(screen) => {
              if (onSelectDiningMode) onSelectDiningMode('delivery');
              onNavigate(screen);
            }}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#ebefea] hover:bg-[#e5e9e4] active:scale-95 transition-all text-center border border-[#dfe4df]/60 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#dfe4df] text-[#36684c] flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-[20px]">moped</span>
            </div>
            <span className="text-xs font-semibold text-[#181d1a]">Delivery</span>
            <span className="text-[10px] text-[#57423a]">Gilgit City Area</span>
          </NavLink>

          {/* 6. Hotel Rooms */}
          <NavLink
            to="rooms"
            onNavigate={onNavigate}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#ebefea] hover:bg-[#e5e9e4] active:scale-95 transition-all text-center border border-[#dfe4df]/60 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#ffdbcd] text-[#9f3e07] flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-[20px]">hotel</span>
            </div>
            <span className="text-xs font-semibold text-[#181d1a]">Rooms</span>
            <span className="text-[10px] text-[#57423a]">3 Types Avail</span>
          </NavLink>
        </div>
      </section>

      {/* 4. Hotel Rooms & Riverside Suites Showcase Banner */}
      <section className="px-4 sm:px-6 lg:px-8 py-2">
        <div className="rounded-2xl bg-gradient-to-r from-[#2c322e] via-[#36684c] to-[#2c322e] p-4 sm:p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdbcd] text-[#9f3e07] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[13px]">bed</span>
              Riverside Accommodation
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-headline-sm">
              Stay at Paradise Hotel Gilgit
            </h3>
            <p className="text-xs sm:text-sm text-white/85 max-w-xl">
              3 room types with heated comfort, riverfront balconies, and 24/7 hot water. Starting from PKR 5,500/night.
            </p>
          </div>
          <NavLink
            to="rooms"
            onNavigate={onNavigate}
            className="h-11 px-5 rounded-xl bg-[#9f3e07] hover:bg-[#853405] text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 active:scale-98 transition-transform cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>View &amp; Book Rooms</span>
          </NavLink>
        </div>
      </section>

      {/* 4. Service Pills Carousel */}
      <section className="px-4 sm:px-6 lg:px-8 py-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          <NavLink
            to="menu"
            onNavigate={onNavigate}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#e5e9e4] shadow-sm border border-[#dfe4df] hover:border-[#9f3e07]/40 text-left transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#9f3e07] text-[22px]">outdoor_grill</span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-[#181d1a]">All You Can Eat</span>
              <span className="text-[11px] text-[#57423a]">Evening BBQ Buffets</span>
            </div>
          </NavLink>
          <NavLink
            to="order-and-dine"
            onNavigate={onNavigate}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#e5e9e4] shadow-sm border border-[#dfe4df] hover:border-[#36684c]/40 text-left transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#36684c] text-[22px]">deck</span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-[#181d1a]">Glacial River View</span>
              <span className="text-[11px] text-[#57423a]">Open-Air Timber Deck</span>
            </div>
          </NavLink>
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#e5e9e4] shadow-sm border border-[#dfe4df]">
            <span className="material-symbols-outlined text-[#984501] text-[22px]">family_restroom</span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-[#181d1a]">Family Friendly</span>
              <span className="text-[11px] text-[#57423a]">Spacious Dining Suites</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Karakoram Specialties Showcase */}
      <section className="px-4 sm:px-6 lg:px-8 pt-3 pb-3" id="specialties-section">
        <div className="flex items-end justify-between mb-3">
          <div>
            <span className="text-[11px] sm:text-xs font-bold text-[#9f3e07] tracking-wider uppercase">
              Culinary Heritage
            </span>
            <h3 className="font-headline-sm sm:text-2xl text-[#181d1a]">Karakoram Specialties</h3>
          </div>
          <span className="text-[11px] sm:text-xs text-[#57423a]">Made fresh over coals</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {specialties.map(dish => (
            <div
              key={dish.id}
              className="flex gap-3 p-3.5 rounded-xl bg-[#f0f5f0] shadow-sm border border-[#dfe4df]/80 hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-[#e5e9e4]">
                <img
                  className="w-full h-full object-cover"
                  src={dish.image}
                  alt={dish.title}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-[#181d1a] truncate">{dish.title}</h4>
                  <p className="text-xs text-[#57423a] line-clamp-2 mt-0.5 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm sm:text-base text-[#9f3e07] font-bold">
                    Rs. {dish.price.toLocaleString()}{' '}
                    <span className="text-[11px] text-[#57423a] font-normal">{dish.unit}</span>
                  </span>
                  <button
                    onClick={() => onOpenDishDrawer(dish.title)}
                    className="px-3.5 py-1.5 rounded-full bg-[#c05621] text-white text-xs font-semibold hover:bg-[#9f3e07] active:scale-95 transition-all shadow-sm cursor-pointer"
                  >
                    Pre-order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 & 7: Reviews & Map in 2-Column Grid on Tablet/Laptop */}
      <div className="px-4 sm:px-6 lg:px-8 py-2 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Guest Stories & Verified Google Reviews */}
        <section className="h-full">
          <div className="p-4 sm:p-5 rounded-xl bg-[#ebefea] border border-[#dfe4df] h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#9f3e07]">
                    {[...Array(4)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star_half
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#181d1a]">Guest Impressions</span>
                </div>
                <span className="text-[11px] text-[#57423a]">Verified Visits</span>
              </div>

              {/* Testimonial 1 */}
              <blockquote className="my-2 border-l-0 pl-0">
                <p className="font-headline-sm text-[15px] sm:text-base italic text-[#181d1a] leading-snug">
                  "Sitting on the river wooden terrace with fresh mutton karahi while the Karakoram peaks turn gold at sunset is an experience you will remember for life."
                </p>
                <footer className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-[#181d1a] font-semibold">Tariq M. · Traveler from Lahore</span>
                  <span className="text-[11px] text-[#57423a]">Google Review</span>
                </footer>
              </blockquote>

              <div className="h-px bg-[#dfe4df] my-2"></div>

              {/* Testimonial 2 */}
              <blockquote className="my-2 border-l-0 pl-0">
                <p className="font-headline-sm text-[15px] sm:text-base italic text-[#181d1a] leading-snug">
                  "Best BBQ aroma along the Gilgit river. The chapli kebabs and piping hot roghani naan are unbelievable after a long day exploring Hunza valley."
                </p>
                <footer className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-[#181d1a] font-semibold">Alina S. · Mountain Trekker</span>
                  <span className="text-[11px] text-[#57423a]">Google Review</span>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Location Map & Directions Snapshot */}
        <section className="h-full">
          <div className="rounded-xl overflow-hidden shadow-sm bg-[#f0f5f0] border border-[#dfe4df] h-full flex flex-col justify-between">
            <div
              className="w-full h-48 sm:h-56 md:h-full min-h-[220px] bg-cover bg-center relative"
              style={{ backgroundImage: `url('${RESTAURANT_INFO.images.mapSnapshot1}')` }}
            >
              <div className="absolute inset-0 bg-[#2c322e]/30"></div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-lg bg-[#f6fbf5]/90 backdrop-blur-md shadow-sm">
                  <p className="text-xs font-bold text-[#181d1a]">River View Rd, Sonikot, Gilgit</p>
                  <p className="text-[11px] text-[#57423a]">Along Gilgit River bank</p>
                </div>
                <button
                  onClick={() => onNavigate('location-and-hours')}
                  className="w-10 h-10 rounded-full bg-[#9f3e07] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                  aria-label="View Map & Directions"
                >
                  <span className="material-symbols-outlined text-[20px]">navigation</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 8. Reservation Warm Callout Footer Box */}
      <section className="px-4 sm:px-6 lg:px-8 py-3 pb-8">
        <div className="p-5 sm:p-6 rounded-2xl bg-[#9f3e07] text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
          {/* Decorative ember glow SVG */}
          <svg className="absolute -right-10 -bottom-10 w-44 h-44 opacity-20 pointer-events-none" fill="currentColor" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" />
          </svg>
          <div className="max-w-xl">
            <span className="text-[11px] sm:text-xs font-bold text-[#ffdbcd] uppercase tracking-wider">
              Riverside Terrace Table
            </span>
            <h4 className="font-headline-sm sm:text-2xl text-white mt-0.5">Planning an Evening Feast?</h4>
            <p className="text-xs sm:text-sm text-white/90 mt-1 leading-relaxed">
              Terrace river tables fill fast around sunset. Call in advance or reserve your front-row seat to the rapids.
            </p>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={() => {
                if (onSelectDiningMode) onSelectDiningMode('reserve');
                onNavigate('order-and-dine');
              }}
              className="flex-1 sm:flex-initial py-3 px-5 rounded-xl bg-white text-[#9f3e07] text-xs sm:text-sm font-bold text-center shadow-sm active:scale-98 transition-transform cursor-pointer"
            >
              Reserve Terrace Table
            </button>
            <button
              onClick={onOpenCallModal}
              className="px-4 py-3 rounded-xl bg-[#360f00]/40 text-white text-xs font-semibold border border-white/20 active:scale-95 transition-transform cursor-pointer"
              title="Call directly"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
