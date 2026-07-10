// ArticleCreatePage — สร้างบทความใหม่ (Save as draft / Save and publish)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { ArticleForm } from '@/components/admin/ArticleForm'
import { adminPrimaryButtonClass } from '@/components/admin/adminStyles'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/contexts/AdminContext'
import {
  getEmptyArticleForm,
  validateArticleForm,
} from '@/lib/admin/articleFormUtils'

export default function ArticleCreatePage() {
  const navigate = useNavigate()
  const { createArticle } = useAdmin()
  const [form, setForm] = useState(getEmptyArticleForm)

  const handleSave = (status) => {
    if (!validateArticleForm(form)) {
      toast.error('Please fill in all required fields')
      return
    }

    createArticle(form, status)

    // Trigger toast สีเขียวตามสถานะที่บันทึก
    if (status === 'Published') {
      toast.success('Saved and published', {
        description: 'Your article has been published successfully.',
      })
    } else {
      toast.success('Saved as draft', {
        description: 'Your article has been saved as a draft.',
      })
    }

    navigate('/admin/articles')
  }

  return (
    <>
      <AdminPageHeader title="Create article">
        <Button
          type="button"
          variant="outline"
          className="rounded-full border-[#26231E]"
          onClick={() => handleSave('Draft')}
        >
          Save as draft
        </Button>
        <Button
          type="button"
          className={adminPrimaryButtonClass}
          onClick={() => handleSave('Published')}
        >
          Save and publish
        </Button>
      </AdminPageHeader>

      <ArticleForm form={form} onChange={setForm} />
    </>
  )
}
