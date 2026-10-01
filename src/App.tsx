import React, { useState, useEffect } from 'react';
import { ScreenType, CartItem, ReservationData } from './types';
import { MENU_ITEMS, RESTAURANT_INFO, MenuItem, DELIVERY_ZONES } from './data/restaurantData';
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
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { supabase } from './lib/supabase';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>(() => getScreenFromLocation());
  const [diningMode, setDiningMode] = useState<'reserve' | 'pickup' | 'delivery'>('reserve');

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
  const [adminPath, setAdminPath] = useState(() => window.location.pathname === '/admin');
  const [adminUser, setAdminUser] = useState<any>(null);
  const [adminAuthChecked, setAdminAuthChecked] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();
      setAdminUser(data.user ?? null);
      setAdminAuthChecked(true);
    };
    checkAdmin();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminUser(session?.user ?? null);
    });
    const onPop = () => setAdminPath(window.location.pathname === '/admin');
    window.addEventListener('popstate', onPop);
    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener('popstate', onPop);
    };
  }, []);

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

  const handleConfirmOrder = async (data: ReservationData, total: number) => {
    const guestName = data.guestName.trim() || 'Valued Guest';
    const guestPhone = data.guestPhone.trim() || RESTAURANT_INFO.phone;
    const deliveryZone = DELIVERY_ZONES.find(z => z.name === data.deliveryZone);
    const reservationId = crypto.randomUUID();
    const orderId = crypto.randomUUID();
    const itemsSubtotal = cart.reduce((sum, item) => sum + item.qty * item.item.price, 0);
    const deliveryFee = data.mode === 'delivery' ? (deliveryZone?.fee ?? 150) : 0;

    try {
      if (data.mode === 'reserve') {
        const { error: reservationError } = await supabase.from('restaurant_reservations').insert({
          id: reservationId,
          mode: 'reserve',
          table_zone: data.tableZone,
          party_size: Number.parseInt(data.partySize, 10) || 1,
          time_slot: data.timeSlot,
          guest_name: guestName,
          guest_phone: guestPhone,
          special_request: data.specialRequest.trim() || null,
          status: 'pending'
        });

        if (reservationError) {
          console.error('Reservation submission failed:', reservationError);
          showToast('Unable to save the reservation. Please try again.');
          return;
        }
      }

      const { error: orderError } = await supabase.from('orders').insert({
        id: orderId,
        reservation_id: data.mode === 'reserve' ? reservationId : null,
        mode: data.mode === 'reserve' ? 'dinein' : data.mode,
        guest_name: guestName,
        guest_phone: guestPhone,
        table_zone: data.mode === 'reserve' ? data.tableZone : null,
        pickup_time: data.mode === 'pickup' ? data.pickupTime : null,
        vehicle_details: data.mode === 'pickup' ? data.vehicleDetails || null : null,
        delivery_zone_id: data.mode === 'delivery' ? (deliveryZone?.id ?? null) : null,
        delivery_address: data.mode === 'delivery' ? data.deliveryAddress || null : null,
        special_request: data.specialRequest.trim() || null,
        subtotal: itemsSubtotal,
        delivery_fee: deliveryFee,
        total,
        status: 'pending'
      });

      if (orderError) {
        console.error('Order submission failed:', orderError);
        showToast('Unable to save the order. Please try again.');
        return;
      }

      if (cart.length > 0) {
        const { data: menuRows, error: menuLookupError } = await supabase
          .from('menu_items')
          .select('id')
          .in('id', cart.map(item => item.item.id));

        if (menuLookupError) {
          console.error('Menu item lookup failed:', menuLookupError);
          showToast('Order saved, but menu items could not be verified.');
          return;
        }

        const validMenuItemIds = new Set((menuRows ?? []).map(item => item.id));

        const { error: itemsError } = await supabase.from('order_items').insert(
          cart.map(item => ({
            order_id: orderId,
            menu_item_id: validMenuItemIds.has(item.item.id) ? item.item.id : null,
            item_title: item.item.title,
            unit_price: item.item.price,
            quantity: item.qty,
            dining_mode: item.options?.diningMode || (data.mode === 'reserve' ? 'dinein' : data.mode),
            table_zone: item.options?.tableZone || data.tableZone,
            spice_level: item.options?.spiceLevel || null,
            line_total: item.qty * item.item.price
          }))
        );

        if (itemsError) {
          console.error('Order items submission failed:', itemsError);
          showToast('Order saved, but the item details could not be recorded.');
          return;
        }
      }

      setLastBooking({ reservation: data, total });
      showToast(data.mode === 'reserve' ? 'Reservation and order confirmed!' : 'Your order has been placed!');
    } catch (error) {
      console.error('Checkout submission failed:', error);
      showToast('Something went wrong while submitting. Please try again.');
    }
  };

  const handleResetOrder = () => {
    setActiveScreen('home');
  };

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.qty, 0);

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

  useEffect(() => {
    syncLocationWithScreen(activeScreen);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [activeScreen]);

  if (adminPath) {
    if (!adminAuthChecked) return <div className="min-h-screen bg-[#f6fbf5] flex items-center justify-center"><p className="text-sm font-semibold text-[#57423a]">Checking admin access...</p></div>;
    if (!adminUser || adminUser.app_metadata?.role !== 'admin') return <AdminLogin onSuccess={(user) => { if (user?.app_metadata?.role === 'admin') setAdminUser(user); }} onCancel={() => { window.history.pushState({}, '', '/'); setAdminPath(false); }} />;
    return <AdminDashboard onExit={() => { window.history.pushState({}, '', '/'); setAdminPath(false); }} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#f6fbf5] text-[#181d1a] flex flex-col items-center justify-start antialiased selection:bg-[#ffdbcd]">
      <div className="w-full max-w-7xl min-h-screen bg-[#f6fbf5] flex flex-col relative">
        <Header
          activeScreen={activeScreen}
          onNavigate={setActiveScreen}
          onOpenCallModal={() => setIsCallModalOpen(true)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onNavigateHome={() => setActiveScreen('home')}
        />

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
              <ContactScreen onOpenCallModal={() => setIsCallModalOpen(true)} />
            )}

            {activeScreen === 'services' && (
              <ServicesScreen
                onNavigate={setActiveScreen}
                onOpenCallModal={() => setIsCallModalOpen(true)}
              />
            )}
          </div>

          <Footer
            onNavigate={setActiveScreen}
            onOpenCallModal={() => setIsCallModalOpen(true)}
          />
        </main>

        <BottomNav
          activeScreen={activeScreen}
          onSelectScreen={setActiveScreen}
          onQuickCall={() => setIsCallModalOpen(true)}
          cartCount={totalCartCount}
        />

        <DishDrawer
          item={drawerDish}
          isOpen={isDishDrawerOpen}
          onClose={() => setIsDishDrawerOpen(false)}
          onAddToCart={handleAddToCartFromDrawer}
        />

        <QuickCallModal
          isOpen={isCallModalOpen}
          onClose={() => setIsCallModalOpen(false)}
        />

        <BookingConfirmationModal
          isOpen={!!lastBooking}
          reservation={lastBooking ? lastBooking.reservation : null}
          cart={cart}
          total={lastBooking ? lastBooking.total : 0}
          onClose={() => setLastBooking(null)}
          onReset={handleResetOrder}
        />

        <PhotoGalleryModal
          isOpen={!!galleryPhoto}
          imageUrl={galleryPhoto?.url || null}
          caption={galleryPhoto?.caption || ''}
          onClose={() => setGalleryPhoto(null)}
        />

        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onNavigateToReservations={() => {
            setDiningMode('reserve');
            setActiveScreen('order-and-dine');
          }}
        />

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
