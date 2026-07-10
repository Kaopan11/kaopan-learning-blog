import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function AuthFormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  invalid = false,
}) {
  const isInvalid = Boolean(error || invalid)

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-[#75716B]">
        {label}
      </label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={isInvalid}
        className={cn(
          'h-11 border-[#E5E5E0] bg-white text-[#26231E] placeholder:text-[#75716B]',
          isInvalid &&
            'border-red-500! text-red-500! focus-visible:border-red-500! focus-visible:ring-red-500/20',
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
