import React, { useState } from 'react';
import { RESTAURANT_INFO, DELIVERY_ZONES } from '../../data/restaurantData';
import { CartItem, ReservationData } from '../../types';
import { NavLink } from '../../utils/navigation';

interface OrderDineScreenProps {
  cart: CartItem[];
  onUpdateQty: (itemId: string, delta: number) => void;
  onNavigateToMenu: () => void;
  onOpenCallModal: () => void;
  onConfirmOrder: (data: ReservationData, total: number) => void;
  initialMode?: 'reserve' | 'pickup' | 'delivery';
}

export const OrderDineScreen: React.FC<OrderDineScreenProps> = ({
  cart,
  onUpdateQty,
  onNavigateToMenu,
  onOpenCallModal,
  onConfirmOrder,
  initialMode = 'reserve'
}) => {
  const [diningMode, setDiningMode] = useState<'reserve' | 'pickup' | 'delivery'>(initialMode);
  const [tableZone, setTableZone] = useState<'Terrace Railing' | 'Hearth Brazier'>('Terrace Railing');
  const [partySize, setPartySize] = useState<string>('4 Guests');
  const [timeSlot, setTimeSlot] = useState<string>('8:00 PM (Sunset)');
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [contactError, setContactError] = useState<string>('');
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [pickupTime, setPickupTime] = useState<string>('In 25 mins');
  const [vehicleDetails, setVehicleDetails] = useState<string>('White Prado / GLT-4821');
  const [deliverySector, setDeliverySector] = useState<string>('sonikot');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Near Sonikot Jamatkhana, Gate #2');

  const partyOptions = ['2 Guests', '4 Guests', '6 Guests', '8+ Family'];
  const timeSlotOptions = ['6:30 PM', '7:15 PM', '8:00 PM (Sunset)', '8:45 PM', '9:30 PM', '10:15 PM'];

  // Cost calculation
  const itemsSubtotal = cart.reduce((acc, curr) => acc + curr.qty * curr.item.price, 0);
  const packagingFee = cart.length > 0 ? 120 : 0;

  const deliveryZoneObj = DELIVERY_ZONES.find(z => z.id === deliverySector);
  const deliveryFee = diningMode === 'delivery' ? (deliveryZoneObj ? deliveryZoneObj.fee : 150) : 0;
  const grandTotal = itemsSubtotal + packagingFee + deliveryFee;

  const handlePrimaryAction = () => {
    if ((diningMode === 'pickup' || diningMode === 'delivery') && !guestName.trim()) {
      setContactError('Please enter your full name before placing the order.');
      return;
    }

    if ((diningMode === 'pickup' || diningMode === 'delivery') && !guestPhone.trim()) {
      setContactError('Please enter your phone number so the restaurant can contact you.');
      return;
    }

    setContactError('');

    const data: ReservationData = {
      mode: diningMode,
      tableZone,
      partySize,
      timeSlot,
      guestName: guestName.trim() || 'Valued Guest',
      guestPhone: guestPhone.trim() || RESTAURANT_INFO.phone,
      specialRequest,
      pickupTime,
      vehicleDetails,
      deliveryZone: deliveryZoneObj?.name || 'Sonikot',
      deliveryAddress
    };
    onConfirmOrder(data, grandTotal);
  };

  return (
    <div className="flex flex-col w-full pb-24 max-w-7xl mx-auto">
      {/* 1. Immersive Riverside Ambience Banner */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden rounded-b-2xl shadow-md">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${RESTAURANT_INFO.images.orderDineBanner}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c322e]/95 via-[#2c322e]/45 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 flex flex-col gap-1 text-white max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#9f3e07] text-white text-[11px] sm:text-xs font-bold shadow-sm">
              <span
                className="material-symbols-outlined text-[13px] mr-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                outdoor_grill
              </span>
              Hearth &amp; River
            </span>
            <span className="inline-flex items-center text-[#b8efcc] text-[11px] sm:text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b8efcc] mr-1"></span>
              Open till 11:30 PM
            </span>
          </div>
          <h2 className="font-headline-md sm:text-3xl md:text-4xl tracking-tight text-white font-semibold">
            Riverside Feast &amp; Dining
          </h2>
          <p className="text-xs sm:text-sm text-white/85 line-clamp-1">
            Wood-fired barbecue over the rushing Gilgit River canyon
          </p>
        </div>
      </div>

      {/* Main Content: Responsive 2-column layout on laptop/desktop */}
      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
        {/* Left Column: Form & Experiences */}
        <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-4">
          {/* 2. Instant Phone Assistance Callout */}
          <button
            onClick={onOpenCallModal}
            className="w-full bg-white rounded-xl p-3 sm:p-4 shadow-sm flex items-center justify-between transition-transform active:scale-[0.98] border border-[#dfe4df] text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffdbcd] text-[#9f3e07] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-[#181d1a]">
                  Need Assistance Right Now?
                </span>
                <span className="text-xs sm:text-sm text-[#9f3e07] font-bold">
                  Call {RESTAURANT_INFO.phone} for Instant Booking
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#8a7268] text-[20px]">
              chevron_right
            </span>
          </button>

          {/* 3. Mode Switcher (3 Segmented Choices) */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-[#57423a] uppercase tracking-wider">
              Select Dining Experience
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#dfe4df] rounded-xl">
              <button
                onClick={() => setDiningMode('reserve')}
                className={`py-2 px-1.5 rounded-lg flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  diningMode === 'reserve'
                    ? 'bg-white text-[#9f3e07] shadow-sm font-bold'
                    : 'text-[#57423a] hover:text-[#181d1a]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: diningMode === 'reserve' ? "'FILL' 1" : "'FILL' 0" }}
                >
                  table_restaurant
                </span>
                <span className="text-[11px] sm:text-xs mt-1">Reserve Table</span>
              </button>

              <button
                onClick={() => setDiningMode('pickup')}
                className={`py-2 px-1.5 rounded-lg flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  diningMode === 'pickup'
                    ? 'bg-white text-[#9f3e07] shadow-sm font-bold'
                    : 'text-[#57423a] hover:text-[#181d1a]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">takeout_dining</span>
                <span className="text-[11px] sm:text-xs mt-1">Order Pickup</span>
              </button>

              <button
                onClick={() => setDiningMode('delivery')}
                className={`py-2 px-1.5 rounded-lg flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  diningMode === 'delivery'
                    ? 'bg-white text-[#9f3e07] shadow-sm font-bold'
                    : 'text-[#57423a] hover:text-[#181d1a]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">moped</span>
                <span className="text-[11px] sm:text-xs mt-1">Gilgit Delivery</span>
              </button>
            </div>
          </div>

          {/* 4. Panel 1: Reserve Outdoor Riverfront Table */}
          {diningMode === 'reserve' && (
            <section className="flex flex-col gap-3 animate-in fade-in duration-150">
              {/* Zone Card */}
              <div className="bg-[#f0f5f0] rounded-xl p-4 shadow-sm border border-[#dfe4df] flex flex-col gap-2.5">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="inline-flex items-center text-[#984501] text-[11px] font-bold uppercase tracking-wide">
                      <span className="material-symbols-outlined text-[14px] mr-1">wb_twilight</span>{' '}
                      Premier Seating
                    </span>
                    <h3 className="font-semibold text-base sm:text-lg text-[#181d1a]">
                      Riverfront Sunset Terrace
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#b8efcc] text-[#002111] text-[11px] font-bold">
                    4 tables left
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#57423a] leading-relaxed">
                  Perched along the wooden carved balustrade directly overlooking the rushing Gilgit River and Mount Rakaposhi sunset horizon.
                </p>

                {/* Table Area Zone Selector */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setTableZone('Terrace Railing')}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      tableZone === 'Terrace Railing'
                        ? 'bg-white border-[#9f3e07] shadow-sm ring-1 ring-[#9f3e07]'
                        : 'bg-[#ebefea] border-transparent hover:bg-white'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        tableZone === 'Terrace Railing' ? 'border-[#9f3e07]' : 'border-[#8a7268]'
                      }`}
                    >
                      {tableZone === 'Terrace Railing' && (
                        <div className="w-2 h-2 rounded-full bg-[#9f3e07]" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold text-[#181d1a]">Terrace Railing</span>
                      <span className="text-[10px] sm:text-xs text-[#57423a]">Direct canyon vista</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTableZone('Hearth Brazier')}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      tableZone === 'Hearth Brazier'
                        ? 'bg-white border-[#9f3e07] shadow-sm ring-1 ring-[#9f3e07]'
                        : 'bg-[#ebefea] border-transparent hover:bg-white'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        tableZone === 'Hearth Brazier' ? 'border-[#9f3e07]' : 'border-[#8a7268]'
                      }`}
                    >
                      {tableZone === 'Hearth Brazier' && (
                        <div className="w-2 h-2 rounded-full bg-[#9f3e07]" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold text-[#181d1a]">Hearth Brazier</span>
                      <span className="text-[10px] sm:text-xs text-[#57423a]">Beside wood grill</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Party Size Selector */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-[#dfe4df] flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-bold text-[#181d1a]">Party Size (Diners)</label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {partyOptions.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setPartySize(opt)}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold shrink-0 transition-colors cursor-pointer ${
                        partySize === opt
                          ? 'bg-[#9f3e07] text-white shadow-sm'
                          : 'bg-[#ebefea] text-[#181d1a] hover:bg-[#dfe4df]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Evening Time Slot Selector */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-[#dfe4df] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-[#181d1a]">Available Slots Tonight</label>
                  <span className="text-[11px] sm:text-xs text-[#984501] font-semibold">Kitchen closes 11:00 PM</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlotOptions.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2.5 px-1 rounded-lg text-center text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        timeSlot === slot
                          ? 'bg-[#9f3e07] text-white shadow-sm'
                          : 'bg-[#ebefea] text-[#181d1a] hover:bg-[#dfe4df]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Details Form */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-[#dfe4df] flex flex-col gap-3">
                <span className="text-xs sm:text-sm font-bold text-[#181d1a]">Reservation Contact</span>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] sm:text-xs text-[#57423a]">Full Name</label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f0] text-sm text-[#181d1a] placeholder:text-[#8a7268] border border-[#dfe4df] focus:border-[#9f3e07] focus:outline-none"
                    placeholder="e.g. Tariq Shah"
                    type="text"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] sm:text-xs text-[#57423a]">Contact Mobile</label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f0] text-sm text-[#181d1a] placeholder:text-[#8a7268] border border-[#dfe4df] focus:border-[#9f3e07] focus:outline-none"
                    placeholder="0346 8482943"
                    type="tel"
                    value={guestPhone}
                    onChange={e => setGuestPhone(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] sm:text-xs text-[#57423a]">
                    Special Occasion or Seating Request (Optional)
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f0] text-sm text-[#181d1a] placeholder:text-[#8a7268] border border-[#dfe4df] focus:border-[#9f3e07] focus:outline-none"
                    placeholder="e.g. Celebrating anniversary, quiet table"
                    type="text"
                    value={specialRequest}
                    onChange={e => setSpecialRequest(e.target.value)}
                  />
                </div>
              </div>
            </section>
          )}

          {/* 5. Panel 2: Order Pickup (Curbside) */}
          {diningMode === 'pickup' && (
            <section className="flex flex-col gap-3 animate-in fade-in duration-150">
              <div className="bg-[#f0f5f0] rounded-xl p-4 shadow-sm border border-[#dfe4df] flex flex-col gap-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffdbc9] text-[#984501] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">directions_car</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-sm sm:text-base text-[#181d1a]">River View Road Curbside</h3>
                    <span className="text-xs text-[#57423a]">Main Entrance Gate, Gilgit</span>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg flex items-center gap-2 border border-[#dfe4df]">
                  <span className="material-symbols-outlined text-[#9f3e07] text-[18px]">info</span>
                  <p className="text-xs sm:text-sm text-[#181d1a]">
                    Our attendant will run hot platters directly to your parked vehicle.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-[#dfe4df] flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] sm:text-xs font-semibold text-[#57423a]">Full Name <span className="text-[#9f3e07]">*</span></label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f0] text-sm text-[#181d1a] placeholder:text-[#8a7268] border border-[#dfe4df] focus:border-[#9f3e07] focus:outline-none"
                    placeholder="e.g. Naveed Khan"
                    type="text"
                    value={guestName}
                    onChange={e => { setGuestName(e.target.value); setContactError(''); }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] sm:text-xs font-semibold text-[#57423a]">Contact Phone <span className="text-[#9f3e07]">*</span></label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f0] text-sm text-[#181d1a] placeholder:text-[#8a7268] border border-[#dfe4df] focus:border-[#9f3e07] focus:outline-none"
                    placeholder="0346 8482943"
                    type="tel"
                    value={guestPhone}
                    onChange={e => { setGuestPhone(e.target.value); setContactError(''); }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] sm:text-xs font-semibold text-[#57423a]">
                    Estimated Pickup Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['In 25 mins', 'In 40 mins', 'Schedule'].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setPickupTime(t)}
                        className={`py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-center transition-colors cursor-pointer ${
                          pickupTime === t
                            ? 'bg-[#9f3e07] text-white shadow-sm'
                            : 'bg-[#ebefea] text-[#181d1a] hover:bg-[#dfe4df]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] sm:text-xs font-semibold text-[#57423a]">
                    Vehicle Details (For Curbside Runner)
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f0] text-sm text-[#181d1a] placeholder:text-[#8a7268] border border-[#dfe4df] focus:border-[#9f3e07] focus:outline-none"
                    placeholder="e.g. White Prado / GLT-4821"
                    type="text"
                    value={vehicleDetails}
                    onChange={e => setVehicleDetails(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] sm:text-xs font-semibold text-[#57423a]">Contact Phone</label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f0] text-sm text-[#181d1a] border border-[#dfe4df] focus:border-[#9f3e07] focus:outline-none"
                    type="tel"
                    value={guestPhone}
                    onChange={e => setGuestPhone(e.target.value)}
                  />
                </div>
              </div>
            </section>
          )}

          {/* 6. Panel 3: Order Delivery (Gilgit Zones) */}
          {diningMode === 'delivery' && (
            <section className="flex flex-col gap-3 animate-in fade-in duration-150">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-[#dfe4df] flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] sm:text-xs font-semibold text-[#57423a]">Full Name <span className="text-[#9f3e07]">*</span></label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f0] text-sm text-[#181d1a] placeholder:text-[#8a7268] border border-[#dfe4df] focus:border-[#9f3e07] focus:outline-none"
                    placeholder="e.g. Naveed Khan"
                    type="text"
                    value={guestName}
                    onChange={e => { setGuestName(e.target.value); setContactError(''); }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] sm:text-xs font-semibold text-[#57423a]">Recipient Phone <span className="text-[#9f3e07]">*</span></label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f0] text-sm text-[#181d1a] placeholder:text-[#8a7268] border border-[#dfe4df] focus:border-[#9f3e07] focus:outline-none"
                    placeholder="0346 8482943"
                    type="tel"
                    value={guestPhone}
                    onChange={e => { setGuestPhone(e.target.value); setContactError(''); }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-[#181d1a]">Select Gilgit Sector</label>
                  <span className="text-[11px] sm:text-xs text-[#36684c] font-bold">
                    Free over Rs. 3,500
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DELIVERY_ZONES.map(z => (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setDeliverySector(z.id)}
                      className={`flex items-center justify-between p-3 rounded-lg text-left cursor-pointer transition-all border ${
                        deliverySector === z.id
                          ? 'bg-[#f0f5f0] border-[#9f3e07] shadow-sm'
                          : 'bg-[#ebefea] border-transparent hover:bg-[#f0f5f0]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            deliverySector === z.id ? 'border-[#9f3e07]' : 'border-[#8a7268]'
                          }`}
                        >
                          {deliverySector === z.id && (
                            <div className="w-2 h-2 rounded-full bg-[#9f3e07]" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-bold text-[#181d1a]">{z.name}</span>
                          <span className="text-[10px] sm:text-xs text-[#57423a]">{z.time}</span>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#9f3e07]">Rs. {z.fee}</span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-1 pt-1">
                  <label className="text-[11px] sm:text-xs font-semibold text-[#57423a]">
                    Specific Street / House / Landmark
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f0] text-sm text-[#181d1a] placeholder:text-[#8a7268] border border-[#dfe4df] focus:border-[#9f3e07] focus:outline-none"
                    placeholder="e.g. Near Sonikot Jamatkhana, Gate #2"
                    type="text"
                    value={deliveryAddress}
                    onChange={e => setDeliveryAddress(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] sm:text-xs font-semibold text-[#57423a]">Recipient Phone</label>
                  <input
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f0f5f0] text-sm text-[#181d1a] border border-[#dfe4df] focus:border-[#9f3e07] focus:outline-none"
                    type="tel"
                    value={guestPhone}
                    onChange={e => setGuestPhone(e.target.value)}
                  />
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Order Summary, Items & Checkout */}
        <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-20">
          {/* 7. Selected Specialties Review */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#dfe4df] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm sm:text-base text-[#181d1a]">Selected Specialties</h3>
              <NavLink
                to="menu"
                onNavigate={onNavigateToMenu}
                className="text-xs sm:text-sm font-bold text-[#9f3e07] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span> Add Dishes
              </NavLink>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-6 bg-[#f0f5f0] rounded-xl p-4">
                <p className="text-xs sm:text-sm text-[#57423a]">No dishes in your feast cart yet.</p>
                <NavLink
                  to="menu"
                  onNavigate={onNavigateToMenu}
                  className="inline-block mt-2.5 px-4 py-2 bg-[#9f3e07] text-white text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Browse Hearth Specialties
                </NavLink>
              </div>
            ) : (
              <div className="divide-y divide-[#dfe4df]/80 max-h-60 overflow-y-auto">
                {cart.map(c => (
                  <div key={c.item.id} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={c.item.image}
                        alt={c.item.title}
                        className="w-13 h-13 rounded-lg object-cover shrink-0 bg-[#ebefea]"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs sm:text-sm font-bold text-[#181d1a] truncate">
                          {c.item.title}
                        </span>
                        <span className="text-[11px] text-[#57423a] truncate">
                          {c.item.subtitle}
                        </span>
                        <span className="text-xs sm:text-sm text-[#9f3e07] font-bold mt-0.5">
                          PKR {(c.item.price * c.qty).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-[#f0f5f0] rounded-full px-2 py-1 shrink-0 border border-[#dfe4df]">
                      <button
                        onClick={() => onUpdateQty(c.item.id, -1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#57423a] hover:text-[#181d1a] active:bg-[#dfe4df] text-base leading-none font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs sm:text-sm font-bold text-[#181d1a] px-1">{c.qty}</span>
                      <button
                        onClick={() => onUpdateQty(c.item.id, 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#57423a] hover:text-[#181d1a] active:bg-[#dfe4df] text-base leading-none font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 8. Order Cost Breakdown & Prominent Cash Notice */}
          <div className="bg-[#f0f5f0] rounded-xl p-4 shadow-sm border border-[#dfe4df] flex flex-col gap-2.5">
            <h4 className="font-semibold text-sm sm:text-base text-[#181d1a]">Payment Summary</h4>
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-[#57423a]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-[#181d1a] font-medium">PKR {itemsSubtotal.toLocaleString()}</span>
              </div>
              {cart.length > 0 && (
                <div className="flex justify-between">
                  <span>Thermal Clay Packaging</span>
                  <span className="text-[#181d1a] font-medium">PKR {packagingFee}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>
                  {diningMode === 'reserve'
                    ? 'Terrace Cover & Setup'
                    : diningMode === 'pickup'
                    ? 'Curbside Dispatch Service'
                    : `Rider Delivery (${deliveryZoneObj?.name || 'Local'})`}
                </span>
                <span className="text-[#181d1a] font-medium">
                  {diningMode === 'delivery'
                    ? `PKR ${deliveryFee}`
                    : 'PKR 0 (Complimentary)'}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-[#181d1a] pt-2 border-t border-[#dfe4df]">
                <span>Estimated Total</span>
                <span className="text-[#9f3e07]">PKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Cash Payment Highlight (Prominent Requirement) */}
            <div className="mt-1 p-3 rounded-lg bg-white flex items-start gap-2.5 shadow-sm border border-[#dec0b5]">
              <span
                className="material-symbols-outlined text-[#9f3e07] text-[20px] shrink-0 mt-0.5"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                payments
              </span>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-[#181d1a]">Payment Method: Cash Only</span>
                <p className="text-[11px] sm:text-xs text-[#57423a] leading-tight mt-0.5">
                  Please keep exact change ready. Settle cash on delivery, curbside pickup, or table departure.
                </p>
              </div>
            </div>
          </div>

          {/* 9. Main Dynamic Action Button */}
          <div className="flex flex-col gap-2 pt-1 pb-4">
            {contactError && (diningMode === 'pickup' || diningMode === 'delivery') && (
              <div className="rounded-xl border border-[#f0b8a5] bg-[#fff4ef] px-4 py-3 text-xs sm:text-sm font-semibold text-[#9f3e07]">
                {contactError}
              </div>
            )}
            <button
              onClick={handlePrimaryAction}
              className="w-full h-12 bg-[#9f3e07] hover:bg-[#853405] text-white rounded-xl font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 active:scale-[0.99] transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                {diningMode === 'reserve'
                  ? 'table_restaurant'
                  : diningMode === 'pickup'
                  ? 'takeout_dining'
                  : 'moped'}
              </span>
              <span>
                {diningMode === 'reserve'
                  ? 'Confirm Riverfront Table Reservation'
                  : diningMode === 'pickup'
                  ? 'Place River View Rd Pickup Order'
                  : 'Place Gilgit Local Delivery Order'}
              </span>
            </button>
            <div className="flex items-center justify-center gap-1 text-[#57423a] text-[11px] sm:text-xs">
              <span className="material-symbols-outlined text-[14px] text-[#36684c]">verified</span>
              <span>
                {diningMode === 'reserve'
                  ? 'Table held for 20 mins post-arrival time'
                  : 'Hot clay sealed guarantee'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
