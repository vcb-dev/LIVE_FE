/**
 * Helper check role — logic group nằm ở `@/constants/roles` (ROLE_GROUPS).
 * Khi đổi nghiệp vụ ADMIN vs LEADER: sửa ROLE_GROUPS trước, rồi dùng
 * `useInGroup("adminOnly")` hoặc thêm hook tương tự `useIsStaff()` bên dưới.
 */
import { ROLE_GROUPS, type RoleGroup } from "@/constants/roles"
import type { AuthUser, UserRole } from "@/interfaces/auth"
import { useAuthStore } from "@/stores/auth-store"

/** Kiểm tra role cụ thể — dùng khi feature chỉ hỗ trợ một role */
// dùng cho nhóm role cụ thể ví dụ member, staff, adminOnly trong ROLE_GROUPS
export function userInGroup(
  user: Pick<AuthUser, "role"> | null | undefined,
  group: RoleGroup
): boolean {
  if (!user) return false
  return (ROLE_GROUPS[group] as readonly UserRole[]).includes(user.role)
}

export function useInGroup(group: RoleGroup): boolean {
  const user = useAuthStore((state) => state.user)
  return userInGroup(user, group)
}

/** LEADER + ADMIN — cùng quyền hôm nay. Admin-only sau này: `useInGroup("adminOnly")`. */
export function useIsStaff(): boolean {
  return useInGroup("staff")
}

// export function useIsAdminOnly(): boolean {
//   return useInGroup("adminOnly")
// }

export function useIsMember(): boolean {
  return useInGroup("member")
}

/** Kiểm tra role cụ thể — dùng khi feature chỉ hỗ trợ một role. */
export function userHasRole(
  user: Pick<AuthUser, "role"> | null | undefined,
  ...roles: UserRole[]
): boolean {
  if (!user) return false
  return roles.includes(user.role)
}

/** Hook để kiểm tra role cụ thể. */
export function useHasRole(...roles: UserRole[]): boolean {
  const user = useAuthStore((state) => state.user)
  return userHasRole(user, ...roles)
}
