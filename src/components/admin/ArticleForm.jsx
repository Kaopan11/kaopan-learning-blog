// ArticleForm — ฟอร์มสร้าง/แก้ไขบทความ (ใช้ร่วมกันระหว่าง Create และ Edit)
import { useRef } from 'react'

import { AdminFormField } from '@/components/admin/AdminFormField'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAdmin } from '@/contexts/AdminContext'

export function ArticleForm({ form, onChange }) {
  const { categoryNames } = useAdmin()
  const fileInputRef = useRef(null)

  const handleFieldChange = (field) => (event) => {
    onChange({ ...form, [field]: event.target.value })
  }

  const handleThumbnailSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      onChange({ ...form, thumbnail: reader.result })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      {/* Thumbnail upload */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-[#26231E]">Thumbnail</span>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex h-40 w-full max-w-xs items-center justify-center overflow-hidden rounded-xl border border-[#E5E5E0] bg-[#F5F4F2] sm:h-44">
            {form.thumbnail ? (
              <img
                src={form.thumbnail}
                alt="Thumbnail preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm text-[#75716B]">No thumbnail</span>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleThumbnailSelect}
          />
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-[#26231E]"
            onClick={() => fileInputRef.current?.click()}
          >
            {form.thumbnail ? 'Change thumbnail' : 'Upload thumbnail'}
          </Button>
        </div>
      </div>

      {/* Category dropdown */}
      <div className="flex flex-col gap-1.5">
        <span className="text-sm text-[#26231E]">Category</span>
        <Select
          value={form.category}
          onValueChange={(value) => onChange({ ...form, category: value })}
        >
          <SelectTrigger className="h-11 w-full border-[#E5E5E0] bg-white">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categoryNames.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AdminFormField
        id="article-author"
        label="Author"
        value={form.author}
        onChange={handleFieldChange('author')}
        placeholder="Author name"
      />
      <AdminFormField
        id="article-title"
        label="Title"
        value={form.title}
        onChange={handleFieldChange('title')}
        placeholder="Article title"
      />
      <AdminFormField
        id="article-intro"
        label="Intro"
        value={form.intro}
        onChange={handleFieldChange('intro')}
        placeholder="Short introduction"
        multiline
        rows={3}
      />
      <AdminFormField
        id="article-content"
        label="Content"
        value={form.content}
        onChange={handleFieldChange('content')}
        placeholder="Article content (markdown supported)"
        multiline
        rows={10}
      />
    </div>
  )
}
