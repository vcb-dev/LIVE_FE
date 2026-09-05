import { queryOptions } from "@tanstack/react-query"

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/types/pagination"

import {
  fetchLiveSession,
  fetchLiveSessions,
} from "../services/liveSessionService"
import type { ListLiveSessionsParams } from "../types/live-session"

export const liveSessionKeys = {
  all: ["live-sessions"] as const,
  list: (params: ListLiveSessionsParams) =>
    [...liveSessionKeys.all, "list", params] as const,
  detail: (id: string) => [...liveSessionKeys.all, "detail", id] as const,
}

export function listLiveSessionsQueryOptions(
  params: ListLiveSessionsParams = {}
) {
  const page = params.page ?? DEFAULT_PAGE
  const limit = params.limit ?? DEFAULT_LIMIT
  const status = params.status

  return queryOptions({
    queryKey: liveSessionKeys.list({ page, limit, status }),
    queryFn: () => fetchLiveSessions({ page, limit, status }),
    staleTime: 30_000,
  })
}

export function liveSessionDetailQueryOptions(id: string) {
  return queryOptions({
    queryKey: liveSessionKeys.detail(id),
    queryFn: () => fetchLiveSession(id),
    staleTime: 60_000,
  })
}
