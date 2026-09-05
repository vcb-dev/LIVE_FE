import { z } from "zod"

export const createEmotionSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Mã biểu cảm không được để trống")
    .max(50, "Mã biểu cảm tối đa 50 ký tự")
    .regex(/^[A-Z0-9_]+$/, "Mã chỉ gồm chữ in hoa, số và dấu gạch dưới"),
  name: z
    .string()
    .trim()
    .min(1, "Tên biểu cảm không được để trống")
    .max(100, "Tên biểu cảm tối đa 100 ký tự"),
})

export const updateEmotionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tên biểu cảm không được để trống")
    .max(100, "Tên biểu cảm tối đa 100 ký tự"),
})

export type CreateEmotionFormInput = z.input<typeof createEmotionSchema>
export type CreateEmotionFormValues = z.output<typeof createEmotionSchema>
export type UpdateEmotionFormInput = z.input<typeof updateEmotionSchema>
export type UpdateEmotionFormValues = z.output<typeof updateEmotionSchema>

export const createEmotionDefaultValues: CreateEmotionFormInput = {
  code: "",
  name: "",
}

export const updateEmotionDefaultValues: UpdateEmotionFormInput = {
  name: "",
}

export const EMOTION_IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif"
export const EMOTION_IMAGE_MAX_BYTES = 10 * 1024 * 1024

export function validateEmotionImageFile(file: File): string | null {
  if (!EMOTION_IMAGE_ACCEPT.split(",").includes(file.type)) {
    return "Ảnh phải là JPG, PNG, WEBP hoặc GIF"
  }
  if (file.size > EMOTION_IMAGE_MAX_BYTES) {
    return "Ảnh không được lớn hơn 10MB"
  }
  return null
}
