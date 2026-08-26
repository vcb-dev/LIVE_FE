import { Home } from "lucide-react"

import { PageHeader } from "@/components/UiCustom/PageHeader"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuthStore } from "@/stores/auth-store"

export default function HomePage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <PageHeader
        title="Trang chủ"
        description={`Xin chào, ${user?.email ?? "bạn"} — chào mừng đến LIVE VCB.`}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            Bảng điều khiển
          </CardTitle>
          <CardDescription>
            Hệ thống quản trị phòng khám — chọn chức năng trên menu bên trái.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Các module sẽ được bổ sung dần trên sidebar.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
