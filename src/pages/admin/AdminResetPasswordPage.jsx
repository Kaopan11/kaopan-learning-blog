// AdminResetPasswordPage — เปลี่ยนรหัสผ่าน admin (UI + Dialog ยืนยัน)
import { useState } from 'react'

import { AdminFormField } from '@/components/admin/AdminFormField'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { Button } from '@/components/ui/button'

export default function AdminResetPasswordPage() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  // เปิด Dialog ยืนยันก่อน reset password
  const handleSubmit = (event) => {
    event.preventDefault()
    setIsDialogOpen(true)
  }

  const handleConfirmReset = () => {
    setForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  return (
    <>
      <AdminPageHeader title="Reset password" />

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-xl flex-col gap-5"
      >
        <AdminFormField
          id="admin-current-password"
          label="Current password"
          type="password"
          value={form.currentPassword}
          onChange={handleChange('currentPassword')}
        />
        <AdminFormField
          id="admin-new-password"
          label="New password"
          type="password"
          value={form.newPassword}
          onChange={handleChange('newPassword')}
        />
        <AdminFormField
          id="admin-confirm-password"
          label="Confirm new password"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange('confirmPassword')}
        />

        <Button
          type="submit"
          className="mt-2 w-full rounded-full bg-[#26231E] hover:bg-[#43403B] sm:w-44"
        >
          Reset password
        </Button>
      </form>

      <ConfirmDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Reset password"
        description="Do you want to reset your password?"
        confirmLabel="Reset"
        cancelLabel="Cancel"
        onConfirm={handleConfirmReset}
      />
    </>
  )
}
