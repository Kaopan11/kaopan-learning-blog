// ArticleListPage — ตารางรายการบทความ + ค้นหา + กรอง Category/Status
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  adminPrimaryButtonClass,
  adminSearchInputClass,
  adminSelectTriggerClass,
  adminTableCellClass,
  adminTableHeadClass,
  adminTableHeaderRowClass,
  adminTableRowClass,
} from '@/components/admin/adminStyles'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAdmin } from '@/contexts/AdminContext'

export default function ArticleListPage() {
  const { articles, categoryNames, deleteArticle } = useAdmin()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchSearch = article.title
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchCategory =
        categoryFilter === 'all' || article.category === categoryFilter
      const matchStatus =
        statusFilter === 'all' || article.status === statusFilter
      return matchSearch && matchCategory && matchStatus
    })
  }, [articles, search, categoryFilter, statusFilter])

  // เปิด Dialog ยืนยันก่อนลบบทความ
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    deleteArticle(deleteTarget.id)
    toast.success('Article deleted', {
      description: `"${deleteTarget.title}" has been removed.`,
    })
    setDeleteTarget(null)
  }

  return (
    <>
      <AdminPageHeader title="Article management">
        <Button asChild className={adminPrimaryButtonClass}>
          <Link to="/admin/articles/new">
            <Plus className="mr-1.5 h-4 w-4" />
            Create article
          </Link>
        </Button>
      </AdminPageHeader>

      {/* แถบค้นหาและตัวกรอง — search กว้างเต็มแถวตาม mockup */}
      <div className="mb-6 flex flex-col gap-3 lg:flex-row">
        <Input
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`flex-1 ${adminSearchInputClass}`}
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className={`w-full lg:w-44 ${adminSelectTriggerClass}`}>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categoryNames.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className={`w-full lg:w-36 ${adminSelectTriggerClass}`}>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow className={adminTableHeaderRowClass}>
            <TableHead className={adminTableHeadClass}>Title</TableHead>
            <TableHead className={adminTableHeadClass}>Category</TableHead>
            <TableHead className={adminTableHeadClass}>Status</TableHead>
            <TableHead className={`${adminTableHeadClass} text-right`}>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredArticles.map((article) => (
            <TableRow key={article.id} className={adminTableRowClass}>
              <TableCell
                className={`${adminTableCellClass} max-w-md font-medium whitespace-normal text-[#26231E]`}
              >
                {article.title}
              </TableCell>
              <TableCell className={`${adminTableCellClass} text-[#75716B]`}>
                {article.category}
              </TableCell>
              <TableCell className={adminTableCellClass}>
                <StatusBadge status={article.status} />
              </TableCell>
              <TableCell className={`${adminTableCellClass} text-right`}>
                <div className="flex justify-end gap-1">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon-sm"
                    className="text-[#75716B] hover:bg-transparent hover:text-[#26231E]"
                  >
                    <Link to={`/admin/articles/${article.id}/edit`}>
                      <Pencil className="h-4 w-4" strokeWidth={1.5} />
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-[#75716B] hover:bg-transparent hover:text-[#26231E]"
                    onClick={() => setDeleteTarget(article)}
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {filteredArticles.length === 0 && (
            <TableRow className={adminTableRowClass}>
              <TableCell
                colSpan={4}
                className={`${adminTableCellClass} py-10 text-center text-[#75716B]`}
              >
                No articles found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete article"
        description="Do you want to delete this article?"
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}
