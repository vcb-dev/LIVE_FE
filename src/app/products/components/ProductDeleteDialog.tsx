import { ConfirmDialog } from "@/components/UiCustom/DialogConfirm"

import type { Product } from "../types/product"

interface ProductDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
  loading?: boolean
  onConfirm: () => void
}

export function ProductDeleteDialog({
  open,
  onOpenChange,
  product,
  loading,
  onConfirm,
}: ProductDeleteDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Xóa sản phẩm"
      message={
        product
          ? `Bạn có chắc muốn xóa sản phẩm "${product.name}" (${product.code})?`
          : "Bạn có chắc muốn xóa sản phẩm này?"
      }
      loading={loading}
      onConfirm={onConfirm}
    />
  )
}
