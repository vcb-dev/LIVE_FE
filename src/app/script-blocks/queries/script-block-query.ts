import { queryOptions } from "@tanstack/react-query"

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/types/pagination"

import { fetchScriptBlocks } from "../services/scriptBlockService"
import type { ListScriptBlocksParams } from "../types/script-block"

export const scriptBlockKeys = {
  all: ["script-blocks"] as const,
  list: (params: ListScriptBlocksParams) =>
    [...scriptBlockKeys.all, "list", params] as const,
}

export function listScriptBlocksQueryOptions(params: ListScriptBlocksParams = {}) {
  const page = params.page ?? DEFAULT_PAGE
  const limit = params.limit ?? DEFAULT_LIMIT
  const q = params.q?.trim() || undefined
  const type = params.type
  const groupId = params.groupId
  const productId = params.productId
  const isActive = params.isActive

  return queryOptions({
    queryKey: scriptBlockKeys.list({
      page,
      limit,
      q,
      type,
      groupId,
      productId,
      isActive,
    }),
    queryFn: () =>
      fetchScriptBlocks({
        page,
        limit,
        q,
        type,
        groupId,
        productId,
        isActive,
      }),
    staleTime: 30_000,
  })
}
