import { ConfirmDialog } from "@/components/UiCustom/DialogConfirm"

import type { Emotion } from "../types/emotion"

interface EmotionDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  emotion: Emotion | null
  loading?: boolean
  onConfirm: () => void
}

export function EmotionDeleteDialog({
  open,
  onOpenChange,
  emotion,
  loading,
  onConfirm,
}: EmotionDeleteDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Xóa biểu cảm"
      message={
        emotion
          ? `Bạn có chắc muốn xóa biểu cảm "${emotion.name}" (${emotion.code})?`
          : "Bạn có chắc muốn xóa biểu cảm này?"
      }
      loading={loading}
      onConfirm={onConfirm}
    />
  )
}
