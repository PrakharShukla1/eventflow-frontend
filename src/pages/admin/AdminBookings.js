// ============================================================
// pages/admin/AdminBookings.js
// Admin view of all bookings; can approve/reject each one
// ============================================================

import { useState, useEffect } from 'react';
import api from '../../utils/api';

// Updated premium dark mode status badges
const statusColors = {
  confirmed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  pending:   'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  cancelled: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
  rejected:  'bg-rose-500/10 text-rose-400 border border-rose-500/20',
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/admin/bookings');
      setBookings(data.bookings);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleStatusChange = async (bookingId, status) => {
    try {
      await api.put(`/admin/bookings/${bookingId}/status`, { status });
      setBookings(bookings.map((b) => b._id === bookingId ? { ...b, status } : b));
    } catch { alert('Failed to update booking.'); }
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400 animate-pulse text-lg">Loading bookings...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      {/* Page Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-100 mb-2 drop-shadow-sm">All Bookings</h1>
          <p className="text-slate-400 text-lg">Manage and moderate user registrations</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 px-4 py-2 rounded-xl backdrop-blur-md shadow-sm">
          <span className="text-slate-300 font-medium">{bookings.length} total bookings</span>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/40 p-12 rounded-3xl text-center shadow-inner">
          <p className="text-6xl mb-6 drop-shadow-md">📭</p>
          <p className="text-2xl text-slate-200 font-semibold">No bookings yet</p>
        </div>
      ) : (
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-slate-900/80 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-900/50 border-b border-slate-700/50">
                <tr>
                  {['User', 'Event', 'Date Booked', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-700/30 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-200">{b.userId?.name || 'Unknown User'}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{b.userId?.email || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300 font-medium">
                      {b.eventId?.title || 'Event Removed'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                      {new Date(b.createdAt).toLocaleDateString('en-IN', { 
                        year: 'numeric', month: 'short', day: 'numeric' 
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm shadow-sm ${statusColors[b.status]}`}>
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {b.status !== 'cancelled' && (
                        <div className="flex gap-2">
                          {b.status !== 'confirmed' && (
                            <button 
                              onClick={() => handleStatusChange(b._id, 'confirmed')}
                              className="text-xs text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 px-3 py-1.5 rounded-lg font-medium transition-all duration-300"
                            >
                              Approve
                            </button>
                          )}
                          {b.status !== 'rejected' && (
                            <button 
                              onClick={() => handleStatusChange(b._id, 'rejected')}
                              className="text-xs text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 px-3 py-1.5 rounded-lg font-medium transition-all duration-300"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      )}
                      {b.status === 'cancelled' && (
                        <span className="text-xs text-slate-600 italic">User Cancelled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;