// ProfileFormField — ช่องกรอกฟอร์มในหน้า Profile / Reset password
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function ProfileFormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  readOnly = false,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="font-normal text-[#75716B]">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={cn(
          'h-11 border-[#E5E5E0] bg-white text-[#26231E]',
          readOnly && 'cursor-not-allowed bg-[#F5F4F2] text-[#75716B]',
        )}
      />
    </div>
  )
}
