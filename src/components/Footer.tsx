import React from 'react';
import { ScreenType } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { SocialMediaBar } from './SocialIcons';
import { NavLink } from '../utils/navigation';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenCallModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCallModal }) => {
  return (
    <footer className="w-full bg-[#1e2420] text-[#e0e5e0] border-t border-[#333d36] pt-12 pb-24 md:pb-14 transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-[#333d36]">
          {/* Column 1: Brand & Heritage (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={RESTAURANT_INFO.images.logo}
                alt="Paradise Hotel & Restaurant Logo"
                className="h-10 w-auto object-contain bg-white/10 p-1 rounded-lg"
              />
              <div>
                <h3 className="text-lg font-bold text-white font-headline-sm">
                  {RESTAURANT_INFO.fullName}
                </h3>
                <p className="text-xs text-[#b8efcc] font-semibold">
                  Est. 1946 · Sonikot, Gilgit
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#b0b8af] leading-relaxed">
              Karakoram hospitality overlooking the glacial waters of the Gilgit River.
              Offering riverside charcoal BBQ dining, family suites, mountain rooms, and 24/7 travel comforts.
            </p>

            {/* Social Media Links */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ffb596] block">
                Connect on Social Media:
              </span>
              <SocialMediaBar className="flex items-center gap-3" theme="dark" />
              <p className="text-[11px] text-[#869285]">
                Follow for daily BBQ specials, river views &amp; seasonal room discounts.
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffb596]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <NavLink
                  to="home"
                  onNavigate={onNavigate}
                  className="text-[#d0d7cf] hover:text-white transition-colors cursor-pointer block"
                >
                  Home Overview
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="menu"
                  onNavigate={onNavigate}
                  className="text-[#d0d7cf] hover:text-white transition-colors cursor-pointer block"
                >
                  Dining &amp; BBQ Menu
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="rooms"
                  onNavigate={onNavigate}
                  className="text-[#d0d7cf] hover:text-white transition-colors cursor-pointer block"
                >
                  Hotel Rooms &amp; Suites
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="services"
                  onNavigate={onNavigate}
                  className="text-[#d0d7cf] hover:text-white transition-colors cursor-pointer block"
                >
                  Our Services &amp; Facilities
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="about"
                  onNavigate={onNavigate}
                  className="text-[#d0d7cf] hover:text-white transition-colors cursor-pointer block"
                >
                  About Our Heritage
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="contact"
                  onNavigate={onNavigate}
                  className="text-[#d0d7cf] hover:text-white transition-colors cursor-pointer block"
                >
                  Contact &amp; Reservations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="location-and-hours"
                  onNavigate={onNavigate}
                  className="text-[#d0d7cf] hover:text-white transition-colors cursor-pointer block"
                >
                  Map &amp; Driving Directions
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Services & Hospitality (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffb596]">
              Key Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#b0b8af]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#b8efcc]">outdoor_grill</span>
                <span>Riverside Charcoal BBQ &amp; Karahi</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#b8efcc]">hotel</span>
                <span>Deluxe River View &amp; Family Suites</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#b8efcc]">celebration</span>
                <span>Family Enclosures &amp; Event Halls</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#b8efcc]">local_parking</span>
                <span>Secure 4x4 Tour Jeep Parking</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#b8efcc]">flight</span>
                <span>Gilgit Airport Pickup (12 mins)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#b8efcc]">moped</span>
                <span>Local Takeaway &amp; Express Delivery</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact, NAP & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffb596]">
              Contact &amp; Location
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[#b0b8af]">
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#ffb596] shrink-0 mt-0.5">
                  location_on
                </span>
                <span>{RESTAURANT_INFO.address}, Gilgit-Baltistan, Pakistan</span>
              </p>

              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#ffb596] shrink-0">
                  call
                </span>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="text-white font-bold hover:text-[#ffb596] transition-colors"
                >
                  {RESTAURANT_INFO.phone} (24/7 Desk)
                </a>
              </p>

              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#25D366] shrink-0">
                  chat
                </span>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#b8efcc] transition-colors"
                >
                  WhatsApp: +92 346 8482943
                </a>
              </p>

              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#ffb596] shrink-0">
                  mail
                </span>
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="text-[#d0d7cf] hover:text-white transition-colors"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#b8efcc] animate-pulse"></span>
                  Open Daily: {RESTAURANT_INFO.hoursToday}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Policies & Copyright */}
        <div className="pt-6 mb-[40px] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#869285]">
          <div className="flex items-center gap-2 flex-wrap text-center sm:text-left">
            <span>© 1946 – 2026 Paradise Hotel &amp; Restaurant Gilgit. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-[#ffb596]">Cash-Only Facility (PKR)</span>
          </div>

          <div className="flex items-center gap-4">
            <NavLink
              to="about"
              onNavigate={onNavigate}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </NavLink>
            <span>·</span>
            <NavLink
              to="services"
              onNavigate={onNavigate}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Services
            </NavLink>
            <span>·</span>
            <NavLink
              to="contact"
              onNavigate={onNavigate}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </NavLink>
            <span>·</span>
            <button
              type="button"
              onClick={onOpenCallModal}
              className="text-[#ffb596] font-bold hover:underline cursor-pointer"
            >
              Direct Call
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => window.history.pushState({}, '', '/admin')}
              className="text-[#869285] hover:text-white transition-colors cursor-pointer"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
