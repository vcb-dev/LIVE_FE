import { z } from "zod"

import type { UserRole } from "@/interfaces/auth"

const roleEnum = z.enum(["MEMBER", "LEADER", "ADMIN"])

export const createUserSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  role: roleEnum,
  isActive: z.boolean().default(true),
})

export const updateUserSchema = z.object({
  password: z
    .string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .optional()
    .or(z.literal("")),
  role: roleEnum,
  isActive: z.boolean(),
})

export type CreateUserFormInput = z.input<typeof createUserSchema>
export type CreateUserFormValues = z.output<typeof createUserSchema>
export type UpdateUserFormInput = z.input<typeof updateUserSchema>
export type UpdateUserFormValues = z.output<typeof updateUserSchema>

export const createUserDefaultValues: CreateUserFormInput = {
  email: "",
  password: "",
  role: "MEMBER" as UserRole,
  isActive: true,
}

export const updateUserDefaultValues: UpdateUserFormInput = {
  password: "",
  role: "MEMBER" as UserRole,
  isActive: true,
}

export const ROLE_OPTIONS = [
  { value: "MEMBER", label: "Thành viên" },
  { value: "LEADER", label: "Trưởng nhóm" },
  { value: "ADMIN", label: "Quản trị viên" },
] as const
