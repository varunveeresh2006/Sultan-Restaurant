export type MenuCategory = 'all' | 'starters' | 'mains' | 'bites' | 'beverages';

export type DietaryType = 'all' | 'veg' | 'non-veg';

export type OrderMode = 'takeaway' | 'dine-in' | 'delivery';

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'bites' | 'beverages';
  price: number;
  description: string;
  isVeg: boolean;
  isBestseller?: boolean;
  spiceLevel?: 1 | 2 | 3; // 1 = mild, 2 = medium, 3 = spicy
  portion?: string;
  image?: string; // Added image property
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface BookingData {
  name: string;
  phone: string;
  people: number;
  date: string;
  time: string;
  type: 'dine-in' | 'bulk-party' | 'takeaway';
  specialRequests?: string;
}
