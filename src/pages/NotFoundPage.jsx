import { Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <NavBar />

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <AlertCircle className="mb-6 h-16 w-16 text-[#26231E]" strokeWidth={1.5} />
        <h1 className="mb-8 text-3xl font-bold text-[#26231E]">Page Not Found</h1>
        <Link
          to="/"
          className="rounded-full bg-[#26231E] px-8 py-3 text-base font-medium text-white transition-colors hover:bg-[#43403B]"
        >
          Go To Homepage
        </Link>
      </div>

      <Footer />
    </main>
  )
}
