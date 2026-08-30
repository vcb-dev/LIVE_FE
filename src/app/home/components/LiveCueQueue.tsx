import { BLOCK_TYPE_LABELS } from "@/app/block-groups/constants/block-type"
import { cn } from "@/lib/utils"

import { LIVE_CUE_TYPE_TONE } from "../constants/live-cue-type-tone"
import type { LiveCue } from "../types/live-cue"
import { formatDuration } from "../utils/format-duration"

interface LiveCueQueueProps {
  cues: LiveCue[]
}

export function LiveCueQueue({ cues }: LiveCueQueueProps) {
  return (
    <aside className="flex h-full min-h-0 w-full flex-col border-t border-border bg-muted/30 lg:w-80 lg:border-t-0 lg:border-l">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
          Tiếp theo
        </h2>
        <span className="text-xs text-muted-foreground">{cues.length} mục</span>
      </div>
      <ol className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-5">
        {cues.length === 0 ? (
          <li className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
            Hết kịch bản
          </li>
        ) : (
          cues.map((cue, order) => (
            <li
              key={cue.id}
              className="rounded-xl border border-border bg-card px-3.5 py-3 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-medium ring-1",
                    LIVE_CUE_TYPE_TONE[cue.type]
                  )}
                >
                  {BLOCK_TYPE_LABELS[cue.type]}
                </span>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {formatDuration(cue.durationSec)}
                </span>
              </div>
              <p className="text-sm leading-snug font-medium text-foreground">
                <span className="mr-1.5 text-muted-foreground">{order + 1}.</span>
                {cue.title}
              </p>
            </li>
          ))
        )}
      </ol>
    </aside>
  )
}
