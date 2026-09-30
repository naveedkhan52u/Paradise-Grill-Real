import React, { useState, useEffect } from 'react';
import { MenuItem } from '../../data/restaurantData';

interface DishDrawerProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, qty: number, options: {
    diningMode: 'dinein' | 'pickup' | 'delivery';
    tableZone: string;
    spiceLevel: string;
  }) => void;
}

export const DishDrawer: React.FC<DishDrawerProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [qty, setQty] = useState(1);
  const [diningMode, setDiningMode] = useState<'dinein' | 'pickup' | 'delivery'>('dinein');
  const [tableZone, setTableZone] = useState('Riverside Deck (Open Air)');
  const [spiceLevel, setSpiceLevel] = useState('Traditional Gilgit Mild');

  useEffect(() => {
    if (isOpen) {
      setQty(1);
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const totalPrice = item.price * qty;

  const handleConfirm = () => {
    onAddToCart(item, qty, {
      diningMode,
      tableZone,
      spiceLevel
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#2c322e]/60 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-h-[85vh] rounded-t-3xl p-4 flex flex-col gap-3 overflow-y-auto max-w-md mx-auto shadow-2xl animate-in slide-in-from-bottom-6 duration-200">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 rounded-full bg-[#dfe4df] mx-auto -mt-1 mb-1"></div>

        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#dfe4df] pb-2.5">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={item.image}
              alt={item.title}
              className="w-14 h-14 rounded-xl object-cover shrink-0 bg-[#ebefea]"
            />
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-[#181d1a] truncate">{item.title}</h3>
              <p className="text-base text-[#9f3e07] font-bold">
                PKR {item.price.toLocaleString()}{' '}
                <span className="text-[11px] text-[#57423a] font-normal">{item.unit}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebefea] text-[#57423a] flex items-center justify-center hover:bg-[#dfe4df] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Service Type Selector */}
        <div>
          <label className="block text-xs font-bold text-[#181d1a] mb-1.5">
            Order Dining Preference
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setDiningMode('dinein')}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer ${
                diningMode === 'dinein'
                  ? 'bg-[#ffdbcd] text-[#360f00] ring-1 ring-[#9f3e07]'
                  : 'bg-[#ebefea] text-[#57423a]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] mb-1">table_restaurant</span>
              <span>Dine In Table</span>
            </button>
            <button
              type="button"
              onClick={() => setDiningMode('pickup')}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer ${
                diningMode === 'pickup'
                  ? 'bg-[#ffdbcd] text-[#360f00] ring-1 ring-[#9f3e07]'
                  : 'bg-[#ebefea] text-[#57423a]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] mb-1">shopping_bag</span>
              <span>Fast Pickup</span>
            </button>
            <button
              type="button"
              onClick={() => setDiningMode('delivery')}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer ${
                diningMode === 'delivery'
                  ? 'bg-[#ffdbcd] text-[#360f00] ring-1 ring-[#9f3e07]'
                  : 'bg-[#ebefea] text-[#57423a]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] mb-1">local_shipping</span>
              <span>Hotel Delivery</span>
            </button>
          </div>
        </div>

        {/* Table Location Preference (Dine-in only) */}
        {diningMode === 'dinein' && (
          <div>
            <label className="block text-xs font-bold text-[#181d1a] mb-1.5">
              Preferred Table Zone
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTableZone('Riverside Deck (Open Air)')}
                className={`p-2.5 rounded-lg text-left text-xs transition-all cursor-pointer border ${
                  tableZone === 'Riverside Deck (Open Air)'
                    ? 'bg-[#f0f5f0] border-[#9f3e07] font-bold text-[#181d1a]'
                    : 'bg-[#ebefea] border-transparent text-[#57423a]'
                }`}
              >
                Riverside Deck (Open Air)
              </button>
              <button
                type="button"
                onClick={() => setTableZone('Indoor Stone Brazier')}
                className={`p-2.5 rounded-lg text-left text-xs transition-all cursor-pointer border ${
                  tableZone === 'Indoor Stone Brazier'
                    ? 'bg-[#f0f5f0] border-[#9f3e07] font-bold text-[#181d1a]'
                    : 'bg-[#ebefea] border-transparent text-[#57423a]'
                }`}
              >
                Indoor Stone Brazier
              </button>
            </div>
          </div>
        )}

        {/* Preparation Spice & Embers Tuning */}
        <div>
          <label className="block text-xs font-bold text-[#181d1a] mb-1.5">
            Spice &amp; Embers Tuning
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSpiceLevel('Traditional Gilgit Mild')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                spiceLevel === 'Traditional Gilgit Mild'
                  ? 'bg-[#ffdbcd] text-[#360f00]'
                  : 'bg-[#ebefea] text-[#57423a]'
              }`}
            >
              Traditional Gilgit Mild
            </button>
            <button
              type="button"
              onClick={() => setSpiceLevel('Karakoram Fire')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                spiceLevel === 'Karakoram Fire'
                  ? 'bg-[#ffdbcd] text-[#360f00]'
                  : 'bg-[#ebefea] text-[#57423a]'
              }`}
            >
              Karakoram Fire 🔥
            </button>
          </div>
        </div>

        {/* Quantity Stepper */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-bold text-[#181d1a]">Quantity</span>
          <div className="flex items-center gap-2 bg-[#f0f5f0] rounded-xl p-1 border border-[#dfe4df]">
            <button
              type="button"
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-8 h-8 rounded-lg bg-white text-[#181d1a] flex items-center justify-center shadow-sm cursor-pointer hover:bg-[#ebefea]"
            >
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span className="font-bold text-sm px-2 text-[#181d1a]">{qty}</span>
            <button
              type="button"
              onClick={() => setQty(qty + 1)}
              className="w-8 h-8 rounded-lg bg-white text-[#181d1a] flex items-center justify-center shadow-sm cursor-pointer hover:bg-[#ebefea]"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 pb-safe">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full bg-[#c05621] hover:bg-[#9f3e07] text-white py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>Add to Feast · PKR {totalPrice.toLocaleString()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
