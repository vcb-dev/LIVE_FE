export interface NavItem {
  to?: string
  label: string
  icon: React.ReactNode
  isHighlighted?: boolean
  children?: { label: string; to: string }[]
}

export interface ScrollFadeState {
  top: boolean
  bottom: boolean
}

export interface SidebarVariantProps {
  variant?: "desktop" | "drawer"
  onClose?: () => void
  onCollapse?: () => void
}
