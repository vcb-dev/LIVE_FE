import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { Plus, Search } from "lucide-react"
import { useState } from "react"
import { Navigate } from "react-router-dom"

import { EmotionDeleteDialog } from "@/app/emotions/components/EmotionDeleteDialog"
import { EmotionFormDialog } from "@/app/emotions/components/EmotionFormDialog"
import { EmotionsTable } from "@/app/emotions/components/EmotionsTable"
import { useEmotionMutations } from "@/app/emotions/hooks/use-emotion-mutations"
import { listEmotionsQueryOptions } from "@/app/emotions/queries/emotion-query"
import type {
  CreateEmotionFormValues,
  UpdateEmotionFormValues,
} from "@/app/emotions/schemas/emotion-form.schema"
import type { Emotion } from "@/app/emotions/types/emotion"
import { PageHeader } from "@/components/UiCustom/PageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MODAL_MODE } from "@/constants/common"
import { urlPaths } from "@/constants/urlPaths"
import { useDebounce } from "@/hooks/useDebounce"
import { useIsStaff } from "@/lib/roles"
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/types/pagination"

export default function EmotionsPage() {
  const isStaff = useIsStaff()

  const [page, setPage] = useState(DEFAULT_PAGE)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)

  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<(typeof MODAL_MODE)[keyof typeof MODAL_MODE]>(
    MODAL_MODE.ADD
  )
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletingEmotion, setDeletingEmotion] = useState<Emotion | null>(null)

  const { createMutation, updateMutation, deleteMutation } = useEmotionMutations()

  const { data, isLoading, isFetching } = useQuery({
    ...listEmotionsQueryOptions({
      page,
      limit: DEFAULT_LIMIT,
      q: debouncedSearch || undefined,
    }),
    placeholderData: keepPreviousData,
    enabled: isStaff,
  })

  if (!isStaff) {
    return <Navigate to={urlPaths.home} replace />
  }

  const emotions = data?.data ?? []
  const meta = data?.meta
  const pageCount = Math.max(meta?.totalPages ?? 1, 1)
  const pageIndex = (meta?.page ?? page) - 1
  const tableLoading = isLoading || isFetching

  function openCreateDialog() {
    setFormMode(MODAL_MODE.ADD)
    setSelectedEmotion(null)
    setFormOpen(true)
  }

  function openEditDialog(emotion: Emotion) {
    setFormMode(MODAL_MODE.EDIT)
    setSelectedEmotion(emotion)
    setFormOpen(true)
  }

  function openDeleteDialog(emotion: Emotion) {
    setDeletingEmotion(emotion)
    setDeleteOpen(true)
  }

  function handleCreate(values: CreateEmotionFormValues, imageFile: File | null) {
    createMutation.mutate(
      { code: values.code, name: values.name, imageFile },
      { onSuccess: () => setFormOpen(false) }
    )
  }

  function handleUpdate(values: UpdateEmotionFormValues, imageFile: File | null) {
    if (!selectedEmotion) return

    updateMutation.mutate(
      { id: selectedEmotion.id, name: values.name, imageFile },
      { onSuccess: () => setFormOpen(false) }
    )
  }

  function handleDeleteConfirm() {
    if (!deletingEmotion) return

    deleteMutation.mutate(deletingEmotion.id, {
      onSuccess: () => {
        setDeleteOpen(false)
        setDeletingEmotion(null)
      },
    })
  }

  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(DEFAULT_PAGE)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <PageHeader
        title="Biểu cảm"
        description="Quản lý nhãn biểu cảm dùng trong kịch bản livestream."
        actions={
          <Button type="button" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            Thêm biểu cảm
          </Button>
        }
      />

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Tìm theo tên hoặc mã..."
          className="pl-9"
        />
      </div>

      <EmotionsTable
        data={emotions}
        loading={tableLoading}
        pageIndex={pageIndex}
        pageCount={pageCount}
        onPageChange={(nextPageIndex) => setPage(nextPageIndex + 1)}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />

      <EmotionFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        emotion={selectedEmotion}
        loading={createMutation.isPending || updateMutation.isPending}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />

      <EmotionDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        emotion={deletingEmotion}
        loading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
