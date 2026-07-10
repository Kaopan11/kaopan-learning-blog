// ProfileDashboardLayout — layout หลักของหน้า /profile
// Desktop: sidebar ซ้าย + Outlet ขวา | Mobile: ใช้ hamburger ใน NavBar แทน sidebar
import { Outlet } from 'react-router-dom'

import { NavBar } from '@/components/NavBar'
import { ProfileSidebarNav } from '@/components/profile/ProfileSidebarNav'

export default function ProfileDashboardLayout() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:flex-row md:gap-10 md:px-8 md:py-10 lg:px-16">
        {/* Desktop sidebar — เมนู Profile / Reset password */}
        <aside className="hidden w-56 shrink-0 md:block">
          <ProfileSidebarNav />
        </aside>

        {/* Outlet แสดง ProfilePage หรือ ResetPasswordPage ตาม nested route */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </main>
  )
}
