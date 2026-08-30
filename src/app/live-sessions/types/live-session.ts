import type { BlockType } from "@/app/block-groups/constants/block-type"

export const SESSION_STATUSES = [
  "DRAFT",
  "RUNNING",
  "PAUSED",
  "FINISHED",
] as const
export type SessionStatus = (typeof SESSION_STATUSES)[number]

export const SEGMENT_KINDS = [
  "OPENING",
  "PRODUCT",
  "CTA",
  "GAME",
  "INTERLUDE",
  "CLOSING",
] as const
export type SegmentKind = (typeof SEGMENT_KINDS)[number]

export const SLOT_KINDS = [
  "OPENING",
  "PRODUCT",
  "CTA",
  "GAME",
  "CLOSING",
] as const
export type SlotKind = (typeof SLOT_KINDS)[number]

export const SESSION_STATUS_LABELS: Record<SessionStatus, string> = {
  DRAFT: "Nháp",
  RUNNING: "Đang live",
  PAUSED: "Tạm dừng",
  FINISHED: "Đã xong",
}

export const SEGMENT_KIND_LABELS: Record<SegmentKind, string> = {
  OPENING: "Mở đầu",
  PRODUCT: "Sản phẩm",
  CTA: "CTA",
  GAME: "Trò chơi",
  INTERLUDE: "Xen kẽ",
  CLOSING: "Kết thúc",
}

export interface SegmentItem {
  id: string
  blockId: string | null
  position: number
  type: BlockType
  title: string | null
  content: string
  emotionCodes: string[]
  emotionImageUrls: string[]
  plannedSec: number
  status: "PENDING" | "ACTIVE" | "DONE" | "SKIPPED"
}

export interface SessionSegment {
  id: string
  kind: SegmentKind
  productId: string | null
  productCode: string | null
  productName: string | null
  productImageUrl: string | null
  position: number
  plannedSec: number
  items: SegmentItem[]
}

export interface LiveSessionListItem {
  id: string
  name: string
  scheduledAt: string | null
  plannedSec: number
  status: SessionStatus
  productCount: number
  createdAt: string
  updatedAt: string
}

export interface LiveSessionDetail extends LiveSessionListItem {
  openingSec: number
  closingSec: number
  interludeSec: number
  segments: SessionSegment[]
}

export interface SessionSlotInput {
  kind: SlotKind
  productId?: string
  groupId?: string
  plannedSec: number
}

export interface CreateLiveSessionPayload {
  name: string
  scheduledAt?: string
  slots: SessionSlotInput[]
}

export interface ListLiveSessionsParams {
  page?: number
  limit?: number
  status?: SessionStatus
}

export const DEFAULT_SLOT_SEC: Record<SlotKind, number> = {
  OPENING: 60,
  PRODUCT: 300,
  CTA: 45,
  GAME: 90,
  CLOSING: 60,
}
