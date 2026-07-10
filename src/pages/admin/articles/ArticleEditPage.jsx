// ArticleEditPage — แก้ไขบทความ (ปุ่ม Save เดียว)
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { ArticleForm } from '@/components/admin/ArticleForm'
import { adminPrimaryButtonClass } from '@/components/admin/adminStyles'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { Button } from '@/components/ui/button'
import { useAdmin } from '@/contexts/AdminContext'
import { validateArticleForm } from '@/lib/admin/articleFormUtils'
import NotFoundPage from '@/pages/NotFoundPage'

export default function ArticleEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getArticle, updateArticle } = useAdmin()
  const article = getArticle(id)

  const [form, setForm] = useState(() =>
    article
      ? {
          thumbnail: article.thumbnail,
          category: article.category,
          author: article.author,
          title: article.title,
          intro: article.intro,
          content: article.content,
        }
      : null,
  )

  if (!article || !form) {
    return <NotFoundPage />
  }

  const handleSave = () => {
    if (!validateArticleForm(form)) {
      toast.error('Please fill in all required fields')
      return
    }

    updateArticle(id, form)

    toast.success('Article updated', {
      description: 'Your changes have been saved successfully.',
    })

    navigate('/admin/articles')
  }

  return (
    <>
      <AdminPageHeader title="Edit article">
        <Button
          type="button"
          className={adminPrimaryButtonClass}
          onClick={handleSave}
        >
          Save
        </Button>
      </AdminPageHeader>

      <ArticleForm form={form} onChange={setForm} mode="edit" />
    </>
  )
}
