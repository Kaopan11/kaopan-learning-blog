import { useState } from 'react'
import { Search } from 'lucide-react'

import { BlogCard } from '@/components/BlogCard'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { blogPosts } from '@/data/blogPosts'

const categories = ['Highlight', 'Cat', 'Inspiration', 'General']

function SearchField({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Input
        type="search"
        placeholder="Search"
        readOnly
        className="h-10 border-[#E5E5E0] bg-white pr-10 text-[#26231E] placeholder:text-[#75716B]"
      />
      <Search
        className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#75716B]"
        strokeWidth={1.5}
      />
    </div>
  )
}

export default function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState('Highlight')

  const filteredPosts =
    selectedCategory === 'Highlight'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory)

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
                  onClick={() => setSelectedCategory(category)}
                  className={
                    isActive
                      ? 'rounded-lg bg-[#D9D7D2] px-4 py-2 text-sm font-medium text-[#26231E]'
                      : 'rounded-lg px-4 py-2 text-sm text-[#75716B] transition-colors hover:bg-white'
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
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="h-10 w-full border-[#E5E5E0] bg-white text-[#26231E]">
                <SelectValue placeholder="Highlight" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              image={post.image}
              imagePosition={post.imagePosition}
              category={post.category}
              title={post.title}
              description={post.description}
              author={post.author}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
