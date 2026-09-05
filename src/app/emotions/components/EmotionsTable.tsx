import type { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from "lucide-react"

import { DataTable } from "@/components/data-table/data-table"
import { Button } from "@/components/ui/button"

import type { Emotion } from "../types/emotion"

interface EmotionsTableProps {
  data: Emotion[]
  loading?: boolean
  pageIndex: number
  pageCount: number
  onPageChange: (pageIndex: number) => void
  onEdit: (emotion: Emotion) => void
  onDelete: (emotion: Emotion) => void
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("vi-VN")
}

export function EmotionsTable({
  data,
  loading,
  pageIndex,
  pageCount,
  onPageChange,
  onEdit,
  onDelete,
}: EmotionsTableProps) {
  const columns: ColumnDef<Emotion>[] = [
    {
      accessorKey: "code",
      header: "Mã",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.original.code}</span>
      ),
    },
    {
      accessorKey: "name",
      header: "Tên biểu cảm",
    },
    {
      accessorKey: "imageUrl",
      header: "Ảnh mẫu",
      cell: ({ row }) =>
        row.original.imageUrl ? (
          <img
            src={row.original.imageUrl}
            alt={row.original.name}
            className="h-10 w-10 rounded-md border object-cover"
          />
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        ),
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Sửa ${row.original.name}`}
            onClick={() => onEdit(row.original)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Xóa ${row.original.name}`}
            onClick={() => onDelete(row.original)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      pageIndex={pageIndex}
      pageCount={pageCount}
      onPageChange={onPageChange}
    />
  )
}
