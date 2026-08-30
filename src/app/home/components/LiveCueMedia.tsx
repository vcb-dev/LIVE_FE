import type { LiveCue } from "../types/live-cue"

interface LiveCueMediaProps {
  cue: Pick<LiveCue, "productImageUrl" | "productName" | "emotionImageUrls">
}

export function LiveCueMedia({ cue }: LiveCueMediaProps) {
  const hasProductImage = Boolean(cue.productImageUrl)
  const emotionImages = cue.emotionImageUrls ?? []

  if (!hasProductImage && emotionImages.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-end justify-center gap-6">
      {hasProductImage ? (
        <figure className="flex flex-col items-center gap-2">
          <img
            src={cue.productImageUrl}
            alt={cue.productName ?? "Sản phẩm"}
            className="size-28 rounded-2xl border border-border bg-card object-cover shadow-sm md:size-32"
          />
        </figure>
      ) : null}

      {emotionImages.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {emotionImages.map((url) => (
            <img
              key={url}
              src={url}
              alt="Biểu cảm"
              className="size-28 rounded-2xl border border-border bg-card object-cover shadow-sm md:size-32"
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
