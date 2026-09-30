import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { SocialMediaBar } from '../SocialIcons';

interface ContactScreenProps {
  onOpenCallModal: () => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onOpenCallModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'room' | 'dining' | 'event' | 'tour'>('dining');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setIsSent(true);
  };

  const buildWhatsAppInquiryLink = () => {
    const text = `Salam Paradise Hotel & Restaurant Gilgit!%0A%0A*NEW INQUIRY*%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Subject:* ${category.toUpperCase()}%0A*Message:* ${encodeURIComponent(message)}%0A%0APlease get back to me. Thank you!`;
    return `https://wa.me/${RESTAURANT_INFO.whatsApp}?text=${text}`;
  };

  return (
    <div className="flex flex-col w-full pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1">
      {/* Header Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-[#ebefea] shadow-sm border border-[#dfe4df] mb-8">
        <div
          className="w-full h-56 sm:h-72 bg-cover bg-center relative"
          style={{ backgroundImage: `url('${RESTAURANT_INFO.images.locationAmbience}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c322e]/95 via-[#2c322e]/40 to-transparent flex flex-col justify-end p-5 sm:p-8">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#36684c] text-white text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#b8efcc] animate-pulse"></span>
                24/7 Front Desk Hotline
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#181d1a] text-xs font-bold">
                Overlooking Gilgit River
              </span>
            </div>
            <h1 className="font-bold text-2xl sm:text-4xl text-white font-headline-sm">
              Contact &amp; Guest Inquiries
            </h1>
            <p className="text-xs sm:text-base text-white/90 mt-1 max-w-2xl leading-relaxed">
              We are here to assist with table reservations, hotel room bookings, corporate banquets, and tour group arrangements.
            </p>
          </div>
        </div>
      </section>

      {/* Grid: Left Column (NAP & Social) + Right Column (Inquiry Form) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Left Column: Direct Contact Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick 1-Tap Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onOpenCallModal}
              className="flex items-center justify-center gap-2 h-12 rounded-xl bg-[#9f3e07] hover:bg-[#853405] text-white text-xs sm:text-sm font-bold shadow-sm active:scale-98 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              <span>Call Front Desk</span>
            </button>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsApp}?text=Salam!%20I%20would%20like%20to%20inquire%20with%20Paradise%20Hotel%20%26%20Restaurant%20Gilgit.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-12 rounded-xl bg-[#36684c] hover:bg-[#275039] text-white text-xs sm:text-sm font-bold shadow-sm active:scale-98 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Official NAP Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#dfe4df] shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9f3e07]">
              Verified Business Details
            </span>
            <h2 className="text-lg font-bold text-[#181d1a]">
              Paradise Hotel &amp; Restaurant
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm text-[#57423a]">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#ebefea] text-[#9f3e07] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <div>
                  <p className="font-bold text-[#181d1a]">Physical Address</p>
                  <p>{RESTAURANT_INFO.address}</p>
                  <p className="text-[11px] text-[#869285] mt-0.5">Sonikot Bankside Promenade, Gilgit, 23345</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#ebefea] text-[#9f3e07] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">phone</span>
                </div>
                <div>
                  <p className="font-bold text-[#181d1a]">Telephone Hotline</p>
                  <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="text-[#9f3e07] font-semibold hover:underline">
                    {RESTAURANT_INFO.phone}
                  </a>
                  <p className="text-[11px] text-[#869285] mt-0.5">Dialable 24 hours for hotel &amp; dining guests</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#ebefea] text-[#36684c] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </div>
                <div>
                  <p className="font-bold text-[#181d1a]">WhatsApp Official</p>
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#36684c] font-semibold hover:underline"
                  >
                    +92 346 8482943
                  </a>
                  <p className="text-[11px] text-[#869285] mt-0.5">Instant booking confirmation &amp; live inquiries</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#ebefea] text-[#b75d1d] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </div>
                <div>
                  <p className="font-bold text-[#181d1a]">Operating Hours</p>
                  <p>Restaurant: 12:00 PM – 11:30 PM (Daily)</p>
                  <p>Hotel Check-In: 24/7 Concierge available</p>
                </div>
              </div>
            </div>

            {/* Google Maps Link */}
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-[#ebefea] hover:bg-[#dfe4df] text-[#181d1a] text-xs sm:text-sm font-semibold transition-colors mt-2"
            >
              <span className="material-symbols-outlined text-[18px] text-[#9f3e07]">directions</span>
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* Social Media Channels Box */}
          <div className="bg-white rounded-2xl p-6 border border-[#dfe4df] shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9f3e07]">
              Follow &amp; Tag Us
            </span>
            <h3 className="text-base font-bold text-[#181d1a]">
              Official Social Handles
            </h3>
            <p className="text-xs text-[#57423a]">
              Connect with us on Facebook, TikTok, and Instagram for photos of our river terrace and guest updates:
            </p>

            <SocialMediaBar className="flex items-center gap-3 pt-2" />

            <div className="pt-2 text-[11px] text-[#869285] space-y-1">
              <p>• Facebook: <span className="font-semibold text-[#181d1a]">@paradisegrillgilgit</span></p>
              <p>• TikTok: <span className="font-semibold text-[#181d1a]">@paradisegrillgilgit</span></p>
              <p>• Instagram: <span className="font-semibold text-[#181d1a]">@paradisegrillgilgit</span></p>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#dfe4df] shadow-sm space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#9f3e07]">
                Online Inquiries
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#181d1a] mt-0.5">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-[#57423a] mt-1">
                Have questions regarding rooms, wedding receptions, BBQ dinner arrangements, or tour group packages? Fill out the form below.
              </p>
            </div>

            {isSent ? (
              <div className="py-8 text-center space-y-3 bg-[#f0f5f0] rounded-xl p-6 border border-[#dfe4df]">
                <div className="w-14 h-14 rounded-full bg-[#b8efcc] text-[#002111] flex items-center justify-center mx-auto">
                  <span
                    className="material-symbols-outlined text-[32px] text-[#36684c]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#181d1a]">Message Received!</h3>
                <p className="text-xs sm:text-sm text-[#57423a] max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-[#181d1a]">{name}</span>. Our team will review your inquiry and reach out to you via {phone}.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <a
                    href={buildWhatsAppInquiryLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#36684c] text-white text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Forward to WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSent(false);
                      setMessage('');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#ebefea] text-[#181d1a] text-xs font-semibold cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#181d1a] mb-1.5">
                    Inquiry Category:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'dining', label: 'Table & BBQ', icon: 'outdoor_grill' },
                      { id: 'room', label: 'Hotel Rooms', icon: 'hotel' },
                      { id: 'event', label: 'Private Event', icon: 'celebration' },
                      { id: 'tour', label: 'Tour Group', icon: 'commute' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id as any)}
                        className={`p-2.5 rounded-xl text-center border text-xs transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          category === cat.id
                            ? 'bg-[#ffdbcd] border-[#9f3e07] text-[#360f00] font-bold shadow-2xs'
                            : 'bg-white border-[#dfe4df] text-[#57423a] hover:bg-[#ebefea]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-[#181d1a] mb-1">
                    Your Name <span className="text-[#9f3e07]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Asad Shah"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#f6fbf5] rounded-lg border border-[#dfe4df] focus:border-[#9f3e07] focus:ring-1 focus:ring-[#9f3e07] outline-none text-[#181d1a]"
                  />
                </div>

                {/* Phone & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-[#181d1a] mb-1">
                      Contact Number <span className="text-[#9f3e07]">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="0345 1234567"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#f6fbf5] rounded-lg border border-[#dfe4df] focus:border-[#9f3e07] outline-none text-[#181d1a]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-[#181d1a] mb-1">
                      Email Address <span className="text-[11px] text-[#869285] font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#f6fbf5] rounded-lg border border-[#dfe4df] focus:border-[#9f3e07] outline-none text-[#181d1a]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-msg" className="block text-xs font-bold text-[#181d1a] mb-1">
                    Your Message / Specific Request <span className="text-[#9f3e07]">*</span>
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us about your dates, number of guests, or special arrangements you require..."
                    className="w-full p-3 text-xs sm:text-sm bg-[#f6fbf5] rounded-lg border border-[#dfe4df] focus:border-[#9f3e07] outline-none text-[#181d1a] resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#9f3e07] hover:bg-[#853405] text-white text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>Submit Inquiry</span>
                </button>

                <p className="text-[11px] text-center text-[#57423a]">
                  We typically respond within 15–30 minutes during operating hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
