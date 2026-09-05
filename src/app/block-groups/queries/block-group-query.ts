import { queryOptions } from "@tanstack/react-query"

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/types/pagination"

import { fetchBlockGroups } from "../services/blockGroupService"
import type { ListBlockGroupsParams } from "../types/block-group"

export const blockGroupKeys = {
  all: ["block-groups"] as const,
  list: (params: ListBlockGroupsParams) =>
    [...blockGroupKeys.all, "list", params] as const,
}

export function listBlockGroupsQueryOptions(params: ListBlockGroupsParams = {}) {
  const page = params.page ?? DEFAULT_PAGE
  const limit = params.limit ?? DEFAULT_LIMIT
  const q = params.q?.trim() || undefined
  const type = params.type

  return queryOptions({
    queryKey: blockGroupKeys.list({ page, limit, q, type }),
    queryFn: () => fetchBlockGroups({ page, limit, q, type }),
    staleTime: 30_000,
  })
}
