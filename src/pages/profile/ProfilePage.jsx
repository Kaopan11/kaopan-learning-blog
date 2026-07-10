// ProfilePage — หน้าแก้ไขโปรไฟล์ (/profile)
// อัปโหลดรูป, แก้ name/username, บันทึกลง AuthContext + localStorage
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import { ProfileFormField } from '@/components/profile/ProfileFormField'
import { ProfilePageShell } from '@/components/profile/ProfilePageShell'
import { UserAvatar } from '@/components/UserAvatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    name: user?.name ?? '',
    username: user?.username ?? '',
    email: user?.email ?? '',
  })
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl ?? null)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleAvatarSelect = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    // อ่านไฟล์รูปเป็น data URL — ถ้าไม่มีรูปจะใช้ placeholder สีเทาแทน
    reader.onload = () => {
      setAvatarPreview(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const handleSave = (event) => {
    event.preventDefault()

    updateUser({
      name: form.name,
      username: form.username,
      email: form.email,
      avatarUrl: avatarPreview,
    })

    toast.success('Saved profile', {
      description: 'Your profile has been successfully updated',
    })
  }

  return (
    <ProfilePageShell title="Profile">
      <form onSubmit={handleSave} className="mx-auto flex w-full max-w-xl flex-col gap-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <UserAvatar
            src={avatarPreview}
            name={form.name}
            className="h-28 w-28"
            size="lg"
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarSelect}
          />

          <Button
            type="button"
            variant="outline"
            className="rounded-full border-[#26231E] px-5 text-[#26231E] hover:bg-white"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload profile picture
          </Button>
        </div>

        <div className="flex flex-col gap-5">
          <ProfileFormField
            id="profile-name"
            label="Name"
            value={form.name}
            onChange={handleChange('name')}
          />
          <ProfileFormField
            id="profile-username"
            label="Username"
            value={form.username}
            onChange={handleChange('username')}
          />
          <ProfileFormField
            id="profile-email"
            label="Email"
            value={form.email}
            onChange={handleChange('email')}
            readOnly
          />
        </div>

        <Button
          type="submit"
          className="h-11 w-full rounded-full bg-[#26231E] text-base font-medium text-white hover:bg-[#43403B] sm:w-28"
        >
          Save
        </Button>
      </form>
    </ProfilePageShell>
  )
}
