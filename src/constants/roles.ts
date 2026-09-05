import type { UserRole } from "@/interfaces/auth"

/**
 * Nhóm role — map quyền UI (menu, nút, route guard phía FE).
 * DB / JWT vẫn giữ 3 role riêng: MEMBER | LEADER | ADMIN.
 *
 * ── Khi ADMIN khác LEADER (ví dụ ADMIN-only settings) ──
 * 1. Thêm group mới bên dưới, ví dụ:
 *      adminOnly: ["ADMIN"] as const satisfies readonly UserRole[],
 * 2. Giữ `staff: ["LEADER", "ADMIN"]` cho phần chung LEADER + ADMIN.
 *    Hoặc thu hẹp thành `staff: ["LEADER"]` nếu ADMIN không còn trong nhóm staff.
 * 3. Trong component: `useInGroup("adminOnly")` thay vì `useIsStaff()`.
 * 4. Đồng bộ BE: thêm ADMIN_ONLY_ROLES trong `LIVE_BE/src/auth/role-groups.ts`.
 *
 * Không cần migrate DB hay đổi JWT — chỉ sửa mapping group + `@Roles(...)` trên API.
 */
export const ROLE_GROUPS = {
  member: ["MEMBER"] as const satisfies readonly UserRole[],
  /** LEADER + ADMIN — cùng quyền hôm nay. */
  staff: ["LEADER", "ADMIN"] as const satisfies readonly UserRole[],
  // adminOnly: ["ADMIN"] as const satisfies readonly UserRole[], // bỏ comment khi cần
} as const

export type RoleGroup = keyof typeof ROLE_GROUPS
