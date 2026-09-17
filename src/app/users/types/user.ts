import type { UserRole } from "@/interfaces/auth"

export interface User {
  id: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ListUsersParams {
  page?: number
  limit?: number
  q?: string
  role?: UserRole
  isActive?: boolean
}

export interface CreateUserPayload {
  email: string
  password: string
  role: UserRole
  isActive?: boolean
}

export interface UpdateUserPayload {
  password?: string
  role?: UserRole
  isActive?: boolean
}
