
import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import IndustryDetail from './pages/IndustryDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <HashRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/admin" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="our-story" element={<OurStory />} />
                <Route path="industries/:slug" element={<IndustryDetail />} />
                <Route path="contact" element={<Contact />} />
              </Route>
            </Routes>
          </HashRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
