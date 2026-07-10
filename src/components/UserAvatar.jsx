import { User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

// แสดงรูปโปรไฟล์ — ถ้าไม่มีรูปหรือโหลดไม่สำเร็จ ให้ fallback เป็นวงกลมสีเทาพร้อมไอคอน user
export function UserAvatar({ src, name, className, size = 'default' }) {
  const initials = name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Avatar size={size} className={cn('bg-[#DAD6D1]', className)}>
      {src ? <AvatarImage src={src} alt={name} /> : null}
      <AvatarFallback className="bg-[#DAD6D1] text-[#75716B]">
        {initials || <User className="h-5 w-5" strokeWidth={1.5} />}
      </AvatarFallback>
    </Avatar>
  )
}
