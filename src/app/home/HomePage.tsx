import { Radio } from "lucide-react"

import {
  BLOCK_TYPE_LABELS,
  type BlockType,
} from "@/app/block-groups/constants/block-type"
import { cn } from "@/lib/utils"

import { LiveControls } from "./components/LiveControls"
import { LiveCountdown } from "./components/LiveCountdown"
import { LiveCueQueue } from "./components/LiveCueQueue"
import { DEMO_LIVE_CUES, DEMO_SESSION_NAME } from "./constants/demo-live-cues"
import { useLiveConsole } from "./hooks/use-live-console"
import { formatDuration } from "./utils/format-duration"

const TYPE_TONE: Record<BlockType, string> = {
  OPENING: "bg-sky-400/15 text-sky-300 ring-sky-400/20",
  PRODUCT_SPEC: "bg-violet-400/15 text-violet-300 ring-violet-400/20",
  STORY: "bg-amber-400/15 text-amber-300 ring-amber-400/20",
  MEANING: "bg-rose-400/15 text-rose-300 ring-rose-400/20",
  CTA: "bg-orange-400/15 text-orange-300 ring-orange-400/20",
  GAME: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/20",
  CLOSING: "bg-slate-400/15 text-slate-300 ring-slate-400/20",
}

export default function HomePage() {
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
  } = useLiveConsole(DEMO_LIVE_CUES)

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-zinc-950 text-white">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wider uppercase",
              isPaused || isFinished
                ? "bg-white/10 text-white/70"
                : "bg-red-500/15 text-red-400"
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
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {DEMO_SESSION_NAME}
            </p>
            <p className="text-xs text-white/45">
              Mục {Math.min(index + 1, total)}/{total}
              {current
                ? ` · ${formatDuration(current.durationSec)} kế hoạch`
                : ""}
            </p>
          </div>
        </div>
        <p className="hidden text-xs text-white/35 sm:block">
          Space: tạm dừng · → / N: bỏ qua
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <section className="flex min-h-0 flex-1 flex-col items-center justify-center gap-8 px-4 py-8 md:px-10">
          {isFinished || !current ? (
            <div className="text-center">
              <p className="text-xs font-semibold tracking-[0.25em] text-white/40 uppercase">
                Phiên live
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-bold tracking-tight md:text-5xl">
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

              <div className="flex max-w-4xl flex-col items-center text-center">
                <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold ring-1",
                      TYPE_TONE[current.type]
                    )}
                  >
                    {BLOCK_TYPE_LABELS[current.type]}
                  </span>
                  {current.groupName ? (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                      {current.groupName}
                    </span>
                  ) : null}
                  {current.productName ? (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                      {current.productName}
                    </span>
                  ) : null}
                  {current.emotionName ? (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                      Biểu cảm: {current.emotionName}
                    </span>
                  ) : null}
                </div>
                <h1 className="max-w-4xl text-3xl leading-tight font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
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
