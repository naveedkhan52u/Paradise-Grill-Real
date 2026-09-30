import React from 'react';
import { ScreenType } from '../types';

export interface RouteConfig {
  path: string;
  title: string;
  description: string;
}

export const SCREEN_ROUTES: Record<ScreenType, RouteConfig> = {
  home: {
    path: '/',
    title: 'Paradise Grill - Gilgit Baltistan | Riverside Hotel & Dining',
    description: 'Riverside feast & dining at Paradise Hotel & Restaurant along the Gilgit River in northern Pakistan. Reserve glacier view terrace tables, order wood-fired charcoal BBQ, Shinwari karahi, and fresh river trout.'
  },
  menu: {
    path: '/menu',
    title: 'Dining & BBQ Menu | Paradise Hotel & Restaurant Gilgit',
    description: 'Explore the authentic Karakoram menu: Shinwari Mutton Karahi, Charcoal BBQ Platters, Fresh Gilgit River Trout, and Kashmiri specialties.'
  },
  'order-and-dine': {
    path: '/order-and-dine',
    title: 'Order & Table Reservation | Paradise Hotel & Restaurant Gilgit',
    description: 'Reserve riverfront terrace seating or arrange takeaway & room delivery from Paradise Hotel & Restaurant in Sonikot, Gilgit.'
  },
  rooms: {
    path: '/rooms',
    title: 'Hotel Rooms & River Suites | Paradise Hotel & Restaurant Gilgit',
    description: 'Book Deluxe River View Rooms, Executive Suites, and Family Rooms overlooking the Gilgit River with mountain panoramas and 24/7 hospitality.'
  },
  services: {
    path: '/services',
    title: 'Guest Services & Facilities | Paradise Hotel & Restaurant Gilgit',
    description: 'Explore hotel amenities: Riverside charcoal dining, private event halls, 4x4 Karakoram tour assistance, 24/7 power backup, and airport transfers.'
  },
  about: {
    path: '/about',
    title: 'Our Heritage Since 1946 | Paradise Hotel & Restaurant Gilgit',
    description: 'Discover over seven decades of authentic Karakoram hospitality and riverside dining tradition in Sonikot, Gilgit.'
  },
  contact: {
    path: '/contact',
    title: 'Contact & Front Desk | Paradise Hotel & Restaurant Gilgit',
    description: 'Get in touch with Paradise Hotel & Restaurant. Call 0346 8482943, chat on WhatsApp, or visit us on River View Road, Sonikot, Gilgit.'
  },
  'location-and-hours': {
    path: '/location-and-hours',
    title: 'Location, Map & Hours | Paradise Hotel & Restaurant Gilgit',
    description: 'Find driving directions, GPS coordinates, landmark guides, and daily opening hours for Paradise Hotel & Restaurant in Sonikot, Gilgit.'
  }
};

/**
 * Reads initial screen from current browser URL pathname or hash fallback
 */
export function getScreenFromLocation(): ScreenType {
  if (typeof window === 'undefined') return 'home';

  // 1. Check hash first (e.g. #/rooms or #rooms)
  const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (rawHash) {
    for (const [screen, config] of Object.entries(SCREEN_ROUTES)) {
      if (screen === rawHash || config.path.replace(/^\//, '') === rawHash) {
        return screen as ScreenType;
      }
    }
  }

  // 2. Check standard pathname (e.g. /rooms, /menu, /services)
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  for (const [screen, config] of Object.entries(SCREEN_ROUTES)) {
    if (config.path === path) {
      return screen as ScreenType;
    }
  }

  return 'home';
}

/**
 * Updates browser URL and meta tags without full page reload
 */
export function syncLocationWithScreen(screen: ScreenType) {
  if (typeof window === 'undefined') return;

  const config = SCREEN_ROUTES[screen] || SCREEN_ROUTES.home;

  // Update browser URL via HTML5 History pushState
  try {
    const currentPath = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    if (currentPath !== config.path) {
      window.history.pushState({ screen }, '', config.path);
    }
  } catch {
    // If running in sandboxed environment that restricts pushState, fallback to hash
    const expectedHash = config.path === '/' ? '' : `#${screen}`;
    if (window.location.hash !== expectedHash) {
      window.location.hash = expectedHash;
    }
  }

  // Update document title for SEO & browser tabs
  document.title = config.title;

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', config.description);
  }

  // Update OpenGraph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', config.title);
  }
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', config.description);
  }

  // Update canonical URL tag
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', window.location.origin + config.path);
}

/**
 * Reusable SEO Link component that renders standard <a href="..."> tags for Googlebot
 * and intercepts normal user clicks for instant zero-reload transitions.
 */
interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  onNavigate,
  children,
  onClick,
  className,
  ...rest
}) => {
  const route = SCREEN_ROUTES[to] || SCREEN_ROUTES.home;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // If user held Ctrl/Cmd/Shift or used middle click, allow browser to open in new tab
    if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.defaultPrevented) {
      e.preventDefault();
      onNavigate(to);
    }
  };

  return (
    <a
      href={route.path}
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
};
