// AuthLayout — layout ร่วมของหน้า Login / Sign up (NavBar + การ์ดฟอร์มสีครีม)
import { NavBar } from '@/components/NavBar'

export function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="flex justify-center px-4 py-10 md:py-16">
        <div className="w-full max-w-xl rounded-2xl bg-[#EFEEEB] px-6 py-10 md:px-10">
          {children}
        </div>
      </div>
    </main>
  )
}
