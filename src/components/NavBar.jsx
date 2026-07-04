import { Link } from 'react-router-dom'
import { Bell, ChevronDown, Menu } from 'lucide-react'

import heroImg from '@/assets/hero-dog.jpg'
import { useAuth } from '@/contexts/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function Logo() {
  return (
    <Link to="/" className="text-2xl font-semibold tracking-tight md:text-3xl md:font-bold">
      <span className="text-[#26231E]">KP</span>
      <span className="text-[#25C2A0]">.</span>
    </Link>
  )
}

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

function UserMenu({ className = '' }) {
  const { user, logout } = useAuth()

  return (
    <div className={`flex items-center gap-3 md:gap-4 ${className}`}>
      <button
        type="button"
        aria-label="Notifications"
        className="relative cursor-pointer p-1 text-[#26231E]"
      >
        <Bell className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
        <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-red-500" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-[#EFEEEB] md:gap-3 md:pr-3"
          >
            <img
              src={heroImg}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover md:h-10 md:w-10"
            />
            <span className="max-w-[120px] truncate text-sm font-medium text-[#26231E] md:max-w-none md:text-base">
              {user.name}
            </span>
            <ChevronDown className="h-4 w-4 text-[#75716B]" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuItem asChild>
            <Link to="/">Home page</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-red-600"
            onClick={logout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function NavBar() {
  const { isLoggedIn } = useAuth()

  return (
    <nav>
      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between border-b border-[#E5E5E0] bg-white px-4 py-4">
          <Logo />

          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="cursor-pointer p-1 text-[#26231E]"
                >
                  <Menu className="h-6 w-6" strokeWidth={1.5} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="bottom"
                align="end"
                className="min-w-40"
              >
                <DropdownMenuItem asChild>
                  <Link to="/login">Log in</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/signup">Sign up</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden items-center justify-between px-4 py-6 md:flex md:px-8 lg:px-16">
        <Logo />
        {isLoggedIn ? <UserMenu /> : <GuestActions />}
      </div>
    </nav>
  )
}
