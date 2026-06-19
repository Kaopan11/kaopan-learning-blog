import { Linkedin, Github } from 'lucide-react'

export function Footer() {
  const circleIconClass =
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#403F3D] text-white transition-opacity hover:opacity-80'

  return (
    <footer className="w-full bg-[#F2F2F2] px-4 py-8 md:px-8 md:py-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-[#26231E] md:text-base">
            Get in touch
          </span>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="LinkedIn" className={circleIconClass}>
              <Linkedin className="h-4 w-4 fill-current" strokeWidth={0} />
            </a>
            <a href="#" aria-label="GitHub" className={circleIconClass}>
              <Github className="h-5 w-5 fill-current" strokeWidth={0} />
            </a>
            <a href="#" aria-label="Google" className={circleIconClass}>
              <span className="text-sm font-bold leading-none">G</span>
            </a>
          </div>
        </div>

        <a
          href="#"
          className="text-sm font-medium text-[#26231E] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70 md:text-base"
        >
          Home page
        </a>
      </div>
    </footer>
  )
}
