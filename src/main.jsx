import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter เปิดใช้ client-side routing ทั้งแอป */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
