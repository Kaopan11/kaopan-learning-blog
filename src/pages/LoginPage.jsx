// LoginPage — หน้าเข้าสู่ระบบ
// เรียก loginUser() → บันทึก session → redirect กลับหน้าเดิม (ถ้ามี)
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { AuthFormField } from '@/components/AuthFormField'
import { AuthLayout } from '@/components/AuthLayout'
import { useAuth } from '@/contexts/AuthContext'
import { getAuthRedirectPath, loginUser } from '@/lib/authApi'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const redirectPath = getAuthRedirectPath(location)

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [hasAuthError, setHasAuthError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    setHasAuthError(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setHasAuthError(false)

    try {
      const user = await loginUser(form)
      login(user)
      navigate(redirectPath, { replace: true })
    } catch (error) {
      // login ล้มเหลว → แสดง toast สีแดงมุมขวาล่าง + input แดงตาม design
      setHasAuthError(true)
      toast.error("Your password is incorrect or this email doesn't exist", {
        description: 'Please try another password or email',
      })
      console.error('Login failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <h1 className="mb-8 text-center text-3xl font-bold text-[#26231E]">
        Log in
      </h1>

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthFormField
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          placeholder="Email"
          invalid={hasAuthError}
        />
        <AuthFormField
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          placeholder="Password"
          invalid={hasAuthError}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 cursor-pointer rounded-full bg-[#26231E] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#43403B] disabled:opacity-60"
        >
          Log in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#75716B]">
        Don&apos;t have any account?{' '}
        <Link
          to="/signup"
          state={{ from: redirectPath }}
          className="font-semibold text-[#26231E] underline underline-offset-2"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}
