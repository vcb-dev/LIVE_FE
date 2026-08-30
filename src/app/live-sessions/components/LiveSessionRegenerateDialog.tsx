import { ConfirmDialog } from "@/components/UiCustom/DialogConfirm"

interface LiveSessionRegenerateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  loading?: boolean
  onConfirm: () => void
}

export function LiveSessionRegenerateDialog({
  open,
  onOpenChange,
  loading,
  onConfirm,
}: LiveSessionRegenerateDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Generate lại kịch bản"
      message="Timeline hiện tại sẽ bị thay bằng bản random mới từ kho nội dung. Chỉ áp dụng cho phiên nháp."
      loading={loading}
      onConfirm={onConfirm}
    />
  )
}
