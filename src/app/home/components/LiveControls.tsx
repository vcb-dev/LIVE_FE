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
      <div className="flex w-full max-w-sm flex-col items-stretch gap-2 px-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:px-0">
        <Button
          type="button"
          size="lg"
          className="w-full px-8 sm:min-w-48 sm:w-auto"
          onClick={onRestart}
        >
          Phát lại từ đầu
        </Button>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-stretch gap-2 px-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:px-0">
      <Button
        type="button"
        size="lg"
        variant="outline"
        className={cn(
          "w-full px-8 sm:min-w-40 sm:w-auto",
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
        className="w-full px-8 sm:min-w-40 sm:w-auto"
        onClick={onNext}
        disabled={!canNext}
      >
        <SkipForward className="size-5" />
        Bỏ qua
      </Button>
    </div>
  )
}
