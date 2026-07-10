// SearchField — ช่องค้นหาบทความแบบ live search (debounce 300ms)
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

const API_URL = 'https://blog-post-project-api.vercel.app/posts'

export function SearchField({ className = '' }) {
  const [keyword, setKeyword] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  const containerRef = useRef(null)

  // ดึงบทความที่ตรงกับ keyword จาก API ทุกครั้งที่ผู้ใช้พิมพ์ (debounce 300ms)
  useEffect(() => {
    const trimmedKeyword = keyword.trim()

    if (!trimmedKeyword) {
      setSearchResults([])
      return
    }

    const timeoutId = setTimeout(async () => {
      try {
        const { data } = await axios.get(API_URL, {
          params: { keyword: trimmedKeyword },
        })
        setSearchResults(data.posts)
      } catch (error) {
        console.error('Search failed:', error)
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [keyword])

  // ปิด dropdown เมื่อคลิกนอกพื้นที่ค้นหา
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const showDropdown =
    isFocused && keyword.trim().length > 0 && searchResults.length > 0

  const handleResultClick = () => {
    setIsFocused(false)
    setKeyword('')
    setSearchResults([])
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Input
        type="search"
        placeholder="Search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        onFocus={() => setIsFocused(true)}
        className="h-10 border-[#E5E5E0] bg-white pr-10 text-[#26231E] placeholder:text-[#75716B]"
      />
      <Search
        className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#75716B]"
        strokeWidth={1.5}
      />

      {/* แสดง dropdown รายการผลค้นหาใต้ช่อง input เมื่อมี keyword และโฟกัสอยู่ */}
      {showDropdown && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full min-w-[280px] rounded-2xl border border-[#E5E5E0] bg-white p-2 shadow-lg">
          <ul className="flex flex-col">
            {searchResults.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/post/${post.id}`}
                  onClick={handleResultClick}
                  className="block rounded-xl px-4 py-3 text-sm leading-snug text-[#26231E] transition-colors hover:bg-[#EFEDE8]"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
