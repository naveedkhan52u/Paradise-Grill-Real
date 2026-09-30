import React, { useState, useEffect } from 'react';
import { ScreenType, CartItem, ReservationData } from './types';
import { MENU_ITEMS, RESTAURANT_INFO, MenuItem } from './data/restaurantData';
import { getScreenFromLocation, syncLocationWithScreen } from './utils/navigation';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/screens/HomeScreen';
import { MenuScreen } from './components/screens/MenuScreen';
import { OrderDineScreen } from './components/screens/OrderDineScreen';
import { LocationScreen } from './components/screens/LocationScreen';
import { RoomsScreen } from './components/screens/RoomsScreen';
import { AboutScreen } from './components/screens/AboutScreen';
import { ContactScreen } from './components/screens/ContactScreen';
import { ServicesScreen } from './components/screens/ServicesScreen';
import { DishDrawer } from './components/modals/DishDrawer';
import { QuickCallModal } from './components/modals/QuickCallModal';
import { BookingConfirmationModal } from './components/modals/BookingConfirmationModal';
import { PhotoGalleryModal } from './components/modals/PhotoGalleryModal';
import { ProfileModal } from './components/modals/ProfileModal';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>(() => getScreenFromLocation());
  const [diningMode, setDiningMode] = useState<'reserve' | 'pickup' | 'delivery'>('reserve');

  // Initial cart preloaded with local favorite specialties as shown in screen 3
  const [cart, setCart] = useState<CartItem[]>([
    {
      item: {
        id: 'platter-charcoal-spec',
        title: 'Paradise Charcoal Platter',
        subtitle: '4 Beef Seekh, 4 Boti, Chutney',
        category: 'bbq',
        price: 2450,
        unit: '/ Platter',
        description: 'Sizzling iron platter of charcoal-grilled seekh kebabs and tender lamb boti garnished with fresh coriander.',
        image: RESTAURANT_INFO.images.charcoalPlatter
      },
      qty: 1
    },
    {
      item: {
        id: 'roghni-naan-spec',
        title: 'Clay Oven Roghni Naan',
        subtitle: 'Fresh Sesame & Butter',
        category: 'rice',
        price: 120,
        unit: 'piece',
        description: 'Fresh sesame & butter glazed clay oven naan.',
        image: RESTAURANT_INFO.images.roghniNaan
      },
      qty: 2
    }
  ]);

  // Modal states
  const [drawerDish, setDrawerDish] = useState<MenuItem | null>(null);
  const [isDishDrawerOpen, setIsDishDrawerOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [galleryPhoto, setGalleryPhoto] = useState<{ url: string; caption: string } | null>(null);
  const [lastBooking, setLastBooking] = useState<{
    reservation: ReservationData;
    total: number;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  const handleOpenDishDrawer = (itemTitle: string) => {
    const found = MENU_ITEMS.find(m => m.title.toLowerCase().includes(itemTitle.toLowerCase()));
    if (found) {
      setDrawerDish(found);
      setIsDishDrawerOpen(true);
    } else {
      // Default fallback to first item
      setDrawerDish(MENU_ITEMS[0]);
      setIsDishDrawerOpen(true);
    }
  };

  const handleQuickAdd = (item: MenuItem) => {
    setCart(prev => {
      const idx = prev.findIndex(c => c.item.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].qty += 1;
        return copy;
      }
      return [...prev, { item, qty: 1 }];
    });
    showToast(`Added ${item.title} to your order`);
  };

  const handleAddToCartFromDrawer = (
    item: MenuItem,
    qty: number,
    options: {
      diningMode: 'dinein' | 'pickup' | 'delivery';
      tableZone: string;
      spiceLevel: string;
    }
  ) => {
    setCart(prev => {
      const idx = prev.findIndex(c => c.item.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].qty += qty;
        copy[idx].options = options;
        return copy;
      }
      return [...prev, { item, qty, options }];
    });
    showToast(`${qty}x ${item.title} added to order`);
  };

  const handleUpdateQty = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(c => {
          if (c.item.id === itemId) {
            const nextQty = c.qty + delta;
            return nextQty > 0 ? { ...c, qty: nextQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Paradise Hotel & Restaurant, Gilgit',
        text: 'Feast by the Glacial River with Karakoram views in Gilgit-Baltistan!',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        'Paradise Hotel & Restaurant, River View Rd, Sonikot, Gilgit. Dial: 0346 8482943'
      );
      showToast('Paradise Grill details copied to clipboard!');
    }
  };

  const handleConfirmOrder = (data: ReservationData, total: number) => {
    setLastBooking({ reservation: data, total });
  };

  const handleResetOrder = () => {
    setActiveScreen('home');
  };

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.qty, 0);

  // Listen for browser back/forward buttons (history popstate / hash)
  useEffect(() => {
    const handleLocationChange = () => {
      const screen = getScreenFromLocation();
      setActiveScreen(screen);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Sync browser URL, meta tags, and scroll to top whenever active screen changes
  useEffect(() => {
    syncLocationWithScreen(activeScreen);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [activeScreen]);

  return (
    <div className="min-h-screen w-full bg-[#f6fbf5] text-[#181d1a] flex flex-col items-center justify-start antialiased selection:bg-[#ffdbcd]">
      {/* Responsive Shell Wrapper */}
      <div className="w-full max-w-7xl min-h-screen bg-[#f6fbf5] flex flex-col relative">
        {/* Fixed Header */}
        <Header
          activeScreen={activeScreen}
          onNavigate={setActiveScreen}
          onOpenCallModal={() => setIsCallModalOpen(true)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onNavigateHome={() => setActiveScreen('home')}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full pt-16 flex flex-col">
          <div className="flex-1">
            {activeScreen === 'home' && (
              <HomeScreen
                onNavigate={setActiveScreen}
                onOpenDishDrawer={handleOpenDishDrawer}
                onOpenCallModal={() => setIsCallModalOpen(true)}
                onShare={handleShare}
                onSelectDiningMode={setDiningMode}
              />
            )}

            {activeScreen === 'menu' && (
              <MenuScreen
                cart={cart}
                onOpenDishDrawer={handleOpenDishDrawer}
                onQuickAdd={handleQuickAdd}
                onProceedToOrder={() => setActiveScreen('order-and-dine')}
              />
            )}

            {activeScreen === 'order-and-dine' && (
              <OrderDineScreen
                cart={cart}
                onUpdateQty={handleUpdateQty}
                onNavigateToMenu={() => setActiveScreen('menu')}
                onOpenCallModal={() => setIsCallModalOpen(true)}
                onConfirmOrder={handleConfirmOrder}
                initialMode={diningMode}
              />
            )}

            {activeScreen === 'location-and-hours' && (
              <LocationScreen
                onOpenCallModal={() => setIsCallModalOpen(true)}
                onOpenGalleryImage={(url, caption) => setGalleryPhoto({ url, caption })}
              />
            )}

            {activeScreen === 'rooms' && (
              <RoomsScreen
                onOpenCallModal={() => setIsCallModalOpen(true)}
                onOpenGalleryImage={(url, caption) => setGalleryPhoto({ url, caption })}
              />
            )}

            {activeScreen === 'about' && (
              <AboutScreen
                onNavigate={setActiveScreen}
                onOpenCallModal={() => setIsCallModalOpen(true)}
              />
            )}

            {activeScreen === 'contact' && (
              <ContactScreen
                onOpenCallModal={() => setIsCallModalOpen(true)}
              />
            )}

            {activeScreen === 'services' && (
              <ServicesScreen
                onNavigate={setActiveScreen}
                onOpenCallModal={() => setIsCallModalOpen(true)}
              />
            )}
          </div>

          {/* Comprehensive Website Footer */}
          <Footer
            onNavigate={setActiveScreen}
            onOpenCallModal={() => setIsCallModalOpen(true)}
          />
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav
          activeScreen={activeScreen}
          onSelectScreen={setActiveScreen}
          onQuickCall={() => setIsCallModalOpen(true)}
          cartCount={totalCartCount}
        />

        {/* Dish Drawer Modal */}
        <DishDrawer
          item={drawerDish}
          isOpen={isDishDrawerOpen}
          onClose={() => setIsDishDrawerOpen(false)}
          onAddToCart={handleAddToCartFromDrawer}
        />

        {/* Quick Call Modal */}
        <QuickCallModal
          isOpen={isCallModalOpen}
          onClose={() => setIsCallModalOpen(false)}
        />

        {/* Booking & Order Confirmation Modal */}
        <BookingConfirmationModal
          isOpen={!!lastBooking}
          reservation={lastBooking ? lastBooking.reservation : null}
          cart={cart}
          total={lastBooking ? lastBooking.total : 0}
          onClose={() => setLastBooking(null)}
          onReset={handleResetOrder}
        />

        {/* Photo Gallery Modal */}
        <PhotoGalleryModal
          isOpen={!!galleryPhoto}
          imageUrl={galleryPhoto?.url || null}
          caption={galleryPhoto?.caption || ''}
          onClose={() => setGalleryPhoto(null)}
        />

        {/* Guest Profile & Info Modal */}
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onNavigateToReservations={() => {
            setDiningMode('reserve');
            setActiveScreen('order-and-dine');
          }}
        />

        {/* Toast Feedback Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#2c322e] text-white px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-top-2 duration-200">
            <span
              className="material-symbols-outlined text-[#ffb596] text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              outdoor_grill
            </span>
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
