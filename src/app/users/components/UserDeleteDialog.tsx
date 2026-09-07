import { ConfirmDialog } from "@/components/UiCustom/DialogConfirm"

import type { User } from "../types/user"

interface UserDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  loading?: boolean
  onConfirm: () => void
}

export function UserDeleteDialog({
  open,
  onOpenChange,
  user,
  loading,
  onConfirm,
}: UserDeleteDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Vô hiệu hóa người dùng"
      message={
        user
          ? `Bạn có chắc muốn vô hiệu hóa tài khoản "${user.email}"? Người dùng sẽ không thể đăng nhập.`
          : "Bạn có chắc muốn vô hiệu hóa người dùng này?"
      }
      loading={loading}
      onConfirm={onConfirm}
    />
  )
}
