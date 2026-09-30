import React, { useState } from 'react';
import { RESTAURANT_INFO, LANDMARKS, WEEKLY_HOURS, REVIEWS } from '../../data/restaurantData';

interface LocationScreenProps {
  onOpenCallModal: () => void;
  onOpenGalleryImage: (imgUrl: string, caption: string) => void;
}

export const LocationScreen: React.FC<LocationScreenProps> = ({
  onOpenCallModal,
  onOpenGalleryImage
}) => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const featuredReview = REVIEWS[0];

  return (
    <div className="flex flex-col w-full pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1">
      {/* 1. Visual Ambience Banner Card */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#ebefea] shadow-sm border border-[#dfe4df] mb-4">
        <div
          className="w-full h-52 sm:h-64 md:h-72 bg-cover bg-center"
          style={{ backgroundImage: `url('${RESTAURANT_INFO.images.locationAmbience}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c322e]/95 via-[#2c322e]/40 to-transparent flex flex-col justify-end p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#36684c] text-white text-[11px] sm:text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#b8efcc] animate-pulse"></span>
                Open Now · Closes 11:30 PM
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#181d1a] text-[11px] sm:text-xs font-bold">
                <span
                  className="material-symbols-outlined text-[13px] text-[#b75d1d]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                3.8 (1,001+ reviews)
              </span>
            </div>
            <h1 className="font-semibold text-xl sm:text-2xl text-white font-headline-sm">
              {RESTAURANT_INFO.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-white/90 flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[16px] text-[#ffb596]">location_on</span>
              {RESTAURANT_INFO.address}
            </p>
          </div>
        </div>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Direct Access & Map */}
        <div className="lg:col-span-6 space-y-4">
          {/* 2. Primary One-Tap Actions */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
            <button
              onClick={onOpenCallModal}
              className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl bg-[#9f3e07] hover:bg-[#853405] text-white text-xs sm:text-sm font-bold shadow-sm active:scale-98 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              <span>Call Desk</span>
            </button>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsApp}?text=Salam!%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation%20at%20Paradise%20Grill%20Gilgit.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl bg-[#36684c] hover:bg-[#275039] text-white text-xs sm:text-sm font-bold shadow-sm active:scale-98 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>WhatsApp</span>
            </a>
          </div>

          {/* 3. Interactive Map & Landmarks Section */}
          <div className="rounded-xl bg-[#f0f5f0] p-4 sm:p-5 shadow-sm border border-[#dfe4df] space-y-3.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <span className="text-[11px] uppercase tracking-wider text-[#9f3e07] font-bold">
                  Location &amp; Access
                </span>
                <h2 className="font-semibold text-base sm:text-lg text-[#181d1a] mt-0.5">Overlooking Gilgit River</h2>
                <p className="text-xs sm:text-sm text-[#57423a] mt-0.5 leading-snug">
                  River View Rd, Sonikot, Gilgit, 23345, Gilgit-Baltistan
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#e5e9e4] flex items-center justify-center text-[#9f3e07] shrink-0">
                <span className="material-symbols-outlined text-[22px]">explore</span>
              </div>
            </div>

            {/* Map Viewport */}
            <div className="relative w-full h-52 sm:h-64 rounded-lg overflow-hidden shadow-inner border border-[#dfe4df]">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${RESTAURANT_INFO.images.mapSnapshot2}')` }}
              />
              <div className="absolute bottom-2 left-2 right-2 bg-[#2c322e]/90 backdrop-blur-md px-3 py-2 rounded-lg flex items-center justify-between text-white">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="material-symbols-outlined text-[#ffb596] text-[16px]">pin_drop</span>
                  <span className="text-xs truncate font-medium">Sonikot Bankside Promenade</span>
                </div>
                <span className="text-[11px] text-[#b8efcc] shrink-0 font-semibold">
                  Live Traffic Normal
                </span>
              </div>
            </div>

            {/* Nearby Key Landmarks */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              {LANDMARKS.map(lm => (
                <div
                  key={lm.name}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-[#ebefea] border border-[#dfe4df]/70"
                >
                  <div className="w-8 h-8 rounded-full bg-[#ffdbcd] flex items-center justify-center text-[#360f00] shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-[#9f3e07]">{lm.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#181d1a] truncate">{lm.name}</p>
                    <p className="text-[11px] sm:text-xs text-[#57423a]">{lm.desc}</p>
                  </div>
                  <span className="text-xs sm:text-sm text-[#9f3e07] font-bold">{lm.distance}</span>
                </div>
              ))}
            </div>

            {/* Get Directions Action Button */}
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-[#c05621] hover:bg-[#9f3e07] text-white text-xs sm:text-sm font-bold shadow-sm active:scale-98 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">directions</span>
              <span>Get Google Maps Directions</span>
            </a>
          </div>

          {/* 7. Authentic Karakoram Hospitality Imagery Card */}
          <div className="rounded-xl bg-[#f0f5f0] p-4 sm:p-5 shadow-sm border border-[#dfe4df] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-base text-[#181d1a]">The Riverbank Experience</h2>
              <span className="text-xs text-[#9f3e07] font-semibold">Photo Gallery</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onOpenGalleryImage(RESTAURANT_INFO.images.galleryBBQ, 'Fresh BBQ Platter')}
                className="relative rounded-lg overflow-hidden h-36 bg-[#ebefea] group text-left cursor-pointer border border-[#dfe4df]"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={RESTAURANT_INFO.images.galleryBBQ}
                  alt="Fresh BBQ Platter"
                  loading="lazy"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-[#2c322e]/85 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  Fresh BBQ Platter
                </span>
              </button>

              <button
                type="button"
                onClick={() => onOpenGalleryImage(RESTAURANT_INFO.images.galleryDeck, 'Riverside Deck at Twilight')}
                className="relative rounded-lg overflow-hidden h-36 bg-[#ebefea] group text-left cursor-pointer border border-[#dfe4df]"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={RESTAURANT_INFO.images.galleryDeck}
                  alt="Riverside Deck"
                  loading="lazy"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-[#2c322e]/85 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  Riverside Deck
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Schedule, Policies & Reviews */}
        <div className="lg:col-span-6 space-y-4">
          {/* 4. Operating Hours Card with Interactive Expansion */}
          <div className="rounded-xl bg-[#f0f5f0] p-4 sm:p-5 shadow-sm border border-[#dfe4df]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#b8efcc] text-[#002111] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </div>
                <div>
                  <h2 className="font-semibold text-sm sm:text-base text-[#181d1a]">Hours of Operation</h2>
                  <p className="text-xs text-[#36684c] flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#36684c]"></span>
                    Today: {RESTAURANT_INFO.hoursToday}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsScheduleOpen(!isScheduleOpen)}
                className="px-3 py-1 rounded-full bg-[#e5e9e4] hover:bg-[#dfe4df] text-[#181d1a] text-xs font-semibold flex items-center gap-0.5 active:bg-[#dfe4df] transition-colors cursor-pointer"
              >
                <span>{isScheduleOpen ? 'Hide' : 'All Week'}</span>
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                    isScheduleOpen ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-[#ebefea] space-y-1.5 mb-2 border border-[#dfe4df]/60">
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#9f3e07] font-bold">
                <span>Today (Open)</span>
                <span>12:00 PM – 11:30 PM</span>
              </div>
              <p className="text-xs text-[#57423a] leading-snug">
                Live Charcoal BBQ pits ignite at 6:30 PM. Riverfront tables fill quickly at dusk.
              </p>
            </div>

            {/* Collapsible Full Weekly Schedule */}
            {isScheduleOpen && (
              <div className="space-y-1.5 pt-2 border-t border-[#dfe4df] animate-in fade-in duration-200">
                {WEEKLY_HOURS.map(wh => (
                  <div
                    key={wh.day}
                    className={`flex justify-between items-center py-1 text-xs sm:text-sm ${
                      wh.day.includes('Friday')
                        ? 'text-[#9f3e07] font-bold'
                        : 'text-[#181d1a]'
                    }`}
                  >
                    <span>{wh.day}</span>
                    <span className="text-[#57423a]">{wh.hours}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Direct Contact Card */}
          <div className="rounded-xl bg-[#f0f5f0] p-4 sm:p-5 shadow-sm border border-[#dfe4df] space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#ffdbcd] text-[#360f00] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px] text-[#9f3e07]">contact_phone</span>
              </div>
              <div>
                <h2 className="font-semibold text-sm sm:text-base text-[#181d1a]">Direct Contact</h2>
                <p className="text-xs text-[#57423a]">Paradise Hotel &amp; Restaurant Front Desk</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#ebefea] flex items-center justify-between border border-[#dfe4df]/70">
              <div className="min-w-0">
                <span className="text-[10px] text-[#57423a] uppercase tracking-wider font-semibold">
                  Direct Hotline
                </span>
                <p className="text-base sm:text-lg text-[#181d1a] font-bold">{RESTAURANT_INFO.phone}</p>
                <span className="text-xs text-[#36684c]">Dialable 24/7 for hotel &amp; diner guests</span>
              </div>
              <button
                onClick={onOpenCallModal}
                className="w-11 h-11 rounded-full bg-[#9f3e07] hover:bg-[#853405] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer"
                aria-label="Call front desk"
              >
                <span className="material-symbols-outlined text-[20px]">phone_enabled</span>
              </button>
            </div>
          </div>

          {/* 6. Verified Dining Policies & Guest Amenities Grid */}
          <div className="rounded-xl bg-[#f0f5f0] p-4 sm:p-5 shadow-sm border border-[#dfe4df] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-base text-[#181d1a]">Hospitality &amp; Policies</h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#b8efcc] text-[#002111]">
                Verified Details
              </span>
            </div>

            {/* Important Notice: Payment Policy */}
            <div className="p-3.5 rounded-lg bg-[#ffdbc9] text-[#321200] flex items-start gap-2.5 border border-[#dec0b5]">
              <span className="material-symbols-outlined text-[20px] text-[#984501] shrink-0 mt-0.5">
                payments
              </span>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-[#321200]">Cash Only Facility</h3>
                <p className="text-xs text-[#753400] mt-0.5 leading-snug">
                  Card POS machines are subject to regional cellular link limits. Please bring cash (PKR). Nearest ATM is in Sonikot bazaar (3 mins).
                </p>
              </div>
            </div>

            {/* 4 Amenities */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 rounded-lg bg-[#ebefea] flex flex-col justify-between space-y-2 border border-[#dfe4df]/60">
                <div className="w-8 h-8 rounded-full bg-[#b8efcc] text-[#002111] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">deck</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#181d1a]">Riverbank Seating</h4>
                  <p className="text-[11px] text-[#57423a] mt-0.5 leading-tight">
                    Direct open terrace along the Gilgit River surge
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#ebefea] flex flex-col justify-between space-y-2 border border-[#dfe4df]/60">
                <div className="w-8 h-8 rounded-full bg-[#ffdbcd] text-[#360f00] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-[#9f3e07]">outdoor_grill</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#181d1a]">BBQ Buffet</h4>
                  <p className="text-[11px] text-[#57423a] mt-0.5 leading-tight">
                    Unlimited live skewers, seekh kebabs &amp; hot naan
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#ebefea] flex flex-col justify-between space-y-2 border border-[#dfe4df]/60">
                <div className="w-8 h-8 rounded-full bg-[#b8efcc] text-[#002111] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">family_restroom</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#181d1a]">Family Hall &amp; Prayer</h4>
                  <p className="text-[11px] text-[#57423a] mt-0.5 leading-tight">
                    Private family enclosures &amp; clean ablution space
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#ebefea] flex flex-col justify-between space-y-2 border border-[#dfe4df]/60">
                <div className="w-8 h-8 rounded-full bg-[#e5e9e4] text-[#181d1a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">local_parking</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#181d1a]">Valet &amp; Parking</h4>
                  <p className="text-[11px] text-[#57423a] mt-0.5 leading-tight">
                    Free roadside parking &amp; on-site attendant for 4x4s
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 8. Google Reviews Summary & Rating Distribution */}
          <div className="rounded-xl bg-[#f0f5f0] p-4 sm:p-5 shadow-sm border border-[#dfe4df] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl text-[#181d1a] font-bold">3.8</span>
                  <div className="flex text-[#b75d1d]">
                    {[...Array(3)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px] sm:text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                    <span
                      className="material-symbols-outlined text-[18px] sm:text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star_half
                    </span>
                    <span className="material-symbols-outlined text-[18px] sm:text-[20px]">star</span>
                  </div>
                </div>
                <p className="text-xs text-[#57423a] mt-0.5">Based on 1,001+ verified Google reviews</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#ebefea] flex items-center justify-center text-[#9f3e07] shrink-0 shadow-sm border border-[#dfe4df]">
                <span className="material-symbols-outlined text-[26px]">rate_review</span>
              </div>
            </div>

            {/* Rating Distribution Progress */}
            <div className="space-y-2 p-3 rounded-lg bg-[#ebefea] border border-[#dfe4df]/60">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#57423a] w-20">Food &amp; BBQ</span>
                <div className="flex-1 h-2 rounded-full bg-[#dfe4df] overflow-hidden">
                  <div className="h-full bg-[#9f3e07] rounded-full" style={{ width: '86%' }} />
                </div>
                <span className="text-xs text-[#181d1a] font-bold w-7 text-right">4.4</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#57423a] w-20">Location</span>
                <div className="flex-1 h-2 rounded-full bg-[#dfe4df] overflow-hidden">
                  <div className="h-full bg-[#36684c] rounded-full" style={{ width: '94%' }} />
                </div>
                <span className="text-xs text-[#181d1a] font-bold w-7 text-right">4.8</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#57423a] w-20">Service</span>
                <div className="flex-1 h-2 rounded-full bg-[#dfe4df] overflow-hidden">
                  <div className="h-full bg-[#b75d1d] rounded-full" style={{ width: '72%' }} />
                </div>
                <span className="text-xs text-[#181d1a] font-bold w-7 text-right">3.6</span>
              </div>
            </div>

            {/* Verified Reviewer Snippet */}
            <div className="p-3.5 rounded-lg bg-white shadow-sm border border-[#dfe4df] space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#ffdbcd] text-[#360f00] text-xs flex items-center justify-center font-bold">
                    TM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#181d1a]">{featuredReview.author}</p>
                    <p className="text-[10px] text-[#57423a]">{featuredReview.role}</p>
                  </div>
                </div>
                <span className="text-[10px] text-[#57423a]">{featuredReview.timeAgo}</span>
              </div>
              <p className="text-xs text-[#181d1a] italic leading-relaxed">
                "{featuredReview.quote}"
              </p>
            </div>

            {/* Write a Review Button */}
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJParadiseHotelGilgit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-[#dfe4df] hover:bg-[#d7dbd6] text-[#181d1a] text-xs sm:text-sm font-bold active:bg-[#d7dbd6] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#984501]">edit_note</span>
              <span>Share Feedback on Google</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
