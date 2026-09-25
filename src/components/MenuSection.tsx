import React, { useState, useMemo } from 'react';
import { Search, Flame, Plus, Check, Utensils, Sparkles, Filter } from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';
import { MenuItem, MenuCategory, DietaryType } from '../types/restaurant';

interface MenuSectionProps {
  onAddItem: (item: MenuItem) => void;
  cartItemIds: Set<string>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddItem, cartItemIds }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Main Course' },
    { id: 'bites', label: 'Quick Bites' },
    { id: 'beverages', label: 'Beverages' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === 'veg' && !item.isVeg) {
        return false;
      }
      if (dietaryFilter === 'non-veg' && item.isVeg) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  const handleAddWithFeedback = (item: MenuItem) => {
    onAddItem(item);
    setAddedAnimationId(item.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 900);
  };

  // Group items by category when showing "all"
  const groupedItems = useMemo(() => {
    if (activeCategory !== 'all') {
      return [{ category: activeCategory, items: filteredItems }];
    }
    const groups: { category: MenuCategory; title: string; items: MenuItem[] }[] = [
      { category: 'starters', title: 'Starters & Crispy Appetizers', items: [] },
      { category: 'mains', title: 'Main Course & Dum Biryanis', items: [] },
      { category: 'bites', title: 'Quick Bites & Indo-Chinese', items: [] },
      { category: 'beverages', title: 'Beverages & Sweet Treats', items: [] },
    ];
    filteredItems.forEach((item) => {
      const g = groups.find((gr) => gr.category === item.category);
      if (g) g.items.push(item);
    });
    return groups.filter((g) => g.items.length > 0);
  }, [filteredItems, activeCategory]);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Physical Menu Aesthetic Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-2">
            <Utensils className="w-3.5 h-3.5" />
            <span>Printed Menu & Price List</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
            Sultan's Restaurant Menu
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Clean, authentic, and pocket-friendly. What you see is what you pay—no hidden service charges.
          </p>
        </div>

        {/* Controls: Category tabs, Dietary filter, and Search */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs mb-10 space-y-4">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as MenuCategory)}
                  type="button"
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Right controls: Veg/Non-Veg filter & Search */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Veg / Non-Veg segmented pill */}
              <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200">
                <button
                  onClick={() => setDietaryFilter('all')}
                  type="button"
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                    dietaryFilter === 'all'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietaryFilter('non-veg')}
                  type="button"
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors flex items-center gap-1 ${
                    dietaryFilter === 'non-veg'
                      ? 'bg-white text-red-700 shadow-2xs'
                      : 'text-stone-600 hover:text-red-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-xs border border-red-600 bg-red-600 inline-block" />
                  Non-Veg
                </button>
                <button
                  onClick={() => setDietaryFilter('veg')}
                  type="button"
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors flex items-center gap-1 ${
                    dietaryFilter === 'veg'
                      ? 'bg-white text-emerald-700 shadow-2xs'
                      : 'text-stone-600 hover:text-emerald-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-xs border border-emerald-600 bg-emerald-600 inline-block" />
                  Veg Only
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative flex-grow sm:flex-grow-0 sm:w-56">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search biryani, kabab..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-orange-500 focus:bg-white text-stone-900 placeholder:text-stone-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    type="button"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Quick Dietary and Value Legend */}
          <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 border border-red-600 flex items-center justify-center p-0.5 rounded-xs">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                </span>
                <span>Non-Vegetarian</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 border border-emerald-600 flex items-center justify-center p-0.5 rounded-xs">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                </span>
                <span>Vegetarian</span>
              </span>
            </div>
            <span>Showing {filteredItems.length} items</span>
          </div>

        </div>

        {/* Empty State if search matches nothing */}
        {filteredItems.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-lg mx-auto">
            <p className="text-stone-600 font-semibold mb-2">No dishes match your search.</p>
            <p className="text-stone-500 text-xs mb-4">Try searching for "biryani", "kabab", "roll", or reset the filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setDietaryFilter('all');
              }}
              type="button"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Physical Menu Grid Layout */}
        <div className="space-y-10">
          {groupedItems.map((group) => (
            <div
              key={group.category}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden"
            >
              {/* Category Board Header */}
              <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white px-5 sm:px-8 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <h3 className="font-heading text-base sm:text-lg font-bold tracking-wide uppercase text-orange-100">
                    {'title' in group ? group.title : group.category.toUpperCase()}
                  </h3>
                </div>
                <span className="text-xs font-medium text-stone-300">
                  {group.items.length} {group.items.length === 1 ? 'dish' : 'dishes'}
                </span>
              </div>

              {/* Items in 2-Column Physical Menu Grid */}
              <div className="p-4 sm:p-7 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
                {group.items.map((item) => {
                  const isAdded = cartItemIds.has(item.id);
                  const isJustAnimated = addedAnimationId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between py-2 border-b border-stone-100 last:border-0 hover:bg-stone-50/70 p-2.5 rounded-lg transition-colors group"
                    >
                      {/* Top line: Name + Dotted Line + Price + Add Button */}
                      <div className="flex items-end justify-between gap-1 w-full">
                        
                        {/* Name and Dietary Icon */}
                        <div className="flex items-center gap-2 shrink-0 max-w-[62%] sm:max-w-[70%]">
                          {/* FSSAI Veg / Non-Veg Icon */}
                          <span
                            className={`w-3.5 h-3.5 border flex items-center justify-center p-0.5 rounded-xs shrink-0 ${
                              item.isVeg ? 'border-emerald-600' : 'border-red-600'
                            }`}
                            title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                              }`}
                            />
                          </span>

                          <span className="font-heading text-sm sm:text-base font-bold text-stone-900 group-hover:text-orange-600 transition-colors leading-tight">
                            {item.name}
                          </span>

                          {item.isBestseller && (
                            <span className="hidden sm:inline-block text-[10px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded-xs uppercase">
                              Popular
                            </span>
                          )}
                        </div>

                        {/* Classic Physical Menu Dotted Leader */}
                        <div className="menu-dot-leader" aria-hidden="true" />

                        {/* Price & Add Action */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-heading font-extrabold text-stone-900 text-sm sm:text-base tabular-nums">
                            ₹{item.price}
                          </span>

                          <button
                            onClick={() => handleAddWithFeedback(item)}
                            type="button"
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                              isJustAnimated
                                ? 'bg-emerald-600 text-white scale-110'
                                : isAdded
                                ? 'bg-orange-600 text-white hover:bg-orange-700'
                                : 'bg-stone-100 text-stone-700 hover:bg-orange-600 hover:text-white'
                            }`}
                            title="Add to order tray"
                            aria-label={`Add ${item.name} to order tray for ₹${item.price}`}
                          >
                            {isJustAnimated ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Description & Portion metadata */}
                      <div className="mt-1 flex items-baseline justify-between gap-3 text-xs text-stone-500">
                        <p className="line-clamp-2 text-stone-600 text-[11px] sm:text-xs">
                          {item.description}
                        </p>
                        {item.portion && (
                          <span className="shrink-0 text-stone-400 font-medium text-[10px]">
                            {item.portion}
                          </span>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Note on Freshness and Takeaway packaging */}
        <div className="mt-8 text-center text-xs text-stone-500 max-w-2xl mx-auto space-y-1">
          <p>
            * All biryanis are accompanied by fresh curd raita & traditional salan.
          </p>
          <p className="text-stone-600 font-medium">
            * <strong>Takeaway / Parcel Charges:</strong> Standard packaging charge of ₹10 per food container applies for takeaway parcel and delivery orders (hygienic leak-proof packaging). Dine-in table dining has zero packaging charges.
          </p>
        </div>

      </div>
    </section>
  );
};
