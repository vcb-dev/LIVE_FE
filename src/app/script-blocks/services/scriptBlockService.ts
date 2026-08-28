import API_PATHS from "@/constants/apiPaths"
import httpService from "@/services/httpService"
import type { PaginatedResponse } from "@/types/pagination"

import type {
  CreateScriptBlockPayload,
  ListScriptBlocksParams,
  ScriptBlock,
  UpdateScriptBlockPayload,
} from "../types/script-block"

export async function fetchScriptBlocks(
  params: ListScriptBlocksParams
): Promise<PaginatedResponse<ScriptBlock>> {
  const { data } = await httpService.get<PaginatedResponse<ScriptBlock>>(
    API_PATHS.SCRIPT_BLOCKS.BASE,
    { params }
  )
  return data
}

export async function fetchScriptBlock(id: string): Promise<ScriptBlock> {
  const { data } = await httpService.get<ScriptBlock>(
    API_PATHS.SCRIPT_BLOCKS.BY_ID(id)
  )
  return data
}

export async function createScriptBlock(
  payload: CreateScriptBlockPayload
): Promise<ScriptBlock> {
  const { data } = await httpService.post<ScriptBlock>(
    API_PATHS.SCRIPT_BLOCKS.BASE,
    payload
  )
  return data
}

export async function updateScriptBlock(
  id: string,
  payload: UpdateScriptBlockPayload
): Promise<ScriptBlock> {
  const { data } = await httpService.patch<ScriptBlock>(
    API_PATHS.SCRIPT_BLOCKS.BY_ID(id),
    payload
  )
  return data
}

export async function deleteScriptBlock(id: string): Promise<void> {
  await httpService.delete(API_PATHS.SCRIPT_BLOCKS.BY_ID(id))
}
