// CategoryListPage — ตารางหมวดหมู่ + ค้นหา + ลบด้วย Dialog
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  adminPrimaryButtonClass,
  adminSearchInputClass,
  adminTableCellClass,
  adminTableHeadClass,
  adminTableHeaderRowClass,
  adminTableRowClass,
} from '@/components/admin/adminStyles'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAdmin } from '@/contexts/AdminContext'

export default function CategoryListPage() {
  const { categories, deleteCategory } = useAdmin()
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    )
  }, [categories, search])

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    deleteCategory(deleteTarget.id)
    toast.success('Category deleted', {
      description: `"${deleteTarget.name}" has been removed.`,
    })
    setDeleteTarget(null)
  }

  return (
    <>
      <AdminPageHeader title="Category management">
        <Button asChild className={adminPrimaryButtonClass}>
          <Link to="/admin/categories/new">
            <Plus className="mr-1.5 h-4 w-4" />
            Create category
          </Link>
        </Button>
      </AdminPageHeader>

      <div className="mb-6">
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full ${adminSearchInputClass}`}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className={adminTableHeaderRowClass}>
            <TableHead className={adminTableHeadClass}>Category name</TableHead>
            <TableHead className={`${adminTableHeadClass} text-right`}>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCategories.map((category) => (
            <TableRow key={category.id} className={adminTableRowClass}>
              <TableCell
                className={`${adminTableCellClass} font-medium text-[#26231E]`}
              >
                {category.name}
              </TableCell>
              <TableCell className={`${adminTableCellClass} text-right`}>
                <div className="flex justify-end gap-1">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon-sm"
                    className="text-[#75716B] hover:bg-transparent hover:text-[#26231E]"
                  >
                    <Link to={`/admin/categories/${category.id}/edit`}>
                      <Pencil className="h-4 w-4" strokeWidth={1.5} />
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-[#75716B] hover:bg-transparent hover:text-[#26231E]"
                    onClick={() => setDeleteTarget(category)}
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {filteredCategories.length === 0 && (
            <TableRow className={adminTableRowClass}>
              <TableCell
                colSpan={2}
                className={`${adminTableCellClass} py-10 text-center text-[#75716B]`}
              >
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete category"
        description="Do you want to delete this category?"
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}
