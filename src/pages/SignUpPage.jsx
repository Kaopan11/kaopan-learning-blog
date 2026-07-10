// SignUpPage — หน้าสมัครสมาชิก
// validate ฝั่ง client → เรียก registerUser() → แสดงหน้า success → redirect
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'

import { AuthFormField } from '@/components/AuthFormField'
import { AuthLayout } from '@/components/AuthLayout'
import { useAuth } from '@/contexts/AuthContext'
import { getAuthRedirectPath, registerUser, validateSignUpForm } from '@/lib/authApi'

export default function SignUpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const redirectPath = getAuthRedirectPath(location)

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  // สลับไปหน้า Registration success เมื่อ register สำเร็จ
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // ตรวจสอบ email/password ฝั่ง client ก่อนเรียก API
    const validationErrors = validateSignUpForm(form)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const user = await registerUser(form)
      login(user)
      setIsSuccess(true)
    } catch (error) {
      if (error.fieldErrors) {
        setErrors(error.fieldErrors)
        return
      }

      console.error('Registration failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // หน้าแสดงเมื่อสมัครสำเร็จ
  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E]">
            <Check className="h-8 w-8 text-white" strokeWidth={3} />
          </div>
          <h1 className="mb-8 text-3xl font-bold text-[#26231E]">
            Registration success
          </h1>
          <button
            type="button"
            onClick={() => navigate(redirectPath, { replace: true })}
            className="cursor-pointer rounded-full bg-[#26231E] px-10 py-3 text-base font-medium text-white transition-colors hover:bg-[#43403B]"
          >
            Continue
          </button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <h1 className="mb-8 text-center text-3xl font-bold text-[#26231E]">
        Sign up
      </h1>

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthFormField
          id="name"
          label="Name"
          value={form.name}
          onChange={handleChange('name')}
          placeholder="Full name"
        />
        <AuthFormField
          id="username"
          label="Username"
          value={form.username}
          onChange={handleChange('username')}
          placeholder="Username"
          error={errors.username}
        />
        <AuthFormField
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          placeholder="Email"
          error={errors.email}
        />
        <AuthFormField
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          placeholder="Password"
          error={errors.password}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 cursor-pointer rounded-full bg-[#26231E] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#43403B] disabled:opacity-60"
        >
          Sign up
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#75716B]">
        Already have an account?{' '}
        <Link
          to="/login"
          state={{ from: redirectPath }}
          className="font-semibold text-[#26231E] underline underline-offset-2"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}
