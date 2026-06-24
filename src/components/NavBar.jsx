import { Menu } from 'lucide-react'

export function NavBar() {
  return (
    <nav>
      {/* Mobile */}
      <div className="flex items-center justify-between bg-[#F7F7F7] px-6 py-4 md:hidden">
        <span className="text-2xl font-semibold tracking-tight">
          <span className="text-[#444444]">KP</span>
          <span className="text-[#25C2A0]">.</span>
        </span>
        <button
          type="button"
          aria-label="Open menu"
          className="text-[#444444] transition-opacity hover:opacity-70"
        >
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>
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
