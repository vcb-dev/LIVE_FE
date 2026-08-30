import type { BlockType } from "@/app/block-groups/constants/block-type"

export interface LiveCue {
  id: string
  type: BlockType
  title: string
  durationSec: number
  productName?: string
  productImageUrl?: string
  groupName?: string
  emotionName?: string
  emotionImageUrls?: string[]
}
