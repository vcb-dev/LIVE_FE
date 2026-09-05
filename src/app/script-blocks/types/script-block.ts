import {
  BLOCK_TYPES,
  type BlockType,
} from "@/app/block-groups/constants/block-type"

export type { BlockType }

export interface ScriptBlockEmotion {
  id: string
  code: string
  name: string
  imageUrl: string | null
}

export interface ScriptBlock {
  id: string
  type: BlockType
  groupId: string | null
  groupCode: string | null
  groupName: string | null
  productId: string | null
  productCode: string | null
  productName: string | null
  title: string | null
  content: string
  durationSec: number
  weight: number
  sortOrder: number
  usageCount: number
  lastUsedAt: string | null
  isActive: boolean
  emotions: ScriptBlockEmotion[]
  createdAt: string
  updatedAt: string
}

export interface ListScriptBlocksParams {
  page?: number
  limit?: number
  q?: string
  type?: BlockType
  groupId?: string
  productId?: string
  isActive?: boolean
}

export interface CreateScriptBlockPayload {
  type: BlockType
  groupId?: string
  productId?: string
  title?: string
  content: string
  durationSec: number
  weight?: number
  isActive?: boolean
  emotionIds?: string[]
}

export interface UpdateScriptBlockPayload {
  title?: string
  content?: string
  durationSec?: number
  weight?: number
  isActive?: boolean
  emotionIds?: string[]
}

export interface GenerateMeaningSuggestionPayload {
  productId: string
  existingTitle?: string
}

export interface ScriptBlockSuggestion {
  title: string
  content: string
  suggestedDurationSec: number
}

export const PRODUCT_REQUIRED_TYPES: BlockType[] = ["STORY", "MEANING"]
export const GROUP_REQUIRED_TYPES: BlockType[] = ["CTA"]
export const OPTIONAL_PRODUCT_TYPES: BlockType[] = ["PRODUCT_SPEC"]

export function isProductRequired(type: BlockType): boolean {
  return PRODUCT_REQUIRED_TYPES.includes(type)
}

export function isGroupRequired(type: BlockType): boolean {
  return GROUP_REQUIRED_TYPES.includes(type)
}

export function showsProductField(type: BlockType): boolean {
  return isProductRequired(type) || OPTIONAL_PRODUCT_TYPES.includes(type)
}

export function showsGroupField(type: BlockType): boolean {
  return isGroupRequired(type)
}

export const BLOCK_TYPES_FOR_SCRIPT = BLOCK_TYPES
