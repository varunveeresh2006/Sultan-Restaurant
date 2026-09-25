import React from 'react';
import { MapPin, Phone, Clock, Navigation, Heart, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-24 md:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center text-white font-black text-lg">
                S
              </div>
              <span className="font-heading text-xl font-extrabold tracking-tight text-white">
                SULTAN'S RESTAURANT
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Vijayanagar's favorite pocket-friendly fast-casual restaurant on Magadi Main Road. Savor our signature aromatic dum biryanis, crispy chicken kababs, and street-style rolls.
            </p>

            <div className="pt-1 text-xs text-orange-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Halal & Freshly Prepared Daily</span>
            </div>
          </div>

          {/* Location & Directions */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Restaurant Location
            </h4>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-400">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span>{RESTAURANT_INFO.address}</span>
            </div>
            <div>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 mt-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps &rarr;</span>
              </a>
            </div>
          </div>

          {/* Timings & Contact */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Hours & Contact
            </h4>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-400">
              <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-200">Monday – Sunday</p>
                <p>1:00 PM – 11:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-400 pt-1">
              <Phone className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-200">Phone for Orders:</p>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="text-orange-400 hover:underline font-bold"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick links & Payments */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Payment Modes Accepted
            </h4>
            <p className="text-xs text-stone-400">
              We accept all convenient Indian payment methods:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-md text-xs font-semibold text-stone-300">
                UPI (GPay / PhonePe)
              </span>
              <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-md text-xs font-semibold text-stone-300">
                Paytm
              </span>
              <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-md text-xs font-semibold text-stone-300">
                Cash
              </span>
              <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-md text-xs font-semibold text-stone-300">
                Debit / Credit Cards
              </span>
            </div>

            <div className="pt-2">
              <a
                href="#menu"
                className="text-xs text-stone-400 hover:text-white transition-colors block"
              >
                &bull; View Full Menu & Prices
              </a>
              <a
                href="#booking"
                className="text-xs text-stone-400 hover:text-white transition-colors block mt-1"
              >
                &bull; Bulk Birthday / Party Order Enquiry
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>
            &copy; {new Date().getFullYear()} Sultan's Restaurant. All rights reserved. Magadi Main Rd, Vijayanagar, Bengaluru.
          </p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Fast-Casual Dining</span>
            <span aria-hidden="true">&bull;</span>
            <span>Takeaway Counter</span>
            <span aria-hidden="true">&bull;</span>
            <span>Party Orders</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
