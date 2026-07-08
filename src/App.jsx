import { Routes, Route } from 'react-router-dom'

import LandingPage from '@/pages/LandingPage'
import ViewPostPage from '@/pages/ViewPostPage'
import NotFoundPage from '@/pages/NotFoundPage'

function App() {
  return (
    // กำหนดเส้นทาง (routes) ของแอป — แต่ละ path แมปไปยังหน้าที่ต่างกัน
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/post/:postId" element={<ViewPostPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
