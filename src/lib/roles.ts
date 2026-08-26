import type { AuthUser, UserRole } from "@/interfaces/auth"
import { useAuthStore } from "@/stores/auth-store"

export function userHasRole(
  user: Pick<AuthUser, "role"> | null | undefined,
  ...roles: UserRole[]
): boolean {
  if (!user) return false
  if (user.role === "ADMIN") return true
  return roles.includes(user.role)
}

export function useHasRole(...roles: UserRole[]): boolean {
  const user = useAuthStore((state) => state.user)
  return userHasRole(user, ...roles)
}
