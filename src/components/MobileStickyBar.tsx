import React from 'react';
import { Phone, Utensils, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface MobileStickyBarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  cartCount,
  onOpenCart,
  onOpenBooking,
}) => {
  return (
    <aside aria-label="Quick mobile order and call bar" className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-stone-900/95 backdrop-blur-md border-t border-stone-800 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        
        {/* Call to Order Button */}
        <a
          href={`tel:${RESTAURANT_INFO.phoneRaw}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-orange-600 active:bg-orange-700 text-white rounded-xl font-bold text-xs shadow-md tracking-tight truncate whitespace-nowrap"
        >
          <Phone className="w-4 h-4 text-orange-200 shrink-0 animate-pulse" />
          <span className="truncate">Call: {RESTAURANT_INFO.phone}</span>
        </a>

        {/* View Tray Button (if items selected) or Book Table */}
        {cartCount > 0 ? (
          <button
            onClick={onOpenCart}
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 active:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md tracking-tight truncate whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="truncate">Tray ({cartCount})</span>
          </button>
        ) : (
          <button
            onClick={onOpenBooking}
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-800 active:bg-stone-700 text-stone-100 border border-stone-700 rounded-xl font-bold text-xs tracking-tight truncate whitespace-nowrap"
          >
            <Utensils className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate">Order / Book</span>
          </button>
        )}

      </div>
    </aside>
  );
};
