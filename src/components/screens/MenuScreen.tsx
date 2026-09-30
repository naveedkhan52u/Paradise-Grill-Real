import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, RESTAURANT_INFO, MenuItem } from '../../data/restaurantData';
import { CartItem } from '../../types';
import { NavLink } from '../../utils/navigation';

interface MenuScreenProps {
  cart: CartItem[];
  onOpenDishDrawer: (itemTitle: string) => void;
  onQuickAdd: (item: MenuItem) => void;
  onProceedToOrder: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  cart,
  onOpenDishDrawer,
  onQuickAdd,
  onProceedToOrder
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Delights' },
    { id: 'buffet', label: 'All-You-Can-Eat' },
    { id: 'bbq', label: 'Live Charcoal BBQ' },
    { id: 'karahi', label: 'Balti & Karakoram' },
    { id: 'trout', label: 'River Catch' },
    { id: 'rice', label: 'Breads & Rice' },
    { id: 'dessert', label: 'Chai & Desserts' }
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalCartCount = useMemo(() => cart.reduce((acc, curr) => acc + curr.qty, 0), [cart]);
  const totalCartPrice = useMemo(
    () => cart.reduce((acc, curr) => acc + curr.qty * curr.item.price, 0),
    [cart]
  );

  return (
    <div className="flex flex-col w-full pb-24 max-w-7xl mx-auto">
      {/* 1. Visual Ambience Header */}
      <div className="relative w-full h-44 sm:h-56 md:h-64 bg-[#dfe4df] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full"
          style={{ backgroundImage: `url('${RESTAURANT_INFO.images.menuBanner}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c322e]/95 via-[#2c322e]/45 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-end text-white max-w-3xl">
          <div className="flex items-center gap-1.5 text-[#ffdbcd] mb-1">
            <span className="material-symbols-outlined text-[16px]">outdoor_grill</span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              Flavors of Gilgit-Baltistan
            </span>
          </div>
          <h2 className="font-headline-lg-mobile sm:text-3xl md:text-4xl leading-tight text-white font-semibold">
            Hearth &amp; River Feast
          </h2>
          <p className="text-xs sm:text-sm text-white/85 line-clamp-1">
            Wood-fired charcoal grills, freshly netted alpine trout &amp; heirloom Karahis
          </p>
        </div>
      </div>

      {/* 2. Operational Notices */}
      <div className="px-4 sm:px-6 lg:px-8 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-[#ffdbc9] text-[#321200] p-3 sm:p-4 rounded-xl flex items-start gap-2.5 shadow-sm border border-[#dec0b5]/50">
          <span className="material-symbols-outlined text-[#984501] text-[20px] shrink-0 mt-0.5">
            payments
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-bold text-[#181d1a]">Cash Only Accepted On Premises</p>
            <p className="text-[11px] sm:text-xs text-[#753400] leading-snug">
              Bank ATMs located 300m west along River Road. Digital transfers supported for advance takeaways.
            </p>
          </div>
        </div>

        <div className="bg-[#b8efcc] text-[#002111] p-3 sm:p-4 rounded-xl flex items-start gap-2.5 shadow-sm border border-[#9dd3b0]/50">
          <span className="material-symbols-outlined text-[#36684c] text-[20px] shrink-0 mt-0.5">
            deck
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-bold text-[#002111]">Open River Deck Seating</p>
            <p className="text-[11px] sm:text-xs text-[#1d5036] leading-snug">
              Scenic river-facing wooden deck tables are hosted strictly on a first-come, first-served basis.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Interactive Search Bar */}
      <div className="px-4 sm:px-6 lg:px-8 pt-3">
        <div className="relative flex items-center bg-[#f0f5f0] rounded-xl shadow-sm px-3.5 py-1.5 border border-[#dfe4df] focus-within:border-[#9f3e07]">
          <span className="material-symbols-outlined text-[#8a7268] text-[22px]">search</span>
          <input
            className="w-full bg-transparent px-2.5 py-2 text-sm text-[#181d1a] placeholder:text-[#8a7268] focus:outline-none"
            placeholder="Search trout, shinwari karahi, boti..."
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#8a7268] hover:text-[#181d1a] p-1 cursor-pointer"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. Sticky Horizontal Category Filter Strip */}
      <div className="sticky top-16 z-30 bg-[#f6fbf5]/95 backdrop-blur-md py-2.5 border-b border-[#dfe4df]/60">
        <div className="flex gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8 no-scrollbar py-0.5 scroll-smooth">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#c05621] text-white'
                    : 'bg-[#e5e9e4] text-[#57423a] hover:bg-[#dfe4df]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Menu Items Feed in Responsive Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#dfe4df] flex flex-col hover:shadow-md transition-shadow"
          >
            {/* Visual thumbnail banner */}
            <div className="relative w-full h-44 bg-[#ebefea]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {item.badge && (
                <div
                  className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] font-bold shadow-md ${
                    item.badgeType === 'secondary'
                      ? 'bg-[#36684c] text-white'
                      : item.badgeType === 'tertiary'
                      ? 'bg-[#b75d1d] text-white'
                      : item.badgeType === 'error'
                      ? 'bg-[#ba1a1a] text-white'
                      : 'bg-[#c05621] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {item.category === 'buffet'
                      ? 'stars'
                      : item.category === 'karahi'
                      ? 'local_fire_department'
                      : item.category === 'trout'
                      ? 'water'
                      : 'outdoor_grill'}
                  </span>
                  {item.badge}
                </div>
              )}
              {item.tag && (
                <div className="absolute top-2.5 right-2.5 bg-[#2c322e]/85 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                  {item.tag}
                </div>
              )}
            </div>

            {/* Details & CTA */}
            <div className="p-3.5 flex flex-col justify-between gap-2.5">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-base text-[#181d1a]">{item.title}</h3>
                    <p className="text-[11px] font-semibold text-[#36684c] mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-bold text-[#9f3e07]">
                      PKR {item.price.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-[#57423a]">{item.unit}</span>
                  </div>
                </div>
                <p className="text-xs text-[#57423a] mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => onOpenDishDrawer(item.title)}
                  className="flex-1 bg-[#9f3e07] text-white py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform shadow-sm cursor-pointer hover:bg-[#853405]"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {item.category === 'buffet' ? 'table_restaurant' : 'shopping_bag'}
                  </span>
                  {item.category === 'buffet'
                    ? 'Reserve Seat'
                    : 'Order for Table / Takeaway'}
                </button>
                <button
                  aria-label={`Quick add ${item.title}`}
                  onClick={() => onQuickAdd(item)}
                  className="w-11 h-11 bg-[#ffdbcd] text-[#360f00] rounded-lg flex items-center justify-center active:scale-95 transition-transform hover:bg-[#ffb596] cursor-pointer"
                  title="Add to order"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-[#f0f5f0] rounded-2xl p-6 border border-[#dfe4df]">
            <div className="w-16 h-16 rounded-full bg-[#e5e9e4] flex items-center justify-center text-[#8a7268] mb-3">
              <span className="material-symbols-outlined text-[32px]">soup_kitchen</span>
            </div>
            <h4 className="font-semibold text-base text-[#181d1a]">No dishes found</h4>
            <p className="text-xs text-[#57423a] max-w-xs mt-1">
              Try searching for "trout", "karahi", or check our BBQ specialties.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 px-4 py-2 rounded-lg bg-[#9f3e07] text-white text-xs font-semibold shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* 6. Floating Cart Micro-Dock */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-20 inset-x-4 max-w-md mx-auto z-40 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-[#2c322e] text-white p-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#c05621] flex items-center justify-center text-white font-bold text-sm">
                {totalCartCount}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium truncate text-white/90">
                  {totalCartCount} item{totalCartCount > 1 ? 's' : ''} in your order
                </p>
                <p className="text-sm text-[#ffb596] font-bold">
                  PKR {totalCartPrice.toLocaleString()}
                </p>
              </div>
            </div>
            <NavLink
              to="order-and-dine"
              onNavigate={onProceedToOrder}
              className="bg-[#9f3e07] hover:bg-[#c05621] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md shrink-0 active:scale-95 transition-transform cursor-pointer"
            >
              <span>Review Order</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
