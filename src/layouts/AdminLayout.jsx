// AdminLayout — layout หลักของ Admin Panel (sidebar + nested route outlet)
import { Outlet } from 'react-router-dom'

import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminProvider } from '@/contexts/AdminContext'

export default function AdminLayout() {
  return (
    <AdminProvider>
      <div className="flex min-h-screen bg-white">
        <AdminSidebar />

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="shrink-0 bg-[#26231E] px-8 py-3">
            <span className="text-sm font-medium text-white">Admin panel</span>
          </div>

          <div className="flex-1 px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </AdminProvider>
  )
}
