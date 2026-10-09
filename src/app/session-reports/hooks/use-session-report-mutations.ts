import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { getApiErrorMessage } from "@/lib/get-api-error-message"

import { sessionReportKeys } from "../queries/session-report-query"
import { createSessionReport } from "../services/sessionReportService"
import type { CreateSessionReportPayload } from "../types/session-report"

export function useSessionReportMutations() {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (payload: CreateSessionReportPayload) =>
      createSessionReport(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: sessionReportKeys.all })
      toast.success("Đã lưu báo cáo ca live")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Không lưu được báo cáo ca live"))
    },
  })

  return { createMutation }
}
