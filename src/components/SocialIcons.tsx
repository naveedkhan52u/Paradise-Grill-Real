import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface SocialLinksProps {
  className?: string;
  iconSize?: string;
  showLabels?: boolean;
  theme?: 'light' | 'dark';
}

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

export const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={`text-white ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.9 2.9 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.53a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003 15.25a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.32a8.28 8.28 0 004.91 1.6V7.47a4.88 4.88 0 01-1-.78z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

export const SocialMediaBar: React.FC<SocialLinksProps> = ({
  className = 'flex items-center gap-3',
  iconSize = 'w-5 h-5',
  showLabels = false,
  theme = 'light'
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={className}>
      {/* Facebook */}
      <a
        href={RESTAURANT_INFO.socialLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        title="Follow Paradise Hotel & Restaurant on Facebook"
        aria-label="Facebook"
        className={
          isDark
            ? "w-10 h-10 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#60a5fa] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95 border border-[#1877F2]/30"
            : "w-10 h-10 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95"
        }
      >
        <FacebookIcon className={iconSize} />
        {showLabels && <span className="text-xs font-semibold ml-1.5">Facebook</span>}
      </a>

      {/* TikTok */}
      <a
        href={RESTAURANT_INFO.socialLinks.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        title="Follow Paradise Hotel & Restaurant on TikTok"
        aria-label="TikTok"
        className={
          isDark
            ? "w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95 border border-white/20"
            : "w-10 h-10 rounded-full bg-black hover:bg-neutral-800 text-white hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95"
        }
      >
        <TikTokIcon className={`${iconSize} text-white`} />
        {showLabels && <span className="text-xs font-semibold ml-1.5">TikTok</span>}
      </a>

      {/* Instagram */}
      <a
        href={RESTAURANT_INFO.socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        title="Follow Paradise Hotel & Restaurant on Instagram"
        aria-label="Instagram"
        className={
          isDark
            ? "w-10 h-10 rounded-full bg-[#E4405F]/20 hover:bg-[#E4405F] text-[#f472b6] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95 border border-[#E4405F]/30"
            : "w-10 h-10 rounded-full bg-[#E4405F]/10 hover:bg-[#E4405F] text-[#E4405F] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95"
        }
      >
        <InstagramIcon className={iconSize} />
        {showLabels && <span className="text-xs font-semibold ml-1.5">Instagram</span>}
      </a>
    </div>
  );
};
