import { ConfirmDialog } from "@/components/UiCustom/DialogConfirm"

import type { ScriptBlock } from "../types/script-block"

interface ScriptBlockDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  scriptBlock: ScriptBlock | null
  loading?: boolean
  onConfirm: () => void
}

export function ScriptBlockDeleteDialog({
  open,
  onOpenChange,
  scriptBlock,
  loading,
  onConfirm,
}: ScriptBlockDeleteDialogProps) {
  const label = scriptBlock?.title?.trim() || scriptBlock?.content.slice(0, 60)

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Xóa block kịch bản"
      message={
        scriptBlock
          ? `Bạn có chắc muốn xóa block "${label}"? Block đã dùng trong phiên live không thể xóa — hãy tắt trạng thái hoạt động.`
          : "Bạn có chắc muốn xóa block này?"
      }
      loading={loading}
      onConfirm={onConfirm}
    />
  )
}
