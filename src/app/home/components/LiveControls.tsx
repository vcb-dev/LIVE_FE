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
        <Button type="button" size="lg" className="min-w-48 px-8" onClick={onRestart}>
          Phát lại từ đầu
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
          "min-w-40 px-8",
          isPaused && "border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100"
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
        className="min-w-40 px-8"
        onClick={onNext}
        disabled={!canNext}
      >
        <SkipForward className="size-5" />
        Bỏ qua
      </Button>
    </div>
  )
}
