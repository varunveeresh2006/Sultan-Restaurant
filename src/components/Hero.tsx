import React, { useState, useEffect } from 'react';
import { Phone, ArrowDown, Clock, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    // Check local time (1:00 PM to 11:00 PM = 13:00 to 23:00)
    const checkOpenStatus = () => {
      const now = new Date();
      // Use IST offset or local
      const hours = now.getHours();
      // Open between 13:00 and 23:00
      setIsOpenNow(hours >= 13 && hours < 23);
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-stone-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center">
      {/* Background Hero Image with Measured Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/sultans_hero_spread_1790303274721.jpg"
          alt="Sultan's Restaurant mouthwatering biryani and kababs spread in Vijayanagar Bengaluru"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        {/* Measured dark gradient for crisp readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/50" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-stone-950/40 to-stone-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          
          {/* Quiet Unboxed Metadata Status Kicker */}
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-semibold text-orange-400 mb-4 tracking-wide">
            <span className="flex items-center gap-1.5 text-stone-200">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              Magadi Main Rd, Vijayanagar
            </span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className={isOpenNow ? 'text-emerald-400' : 'text-amber-400'}>
                {isOpenNow ? 'Open Now (1 PM – 11 PM)' : 'Opens at 1:00 PM'}
              </span>
            </span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-stone-300">Pocket-Friendly Fast-Casual</span>
          </div>

          {/* Big Bold Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] text-balance mb-5">
            Vijayanagar's Favorite <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-red-500">
              Local Bites & Biryani.
            </span>
          </h1>

          {/* Appetizing Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-stone-200 leading-relaxed font-normal mb-8 max-w-2xl text-pretty">
            Craving fiery Bengaluru-style crispy chicken kababs, slow-dum aromatic biryanis, or sizzling Indo-Chinese rolls? Savor great taste made fresh daily without burning a hole in your pocket.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10">
            {/* Primary CTA: See Menu */}
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-bold text-white bg-orange-600 hover:bg-orange-500 active:bg-orange-700 rounded-xl shadow-lg shadow-orange-950/40 transition-all transform active:scale-98"
            >
              <span>See Menu & Prices</span>
              <ArrowDown className="w-4 h-4 text-orange-200" />
            </a>

            {/* Secondary CTA: Call to Order */}
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-bold text-stone-100 bg-stone-900/80 hover:bg-stone-800 border border-stone-700/80 rounded-xl backdrop-blur-xs transition-all"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>Call to Order: {RESTAURANT_INFO.phone}</span>
            </a>

            {/* Quick Book / Bulk Enquiry button */}
            <button
              onClick={onOpenBooking}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <span>Book Table / Bulk Party</span>
            </button>
          </div>

          {/* Trust proof points */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-800/80 text-stone-300 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Authentic Local Spices</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Pocket-Friendly Value</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Dine-In, Takeaway & Bulk</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
