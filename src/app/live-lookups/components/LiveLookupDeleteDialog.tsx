import { ConfirmDialog } from "@/components/UiCustom/DialogConfirm"

import type { LiveLookup } from "../types/live-lookup"

interface LiveLookupDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lookup: LiveLookup | null
  loading?: boolean
  onConfirm: () => void
}

export function LiveLookupDeleteDialog({
  open,
  onOpenChange,
  lookup,
  loading,
  onConfirm,
}: LiveLookupDeleteDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Xóa mục"
      message={
        lookup
          ? `Bạn có chắc muốn xóa "${lookup.name}"?`
          : "Bạn có chắc muốn xóa mục này?"
      }
      loading={loading}
      onConfirm={onConfirm}
    />
  )
}
