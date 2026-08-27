export const BLOCK_TYPES = [
  "OPENING",
  "PRODUCT_SPEC",
  "STORY",
  "MEANING",
  "CTA",
  "GAME",
  "CLOSING",
] as const

export type BlockType = (typeof BLOCK_TYPES)[number]

export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  OPENING: "Mở đầu",
  PRODUCT_SPEC: "Thông số SP",
  STORY: "Câu chuyện",
  MEANING: "Ý nghĩa",
  CTA: "Kêu gọi hành động",
  GAME: "Trò chơi",
  CLOSING: "Kết thúc",
}

export const BLOCK_TYPE_OPTIONS = BLOCK_TYPES.map((value) => ({
  value,
  label: BLOCK_TYPE_LABELS[value],
}))

export function getBlockTypeLabel(type: BlockType): string {
  return BLOCK_TYPE_LABELS[type] ?? type
}
