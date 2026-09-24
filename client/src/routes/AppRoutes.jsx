import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import AppLayout from '../components/layout/AppLayout';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

// Public & Auth Pages
import LandingPage from '../pages/Landing/LandingPage';
import LoginPage from '../pages/Auth/LoginPage';
import SignupPage from '../pages/Auth/SignupPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';

// Core Dashboard & Modules
import DashboardPage from '../pages/Dashboard/DashboardPage';
import AcademicsPage from '../pages/Academics/AcademicsPage';
import EventsPage from '../pages/Events/EventsPage';
import OpportunitiesPage from '../pages/Opportunities/OpportunitiesPage';
import ClubsPage from '../pages/Clubs/ClubsPage';
import AnnouncementsPage from '../pages/Announcements/AnnouncementsPage';
import ResourcesPage from '../pages/Resources/ResourcesPage';
import CommunityPage from '../pages/Community/CommunityPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import AdminDashboardPage from '../pages/Admin/AdminDashboardPage';

// New Advanced Features
import PlacementsPage from '../pages/Placements/PlacementsPage';
import CircularsPage from '../pages/Circulars/CircularsPage';
import FeesPage from '../pages/Fees/FeesPage';
import ExamsPage from '../pages/Exams/ExamsPage';
import SemestersPage from '../pages/Semesters/SemestersPage';
import LostFoundPage from '../pages/LostFound/LostFoundPage';
import CampusSafetyPage from '../pages/Safety/CampusSafetyPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing & Public Auth */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected Campus Operating System Shell */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Enterprise & Student Lifecycle Features */}
        <Route path="/placements" element={<PlacementsPage />} />
        <Route path="/circulars" element={<CircularsPage />} />
        <Route path="/fees" element={<FeesPage />} />
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/semesters" element={<SemestersPage />} />
        <Route path="/lost-found" element={<LostFoundPage />} />
        <Route path="/campus-safety" element={<CampusSafetyPage />} />

        {/* Super Admin Restricted Control Console */}
        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={['super_admin']}>
              <AdminDashboardPage />
            </RoleRoute>
          }
        />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
