// StatusBadge — แสดงสถานะ Draft / Published ในตารางบทความ
import { cn } from '@/lib/utils'

export function StatusBadge({ status }) {
  const isPublished = status === 'Published'

  return (
    <span
      className={cn(
        'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
        isPublished
          ? 'bg-[#22C55E] text-white'
          : 'bg-[#E5E5E0] text-[#75716B]',
      )}
    >
      {status}
    </span>
  )
}
