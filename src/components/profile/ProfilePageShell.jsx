// ProfilePageShell — wrapper ร่วมของหน้า Profile / Reset password
// หัวข้ออยู่นอกการ์ดสีเทา, เนื้อหาฟอร์มอยู่ในการ์ด
export function ProfilePageShell({ title, children }) {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <h1 className="text-2xl font-bold text-[#26231E] md:flex md:h-10 md:items-center">
        {title}
      </h1>

      <div className="rounded-2xl bg-[#EFEEEB] px-5 py-8 md:px-10 md:py-10">
        {children}
      </div>
    </div>
  )
}
