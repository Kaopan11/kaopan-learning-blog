// NavBar — แถบนำทางด้านบน แสดงต่างกันตามขนาดหน้าจอและสถานะ login
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, Menu, RotateCcw, UserRound } from 'lucide-react'

import { MobileAccountMenu } from '@/components/MobileAccountMenu'
import { MobileGuestMenu } from '@/components/MobileGuestMenu'
import { NotificationBell } from '@/components/NotificationBell'
import { UserAvatar } from '@/components/UserAvatar'
import { useAuth } from '@/contexts/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Logo แบรนด์ KP. (จุดสีเขียว #25C2A0)
function Logo() {
  return (
    <Link to="/" className="text-2xl font-semibold tracking-tight md:text-3xl md:font-bold">
      <span className="text-[#26231E]">KP</span>
      <span className="text-[#25C2A0]">.</span>
    </Link>
  )
}

// ปุ่ม Log in / Sign up สำหรับ desktop เมื่อยังไม่ login
function GuestActions({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Link
        to="/login"
        className="rounded-full border border-[#26231E] px-4 py-2 text-sm font-medium text-[#26231E] transition-colors hover:bg-[#EFEEEB] md:px-6 md:py-2.5 md:text-base"
      >
        Log in
      </Link>
      <Link
        to="/signup"
        className="rounded-full bg-[#26231E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#43403B] md:px-6 md:py-2.5 md:text-base"
      >
        Sign up
      </Link>
    </div>
  )
}

// เมนูผู้ใช้บน desktop — กระดิ่งแจ้งเตือน + dropdown (Profile, Reset password, Log out)
function UserMenu({ className = '' }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <div className={`flex items-center gap-3 md:gap-4 ${className}`}>
      <NotificationBell />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-[#EFEEEB] md:gap-3 md:pr-3"
          >
            <UserAvatar
              src={user?.avatarUrl}
              name={user?.name}
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <span className="max-w-[120px] truncate text-sm font-medium text-[#26231E] md:max-w-none md:text-base">
              {user?.name}
            </span>
            <ChevronDown className="h-4 w-4 text-[#75716B]" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-48">
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={() => navigate('/profile')}
          >
            <UserRound className="h-4 w-4" strokeWidth={1.5} />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={() => navigate('/profile/reset-password')}
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
            Reset password
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer gap-2 text-red-600"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// Navbar บน mobile — hamburger เปิดเมนู inline ใต้ header
function MobileNavBar() {
  const location = useLocation()
  const { isLoggedIn } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // ปิดเมนูอัตโนมัติเมื่อเปลี่ยนหน้า
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between border-b border-[#E5E5E0] bg-[#F9F8F6] px-4 py-4">
        <Logo />

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="cursor-pointer p-1 text-[#26231E]"
        >
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>

      {/* แสดงเมนูตามสถานะ login */}
      {isMenuOpen && !isLoggedIn && (
        <MobileGuestMenu onNavigate={() => setIsMenuOpen(false)} />
      )}

      {isMenuOpen && isLoggedIn && (
        <MobileAccountMenu onNavigate={() => setIsMenuOpen(false)} />
      )}
    </div>
  )
}

export function NavBar() {
  const { isLoggedIn } = useAuth()

  return (
    <nav>
      <MobileNavBar />

      {/* Desktop navbar */}
      <div className="hidden items-center justify-between px-4 py-6 md:flex md:px-8 lg:px-16">
        <Logo />
        {isLoggedIn ? <UserMenu /> : <GuestActions />}
      </div>
    </nav>
  )
}
