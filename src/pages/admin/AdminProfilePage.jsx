// AdminProfilePage — แก้ไขโปรไฟล์ admin + อัปโหลดรูป
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import { AdminFormField } from '@/components/admin/AdminFormField'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { UserAvatar } from '@/components/UserAvatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminProfilePage() {
  const { user, updateUser } = useAuth()
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    name: user?.name ?? 'Thompson P.',
    username: user?.username ?? 'thompson-p',
    email: user?.email ?? 'admin.thompson@gmail.com',
  })
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl ?? null)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleAvatarSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setAvatarPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
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
    <>
      <AdminPageHeader title="Profile">
        <Button
          type="button"
          className="rounded-full bg-[#26231E] hover:bg-[#43403B]"
          onClick={handleSave}
        >
          Save
        </Button>
      </AdminPageHeader>

      <div className="mx-auto flex max-w-xl flex-col gap-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
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
            className="rounded-full border-[#26231E]"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload profile picture
          </Button>
        </div>

        <AdminFormField
          id="admin-name"
          label="Name"
          value={form.name}
          onChange={handleChange('name')}
        />
        <AdminFormField
          id="admin-username"
          label="Username"
          value={form.username}
          onChange={handleChange('username')}
        />
        <AdminFormField
          id="admin-email"
          label="Email"
          value={form.email}
          onChange={handleChange('email')}
          readOnly
        />
      </div>
    </>
  )
}
