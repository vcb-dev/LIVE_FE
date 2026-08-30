import { cn } from "@/lib/utils"

import { formatClock } from "../utils/format-duration"

interface LiveCountdownProps {
  remainingMs: number
  progress: number
  isPaused: boolean
}

export function LiveCountdown({
  remainingMs,
  progress,
  isPaused,
}: LiveCountdownProps) {
  const size = 220
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const remainingRatio = 1 - progress
  const offset = circumference * (1 - remainingRatio)
  const isLastTenSeconds = remainingMs <= 10_000

  return (
    <div
      className={cn(
        "relative flex size-55 items-center justify-center",
        isLastTenSeconds && !isPaused && "animate-[pulse_0.7s_ease-in-out_infinite]"
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
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
            "font-display text-5xl font-bold tracking-tight tabular-nums text-foreground",
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
