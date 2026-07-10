// ProtectedRoute — ป้องกันหน้าที่ต้อง login ก่อนเข้า (เช่น /profile)
// ถ้ายังไม่ login จะ redirect ไป /login
import { Navigate } from 'react-router-dom'

import { useAuth } from '@/contexts/AuthContext'

export function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}
