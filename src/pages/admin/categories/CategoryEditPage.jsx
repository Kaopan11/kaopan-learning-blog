// CategoryEditPage — แก้ไขชื่อหมวดหมู่
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { CategoryForm } from '@/components/admin/CategoryForm'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/contexts/AdminContext'
import { validateCategoryName } from '@/lib/admin/categoryFormUtils'
import NotFoundPage from '@/pages/NotFoundPage'

export default function CategoryEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCategory, updateCategory } = useAdmin()
  const category = getCategory(id)

  const [name, setName] = useState(category?.name ?? '')

  if (!category) {
    return <NotFoundPage />
  }

  const handleSave = () => {
    if (!validateCategoryName(name)) {
      toast.error('Please enter a category name')
      return
    }

    updateCategory(id, name.trim())

    toast.success('Category updated', {
      description: 'Category saved successfully',
    })

    navigate('/admin/categories')
  }

  return (
    <>
      <AdminPageHeader title="Edit category">
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
