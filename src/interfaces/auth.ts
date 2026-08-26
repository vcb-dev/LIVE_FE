export type UserRole = "MEMBER" | "LEADER" | "ADMIN"

export const ROLE_LABEL: Record<UserRole, string> = {
  MEMBER: "Thành viên",
  LEADER: "Trưởng nhóm",
  ADMIN: "Quản trị viên",
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  role: UserRole
}

export interface LoginResponse {
  user: AuthUser
}
