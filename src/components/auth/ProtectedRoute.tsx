import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { Navigate } from "react-router-dom"

import { urlPaths } from "@/constants/urlPaths"
import { meQueryOptions } from "@/queries/auth-query"
import { useAuthStore } from "@/stores/auth-store"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser)
  const logout = useAuthStore((state) => state.logout)

  const { data, isLoading, isError } = useQuery(meQueryOptions(true))

  useEffect(() => {
    if (!data) return
    setUser(data)
  }, [data, setUser])

  useEffect(() => {
    if (!isError) return
    logout()
  }, [isError, logout])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isError || !data) {
    return <Navigate to={urlPaths.login} replace />
  }

  return <>{children}</>
}
