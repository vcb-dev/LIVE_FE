import { Radio } from "lucide-react"

import { BLOCK_TYPE_LABELS } from "@/app/block-groups/constants/block-type"
import type { LiveSessionListItem } from "@/app/live-sessions/types/live-session"
import { cn } from "@/lib/utils"

import { LIVE_CUE_TYPE_TONE } from "../constants/live-cue-type-tone"
import { useLiveConsole } from "../hooks/use-live-console"
import type { LiveCue } from "../types/live-cue"
import { formatDuration } from "../utils/format-duration"
import { LiveControls } from "./LiveControls"
import { LiveCountdown } from "./LiveCountdown"
import { LiveCueMedia } from "./LiveCueMedia"
import { LiveCueQueue } from "./LiveCueQueue"
import { LiveSessionPicker } from "./LiveSessionPicker"

interface LiveConsoleProps {
  sessions: LiveSessionListItem[]
  selectedSessionId: string
  onSessionChange: (sessionId: string) => void
  cues: LiveCue[]
}

export function LiveConsole({
  sessions,
  selectedSessionId,
  onSessionChange,
  cues,
}: LiveConsoleProps) {
  const {
    current,
    upcoming,
    index,
    isPaused,
    isFinished,
    remainingMs,
    progress,
    total,
    next,
    togglePause,
    restart,
  } = useLiveConsole(cues)

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background text-foreground">
      <header className="flex shrink-0 flex-col gap-2 border-b border-border bg-card px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3 md:px-6">
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wider uppercase",
              isPaused || isFinished
                ? "bg-muted text-muted-foreground"
                : "bg-destructive/10 text-destructive"
            )}
          >
            <Radio
              className={cn(
                "size-3.5",
                !isPaused && !isFinished && "animate-pulse fill-current"
              )}
            />
            {isFinished ? "Hết phiên" : isPaused ? "Pause" : "Live"}
          </span>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <LiveSessionPicker
              sessions={sessions}
              selectedSessionId={selectedSessionId}
              onSessionChange={onSessionChange}
            />
            <p className="text-sm whitespace-nowrap text-muted-foreground sm:text-base">
              <span className="sm:hidden">
                {Math.min(index + 1, total)}/{total}
              </span>
              <span className="hidden sm:inline">
                Mục {Math.min(index + 1, total)}/{total}
                {current
                  ? ` · ${formatDuration(current.durationSec)} kế hoạch`
                  : ""}
              </span>
            </p>
          </div>
        </div>
        <p className="hidden text-sm text-muted-foreground/70 md:block">
          Bấm Space: tạm dừng - Bấm N: bỏ qua
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <section className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-3 py-4 sm:gap-6 sm:px-4 sm:py-6 md:gap-8 md:px-10 md:py-8">
          {isFinished || !current ? (
            <div className="text-center">
              <p className="text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
                Phiên live
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-bold tracking-tight text-foreground md:text-5xl">
                Đã hết kịch bản
              </h1>
            </div>
          ) : (
            <>
              <LiveCountdown
                remainingMs={remainingMs}
                progress={progress}
                isPaused={isPaused}
              />

              <LiveCueMedia cue={current} />

              <div className="flex max-w-4xl flex-col items-center text-center">
                <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold ring-1",
                      LIVE_CUE_TYPE_TONE[current.type]
                    )}
                  >
                    {BLOCK_TYPE_LABELS[current.type]}
                  </span>
                  {current.productName ? (
                    <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                      {current.productName}
                    </span>
                  ) : null}
                  {current.emotionName ? (
                    <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                      Biểu cảm: {current.emotionName}
                    </span>
                  ) : null}
                </div>
                <h1 className="max-w-4xl px-2 text-2xl leading-tight font-bold tracking-tight text-balance sm:text-3xl md:text-5xl lg:text-6xl">
                  {current.title}
                </h1>
              </div>
            </>
          )}

          <LiveControls
            isPaused={isPaused}
            isFinished={isFinished}
            canNext={!isFinished}
            onTogglePause={togglePause}
            onNext={next}
            onRestart={restart}
          />
        </section>

        <LiveCueQueue cues={upcoming} />
      </div>
    </div>
  )
}
