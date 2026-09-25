export type UserRole = 'manager' | 'staff' | 'customer';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  badge?: string;
}

export interface StoredReservation {
  id: string;
  name: string;
  phone: string;
  people: number;
  date: string;
  time: string;
  type: 'dine-in' | 'bulk-party' | 'takeaway';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
}
