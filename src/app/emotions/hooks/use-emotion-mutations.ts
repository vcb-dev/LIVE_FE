import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/lib/get-api-error-message"

import { emotionKeys } from "../queries/emotion-query"
import {
  createEmotion,
  deleteEmotion,
  updateEmotion,
  uploadEmotionImage,
} from "../services/emotionService"
import type { CreateEmotionPayload, UpdateEmotionPayload } from "../types/emotion"

interface CreateEmotionInput {
  code: string
  name: string
  imageFile?: File | null
}

interface UpdateEmotionInput {
  id: string
  name: string
  imageFile?: File | null
}

export function useEmotionMutations() {
  const queryClient = useQueryClient()

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: emotionKeys.all })

  const createMutation = useMutation({
    mutationFn: async ({ code, name, imageFile }: CreateEmotionInput) => {
      const payload: CreateEmotionPayload = { code, name }

      if (imageFile) {
        const uploaded = await uploadEmotionImage(imageFile)
        payload.imageUrl = uploaded.imageUrl
      }

      return createEmotion(payload)
    },
    onSuccess: async () => {
      await invalidate()
      toast.success("Tạo biểu cảm thành công")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không thể tạo biểu cảm"))
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, name, imageFile }: UpdateEmotionInput) => {
      const payload: UpdateEmotionPayload = { name }

      if (imageFile) {
        const uploaded = await uploadEmotionImage(imageFile)
        payload.imageUrl = uploaded.imageUrl
      }

      return updateEmotion(id, payload)
    },
    onSuccess: async () => {
      await invalidate()
      toast.success("Cập nhật biểu cảm thành công")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không thể cập nhật biểu cảm"))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEmotion(id),
    onSuccess: async () => {
      await invalidate()
      toast.success("Xóa biểu cảm thành công")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không thể xóa biểu cảm"))
    },
  })

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
