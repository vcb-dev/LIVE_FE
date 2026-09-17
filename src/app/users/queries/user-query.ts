import { queryOptions } from "@tanstack/react-query"

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/types/pagination"
import { fetchUsers } from "../services/userService"
import type { ListUsersParams } from "../types/user"

export const userKeys = {
  all: ["users"] as const,
  list: (params: ListUsersParams) => [...userKeys.all, "list", params] as const,
}

export function listUsersQueryOptions(params: ListUsersParams = {}) {
  const page = params.page ?? DEFAULT_PAGE
  const limit = params.limit ?? DEFAULT_LIMIT
  const q = params.q?.trim() || undefined
  const role = params.role
  const isActive = params.isActive

  return queryOptions({
    queryKey: userKeys.list({ page, limit, q, role, isActive }),
    queryFn: () => fetchUsers({ page, limit, q, role, isActive }),
    staleTime: 30_000,
  })
}
