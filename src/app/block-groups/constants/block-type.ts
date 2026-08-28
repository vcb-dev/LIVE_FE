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

/** Chỉ CTA có nhóm block (mục con). GAME có block trong kho nhưng không chia nhóm. */
export const BLOCK_GROUP_TYPES = ["CTA"] as const satisfies readonly BlockType[]

export type BlockGroupType = (typeof BLOCK_GROUP_TYPES)[number]

/** Mọi loại đều có thể tạo trong kho nội dung. */
export const SCRIPT_BLOCK_TYPES = BLOCK_TYPES

export type ScriptBlockType = BlockType

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

export const SCRIPT_BLOCK_TYPE_OPTIONS = SCRIPT_BLOCK_TYPES.map((value) => ({
  value,
  label: BLOCK_TYPE_LABELS[value],
}))

export const BLOCK_GROUP_TYPE_OPTIONS = BLOCK_GROUP_TYPES.map((value) => ({
  value,
  label: BLOCK_TYPE_LABELS[value],
}))

export function getBlockTypeLabel(type: BlockType): string {
  return BLOCK_TYPE_LABELS[type] ?? type
}
