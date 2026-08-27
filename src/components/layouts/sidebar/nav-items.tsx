import { Home, Layers, Smile } from "lucide-react"

import { urlPaths } from "@/constants/urlPaths"

import type { NavItem } from "./types"

export const OPERATION_NAV_ITEMS: NavItem[] = [
  {
    to: urlPaths.home,
    label: "Trang chủ",
    icon: <Home className="h-4 w-4" />,
  },
]

export const KPI_NAV_ITEMS: NavItem[] = []

export const SALES_NAV_ITEMS: NavItem[] = []

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    to: urlPaths.emotions,
    label: "Biểu cảm",
    icon: <Smile className="h-4 w-4" />,
  },
  {
    to: urlPaths.blockGroups,
    label: "Nhóm block",
    icon: <Layers className="h-4 w-4" />,
  },
]
