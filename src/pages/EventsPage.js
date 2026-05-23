// ============================================================
// pages/EventsPage.js
// Browse all events with search and category filter
// ============================================================

import { useState, useEffect } from 'react';
import api from '../utils/api';
import EventCard from '../components/events/EventCard';

const CATEGORIES = ['All', 'Conference', 'Workshop', 'Concert', 'Sports', 'Networking', 'Other'];

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [error, setError] = useState('');

  // Fetch events whenever filters change
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (category !== 'All') params.category = category;
        const { data } = await api.get('/events', { params });
        setEvents(data.events);
      } catch (err) {
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };

    // Debounce search: wait 400ms after user stops typing
    const timer = setTimeout(fetchEvents, 400);
    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <div className="relative min-h-screen bg-slate-950 selection:bg-cyan-500/30">
      
      {/* Background ambient glows specific to this page */}
      <div className="fixed top-[10%] left-[20%] w-[30rem] h-[30rem] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[20%] right-[10%] w-[40rem] h-[40rem] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-display text-5xl font-extrabold mb-3 tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400">
            Browse Events
          </h1>
          <p className="text-slate-400 text-xl font-light">Discover and book events happening near you</p>
        </div>

        {/* Search + Filter Bar */}
        <div className="relative group flex flex-col lg:flex-row gap-5 mb-14 bg-white/[0.02] p-5 rounded-[2rem] backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-cyan-500/30">
          {/* Subtle internal glow for the container */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-fuchsia-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="relative z-10 flex-1">
            <input
              type="text"
              placeholder="Search events by title, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/20 border border-white/10 text-slate-100 placeholder-slate-500 rounded-xl px-6 py-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300"
            />
          </div>
          
          <div className="relative z-10 flex gap-3 flex-wrap items-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 backdrop-blur-md shadow-sm ${
                  category === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] border-transparent scale-105'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-cyan-300 hover:-translate-y-0.5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 px-6 py-4 rounded-xl mb-10 text-sm font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(244,63,94,0.1)] flex items-center gap-3 animate-pulse">
            <span className="text-xl">⚠️</span> {error}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/[0.02] backdrop-blur-2xl rounded-3xl border border-white/5 shadow-2xl p-6 overflow-hidden relative">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                <div className="flex justify-between mb-6">
                  <div className="h-7 w-24 bg-white/10 rounded-full"></div>
                </div>
                <div className="h-7 bg-white/10 rounded-lg mb-4 w-3/4"></div>
                <div className="h-4 bg-white/5 rounded-lg mb-8 w-full"></div>
                
                <div className="space-y-4 mb-8 bg-black/20 p-5 rounded-2xl border border-white/5">
                  <div className="h-3 bg-white/10 rounded-full w-2/3"></div>
                  <div className="h-3 bg-white/10 rounded-full w-1/2"></div>
                  <div className="h-3 bg-white/10 rounded-full w-3/4"></div>
                </div>
                
                <div className="h-12 bg-white/10 rounded-xl mt-2"></div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          /* Empty State */
          <div className="text-center py-32 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] mx-auto max-w-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-duration-700"></div>
            <div className="relative z-10">
              <div className="text-7xl mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-bounce inline-block">
                🌌
              </div>
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 mb-4">
                No events found
              </h2>
              <p className="text-slate-500 font-light text-lg">
                Try adjusting your search terms or exploring a different category.
              </p>
            </div>
          </div>
        ) : (
          /* Event Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;