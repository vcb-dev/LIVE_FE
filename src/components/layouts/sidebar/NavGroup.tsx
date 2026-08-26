import { NavLink, useLocation } from "react-router-dom"

import { cn } from "@/lib/utils"

import { CollapsibleNavItem } from "./CollapsibleNavItem"
import type { NavItem } from "./types"

interface NavGroupProps {
  title: string
  items: NavItem[]
}

export function NavGroup({ title, items }: NavGroupProps) {
  const location = useLocation()

  return (
    <div>
      <p className="mb-2 px-4 text-[10px] font-bold tracking-wider uppercase">
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
