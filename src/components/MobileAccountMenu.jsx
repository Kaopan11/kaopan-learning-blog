// MobileAccountMenu — เมนู mobile สำหรับผู้ที่ login แล้ว
// แสดง avatar, ชื่อ, กระดิ่ง, ลิงก์ Profile/Reset password, Log out
import { NavLink } from 'react-router-dom'
import { LogOut, RotateCcw, UserRound } from 'lucide-react'

import { NotificationBell } from '@/components/NotificationBell'
import { UserAvatar } from '@/components/UserAvatar'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/profile', label: 'Profile', icon: UserRound, end: true },
  {
    to: '/profile/reset-password',
    label: 'Reset password',
    icon: RotateCcw,
    end: false,
  },
]

export function MobileAccountMenu({ onNavigate }) {
  const { user, logout } = useAuth()

  const handleNavigate = () => {
    onNavigate?.()
  }

  return (
    <div className="border-b border-[#E5E5E0] bg-white px-4 pb-4 md:hidden">
      {/* แถวข้อมูลผู้ใช้ */}
      <div className="mb-2 flex items-center gap-3 pt-2">
        <UserAvatar
          src={user?.avatarUrl}
          name={user?.name}
          className="h-12 w-12"
          size="lg"
        />
        <span className="truncate text-lg font-semibold text-[#26231E]">
          {user?.name}
        </span>
        <NotificationBell className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#EFEEEB] p-0 hover:bg-[#E5E5E0]" />
      </div>

      <nav className="flex flex-col">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={handleNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-4 py-4 text-base text-[#26231E]',
                isActive ? 'font-semibold' : 'font-medium',
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Separator className="bg-[#E5E5E0]" />

      <button
        type="button"
        onClick={() => {
          handleNavigate()
          logout()
        }}
        className="flex w-full items-center gap-4 py-4 text-left text-base font-medium text-[#26231E]"
      >
        <LogOut className="h-5 w-5 shrink-0" strokeWidth={1.5} />
        Log out
      </button>
    </div>
  )
}
