import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/lib/get-api-error-message"

import type { UserRole } from "@/interfaces/auth"

import { userKeys } from "../queries/user-query"
import { createUser, deleteUser, updateUser } from "../services/userService"
import type { CreateUserPayload, UpdateUserPayload } from "../types/user"

//eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CreateUserInput extends CreateUserPayload {}

interface UpdateUserInput {
  id: string
  password?: string
  role: UserRole
  isActive: boolean
}

export function useUserMutations() {
  const queryClient = useQueryClient()

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: userKeys.all })

  const createMutation = useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: async () => {
      await invalidate()
      toast.success("Tạo người dùng thành công")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không thể tạo người dùng"))
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, password, role, isActive }: UpdateUserInput) => {
      const payload: UpdateUserPayload = { role, isActive }

      if (password?.trim()) {
        payload.password = password.trim()
      }

      return updateUser(id, payload)
    },
    onSuccess: async () => {
      await invalidate()
      toast.success("Cập nhật người dùng thành công")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không thể cập nhật người dùng"))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: async () => {
      await invalidate()
      toast.success("Vô hiệu hóa người dùng thành công")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không thể vô hiệu hóa người dùng"))
    },
  })

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
