import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../../data/restaurantData';

interface QuickCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickCallModal: React.FC<QuickCallModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.phoneRaw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#2c322e]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-[#dfe4df] animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#ffdbcd] text-[#9f3e07] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">contact_phone</span>
            </div>
            <div>
              <h3 className="font-semibold text-base text-[#181d1a]">Connect with Paradise</h3>
              <p className="text-xs text-[#57423a]">Sonikot, Gilgit-Baltistan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebefea] text-[#57423a] flex items-center justify-center hover:bg-[#dfe4df]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Status */}
        <div className="p-3 bg-[#f0f5f0] rounded-xl flex items-center justify-between border border-[#dfe4df]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#36684c] animate-pulse" />
            <span className="text-xs font-bold text-[#181d1a]">Dine-in Open Now</span>
          </div>
          <span className="text-xs text-[#57423a]">Closes 11:30 PM</span>
        </div>

        {/* Primary Call Line */}
        <div className="p-3.5 rounded-xl bg-[#ebefea] border border-[#dfe4df] flex flex-col gap-2">
          <span className="text-[11px] font-semibold text-[#57423a] uppercase tracking-wider">
            Direct Front Desk &amp; Kitchen
          </span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-[#181d1a] tracking-wide">
              {RESTAURANT_INFO.phone}
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-[#9f3e07] font-semibold hover:underline"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <a
            href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            className="w-full mt-1 py-2.5 rounded-xl bg-[#9f3e07] hover:bg-[#853405] text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Dial 0346 8482943</span>
          </a>
        </div>

        {/* WhatsApp Line */}
        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsApp}?text=Salam!%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation%20at%20Paradise%20Grill%20Gilgit.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 rounded-xl bg-[#36684c] hover:bg-[#275039] text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          <span>WhatsApp Front Desk</span>
        </a>

        <div className="text-center text-[11px] text-[#57423a]">
          Free roadside parking &amp; on-site attendant for 4x4s along River View Rd.
        </div>
      </div>
    </div>
  );
};
