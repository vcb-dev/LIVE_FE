import { queryOptions } from "@tanstack/react-query"

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/types/pagination"

import { fetchLiveLookups } from "../services/liveLookupService"
import type { ListLiveLookupsParams } from "../types/live-lookup"

export const liveLookupKeys = {
  all: ["live-lookups"] as const,
  list: (params: ListLiveLookupsParams) =>
    [...liveLookupKeys.all, "list", params] as const,
}

export function listLiveLookupsQueryOptions(params: ListLiveLookupsParams) {
  const page = params.page ?? DEFAULT_PAGE
  const limit = params.limit ?? DEFAULT_LIMIT
  const q = params.q?.trim() || undefined

  return queryOptions({
    queryKey: liveLookupKeys.list({ page, limit, kind: params.kind, q }),
    queryFn: () => fetchLiveLookups({ page, limit, kind: params.kind, q }),
    staleTime: 30_000,
  })
}
