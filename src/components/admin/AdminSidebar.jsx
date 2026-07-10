// AdminSidebar — เมนูนำทางด้านซ้ายของ Admin Panel
import { NavLink, Link } from 'react-router-dom'
import {
  Bell,
  ExternalLink,
  Folder,
  LogOut,
  Notebook,
  RotateCcw,
  UserRound,
} from 'lucide-react'

import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

const navItems = [
  {
    to: '/admin/articles',
    label: 'Article management',
    icon: Notebook,
    end: false,
  },
  {
    to: '/admin/categories',
    label: 'Category management',
    icon: Folder,
    end: false,
  },
  { to: '/admin/profile', label: 'Profile', icon: UserRound, end: true },
  { to: '/admin/notifications', label: 'Notification', icon: Bell, end: true },
  {
    to: '/admin/reset-password',
    label: 'Reset password',
    icon: RotateCcw,
    end: true,
  },
]

function SidebarLink({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 border-l-4 py-3 pr-5 pl-[calc(1.25rem-4px)] text-sm transition-colors',
          isActive
            ? 'border-[#26231E] bg-[#E8E7E4] font-semibold text-[#26231E]'
            : 'border-transparent font-medium text-[#75716B] hover:bg-[#E8E7E4]/50 hover:text-[#26231E]',
        )
      }
    >
      <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} />
      {label}
    </NavLink>
  )
}

function BottomLink({ to, label, icon: Icon, onClick }) {
  const className =
    'flex w-full items-center gap-3 border-l-4 border-transparent py-3 pr-5 pl-[calc(1.25rem-4px)] text-left text-sm font-medium text-[#75716B] transition-colors hover:bg-[#E8E7E4]/50 hover:text-[#26231E]'

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} />
        {label}
      </button>
    )
  }

  return (
    <Link to={to} className={className}>
      <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} />
      {label}
    </Link>
  )
}

export function AdminSidebar() {
  const { logout } = useAuth()

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-[#E5E5E0] bg-[#F2F1EF]">
      <div className="px-5 pt-8 pb-5">
        <Link to="/" className="text-[30px] font-bold leading-none tracking-tight">
          <span className="text-[#26231E]">KP</span>
          <span className="text-[#25C2A0]">.</span>
        </Link>
        <p className="mt-2 text-sm font-medium text-[#E8A598]">Admin panel</p>
      </div>

      <nav className="flex flex-1 flex-col">
        {navItems.map((item) => (
          <SidebarLink key={item.to} {...item} />
        ))}
      </nav>

      <div className="mt-auto border-t border-[#E5E5E0] pb-2">
        <BottomLink to="/" label="KP. website" icon={ExternalLink} />
        <BottomLink label="Log out" icon={LogOut} onClick={logout} />
      </div>
    </aside>
  )
}
