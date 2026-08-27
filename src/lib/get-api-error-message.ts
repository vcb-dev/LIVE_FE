import { isAxiosError } from "axios"

export function getApiErrorMessage(
  error: unknown,
  fallback = "Đã có lỗi xảy ra"
): string {
  if (!isAxiosError(error)) return fallback

  const message = error.response?.data?.message
  if (Array.isArray(message)) return message[0] ?? fallback
  if (typeof message === "string" && message.length > 0) return message
  return fallback
}
