import type { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from "lucide-react"

import { DataTable } from "@/components/data-table/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { getBlockTypeLabel } from "../constants/block-type"
import type { BlockGroup } from "../types/block-group"

interface BlockGroupsTableProps {
  data: BlockGroup[]
  loading?: boolean
  pageIndex: number
  pageCount: number
  onPageChange: (pageIndex: number) => void
  onEdit: (blockGroup: BlockGroup) => void
  onDelete: (blockGroup: BlockGroup) => void
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("vi-VN")
}

export function BlockGroupsTable({
  data,
  loading,
  pageIndex,
  pageCount,
  onPageChange,
  onEdit,
  onDelete,
}: BlockGroupsTableProps) {
  const columns: ColumnDef<BlockGroup>[] = [
    {
      accessorKey: "type",
      header: "Loại",
      cell: ({ row }) => getBlockTypeLabel(row.original.type),
    },
    {
      accessorKey: "code",
      header: "Mã",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.original.code}</span>
      ),
    },
    {
      accessorKey: "name",
      header: "Tên nhóm",
    },
    {
      accessorKey: "weight",
      header: "Trọng số",
    },
    {
      accessorKey: "sortOrder",
      header: "Thứ tự",
    },
    {
      accessorKey: "pickCount",
      header: "Số chọn",
    },
    {
      accessorKey: "isActive",
      header: "Trạng thái",
      cell: ({ row }) =>
        row.original.isActive ? (
          <Badge variant="secondary">Hoạt động</Badge>
        ) : (
          <Badge variant="outline">Ngưng</Badge>
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
