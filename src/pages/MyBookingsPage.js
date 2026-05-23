// ============================================================
// pages/MyBookingsPage.js
// Shows logged-in user's bookings with cancel option
// ============================================================

import { useState, useEffect } from 'react';
import api from '../utils/api';

// Upgraded premium dark mode status badges with neon glows
const statusColors = {
  confirmed: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
  pending:   'bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse',
  cancelled: 'bg-slate-500/10 text-slate-300 border-slate-500/30 shadow-[0_0_15px_rgba(100,116,139,0.2)]',
  rejected:  'bg-rose-500/10 text-rose-300 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]',
};

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // New state to manage the custom confirmation modal
  const [cancellingId, setCancellingId] = useState(null);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings/my');
      setBookings(data.bookings);
    } catch {
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  // Updated cancel logic to fire from the modal confirmation
  const handleConfirmCancel = async () => {
    if (!cancellingId) return;
    try {
      await api.put(`/bookings/${cancellingId}/cancel`);
      fetchBookings(); // Refresh list after cancellation
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking.');
    } finally {
      setCancellingId(null); // Close modal
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 pt-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="h-12 w-1/3 bg-white/5 rounded-2xl mb-4"></div>
        <div className="h-6 w-1/4 bg-white/5 rounded-xl mb-12"></div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-36 bg-white/[0.02] backdrop-blur-2xl rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden selection:bg-cyan-500/30 pb-20">
      
      {/* Animated Cyber Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Breathing Ambient Background Glows */}
      <div className="fixed top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400">
            My Bookings
          </h1>
          <p className="text-slate-400 text-lg font-light">All the events you've registered for</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-6 py-4 rounded-2xl mb-8 text-sm font-bold backdrop-blur-md shadow-[0_0_20px_rgba(244,63,94,0.15)] flex items-center gap-3 animate-pulse">
            <span className="text-lg">⚠️</span> {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="relative bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-12 sm:p-20 rounded-[3rem] text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-fuchsia-500/5 pointer-events-none"></div>
            <p className="text-7xl mb-6 drop-shadow-2xl animate-bounce">📭</p>
            <p className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-300 font-extrabold mb-3">No bookings yet</p>
            <p className="text-slate-400 font-light text-lg">Browse events and book one to get started!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const event = booking.eventId;
              const formattedDate = event
                ? new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
                : 'Event removed';

              return (
                <div 
                  key={booking._id} 
                  className="relative group bg-white/[0.02] backdrop-blur-3xl p-6 sm:p-8 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:-translate-y-2 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden"
                >
                  {/* Subtle hover gradient glow inside card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-fuchsia-500/0 group-hover:from-cyan-500/5 group-hover:to-fuchsia-500/5 transition-colors duration-500 pointer-events-none"></div>

                  <div className="relative z-10 w-full sm:w-auto">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="font-display font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 drop-shadow-md">
                        {event?.title || 'Event Unavailable'}
                      </h3>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    {event && (
                      <div className="text-sm text-slate-300 flex flex-wrap items-center gap-5 mb-4 bg-black/40 p-4 rounded-xl border border-white/5 w-fit group-hover:border-white/10 transition-colors">
                        <span className="flex items-center gap-2 font-medium"><span className="opacity-80 text-lg">📅</span> {formattedDate} at {event.time}</span>
                        <span className="hidden sm:inline text-slate-600">|</span>
                        <span className="flex items-center gap-2 font-medium"><span className="opacity-80 text-lg">📍</span> {event.location}</span>
                      </div>
                    )}
                    
                    <div className="text-xs text-slate-500 font-medium font-mono">
                      Booked on {new Date(booking.createdAt).toLocaleDateString('en-IN')}
                    </div>
                  </div>

                  {booking.status !== 'cancelled' && booking.status !== 'rejected' && (
                    <div className="relative z-10 group/btn mt-2 sm:mt-0">
                      {/* Rose glowing aura for cancel button */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl blur opacity-40 group-hover/btn:opacity-100 transition duration-500 group-hover/btn:duration-200 animate-tilt"></div>
                      <button
                        onClick={() => setCancellingId(booking._id)} // Triggers custom modal instead of alert
                        className="relative w-full sm:w-auto text-sm text-white font-bold bg-slate-950 border border-white/10 group-hover/btn:bg-slate-900 group-hover/btn:border-rose-500/50 px-6 py-4 rounded-xl transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2"
                      >
                        <span className="text-rose-400 group-hover/btn:text-rose-300">✖</span> Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Custom Confirmation Modal UI */}
      {cancellingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="relative bg-slate-900 border border-slate-700/50 p-6 sm:p-8 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-sm w-full">
            {/* Modal ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent rounded-[2.5rem] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="text-rose-500 mb-4 text-4xl">⚠️</div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">Cancel Booking?</h3>
              <p className="text-slate-400 font-light mb-8 text-sm">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
              
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                <button
                  onClick={() => setCancellingId(null)}
                  className="px-5 py-3 rounded-xl text-slate-300 text-sm font-bold hover:bg-slate-800 transition-colors w-full sm:w-auto"
                >
                  Keep Booking
                </button>
                <div className="relative group/confirmBtn w-full sm:w-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl blur opacity-40 group-hover/confirmBtn:opacity-100 transition duration-500"></div>
                  <button
                    onClick={handleConfirmCancel}
                    className="relative w-full px-5 py-3 bg-slate-950 border border-rose-500/50 text-white text-sm font-bold rounded-xl hover:bg-rose-950/50 transition-colors"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyBookingsPage;