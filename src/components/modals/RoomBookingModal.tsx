import React, { useState, useEffect } from 'react';
import { RoomItem, RoomBookingData } from '../../types';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { HOTEL_ROOMS } from '../../data/roomsData';

interface RoomBookingModalProps {
  isOpen: boolean;
  selectedRoom: RoomItem | null;
  onClose: () => void;
  onBookingSubmitted?: (booking: RoomBookingData) => void;
}

export const RoomBookingModal: React.FC<RoomBookingModalProps> = ({
  isOpen,
  selectedRoom,
  onClose,
  onBookingSubmitted
}) => {
  // Dates default: checkIn = today (YYYY-MM-DD), checkOut = tomorrow
  const getTodayString = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const getTomorrowString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState(getTodayString());
  const [checkOutDate, setCheckOutDate] = useState(getTomorrowString());
  const [roomQuantity, setRoomQuantity] = useState(1);
  const [guestQuantity, setGuestQuantity] = useState(2);
  const [customMessage, setCustomMessage] = useState('');
  const [activeRoomId, setActiveRoomId] = useState(selectedRoom?.id || HOTEL_ROOMS[0].id);

  // Status & Confirmation
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Sync active room when modal opens or selectedRoom changes
  useEffect(() => {
    if (selectedRoom) {
      setActiveRoomId(selectedRoom.id);
    }
  }, [selectedRoom]);

  // Reset when reopened
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setErrorMsg('');
      if (!customerName) {
        // default dates
        setCheckInDate(getTodayString());
        setCheckOutDate(getTomorrowString());
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentRoom = HOTEL_ROOMS.find(r => r.id === activeRoomId) || HOTEL_ROOMS[0];

  // Calculate nights
  const calculateNights = () => {
    try {
      const inDate = new Date(checkInDate);
      const outDate = new Date(checkOutDate);
      const diffTime = outDate.getTime() - inDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  };

  const nights = calculateNights();
  const totalPrice = currentRoom.pricePerNight * nights * roomQuantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Please enter the customer name.');
      return;
    }

    if (!contactNumber.trim() || contactNumber.trim().length < 8) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }

    if (checkOutDate <= checkInDate) {
      setErrorMsg('Check-out date must be after check-in date.');
      return;
    }

    const bookingRef = `PGH-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedBookingId(bookingRef);

    const bookingPayload: RoomBookingData = {
      customerName: customerName.trim(),
      contactNumber: contactNumber.trim(),
      checkInDate,
      checkOutDate,
      roomQuantity,
      guestQuantity,
      customMessage: customMessage.trim(),
      roomType: currentRoom.name,
      pricePerNight: currentRoom.pricePerNight
    };

    if (onBookingSubmitted) {
      onBookingSubmitted(bookingPayload);
    }

    setIsSubmitted(true);
  };

  // WhatsApp message generation
  const buildWhatsAppLink = () => {
    const text = `Salam Paradise Hotel & Restaurant Gilgit!%0A%0A*NEW ROOM RESERVATION REQUEST*%0A*Booking Ref:* ${confirmedBookingId}%0A*Room:* ${currentRoom.name}%0A*Customer Name:* ${customerName}%0A*Contact:* ${contactNumber}%0A*Check-In:* ${checkInDate}%0A*Check-Out:* ${checkOutDate} (${nights} Night${nights > 1 ? 's' : ''})%0A*Rooms:* ${roomQuantity}%0A*Guests:* ${guestQuantity}%0A*Est. Total:* PKR ${totalPrice.toLocaleString()}%0A${customMessage ? `*Special Request:* ${encodeURIComponent(customMessage)}%0A` : ''}%0APlease confirm availability and lock our reservation. Thank you!`;
    return `https://wa.me/${RESTAURANT_INFO.whatsApp}?text=${text}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-booking-title"
    >
      <div className="relative w-full max-w-lg bg-[#f6fbf5] rounded-2xl shadow-2xl border border-[#dfe4df] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2c322e] to-[#36684c] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#ffb596]">
              <span className="material-symbols-outlined text-[24px]">hotel</span>
            </div>
            <div>
              <h2 id="room-booking-title" className="text-base sm:text-lg font-bold font-headline-sm leading-snug">
                {isSubmitted ? 'Booking Requested!' : 'Book Your Stay in Gilgit'}
              </h2>
              <p className="text-xs text-white/80">
                {isSubmitted
                  ? `Ref: ${confirmedBookingId} · Paradise Hotel Gilgit`
                  : 'Overlooking Gilgit River · Direct Hotel Desk'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {isSubmitted ? (
            /* Confirmation Success State */
            <div className="space-y-4 text-center py-2 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#b8efcc] text-[#002111] flex items-center justify-center mx-auto shadow-md">
                <span
                  className="material-symbols-outlined text-[36px] text-[#36684c]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#ffdbcd] text-[#9f3e07] text-xs font-bold uppercase tracking-wider mb-1">
                  Booking Request Recorded
                </span>
                <h3 className="text-xl font-bold text-[#181d1a]">
                  Thank You, {customerName}!
                </h3>
                <p className="text-xs sm:text-sm text-[#57423a] mt-1 max-w-sm mx-auto">
                  Our front desk team has received your reservation request for the <span className="font-semibold text-[#181d1a]">{currentRoom.name}</span>.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="bg-[#ebefea] rounded-xl p-4 text-left border border-[#dfe4df] space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-[#dfe4df]">
                  <span className="text-[#57423a] font-medium">Reservation Code:</span>
                  <span className="font-bold text-[#9f3e07] tracking-wider text-sm">{confirmedBookingId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#57423a]">Selected Room:</span>
                  <span className="font-semibold text-[#181d1a]">{currentRoom.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#57423a]">Customer:</span>
                  <span className="font-semibold text-[#181d1a]">{customerName} ({contactNumber})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#57423a]">Dates:</span>
                  <span className="font-semibold text-[#181d1a]">
                    {checkInDate} to {checkOutDate} ({nights} night{nights > 1 ? 's' : ''})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#57423a]">Quantity:</span>
                  <span className="font-semibold text-[#181d1a]">{roomQuantity} Room(s) · {guestQuantity} Guest(s)</span>
                </div>
                {customMessage && (
                  <div className="pt-1 text-[11px] text-[#57423a] italic border-t border-[#dfe4df]">
                    "Note: {customMessage}"
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-[#dfe4df] text-sm">
                  <span className="font-bold text-[#181d1a]">Estimated Total:</span>
                  <span className="font-bold text-[#9f3e07]">PKR {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Cash Policy Notice */}
              <div className="p-3 rounded-lg bg-[#ffdbc9]/60 text-[#321200] text-xs flex items-center gap-2 text-left">
                <span className="material-symbols-outlined text-[18px] text-[#984501] shrink-0">
                  payments
                </span>
                <span>Payment is made in Cash (PKR) upon arrival at Paradise Hotel Gilgit front desk.</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-[#36684c] hover:bg-[#275039] text-white text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-98"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span>Instant WhatsApp Confirmation</span>
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-[#ebefea] hover:bg-[#dfe4df] text-[#181d1a] text-xs sm:text-sm font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#9f3e07]">call</span>
                  <span>Call Hotel Front Desk ({RESTAURANT_INFO.phone})</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 text-xs text-[#57423a] hover:text-[#181d1a] font-medium cursor-pointer"
                >
                  Back to Rooms
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                  <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Room Selection Banner */}
              <div className="p-3 rounded-xl bg-[#ebefea] border border-[#dfe4df] flex items-center gap-3">
                <img
                  src={currentRoom.image}
                  alt={currentRoom.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9f3e07]">
                      {currentRoom.badge}
                    </span>
                    <span className="text-xs font-bold text-[#181d1a]">
                      PKR {currentRoom.pricePerNight.toLocaleString()}/night
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#181d1a] truncate">{currentRoom.name}</h3>
                  <p className="text-[11px] text-[#57423a] truncate">{currentRoom.bedType} · {currentRoom.capacity}</p>
                </div>
              </div>

              {/* Room Type Switcher Tabs */}
              <div>
                <label className="block text-xs font-bold text-[#181d1a] mb-1.5">
                  Select Room Category:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {HOTEL_ROOMS.map(rm => (
                    <button
                      key={rm.id}
                      type="button"
                      onClick={() => setActiveRoomId(rm.id)}
                      className={`p-2 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                        activeRoomId === rm.id
                          ? 'bg-[#ffdbcd] border-[#9f3e07] text-[#360f00] font-bold shadow-xs'
                          : 'bg-white border-[#dfe4df] text-[#57423a] hover:bg-[#ebefea]'
                      }`}
                    >
                      <p className="truncate font-semibold">{rm.name.replace(' Room', '').replace(' Suite', '')}</p>
                      <p className="text-[10px] opacity-80">PKR {rm.pricePerNight.toLocaleString()}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. Customer Name */}
              <div>
                <label htmlFor="customer-name" className="block text-xs font-bold text-[#181d1a] mb-1">
                  1. Customer Name <span className="text-[#9f3e07]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#57423a] text-[18px]">
                    person
                  </span>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Tariq Hussain"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white rounded-lg border border-[#dfe4df] focus:border-[#9f3e07] focus:ring-1 focus:ring-[#9f3e07] outline-none text-[#181d1a]"
                  />
                </div>
              </div>

              {/* 2. Contact Number */}
              <div>
                <label htmlFor="contact-number" className="block text-xs font-bold text-[#181d1a] mb-1">
                  2. Contact Number (Phone / WhatsApp) <span className="text-[#9f3e07]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#57423a] text-[18px]">
                    phone
                  </span>
                  <input
                    id="contact-number"
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={e => setContactNumber(e.target.value)}
                    placeholder="e.g. 0345 1234567 or +92 300..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white rounded-lg border border-[#dfe4df] focus:border-[#9f3e07] focus:ring-1 focus:ring-[#9f3e07] outline-none text-[#181d1a]"
                  />
                </div>
              </div>

              {/* 3. Check In and Check Out Date */}
              <div>
                <label className="block text-xs font-bold text-[#181d1a] mb-1">
                  3. Check-In &amp; Check-Out Date <span className="text-[#9f3e07]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-[#57423a] font-medium block mb-0.5">Check-In</span>
                    <input
                      type="date"
                      required
                      value={checkInDate}
                      min={getTodayString()}
                      onChange={e => setCheckInDate(e.target.value)}
                      className="w-full px-2.5 py-2 text-xs bg-white rounded-lg border border-[#dfe4df] focus:border-[#9f3e07] outline-none text-[#181d1a]"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#57423a] font-medium block mb-0.5">Check-Out</span>
                    <input
                      type="date"
                      required
                      value={checkOutDate}
                      min={checkInDate || getTodayString()}
                      onChange={e => setCheckOutDate(e.target.value)}
                      className="w-full px-2.5 py-2 text-xs bg-white rounded-lg border border-[#dfe4df] focus:border-[#9f3e07] outline-none text-[#181d1a]"
                    />
                  </div>
                </div>
                <div className="mt-1 text-[11px] text-[#36684c] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                  Duration: {nights} Night{nights > 1 ? 's' : ''} Stay
                </div>
              </div>

              {/* 4. Room Quantity and Guest Quantity */}
              <div className="grid grid-cols-2 gap-3">
                {/* Room Quantity */}
                <div>
                  <label htmlFor="room-qty" className="block text-xs font-bold text-[#181d1a] mb-1">
                    4a. Room Quantity
                  </label>
                  <div className="flex items-center justify-between bg-white border border-[#dfe4df] rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setRoomQuantity(q => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded bg-[#ebefea] text-[#181d1a] flex items-center justify-center font-bold hover:bg-[#dfe4df] active:scale-95 transition-transform cursor-pointer"
                    >
                      -
                    </button>
                    <span id="room-qty" className="text-xs sm:text-sm font-bold text-[#181d1a]">
                      {roomQuantity} Room{roomQuantity > 1 ? 's' : ''}
                    </span>
                    <button
                      type="button"
                      onClick={() => setRoomQuantity(q => Math.min(10, q + 1))}
                      className="w-8 h-8 rounded bg-[#ebefea] text-[#181d1a] flex items-center justify-center font-bold hover:bg-[#dfe4df] active:scale-95 transition-transform cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Guest Quantity */}
                <div>
                  <label htmlFor="guest-qty" className="block text-xs font-bold text-[#181d1a] mb-1">
                    4b. Guest Quantity
                  </label>
                  <div className="flex items-center justify-between bg-white border border-[#dfe4df] rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setGuestQuantity(g => Math.max(1, g - 1))}
                      className="w-8 h-8 rounded bg-[#ebefea] text-[#181d1a] flex items-center justify-center font-bold hover:bg-[#dfe4df] active:scale-95 transition-transform cursor-pointer"
                    >
                      -
                    </button>
                    <span id="guest-qty" className="text-xs sm:text-sm font-bold text-[#181d1a]">
                      {guestQuantity} Guest{guestQuantity > 1 ? 's' : ''}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestQuantity(g => Math.min(20, g + 1))}
                      className="w-8 h-8 rounded bg-[#ebefea] text-[#181d1a] flex items-center justify-center font-bold hover:bg-[#dfe4df] active:scale-95 transition-transform cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. Custom Message Option */}
              <div>
                <label htmlFor="custom-message" className="block text-xs font-bold text-[#181d1a] mb-1">
                  5. Custom Message / Special Requests <span className="text-[11px] text-[#57423a] font-normal">(Optional)</span>
                </label>
                <textarea
                  id="custom-message"
                  rows={2}
                  value={customMessage}
                  onChange={e => setCustomMessage(e.target.value)}
                  placeholder="e.g. Need early check-in around 11:00 AM, airport pick up from Gilgit, extra blanket, or riverfront upper floor..."
                  className="w-full p-2.5 text-xs bg-white rounded-lg border border-[#dfe4df] focus:border-[#9f3e07] focus:ring-1 focus:ring-[#9f3e07] outline-none text-[#181d1a] resize-none"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="p-3 rounded-lg bg-[#ebefea] border border-[#dfe4df] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#57423a] block">
                    Estimated Booking Total
                  </span>
                  <span className="text-xs text-[#57423a]">
                    PKR {currentRoom.pricePerNight.toLocaleString()} × {nights} Night{nights > 1 ? 's' : ''} × {roomQuantity} Room{roomQuantity > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-base sm:text-lg font-bold text-[#9f3e07]">
                    PKR {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* 6. Submit Booking Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#9f3e07] hover:bg-[#853405] text-white text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
              >
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Submit Booking Button</span>
              </button>

              <p className="text-[11px] text-center text-[#57423a]">
                No advance credit card required. Pay cash upon check-in at Paradise Hotel Gilgit.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
