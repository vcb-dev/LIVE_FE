import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import type { LiveCue } from "../types/live-cue"

export function useLiveConsole(cues: LiveCue[]) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [remainingMs, setRemainingMs] = useState(
    () => (cues[0]?.durationSec ?? 0) * 1000
  )
  const [isFinished, setIsFinished] = useState(false)

  const remainingRef = useRef(remainingMs)
  const nextRef = useRef<() => void>(() => undefined)

  const current = cues[index]
  const upcoming = useMemo(() => cues.slice(index + 1), [cues, index])
  const plannedMs = (current?.durationSec ?? 0) * 1000
  const progress =
    plannedMs <= 0 ? 0 : Math.min(1, Math.max(0, 1 - remainingMs / plannedMs))

  const goToIndex = useCallback(
    (nextIndex: number) => {
      const cue = cues[nextIndex]
      if (!cue) {
        setIsFinished(true)
        setIsPaused(true)
        setRemainingMs(0)
        remainingRef.current = 0
        return
      }

      setIndex(nextIndex)
      setRemainingMs(cue.durationSec * 1000)
      remainingRef.current = cue.durationSec * 1000
      setIsFinished(false)
      setIsPaused(false)
    },
    [cues]
  )

  const next = useCallback(() => {
    if (index >= cues.length - 1) {
      setIsFinished(true)
      setIsPaused(true)
      setRemainingMs(0)
      remainingRef.current = 0
      return
    }
    goToIndex(index + 1)
  }, [cues.length, goToIndex, index])

  const togglePause = useCallback(() => {
    if (isFinished) return
    setIsPaused((value) => !value)
  }, [isFinished])

  const restart = useCallback(() => {
    goToIndex(0)
  }, [goToIndex])

  useEffect(() => {
    remainingRef.current = remainingMs
    nextRef.current = next
  })

  useEffect(() => {
    if (isPaused || isFinished || !current) return

    let frameId = 0
    let last = performance.now()

    const tick = (now: number) => {
      const delta = now - last
      last = now
      const nextRemaining = remainingRef.current - delta
      if (nextRemaining <= 0) {
        nextRef.current()
        return
      }
      remainingRef.current = nextRemaining
      setRemainingMs(nextRemaining)
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [current, index, isFinished, isPaused])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return
      }

      if (event.code === "Space") {
        event.preventDefault()
        togglePause()
        return
      }

      if (event.code === "ArrowRight" || event.key.toLowerCase() === "n") {
        event.preventDefault()
        next()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [next, togglePause])

  return {
    current,
    upcoming,
    index,
    isPaused,
    isFinished,
    remainingMs,
    progress,
    total: cues.length,
    next,
    togglePause,
    restart,
  }
}
