import type { StaffRole } from "@/interfaces/auth"

/** Permission codes — fixed catalog (not admin-created). */
export const PERMISSIONS = {
  
} as const

export type PermissionCode = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

export interface PermissionDef {
  code: PermissionCode
  label: string
}

export interface PermissionGroup {
  id: string
  label: string
  items: PermissionDef[]
}

/** Grouped for Settings checklist UI. */
export const PERMISSION_GROUPS: PermissionGroup[] = [

]

export const ALL_PERMISSION_CODES: PermissionCode[] = PERMISSION_GROUPS.flatMap(
  (group) => group.items.map((item) => item.code)
)

const OPS_READ_WRITE: PermissionCode[] = [
  
]

/** Default snapshot when picking a role (before per-staff tweaks). */
export const ROLE_DEFAULT_PERMISSIONS: Record<StaffRole, PermissionCode[]> = {
  ADMIN: [...ALL_PERMISSION_CODES],
  DOCTOR: [...OPS_READ_WRITE],
  ASSISTANT: [...OPS_READ_WRITE],
  STAFF: [
  ],
}

export function getRoleDefaultPermissions(role: StaffRole): PermissionCode[] {
  return [...ROLE_DEFAULT_PERMISSIONS[role]]
}

export function isPermissionCode(value: string): value is PermissionCode {
  return ALL_PERMISSION_CODES.includes(value as PermissionCode)
}
