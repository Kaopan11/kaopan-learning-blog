// ConfirmDialog — Dialog ยืนยันการลบ/reset ที่ใช้ร่วมกันทั้ง Admin Panel
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm gap-0 rounded-2xl border-0 p-8 pt-10 shadow-lg sm:max-w-sm"
        overlayClassName="bg-black/50"
        showCloseButton
      >
        <div className="flex flex-col items-center text-center">
          <DialogTitle className="text-xl font-bold text-[#26231E]">
            {title}
          </DialogTitle>
          <DialogDescription className="mt-3 text-base text-[#75716B]">
            {description}
          </DialogDescription>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="min-w-28 rounded-full border-[#26231E] bg-white px-8 text-[#26231E] hover:bg-[#F5F4F2]"
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            className="min-w-28 rounded-full bg-[#26231E] px-8 text-white hover:bg-[#43403B]"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
