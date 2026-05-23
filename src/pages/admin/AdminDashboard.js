// ============================================================
// pages/admin/AdminDashboard.js
// Shows stats, recent bookings, quick navigation links
// ============================================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-slate-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-700/50 shadow-lg shadow-slate-900/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-inner border`}>
      {icon}
    </div>
    <div className="text-4xl font-display font-bold text-slate-100 mb-1 drop-shadow-sm">{value}</div>
    <div className="text-sm font-medium text-slate-400">{label}</div>
  </div>
);

// Updated premium dark mode status badges
const statusColors = {
  confirmed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  pending:   'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  cancelled: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
  rejected:  'bg-rose-500/10 text-rose-400 border border-rose-500/20',
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/dashboard');
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400 animate-pulse text-lg">Loading dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      {/* Ambient Background Glows */}
      <div className="absolute top-[5%] left-[10%] w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] bg-rose-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="mb-10 relative z-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-100 mb-2 drop-shadow-sm">Admin Dashboard</h1>
        <p className="text-slate-400 text-lg">Manage your events, bookings, and users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 relative z-10">
        <StatCard 
          icon="👥" 
          label="Total Users" 
          value={stats?.totalUsers ?? 0} 
          color="bg-blue-500/10 text-blue-400 border-blue-500/20" 
        />
        <StatCard 
          icon="🎉" 
          label="Total Events" 
          value={stats?.totalEvents ?? 0} 
          color="bg-purple-500/10 text-purple-400 border-purple-500/20" 
        />
        <StatCard 
          icon="🎟️" 
          label="Total Bookings" 
          value={stats?.totalBookings ?? 0} 
          color="bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10 relative z-10">
        <Link 
          to="/admin/events/new" 
          className="bg-slate-800/50 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex items-center gap-5 hover:bg-slate-700/50 hover:-translate-y-1 hover:shadow-lg shadow-slate-900/40 transition-all duration-300 group"
        >
          <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:bg-indigo-500/20 transition-colors">➕</div>
          <div>
            <div className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">Create Event</div>
            <div className="text-xs text-slate-400">Add a new event</div>
          </div>
        </Link>
        <Link 
          to="/admin/events" 
          className="bg-slate-800/50 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex items-center gap-5 hover:bg-slate-700/50 hover:-translate-y-1 hover:shadow-lg shadow-slate-900/40 transition-all duration-300 group"
        >
          <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:bg-blue-500/20 transition-colors">📋</div>
          <div>
            <div className="font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">Manage Events</div>
            <div className="text-xs text-slate-400">Edit or delete events</div>
          </div>
        </Link>
        <Link 
          to="/admin/bookings" 
          className="bg-slate-800/50 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 flex items-center gap-5 hover:bg-slate-700/50 hover:-translate-y-1 hover:shadow-lg shadow-slate-900/40 transition-all duration-300 group"
        >
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:bg-emerald-500/20 transition-colors">🎟️</div>
          <div>
            <div className="font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors">All Bookings</div>
            <div className="text-xs text-slate-400">View and manage bookings</div>
          </div>
        </Link>
      </div>

      {/* Recent Bookings */}
      <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-slate-900/80 rounded-3xl overflow-hidden relative z-10">
        <div className="px-6 py-5 border-b border-slate-700/50 bg-slate-900/30">
          <h2 className="font-semibold text-lg text-slate-200">Recent Bookings</h2>
        </div>
        {stats?.recentBookings?.length === 0 ? (
          <div className="p-10 text-center text-slate-400 italic">No bookings yet.</div>
        ) : (
          <div className="divide-y divide-slate-700/50">
            {stats?.recentBookings?.map((b) => (
              <div key={b._id} className="px-6 py-5 flex items-center justify-between hover:bg-slate-700/30 transition-colors duration-200">
                <div>
                  <div className="font-medium text-slate-200 text-sm mb-0.5">{b.userId?.name || 'Unknown User'}</div>
                  <div className="text-xs text-slate-400">{b.eventId?.title || 'Event Removed'}</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm shadow-sm ${statusColors[b.status]}`}>
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;