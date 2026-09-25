import React from 'react';
import { Utensils, ShoppingBag, Bike, PartyPopper, Check, Phone, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface ServicesSectionProps {
  onOpenBookingForParty: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBookingForParty }) => {
  const services = [
    {
      icon: Utensils,
      title: "Casual Dine-In",
      badge: "Popular with Families",
      description: "Air-ventilated, clean fast-casual seating setup. Fast counter and table service for students, working professionals, and family dinners.",
      points: ["Clean dining space", "Fast table turnaround", "Drinking water provided"],
      actionLabel: "View Seating Hours",
      actionHref: "#location",
    },
    {
      icon: ShoppingBag,
      title: "Fast Takeout / Parcel",
      badge: "In a Hurry?",
      description: "Conveniently located on Magadi Main Road. Drop in or call ahead — your piping hot biryani and kababs will be neatly boxed within 12-15 minutes.",
      points: ["Spill-proof foil packaging (₹10/box)", "Quick pick-up counter", "Call ahead to avoid wait"],
      actionLabel: `Call: ${RESTAURANT_INFO.phone}`,
      actionHref: `tel:${RESTAURANT_INFO.phoneRaw}`,
    },
    {
      icon: Bike,
      title: "Local Delivery",
      badge: "Vijayanagar & Vicinity",
      description: "Craving a late lunch or evening dinner at home? We deliver across MC Layout, Vijayanagar, Chord Road, and nearby areas quickly and safely.",
      points: ["Fresh & steaming hot", "Delivered promptly", "Cash & UPI on Delivery"],
      actionLabel: "Order for Delivery",
      actionHref: `tel:${RESTAURANT_INFO.phoneRaw}`,
    },
    {
      icon: PartyPopper,
      title: "Bulk Party Orders",
      badge: "Birthdays & Get-Togethers",
      description: "Hosting a birthday party, college friends meet, or office team meal? Special large Biryani Handis (3kg, 5kg, 10kg) and Kabab Party Platters at great bulk discounts.",
      points: ["Cost-effective per head", "Customizable menus", "Advance booking available"],
      actionLabel: "Book Bulk Enquiry",
      isCustomAction: true,
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block mb-2">
            How We Serve You
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Services Built for Vijayanagar Locals
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Whether dining in with friends or ordering 5kg biryani for a birthday party at home, Sultan's has you covered.
          </p>
        </div>

        {/* 4 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-200 hover:border-orange-300 hover:bg-orange-50/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-stone-900 mb-2">
                    {srv.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-5">
                    {srv.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {srv.points.map((pt, pidx) => (
                      <li key={pidx} className="flex items-center gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  {srv.isCustomAction ? (
                    <button
                      onClick={onOpenBookingForParty}
                      type="button"
                      className="w-full py-2.5 px-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>{srv.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <a
                      href={srv.actionHref}
                      className="w-full py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>{srv.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Bulk Party Highlight Banner */}
        <div className="mt-12 bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="max-w-xl">
            <span className="text-xs font-black uppercase tracking-wider text-orange-200 block mb-1">
              Birthday Celebrations & Get-Togethers
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-black">
              Planning a Birthday Party or Family Gathering?
            </h3>
            <p className="text-orange-100 text-xs sm:text-sm mt-1.5">
              Get customized Chicken/Mutton Dum Biryani pots with Kabab Platters and cool Faloodas at unbeatable group rates. Delivered or ready for pickup.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenBookingForParty}
              type="button"
              className="w-full sm:w-auto px-5 py-3 bg-white text-stone-900 hover:bg-stone-100 rounded-xl font-bold text-sm shadow-sm transition-colors text-center"
            >
              Enquire Bulk Order
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="w-full sm:w-auto px-5 py-3 bg-stone-900/40 hover:bg-stone-900/60 border border-white/20 text-white rounded-xl font-bold text-sm transition-colors text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-orange-300" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
