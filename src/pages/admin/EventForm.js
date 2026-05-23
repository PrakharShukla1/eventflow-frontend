// ============================================================
// pages/admin/EventForm.js
// Shared form for creating and editing events
// Detects "edit mode" via URL param (id)
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../utils/api';

const CATEGORIES = ['Conference', 'Workshop', 'Concert', 'Sports', 'Networking', 'Other'];

const EventForm = () => {
  const { id } = useParams(); // If id exists → edit mode
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '', description: '', date: '', time: '', location: '', totalSeats: '', category: 'Other',
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [error, setError] = useState('');

  // In edit mode, pre-fill the form with existing event data
  useEffect(() => {
    if (!isEditMode) return;
    const fetch = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        const e = data.event;
        setFormData({
          title: e.title,
          description: e.description,
          date: e.date.split('T')[0], // Format for date input (YYYY-MM-DD)
          time: e.time,
          location: e.location,
          totalSeats: e.totalSeats,
          category: e.category,
        });
      } catch { setError('Failed to load event.'); }
      finally { setFetchLoading(false); }
    };
    fetch();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEditMode) {
        await api.put(`/events/${id}`, formData);
      } else {
        await api.post('/events', formData);
      }
      navigate('/admin/events');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save event.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="max-w-2xl mx-auto px-4 py-16 text-center text-slate-400 animate-pulse text-lg">Loading event...</div>;

  // Common styling for all inputs
  const inputClassName = "w-full bg-slate-900/50 border border-slate-700/50 text-slate-200 placeholder-slate-500 rounded-xl px-4 py-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300";

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 relative">
      {/* Ambient Background Glows */}
      <div className="absolute top-[5%] left-[10%] w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[25rem] h-[25rem] bg-rose-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="mb-8 relative z-10">
        <Link to="/admin/events" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5 w-fit">
          <span>&larr;</span> Back to Events
        </Link>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-100 mt-3 drop-shadow-sm">
          {isEditMode ? 'Edit Event' : 'Create New Event'}
        </h1>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-slate-900/80 rounded-3xl p-8 sm:p-10 relative z-10">
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-3 rounded-xl mb-6 text-sm backdrop-blur-sm shadow-sm flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Event Title <span className="text-rose-400">*</span></label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              placeholder="e.g. Tech Summit 2025" 
              required 
              className={inputClassName} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Description <span className="text-rose-400">*</span></label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              placeholder="Describe your event..." 
              required 
              rows={5} 
              className={`${inputClassName} resize-none`} 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Date <span className="text-rose-400">*</span></label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange}
                required 
                className={inputClassName}
                style={{ colorScheme: 'dark' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Time <span className="text-rose-400">*</span></label>
              <input 
                type="time" 
                name="time" 
                value={formData.time} 
                onChange={handleChange}
                required 
                className={inputClassName}
                style={{ colorScheme: 'dark' }} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Location <span className="text-rose-400">*</span></label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange}
              placeholder="Venue name and city" 
              required 
              className={inputClassName} 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Total Seats <span className="text-rose-400">*</span></label>
              <input 
                type="number" 
                name="totalSeats" 
                value={formData.totalSeats} 
                onChange={handleChange}
                placeholder="e.g. 100" 
                min="1" 
                required 
                className={inputClassName} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Category</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className={inputClassName}
                style={{ colorScheme: 'dark' }}
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              type="submit" 
              disabled={loading} 
              className={`flex-1 py-3.5 px-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg ${
                loading 
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25 border border-indigo-500 ring-1 ring-indigo-500/50 hover:-translate-y-0.5'
              }`}
            >
              {loading ? 'Saving...' : isEditMode ? 'Update Event' : 'Create Event'}
            </button>
            <Link 
              to="/admin/events" 
              className="flex-1 py-3.5 px-4 rounded-xl font-semibold text-base sm:text-lg text-center transition-all duration-300 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 hover:border-slate-500 hover:-translate-y-0.5 shadow-lg"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;