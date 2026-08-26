import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { Navigate, useLocation } from "react-router-dom"

import { urlPaths } from "@/constants/urlPaths"
import { meQueryOptions } from "@/queries/auth-query"

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const skipMe = location.state?.skipMeCheck === true
  const { data, isLoading } = useQuery(meQueryOptions(!skipMe))

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (data) {
    return <Navigate to={urlPaths.home} replace />
  }

  return <>{children}</>
}
