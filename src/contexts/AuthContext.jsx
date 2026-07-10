// AuthContext — จัดการสถานะ login ทั้งแอป (user, login, logout, updateUser)
// ข้อมูล session เก็บใน localStorage ผ่านฟังก์ชันใน authApi.js
import { createContext, useContext, useState } from 'react'

import { clearSession, getStoredSession, saveSession } from '@/lib/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // โหลด session จาก localStorage ตอนเปิดแอป (refresh แล้วยัง login อยู่)
  const [user, setUser] = useState(() => getStoredSession())

  const login = (userData) => {
    saveSession(userData)
    setUser(userData)
  }

  const logout = () => {
    clearSession()
    setUser(null)
  }

  // อัปเดตข้อมูลโปรไฟล์ (เช่น name, avatar) แล้วบันทึกลง localStorage
  const updateUser = (updates) => {
    setUser((current) => {
      const nextUser = { ...current, ...updates }
      saveSession(nextUser)
      return nextUser
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook สำหรับดึงสถานะ auth จาก component ใดก็ได้ภายใต้ AuthProvider
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
