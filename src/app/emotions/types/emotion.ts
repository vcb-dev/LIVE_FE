export interface Emotion {
  id: string
  code: string
  name: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateEmotionPayload {
  code: string
  name: string
  imageUrl?: string
}

export interface UpdateEmotionPayload {
  name?: string
  imageUrl?: string | null
}

export interface EmotionImageUploadResponse {
  imageUrl: string
}

export interface ListEmotionsParams {
  page?: number
  limit?: number
  q?: string
}
