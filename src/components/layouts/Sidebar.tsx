import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

import { useIsStaff } from "@/lib/roles"
import { cn } from "@/lib/utils"

import { OPERATION_NAV_ITEMS, SALES_NAV_ITEMS } from "./sidebar/nav-items"
import { SidebarFooter } from "./sidebar/SidebarFooter"
import { SidebarHeader } from "./sidebar/SidebarHeader"
import { SidebarNavScroll } from "./sidebar/SidebarNavScroll"
import type { SidebarVariantProps } from "./sidebar/types"

type SidebarProps = SidebarVariantProps

export function Sidebar({
  variant = "desktop",
  onClose,
  onCollapse,
}: SidebarProps) {
  const location = useLocation()
  const showStaffNav = useIsStaff()
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    if (variant !== "drawer") return
    if (prevPathRef.current === location.pathname) return
    prevPathRef.current = location.pathname
    onClose?.()
  }, [location.pathname, variant, onClose])

  return (
    <aside
      className={cn(
        "grid h-full shrink-0 grid-rows-[auto_1fr_auto] overflow-hidden bg-sidebar-primary text-sidebar-primary-foreground shadow-lg",
        variant === "desktop" &&
          "sticky top-0 hidden h-screen w-full md:grid md:w-64",
        variant === "drawer" && "h-full w-72 max-w-[85vw]"
      )}
      id={variant === "desktop" ? "app-sidebar" : undefined}
    >
      <SidebarHeader
        variant={variant}
        onClose={onClose}
        onCollapse={onCollapse}
      />

      <SidebarNavScroll
        showSettings={showStaffNav}
        operationItems={OPERATION_NAV_ITEMS}
        salesItems={SALES_NAV_ITEMS}
      />

      <SidebarFooter />
    </aside>
  )
}
