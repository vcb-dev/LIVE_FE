import {
  ChevronDown,
  ChevronRight,
  ChevronsDown,
  Home,
  LogOut,
  PanelLeftClose,
  X,
} from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"

import { type PermissionCode } from "@/constants/permissions"
import { urlPaths } from "@/constants/urlPaths"
import { ROLE_LABEL } from "@/interfaces/auth"
import { resetSession } from "@/lib/reset-session"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth-store"
import { Button } from "../ui/button"

interface NavItem {
  to?: string
  label: string
  icon: React.ReactNode
  isHighlighted?: boolean
  /** Any of these permissions unlocks the item; omit = always show when logged in. */
  permissions?: PermissionCode[]
  children?: { label: string; to: string }[]
}

const OPERATION_NAV_ITEMS: NavItem[] = [
  {
    to: urlPaths.home,
    label: "Trang chủ",
    icon: <Home className="h-4 w-4" />,
  },
]

const KPI_NAV_ITEMS: NavItem[] = []

const SALES_NAV_ITEMS: NavItem[] = []

const ADMIN_NAV_ITEMS: NavItem[] = []

function CollapsibleNavItem({ item }: { item: NavItem }) {
  const location = useLocation()

  const activeChildTo = item.children?.reduce((prev, curr) => {
    if (location.pathname.startsWith(curr.to) && curr.to.length > prev.length) {
      return curr.to
    }
    return prev
  }, "")

  const isActive = activeChildTo !== ""
  const [isOpen, setIsOpen] = useState(isActive || false)

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group flex items-center justify-between gap-3 rounded-lg px-4 py-2 text-sm transition-all",
          isActive
            ? "bg-emerald-900/40 text-emerald-100"
            : "bg-primary hover:bg-emerald-900/40"
        )}
      >
        <div className="flex items-center gap-3">
          {item.icon}
          {item.label}
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {isOpen && (
        <div className="mt-1 ml-9 flex flex-col space-y-1 border-l border-emerald-800/50 pl-2">
          {item.children?.map((child) => {
            const isChildActive = child.to === activeChildTo
            return (
              <NavLink
                key={child.to}
                to={child.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs transition-all",
                  isChildActive
                    ? "bg-primary/50 font-medium text-white"
                    : "text-emerald-400 hover:bg-emerald-900/30 hover:text-emerald-200"
                )}
              >
                {child.label}
              </NavLink>
            )
          })}
        </div>
      )}
    </div>
  )
}

function NavGroup({ title, items }: { title: string; items: NavItem[] }) {
  const location = useLocation()
  return (
    <div>
      <p className="=uppercase mb-2 px-4 text-[10px] font-bold tracking-wider">
        {title}
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          if (item.children) {
            return <CollapsibleNavItem key={item.label} item={item} />
          }
          return (
            <NavLink
              key={item.label}
              to={item.to!}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-all",
                  isActive || (item.to && location.pathname.startsWith(item.to))
                    ? "border-l-4 border-l-lime-400 bg-primary text-white"
                    : "bg-primary hover:bg-emerald-900/40"
                )
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

interface ScrollFadeState {
  top: boolean
  bottom: boolean
}

function SidebarNavScroll({
  showSettings,
  operationItems,
  salesItems,
}: {
  showSettings: boolean
  operationItems: NavItem[]
  salesItems: NavItem[]
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [fade, setFade] = useState<ScrollFadeState>({
    top: false,
    bottom: false,
  })

  const updateScrollFade = useCallback(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return

    const hasOverflow = scrollEl.scrollHeight > scrollEl.clientHeight
    const isAtTop = scrollEl.scrollTop <= 1
    const isAtBottom =
      scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 1

    setFade({
      top: hasOverflow && !isAtTop,
      bottom: hasOverflow && !isAtBottom,
    })
  }, [])

  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return

    updateScrollFade()

    const resizeObserver = new ResizeObserver(updateScrollFade)
    resizeObserver.observe(scrollEl)

    const nav = scrollEl.firstElementChild
    if (nav) {
      resizeObserver.observe(nav)
    }

    return () => resizeObserver.disconnect()
  }, [showSettings, operationItems, salesItems, updateScrollFade])

  return (
    <div className="relative min-h-0 overflow-hidden">
      <div
        ref={scrollRef}
        onScroll={updateScrollFade}
        className="scrollbar-hide h-full overflow-y-auto overscroll-contain"
      >
        <nav className="space-y-6 px-3 py-2 pt-4 pb-3" id="nav-groups">
          {operationItems.length > 0 ? (
            <NavGroup title="VẬN HÀNH" items={operationItems} />
          ) : null}
          <NavGroup title="NHÂN SỰ & KPI" items={KPI_NAV_ITEMS} />
          {salesItems.length > 0 ? (
            <NavGroup title="BÁN HÀNG" items={salesItems} />
          ) : null}
          {showSettings ? (
            <NavGroup title="QUẢN TRỊ" items={ADMIN_NAV_ITEMS} />
          ) : null}
        </nav>
      </div>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-linear-to-b from-emerald-950 via-emerald-950/70 to-transparent transition-opacity duration-300",
          fade.top ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 transition-opacity duration-300",
          fade.bottom ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="h-14 bg-linear-to-t from-emerald-950 via-emerald-950/80 to-transparent" />
        <ChevronsDown className="absolute bottom-1.5 left-1/2 h-4 w-4 -translate-x-1/2 text-lime-400/80" />
      </div>
    </div>
  )
}

interface SidebarProps {
  variant?: "desktop" | "drawer"
  onClose?: () => void
  onCollapse?: () => void
}

export function Sidebar({
  variant = "desktop",
  onClose,
  onCollapse,
}: SidebarProps) {
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    if (variant !== "drawer") return
    if (prevPathRef.current === location.pathname) return
    prevPathRef.current = location.pathname
    onClose?.()
  }, [location.pathname, variant, onClose])

  async function handleLogout() {
    await resetSession({ revokeServer: true })
    navigate(urlPaths.login, { replace: true, state: { skipMeCheck: true } })
  }

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
            <img src="/logovcb.png" className="h-30 w-30 object-cover" />
          </div>
        </div>
      </div>

      <SidebarNavScroll
        showSettings={false}
        operationItems={OPERATION_NAV_ITEMS}
        salesItems={SALES_NAV_ITEMS}
      />

      <div className="border-t border-[#f8e3a3]/40 bg-sidebar-primary/40 p-4 text-[11px] text-sidebar-primary-foreground">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-semibold text-white">
              {user?.email ?? "Khách"}
            </p>
            <p className="text-white">
              Vai trò: {user ? ROLE_LABEL[user.role] : "—"}
            </p>
          </div>
          <Button onClick={handleLogout} title="Đăng xuất" className="text-xs">
            <LogOut className="w- h-3.5" />
            Đăng xuất
          </Button>
        </div>
      </div>
    </aside>
  )
}
