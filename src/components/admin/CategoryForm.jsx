// CategoryForm — ฟอร์มสร้าง/แก้ไขหมวดหมู่
import { AdminFormField } from '@/components/admin/AdminFormField'

export function CategoryForm({ name, onChange }) {
  return (
    <div className="mx-auto max-w-xl">
      <AdminFormField
        id="category-name"
        label="Category name"
        value={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. Life, Finance, Pop-culture"
      />
    </div>
  )
}
