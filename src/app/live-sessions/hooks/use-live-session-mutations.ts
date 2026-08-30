import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/lib/get-api-error-message"

import { liveSessionKeys } from "../queries/live-session-query"
import type { LiveSessionFormValues } from "../schemas/live-session-form.schema"
import { mapLiveSessionFormToPayload } from "../schemas/live-session-form.schema"
import {
  createLiveSession,
  deleteLiveSession,
  regenerateLiveSession,
} from "../services/liveSessionService"

export function useLiveSessionMutations() {
  const queryClient = useQueryClient()

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: liveSessionKeys.all })

  const createMutation = useMutation({
    mutationFn: (values: LiveSessionFormValues) =>
      createLiveSession(mapLiveSessionFormToPayload(values)),
    onSuccess: async () => {
      await invalidate()
      toast.success("Tạo kịch bản thành công")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không thể tạo kịch bản"))
    },
  })

  const regenerateMutation = useMutation({
    mutationFn: (id: string) => regenerateLiveSession(id),
    onSuccess: async () => {
      await invalidate()
      toast.success("Đã generate lại kịch bản")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không thể generate lại kịch bản"))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteLiveSession(id),
    onSuccess: async () => {
      await invalidate()
      toast.success("Đã xóa kịch bản")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không thể xóa kịch bản"))
    },
  })

  return {
    createMutation,
    regenerateMutation,
    deleteMutation,
  }
}
