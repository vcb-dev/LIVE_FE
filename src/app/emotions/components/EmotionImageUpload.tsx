import { ImagePlus } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import {
  EMOTION_IMAGE_ACCEPT,
  validateEmotionImageFile,
} from "../schemas/emotion-form.schema"

interface EmotionImageUploadProps {
  existingImageUrl?: string | null
  disabled?: boolean
  onFileChange: (file: File | null) => void
}

export function EmotionImageUpload({
  existingImageUrl,
  disabled,
  onFileChange,
}: EmotionImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const previewUrl = useMemo(() => {
    if (selectedFile) return URL.createObjectURL(selectedFile)
    return existingImageUrl ?? null
  }, [selectedFile, existingImageUrl])

  useEffect(() => {
    if (!selectedFile || !previewUrl?.startsWith("blob:")) return
    return () => URL.revokeObjectURL(previewUrl)
  }, [selectedFile, previewUrl])

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""

    if (!file) {
      setSelectedFile(null)
      setError(null)
      onFileChange(null)
      return
    }

    const validationError = validateEmotionImageFile(file)
    if (validationError) {
      setSelectedFile(null)
      setError(validationError)
      onFileChange(null)
      return
    }

    setSelectedFile(file)
    setError(null)
    onFileChange(file)
  }

  function handleClear() {
    setSelectedFile(null)
    setError(null)
    onFileChange(null)
  }

  return (
    <div className="space-y-2">
      <Label>Ảnh mẫu biểu cảm</Label>

      <div className="flex flex-wrap items-start gap-4">
        <div
          className={cn(
            "flex h-24 w-24 items-center justify-center overflow-hidden rounded-md border bg-muted/30",
            !previewUrl && "border-dashed"
          )}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Xem trước ảnh biểu cảm"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImagePlus className="h-8 w-8 text-muted-foreground" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            id="emotion-image-input"
            type="file"
            accept={EMOTION_IMAGE_ACCEPT}
            className="hidden"
            disabled={disabled}
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={() =>
              document.getElementById("emotion-image-input")?.click()
            }
          >
            Chọn ảnh từ máy
          </Button>
          {selectedFile ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={disabled}
              onClick={handleClear}
            >
              Bỏ ảnh đã chọn
            </Button>
          ) : null}
          <p className="text-xs text-muted-foreground">
            JPG, PNG, WEBP hoặc GIF — tối đa 10MB
          </p>
        </div>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}
