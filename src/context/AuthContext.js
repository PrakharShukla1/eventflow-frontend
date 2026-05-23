// ============================================================
// context/AuthContext.js
// Global authentication state using React Context
// Provides: user, login, logout, loading state
// ============================================================

import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

// Create the context
const AuthContext = createContext();

// ── AuthProvider: Wrap your app with this ────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // True while checking saved token

  // On app load, check if user was previously logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // ── Login: Save token and user to state + localStorage ────
  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // ── Logout: Clear everything ──────────────────────────────
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

// ── Custom hook for easy context access ──────────────────────
export const useAuth = () => useContext(AuthContext);
