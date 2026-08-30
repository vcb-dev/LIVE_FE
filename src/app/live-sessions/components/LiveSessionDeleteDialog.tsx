import { ConfirmDialog } from "@/components/UiCustom/DialogConfirm"

import type { LiveSessionListItem } from "../types/live-session"

interface LiveSessionDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  session: LiveSessionListItem | null
  loading?: boolean
  onConfirm: () => void
}

export function LiveSessionDeleteDialog({
  open,
  onOpenChange,
  session,
  loading,
  onConfirm,
}: LiveSessionDeleteDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Xóa kịch bản"
      message={
        session
          ? `Bạn có chắc muốn xóa kịch bản "${session.name}"? Chỉ xóa được phiên nháp.`
          : "Bạn có chắc muốn xóa kịch bản này?"
      }
      loading={loading}
      onConfirm={onConfirm}
    />
  )
}
