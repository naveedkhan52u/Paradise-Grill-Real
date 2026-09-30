import React from 'react';
import { ScreenType } from '../../types';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { SocialMediaBar } from '../SocialIcons';
import { NavLink } from '../../utils/navigation';

interface ServicesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenCallModal: () => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  onNavigate,
  onOpenCallModal
}) => {
  const servicesList = [
    {
      id: 'dining-bbq',
      title: 'Riverside Charcoal BBQ & Dining',
      subtitle: 'Open-Air Riverbank Deck & Live Fire Pits',
      icon: 'outdoor_grill',
      badge: 'Signature Experience',
      image: RESTAURANT_INFO.images.galleryBBQ,
      description: 'Feast right by the roaring Gilgit River with skewers of tender beef seekh kebabs, marinated chicken boti, lamb chops, and fresh Karakoram trout prepared live over glowing coals starting daily at 6:30 PM.',
      highlights: [
        'Open-air timber deck directly over the water',
        'Traditional wok Karahi cooked in fresh butter',
        'Clay oven Roghni & Garlic Naan baked fresh',
        'Riverside family dining partitions'
      ],
      actionLabel: 'View BBQ Menu',
      actionScreen: 'menu' as ScreenType
    },
    {
      id: 'hotel-rooms',
      title: 'Hotel Rooms & Scenic Suites',
      subtitle: 'Alpine Comfort & 24/7 Hot Water Heating',
      icon: 'hotel',
      badge: 'Est. 1946 Accommodation',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      description: 'Cozy, peaceful rooms and executive family suites featuring private balconies overlooking Sonikot rapids and snowcapped ridges. Fully equipped with modern geysers and central heating for chilly mountain evenings.',
      highlights: [
        '3 room tiers from PKR 5,500 to 14,500/night',
        '24/7 hot water & generator power backup',
        'Complimentary mountain breakfast included',
        'Direct lawn & riverside terrace access'
      ],
      actionLabel: 'Browse Room Types',
      actionScreen: 'rooms' as ScreenType
    },
    {
      id: 'events-banquets',
      title: 'Private Events & Family Celebrations',
      subtitle: 'Riverbank Terrace for up to 150 Guests',
      icon: 'celebration',
      badge: 'Group Bookings',
      image: RESTAURANT_INFO.images.galleryDeck,
      description: 'Host unforgettable wedding receptions, anniversary dinners, corporate retreats, and tour group banquets by the water. We provide tailored buffet packages, traditional sound setups, and attentive service.',
      highlights: [
        'Custom buffet menus with Karakoram specialties',
        'Separate covered family enclosures for privacy',
        'Decor and seating arrangements tailored to group size',
        'Dedicated event coordinator & service staff'
      ],
      actionLabel: 'Contact for Event Booking',
      actionScreen: 'contact' as ScreenType
    },
    {
      id: 'tour-parking',
      title: '4x4 Tour Jeep & Expedition Support',
      subtitle: 'Guarded Parking & Mountain Excursion Services',
      icon: 'commute',
      badge: 'Traveler Logistics',
      image: RESTAURANT_INFO.images.locationAmbience,
      description: 'Gilgit is the gateway to Hunza, Skardu, and Khunjerab. We provide secure, guarded parking for overland 4x4s, jeeps, and caravans, along with fresh packed lunches for high-altitude day excursions.',
      highlights: [
        'Free secure parking inside premises for hotel guests',
        'Packed breakfast & lunch boxes for day travel',
        'Trusted local driver & 4x4 jeep referrals',
        'Luggage storage for multi-day trekking departures'
      ],
      actionLabel: 'Inquire Logistics',
      actionScreen: 'contact' as ScreenType
    },
    {
      id: 'airport-shuttle',
      title: 'Gilgit Airport Transfers',
      subtitle: '12-Minute Convenient Pick & Drop Service',
      icon: 'flight',
      badge: 'On Request',
      image: RESTAURANT_INFO.images.mapSnapshot1,
      description: 'Arriving on the scenic Islamabad-Gilgit flight? Our shuttle can meet you at Gilgit Airport (GIL) and bring you smoothly to Paradise Hotel in just 12 minutes through scenic Sonikot roads.',
      highlights: [
        'Reliable pickup timed with flight landings',
        'Spacious vehicle for family luggage',
        'Direct check-in upon arrival at the desk',
        'Early check-in support for morning flight arrivals'
      ],
      actionLabel: 'Contact Front Desk',
      actionScreen: 'contact' as ScreenType
    },
    {
      id: 'takeaway-delivery',
      title: 'Takeaway & City Delivery',
      subtitle: 'Hot & Fresh Charcoal Food to Your Doorstep',
      icon: 'moped',
      badge: 'Express Service',
      image: RESTAURANT_INFO.images.charcoalPlatter,
      description: 'Craving Paradise Grill signature platters and fresh naans at your residence, office, or guesthouse in Gilgit? We offer prompt takeaway packing and express local delivery throughout Gilgit city.',
      highlights: [
        'Heavy-duty thermal foil packaging to retain piping heat',
        'Average preparation time under 25 minutes',
        'Full menu available including platters and Karahis',
        'Direct ordering via WhatsApp or telephone desk'
      ],
      actionLabel: 'Order Dine or Delivery',
      actionScreen: 'order-and-dine' as ScreenType
    }
  ];

  return (
    <div className="flex flex-col w-full pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1">
      {/* 1. Header Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-[#ebefea] shadow-sm border border-[#dfe4df] mb-8">
        <div
          className="w-full h-56 sm:h-72 bg-cover bg-center relative"
          style={{ backgroundImage: `url('${RESTAURANT_INFO.images.heroRiverside}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c322e]/95 via-[#2c322e]/45 to-transparent flex flex-col justify-end p-5 sm:p-8">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffdbcd] text-[#9f3e07] text-xs font-bold">
                Hospitality &amp; Facilities
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#181d1a] text-xs font-bold">
                Paradise Hotel &amp; Restaurant
              </span>
            </div>
            <h1 className="font-bold text-2xl sm:text-4xl text-white font-headline-sm">
              Our Services &amp; Guest Amenities
            </h1>
            <p className="text-xs sm:text-base text-white/90 mt-1 max-w-2xl leading-relaxed">
              Everything you need for an unforgettable stay and dining experience on the banks of the Gilgit River.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="space-y-6 mb-12">
        <div className="flex items-end justify-between border-b border-[#dfe4df] pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9f3e07]">
              Comprehensive Offerings
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#181d1a] mt-0.5">
              Dining, Lodging &amp; Mountain Travel Services
            </h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ebefea] text-[#36684c] border border-[#dfe4df] hidden sm:inline-block">
            6 Core Services
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map(srv => (
            <div
              key={srv.id}
              className="rounded-2xl bg-white border border-[#dfe4df] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative h-48 w-full bg-[#ebefea] overflow-hidden">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#9f3e07] text-white text-[11px] font-bold shadow-md">
                      {srv.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[22px] text-[#ffb596]">{srv.icon}</span>
                    <span className="text-xs font-semibold drop-shadow-sm">{srv.subtitle}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-[#181d1a] group-hover:text-[#9f3e07] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#57423a] leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="pt-2 border-t border-[#dfe4df]/60 space-y-1.5">
                    {srv.highlights.map(hl => (
                      <div key={hl} className="flex items-center gap-2 text-xs text-[#181d1a]">
                        <span
                          className="material-symbols-outlined text-[15px] text-[#36684c] shrink-0"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span className="text-[11px]">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0 mt-3">
                <NavLink
                  to={srv.actionScreen}
                  onNavigate={onNavigate}
                  className="w-full h-11 rounded-xl bg-[#ebefea] hover:bg-[#dfe4df] text-[#181d1a] hover:text-[#9f3e07] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{srv.actionLabel}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Social Connect & Quick Hotline */}
      <section className="rounded-2xl bg-[#f0f5f0] p-6 sm:p-8 border border-[#dfe4df] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9f3e07]">
            Stay Connected
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#181d1a]">
            Follow Paradise Hotel &amp; Restaurant
          </h3>
          <p className="text-xs sm:text-sm text-[#57423a] max-w-xl">
            See recent customer reviews, video clips of our riverfront deck, and seasonal Gilgit accommodation offers on our social pages:
          </p>
          <div className="pt-2 flex justify-center md:justify-start">
            <SocialMediaBar className="flex items-center gap-3" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={onOpenCallModal}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#9f3e07] hover:bg-[#853405] text-white text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">call</span>
            <span>Call 24/7 Desk ({RESTAURANT_INFO.phone})</span>
          </button>
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsApp}?text=Salam!%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#36684c] hover:bg-[#275039] text-white text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>WhatsApp Us</span>
          </a>
        </div>
      </section>
    </div>
  );
};
