import { AuthUser, StoredReservation } from '../types/auth';

export interface PredefinedCredential {
  email: string;
  password: string;
  role: 'manager' | 'staff' | 'customer';
  user: AuthUser;
  description: string;
}

export const PREDEFINED_CREDENTIALS: PredefinedCredential[] = [
  {
    email: 'manager@sultans.com',
    password: 'sultan@560079',
    role: 'manager',
    description: 'Full store owner/manager access: menu pricing, parcel charges, reservations',
    user: {
      id: 'usr-mgr-01',
      name: 'Syed Sultan (Owner/Manager)',
      email: 'manager@sultans.com',
      role: 'manager',
      phone: '094482 06692',
      badge: 'Store Owner',
    },
  },
  {
    email: 'cashier@sultans.com',
    password: 'counter123',
    role: 'staff',
    description: 'Billing counter & parcel dispatch staff: order receipts & reservation checks',
    user: {
      id: 'usr-stf-02',
      name: 'Imran (Counter Cashier)',
      email: 'cashier@sultans.com',
      role: 'staff',
      phone: '094482 06692',
      badge: 'Billing Counter',
    },
  },
  {
    email: 'customer@sultans.com',
    password: 'guest123',
    role: 'customer',
    description: 'VIP regular customer account: repeat favorite orders & loyalty perks',
    user: {
      id: 'usr-cst-03',
      name: 'Varun (Vijayanagar Regular)',
      email: 'customer@sultans.com',
      role: 'customer',
      phone: '98450 12345',
      badge: 'VIP Foodie',
    },
  },
];

// Initial mock reservations for the management dashboard
export const INITIAL_RESERVATIONS: StoredReservation[] = [
  {
    id: 'SLT-8421',
    name: 'Ramesh Kumar',
    phone: '98450 12345',
    people: 4,
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    type: 'dine-in',
    status: 'confirmed',
    specialRequests: 'Family table near fan, 2x Biryani + 1x Crispy Kabab ready on arrival',
    createdAt: 'Today, 2:15 PM',
  },
  {
    id: 'SLT-9043',
    name: 'Pooja Hegde',
    phone: '97412 88921',
    people: 15,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:30',
    type: 'bulk-party',
    status: 'pending',
    specialRequests: 'Birthday Party! Want 5kg Dum Biryani Pot with 4 platters of Kabab',
    createdAt: 'Today, 4:40 PM',
  },
  {
    id: 'SLT-7612',
    name: 'Karthik Rao',
    phone: '99001 44520',
    people: 2,
    date: new Date().toISOString().split('T')[0],
    time: '21:00',
    type: 'takeaway',
    status: 'confirmed',
    specialRequests: 'Pack 2 Ceylon Parottas and 1 Chicken Masala parcel. Extra spicy.',
    createdAt: 'Today, 5:10 PM',
  },
];
