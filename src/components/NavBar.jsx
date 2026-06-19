export function NavBar() {
  return (
    <nav className="flex items-center justify-between px-4 py-6 md:px-8 lg:px-16">
      <span className="text-2xl font-bold text-[#26231E] md:text-3xl">KP.</span>

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
    </nav>
  )
}