import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminLoginView } from '../components/admin/AdminLoginView';
import { AdminDashboardView } from '../components/admin/AdminDashboardView';
import { AdminContentModule } from '../components/admin/AdminContentModule';
import { AdminKnowledgeModule } from '../components/admin/AdminKnowledgeModule';
import { AdminServicesModule } from '../components/admin/AdminServicesModule';
import { AdminUsersModule } from '../components/admin/AdminUsersModule';
import { AdminCampaignsModule } from '../components/admin/AdminCampaignsModule';
import { AdminDonationsModule } from '../components/admin/AdminDonationsModule';
import { AdminAnalyticsModule } from '../components/admin/AdminAnalyticsModule';
import { AdminSettingsModule } from '../components/admin/AdminSettingsModule';
import { AdminAuditModule } from '../components/admin/AdminAuditModule';

export const AdminPortalPage: React.FC = () => {
  const { currentUser, role, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-[70vh] flex items-center justify-center text-sm text-ivory/70">Checking secure session...</div>;
  }
  if (!isAuthenticated || !currentUser) {
    return <AdminLoginView />;
  }
  if (role !== 'ADMIN') return <Navigate to="/profile" replace />;
  if (currentUser.mustChangePassword) return <Navigate to="/profile?auth=change-password" replace />;

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboardView />} />
        <Route path="content" element={<AdminContentModule />} />
        <Route path="knowledge" element={<AdminKnowledgeModule />} />
        <Route path="services" element={<AdminServicesModule />} />
        <Route path="users" element={<AdminUsersModule />} />
        <Route path="campaigns" element={<AdminCampaignsModule />} />
        <Route path="donations" element={<AdminDonationsModule />} />
        <Route path="analytics" element={<AdminAnalyticsModule />} />
        <Route path="settings" element={<AdminSettingsModule />} />
        <Route path="audit" element={<AdminAuditModule />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPortalPage;
