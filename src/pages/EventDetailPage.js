// ============================================================
// pages/EventDetailPage.js
// Shows full details of an event + booking button for users
// Admin sees edit/delete options instead
// ============================================================

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const EventDetailPage = () => {
  const { id } = useParams();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data.event);
      } catch {
        setError('Event not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBook = async () => {
    if (!user) return navigate('/login');
    setBooking(true);
    setMessage('');
    setError('');
    try {
      await api.post('/bookings', { eventId: id });
      setMessage('🎉 Booking confirmed! Check "My Bookings" for details.');
      // Refresh event data to update seat count
      const { data } = await api.get(`/events/${id}`);
      setEvent(data.event);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed.');
    } finally {
      setBooking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      navigate('/events');
    } catch (err) {
      setError('Failed to delete event.');
    }
  };

  if (loading) return (
    <div className="relative min-h-screen bg-slate-950 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] border border-white/5 shadow-2xl p-10 overflow-hidden relative">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="h-6 w-24 bg-white/10 rounded-full mb-8"></div>
          <div className="h-10 w-3/4 bg-white/10 rounded-xl mb-6"></div>
          <div className="h-24 w-full bg-white/5 rounded-xl mb-10"></div>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-white/5 rounded-2xl"></div>)}
          </div>
          <div className="h-14 w-full bg-white/10 rounded-xl"></div>
        </div>
      </div>
    </div>
  );

  if (error && !event) return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center py-20 px-10 bg-white/[0.02] backdrop-blur-3xl border border-rose-500/20 rounded-[3rem] shadow-[0_0_50px_rgba(244,63,94,0.1)] max-w-lg">
        <div className="text-6xl mb-6 drop-shadow-md animate-bounce">⚠️</div>
        <p className="text-2xl font-bold text-rose-300 mb-2">{error}</p>
        <Link to="/events" className="text-cyan-400 hover:text-cyan-300 transition-colors mt-4 inline-block">Return to events</Link>
      </div>
    </div>
  );

  const available = event.totalSeats - event.bookedSeats;
  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="relative min-h-screen bg-slate-950 selection:bg-cyan-500/30 overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <Link to="/events" className="group inline-flex items-center text-sm font-bold text-slate-400 hover:text-cyan-400 mb-8 transition-colors duration-300">
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Events
        </Link>

        <div className="relative bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] p-8 sm:p-12 overflow-hidden">
          
          {/* Subtle internal gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-fuchsia-500/5 pointer-events-none"></div>

          {/* Header Badges */}
          <div className="relative z-10 flex items-start justify-between mb-8">
            <span className="px-4 py-2 rounded-full text-xs font-bold tracking-wide bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              {event.category}
            </span>
            {available === 0 && (
              <span className="px-4 py-2 rounded-full text-xs font-bold tracking-wide bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)] animate-pulse">
                Sold Out
              </span>
            )}
          </div>

          {/* Title & Description */}
          <h1 className="relative z-10 font-display text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-300">
            {event.title}
          </h1>
          <p className="relative z-10 text-slate-400 mb-12 leading-relaxed text-lg sm:text-xl font-light">
            {event.description}
          </p>

          {/* Details Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {[
              { icon: '📅', label: 'Date', value: formattedDate },
              { icon: '🕐', label: 'Time', value: event.time },
              { icon: '📍', label: 'Location', value: event.location },
              { icon: '🪑', label: 'Seats', value: `${available} of ${event.totalSeats} available` },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-black/20 rounded-2xl p-6 border border-white/5 shadow-inner hover:bg-black/30 hover:border-cyan-500/20 transition-all duration-300 group">
                <div className="text-sm text-slate-400 mb-2 flex items-center gap-3 font-medium">
                  <span className="opacity-80 text-xl group-hover:scale-110 transition-transform">{icon}</span> {label}
                </div>
                <div className="text-lg font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">{value}</div>
              </div>
            ))}
          </div>

          {/* Feedback Messages */}
          <div className="relative z-10">
            {message && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-6 py-4 rounded-2xl mb-8 text-sm font-bold backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.15)] flex items-center gap-3">
                {message}
              </div>
            )}
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-6 py-4 rounded-2xl mb-8 text-sm font-bold backdrop-blur-md shadow-[0_0_20px_rgba(244,63,94,0.15)] flex items-center gap-3 animate-pulse">
                <span className="text-lg">⚠️</span> {error}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 mt-4">
            {isAdmin ? (
              <div className="flex flex-col sm:flex-row gap-5">
                <Link 
                  to={`/admin/events/edit/${event._id}`} 
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:-translate-y-1 hover:shadow-lg hover:border-cyan-500/30"
                >
                  ✏️ Edit Event
                </Link>
                <button 
                  onClick={handleDelete} 
                  className="flex-1 flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold py-4 px-6 rounded-xl transition-all duration-300 backdrop-blur-md border border-rose-500/30 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                >
                  🗑️ Delete Event
                </button>
              </div>
            ) : (
              <div className="relative group">
                {/* Glowing Aura for active button */}
                {!(booking || available === 0) && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-tilt"></div>
                )}
                <button
                  onClick={handleBook}
                  disabled={booking || available === 0}
                  className={`relative w-full py-5 px-6 rounded-2xl font-extrabold text-lg transition-all duration-300 flex justify-center items-center gap-3 ${
                    booking || available === 0
                      ? 'bg-black/40 text-slate-500 cursor-not-allowed border border-white/5'
                      : 'bg-slate-950 text-white border border-white/10 group-hover:bg-slate-900 group-hover:text-cyan-300'
                  }`}
                >
                  {booking ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></span> Processing...
                    </span>
                  ) : available === 0 ? (
                    'Sold Out'
                  ) : (
                    'Book This Event'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Login Prompt for Guests */}
          {!user && (
            <p className="relative z-10 text-center text-sm text-slate-400 mt-8 bg-black/20 py-4 rounded-xl border border-white/5 font-light">
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors underline decoration-cyan-500/30 underline-offset-4">
                Login
              </Link> to book this event
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;