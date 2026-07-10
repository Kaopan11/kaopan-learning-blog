// กำหนดเส้นทาง (routes) ทั้งหมดของแอป — แต่ละ path แมปไปยังหน้าที่ต่างกัน
import { Routes, Route, Navigate } from 'react-router-dom'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import AdminLayout from '@/layouts/AdminLayout'
import ProfileDashboardLayout from '@/layouts/ProfileDashboardLayout'
import LandingPage from '@/pages/LandingPage'
import ViewPostPage from '@/pages/ViewPostPage'
import SignUpPage from '@/pages/SignUpPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProfilePage from '@/pages/profile/ProfilePage'
import ResetPasswordPage from '@/pages/profile/ResetPasswordPage'
import ArticleListPage from '@/pages/admin/articles/ArticleListPage'
import ArticleCreatePage from '@/pages/admin/articles/ArticleCreatePage'
import ArticleEditPage from '@/pages/admin/articles/ArticleEditPage'
import CategoryListPage from '@/pages/admin/categories/CategoryListPage'
import CategoryCreatePage from '@/pages/admin/categories/CategoryCreatePage'
import CategoryEditPage from '@/pages/admin/categories/CategoryEditPage'
import AdminProfilePage from '@/pages/admin/AdminProfilePage'
import AdminNotificationPage from '@/pages/admin/AdminNotificationPage'
import AdminResetPasswordPage from '@/pages/admin/AdminResetPasswordPage'

function App() {
  return (
    <Routes>
      {/* หน้าสาธารณะ — เข้าได้โดยไม่ต้อง login */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/post/:postId" element={<ViewPostPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* หน้าสมาชิก — ต้อง login ก่อน (ProtectedRoute) + ใช้ nested routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProfilePage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Admin Panel — nested routes ภายใต้ /admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="articles" replace />} />

        {/* Article management */}
        <Route path="articles" element={<ArticleListPage />} />
        <Route path="articles/new" element={<ArticleCreatePage />} />
        <Route path="articles/:id/edit" element={<ArticleEditPage />} />

        {/* Category management */}
        <Route path="categories" element={<CategoryListPage />} />
        <Route path="categories/new" element={<CategoryCreatePage />} />
        <Route path="categories/:id/edit" element={<CategoryEditPage />} />

        {/* Profile & settings */}
        <Route path="profile" element={<AdminProfilePage />} />
        <Route path="notifications" element={<AdminNotificationPage />} />
        <Route path="reset-password" element={<AdminResetPasswordPage />} />
      </Route>

      {/* 404 — path ที่ไม่ตรงกับ route ใดเลย */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
