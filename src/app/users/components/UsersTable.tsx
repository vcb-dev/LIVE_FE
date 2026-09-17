import type { ColumnDef } from "@tanstack/react-table"
import { Pencil, UserX } from "lucide-react"

import { DataTable } from "@/components/data-table/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ROLE_LABEL } from "@/interfaces/auth"

import type { User } from "../types/user"

interface UsersTableProps {
  data: User[]
  loading?: boolean
  pageIndex: number
  pageCount: number
  onPageChange: (pageIndex: number) => void
  onEdit: (user: User) => void
  onDeactivate: (user: User) => void
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("vi-VN")
}

export function UsersTable({
  data,
  loading,
  pageIndex,
  pageCount,
  onPageChange,
  onEdit,
  onDeactivate,
}: UsersTableProps) {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Vai trò",
      cell: ({ row }) => (
        <Badge variant="outline">{ROLE_LABEL[row.original.role]}</Badge>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Trạng thái",
      cell: ({ row }) =>
        row.original.isActive ? (
          <Badge variant="default">Hoạt động</Badge>
        ) : (
          <Badge variant="secondary">Vô hiệu</Badge>
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
            aria-label={`Sửa ${row.original.email}`}
            onClick={() => onEdit(row.original)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          {row.original.isActive ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Vô hiệu hóa ${row.original.email}`}
              onClick={() => onDeactivate(row.original)}
            >
              <UserX className="h-4 w-4 text-destructive" />
            </Button>
          ) : null}
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
