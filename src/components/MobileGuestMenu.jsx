// MobileGuestMenu — เมนู mobile สำหรับผู้ที่ยังไม่ login
// แสดงเต็มความกว้างใต้ navbar เมื่อกด hamburger
import { Link } from 'react-router-dom'

export function MobileGuestMenu({ onNavigate }) {
  const handleNavigate = () => {
    onNavigate?.()
  }

  return (
    <div className="border-b border-[#E5E5E0] bg-white px-4 pb-2 md:hidden">
      <Link
        to="/login"
        onClick={handleNavigate}
        className="block py-4 text-left text-base font-medium text-[#26231E]"
      >
        Log in
      </Link>
      <Link
        to="/signup"
        onClick={handleNavigate}
        className="block py-4 text-left text-base font-medium text-[#26231E]"
      >
        Sign up
      </Link>
    </div>
  )
}
