import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { Plus, Search } from "lucide-react"
import { useState } from "react"
import { Navigate } from "react-router-dom"

import { UserDeleteDialog } from "@/app/users/components/UserDeleteDialog"
import { UserFormDialog } from "@/app/users/components/UserFormDialog"
import { UsersTable } from "@/app/users/components/UsersTable"
import { useUserMutations } from "@/app/users/hooks/use-user-mutations"
import { listUsersQueryOptions } from "@/app/users/queries/user-query"
import type {
  CreateUserFormValues,
  UpdateUserFormValues,
} from "@/app/users/schemas/user-form.schema"
import type { User } from "@/app/users/types/user"
import { PageHeader } from "@/components/UiCustom/PageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MODAL_MODE } from "@/constants/common"
import { urlPaths } from "@/constants/urlPaths"
import { useDebounce } from "@/hooks/useDebounce"
import type { UserRole } from "@/interfaces/auth"
import { ROLE_LABEL } from "@/interfaces/auth"
import { useInGroup } from "@/lib/roles"
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/types/pagination"

const ALL_ROLES_VALUE = "ALL"
const ALL_STATUS_VALUE = "ALL"

export default function UsersPage() {
  const isAdmin = useInGroup("adminOnly")

  const [page, setPage] = useState(DEFAULT_PAGE)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<UserRole | undefined>()
  const [activeFilter, setActiveFilter] = useState<boolean | undefined>()
  const debouncedSearch = useDebounce(search, 300)

  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<(typeof MODAL_MODE)[keyof typeof MODAL_MODE]>(
    MODAL_MODE.ADD
  )
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)

  const { createMutation, updateMutation, deleteMutation } = useUserMutations()

  const { data, isLoading, isFetching } = useQuery({
    ...listUsersQueryOptions({
      page,
      limit: DEFAULT_LIMIT,
      q: debouncedSearch || undefined,
      role: roleFilter,
      isActive: activeFilter,
    }),
    placeholderData: keepPreviousData,
    enabled: isAdmin,
  })

  if (!isAdmin) {
    return <Navigate to={urlPaths.home} replace />
  }

  const users = data?.data ?? []
  const meta = data?.meta
  const pageCount = Math.max(meta?.totalPages ?? 1, 1)
  const pageIndex = (meta?.page ?? page) - 1
  const tableLoading = isLoading || isFetching

  function openCreateDialog() {
    setFormMode(MODAL_MODE.ADD)
    setSelectedUser(null)
    setFormOpen(true)
  }

  function openEditDialog(user: User) {
    setFormMode(MODAL_MODE.EDIT)
    setSelectedUser(user)
    setFormOpen(true)
  }

  function openDeleteDialog(user: User) {
    setDeletingUser(user)
    setDeleteOpen(true)
  }

  function handleCreate(values: CreateUserFormValues) {
    createMutation.mutate(
      {
        email: values.email,
        password: values.password,
        role: values.role,
        isActive: values.isActive,
      },
      { onSuccess: () => setFormOpen(false) }
    )
  }

  function handleUpdate(values: UpdateUserFormValues) {
    if (!selectedUser) return

    updateMutation.mutate(
      {
        id: selectedUser.id,
        password: values.password,
        role: values.role,
        isActive: values.isActive,
      },
      { onSuccess: () => setFormOpen(false) }
    )
  }

  function handleDeleteConfirm() {
    if (!deletingUser) return

    deleteMutation.mutate(deletingUser.id, {
      onSuccess: () => {
        setDeleteOpen(false)
        setDeletingUser(null)
      },
    })
  }

  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(DEFAULT_PAGE)
  }

  function handleRoleFilterChange(value: string) {
    setRoleFilter(value === ALL_ROLES_VALUE ? undefined : (value as UserRole))
    setPage(DEFAULT_PAGE)
  }

  function handleActiveFilterChange(value: string) {
    if (value === ALL_STATUS_VALUE) {
      setActiveFilter(undefined)
    } else {
      setActiveFilter(value === "active")
    }
    setPage(DEFAULT_PAGE)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <PageHeader
        title="Người dùng"
        description="Quản lý tài khoản và phân quyền trong hệ thống."
        actions={
          <Button type="button" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            Thêm người dùng
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Tìm theo email..."
            className="pl-9"
          />
        </div>
        <Select
          value={roleFilter ?? ALL_ROLES_VALUE}
          onValueChange={handleRoleFilterChange}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_ROLES_VALUE}>Tất cả vai trò</SelectItem>
            {(Object.keys(ROLE_LABEL) as UserRole[]).map((role) => (
              <SelectItem key={role} value={role}>
                {ROLE_LABEL[role]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={
            activeFilter === undefined
              ? ALL_STATUS_VALUE
              : activeFilter
                ? "active"
                : "inactive"
          }
          onValueChange={handleActiveFilterChange}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_STATUS_VALUE}>Tất cả trạng thái</SelectItem>
            <SelectItem value="active">Hoạt động</SelectItem>
            <SelectItem value="inactive">Vô hiệu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UsersTable
        data={users}
        loading={tableLoading}
        pageIndex={pageIndex}
        pageCount={pageCount}
        onPageChange={(nextPageIndex) => setPage(nextPageIndex + 1)}
        onEdit={openEditDialog}
        onDeactivate={openDeleteDialog}
      />

      <UserFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        user={selectedUser}
        loading={createMutation.isPending || updateMutation.isPending}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />

      <UserDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        user={deletingUser}
        loading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
