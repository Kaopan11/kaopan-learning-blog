// กำหนดเส้นทาง (routes) ทั้งหมดของแอป — แต่ละ path แมปไปยังหน้าที่ต่างกัน
import { Routes, Route, Navigate } from 'react-router-dom'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import ProfileDashboardLayout from '@/layouts/ProfileDashboardLayout'
import LandingPage from '@/pages/LandingPage'
import ViewPostPage from '@/pages/ViewPostPage'
import SignUpPage from '@/pages/SignUpPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProfilePage from '@/pages/profile/ProfilePage'
import ResetPasswordPage from '@/pages/profile/ResetPasswordPage'

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

      {/* 404 — path ที่ไม่ตรงกับ route ใดเลย */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
