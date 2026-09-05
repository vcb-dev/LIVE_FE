import { PanelLeftClose, X } from "lucide-react"

import type { SidebarVariantProps } from "./types"

interface SidebarHeaderProps {
  variant: NonNullable<SidebarVariantProps["variant"]>
  onClose?: () => void
  onCollapse?: () => void
}

export function SidebarHeader({ variant, onClose, onCollapse }: SidebarHeaderProps) {
  return (
    <div>
      <div className="relative border-b border-emerald-900/40 p-6">
        <div className="flex items-center justify-center gap-3">
          {variant === "drawer" ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng menu"
              className="absolute top-4 right-4 rounded-full p-1 hover:bg-emerald-900/40"
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
          {variant === "desktop" ? (
            <button
              type="button"
              onClick={onCollapse}
              aria-label="Thu gọn menu"
              className="absolute top-4 right-4 rounded-full p-1 hover:bg-emerald-900/40"
            >
              <PanelLeftClose className="h-5 w-5" />
            </button>
          ) : null}
          <img src="/logovcb.png" className="h-30 w-30 object-cover" alt="VCB Logo" />
        </div>
      </div>
    </div>
  )
}
