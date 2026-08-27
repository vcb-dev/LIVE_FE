import { queryOptions } from "@tanstack/react-query"

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/types/pagination"

import { fetchEmotions } from "../services/emotionService"
import type { ListEmotionsParams } from "../types/emotion"

export const emotionKeys = {
  all: ["emotions"] as const,
  list: (params: ListEmotionsParams) =>
    [...emotionKeys.all, "list", params] as const,
}

export function listEmotionsQueryOptions(params: ListEmotionsParams = {}) {
  const page = params.page ?? DEFAULT_PAGE
  const limit = params.limit ?? DEFAULT_LIMIT
  const q = params.q?.trim() || undefined

  return queryOptions({
    queryKey: emotionKeys.list({ page, limit, q }),
    queryFn: () => fetchEmotions({ page, limit, q }),
    staleTime: 30_000,
  })
}
