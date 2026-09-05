import { cn } from "@/lib/utils"

import { formatClock } from "../utils/format-duration"

interface LiveCountdownProps {
  remainingMs: number
  progress: number
  isPaused: boolean
}

const SIZE = 220
const STROKE = 10
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function LiveCountdown({
  remainingMs,
  progress,
  isPaused,
}: LiveCountdownProps) {
  const remainingRatio = 1 - progress
  const offset = CIRCUMFERENCE * (1 - remainingRatio)
  const isLastTenSeconds = remainingMs <= 10_000

  return (
    <div
      className={cn(
        "relative aspect-square w-36 shrink-0 sm:w-44 md:w-52 lg:w-55",
        isLastTenSeconds && !isPaused && "animate-[pulse_0.7s_ease-in-out_infinite]"
      )}
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-full w-full -rotate-90"
        aria-hidden
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          className="text-border"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{ strokeDashoffset: offset }}
          className={cn(
            isLastTenSeconds
              ? "text-destructive"
              : remainingRatio <= 0.25
                ? "text-amber-600"
                : "text-primary"
          )}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p
          className={cn(
            "font-display text-3xl font-bold tracking-tight tabular-nums text-foreground sm:text-4xl md:text-5xl",
            isLastTenSeconds && "text-destructive"
          )}
        >
          {formatClock(remainingMs)}
        </p>
        <p className="mt-1 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          {isPaused ? "Tạm dừng" : "Đang chạy"}
        </p>
      </div>
    </div>
  )
}
