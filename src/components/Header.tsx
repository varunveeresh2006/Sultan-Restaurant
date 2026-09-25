import React, { useState } from 'react';
import { Phone, Utensils, ShoppingBag, Menu as MenuIcon, X, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-sm font-black text-xl tracking-tighter group-hover:bg-orange-700 transition-colors">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg md:text-xl font-extrabold tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors leading-none">
                  SULTAN'S
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-stone-500 uppercase mt-0.5">
                  Restaurant · Vijayanagar
                </span>
              </div>
            </a>
          </div>

          {/* Clean customer navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-stone-700">
            <a href="#menu" className="hover:text-orange-600 transition-colors">
              Menu & Prices
            </a>
            <a href="#specials" className="hover:text-orange-600 transition-colors">
              Signature Dishes
            </a>
            <a href="#services" className="hover:text-orange-600 transition-colors">
              Takeaway & Party
            </a>
            <a href="#booking" className="hover:text-orange-600 transition-colors">
              Book Table
            </a>
            <a href="#location" className="hover:text-orange-600 transition-colors">
              Location & Hours
            </a>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Order Tray / Cart button */}
            <button
              onClick={onOpenCart}
              type="button"
              className="relative p-2.5 text-stone-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer"
              aria-label={`View order tray (${cartCount} items)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct Call Button */}
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors border border-stone-200 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-orange-600" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>

            {/* Primary Order / Book CTA */}
            <button
              onClick={onOpenBooking}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs md:text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 text-stone-700 hover:text-orange-600 hover:bg-stone-100 rounded-xl transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-5 space-y-2 animate-fade-in">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-stone-800 hover:bg-orange-50 hover:text-orange-600"
          >
            Menu & Prices
          </a>
          <a
            href="#specials"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-stone-800 hover:bg-orange-50 hover:text-orange-600"
          >
            Signature Dishes
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-stone-800 hover:bg-orange-50 hover:text-orange-600"
          >
            Services & Bulk Party
          </a>
          <a
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-stone-800 hover:bg-orange-50 hover:text-orange-600"
          >
            Book Table / Enquiry
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-stone-800 hover:bg-orange-50 hover:text-orange-600"
          >
            Location & Timings
          </a>

          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-orange-600 text-white rounded-xl font-bold text-sm shadow-xs"
            >
              <Phone className="w-4 h-4" />
              Call To Order: {RESTAURANT_INFO.phone}
            </a>
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-4 text-stone-600 text-xs font-medium"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              52, Magadi Main Rd, Vijayanagar, Bengaluru
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
