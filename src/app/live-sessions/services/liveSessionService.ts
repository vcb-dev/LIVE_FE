import API_PATHS from "@/constants/apiPaths"
import httpService from "@/services/httpService"
import type { PaginatedResponse } from "@/types/pagination"

import type {
  CreateLiveSessionPayload,
  ListLiveSessionsParams,
  LiveSessionDetail,
  LiveSessionListItem,
} from "../types/live-session"

export async function fetchLiveSessions(
  params: ListLiveSessionsParams
): Promise<PaginatedResponse<LiveSessionListItem>> {
  const { data } = await httpService.get<
    PaginatedResponse<LiveSessionListItem>
  >(API_PATHS.LIVE_SESSIONS.BASE, { params })
  return data
}

export async function fetchLiveSession(id: string): Promise<LiveSessionDetail> {
  const { data } = await httpService.get<LiveSessionDetail>(
    API_PATHS.LIVE_SESSIONS.BY_ID(id)
  )
  return data
}

export async function createLiveSession(
  payload: CreateLiveSessionPayload
): Promise<LiveSessionDetail> {
  const { data } = await httpService.post<LiveSessionDetail>(
    API_PATHS.LIVE_SESSIONS.BASE,
    payload
  )
  return data
}

export async function regenerateLiveSession(
  id: string
): Promise<LiveSessionDetail> {
  const { data } = await httpService.post<LiveSessionDetail>(
    API_PATHS.LIVE_SESSIONS.REGENERATE(id)
  )
  return data
}

export async function deleteLiveSession(id: string): Promise<void> {
  await httpService.delete(API_PATHS.LIVE_SESSIONS.BY_ID(id))
}
