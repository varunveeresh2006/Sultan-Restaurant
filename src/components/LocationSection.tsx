import React from 'react';
import { MapPin, Phone, Clock, Navigation, CreditCard, Banknote, QrCode, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block mb-2">
            Visit Us in Vijayanagar
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Location, Hours & Payments
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Right on Magadi Main Road in MC Layout. Easy parking for two-wheelers and quick pickups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-stone-900">
                    Restaurant Address
                  </h3>
                  <p className="text-stone-700 text-sm mt-1 leading-relaxed font-medium">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-stone-500 text-xs mt-1.5">
                    Landmark: Magadi Main Rd near MC Layout, close to Vijayanagar Metro.
                  </p>
                  <div className="mt-4">
                    <a
                      href={RESTAURANT_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5 text-orange-400" />
                      <span>Open in Google Maps / Directions</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-base font-bold text-stone-900">
                      Opening Hours
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm">
                      Open 7 Days
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-stone-700 space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span>Monday – Sunday:</span>
                      <span className="text-stone-900">1:00 PM – 11:00 PM</span>
                    </div>
                  </div>
                  <p className="text-xs text-stone-500 mt-2">
                    Fresh biryani pots ready from 1:00 PM for lunch; hot kababs & rolls served until 11:00 PM dinner.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-stone-900">
                    Direct Phone & WhatsApp
                  </h3>
                  <p className="text-stone-600 text-xs mt-0.5">
                    For quick takeaway orders, table checks, or bulk party bookings.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{RESTAURANT_INFO.phone}</span>
                    </a>
                    <a
                      href={RESTAURANT_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      <span>WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Modes Accepted */}
            <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-800 block mb-2">
                Accepted Payment Methods
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-center shadow-2xs">
                  <QrCode className="w-5 h-5 mx-auto text-orange-600 mb-1" />
                  <span className="text-xs font-bold text-stone-800 block">UPI</span>
                  <span className="text-[10px] text-stone-500">GPay, PhonePe, Paytm</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-center shadow-2xs">
                  <Banknote className="w-5 h-5 mx-auto text-emerald-600 mb-1" />
                  <span className="text-xs font-bold text-stone-800 block">Cash</span>
                  <span className="text-[10px] text-stone-500">Exact change welcomed</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-center shadow-2xs">
                  <CreditCard className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                  <span className="text-xs font-bold text-stone-800 block">Cards</span>
                  <span className="text-[10px] text-stone-500">Debit / Credit</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Location Embed & Route Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-stone-100 rounded-2xl border border-stone-200 overflow-hidden shadow-xs relative">
              
              {/* Map Header */}
              <div className="bg-white px-5 py-3.5 border-b border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-stone-900 text-sm">
                    Interactive Map: Magadi Main Rd, Vijayanagar
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    PIN: 560079 · Bengaluru, Karnataka
                  </p>
                </div>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  <span>Get Directions</span>
                  <Navigation className="w-3 h-3" />
                </a>
              </div>

              {/* Map Iframe Embed */}
              <div className="relative w-full h-[380px] sm:h-[440px] bg-stone-200">
                <iframe
                  title="Sultan's Restaurant Location on Magadi Main Road Vijayanagar Bengaluru"
                  src="https://maps.google.com/maps?q=52+Magadi+Main+Rd+MC+Layout+Vijayanagar+Bengaluru+Karnataka+560079&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[15%] contrast-[1.05]"
                />
              </div>

              {/* Map Footer Bar with Direct Quick Link */}
              <div className="bg-white p-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-stone-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>52, Magadi Main Rd, MC Layout (Near Tollgate / Vijayanagar Club)</span>
                </div>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors shrink-0"
                >
                  Navigate Now
                </a>
              </div>

            </div>

            {/* Travel Time estimates */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs text-stone-600">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">5 mins</span>
                <span className="text-[11px] text-stone-500">Vijayanagar Metro</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">7 mins</span>
                <span className="text-[11px] text-stone-500">RPC Layout</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-stone-900 block">10 mins</span>
                <span className="text-[11px] text-stone-500">Rajajinagar / Chord Rd</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
