import React from 'react';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { MenuItem } from '../types/restaurant';

interface FoodShowcaseProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const FoodShowcase: React.FC<FoodShowcaseProps> = ({ onQuickAdd }) => {
  const featured = [
    {
      title: "Sultan's Crispy Chicken Kabab",
      price: 140,
      tag: "Vijayanagar Favorite",
      category: "Signature Starters",
      image: "/src/assets/images/sultans_starters_kabab_1790303289327.jpg",
      description: "Deep-red, crackling crispy on the outside, succulent on the inside. Tossed with fresh curry leaves, sliced onions, and lime.",
      portion: "6 hearty pieces",
      itemRef: {
        id: 'st-1',
        name: "Sultan's Crispy Chicken Kabab",
        category: 'starters' as const,
        price: 140,
        description: "Deep-fried red spiced chicken bone-in chunks, seasoned with fresh curry leaves and lemon wedges.",
        isVeg: false,
        isBestseller: true,
        portion: "6 pcs",
      }
    },
    {
      title: "Sultan's Special Dum Biryani",
      price: 180,
      tag: "Best-Selling Pot",
      category: "Aromatic Mains",
      image: "/src/assets/images/sultans_special_biryani_1790303303153.jpg",
      description: "Layered with long-grain rice, tender marinated chicken, boiled egg, fried caramelized onions, served with cooling raita & spiced salan.",
      portion: "Serves 1 hearty",
      itemRef: {
        id: 'mc-1',
        name: "Sultan's Special Chicken Dum Biryani",
        category: 'mains' as const,
        price: 180,
        description: "Fragrant basmati rice slow-cooked on dum with juicy chicken pieces, boiled egg, served with raita and salan.",
        isVeg: false,
        isBestseller: true,
        portion: "Serves 1 hearty",
      }
    },
    {
      title: "Quick Bites & Roll Feast",
      price: 90,
      tag: "Crowd Favorite",
      category: "Street Eats & Combos",
      image: "/src/assets/images/sultans_quickbites_party_1790303314617.jpg",
      description: "Freshly tossed egg chicken rolls, spicy schezwan fried rice, and crunchy noodles for quick lunchtime bites or casual evening hangouts.",
      portion: "From ₹90",
      itemRef: {
        id: 'qb-1',
        name: "Sultan's Egg Chicken Roll",
        category: 'bites' as const,
        price: 90,
        description: "Crispy parotta rolled with egg, spiced shredded chicken, crunchy onion rings, and mint-chili sauce.",
        isVeg: false,
        isBestseller: true,
        portion: "1 jumbo roll",
      }
    },
  ];

  return (
    <section id="specials" className="py-14 sm:py-20 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">
              <Flame className="w-4 h-4 text-orange-600" />
              <span>Crowd Favorites</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
              What Sultan's Is Famous For
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              Freshly cooked in small batches every afternoon and evening. High flavor, zero fuss, and unmatched local price-to-portion value.
            </p>
          </div>

          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 group shrink-0"
          >
            <span>Explore All 30+ Items</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 3 Showcase Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Image container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-md">
                  {card.tag}
                </div>
                <div className="absolute bottom-3 right-3 bg-orange-600 text-white font-extrabold text-sm px-3 py-1 rounded-md shadow-xs tabular-nums">
                  ₹{card.price}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    {card.category} · {card.portion}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    Hot & Fresh Daily
                  </span>
                  <button
                    onClick={() => onQuickAdd(card.itemRef)}
                    type="button"
                    className="px-3.5 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-600 hover:text-white rounded-lg transition-colors"
                  >
                    + Add to Tray
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
