import API_PATHS from "@/constants/apiPaths"
import httpService from "@/services/httpService"
import type { PaginatedResponse } from "@/types/pagination"

import type {
  CreateLiveLookupPayload,
  ListLiveLookupsParams,
  LiveLookup,
} from "../types/live-lookup"

export async function fetchLiveLookups(
  params: ListLiveLookupsParams
): Promise<PaginatedResponse<LiveLookup>> {
  const { data } = await httpService.get<PaginatedResponse<LiveLookup>>(
    API_PATHS.LIVE_LOOKUPS.BASE,
    { params }
  )
  return data
}

export async function createLiveLookup(
  payload: CreateLiveLookupPayload
): Promise<LiveLookup> {
  const { data } = await httpService.post<LiveLookup>(
    API_PATHS.LIVE_LOOKUPS.BASE,
    payload
  )
  return data
}

export async function updateLiveLookup(
  id: string,
  name: string
): Promise<LiveLookup> {
  const { data } = await httpService.patch<LiveLookup>(
    API_PATHS.LIVE_LOOKUPS.BY_ID(id),
    { name }
  )
  return data
}

export async function deleteLiveLookup(id: string): Promise<void> {
  await httpService.delete(API_PATHS.LIVE_LOOKUPS.BY_ID(id))
}
