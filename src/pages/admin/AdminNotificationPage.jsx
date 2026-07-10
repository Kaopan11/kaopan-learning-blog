// AdminNotificationPage — รายการแจ้งเตือน mock พร้อมปุ่ม View
import { useNavigate } from 'react-router-dom'

import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { Button } from '@/components/ui/button'
import { adminNotifications } from '@/data/adminNotifications'

export default function AdminNotificationPage() {
  const navigate = useNavigate()

  return (
    <>
      <AdminPageHeader title="Notification" />

      <div className="flex flex-col gap-0 overflow-hidden rounded-xl border border-[#E5E5E0]">
        {adminNotifications.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
              index < adminNotifications.length - 1 ? 'border-b border-[#E5E5E0]' : ''
            }`}
          >
            <div>
              <p className="text-sm font-medium text-[#26231E]">{item.message}</p>
              <p className="mt-1 text-xs text-[#75716B]">{item.time}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="shrink-0 rounded-full border-[#26231E] px-5"
              onClick={() => navigate(item.link)}
            >
              View
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}
