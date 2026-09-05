import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/lib/get-api-error-message"

import { scriptBlockKeys } from "../queries/script-block-query"
import {
  mapScriptBlockFormToCreatePayload,
  mapScriptBlockFormToUpdatePayload,
  type CreateScriptBlockFormValues,
  type UpdateScriptBlockFormValues,
} from "../schemas/script-block-form.schema"
import {
  createScriptBlock,
  deleteScriptBlock,
  updateScriptBlock,
} from "../services/scriptBlockService"

interface UpdateScriptBlockInput {
  id: string
  values: UpdateScriptBlockFormValues
}

export function useScriptBlockMutations() {
  const queryClient = useQueryClient()

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: scriptBlockKeys.all })

  const createMutation = useMutation({
    mutationFn: (values: CreateScriptBlockFormValues) =>
      createScriptBlock(mapScriptBlockFormToCreatePayload(values)),
    onSuccess: async () => {
      await invalidate()
      toast.success("Tạo block kịch bản thành công")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không thể tạo block kịch bản"))
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: UpdateScriptBlockInput) =>
      updateScriptBlock(id, mapScriptBlockFormToUpdatePayload(values)),
    onSuccess: async () => {
      await invalidate()
      toast.success("Cập nhật block kịch bản thành công")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không thể cập nhật block kịch bản"))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteScriptBlock(id),
    onSuccess: async () => {
      await invalidate()
      toast.success("Xóa block kịch bản thành công")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không thể xóa block kịch bản"))
    },
  })

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
