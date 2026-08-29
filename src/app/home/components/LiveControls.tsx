import { Pause, Play, SkipForward } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LiveControlsProps {
  isPaused: boolean
  isFinished: boolean
  canNext: boolean
  onTogglePause: () => void
  onNext: () => void
  onRestart: () => void
}

export function LiveControls({
  isPaused,
  isFinished,
  canNext,
  onTogglePause,
  onNext,
  onRestart,
}: LiveControlsProps) {
  if (isFinished) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          size="lg"
          className="h-14 min-w-48 rounded-2xl bg-cyan-500 px-8 text-base font-semibold text-zinc-950 hover:bg-cyan-400"
          onClick={onRestart}
        >
          Phát lại phiên demo
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button
        type="button"
        size="lg"
        variant="outline"
        className={cn(
          "h-14 min-w-40 rounded-2xl border-white/15 bg-white/5 px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white",
          isPaused && "border-amber-400/40 bg-amber-400/10 text-amber-200"
        )}
        onClick={onTogglePause}
      >
        {isPaused ? (
          <>
            <Play className="size-5 fill-current" />
            Tiếp tục
          </>
        ) : (
          <>
            <Pause className="size-5 fill-current" />
            Tạm dừng
          </>
        )}
      </Button>
      <Button
        type="button"
        size="lg"
        className="h-14 min-w-40 rounded-2xl bg-cyan-500 px-8 text-base font-semibold text-zinc-950 hover:bg-cyan-400"
        onClick={onNext}
        disabled={!canNext}
      >
        <SkipForward className="size-5" />
        Bỏ qua
      </Button>
    </div>
  )
}
