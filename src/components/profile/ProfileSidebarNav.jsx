// ProfileSidebarNav — sidebar นำทางหน้า Profile / Reset password (desktop)
import { NavLink } from 'react-router-dom'
import { LogOut, RotateCcw, UserRound } from 'lucide-react'

import { UserAvatar } from '@/components/UserAvatar'
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

function NavItem({ to, label, icon: Icon, end, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
          isActive
            ? 'font-semibold text-[#26231E]'
            : 'font-medium text-[#75716B] hover:text-[#26231E]',
        )
      }
    >
      {({ isActive }) => (
        <>
          {/* แถบ indicator ซ้ายเมื่อเมนู active */}
          <span
            className={cn(
              'h-5 w-0.5 rounded-full bg-[#26231E] transition-opacity',
              isActive ? 'opacity-100' : 'opacity-0',
            )}
          />
          <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          {label}
        </>
      )}
    </NavLink>
  )
}

export function ProfileSidebarNav({ onNavigate, showLogout = false }) {
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 px-1">
        <UserAvatar
          src={user?.avatarUrl}
          name={user?.name}
          className="h-12 w-12"
          size="lg"
        />
        <span className="truncate text-base font-semibold text-[#26231E]">
          {user?.name}
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} onNavigate={onNavigate} />
        ))}

        {showLogout && (
          <button
            type="button"
            onClick={() => {
              onNavigate?.()
              logout()
            }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#75716B] transition-colors hover:bg-[#F5F4F2] hover:text-[#26231E]"
          >
            <span className="h-5 w-0.5" />
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            Log out
          </button>
        )}
      </nav>
    </div>
  )
}
