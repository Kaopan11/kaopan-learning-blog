import axios from 'axios'

export const AUTH_API_URL =
  'https://blog-post-project-api-with-db.vercel.app/auth'

const MOCK_USERS_KEY = 'kp_blog_mock_users'
const SESSION_KEY = 'kp_blog_auth_session'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ตรวจสอบรูปแบบ email และความยาว password ก่อนส่งไป API
export function validateSignUpForm({ email, password }) {
  const errors = {}

  if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Email must be a valid email'
  }

  if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return errors
}

// กำหนด path ที่จะ redirect หลัง login/signup สำเร็จ (landing หรือ article page)
export function getAuthRedirectPath(location) {
  const from = location.state?.from

  if (from === '/' || (typeof from === 'string' && from.startsWith('/post/'))) {
    return from
  }

  return '/'
}

export function getStoredSession() {
  try {
    const session = localStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session) : null
  } catch {
    return null
  }
}

export function saveSession(user) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      name: user.name,
      username: user.username,
      email: user.email,
      accessToken: user.accessToken ?? null,
    }),
  )
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

function getMockUsers() {
  try {
    return JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveMockUsers(users) {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
}

function findMockUser({ email, password }) {
  return getMockUsers().find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password,
  )
}

function findMockFieldError(form, users) {
  if (users.some((user) => user.email.toLowerCase() === form.email.toLowerCase())) {
    return { email: 'Email is already taken, Please try another email.' }
  }

  if (users.some((user) => user.username === form.username)) {
    return { username: 'This username is already taken' }
  }

  return null
}

function registerMockUser(form) {
  const users = getMockUsers()
  const fieldError = findMockFieldError(form, users)

  if (fieldError) {
    const error = new Error('Mock registration validation failed')
    error.fieldErrors = fieldError
    throw error
  }

  users.push(form)
  saveMockUsers(users)
}

function parseRegisterApiError(error) {
  const apiMessage =
    error.response?.data?.error ?? error.response?.data?.message ?? ''
  const normalizedMessage = apiMessage.toLowerCase()

  if (normalizedMessage.includes('email')) {
    return { email: 'Email is already taken, Please try another email.' }
  }

  if (normalizedMessage.includes('username')) {
    return { username: 'This username is already taken' }
  }

  return null
}

function toSessionUser({ name, username, email, accessToken }) {
  return {
    name: name || username || email,
    username: username || email.split('@')[0],
    email,
    accessToken: accessToken ?? null,
  }
}

async function fetchUserProfile(accessToken, fallbackEmail) {
  try {
    const { data } = await axios.get(`${AUTH_API_URL}/get-user`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    return toSessionUser({
      name: data.name,
      username: data.username,
      email: data.email ?? fallbackEmail,
      accessToken,
    })
  } catch {
    return toSessionUser({ email: fallbackEmail, accessToken })
  }
}

// เรียก API register จริง — ถ้า server error ใช้ localStorage เป็น fallback สำหรับ demo
export async function registerUser(form) {
  try {
    const { data } = await axios.post(`${AUTH_API_URL}/register`, form)

    return toSessionUser({
      name: data.user?.name ?? form.name,
      username: data.user?.username ?? form.username,
      email: form.email,
    })
  } catch (error) {
    const fieldErrors = parseRegisterApiError(error)
    const status = error.response?.status
    const isServerDown = !error.response || status >= 500

    if (fieldErrors) {
      const validationError = new Error('Registration validation failed')
      validationError.fieldErrors = fieldErrors
      throw validationError
    }

    if (isServerDown) {
      registerMockUser(form)
      return toSessionUser(form)
    }

    throw error
  }
}

// เรียก API login จริง — ถ้า API ไม่รู้จัก user ให้ลอง localStorage fallback (user ที่ sign up ตอน API down)
export async function loginUser(form) {
  try {
    const { data } = await axios.post(`${AUTH_API_URL}/login`, form)

    return fetchUserProfile(data.access_token, form.email)
  } catch (error) {
    const matchedUser = findMockUser(form)

    if (matchedUser) {
      return toSessionUser(matchedUser)
    }

    throw error
  }
}
