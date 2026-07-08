import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Copy,
  Facebook,
  Linkedin,
  Loader2,
  SmilePlus,
  Twitter,
} from 'lucide-react'

import heroImg from '@/assets/hero-dog.jpg'
import { LoginPromptDialog } from '@/components/LoginPromptDialog'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import NotFoundPage from '@/pages/NotFoundPage'
import { formatDate } from '@/lib/formatDate'
import { parsePostContent } from '@/lib/parsePostContent'

const API_URL = 'https://blog-post-project-api.vercel.app/posts'

// สมมติว่าผู้ใช้ยังไม่ได้ล็อกอิน (ใช้ทดสอบการจำกัด Like / Comment)
const isLoggedIn = false

const AUTHOR_BIO =
  'I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.\n\nWhen I\'m not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.'

export default function ViewPostPage() {
  // ดึง postId จาก URL เช่น /post/1 → postId = "1"
  const { postId } = useParams()

  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [comment, setComment] = useState('')
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true)
      setNotFound(false)

      try {
        const { data } = await axios.get(`${API_URL}/${postId}`)
        setPost(data)
      } catch (error) {
        if (error.response?.status === 404) {
          setNotFound(true)
        } else {
          console.error('Failed to fetch post:', error)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  // ตรวจสอบสิทธิ์ก่อนทำ action ที่ต้องล็อกอิน (Like / Send Comment)
  const handleRestrictedAction = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true)
      return
    }
  }

  const handleSendComment = () => {
    // ยังไม่ล็อกอิน → หยุดส่ง comment และแสดง login dialog
    if (!isLoggedIn) {
      setShowLoginDialog(true)
      return
    }
    setComment('')
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col bg-white">
        <NavBar />
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-24">
          <Loader2 className="h-8 w-8 animate-spin text-[#26231E]" />
          <p className="text-[#75716B]">Loading...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (notFound || !post) {
    return <NotFoundPage />
  }

  const sections = parsePostContent(post.content)

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <article className="px-4 py-8 md:px-8 md:py-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <img
            src={post.image}
            alt={post.title}
            className="mb-8 h-[240px] w-full rounded-2xl object-cover sm:h-[360px] md:h-[460px]"
          />

          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-3 text-sm text-[#75716B]">
                <span className="rounded-full bg-green-200 px-3 py-1 text-sm font-semibold text-green-600">
                  {post.category}
                </span>
                <span>{formatDate(post.date)}</span>
              </div>

              <h1 className="mb-4 text-3xl font-bold text-[#26231E] md:text-4xl">
                {post.title}
              </h1>

              <p className="mb-8 text-base leading-relaxed text-[#43403B] md:text-lg">
                {post.description}
              </p>

              <div className="flex flex-col gap-8">
                {sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="mb-3 text-xl font-bold text-[#26231E]">
                      {section.title}
                    </h2>
                    <p className="leading-relaxed text-[#43403B]">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            </div>

            <aside className="lg:w-72 lg:shrink-0">
              <div className="rounded-2xl bg-[#F4F4F3] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={heroImg}
                    alt={post.author}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-[#75716B]">Author</p>
                    <p className="font-semibold text-[#26231E]">{"Peerawat K."}</p>
                  </div>
                </div>
                <p className="whitespace-pre-line text-sm leading-relaxed text-[#43403B]">
                  {AUTHOR_BIO}
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-10 flex flex-col gap-6 rounded-2xl bg-[#F4F4F3] px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
            <button
              type="button"
              onClick={handleRestrictedAction}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-[#26231E] bg-white px-4 py-2 text-sm font-medium text-[#26231E] transition-colors hover:bg-[#EFEEEB]"
            >
              <SmilePlus className="h-5 w-5" />
              {post.likes}
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-full border border-[#26231E] bg-white px-4 py-2 text-sm font-medium text-[#26231E]"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button>
              <button
                type="button"
                aria-label="Share on Facebook"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#26231E] bg-white text-[#26231E]"
              >
                <Facebook className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Share on LinkedIn"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#26231E] bg-white text-[#26231E]"
              >
                <Linkedin className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Share on Twitter"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#26231E] bg-white text-[#26231E]"
              >
                <Twitter className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-bold text-[#26231E]">Comment</h2>
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="What are your thoughts?"
              className="mb-4 min-h-[160px] w-full resize-none rounded-xl border border-[#E5E5E0] bg-white px-4 py-3 text-[#26231E] placeholder:text-[#75716B] outline-none focus:border-[#26231E]"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSendComment}
                className="cursor-pointer rounded-full bg-[#26231E] px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#43403B]"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </article>

      <Footer />

      <LoginPromptDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
      />
    </main>
  )
}
