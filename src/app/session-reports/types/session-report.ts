import type { SessionReportFormValues } from "../schemas/session-report-form.schema"

export interface CreateSessionReportPayload extends SessionReportFormValues {
  sessionId: string
}

export interface SessionReportLookup {
  id: string
  name: string
}

export interface SessionReport {
  id: string
  sessionId: string
  sessionName: string
  submittedById: string
  liveDate: string
  staffName: string
  shift: SessionReportLookup
  liveType: SessionReportLookup
  team: SessionReportLookup
  channel: SessionReportLookup
  totalHours: number
  revenue: number
  viewCount: number
  retentionRate: number
  orderCount: number
  impressionCount: number
  createdAt: string
  updatedAt: string
}

export interface DailyRankingRow {
  rank: number
  staffName: string
  value: number
}

export interface DailyRankings {
  revenue: DailyRankingRow[]
  traffic: DailyRankingRow[]
  retention: DailyRankingRow[]
}

export interface DailyRankingsParams {
  from?: string
  to?: string
}

export interface ListSessionReportsParams {
  page?: number
  limit?: number
  q?: string
  from?: string
  to?: string
}
