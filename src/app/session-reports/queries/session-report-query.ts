import { queryOptions } from "@tanstack/react-query"

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/types/pagination"

import { fetchDailyRankings, fetchSessionReports } from "../services/sessionReportService"
import type { DailyRankingsParams, ListSessionReportsParams } from "../types/session-report"

export const sessionReportKeys = {
  all: ["session-reports"] as const,
  list: (params: ListSessionReportsParams) =>
    [...sessionReportKeys.all, "list", params] as const,
  daily: (params: DailyRankingsParams) =>
    [...sessionReportKeys.all, "daily-rankings", params] as const,
}

export function dailyRankingsQueryOptions(params: DailyRankingsParams = {}) {
  const from = params.from || undefined
  const to = params.to || undefined

  return queryOptions({
    queryKey: sessionReportKeys.daily({ from, to }),
    queryFn: () => fetchDailyRankings({ from, to }),
    staleTime: 30_000,
  })
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
