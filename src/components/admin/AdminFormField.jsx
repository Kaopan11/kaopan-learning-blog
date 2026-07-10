// AdminFormField — label + input/textarea ร่วมกันสำหรับฟอร์ม admin
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export function AdminFormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 4,
  readOnly = false,
}) {
  const sharedClass = cn(
    'border-[#E5E5E0] bg-white text-[#26231E]',
    readOnly && 'cursor-not-allowed bg-[#F5F4F2] text-[#75716B]',
  )

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="font-normal text-[#26231E]">
        {label}
      </Label>
      {multiline ? (
        <Textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          readOnly={readOnly}
          className={cn(sharedClass, 'min-h-[120px] resize-y')}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={cn(sharedClass, 'h-11')}
        />
      )}
    </div>
  )
}
