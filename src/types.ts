import { MenuItem } from './data/restaurantData';

export type ScreenType =
  | 'home'
  | 'menu'
  | 'order-and-dine'
  | 'location-and-hours'
  | 'rooms'
  | 'about'
  | 'contact'
  | 'services';

export interface RoomItem {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  pricePerNight: number;
  capacity: string;
  bedType: string;
  sizeSqFt: number;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
}

export interface RoomBookingData {
  customerName: string;
  contactNumber: string;
  checkInDate: string;
  checkOutDate: string;
  roomQuantity: number;
  guestQuantity: number;
  customMessage: string;
  roomType: string;
  pricePerNight: number;
}

export interface CartItem {
  item: MenuItem;
  qty: number;
  options?: {
    diningMode?: 'dinein' | 'pickup' | 'delivery';
    tableZone?: string;
    spiceLevel?: string;
  };
}

export interface ReservationData {
  mode: 'reserve' | 'pickup' | 'delivery';
  tableZone: 'Terrace Railing' | 'Hearth Brazier';
  partySize: string;
  timeSlot: string;
  guestName: string;
  guestPhone: string;
  specialRequest: string;
  pickupTime: string;
  vehicleDetails: string;
  deliveryZone: string;
  deliveryAddress: string;
}
