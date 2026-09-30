import { supabase } from './supabase';
import { MENU_ITEMS as FALLBACK_MENU_ITEMS, RESTAURANT_INFO as FALLBACK_RESTAURANT_INFO, REVIEWS as FALLBACK_REVIEWS, DELIVERY_ZONES as FALLBACK_DELIVERY_ZONES, WEEKLY_HOURS as FALLBACK_WEEKLY_HOURS, LANDMARKS as FALLBACK_LANDMARKS } from '../data/restaurantData';
import { HOTEL_ROOMS as FALLBACK_ROOMS, HOTEL_SERVICES as FALLBACK_SERVICES } from '../data/roomsData';
import { MenuItem, ReviewItem } from '../data/restaurantData';
import { RoomItem } from '../types';

export async function loadRestaurantData() {
  const [{ data: settings }, { data: categories }, { data: menu }, { data: reviews }, { data: zones }, { data: hours }, { data: landmarks }, { data: rooms }, { data: roomImages }, { data: services }] = await Promise.all([
    supabase.from('restaurant_settings').select('*').limit(1).maybeSingle(),
    supabase.from('menu_categories').select('*').order('sort_order'),
    supabase.from('menu_items').select('*').eq('is_available', true).order('sort_order'),
    supabase.from('reviews').select('*').eq('is_published', true).order('created_at', { ascending: false }),
    supabase.from('delivery_zones').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('restaurant_hours').select('*').order('sort_order'),
    supabase.from('landmarks').select('*').order('sort_order'),
    supabase.from('rooms').select('*').eq('is_available', true).order('sort_order'),
    supabase.from('room_images').select('*').order('sort_order'),
    supabase.from('hotel_services').select('*').eq('is_active', true).order('sort_order')
  ]);

  const categoryMap = new Map((categories || []).map((c: any) => [c.id, c.slug]));

  const mappedMenu: MenuItem[] = (menu || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle || '',
    category: (categoryMap.get(item.category_id) || 'bbq') as MenuItem['category'],
    price: Number(item.price),
    unit: item.unit || '',
    description: item.description || '',
    image: item.image_url || '',
    badge: item.badge || undefined,
    badgeType: item.badge_type || undefined,
    tag: item.tag || undefined,
    tags: item.tags || [],
    spiceLevel: item.spice_level || undefined,
    featured: !!item.featured
  }));

  const imagesByRoom = new Map<string, string[]>();
  (roomImages || []).forEach((img: any) => {
    const list = imagesByRoom.get(img.room_id) || [];
    list.push(img.image_url);
    imagesByRoom.set(img.room_id, list);
  });

  const mappedRooms: RoomItem[] = (rooms || []).map((room: any) => ({
    id: room.id,
    name: room.name,
    tagline: room.tagline || '',
    badge: room.badge || '',
    pricePerNight: Number(room.price_per_night),
    capacity: room.capacity || '',
    bedType: room.bed_type || '',
    sizeSqFt: Number(room.size_sq_ft || 0),
    image: room.image_url || '',
    gallery: imagesByRoom.get(room.id) || (room.image_url ? [room.image_url] : []),
    description: room.description || '',
    amenities: room.amenities || []
  }));

  const restaurantInfo = settings ? {
    ...FALLBACK_RESTAURANT_INFO,
    name: settings.name,
    fullName: settings.full_name || FALLBACK_RESTAURANT_INFO.fullName,
    city: settings.city || FALLBACK_RESTAURANT_INFO.city,
    region: settings.region || FALLBACK_RESTAURANT_INFO.region,
    address: settings.address || FALLBACK_RESTAURANT_INFO.address,
    rating: Number(settings.rating ?? FALLBACK_RESTAURANT_INFO.rating),
    reviewCount: settings.review_count || FALLBACK_RESTAURANT_INFO.reviewCount,
    phone: settings.phone || FALLBACK_RESTAURANT_INFO.phone,
    phoneRaw: settings.phone_raw || FALLBACK_RESTAURANT_INFO.phoneRaw,
    whatsApp: settings.whatsapp || FALLBACK_RESTAURANT_INFO.whatsApp,
    email: settings.email || FALLBACK_RESTAURANT_INFO.email,
    socialLinks: {
      facebook: settings.facebook_url || FALLBACK_RESTAURANT_INFO.socialLinks.facebook,
      tiktok: settings.tiktok_url || FALLBACK_RESTAURANT_INFO.socialLinks.tiktok,
      instagram: settings.instagram_url || FALLBACK_RESTAURANT_INFO.socialLinks.instagram
    },
    hoursToday: settings.hours_today || FALLBACK_RESTAURANT_INFO.hoursToday,
    bbqIgniteTime: settings.bbq_ignite_time || FALLBACK_RESTAURANT_INFO.bbqIgniteTime,
    kitchenCloseTime: settings.kitchen_close_time || FALLBACK_RESTAURANT_INFO.kitchenCloseTime,
    googleMapsUrl: settings.google_maps_url || FALLBACK_RESTAURANT_INFO.googleMapsUrl,
    cashNotice: settings.cash_notice || FALLBACK_RESTAURANT_INFO.cashNotice,
    images: settings.images || FALLBACK_RESTAURANT_INFO.images
  } : FALLBACK_RESTAURANT_INFO;

  return {
    restaurantInfo,
    menuItems: mappedMenu.length ? mappedMenu : FALLBACK_MENU_ITEMS,
    reviews: reviews?.length ? reviews.map((r: any) => ({ id:r.id, author:r.author, role:r.role || '', quote:r.quote, rating:r.rating, source:r.source || '', timeAgo:r.time_ago || '' })) : FALLBACK_REVIEWS,
    deliveryZones: zones?.length ? zones.map((z: any) => ({ id:z.id, name:z.name, time:z.estimated_time || '', fee:Number(z.fee) })) : FALLBACK_DELIVERY_ZONES,
    weeklyHours: hours?.length ? hours.map((h: any) => ({ day:h.day, hours:h.hours, current:h.is_current })) : FALLBACK_WEEKLY_HOURS,
    landmarks: landmarks?.length ? landmarks.map((l: any) => ({ name:l.name, desc:l.description || '', distance:l.distance || '', icon:l.icon || '' })) : FALLBACK_LANDMARKS,
    rooms: mappedRooms.length ? mappedRooms : FALLBACK_ROOMS,
    services: services?.length ? services.map((s: any) => ({ icon:s.icon || '', title:s.title, desc:s.description || '' })) : FALLBACK_SERVICES
  };
}
