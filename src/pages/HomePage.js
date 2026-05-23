// ============================================================
// pages/HomePage.js
// Landing page with hero section and call-to-action
// ============================================================

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden selection:bg-cyan-500/30 text-slate-200">
      
      {/* Animated Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Breathing Ambient Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50rem] h-[50rem] bg-cyan-600/20 rounded-full blur-[150px] pointer-events-none animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-fuchsia-600/20 rounded-full blur-[150px] pointer-events-none animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
          
          {/* Glowing Floating Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 border border-cyan-500/30 text-cyan-300 text-sm font-semibold px-6 py-2.5 rounded-full mb-10 shadow-[0_0_30px_rgba(34,211,238,0.2)] backdrop-blur-xl hover:scale-105 hover:bg-white/10 transition-all duration-300 cursor-default">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            Next-Gen Event Management
          </div>
          
          {/* Main Heading with Animated Gradient */}
          <h1 className="font-display text-6xl sm:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight drop-shadow-2xl text-white">
            Discover &amp; Book <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 bg-[length:200%_auto] animate-[pulse_4s_ease-in-out_infinite]">
              Unforgettable Events
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-slate-400 text-lg sm:text-2xl max-w-2xl mx-auto mb-14 leading-relaxed font-light">
            Browse conferences, workshops, concerts, and more. Secure your spot in seconds with our seamless booking experience.
          </p>
          
          {/* Call to Actions */}
          <div className="flex gap-6 justify-center flex-wrap items-center">
            
            {/* Primary Button with Glowing Aura Effect */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 rounded-xl blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-tilt"></div>
              <Link 
                to="/events" 
                className="relative flex items-center justify-center bg-slate-950 text-white font-bold text-lg px-8 py-4 rounded-xl ring-1 ring-white/10 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-cyan-300"
              >
                Browse Events
              </Link>
            </div>
            
            {!user && (
              <Link 
                to="/register" 
                className="bg-white/[0.02] hover:bg-white/10 text-slate-200 font-semibold text-lg px-8 py-4 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
              >
                Sign Up Free
              </Link>
            )}
            
            {isAdmin && (
              <Link 
                to="/admin" 
                className="bg-white/[0.02] hover:bg-white/10 text-slate-200 font-semibold text-lg px-8 py-4 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] group flex items-center gap-3"
              >
                Admin Dashboard 
                <span className="group-hover:translate-x-2 transition-transform text-fuchsia-400 font-bold">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-white/5 bg-gradient-to-b from-transparent to-slate-950/80">
        <div className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-6 drop-shadow-md relative z-10">
            Everything you need
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light text-lg relative z-10">
            Powerful tools designed to make event discovery and management effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
          {[
            { icon: '🔍', title: 'Discover Events', desc: 'Browse and search events seamlessly by category, date, or location.' },
            { icon: '🎟️', title: 'Easy Booking', desc: 'Secure your spot in one click. No double bookings, fully guaranteed.' },
            { icon: '📋', title: 'Manage Bookings', desc: 'View, track, and cancel your upcoming bookings anytime from your dashboard.' },
          ].map((f, i) => (
            <div 
              key={f.title} 
              className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-10 text-center hover:-translate-y-4 hover:rotate-1 hover:scale-105 hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all duration-500 group relative overflow-hidden"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {/* Card internal glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-fuchsia-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-fuchsia-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
              
              <div className="relative z-10 w-20 h-20 mx-auto bg-slate-900/80 group-hover:bg-cyan-500/20 border border-white/10 group-hover:border-cyan-400/50 flex items-center justify-center rounded-3xl mb-8 shadow-inner text-4xl transition-all duration-500 group-hover:-translate-y-2">
                <span className="group-hover:animate-bounce">{f.icon}</span>
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-slate-100 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-fuchsia-300 transition-all duration-300">
                {f.title}
              </h3>
              <p className="relative z-10 text-slate-400 leading-relaxed font-light text-base">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;