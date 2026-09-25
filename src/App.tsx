/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FoodShowcase } from './components/FoodShowcase';
import { MenuSection } from './components/MenuSection';
import { ServicesSection } from './components/ServicesSection';
import { BookingForm } from './components/BookingForm';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { OrderTrayModal } from './components/OrderTrayModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { MenuItem, CartItem } from './types/restaurant';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'dine-in' | 'bulk-party' | 'takeaway'>('dine-in');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Set of item IDs currently in tray for quick lookup in menu
  const cartItemIds = useMemo(() => {
    return new Set(cartItems.map((ci) => ci.item.id));
  }, [cartItems]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, ci) => acc + ci.quantity, 0);
  }, [cartItems]);

  const totalCartAmount = useMemo(() => {
    return cartItems.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleAddItem = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to order tray (₹${item.price})`);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToBooking = (type: 'dine-in' | 'bulk-party' | 'takeaway' = 'dine-in') => {
    setBookingType(type);
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-stone-700 animate-bounce">
          <ShoppingBag className="w-4 h-4 text-orange-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Top Bar Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => scrollToBooking('dine-in')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenBooking={() => scrollToBooking('dine-in')} />

        {/* Popular Dishes / Signature Food Bento Cards */}
        <FoodShowcase
          onSelectItem={handleAddItem}
          onQuickAdd={handleAddItem}
        />

        {/* Core Focus: The Menu Section (Physical menu layout with dotted leaders) */}
        <MenuSection
          onAddItem={handleAddItem}
          cartItemIds={cartItemIds}
        />

        {/* Services & Offers (Dine-in, Takeout with parcel info, Bulk Party) */}
        <ServicesSection
          onOpenBookingForParty={() => scrollToBooking('bulk-party')}
        />

        {/* Table Reservation & Bulk Party Enquiry Form */}
        <BookingForm initialType={bookingType} />

        {/* Location & Operating Hours with Google Maps Embed */}
        <LocationSection />
      </main>

      {/* Clean Customer Footer */}
      <Footer />

      {/* Floating Desktop Order Tray Trigger Widget (when items > 0) */}
      {totalCartCount > 0 && (
        <div
          className="hidden md:flex fixed bottom-6 right-6 z-40 bg-orange-600 text-white px-5 py-3 rounded-2xl shadow-xl hover:bg-orange-700 transition-all items-center gap-4 cursor-pointer transform hover:scale-105"
          onClick={() => setIsCartOpen(true)}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
              {totalCartCount}
            </div>
            <div>
              <p className="text-xs font-semibold text-orange-100">Order Tray</p>
              <p className="font-heading font-extrabold text-sm tabular-nums">₹{totalCartAmount}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-bold bg-white text-orange-700 px-3 py-1.5 rounded-lg shadow-2xs">
            <span>View & Order</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      )}

      {/* Sticky Mobile Floating Call to Order Bar */}
      <MobileStickyBar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => scrollToBooking('dine-in')}
      />

      {/* Order Tray / Bill Estimator Drawer */}
      <OrderTrayModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenBooking={() => scrollToBooking('dine-in')}
      />

    </div>
  );
}
