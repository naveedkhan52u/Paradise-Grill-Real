import React, { useState } from 'react';
import { RoomItem } from '../../types';
import { HOTEL_ROOMS, HOTEL_SERVICES } from '../../data/roomsData';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { RoomBookingModal } from '../modals/RoomBookingModal';

interface RoomsScreenProps {
  onOpenCallModal: () => void;
  onOpenGalleryImage?: (url: string, caption: string) => void;
}

export const RoomsScreen: React.FC<RoomsScreenProps> = ({
  onOpenCallModal,
  onOpenGalleryImage
}) => {
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<RoomItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<Record<string, number>>({});

  const handleBookNow = (room: RoomItem) => {
    setSelectedRoomForBooking(room);
    setIsBookingModalOpen(true);
  };

  const handleCyclePhoto = (roomId: string, length: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % length
    }));
  };

  return (
    <div className="flex flex-col w-full pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1">
      {/* 1. Hero Ambience Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-[#ebefea] shadow-sm border border-[#dfe4df] mb-6">
        <div
          className="w-full h-56 sm:h-72 md:h-80 bg-cover bg-center relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c322e]/95 via-[#2c322e]/45 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#36684c] text-white text-[11px] sm:text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#b8efcc] animate-pulse"></span>
                Riverside Accommodation · Est. 1946
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#181d1a] text-[11px] sm:text-xs font-bold">
                <span
                  className="material-symbols-outlined text-[13px] text-[#9f3e07]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                Direct Hotel Booking
              </span>
            </div>

            <h1 className="font-bold text-xl sm:text-3xl text-white font-headline-sm">
              Stay by the Glacial Waters of Gilgit River
            </h1>
            <p className="text-xs sm:text-base text-white/90 mt-1 max-w-2xl leading-relaxed">
              Tranquil alpine rooms, wooden suites, private river balconies, and round-the-clock hot water heating in Sonikot, Gilgit.
            </p>

            {/* Quick action strip */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <button
                type="button"
                onClick={() => handleBookNow(HOTEL_ROOMS[0])}
                className="h-10 sm:h-11 px-5 rounded-xl bg-[#9f3e07] hover:bg-[#853405] text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 active:scale-98 transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                <span>Book a Room Now</span>
              </button>
              <button
                type="button"
                onClick={onOpenCallModal}
                className="h-10 sm:h-11 px-4 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Call Front Desk ({RESTAURANT_INFO.phone})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Types of Rooms Display */}
      <section className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#dfe4df] pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9f3e07]">
              Accommodation Choices
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#181d1a] mt-0.5">
              Available Room Types &amp; Suites
            </h2>
            <p className="text-xs sm:text-sm text-[#57423a]">
              Choose from 3 curated room categories tailored for couples, adventurers, and family groups.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#ebefea] text-[#36684c] border border-[#dfe4df] self-start sm:self-auto">
            3 Room Types Available
          </span>
        </div>

        {/* 3 Room Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {HOTEL_ROOMS.map(room => {
            const currentImgIndex = activePhotoIndex[room.id] || 0;
            const currentImg = room.gallery[currentImgIndex] || room.image;

            return (
              <div
                key={room.id}
                className="rounded-2xl bg-white border border-[#dfe4df] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Photo with Badge & Carousel toggle */}
                  <div className="relative h-56 sm:h-64 w-full bg-[#ebefea] overflow-hidden">
                    <img
                      src={currentImg}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#9f3e07] text-white text-[11px] font-bold shadow-md">
                        {room.badge}
                      </span>
                    </div>

                    {/* Gallery switcher buttons */}
                    {room.gallery.length > 1 && (
                      <div className="absolute bottom-2.5 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-white text-[11px]">
                        <button
                          type="button"
                          onClick={(e) => handleCyclePhoto(room.id, room.gallery.length, e)}
                          className="hover:text-[#ffb596] transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">photo_library</span>
                          <span>{currentImgIndex + 1}/{room.gallery.length}</span>
                        </button>
                      </div>
                    )}

                    {/* Price tag over photo */}
                    <div className="absolute bottom-2.5 left-3 text-white">
                      <span className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">
                        PKR {room.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-xs text-white/90 ml-1">/ night</span>
                    </div>
                  </div>

                  {/* Room Details Body */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#181d1a] group-hover:text-[#9f3e07] transition-colors">
                        {room.name}
                      </h3>
                      <p className="text-xs text-[#57423a] mt-0.5 line-clamp-2">
                        {room.tagline}
                      </p>
                    </div>

                    {/* Specs Pills */}
                    <div className="flex items-center gap-2 flex-wrap text-xs text-[#181d1a]">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#ebefea] text-[#360f00] font-medium">
                        <span className="material-symbols-outlined text-[15px] text-[#9f3e07]">bed</span>
                        {room.bedType}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#ebefea] text-[#360f00] font-medium">
                        <span className="material-symbols-outlined text-[15px] text-[#9f3e07]">group</span>
                        {room.capacity}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#ebefea] text-[#360f00] font-medium">
                        <span className="material-symbols-outlined text-[15px] text-[#9f3e07]">square_foot</span>
                        {room.sizeSqFt} sq ft
                      </span>
                    </div>

                    <p className="text-xs text-[#57423a] leading-relaxed">
                      {room.description}
                    </p>

                    {/* Key Amenities */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#57423a] block mb-1.5">
                        Room Amenities:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-xs text-[#181d1a]">
                        {room.amenities.map(amenity => (
                          <div key={amenity} className="flex items-center gap-1.5 truncate">
                            <span
                              className="material-symbols-outlined text-[14px] text-[#36684c] shrink-0"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                            <span className="text-[11px] truncate">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer with "Book Now" Button */}
                <div className="p-4 sm:p-5 pt-0 mt-2 border-t border-[#dfe4df]/60 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleBookNow(room)}
                    className="flex-1 h-12 rounded-xl bg-[#9f3e07] hover:bg-[#853405] text-white text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center gap-2 active:scale-98 transition-transform cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">hotel</span>
                    <span>Book Now</span>
                  </button>

                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsApp}?text=Salam!%20I%20would%20like%20to%20inquire%20about%20booking%20the%20${encodeURIComponent(room.name)}%20at%20Paradise%20Hotel%20Gilgit.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#ebefea] hover:bg-[#dfe4df] text-[#36684c] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    aria-label={`Inquire about ${room.name} on WhatsApp`}
                    title="WhatsApp Front Desk"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Hotel Services & Mountain Guest Assurances */}
      <section className="rounded-2xl bg-[#f0f5f0] p-4 sm:p-6 border border-[#dfe4df] space-y-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#9f3e07]">
            Guest Comforts &amp; Facilities
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#181d1a] mt-0.5">
            Designed for Karakoram Mountain Travel
          </h2>
          <p className="text-xs sm:text-sm text-[#57423a]">
            Enjoy peaceful nights with all northern hospitality conveniences intact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {HOTEL_SERVICES.map(srv => (
            <div
              key={srv.title}
              className="p-3.5 rounded-xl bg-white border border-[#dfe4df]/80 space-y-1.5 shadow-2xs"
            >
              <div className="w-9 h-9 rounded-lg bg-[#ffdbcd] text-[#9f3e07] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">{srv.icon}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#181d1a]">{srv.title}</h3>
              <p className="text-[11px] text-[#57423a] leading-relaxed">{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Hotel Policies & Check-In Guide */}
      <section className="rounded-2xl bg-[#ebefea] p-4 sm:p-6 border border-[#dfe4df] grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[#9f3e07] font-bold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>Check-in / Check-out</span>
          </div>
          <p className="text-xs font-bold text-[#181d1a]">Check-In: 12:00 PM · Check-Out: 11:30 AM</p>
          <p className="text-[11px] text-[#57423a]">
            Early check-in can be accommodated based on flight schedules from Islamabad.
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[#9f3e07] font-bold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">payments</span>
            <span>Payment Method</span>
          </div>
          <p className="text-xs font-bold text-[#181d1a]">Cash Only Facility (PKR)</p>
          <p className="text-[11px] text-[#57423a]">
            Please settle bill in cash upon check-in. Nearest ATMs are within 300 meters at Sonikot Bazaar.
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[#9f3e07] font-bold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">support_agent</span>
            <span>Front Desk Hotline</span>
          </div>
          <p className="text-xs font-bold text-[#181d1a]">{RESTAURANT_INFO.phone} (24/7)</p>
          <p className="text-[11px] text-[#57423a]">
            Hotel concierge is on duty 24 hours to assist with luggage, jeep rentals, and tour guidance.
          </p>
        </div>
      </section>

      {/* Booking Modal with the 5 required fields and submit button */}
      <RoomBookingModal
        isOpen={isBookingModalOpen}
        selectedRoom={selectedRoomForBooking}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};
