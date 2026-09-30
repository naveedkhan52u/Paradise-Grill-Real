import React from 'react';
import { ReservationData, CartItem } from '../../types';
import { RESTAURANT_INFO } from '../../data/restaurantData';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  reservation: ReservationData | null;
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onReset: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  reservation,
  cart,
  total,
  onClose,
  onReset
}) => {
  if (!isOpen || !reservation) return null;

  const bookingCode = `PG-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleFinish = () => {
    onClose();
    onReset();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#2c322e]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) handleFinish();
      }}
    >
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl flex flex-col gap-3.5 border border-[#dfe4df] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-[#b8efcc] text-[#002111] flex items-center justify-center mb-2 shadow-sm">
            <span className="material-symbols-outlined text-[32px]">check_circle</span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9f3e07]">
            {reservation.mode === 'reserve'
              ? 'Riverfront Table Reserved'
              : reservation.mode === 'pickup'
              ? 'Curbside Pickup Confirmed'
              : 'Delivery Order Dispatched'}
          </span>
          <h3 className="font-semibold text-lg text-[#181d1a] mt-0.5">Booking {bookingCode}</h3>
          <p className="text-xs text-[#57423a] mt-0.5">
            Paradise Hotel &amp; Restaurant · Gilgit
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="p-3 bg-[#f0f5f0] rounded-xl border border-[#dfe4df] space-y-2 text-xs">
          {reservation.mode === 'reserve' ? (
            <>
              <div className="flex justify-between">
                <span className="text-[#57423a]">Seating Area:</span>
                <span className="font-bold text-[#181d1a]">{reservation.tableZone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57423a]">Party Size:</span>
                <span className="font-bold text-[#181d1a]">{reservation.partySize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57423a]">Time Slot:</span>
                <span className="font-bold text-[#9f3e07]">{reservation.timeSlot}</span>
              </div>
            </>
          ) : reservation.mode === 'pickup' ? (
            <>
              <div className="flex justify-between">
                <span className="text-[#57423a]">Pickup Spot:</span>
                <span className="font-bold text-[#181d1a]">River View Rd Gate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57423a]">Estimated Ready:</span>
                <span className="font-bold text-[#9f3e07]">{reservation.pickupTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57423a]">Vehicle / Runner Note:</span>
                <span className="font-bold text-[#181d1a]">{reservation.vehicleDetails}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="text-[#57423a]">Delivery Sector:</span>
                <span className="font-bold text-[#181d1a]">{reservation.deliveryZone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#57423a]">Address:</span>
                <span className="font-bold text-[#181d1a] truncate max-w-[180px]">
                  {reservation.deliveryAddress}
                </span>
              </div>
            </>
          )}

          <div className="flex justify-between border-t border-[#dfe4df] pt-2">
            <span className="text-[#57423a]">Contact Guest:</span>
            <span className="font-bold text-[#181d1a]">
              {reservation.guestName} ({reservation.guestPhone})
            </span>
          </div>
        </div>

        {/* Selected Items summary if any */}
        {cart.length > 0 && (
          <div className="p-3 bg-[#ebefea] rounded-xl border border-[#dfe4df] space-y-1.5 text-xs">
            <span className="font-bold text-[#181d1a] block mb-1">Pre-ordered Dishes</span>
            {cart.map(c => (
              <div key={c.item.id} className="flex justify-between text-[#57423a]">
                <span className="truncate max-w-[190px]">
                  {c.qty}x {c.item.title}
                </span>
                <span className="font-medium text-[#181d1a]">
                  PKR {(c.item.price * c.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Payment Amount & Cash Only notice */}
        <div className="p-3 rounded-xl bg-[#ffdbc9] border border-[#dec0b5] space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#321200]">Total to Pay (Cash Only)</span>
            <span className="text-base font-extrabold text-[#9f3e07]">
              PKR {total.toLocaleString()}
            </span>
          </div>
          <p className="text-[11px] text-[#753400] leading-tight">
            Please have cash ready in PKR. ATMs located 300m west along River View Road.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={handleFinish}
            className="w-full py-3 rounded-xl bg-[#9f3e07] hover:bg-[#853405] text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
          >
            Done &amp; Return to Home
          </button>
          <a
            href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            className="w-full py-2.5 rounded-xl bg-[#ebefea] text-[#181d1a] text-xs font-bold text-center border border-[#dfe4df] hover:bg-[#dfe4df] transition-colors"
          >
            Call Desk for Special Requests
          </a>
        </div>
      </div>
    </div>
  );
};
