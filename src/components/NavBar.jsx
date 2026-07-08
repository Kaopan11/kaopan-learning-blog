import { Menu } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function NavBar() {
  return (
    <nav>
      {/* Mobile */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="flex w-full items-center justify-between border-b border-[#E5E5E0] bg-white px-4 py-4 text-left"
            >
              <span className="text-2xl font-semibold tracking-tight">
                <span className="text-[#26231E]">KP</span>
                <span className="text-[#25C2A0]">.</span>
              </span>
              <Menu className="h-6 w-6 text-[#26231E]" strokeWidth={1.5} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="bottom"
            align="start"
            sideOffset={0}
            avoidCollisions={false}
            className="z-50 w-(--radix-dropdown-menu-trigger-width) min-w-(--radix-dropdown-menu-trigger-width) max-w-none rounded-none border-0 bg-white px-4 py-4 shadow-[0_8px_16px_rgba(0,0,0,0.06)] ring-0 data-[side=bottom]:slide-in-from-top-0 data-open:zoom-in-100 data-closed:zoom-out-100"
          >
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="w-full rounded-full border border-[#26231E] bg-white px-6 py-3.5 text-base font-medium text-[#26231E] transition-colors hover:bg-[#EFEEEB]"
              >
                Log in
              </button>
              <button
                type="button"
                className="w-full rounded-full bg-[#26231E] px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-[#43403B]"
              >
                Sign up
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop */}
      <div className="hidden items-center justify-between px-4 py-6 md:flex md:px-8 lg:px-16">
        <span className="text-2xl font-bold tracking-tight md:text-3xl">
          <span className="text-[#26231E]">KP</span>
          <span className="text-[#25C2A0]">.</span>
        </span>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            className="rounded-full border border-[#26231E] px-4 py-2 text-sm font-medium text-[#26231E] transition-colors hover:bg-[#EFEEEB] md:px-6 md:py-2.5 md:text-base"
          >
            Log in
          </button>
          <button
            type="button"
            className="rounded-full bg-[#26231E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#43403B] md:px-6 md:py-2.5 md:text-base"
          >
            Sign up
          </button>
        </div>
      </div>
    </nav>
  )
}
