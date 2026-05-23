// ============================================================
// utils/api.js - Axios instance configured for the backend
// Automatically attaches JWT token to every request
// ============================================================

import axios from 'axios';

// Base URL points to the backend server
const api = axios.create({
 baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

// ── Request Interceptor ───────────────────────────────────────
// Automatically add the JWT token from localStorage to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ──────────────────────────────────────
// Handle 401 (Unauthorized) globally — clear token and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
