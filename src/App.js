// ============================================================
// App.js - Root component with React Router setup
// Defines all routes and wraps app in AuthProvider
// ============================================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import MyBookingsPage from './pages/MyBookingsPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEvents from './pages/admin/AdminEvents';
import AdminBookings from './pages/admin/AdminBookings';
import AdminUsers from './pages/admin/AdminUsers';
import EventForm from './pages/admin/EventForm';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />

              {/* Protected: Authenticated users */}
              <Route path="/my-bookings" element={
                <ProtectedRoute><MyBookingsPage /></ProtectedRoute>
              } />

              {/* Protected: Admin only */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>
              } />
              <Route path="/admin/events" element={
                <ProtectedRoute adminOnly><AdminEvents /></ProtectedRoute>
              } />
              <Route path="/admin/events/new" element={
                <ProtectedRoute adminOnly><EventForm /></ProtectedRoute>
              } />
              <Route path="/admin/events/edit/:id" element={
                <ProtectedRoute adminOnly><EventForm /></ProtectedRoute>
              } />
              <Route path="/admin/bookings" element={
                <ProtectedRoute adminOnly><AdminBookings /></ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="border-t border-gray-100 py-6 text-center text-sm text-gray-400">
            EventFlow — Online Event Management System
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
