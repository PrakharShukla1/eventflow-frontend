// ============================================================
// pages/admin/AdminUsers.js
// Admin view of all registered users; can delete users
// ============================================================

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data.users);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (userId, name) => {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user.');
    }
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400 animate-pulse text-lg">Loading users...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      {/* Ambient Background Glows */}
      <div className="absolute top-[10%] right-[20%] w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 relative z-10">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-100 mb-2 drop-shadow-sm">All Users</h1>
          <p className="text-slate-400 text-lg">Manage platform accounts and permissions</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 px-4 py-2 rounded-xl backdrop-blur-md shadow-sm">
          <span className="text-slate-300 font-medium">{users.length} registered users</span>
        </div>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-slate-900/80 rounded-2xl overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900/50 border-b border-slate-700/50">
              <tr>
                {['Name', 'Email', 'Role', 'Joined', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-slate-700/30 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-200">
                    <div className="flex items-center gap-2">
                      {u.name}
                      {u._id === currentUser._id && (
                        <span className="bg-slate-700/50 text-slate-300 text-[10px] px-2 py-0.5 rounded-md border border-slate-600 font-medium tracking-wide">
                          YOU
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                    {u.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm shadow-sm border ${
                        u.role === 'admin' 
                          ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                          : 'bg-slate-700/40 text-slate-300 border-slate-600'
                      }`}
                    >
                      {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                    {new Date(u.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Prevent admin from deleting themselves */}
                    {u._id !== currentUser._id ? (
                      <button 
                        onClick={() => handleDelete(u._id, u.name)}
                        className="text-xs text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 px-3 py-1.5 rounded-lg font-medium transition-all duration-300"
                      >
                        Delete
                      </button>
                    ) : (
                      <span className="text-xs text-slate-600 italic px-3 py-1.5">Action disabled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;