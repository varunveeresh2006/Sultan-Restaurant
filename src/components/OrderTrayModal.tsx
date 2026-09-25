import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Phone, MessageSquare, Utensils, ShoppingBag, Bike, Info, ArrowRight } from 'lucide-react';
import { CartItem, OrderMode } from '../types/restaurant';
import { RESTAURANT_INFO, PARCEL_SETTINGS } from '../data/menuData';

interface OrderTrayModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onOpenBooking: () => void;
}

export const OrderTrayModal: React.FC<OrderTrayModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenBooking,
}) => {
  const [orderMode, setOrderMode] = useState<OrderMode>('takeaway');

  if (!isOpen) return null;

  const itemsSubtotal = cartItems.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );

  const totalCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);

  // Parcel charges apply when ordering Takeaway or Delivery
  // Standard rate: ₹10 per container / portion
  const isParcelMode = orderMode === 'takeaway' || orderMode === 'delivery';
  const parcelCharges = isParcelMode
    ? totalCount * PARCEL_SETTINGS.chargePerContainer
    : 0;

  const finalTotal = itemsSubtotal + parcelCharges;

  const generateWhatsAppOrderUrl = () => {
    const modeLabel =
      orderMode === 'takeaway'
        ? 'Takeaway / Parcel Pick-up'
        : orderMode === 'delivery'
        ? 'Home Delivery'
        : 'Dine-In Table Order';

    let text = `Hi Sultan's Restaurant, I want to place an order:\n\n`;
    text += `*Order Type:* ${modeLabel}\n\n`;
    text += `*Items:*\n`;
    cartItems.forEach((ci, idx) => {
      text += `${idx + 1}. ${ci.item.name} x ${ci.quantity} = ₹${ci.item.price * ci.quantity}\n`;
    });
    text += `\n*Items Subtotal:* ₹${itemsSubtotal}\n`;
    if (isParcelMode) {
      text += `*Parcel / Packaging Charges:* ₹${parcelCharges} (${totalCount} containers @ ₹${PARCEL_SETTINGS.chargePerContainer}/box)\n`;
    } else {
      text += `*Parcel Charges:* ₹0 (Dine-In)\n`;
    }
    text += `*Total Amount to Pay: ₹${finalTotal}*\n\n`;
    text += `Please confirm preparation time at Magadi Main Rd. Thank you!`;
    
    return `https://wa.me/919448206692?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Your Order Tray"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-stone-900 text-base leading-tight">
                Your Order Tray
              </h3>
              <span className="text-xs text-stone-500">
                {totalCount} {totalCount === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                type="button"
                className="text-stone-400 hover:text-red-600 text-xs font-semibold px-2 py-1"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition-colors"
              aria-label="Close tray"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Order Mode Toggle (Takeaway vs Dine-In vs Delivery) */}
        {cartItems.length > 0 && (
          <div className="p-3 bg-stone-100/80 border-b border-stone-200">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              Select Order Type
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setOrderMode('takeaway')}
                className={`py-2 px-1 text-xs font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-0.5 ${
                  orderMode === 'takeaway'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                <div className="flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Parcel</span>
                </div>
                <span className={`text-[10px] font-normal ${orderMode === 'takeaway' ? 'text-orange-100' : 'text-stone-500'}`}>
                  +₹{PARCEL_SETTINGS.chargePerContainer}/box
                </span>
              </button>

              <button
                type="button"
                onClick={() => setOrderMode('dine-in')}
                className={`py-2 px-1 text-xs font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-0.5 ${
                  orderMode === 'dine-in'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Dine-In</span>
                </div>
                <span className={`text-[10px] font-normal ${orderMode === 'dine-in' ? 'text-orange-100' : 'text-stone-500'}`}>
                  ₹0 parcel fee
                </span>
              </button>

              <button
                type="button"
                onClick={() => setOrderMode('delivery')}
                className={`py-2 px-1 text-xs font-bold rounded-lg transition-all flex flex-col items-center justify-center gap-0.5 ${
                  orderMode === 'delivery'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5" />
                  <span>Delivery</span>
                </div>
                <span className={`text-[10px] font-normal ${orderMode === 'delivery' ? 'text-orange-100' : 'text-stone-500'}`}>
                  +₹{PARCEL_SETTINGS.chargePerContainer}/box
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-stone-400">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-300 mb-3">
                <Utensils className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-stone-700 text-base mb-1">
                Your Tray is Empty
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mb-4">
                Explore our menu and tap the <strong>+</strong> button to add crispy kababs, dum biryani, and quick bites!
              </p>
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-bold shadow-xs hover:bg-orange-700"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map(({ item, quantity }) => (
              <div
                key={item.id}
                className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2.5 h-2.5 border rounded-xs shrink-0 flex items-center justify-center p-0.5 ${
                        item.isVeg ? 'border-emerald-600' : 'border-red-600'
                      }`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${
                          item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                        }`}
                      />
                    </span>
                    <h5 className="font-heading text-xs sm:text-sm font-bold text-stone-900 truncate">
                      {item.name}
                    </h5>
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-2">
                    <span>₹{item.price} each</span>
                    <span>&bull;</span>
                    <span className="font-semibold text-stone-800 tabular-nums">₹{item.price * quantity}</span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 shrink-0 bg-white border border-stone-200 rounded-lg p-1">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    type="button"
                    className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    {quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-500" /> : <Minus className="w-3 h-3" />}
                  </button>
                  <span className="text-xs font-bold text-stone-900 w-5 text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    type="button"
                    className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            {/* Bill Summary */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal ({totalCount} items):</span>
                <span className="font-bold text-stone-900 tabular-nums">₹{itemsSubtotal}</span>
              </div>

              {/* Parcel / Container Charges */}
              <div className="flex justify-between items-center text-stone-600">
                <span className="flex items-center gap-1">
                  <span>Parcel Packaging:</span>
                  {isParcelMode ? (
                    <span className="text-[10px] text-stone-500">
                      (₹{PARCEL_SETTINGS.chargePerContainer} × {totalCount} boxes)
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-600 font-semibold">(Dine-In)</span>
                  )}
                </span>
                <span className={`font-bold tabular-nums ${isParcelMode ? 'text-stone-900' : 'text-emerald-700'}`}>
                  {isParcelMode ? `₹${parcelCharges}` : '₹0'}
                </span>
              </div>

              <div className="flex justify-between text-stone-900 font-extrabold text-sm pt-2 border-t border-stone-200">
                <span>Total Amount to Pay:</span>
                <span className="text-orange-600 tabular-nums text-base">₹{finalTotal}</span>
              </div>
            </div>

            {/* Packaging Note for Customers */}
            {isParcelMode && (
              <div className="flex items-start gap-1.5 p-2 bg-orange-50/80 border border-orange-200/80 rounded-lg text-[11px] text-orange-950">
                <Info className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span>
                  Includes hygienic spill-proof foil containers, salan cups, and carry bag.
                </span>
              </div>
            )}

            {/* Quick Action Buttons */}
            <div className="space-y-2 pt-1">
              <a
                href={generateWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send {orderMode === 'takeaway' ? 'Parcel' : orderMode === 'delivery' ? 'Delivery' : 'Dine-In'} Order via WhatsApp</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors text-center"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>Call {RESTAURANT_INFO.phone} to Confirm</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                type="button"
                className="w-full py-2 text-stone-600 hover:text-stone-900 text-xs font-semibold text-center"
              >
                Or reserve a dine-in table instead &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

