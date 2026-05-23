// ============================================================
// components/common/Navbar.js
// Top navigation bar with role-aware links and logout
// ============================================================

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-3xl border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="text-3xl font-display font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 bg-[length:200%_auto] group-hover:animate-[pulse_2s_ease-in-out_infinite] drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300">
              EventFlow
            </span>
          </Link>

          {/* Navigation Links - Removed 'hidden md:flex' and added 'flex overflow-x-auto' for mobile scrollability */}
          <div className="flex items-stretch h-full gap-4 md:gap-10 overflow-x-auto pl-4">
            
            {/* 🌟 UPGRADED "LIVING" BROWSE EVENTS LINK 🌟 */}
            <Link to="/events" className="relative group flex items-center h-full px-2 flex-shrink-0">
              <span className={`text-base sm:text-lg font-black uppercase tracking-widest transition-all duration-300 z-10 transform group-hover:scale-110 group-hover:-translate-y-0.5 ${
                isActive('/events') 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.9)]' 
                  : 'text-slate-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-fuchsia-400 group-hover:to-cyan-400 group-hover:bg-[length:200%_auto] group-hover:animate-[pulse_2s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(34,211,238,0)] group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]'
              }`}>
                Browse Events
              </span>
              {/* Premium Animated Bottom Border */}
              <div className={`absolute bottom-0 left-0 w-full h-[4px] rounded-t-md transition-all duration-500 ease-out origin-center ${
                isActive('/events') 
                  ? 'bg-gradient-to-r from-cyan-400 to-fuchsia-400 shadow-[0_-3px_20px_rgba(34,211,238,0.9)] opacity-100 scale-x-100' 
                  : 'bg-gradient-to-r from-cyan-400 to-fuchsia-400 opacity-0 scale-x-50 group-hover:opacity-100 group-hover:scale-x-110 group-hover:shadow-[0_-3px_15px_rgba(34,211,238,0.6)]'
              }`} />
              {/* Ambient Glow for Active State */}
              {isActive('/events') && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-10 bg-cyan-500/30 blur-2xl pointer-events-none" />
              )}
            </Link>

            {user && (
              <Link to="/my-bookings" className="relative group flex items-center h-full flex-shrink-0 px-2">
                <span className={`text-sm font-bold tracking-wide transition-all duration-300 z-10 ${
                  isActive('/my-bookings') 
                    ? 'text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' 
                    : 'text-slate-400 group-hover:text-cyan-200'
                }`}>
                  My Bookings
                </span>
                <div className={`absolute bottom-0 left-0 w-full h-[3px] rounded-t-md transition-all duration-300 ease-out origin-center ${
                  isActive('/my-bookings') 
                    ? 'bg-cyan-400 shadow-[0_-3px_15px_rgba(34,211,238,0.8)] opacity-100 scale-x-100' 
                    : 'bg-white/20 opacity-0 scale-x-50 group-hover:opacity-100 group-hover:scale-x-100'
                }`} />
                {isActive('/my-bookings') && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-cyan-500/20 blur-xl pointer-events-none" />
                )}
              </Link>
            )}

            {isAdmin && (
              <Link to="/admin" className="relative group flex items-center h-full flex-shrink-0 px-2">
                <span className={`text-sm font-bold tracking-wide transition-all duration-300 z-10 ${
                  location.pathname.startsWith('/admin') 
                    ? 'text-fuchsia-300 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]' 
                    : 'text-slate-400 group-hover:text-fuchsia-200'
                }`}>
                  Admin Dashboard
                </span>
                <div className={`absolute bottom-0 left-0 w-full h-[3px] rounded-t-md transition-all duration-300 ease-out origin-center ${
                  location.pathname.startsWith('/admin') 
                    ? 'bg-fuchsia-400 shadow-[0_-3px_15px_rgba(217,70,239,0.8)] opacity-100 scale-x-100' 
                    : 'bg-white/20 opacity-0 scale-x-50 group-hover:opacity-100 group-hover:scale-x-100'
                }`} />
                {location.pathname.startsWith('/admin') && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-fuchsia-500/20 blur-xl pointer-events-none" />
                )}
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-5">
                {/* Removed 'hidden sm:flex' to make it visible on mobile */}
                <span className="flex items-center text-xs sm:text-sm text-slate-400">
                  Hi, <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 ml-1.5 tracking-wide">{user.name}</span>
                  {isAdmin && (
                    <span className="ml-2 sm:ml-3 px-2 sm:px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(217,70,239,0.2)]">
                      Admin
                    </span>
                  )}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="py-2 px-3 sm:py-2.5 sm:px-5 text-xs sm:text-sm font-bold rounded-xl bg-black/40 text-slate-300 hover:bg-slate-900 hover:text-cyan-300 transition-all duration-300 border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link 
                  to="/login" 
                  className="py-2 px-3 sm:py-2.5 sm:px-5 text-xs sm:text-sm font-bold rounded-xl bg-black/40 text-slate-300 hover:bg-slate-900 hover:text-cyan-300 transition-all duration-300 border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                >
                  Login
                </Link>
                
                {/* Glowing Aura Button for Sign Up - Removed 'hidden sm:block' */}
                <div className="relative group block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 rounded-xl blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-tilt"></div>
                  <Link 
                    to="/register" 
                    className="relative block py-2 px-3 sm:py-2.5 sm:px-5 text-xs sm:text-sm font-bold rounded-xl bg-slate-950 text-white border border-white/10 group-hover:bg-slate-900 group-hover:text-cyan-300 transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;