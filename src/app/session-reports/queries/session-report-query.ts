import { queryOptions } from "@tanstack/react-query"

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/types/pagination"

import { fetchSessionReports } from "../services/sessionReportService"
import type { ListSessionReportsParams } from "../types/session-report"

export const sessionReportKeys = {
  all: ["session-reports"] as const,
  list: (params: ListSessionReportsParams) =>
    [...sessionReportKeys.all, "list", params] as const,
}

export function listSessionReportsQueryOptions(
  params: ListSessionReportsParams = {}
) {
  const page = params.page ?? DEFAULT_PAGE
  const limit = params.limit ?? DEFAULT_LIMIT
  const q = params.q?.trim() || undefined
  const from = params.from || undefined
  const to = params.to || undefined

  return queryOptions({
    queryKey: sessionReportKeys.list({ page, limit, q, from, to }),
    queryFn: () => fetchSessionReports({ page, limit, q, from, to }),
    staleTime: 30_000,
  })
}
