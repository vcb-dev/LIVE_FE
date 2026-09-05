import {
  BLOCK_TYPE_LABELS,
  type BlockType,
} from "@/app/block-groups/constants/block-type"
import { formatDuration } from "@/app/home/utils/format-duration"
import { Badge } from "@/components/ui/badge"

import {
  SEGMENT_KIND_LABELS,
  type SessionSegment,
} from "../types/live-session"

interface LiveSessionTimelineProps {
  segments: SessionSegment[]
}

export function LiveSessionTimeline({ segments }: LiveSessionTimelineProps) {
  return (
    <ol className="space-y-4">
      {segments.map((segment) => (
        <li key={segment.id} className="rounded-md border bg-white p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="outline">{SEGMENT_KIND_LABELS[segment.kind]}</Badge>
            {segment.productCode ? (
              <span className="text-sm">
                {segment.productCode} — {segment.productName}
              </span>
            ) : null}
            <span className="text-sm text-muted-foreground">
              {formatDuration(segment.plannedSec)}
            </span>
          </div>
          <ul className="space-y-2">
            {segment.items.map((item) => (
              <li
                key={item.id}
                className="rounded-md bg-muted/40 px-3 py-2 text-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">
                    {BLOCK_TYPE_LABELS[item.type as BlockType]}
                  </Badge>
                  <span className="text-muted-foreground">
                    {formatDuration(item.plannedSec)}
                  </span>
                  {item.emotionCodes.length > 0 ? (
                    <span className="text-muted-foreground">
                      {item.emotionCodes.join(", ")}
                    </span>
                  ) : null}
                  {item.blockId === null && item.type === "GAME" ? (
                    <span className="text-xs text-muted-foreground">
                      Thiếu block trò chơi
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 whitespace-pre-wrap">{item.content}</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
