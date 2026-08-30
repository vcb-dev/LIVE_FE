import type { BlockType } from "@/app/block-groups/constants/block-type"

export const LIVE_CUE_TYPE_TONE: Record<BlockType, string> = {
  OPENING: "bg-sky-100 text-sky-800 ring-sky-200",
  PRODUCT_SPEC: "bg-violet-100 text-violet-800 ring-violet-200",
  STORY: "bg-amber-100 text-amber-800 ring-amber-200",
  MEANING: "bg-rose-100 text-rose-800 ring-rose-200",
  CTA: "bg-orange-100 text-orange-800 ring-orange-200",
  GAME: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  CLOSING: "bg-slate-100 text-slate-700 ring-slate-200",
}
