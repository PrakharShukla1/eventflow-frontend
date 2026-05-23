// ============================================================
// components/events/EventCard.js
// Displays a single event in a card format
// ============================================================

import { Link } from 'react-router-dom';

// Category color map for premium dark badges (glassmorphism style)
const categoryColors = {
  Conference: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  Workshop:   'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  Concert:    'bg-pink-500/10 text-pink-400 border border-pink-500/20',
  Sports:     'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  Networking: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  Other:      'bg-slate-500/10 text-slate-400 border border-slate-500/20',
};

const EventCard = ({ event }) => {
  const available = event.totalSeats - event.bookedSeats;
  const isFull = available <= 0;
  const percentFull = Math.round((event.bookedSeats / event.totalSeats) * 100);

  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-lg shadow-slate-900/40 hover:shadow-xl hover:shadow-slate-900/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Category + Status Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm shadow-sm ${categoryColors[event.category] || categoryColors.Other}`}>
          {event.category}
        </span>
        {isFull && (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 backdrop-blur-sm shadow-sm">
            Sold Out
          </span>
        )}
      </div>

      {/* Event Details */}
      <div className="px-5 pb-5">
        <h3 className="font-display text-lg font-semibold text-slate-100 mb-2 leading-snug drop-shadow-sm">
          {event.title}
        </h3>
        <p className="text-sm text-slate-400 mb-5 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Meta info */}
        <div className="space-y-2.5 mb-6 bg-slate-900/40 p-3.5 rounded-xl border border-slate-700/30">
          <div className="flex items-center gap-2.5 text-sm text-slate-300">
            <span className="opacity-80">📅</span>
            <span>{formattedDate} at {event.time}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-slate-300">
            <span className="opacity-80">📍</span>
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-slate-300">
            <span className="opacity-80">🪑</span>
            <span><strong className="text-slate-200">{available}</strong> / {event.totalSeats} seats available</span>
          </div>
        </div>

        {/* Seat availability bar */}
        <div className="mb-5">
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentFull > 80 
                  ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' 
                  : percentFull > 50 
                    ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' 
                    : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
              }`}
              style={{ width: `${percentFull}%` }}
            />
          </div>
        </div>

        <Link 
          to={`/events/${event._id}`} 
          className="block w-full text-center py-2.5 px-4 text-sm font-medium rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-500/25 ring-1 ring-indigo-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
