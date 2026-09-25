import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, User, CheckCircle2, MessageSquare, Send, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { BookingData } from '../types/restaurant';
import { createPublicReservation } from '../services/reservationService';

interface BookingFormProps {
  initialType?: 'dine-in' | 'bulk-party' | 'takeaway';
  onNewReservation?: (code: string, data: BookingData) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ initialType = 'dine-in', onNewReservation }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingData>({
    name: '',
    phone: '',
    people: 4,
    date: todayStr,
    time: '13:30',
    type: initialType,
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Available slots strictly restricted between 1:00 PM (13:00) and 11:00 PM (23:00)
  const timeSlots = [
    { value: '13:00', label: '1:00 PM (Lunch Opening)' },
    { value: '13:30', label: '1:30 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '14:30', label: '2:30 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '15:30', label: '3:30 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '16:30', label: '4:30 PM' },
    { value: '17:00', label: '5:00 PM' },
    { value: '17:30', label: '5:30 PM' },
    { value: '18:00', label: '6:00 PM (Evening Starts)' },
    { value: '18:30', label: '6:30 PM' },
    { value: '19:00', label: '7:00 PM' },
    { value: '19:30', label: '7:30 PM' },
    { value: '20:00', label: '8:00 PM (Peak Dinner)' },
    { value: '20:30', label: '8:30 PM' },
    { value: '21:00', label: '9:00 PM' },
    { value: '21:30', label: '9:30 PM' },
    { value: '22:00', label: '10:00 PM' },
    { value: '22:30', label: '10:30 PM (Last Order)' },
    { value: '23:00', label: '11:00 PM (Closing)' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Time validation (must be between 13:00 and 23:00)
    const [hours] = formData.time.split(':').map(Number);
    if (hours < 13 || hours > 23) {
      setErrorMsg('Restaurant hours are between 1:00 PM and 11:00 PM.');
      return;
    }

    setIsSubmitting(true);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `SLT-${randomNum}`;

    try {
      // Secure public insertion into Firestore database (no login required for regular users)
      await createPublicReservation(code, {
        name: formData.name,
        phone: formData.phone,
        people: formData.people,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        specialRequests: formData.specialRequests,
      });

      if (onNewReservation) {
        onNewReservation(code, formData);
      }
      setSubmittedCode(code);
    } catch (err) {
      console.error('Failed to save reservation to database:', err);
      // Even if offline, still grant customer ref code & WhatsApp fallback
      setSubmittedCode(code);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppMessageUrl = () => {
    const timeLabel = timeSlots.find((s) => s.value === formData.time)?.label || formData.time;
    const typeLabel =
      formData.type === 'dine-in'
        ? 'Table Reservation'
        : formData.type === 'bulk-party'
        ? 'Bulk Party Order Enquiry'
        : 'Takeaway Advance Order';

    const text = `Hi Sultan's Restaurant, I would like to book:\n` +
      `• Type: ${typeLabel}\n` +
      `• Name: ${formData.name}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Guests / Qty: ${formData.people} people\n` +
      `• Date: ${formData.date}\n` +
      `• Time: ${timeLabel}\n` +
      (formData.specialRequests ? `• Notes: ${formData.specialRequests}\n` : '') +
      `(Ref: ${submittedCode || 'NEW'})`;

    return `https://wa.me/919448206692?text=${encodeURIComponent(text)}`;
  };

  const handleReset = () => {
    setSubmittedCode(null);
    setFormData({
      name: '',
      phone: '',
      people: 4,
      date: todayStr,
      time: '13:30',
      type: 'dine-in',
      specialRequests: '',
    });
  };

  return (
    <section id="booking" className="py-16 sm:py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 block mb-2">
            No-Fuss Instant Booking & Enquiries
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Book a Table or Bulk Party Order
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Reserve ahead for your friends or order 5kg+ biryani pots for birthday parties. Open 1:00 PM to 11:00 PM daily.
          </p>
        </div>

        {/* Confirmation Screen */}
        {submittedCode ? (
          <div className="bg-stone-800/90 border border-stone-700 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md max-w-2xl mx-auto text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-1">
              Request Received
            </span>
            <h3 className="font-heading text-2xl font-black text-white mb-2">
              Booking Ref: <span className="text-orange-400">{submittedCode}</span>
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed mb-6">
              Thank you, <strong className="text-white">{formData.name}</strong>! Your request for{' '}
              <strong className="text-white">{formData.people} people</strong> on{' '}
              <strong className="text-white">{formData.date}</strong> around{' '}
              <strong className="text-white">{formData.time}</strong> has been logged.
            </p>

            <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-700/80 text-left text-xs sm:text-sm text-stone-300 mb-6 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-400">Location:</span>
                <span className="font-medium text-stone-200">52, Magadi Main Rd, Vijayanagar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Phone:</span>
                <span className="font-medium text-stone-200">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Operating Hours:</span>
                <span className="font-medium text-stone-200">1:00 PM - 11:00 PM</span>
              </div>
            </div>

            {/* Quick 1-tap Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <a
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-colors shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm Instantly via WhatsApp</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-stone-700 hover:bg-stone-600 text-white font-bold rounded-xl text-sm transition-colors border border-stone-600"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>Call Us ({RESTAURANT_INFO.phone})</span>
              </a>
            </div>

            <button
              onClick={handleReset}
              type="button"
              className="text-stone-400 hover:text-stone-200 text-xs font-semibold underline underline-offset-4"
            >
              Make another reservation / enquiry
            </button>
          </div>
        ) : (
          /* The Form */
          <form
            onSubmit={handleSubmit}
            className="bg-stone-800/90 border border-stone-700/90 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md"
          >
            {errorMsg && (
              <div className="mb-6 p-3.5 bg-red-900/60 border border-red-700 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm text-red-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Service Type Selection Tabs */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                What are you booking?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'dine-in' })}
                  className={`py-2.5 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                    formData.type === 'dine-in'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-stone-900/80 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  Table Seating
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'bulk-party' })}
                  className={`py-2.5 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                    formData.type === 'bulk-party'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-stone-900/80 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  🎉 Bulk Party Order
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'takeaway' })}
                  className={`py-2.5 px-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                    formData.type === 'takeaway'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-stone-900/80 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  Advance Parcel
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 bg-stone-900/90 border border-stone-700 rounded-xl text-white text-sm focus:outline-hidden focus:border-orange-500 placeholder:text-stone-500"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                  Mobile Number (For Confirmation) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98450 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 bg-stone-900/90 border border-stone-700 rounded-xl text-white text-sm focus:outline-hidden focus:border-orange-500 placeholder:text-stone-500"
                  />
                </div>
              </div>

              {/* Number of People */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                  Number of People / Guests
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.people}
                    onChange={(e) => setFormData({ ...formData, people: Number(e.target.value) })}
                    className="w-full pl-10 pr-3 py-3 bg-stone-900/90 border border-stone-700 rounded-xl text-white text-sm focus:outline-hidden focus:border-orange-500"
                  >
                    <option value={1}>1 Person</option>
                    <option value={2}>2 People (Couple / Duo)</option>
                    <option value={4}>4 People (Small Group)</option>
                    <option value={6}>6 People (Family Table)</option>
                    <option value={8}>8 People (Large Table)</option>
                    <option value={12}>10-12 People (Party)</option>
                    <option value={20}>15-20 People (Bulk Party)</option>
                    <option value={30}>25-30 People (Celebration)</option>
                    <option value={50}>50+ People (Full Catering)</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 bg-stone-900/90 border border-stone-700 rounded-xl text-white text-sm focus:outline-hidden focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Time Restricted 1:00 PM to 11:00 PM */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                  Arrival Time (Operating Hours: 1:00 PM – 11:00 PM) *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 bg-stone-900/90 border border-stone-700 rounded-xl text-white text-sm focus:outline-hidden focus:border-orange-500"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  We are open 7 days a week from 1:00 PM until 11:00 PM.
                </p>
              </div>

              {/* Notes / Special Requests */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                  Special Requests / Birthday Notes / Dish Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Birthday celebration, want 3 plates of Crispy Kababs ready upon arrival, extra spicy salan..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full p-3 bg-stone-900/90 border border-stone-700 rounded-xl text-white text-sm focus:outline-hidden focus:border-orange-500 placeholder:text-stone-500"
                />
              </div>

            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-stone-700/80">
              <span className="text-xs text-stone-400">
                ⚡ Instant confirmation. No credit card required.
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 disabled:opacity-70 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Reservation...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Booking Enquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
