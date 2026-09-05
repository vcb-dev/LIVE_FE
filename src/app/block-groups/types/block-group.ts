import type { BlockType } from "../constants/block-type"

export interface BlockGroup {
  id: string
  type: BlockType
  code: string
  name: string
  weight: number
  sortOrder: number
  pickCount: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateBlockGroupPayload {
  type: BlockType
  code: string
  name: string
  weight?: number
  sortOrder?: number
  pickCount?: number
  isActive?: boolean
}

export interface UpdateBlockGroupPayload {
  name?: string
  weight?: number
  sortOrder?: number
  pickCount?: number
  isActive?: boolean
}

export interface ListBlockGroupsParams {
  page?: number
  limit?: number
  q?: string
  type?: BlockType
}
