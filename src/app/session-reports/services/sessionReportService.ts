import API_PATHS from "@/constants/apiPaths"
import httpService from "@/services/httpService"

import type { PaginatedResponse } from "@/types/pagination"

import type {
  CreateSessionReportPayload,
  DailyRankings,
  DailyRankingsParams,
  ListSessionReportsParams,
  SessionReport,
} from "../types/session-report"

export async function fetchSessionReports(
  params: ListSessionReportsParams
): Promise<PaginatedResponse<SessionReport>> {
  const { data } = await httpService.get<PaginatedResponse<SessionReport>>(
    API_PATHS.SESSION_REPORTS.BASE,
    { params }
  )
  return data
}

export async function fetchDailyRankings(
  params: DailyRankingsParams
): Promise<DailyRankings> {
  const { data } = await httpService.get<DailyRankings>(
    API_PATHS.SESSION_REPORTS.DAILY_RANKINGS,
    { params }
  )
  return data
}

export async function createSessionReport(
  payload: CreateSessionReportPayload
): Promise<void> {
  await httpService.post(API_PATHS.SESSION_REPORTS.BASE, payload)
}
