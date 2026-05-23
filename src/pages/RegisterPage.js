// ============================================================
// pages/RegisterPage.js
// User registration form with validation
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      login(data.token, data.user);
      navigate('/events');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden py-12 selection:bg-cyan-500/30">
      
      {/* Animated Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Breathing Ambient Background Glows */}
      <div className="absolute top-[5%] right-[10%] w-[30rem] h-[30rem] bg-fuchsia-600/20 rounded-full blur-[150px] pointer-events-none animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      <div className="absolute bottom-[5%] left-[10%] w-[30rem] h-[30rem] bg-cyan-600/20 rounded-full blur-[150px] pointer-events-none animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-5xl font-extrabold mb-4 tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 bg-[length:200%_auto] animate-[pulse_4s_ease-in-out_infinite]">
            Create account
          </h1>
          <p className="text-slate-400 text-lg font-light">Join EventFlow and start booking events</p>
        </div>

        <div className="relative bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] rounded-[2.5rem] p-8 sm:p-10 overflow-hidden">
          
          {/* Subtle internal gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-fuchsia-500/5 pointer-events-none"></div>

          {/* Error Message */}
          {error && (
            <div className="relative z-10 bg-rose-500/10 border border-rose-500/30 text-rose-400 px-5 py-4 rounded-2xl mb-8 text-sm font-bold backdrop-blur-md shadow-[0_0_20px_rgba(244,63,94,0.15)] flex items-center gap-3 animate-pulse">
              <span className="text-lg">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="Your full name" 
                required 
                className="w-full bg-black/40 border border-white/10 text-slate-100 placeholder-slate-500 rounded-xl px-5 py-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                placeholder="you@example.com" 
                required 
                className="w-full bg-black/40 border border-white/10 text-slate-100 placeholder-slate-500 rounded-xl px-5 py-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange}
                placeholder="At least 6 characters" 
                required 
                className="w-full bg-black/40 border border-white/10 text-slate-100 placeholder-slate-500 rounded-xl px-5 py-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange}
                placeholder="Repeat your password" 
                required 
                className="w-full bg-black/40 border border-white/10 text-slate-100 placeholder-slate-500 rounded-xl px-5 py-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300" 
              />
            </div>

            {/* Glowing Aura Button */}
            <div className="relative group mt-8">
              {!loading && (
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 rounded-xl blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-tilt"></div>
              )}
              <button 
                type="submit" 
                disabled={loading} 
                className={`relative w-full py-4 px-4 rounded-xl font-extrabold text-lg transition-all duration-300 flex justify-center items-center gap-3 ${
                  loading 
                    ? 'bg-black/40 text-slate-500 cursor-not-allowed border border-white/5'
                    : 'bg-slate-950 text-white border border-white/10 group-hover:bg-slate-900 group-hover:text-cyan-300'
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></span> Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          <p className="relative z-10 text-center text-sm text-slate-400 mt-8 font-light">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors underline decoration-cyan-500/30 underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;