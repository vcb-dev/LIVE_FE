import type { LiveSessionDetail } from "@/app/live-sessions/types/live-session"

import type { LiveCue } from "../types/live-cue"

export function mapLiveSessionToCues(session: LiveSessionDetail): LiveCue[] {
  return session.segments.flatMap((segment) =>
    segment.items.map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title?.trim() || item.content,
      durationSec: item.plannedSec,
      productName:
        segment.productCode && segment.productName
          ? `${segment.productCode} — ${segment.productName}`
          : (segment.productName ?? undefined),
      productImageUrl: segment.productImageUrl ?? undefined,
      emotionName:
        item.emotionCodes.length > 0
          ? item.emotionCodes.join(", ")
          : undefined,
      emotionImageUrls:
        item.emotionImageUrls.length > 0 ? item.emotionImageUrls : undefined,
    }))
  )
}
