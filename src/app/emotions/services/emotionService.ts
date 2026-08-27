import API_PATHS from "@/constants/apiPaths"
import httpService from "@/services/httpService"
import type { PaginatedResponse } from "@/types/pagination"

import type {
  CreateEmotionPayload,
  Emotion,
  EmotionImageUploadResponse,
  ListEmotionsParams,
  UpdateEmotionPayload,
} from "../types/emotion"

export async function fetchEmotions(
  params: ListEmotionsParams
): Promise<PaginatedResponse<Emotion>> {
  const { data } = await httpService.get<PaginatedResponse<Emotion>>(
    API_PATHS.EMOTIONS.BASE,
    { params }
  )
  return data
}

export async function fetchEmotion(id: string): Promise<Emotion> {
  const { data } = await httpService.get<Emotion>(API_PATHS.EMOTIONS.BY_ID(id))
  return data
}

export async function createEmotion(
  payload: CreateEmotionPayload
): Promise<Emotion> {
  const { data } = await httpService.post<Emotion>(
    API_PATHS.EMOTIONS.BASE,
    payload
  )
  return data
}

export async function updateEmotion(
  id: string,
  payload: UpdateEmotionPayload
): Promise<Emotion> {
  const { data } = await httpService.patch<Emotion>(
    API_PATHS.EMOTIONS.BY_ID(id),
    payload
  )
  return data
}

export async function deleteEmotion(id: string): Promise<void> {
  await httpService.delete(API_PATHS.EMOTIONS.BY_ID(id))
}

export async function uploadEmotionImage(
  file: File
): Promise<EmotionImageUploadResponse> {
  const formData = new FormData()
  formData.append("image", file)

  const { data } = await httpService.post<EmotionImageUploadResponse>(
    API_PATHS.EMOTIONS.UPLOAD_IMAGE,
    formData
  )
  return data
}
