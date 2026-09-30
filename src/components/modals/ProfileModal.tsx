import React from 'react';
import { RESTAURANT_INFO } from '../../data/restaurantData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToReservations: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onNavigateToReservations
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#2c322e]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl flex flex-col gap-3.5 border border-[#dfe4df] animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#dfe4df] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#ffdbcd] text-[#360f00] flex items-center justify-center font-bold text-sm">
              PG
            </div>
            <div>
              <h3 className="font-semibold text-sm text-[#181d1a]">Guest Lounge</h3>
              <span className="text-[11px] text-[#36684c] font-semibold">
                Karakoram Dine Rewards
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebefea] text-[#57423a] flex items-center justify-center hover:bg-[#dfe4df]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Member Card */}
        <div className="p-3.5 bg-gradient-to-br from-[#9f3e07] to-[#c05621] text-white rounded-xl shadow-sm flex flex-col gap-2 relative overflow-hidden">
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
            Paradise Hospitality Pass
          </span>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-base font-bold">Valued Diner</p>
              <p className="text-[11px] text-white/80">Gilgit River Terrace Guest</p>
            </div>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">
              Tier 1
            </span>
          </div>
        </div>

        {/* Quick Menu shortcuts */}
        <div className="space-y-1.5 text-xs text-[#181d1a]">
          <button
            onClick={() => {
              onClose();
              onNavigateToReservations();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#f0f5f0] hover:bg-[#ebefea] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9f3e07] text-[18px]">
                table_restaurant
              </span>
              <span>Reserve Terrace Table</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#8a7268]">
              chevron_right
            </span>
          </button>

          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#f0f5f0] hover:bg-[#ebefea] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#36684c] text-[18px]">
                navigation
              </span>
              <span>Directions &amp; Map Coordinates</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#8a7268]">
              chevron_right
            </span>
          </a>

          <a
            href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#f0f5f0] hover:bg-[#ebefea] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#984501] text-[18px]">call</span>
              <span>Direct Desk: {RESTAURANT_INFO.phone}</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#8a7268]">
              chevron_right
            </span>
          </a>
        </div>

        <div className="text-[11px] text-[#57423a] text-center pt-1 border-t border-[#dfe4df]">
          Paradise Hotel &amp; Restaurant · River View Rd, Sonikot, Gilgit
        </div>
      </div>
    </div>
  );
};
