// ResetPasswordPage — หน้าเปลี่ยนรหัสผ่าน (/profile/reset-password)
// หมายเหตุ: ตอนนี้เป็น UI เท่านั้น ยังไม่ได้เชื่อม API เปลี่ยนรหัสผ่านจริง
import { useState } from 'react'

import { ProfileFormField } from '@/components/profile/ProfileFormField'
import { ProfilePageShell } from '@/components/profile/ProfilePageShell'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function ResetPasswordPage() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  // เปิด Dialog ยืนยันก่อน reset (ยังไม่มี logic เปลี่ยนรหัสผ่านจริง)
  const handleSubmit = (event) => {
    event.preventDefault()
    setIsDialogOpen(true)
  }

  const handleConfirmReset = () => {
    setIsDialogOpen(false)
    setForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  return (
    <>
      <ProfilePageShell title="Reset password">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-xl flex-col gap-8"
        >
          <div className="flex flex-col gap-5">
            <ProfileFormField
              id="current-password"
              label="Current password"
              type="password"
              value={form.currentPassword}
              onChange={handleChange('currentPassword')}
            />
            <ProfileFormField
              id="new-password"
              label="New password"
              type="password"
              value={form.newPassword}
              onChange={handleChange('newPassword')}
            />
            <ProfileFormField
              id="confirm-password"
              label="Confirm new password"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
            />
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-full bg-[#26231E] text-base font-medium text-white hover:bg-[#43403B] sm:w-44"
          >
            Reset password
          </Button>
        </form>
      </ProfilePageShell>

      {/* Dialog ยืนยันก่อน reset */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-black/50"
          className="max-w-md gap-6 rounded-2xl px-8 py-8 sm:max-w-md"
        >
          <button
            type="button"
            onClick={() => setIsDialogOpen(false)}
            aria-label="Close dialog"
            className="absolute top-5 right-5 cursor-pointer text-[#75716B] transition-opacity hover:opacity-70"
          >
            ✕
          </button>

          <DialogHeader className="items-center gap-3 text-center">
            <DialogTitle className="text-xl font-bold text-[#26231E]">
              Reset password
            </DialogTitle>
            <DialogDescription className="text-base text-[#75716B]">
              Do you want to reset your password?
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-11 min-w-28 rounded-full border-[#26231E] bg-white px-8 text-base font-medium text-[#26231E] hover:bg-white"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="h-11 min-w-28 rounded-full bg-[#26231E] px-8 text-base font-medium text-white hover:bg-[#43403B]"
              onClick={handleConfirmReset}
            >
              Reset
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
