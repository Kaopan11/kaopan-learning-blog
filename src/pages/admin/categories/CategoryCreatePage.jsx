// CategoryCreatePage — สร้างหมวดหมู่ใหม่
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { CategoryForm } from '@/components/admin/CategoryForm'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/contexts/AdminContext'
import { validateCategoryName } from '@/lib/admin/categoryFormUtils'

export default function CategoryCreatePage() {
  const navigate = useNavigate()
  const { createCategory } = useAdmin()
  const [name, setName] = useState('')

  const handleSave = () => {
    if (!validateCategoryName(name)) {
      toast.error('Please enter a category name')
      return
    }

    createCategory(name.trim())

    toast.success('Create category', {
      description: 'Category created successfully',
    })

    navigate('/admin/categories')
  }

  return (
    <>
      <AdminPageHeader title="Create category">
        <Button
          type="button"
          className="rounded-full bg-[#26231E] hover:bg-[#43403B]"
          onClick={handleSave}
        >
          Save
        </Button>
      </AdminPageHeader>

      <CategoryForm name={name} onChange={setName} />
    </>
  )
}
