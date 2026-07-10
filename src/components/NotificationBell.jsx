// NotificationBell — กระดิ่งแจ้งเตือน (desktop) แสดงรายการกิจกรรมจาก mock data
import { Bell } from 'lucide-react'

import { UserAvatar } from '@/components/UserAvatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { notifications } from '@/data/notifications'

export function NotificationBell({ className = '' }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Notifications"
          className={`relative cursor-pointer rounded-full p-1 text-[#26231E] transition-colors hover:bg-[#EFEEEB] ${className}`}
        >
          <Bell className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
          <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 border-b border-[#EFEEEB] px-4 py-3 last:border-b-0"
            >
              <UserAvatar
                src={item.avatarUrl}
                name={item.name}
                className="h-10 w-10"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug text-[#26231E]">
                  <span className="font-semibold">{item.name}</span>{' '}
                  {item.message}
                </p>
                <p className="mt-1 text-xs text-[#75716B]">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
