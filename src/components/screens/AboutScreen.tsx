import React from 'react';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { ScreenType } from '../../types';
import { SocialMediaBar } from '../SocialIcons';
import { NavLink } from '../../utils/navigation';

interface AboutScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenCallModal: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate, onOpenCallModal }) => {
  return (
    <div className="flex flex-col w-full pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1">
      {/* 1. Hero Ambience Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-[#ebefea] shadow-sm border border-[#dfe4df] mb-8">
        <div
          className="w-full h-64 sm:h-80 md:h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url('${RESTAURANT_INFO.images.heroRiverside}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c322e]/95 via-[#2c322e]/50 to-transparent flex flex-col justify-end p-5 sm:p-8 md:p-10">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffdbcd] text-[#9f3e07] text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]">history_edu</span>
                Est. 1946 · Gilgit-Baltistan
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#181d1a] text-xs font-bold">
                <span
                  className="material-symbols-outlined text-[14px] text-[#36684c]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                80 Years of Mountain Hospitality
              </span>
            </div>

            <h1 className="font-bold text-2xl sm:text-4xl text-white font-headline-sm">
              Our Story: Karakoram Heritage on the Riverbank
            </h1>
            <p className="text-xs sm:text-base text-white/90 mt-2 max-w-2xl leading-relaxed">
              Nestled on the serene banks of the Gilgit River in Sonikot, Paradise Hotel &amp; Restaurant has welcomed travelers, trekkers, and local families for generations.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Narrative & Heritage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Left Column: Story Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#dfe4df] shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9f3e07]">
              Legacy &amp; Roots
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#181d1a]">
              From Historic Silk Route Haven to Modern Riverside Retreat
            </h2>

            <p className="text-sm text-[#57423a] leading-relaxed">
              Founded in 1946 when Gilgit was an adventurous stopover on historic mountain trails, Paradise Hotel &amp; Restaurant began as a humble riverside tea house and guest resthouse. Travelers journeying between the Indus valley, Hunza, and the high passes found hot meals, warm woodstoves, and the soothing sound of the surging Gilgit River.
            </p>

            <p className="text-sm text-[#57423a] leading-relaxed">
              Over the decades, as the Karakoram Highway opened northern Pakistan to the world, Paradise evolved into one of Gilgit’s signature culinary and accommodation destinations—celebrated for authentic charcoal-grilled meats, slow-cooked Karahis, and comfortable alpine rooms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-4 rounded-xl bg-[#ebefea] text-center border border-[#dfe4df]/70">
                <span className="block text-2xl sm:text-3xl font-bold text-[#9f3e07]">1946</span>
                <span className="text-xs text-[#57423a] font-medium mt-1 block">Year Established</span>
              </div>
              <div className="p-4 rounded-xl bg-[#ebefea] text-center border border-[#dfe4df]/70">
                <span className="block text-2xl sm:text-3xl font-bold text-[#36684c]">1,000+</span>
                <span className="text-xs text-[#57423a] font-medium mt-1 block">Verified Reviews</span>
              </div>
              <div className="p-4 rounded-xl bg-[#ebefea] text-center border border-[#dfe4df]/70">
                <span className="block text-2xl sm:text-3xl font-bold text-[#b75d1d]">3.8 / 5.0</span>
                <span className="text-xs text-[#57423a] font-medium mt-1 block">Google Rating</span>
              </div>
            </div>
          </div>

          {/* Pillars of Hospitality */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#dfe4df] shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9f3e07]">
              Our Guiding Principles
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#181d1a]">
              What Sets Paradise Grill Apart
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#f0f5f0] border border-[#dfe4df] space-y-1.5">
                <div className="w-10 h-10 rounded-lg bg-[#b8efcc] text-[#002111] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
                </div>
                <h3 className="text-sm font-bold text-[#181d1a]">Live Charcoal Fire Pits</h3>
                <p className="text-xs text-[#57423a] leading-relaxed">
                  We use genuine mountain hardwood charcoal to infuse every seekh kebab, boti skewer, and trout fillet with deep, natural smokiness.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0f5f0] border border-[#dfe4df] space-y-1.5">
                <div className="w-10 h-10 rounded-lg bg-[#ffdbcd] text-[#9f3e07] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">water</span>
                </div>
                <h3 className="text-sm font-bold text-[#181d1a]">Direct Riverside Views</h3>
                <p className="text-xs text-[#57423a] leading-relaxed">
                  Our dining terrace and deluxe rooms sit right on the riverbank, providing unhindered views of the water rapids and Karakoram peaks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0f5f0] border border-[#dfe4df] space-y-1.5">
                <div className="w-10 h-10 rounded-lg bg-[#ebefea] text-[#36684c] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">family_restroom</span>
                </div>
                <h3 className="text-sm font-bold text-[#181d1a]">Family &amp; Group Hospitality</h3>
                <p className="text-xs text-[#57423a] leading-relaxed">
                  Private partitioned family halls, spacious multi-bed suites, and secure parking for 4x4 tour vehicles and family caravans.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f0f5f0] border border-[#dfe4df] space-y-1.5">
                <div className="w-10 h-10 rounded-lg bg-[#dfe4df] text-[#181d1a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">thermostat</span>
                </div>
                <h3 className="text-sm font-bold text-[#181d1a]">24/7 Hot Water &amp; Power Backup</h3>
                <p className="text-xs text-[#57423a] leading-relaxed">
                  Uninterrupted generators and gas geysers ensure comfort and warmth regardless of northern weather conditions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Fast Info & Social Connect (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Social Channels Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#dfe4df] shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9f3e07]">
              Follow Our Journey
            </span>
            <h3 className="text-lg font-bold text-[#181d1a]">
              Social Media Channels
            </h3>
            <p className="text-xs text-[#57423a]">
              Check out our riverfront sunsets, live BBQ pit videos, and hotel guest experiences on our official profiles:
            </p>

            <div className="space-y-3 pt-1">
              <a
                href={RESTAURANT_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">Facebook Page</p>
                  <p className="text-[11px] opacity-80 truncate">@paradisegrillgilgit</p>
                </div>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>

              <a
                href={RESTAURANT_INFO.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-black/5 hover:bg-black text-[#181d1a] hover:text-white transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold">♪</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">TikTok Profile</p>
                  <p className="text-[11px] opacity-80 truncate">@paradisegrillgilgit</p>
                </div>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>

              <a
                href={RESTAURANT_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#E4405F]/10 hover:bg-[#E4405F] text-[#E4405F] hover:text-white transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-[#E4405F] text-white flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold">IG</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">Instagram Gallery</p>
                  <p className="text-[11px] opacity-80 truncate">@paradisegrillgilgit</p>
                </div>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>

          {/* Quick Contact & Action Card */}
          <div className="bg-[#f0f5f0] rounded-2xl p-6 border border-[#dfe4df] shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#36684c]">
              Visit or Inquire
            </span>
            <h3 className="text-lg font-bold text-[#181d1a]">
              Experience It in Person
            </h3>
            <p className="text-xs text-[#57423a]">
              Located on River View Road, Sonikot, Gilgit. Open 7 days a week from 12:00 PM to 11:30 PM.
            </p>

            <div className="space-y-2 pt-1">
              <NavLink
                to="rooms"
                onNavigate={onNavigate}
                className="w-full h-11 rounded-xl bg-[#9f3e07] hover:bg-[#853405] text-white text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px]">hotel</span>
                <span>Explore Hotel Rooms</span>
              </NavLink>

              <NavLink
                to="menu"
                onNavigate={onNavigate}
                className="w-full h-11 rounded-xl bg-white hover:bg-[#ebefea] text-[#181d1a] border border-[#dfe4df] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-[#9f3e07]">restaurant_menu</span>
                <span>View Dining Menu</span>
              </NavLink>

              <button
                type="button"
                onClick={onOpenCallModal}
                className="w-full h-11 rounded-xl bg-[#ebefea] hover:bg-[#dfe4df] text-[#181d1a] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Direct Desk: {RESTAURANT_INFO.phone}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
