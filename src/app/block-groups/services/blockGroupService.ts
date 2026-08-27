import API_PATHS from "@/constants/apiPaths"
import httpService from "@/services/httpService"
import type { PaginatedResponse } from "@/types/pagination"

import type {
  BlockGroup,
  CreateBlockGroupPayload,
  ListBlockGroupsParams,
  UpdateBlockGroupPayload,
} from "../types/block-group"

export async function fetchBlockGroups(
  params: ListBlockGroupsParams
): Promise<PaginatedResponse<BlockGroup>> {
  const { data } = await httpService.get<PaginatedResponse<BlockGroup>>(
    API_PATHS.BLOCK_GROUPS.BASE,
    { params }
  )
  return data
}

export async function fetchBlockGroup(id: string): Promise<BlockGroup> {
  const { data } = await httpService.get<BlockGroup>(
    API_PATHS.BLOCK_GROUPS.BY_ID(id)
  )
  return data
}

export async function createBlockGroup(
  payload: CreateBlockGroupPayload
): Promise<BlockGroup> {
  const { data } = await httpService.post<BlockGroup>(
    API_PATHS.BLOCK_GROUPS.BASE,
    payload
  )
  return data
}

export async function updateBlockGroup(
  id: string,
  payload: UpdateBlockGroupPayload
): Promise<BlockGroup> {
  const { data } = await httpService.patch<BlockGroup>(
    API_PATHS.BLOCK_GROUPS.BY_ID(id),
    payload
  )
  return data
}

export async function deleteBlockGroup(id: string): Promise<void> {
  await httpService.delete(API_PATHS.BLOCK_GROUPS.BY_ID(id))
}
