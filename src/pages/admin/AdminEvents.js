// ============================================================
// pages/admin/AdminEvents.js
// Admin can view, edit, delete all events + navigate to create
// ============================================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New state to manage the custom delete confirmation modal
  const [deletingEvent, setDeletingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events');
      setEvents(data.events);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchEvents(); }, []);

  // Updated logic to execute deletion from the custom modal
  const confirmDelete = async () => {
    if (!deletingEvent) return;
    try {
      await api.delete(`/events/${deletingEvent.id}`);
      setEvents(events.filter((e) => e._id !== deletingEvent.id));
    } catch { 
      alert('Failed to delete event.'); 
    } finally {
      setDeletingEvent(null); // Close the modal
    }
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400 animate-pulse text-lg">Loading events...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      {/* Ambient Background Glows */}
      <div className="absolute top-[10%] right-[20%] w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 relative z-10">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-100 mb-2 drop-shadow-sm">Manage Events</h1>
          <p className="text-slate-400 text-lg">{events.length} events total</p>
        </div>
        <Link 
          to="/admin/events/new" 
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-indigo-600/25 border border-indigo-500 ring-1 ring-indigo-500/50 hover:-translate-y-0.5 whitespace-nowrap text-center"
        >
          + New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/40 p-12 rounded-3xl text-center shadow-inner relative z-10">
          <p className="text-6xl mb-6 drop-shadow-md">🎭</p>
          <p className="text-2xl text-slate-200 font-semibold mb-4">No events yet</p>
          <Link 
            to="/admin/events/new" 
            className="bg-slate-700/50 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-slate-600 inline-block hover:-translate-y-0.5"
          >
            Create your first event
          </Link>
        </div>
      ) : (
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-slate-900/80 rounded-2xl overflow-hidden relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-900/50 border-b border-slate-700/50">
                <tr>
                  {['Title', 'Date', 'Location', 'Seats', 'Category', 'Actions'].map((h) => (
                    <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {events.map((event) => {
                  const available = event.totalSeats - event.bookedSeats;
                  return (
                    <tr key={event._id} className="hover:bg-slate-700/30 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-200">
                        {event.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                        {new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={available === 0 ? 'text-rose-400 font-medium' : 'text-emerald-400 font-medium'}>
                          {available} <span className="text-slate-500 font-normal">/ {event.totalSeats}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700/40 text-slate-300 border border-slate-600 backdrop-blur-sm shadow-sm">
                          {event.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2.5">
                          <Link 
                            to={`/admin/events/edit/${event._id}`}
                            className="text-xs text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 px-3 py-1.5 rounded-lg font-medium transition-all duration-300"
                          >
                            Edit
                          </Link>
                          <button 
                            onClick={() => setDeletingEvent({ id: event._id, title: event.title })}
                            className="text-xs text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 px-3 py-1.5 rounded-lg font-medium transition-all duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal UI */}
      {deletingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="relative bg-slate-900 border border-slate-700/50 p-6 sm:p-8 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-sm w-full">
            {/* Modal ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent rounded-[2.5rem] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="text-rose-500 mb-4 text-4xl">⚠️</div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">Delete Event?</h3>
              <p className="text-slate-400 font-light mb-8 text-sm leading-relaxed">
                Are you sure you want to delete <strong className="text-slate-200 font-semibold">"{deletingEvent.title}"</strong>? This action cannot be undone.
              </p>
              
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                <button
                  onClick={() => setDeletingEvent(null)}
                  className="px-5 py-3 rounded-xl text-slate-300 text-sm font-bold hover:bg-slate-800 transition-colors w-full sm:w-auto"
                >
                  Cancel
                </button>
                <div className="relative group/confirmBtn w-full sm:w-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl blur opacity-40 group-hover/confirmBtn:opacity-100 transition duration-500"></div>
                  <button
                    onClick={confirmDelete}
                    className="relative w-full px-5 py-3 bg-slate-950 border border-rose-500/50 text-white text-sm font-bold rounded-xl hover:bg-rose-950/50 transition-colors whitespace-nowrap"
                  >
                    Yes, Delete
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

export default AdminEvents;