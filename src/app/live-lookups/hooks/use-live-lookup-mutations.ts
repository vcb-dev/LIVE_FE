import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/lib/get-api-error-message"

import { liveLookupKeys } from "../queries/live-lookup-query"
import {
  createLiveLookup,
  deleteLiveLookup,
  updateLiveLookup,
} from "../services/liveLookupService"
import type { CreateLiveLookupPayload } from "../types/live-lookup"

interface UpdateLiveLookupInput {
  id: string
  name: string
}

export function useLiveLookupMutations() {
  const queryClient = useQueryClient()

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: liveLookupKeys.all })

  const createMutation = useMutation({
    mutationFn: (payload: CreateLiveLookupPayload) => createLiveLookup(payload),
    onSuccess: async () => {
      await invalidate()
      toast.success("Đã thêm mục")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không thêm được mục"))
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: UpdateLiveLookupInput) =>
      updateLiveLookup(id, name),
    onSuccess: async () => {
      await invalidate()
      toast.success("Đã cập nhật mục")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không cập nhật được mục"))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteLiveLookup(id),
    onSuccess: async () => {
      await invalidate()
      toast.success("Đã xóa mục")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không xóa được mục"))
    },
  })

  return { createMutation, updateMutation, deleteMutation }
}
