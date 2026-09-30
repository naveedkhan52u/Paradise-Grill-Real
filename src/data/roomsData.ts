import { supabase } from '../lib/supabase';
import type { RoomItem } from '../types';

const FALLBACK_HOTEL_ROOMS: RoomItem[] = [
  {
    id: 'deluxe-river-view',
    name: 'Deluxe River View Room',
    tagline: 'Private Balcony Directly Overlooking the Gilgit River',
    badge: 'Most Popular · River View',
    pricePerNight: 8500,
    capacity: '2 Adults, 1 Child',
    bedType: '1 King Size Bed',
    sizeSqFt: 340,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Wake up to the turquoise currents of the Gilgit River and panoramic snowcapped Karakoram horizons. Features handcrafted walnut furniture, private balcony seating, and climate control.',
    amenities: [
      'Riverfront Balcony',
      '24/7 Hot Water Geyser',
      'Room Heater',
      'Free Mountain Breakfast',
      'High-Speed Wi-Fi',
      'Flat Screen LED TV',
      'Complimentary Tea/Kawa Station'
    ]
  },
  {
    id: 'executive-family-suite',
    name: 'Executive Family Suite',
    tagline: 'Two Connected Bedrooms with Private Mountain-Facing Lounge',
    badge: 'Spacious · Best for Families',
    pricePerNight: 14500,
    capacity: '4 - 6 Guests',
    bedType: '1 King Bed + 2 Twin Beds',
    sizeSqFt: 580,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Designed specifically for family getaways and tour groups visiting Gilgit & Hunza. Includes a spacious living room lounge, two attached bathrooms, and expansive windows towards Sonikot ridge.',
    amenities: [
      '2 En-suite Bathrooms',
      'Separate Living Lounge',
      'Mini Fridge',
      'Dual Heating System',
      'Free Buffet Breakfast',
      'Secure 4x4 Parking',
      '24/7 Room Service & Dining'
    ]
  },
  {
    id: 'standard-mountain-view',
    name: 'Standard Mountain View Room',
    tagline: 'Cozy Karakoram Comfort at Exceptional Value',
    badge: 'Best Value',
    pricePerNight: 5500,
    capacity: '2 Guests',
    bedType: '1 Queen Bed or Twin Beds',
    sizeSqFt: 260,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Warm, peaceful, and thoughtfully outfitted for trekkers, adventurers, and business travelers. Enjoy serene valley views, fresh pine scent, and tranquil sleep away from city commotion.',
    amenities: [
      'Valley & Mountain View',
      'Attached Heated Bath',
      '24/7 Running Hot Water',
      'High-Speed Wi-Fi',
      'Daily Housekeeping',
      'Desk & Luggage Rack',
      'Direct Lawn Access'
    ]
  }
];

const FALLBACK_HOTEL_SERVICES = [
  {
    icon: 'water_drop',
    title: '24/7 Hot Water & Power',
    desc: 'Uninterrupted generator backup and instant geysers during mountain chills'
  },
  {
    icon: 'local_parking',
    title: 'Free 4x4 & SUV Parking',
    desc: 'Guarded parking area inside premises for tour vehicles and private jeeps'
  },
  {
    icon: 'restaurant',
    title: 'Riverside BBQ & Dining',
    desc: 'Priority seating at Paradise Grill riverside deck with 10% guest discount'
  },
  {
    icon: 'airline_stops',
    title: 'Gilgit Airport Shuttle',
    desc: 'Convenient 12-minute pick & drop service to Gilgit Airport (GIL) on request'
  }
];


const hotelData = await (async () => {
  try {
    const [
      { data: rooms },
      { data: images },
      { data: services }
    ] = await Promise.all([
      supabase.from('rooms').select('*').eq('is_available', true).order('sort_order'),
      supabase.from('room_images').select('*').order('sort_order'),
      supabase.from('hotel_services').select('*').eq('is_active', true).order('sort_order')
    ]);

    const imagesByRoom = new Map<string, string[]>();
    (images || []).forEach((img: any) => {
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

    return {
      rooms: mappedRooms.length ? mappedRooms : FALLBACK_HOTEL_ROOMS,
      services: services?.length ? services.map((s: any) => ({
        icon: s.icon || '', title: s.title, desc: s.description || ''
      })) : FALLBACK_HOTEL_SERVICES
    };
  } catch (error) {
    console.warn('Supabase hotel data load failed; using local fallback data.', error);
    return { rooms: FALLBACK_HOTEL_ROOMS, services: FALLBACK_HOTEL_SERVICES };
  }
})();

export const HOTEL_ROOMS = hotelData.rooms;
export const HOTEL_SERVICES = hotelData.services;
