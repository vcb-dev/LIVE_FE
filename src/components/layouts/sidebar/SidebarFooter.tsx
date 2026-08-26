import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { urlPaths } from "@/constants/urlPaths"
import { ROLE_LABEL } from "@/interfaces/auth"
import { resetSession } from "@/lib/reset-session"
import { useAuthStore } from "@/stores/auth-store"

export function SidebarFooter() {
  const user = useAuthStore((state) => state.user)

  async function handleLogout() {
    await resetSession({ revokeServer: true })
    window.location.replace(urlPaths.login)
  }

  return (
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
          <LogOut className="h-3.5 w-3.5" />
          Đăng xuất
        </Button>
      </div>
    </div>
  )
}
