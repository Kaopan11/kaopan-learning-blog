// จุดเริ่มต้นของแอป — mount React ลง DOM และห่อ providers ที่ใช้ทั้งโปรเจกต
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/contexts/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter เปิดใช้ client-side routing ทั้งแอป */}
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster position="bottom-right" />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
