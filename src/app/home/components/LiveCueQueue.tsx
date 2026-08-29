import {
  BLOCK_TYPE_LABELS,
  type BlockType,
} from "@/app/block-groups/constants/block-type"
import { cn } from "@/lib/utils"

import type { LiveCue } from "../types/live-cue"
import { formatDuration } from "../utils/format-duration"

interface LiveCueQueueProps {
  cues: LiveCue[]
}

const TYPE_TONE: Record<BlockType, string> = {
  OPENING: "bg-sky-400/15 text-sky-300",
  PRODUCT_SPEC: "bg-violet-400/15 text-violet-300",
  STORY: "bg-amber-400/15 text-amber-300",
  MEANING: "bg-rose-400/15 text-rose-300",
  CTA: "bg-orange-400/15 text-orange-300",
  GAME: "bg-emerald-400/15 text-emerald-300",
  CLOSING: "bg-slate-400/15 text-slate-300",
}

export function LiveCueQueue({ cues }: LiveCueQueueProps) {
  return (
    <aside className="flex h-full min-h-0 w-full flex-col border-t border-white/10 lg:w-80 lg:border-t-0 lg:border-l">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-sm font-semibold tracking-wide text-white/80 uppercase">
          Tiếp theo
        </h2>
        <span className="text-xs text-white/40">{cues.length} mục</span>
      </div>
      <ol className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-5">
        {cues.length === 0 ? (
          <li className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/40">
            Hết kịch bản
          </li>
        ) : (
          cues.map((cue, order) => (
            <li
              key={cue.id}
              className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-3"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-medium",
                    TYPE_TONE[cue.type]
                  )}
                >
                  {BLOCK_TYPE_LABELS[cue.type]}
                </span>
                <span className="text-xs tabular-nums text-white/40">
                  {formatDuration(cue.durationSec)}
                </span>
              </div>
              <p className="text-sm leading-snug font-medium text-white/90">
                <span className="mr-1.5 text-white/35">{order + 1}.</span>
                {cue.title}
              </p>
            </li>
          ))
        )}
      </ol>
    </aside>
  )
}
