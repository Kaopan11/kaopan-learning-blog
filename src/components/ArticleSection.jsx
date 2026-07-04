import { useEffect, useState } from 'react'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

import { BlogCard } from '@/components/BlogCard'
import { SearchField } from '@/components/SearchField'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatDate } from '@/lib/formatDate'

const API_URL = 'https://blog-post-project-api.vercel.app/posts'
const POSTS_PER_PAGE = 6
const categories = ['Highlight', 'Cat', 'Inspiration', 'General']

export default function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState('Highlight')
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [nextPage, setNextPage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // ดึงข้อมูลจาก API ทุกครั้งที่เปลี่ยนหมวดหมู่หรือหน้า
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)

      try {
        const params = {
          page,
          limit: POSTS_PER_PAGE,
        }

        // "Highlight" = ดึงทุกหมวด จึงไม่ส่ง category param
        if (selectedCategory !== 'Highlight') {
          params.category = selectedCategory
        }

        const { data } = await axios.get(API_URL, { params })

        setTotalPages(data.totalPages)
        setNextPage(data.nextPage ?? null)

        // หน้าแรก = แทนที่รายการทั้งหมด | หน้าถัดไป = ต่อท้ายรายการเดิม
        if (page === 1) {
          setPosts(data.posts)
        } else {
          setPosts((prevPosts) => [...prevPosts, ...data.posts])
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        if (page === 1) {
          setPosts([])
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [selectedCategory, page])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setPage(1)
    setPosts([])
  }

  const handleViewMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const showViewMore =
    !isLoading && page < totalPages && nextPage != null

  return (
    <section className="px-4 py-8 md:px-8 md:py-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-2xl font-bold text-[#26231E] md:mb-6 md:text-3xl">
          Latest articles
        </h2>

        {/* Desktop */}
        <div className="hidden items-center justify-between rounded-2xl bg-[#F4F4F3] px-6 py-4 md:flex">
          <div className="flex items-center gap-8">
            {categories.map((category) => {
              const isActive = category === selectedCategory

              return (
                <button
                  key={category}
                  type="button"
                  disabled={isActive}
                  onClick={() => handleCategoryChange(category)}
                  className={
                    isActive
                      ? 'cursor-pointer rounded-lg bg-[#D9D7D2] px-4 py-2 text-sm font-medium text-[#26231E]'
                      : 'cursor-pointer rounded-lg px-4 py-2 text-sm text-[#75716B] transition-colors hover:bg-white'
                  }
                >
                  {category}
                </button>
              )
            })}
          </div>

          <SearchField className="w-full max-w-xs lg:max-w-sm" />
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-4 rounded-2xl bg-[#F4F4F3] px-4 py-6 md:hidden">
          <SearchField className="w-full" />

          <div className="flex flex-col gap-2">
            <span className="text-sm text-[#75716B]">Category</span>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="h-10 w-full cursor-pointer border-[#E5E5E0] bg-white text-[#26231E]">
                <SelectValue placeholder="Highlight" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="cursor-pointer"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading && posts.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center gap-3 py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#26231E]" />
            <p className="text-[#75716B]">Loading...</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                image={post.image}
                category={post.category}
                title={post.title}
                description={post.description}
                author="Peerawat K."
                date={formatDate(post.date)}
              />
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col items-center">
          {isLoading && posts.length > 0 && (
            <div className="flex flex-col items-center gap-3 py-4">
              <Loader2 className="h-8 w-8 animate-spin text-[#26231E]" />
              <p className="text-[#75716B]">Loading...</p>
            </div>
          )}

          {showViewMore && (
            <button
              type="button"
              onClick={handleViewMore}
              className="cursor-pointer rounded-lg border border-[#26231E] bg-white px-12 py-3 text-base font-medium text-[#26231E] underline transition-colors hover:bg-[#EFEEEB]"
            >
              View more
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
