// AdminPageHeader — หัวข้อหน้า admin + ปุ่ม action ด้านขวา
export function AdminPageHeader({ title, children }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-[32px] font-bold leading-tight text-[#26231E]">{title}</h1>
      {children && <div className="flex shrink-0 items-center gap-3">{children}</div>}
    </div>
  )
}
